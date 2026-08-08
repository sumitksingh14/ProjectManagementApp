import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { seedUsers, seedPortfolios, seedPrograms, seedProjects } from "./seedData";
import { Project, Portfolio, Program, User } from "../types";

// Ensure data directory exists
const dbDir = path.join(process.cwd(), "database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "pmo.db");
const db = new Database(dbPath);

// Enable WAL mode for high concurrency & performance
db.pragma("journal_mode = WAL");

export function initDb() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      costRate REAL NOT NULL,
      availabilityPercent REAL NOT NULL,
      skills TEXT NOT NULL,
      avatar TEXT
    );
  `);

  // Create portfolios table
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolios (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      description TEXT NOT NULL,
      sponsor TEXT NOT NULL,
      budgetAllocated REAL NOT NULL,
      budgetSpent REAL NOT NULL,
      expectedRoiPercent REAL NOT NULL,
      programs TEXT NOT NULL,
      health TEXT NOT NULL
    );
  `);

  // Create programs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS programs (
      id TEXT PRIMARY KEY,
      portfolioId TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      manager TEXT NOT NULL,
      description TEXT NOT NULL,
      targetCompletion TEXT NOT NULL,
      projectIds TEXT NOT NULL,
      health TEXT NOT NULL
    );
  `);

  // Create projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      lastUpdated TEXT NOT NULL,
      intake TEXT NOT NULL,
      stakeholders TEXT NOT NULL,
      requirements TEXT NOT NULL,
      lifecyclePhases TEXT NOT NULL,
      costLineItems TEXT NOT NULL,
      evm TEXT NOT NULL,
      risks TEXT NOT NULL,
      issues TEXT NOT NULL,
      quality TEXT NOT NULL,
      changeRequests TEXT NOT NULL,
      communicationPlan TEXT NOT NULL,
      governance TEXT NOT NULL,
      health TEXT NOT NULL,
      benefits TEXT DEFAULT '[]',
      vendors TEXT DEFAULT '[]',
      deliverables TEXT DEFAULT '[]',
      lessonsLearned TEXT DEFAULT '[]',
      actionItems TEXT DEFAULT '[]',
      meetingMinutes TEXT DEFAULT '[]',
      closureStatus TEXT DEFAULT 'null'
    );
  `);

  // Migrate: add new columns if they don't exist (for existing DBs)
  const alterCols = ["benefits", "vendors", "deliverables", "lessonsLearned", "actionItems", "meetingMinutes", "closureStatus"];
  for (const col of alterCols) {
    try {
      db.exec(`ALTER TABLE projects ADD COLUMN ${col} TEXT DEFAULT '[]'`);
    } catch {
      // Column already exists, skip
    }
  }

  seedDataIfEmpty();
}


