import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, UserRole, Portfolio, Program, CopilotMessage, HealthStatus } from "../types";
import { mockProjects, mockPortfolios, mockPrograms, mockUsers } from "../data/mockEnterpriseData";

interface ProjectContextType {
  projects: Project[];
  activeProject: Project;
  activePortfolio: Portfolio | null;
  activeProgram: Program | null;
  currentRole: UserRole;
  activeTab: string; // Nav tab identifier
  copilotOpen: boolean;
  copilotMessages: CopilotMessage[];
  isAiLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setActiveProjectById: (id: string) => void;
  setCurrentRole: (role: UserRole) => void;
  setActiveTab: (tab: string) => void;
  setCopilotOpen: (open: boolean) => void;
  addCopilotMessage: (msg: Omit<CopilotMessage, "id" | "timestamp">) => void;
  updateActiveProject: (updater: (prev: Project) => Project) => void;
  generateAiProjectPlan: (params: {
    projectName: string;
    projectType: string;
    department: string;
    description: string;
    estimatedBudget: number;
    durationMonths: number;
  }) => Promise<boolean>;
  generateAiRisks: () => Promise<boolean>;
  sendCopilotQuery: (query: string) => Promise<void>;
  createProjectFromIntake: (intakeData: any) => Project;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeProjectId, setActiveProjectId] = useState<string>(mockProjects[0].id);
  const [currentRole, setCurrentRole] = useState<UserRole>("Project Manager");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello! I am ProjectPlanner AI Copilot. I can generate WBS plans, forecast EVM variances, predict project risks, draft governance RACI matrices, or summarize portfolio health. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const activePortfolio =
    mockPortfolios.find((port) => port.id === activeProject.intake.portfolioId) || mockPortfolios[0];

  const activeProgram =
    mockPrograms.find((prog) => prog.id === activeProject.intake.programId) || mockPrograms[0];

  const setActiveProjectById = (id: string) => {
    setActiveProjectId(id);
  };

  const updateActiveProject = (updater: (prev: Project) => Project) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === activeProject.id) {
          const updated = updater(p);
          // Recalculate EVM metrics
          const actualCosts = updated.costLineItems.reduce((acc, c) => acc + c.actualAmount, 0);
          const plannedVal = updated.costLineItems.reduce((acc, c) => acc + c.plannedAmount, 0) * 0.6; // ~60% timeline
          const earnedVal = updated.lifecyclePhases.reduce((acc, ph) => {
            return (
              acc +
              ph.workPackages.reduce((wpAcc, wp) => {
                return (
                  wpAcc +
                  wp.tasks.reduce((tAcc, t) => tAcc + (t.actualCost || 10000) * (t.progressPercent / 100), 0)
                );
              }, 0)
            );
          }, 0) + 400000;

          const BAC = updated.intake.estimatedBudget;
          const AC = actualCosts > 0 ? actualCosts : 760000;
          const PV = plannedVal > 0 ? plannedVal : 820000;
          const EV = earnedVal > 0 ? earnedVal : 845000;
          const CPI = Number((EV / (AC || 1)).toFixed(2));
          const SPI = Number((EV / (PV || 1)).toFixed(2));
          const EAC = CPI > 0 ? Math.round(BAC / CPI) : BAC;

          updated.evm = {
            BAC,
            PV,
            EV,
            AC,
            CV: EV - AC,
            SV: EV - PV,
            CPI,
            SPI,
            EAC,
            ETC: Math.max(0, EAC - AC),
            VAC: BAC - EAC
          };

          return updated;
        }
        return p;
      })
    );
  };

  const addCopilotMessage = (msg: Omit<CopilotMessage, "id" | "timestamp">) => {
    const newMessage: CopilotMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setCopilotMessages((prev) => [...prev, newMessage]);
  };

  const generateAiProjectPlan = async (params: {
    projectName: string;
    projectType: string;
    department: string;
    description: string;
    estimatedBudget: number;
    durationMonths: number;
  }): Promise<boolean> => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });
      const data = await res.json();

      if (data.success && data.lifecyclePhases) {
        updateActiveProject((prev) => {
          const generatedPhases = data.lifecyclePhases.map((ph: any, idx: number) => ({
            id: `ph-gen-${idx + 1}`,
            wbsCode: `${idx + 1}.0`,
            name: ph.name,
            durationDays: ph.durationDays || 20,
            startDate: `2026-08-01`,
            endDate: `2026-08-20`,
            workPackages: (ph.workPackages || []).map((wp: any, wpIdx: number) => ({
              id: `wp-gen-${idx + 1}-${wpIdx + 1}`,
              wbsCode: `${idx + 1}.${wpIdx + 1}`,
              name: wp.name,
              phaseId: `ph-gen-${idx + 1}`,
              owner: "Aisha Patel",
              tasks: (wp.tasks || []).map((t: any, tIdx: number) => ({
                id: `task-gen-${idx + 1}-${wpIdx + 1}-${tIdx + 1}`,
                wbsCode: `${idx + 1}.${wpIdx + 1}.${tIdx + 1}`,
                title: t.title,
                phaseId: `ph-gen-${idx + 1}`,
                workPackageId: `wp-gen-${idx + 1}-${wpIdx + 1}`,
                assignedTo: "Liam O'Connor",
                assignedRole: t.role || "Engineer",
                effortDays: t.effortDays || 5,
                durationDays: t.effortDays || 5,
                progressPercent: 0,
                startDate: "2026-08-05",
                endDate: "2026-08-10",
                dependencies: t.dependencies || [],
                isCriticalPath: tIdx === 0,
                isMilestone: tIdx === 0,
                deliverableName: `${t.title} Output Artifact`,
                status: "Not Started",
                subtasks: []
              }))
            }))
          }));

          return {
            ...prev,
            lifecyclePhases: generatedPhases.length > 0 ? generatedPhases : prev.lifecyclePhases
          };
        });

        addCopilotMessage({
          sender: "ai",
          text: `Successfully generated AI Work Breakdown Structure and lifecycle for "${params.projectName}". I have created ${data.lifecyclePhases.length} project phases with associated work packages and critical path dependencies!`,
          actionType: "PLAN_GENERATED"
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateAiRisks = async (): Promise<boolean> => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/predict-risks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: activeProject.name,
          projectType: activeProject.intake.type,
          scopeSummary: activeProject.intake.executiveSummary,
          currentBudget: activeProject.intake.estimatedBudget,
          timelineMonths: 9
        })
      });
      const data = await res.json();
      if (data.success && data.predictedRisks) {
        updateActiveProject((prev) => {
          const newRisks = data.predictedRisks.map((r: any, idx: number) => ({
            id: `risk-ai-${Date.now()}-${idx}`,
            riskCode: `RSK-AI-${(prev.risks || []).length + idx + 1}`,
            category: r.category || "Technical",
            description: r.title,
            rootCause: r.rootCause || "Predictive AI identified architectural vulnerability",
            trigger: r.trigger || "Key threshold breach",
            probability: r.probability || "Medium",
            impact: r.impact || "High",
            severityScore: r.severityScore || 15,
            owner: "David Chen",
            mitigation: r.mitigation,
            contingency: r.contingency,
            dueDate: "2026-09-15",
            status: "Open" as const
          }));
          return {
            ...prev,
            risks: [...prev.risks, ...newRisks]
          };
        });

        addCopilotMessage({
          sender: "ai",
          text: `AI Predictive Engine analyzed scope and budget for ${activeProject.name}. Added ${data.predictedRisks.length} predictive risks to the Risk Register with proactive mitigation strategies!`,
          actionType: "RISKS_GENERATED"
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsAiLoading(false);
    }
  };

  const sendCopilotQuery = async (query: string) => {
    addCopilotMessage({ sender: "user", text: query });
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
          projectContext: {
            name: activeProject.name,
            code: activeProject.code,
            budget: activeProject.intake.estimatedBudget,
            evm: activeProject.evm,
            health: activeProject.health
          }
        })
      });
      const data = await res.json();
      addCopilotMessage({
        sender: "ai",
        text: data.reply || "I have analyzed your query and updated project parameters."
      });
    } catch (e) {
      addCopilotMessage({
        sender: "ai",
        text: "I encountered an error connecting to the AI engine, but I can still assist with local calculations."
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const createProjectFromIntake = (intakeData: any): Project => {
    const newId = `prj-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      name: intakeData.projectName || "New Enterprise Project",
      code: intakeData.projectCode || `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      lastUpdated: new Date().toISOString().split("T")[0],
      intake: {
        code: intakeData.projectCode || `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
        type: intakeData.projectType || "IT Engineering",
        department: intakeData.department || "IT",
        businessUnit: intakeData.businessUnit || "Enterprise Ops",
        customer: intakeData.customer || "Internal",
        sponsor: intakeData.sponsor || "Sarah Jenkins",
        priority: intakeData.priority || "High",
        strategicObjective: intakeData.strategicObjective || "Digital Business Modernization",
        estimatedBudget: Number(intakeData.estimatedBudget) || 500000,
        plannedStartDate: intakeData.plannedStartDate || "2026-08-01",
        plannedEndDate: intakeData.plannedEndDate || "2027-02-01",
        problemStatement: intakeData.problemStatement || "",
        executiveSummary: intakeData.executiveSummary || "",
        expectedBenefits: intakeData.expectedBenefits ? intakeData.expectedBenefits.split("\n") : [],
        strategicAlignment: intakeData.strategicAlignment || "",
        expectedRoiPercent: Number(intakeData.expectedRoiPercent) || 20,
        businessDrivers: ["Efficiency", "Growth"],
        primaryObjective: intakeData.primaryObjective || "Deliver project on time and budget.",
        secondaryObjectives: [],
        successMeasures: ["On-time delivery", "Zero critical security defects"],
        kpiTargets: [{ metric: "Schedule Performance Index", target: "> 1.0" }],
        inScope: intakeData.inScope ? intakeData.inScope.split("\n") : [],
        outOfScope: intakeData.outOfScope ? intakeData.outOfScope.split("\n") : [],
        assumptions: ["Cloud environment available"],
        constraints: ["Fixed budget"],
        dependencies: ["Executive Approval"]
      },
      stakeholders: mockProjects[0].stakeholders,
      requirements: [],
      lifecyclePhases: mockProjects[0].lifecyclePhases,
      costLineItems: [
        { id: "c-new-1", category: "Labor", description: "Development Team", plannedAmount: Number(intakeData.estimatedBudget) * 0.7, forecastAmount: Number(intakeData.estimatedBudget) * 0.7, actualAmount: 0 },
        { id: "c-new-2", category: "Cloud Costs", description: "Cloud Hosting", plannedAmount: Number(intakeData.estimatedBudget) * 0.2, forecastAmount: Number(intakeData.estimatedBudget) * 0.2, actualAmount: 0 },
        { id: "c-new-3", category: "Contingency", description: "Risk Contingency", plannedAmount: Number(intakeData.estimatedBudget) * 0.1, forecastAmount: Number(intakeData.estimatedBudget) * 0.1, actualAmount: 0 }
      ],
      evm: {
        BAC: Number(intakeData.estimatedBudget) || 500000,
        PV: 50000,
        EV: 50000,
        AC: 45000,
        CV: 5000,
        SV: 0,
        CPI: 1.11,
        SPI: 1.0,
        EAC: Number(intakeData.estimatedBudget) || 500000,
        ETC: Number(intakeData.estimatedBudget) - 45000,
        VAC: 0
      },
      risks: [
        {
          id: `rsk-init-1`,
          riskCode: "RSK-01",
          category: "Schedule",
          description: "Resource ramp-up delay during initial onboarding phase",
          rootCause: "Hiring lead time",
          trigger: "Sprint 1 staffing < 80%",
          probability: "Medium",
          impact: "Medium",
          severityScore: 12,
          owner: "David Chen",
          mitigation: "Pre-allocate vendor contingent staff",
          contingency: "Shift non-critical discovery tasks",
          dueDate: "2026-08-30",
          status: "Open"
        }
      ],
      issues: [],
      quality: {
        defectsCount: 0,
        defectLeakagePercent: 0,
        testCoveragePercent: 100,
        passRatePercent: 100,
        reworkPercent: 0,
        qualityGates: [
          {
            id: `qg-new-1`,
            phaseName: "Discovery",
            gateName: "Gate 1: Charter Approval",
            criteria: ["Signed Intake Form", "Budget Allocation"],
            passed: true,
            reviewer: "Marcus Vance",
            signoffDate: new Date().toISOString().split("T")[0]
          }
        ]
      },
      changeRequests: [],
      communicationPlan: mockProjects[0].communicationPlan,
      governance: mockProjects[0].governance,
      health: {
        scheduleHealth: "Green",
        budgetHealth: "Green",
        scopeHealth: "Green",
        qualityHealth: "Green",
        riskHealth: "Green",
        resourceHealth: "Green",
        overallHealth: "Green",
        aiHealthCommentary: "Project successfully initialized from Intake Wizard. All baseline metrics established."
      }
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newId);
    return newProject;
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        activePortfolio,
        activeProgram,
        currentRole,
        activeTab,
        copilotOpen,
        copilotMessages,
        isAiLoading,
        searchQuery,
        setSearchQuery,
        setActiveProjectById,
        setCurrentRole,
        setActiveTab,
        setCopilotOpen,
        addCopilotMessage,
        updateActiveProject,
        generateAiProjectPlan,
        generateAiRisks,
        sendCopilotQuery,
        createProjectFromIntake
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
