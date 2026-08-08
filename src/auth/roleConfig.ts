import { UserRole } from "../types";

// ─── Auth User shape ──────────────────────────────────────────────────────────
export interface AuthUser {
  userId: string;
  displayName: string;
  username: string;
  password: string;
  role: UserRole;
  defaultTab: string;
  avatarInitials: string;
  roleColor: string; // Tailwind bg class for role pill
}

// ─── Dummy user accounts (one per role) ──────────────────────────────────────
export const AUTH_USERS: AuthUser[] = [
  {
    userId: "usr-1",
    displayName: "Sarah Jenkins",
    username: "sarah",
    password: "Exec@2026",
    role: "Executive Sponsor",
    defaultTab: "portfolio",
    avatarInitials: "SJ",
    roleColor: "bg-purple-600",
  },
  {
    userId: "usr-2",
    displayName: "Marcus Vance",
    username: "marcus",
    password: "PMO@2026",
    role: "PMO Admin",
    defaultTab: "dashboard",
    avatarInitials: "MV",
    roleColor: "bg-indigo-600",
  },
  {
    userId: "usr-3",
    displayName: "Elena Rostova",
    username: "elena",
    password: "Portfolio@2026",
    role: "Portfolio Manager",
    defaultTab: "portfolio",
    avatarInitials: "ER",
    roleColor: "bg-blue-600",
  },
  {
    userId: "usr-8",
    displayName: "Priya Sharma",
    username: "priya",
    password: "Program@2026",
    role: "Program Manager",
    defaultTab: "program-hub",
    avatarInitials: "PS",
    roleColor: "bg-cyan-600",
  },
  {
    userId: "usr-4",
    displayName: "David Chen",
    username: "david",
    password: "Project@2026",
    role: "Project Manager",
    defaultTab: "dashboard",
    avatarInitials: "DC",
    roleColor: "bg-emerald-600",
  },
  {
    userId: "usr-5",
    displayName: "Aisha Patel",
    username: "aisha",
    password: "Team@2026",
    role: "Team Member",
    defaultTab: "scheduling",
    avatarInitials: "AP",
    roleColor: "bg-amber-600",
  },
  {
    userId: "usr-7",
    displayName: "Rachel Green",
    username: "rachel",
    password: "Stake@2026",
    role: "Stakeholder",
    defaultTab: "kpis",
    avatarInitials: "RG",
    roleColor: "bg-rose-600",
  },
  // Legacy fallback – original Sumit / Passwd12345 (PMO Admin)
  {
    userId: "usr-2",
    displayName: "Sumit Kumar Singh",
    username: "sumit",
    password: "Passwd12345",
    role: "PMO Admin",
    defaultTab: "dashboard",
    avatarInitials: "SK",
    roleColor: "bg-indigo-600",
  },
];

export const findAuthUser = (
  username: string,
  password: string
): AuthUser | null =>
  AUTH_USERS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  ) ?? null;

// ─── Role → Allowed sidebar module IDs ───────────────────────────────────────
const ALL_MODULES = [
  "dashboard","onboarding","edit-project","portfolio","intake","governance",
  "stakeholders","requirements","ai-planner","scheduling","resources",
  "estimation","budget","evm","financial-evm","risks","issues","quality",
  "change-management","communication","kpis","documents",
  "program-hub","benefits","vendors","closure",
];

export const ROLE_MODULES: Record<UserRole, string[]> = {
  "Executive Sponsor": [
    "dashboard","portfolio","governance","stakeholders",
    "scheduling","resources","budget","evm","risks",
    "change-management","communication","kpis","documents",
    "program-hub","benefits",
  ],
  "PMO Admin": ALL_MODULES,
  "Portfolio Manager": [
    "dashboard","onboarding","edit-project","portfolio","intake","governance",
    "stakeholders","scheduling","resources","budget","evm",
    "risks","change-management","communication","kpis","documents",
    "program-hub","benefits",
  ],
  "Program Manager": [
    "dashboard","onboarding","edit-project","intake","governance",
    "stakeholders","requirements","ai-planner","scheduling","resources",
    "estimation","budget","evm","risks","issues",
    "change-management","communication","kpis","documents",
    "program-hub","benefits","vendors","closure",
  ],
  "Project Manager": [
    "dashboard","onboarding","edit-project","intake","governance",
    "stakeholders","requirements","ai-planner","scheduling","resources",
    "estimation","budget","evm","risks","issues","quality",
    "change-management","communication","kpis","documents","benefits","vendors","closure",
  ],
  "Team Member": [
    "requirements","scheduling","estimation","risks","issues","quality","communication",
  ],
  "Stakeholder": [
    "stakeholders","scheduling","communication","kpis","benefits",
  ],
};

export const isModuleAllowed = (role: UserRole, moduleId: string): boolean =>
  ROLE_MODULES[role]?.includes(moduleId) ?? false;