function seedDataIfEmpty() {
  const projectCount = (db.prepare("SELECT COUNT(*) as count FROM projects").get() as any).count;
  if (projectCount > 0) {
    console.log("SQLite database pmo.db already contains data.");
    return;
  }

  console.log("Seeding SQLite database pmo.db with initial dummy data...");

  // Seed Users
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, role, department, costRate, availabilityPercent, skills, avatar)
    VALUES (@id, @name, @email, @role, @department, @costRate, @availabilityPercent, @skills, @avatar)
  `);
  const insertUsersTx = db.transaction((users: User[]) => {
    for (const u of users) {
      insertUser.run({
        ...u,
        skills: JSON.stringify(u.skills)
      });
    }
  });
  insertUsersTx(seedUsers);

  // Seed Portfolios
  const insertPortfolio = db.prepare(`
    INSERT INTO portfolios (id, name, code, description, sponsor, budgetAllocated, budgetSpent, expectedRoiPercent, programs, health)
    VALUES (@id, @name, @code, @description, @sponsor, @budgetAllocated, @budgetSpent, @expectedRoiPercent, @programs, @health)
  `);
  const insertPortfoliosTx = db.transaction((ports: Portfolio[]) => {
    for (const p of ports) {
      insertPortfolio.run({
        ...p,
        programs: JSON.stringify(p.programs)
      });
    }
  });
  insertPortfoliosTx(seedPortfolios);

  // Seed Programs
  const insertProgram = db.prepare(`
    INSERT INTO programs (id, portfolioId, name, code, manager, description, targetCompletion, projectIds, health)
    VALUES (@id, @portfolioId, @name, @code, @manager, @description, @targetCompletion, @projectIds, @health)
  `);
  const insertProgramsTx = db.transaction((progs: Program[]) => {
    for (const pr of progs) {
      insertProgram.run({
        ...pr,
        projectIds: JSON.stringify(pr.projectIds)
      });
    }
  });
  insertProgramsTx(seedPrograms);

  // Seed Projects
  const insertProject = db.prepare(`
    INSERT INTO projects (id, name, code, lastUpdated, intake, stakeholders, requirements, lifecyclePhases, costLineItems, evm, risks, issues, quality, changeRequests, communicationPlan, governance, health)
    VALUES (@id, @name, @code, @lastUpdated, @intake, @stakeholders, @requirements, @lifecyclePhases, @costLineItems, @evm, @risks, @issues, @quality, @changeRequests, @communicationPlan, @governance, @health)
  `);
  const insertProjectsTx = db.transaction((projects: Project[]) => {
    for (const prj of projects) {
      insertProject.run({
        id: prj.id,
        name: prj.name,
        code: prj.code,
        lastUpdated: prj.lastUpdated,
        intake: JSON.stringify(prj.intake),
        stakeholders: JSON.stringify(prj.stakeholders),
        requirements: JSON.stringify(prj.requirements),
        lifecyclePhases: JSON.stringify(prj.lifecyclePhases),
        costLineItems: JSON.stringify(prj.costLineItems),
        evm: JSON.stringify(prj.evm),
        risks: JSON.stringify(prj.risks),
        issues: JSON.stringify(prj.issues),
        quality: JSON.stringify(prj.quality),
        changeRequests: JSON.stringify(prj.changeRequests),
        communicationPlan: JSON.stringify(prj.communicationPlan),
        governance: JSON.stringify(prj.governance),
        health: JSON.stringify(prj.health)
      });
    }
  });
  insertProjectsTx(seedProjects);

  console.log("SQLite database pmo.db successfully seeded.");
}

// Data Access Methods

export function getAllUsers(): User[] {
  const rows = db.prepare("SELECT * FROM users").all() as any[];
  return rows.map((r) => ({
    ...r,
    skills: JSON.parse(r.skills || "[]")
  }));
}

export function getAllPortfolios(): Portfolio[] {
  const rows = db.prepare("SELECT * FROM portfolios").all() as any[];
  return rows.map((r) => ({
    ...r,
    programs: JSON.parse(r.programs || "[]")
  }));
}

export function getAllPrograms(): Program[] {
  const rows = db.prepare("SELECT * FROM programs").all() as any[];
  return rows.map((r) => ({
    ...r,
    projectIds: JSON.parse(r.projectIds || "[]")
  }));
}

export function getAllProjects(): Project[] {
  const rows = db.prepare("SELECT * FROM projects").all() as any[];
  return rows.map(mapProjectRow);
}

export function getProjectById(id: string): Project | null {
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as any;
  if (!row) return null;
  return mapProjectRow(row);
}

export function saveProject(project: Project): Project {
  const stmt = db.prepare(`
    INSERT INTO projects (id, name, code, lastUpdated, intake, stakeholders, requirements, lifecyclePhases, costLineItems, evm, risks, issues, quality, changeRequests, communicationPlan, governance, health, benefits, vendors, deliverables, lessonsLearned, actionItems, meetingMinutes, closureStatus)
    VALUES (@id, @name, @code, @lastUpdated, @intake, @stakeholders, @requirements, @lifecyclePhases, @costLineItems, @evm, @risks, @issues, @quality, @changeRequests, @communicationPlan, @governance, @health, @benefits, @vendors, @deliverables, @lessonsLearned, @actionItems, @meetingMinutes, @closureStatus)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      code = excluded.code,
      lastUpdated = excluded.lastUpdated,
      intake = excluded.intake,
      stakeholders = excluded.stakeholders,
      requirements = excluded.requirements,
      lifecyclePhases = excluded.lifecyclePhases,
      costLineItems = excluded.costLineItems,
      evm = excluded.evm,
      risks = excluded.risks,
      issues = excluded.issues,
      quality = excluded.quality,
      changeRequests = excluded.changeRequests,
      communicationPlan = excluded.communicationPlan,
      governance = excluded.governance,
      health = excluded.health,
      benefits = excluded.benefits,
      vendors = excluded.vendors,
      deliverables = excluded.deliverables,
      lessonsLearned = excluded.lessonsLearned,
      actionItems = excluded.actionItems,
      meetingMinutes = excluded.meetingMinutes,
      closureStatus = excluded.closureStatus
  `);

  stmt.run({
    id: project.id,
    name: project.name,
    code: project.code,
    lastUpdated: project.lastUpdated || new Date().toISOString().split("T")[0],
    intake: JSON.stringify(project.intake),
    stakeholders: JSON.stringify(project.stakeholders),
    requirements: JSON.stringify(project.requirements),
    lifecyclePhases: JSON.stringify(project.lifecyclePhases),
    costLineItems: JSON.stringify(project.costLineItems),
    evm: JSON.stringify(project.evm),
    risks: JSON.stringify(project.risks),
    issues: JSON.stringify(project.issues),
    quality: JSON.stringify(project.quality),
    changeRequests: JSON.stringify(project.changeRequests),
    communicationPlan: JSON.stringify(project.communicationPlan),
    governance: JSON.stringify(project.governance),
    health: JSON.stringify(project.health),
    benefits: JSON.stringify(project.benefits || []),
    vendors: JSON.stringify(project.vendors || []),
    deliverables: JSON.stringify(project.deliverables || []),
    lessonsLearned: JSON.stringify(project.lessonsLearned || []),
    actionItems: JSON.stringify(project.actionItems || []),
    meetingMinutes: JSON.stringify(project.meetingMinutes || []),
    closureStatus: JSON.stringify(project.closureStatus || null)
  });

  return getProjectById(project.id)!;
}

function mapProjectRow(row: any): Project {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    lastUpdated: row.lastUpdated,
    intake: JSON.parse(row.intake),
    stakeholders: JSON.parse(row.stakeholders),
    requirements: JSON.parse(row.requirements),
    lifecyclePhases: JSON.parse(row.lifecyclePhases),
    costLineItems: JSON.parse(row.costLineItems),
    evm: JSON.parse(row.evm),
    risks: JSON.parse(row.risks),
    issues: JSON.parse(row.issues),
    quality: JSON.parse(row.quality),
    changeRequests: JSON.parse(row.changeRequests),
    communicationPlan: JSON.parse(row.communicationPlan),
    governance: JSON.parse(row.governance),
    health: JSON.parse(row.health),
    benefits: JSON.parse(row.benefits || '[]'),
    vendors: JSON.parse(row.vendors || '[]'),
    deliverables: JSON.parse(row.deliverables || '[]'),
    lessonsLearned: JSON.parse(row.lessonsLearned || '[]'),
    actionItems: JSON.parse(row.actionItems || '[]'),
    meetingMinutes: JSON.parse(row.meetingMinutes || '[]'),
    closureStatus: row.closureStatus ? JSON.parse(row.closureStatus) : undefined
  };
}

export default db;
