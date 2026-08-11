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
import { ProgramHubView } from "./components/modules/ProgramHubView";
import { BenefitsView } from "./components/modules/BenefitsView";
import { ClosureView } from "./components/modules/ClosureView";
import { VendorView } from "./components/modules/VendorView";
import { IdeasPortalView } from "./components/modules/ideas/IdeasPortalView";

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
      case "program-hub":
        return <ProgramHubView />;
      case "benefits":
        return <BenefitsView />;
      case "closure":
        return <ClosureView />;
      case "vendors":
        return <VendorView />;
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
      case "evm":
        return <FinancialEvmView />;
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
      case "ideas-portal":
        return <IdeasPortalView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div
      className="font-sans selection:bg-violet-500 selection:text-white"
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--bg-page)",
            paddingBottom: "32px",
          }}
        >
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
