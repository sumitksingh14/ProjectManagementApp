import React from "react";
import { ProjectProvider, useProject } from "./context/ProjectContext";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { CopilotDrawer } from "./components/layout/CopilotDrawer";

import { LoginPage } from "./components/auth/LoginPage";

// Import Module Views
import { DashboardView } from "./components/modules/DashboardView";
import { IntakeView } from "./components/modules/IntakeView";
import { StakeholderView } from "./components/modules/StakeholderView";
import { RequirementsView } from "./components/modules/RequirementsView";
import { AiPlannerView } from "./components/modules/AiPlannerView";
import { SchedulingView } from "./components/modules/SchedulingView";
import { ResourceView } from "./components/modules/ResourceView";
import { EstimationView } from "./components/modules/EstimationView";
import { BudgetCostView } from "./components/modules/BudgetCostView";
import { FinancialEvmView } from "./components/modules/FinancialEvmView";
import { RiskView } from "./components/modules/RiskView";
import { IssueView } from "./components/modules/IssueView";
import { QualityView } from "./components/modules/QualityView";
import { ChangeManagementView } from "./components/modules/ChangeManagementView";
import { CommunicationView } from "./components/modules/CommunicationView";
import { GovernanceView } from "./components/modules/GovernanceView";
import { KpiPerformanceView } from "./components/modules/KpiPerformanceView";
import { DocumentGenView } from "./components/modules/DocumentGenView";
import { PortfolioView } from "./components/modules/PortfolioView";
import { ProjectOnboardingView } from "./components/modules/ProjectOnboardingView";
import { ProjectEditView } from "./components/modules/ProjectEditView";

const MainContent: React.FC = () => {
  const { activeTab, isAuthenticated } = useProject();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderModuleView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "onboarding":
        return <ProjectOnboardingView />;
      case "edit-project":
        return <ProjectEditView />;
      case "intake":
        return <IntakeView />;
      case "stakeholders":
        return <StakeholderView />;
      case "requirements":
        return <RequirementsView />;
      case "ai-planner":
        return <AiPlannerView />;
      case "scheduling":
        return <SchedulingView />;
      case "resources":
        return <ResourceView />;
      case "estimation":
        return <EstimationView />;
      case "budget":
        return <BudgetCostView />;
      case "financial-evm":
        return <FinancialEvmView />;
      case "risks":
        return <RiskView />;
      case "issues":
        return <IssueView />;
      case "quality":
        return <QualityView />;
      case "change-management":
        return <ChangeManagementView />;
      case "communication":
        return <CommunicationView />;
      case "governance":
        return <GovernanceView />;
      case "kpis":
        return <KpiPerformanceView />;
      case "documents":
        return <DocumentGenView />;
      case "portfolio":
        return <PortfolioView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50 pb-16">
          {renderModuleView()}
        </main>
      </div>
      <CopilotDrawer />
    </div>
  );
};

export default function App() {
  return (
    <ProjectProvider>
      <MainContent />
    </ProjectProvider>
  );
}
