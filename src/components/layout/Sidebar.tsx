import React from "react";
import { useProject } from "../../context/ProjectContext";
import { isModuleAllowed } from "../../auth/roleConfig";
import {
  LayoutDashboard,
  PieChart,
  FileSpreadsheet,
  Users,
  CheckSquare,
  Sparkles,
  Calendar,
  UserCheck,
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  GitPullRequest,
  MessageSquare,
  Landmark,
  Activity,
  FileText,
  Briefcase,
  Edit3,
  PlusCircle,
  Target,
  Package,
  Archive,
  GitMerge,
  Layers
} from "lucide-react";

interface NavGroup {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, activeProject, currentRole, authUser } = useProject();

  const navGroups: NavGroup[] = [
    {
      title: "Governance",
      items: [
        { id: "dashboard",    label: "PMO Overview",        icon: LayoutDashboard },
        { id: "onboarding",   label: "Project Onboarding",  icon: PlusCircle,     badge: "NEW",  badgeColor: "badge-violet" },
        { id: "edit-project", label: "Edit Project",        icon: Edit3,          badge: "EDIT", badgeColor: "badge-cyan" },
        { id: "portfolio",    label: "Portfolios & Health",  icon: Briefcase,      badge: "M18",  badgeColor: "badge-violet" },
        { id: "intake",       label: "Project Intake",       icon: FileSpreadsheet,badge: "M1" },
        { id: "governance",   label: "Cost & Governance",    icon: Landmark,       badge: "M15" },
      ]
    },
    {
      title: "Scope & Planning",
      items: [
        { id: "stakeholders", label: "Stakeholders",     icon: Users,     badge: "M2" },
        { id: "requirements", label: "Requirements",     icon: CheckSquare,badge: "M3" },
        { id: "ai-planner",   label: "AI WBS Generator", icon: Sparkles,  badge: "AI", badgeColor: "badge-violet" },
        { id: "scheduling",   label: "Schedule & Gantt", icon: Calendar,  badge: "M5" },
        { id: "resources",    label: "Resource Alloc.",  icon: UserCheck, badge: "M6" },
      ]
    },
    {
      title: "Financials & EVM",
      items: [
        { id: "budget",      label: "Budget & Cost",   icon: DollarSign, badge: "M8" },
        { id: "evm",         label: "EVM Analytics",   icon: TrendingUp, badge: "M9", badgeColor: "badge-cyan" },
        { id: "estimation",  label: "Estimation",      icon: Calculator, badge: "M7" },
      ]
    },
    {
      title: "Risks & Quality",
      items: [
        {
          id: "risks",
          label: "Risk Register",
          icon: AlertTriangle,
          badge: `${(activeProject?.risks || []).filter((r) => r.status === "Open").length || "0"}`,
          badgeColor: "badge-red"
        },
        {
          id: "issues",
          label: "Issue Tracking",
          icon: HelpCircle,
          badge: `${(activeProject?.issues || []).filter((i) => i.status !== "Resolved").length || "0"}`,
          badgeColor: "badge-amber"
        },
        { id: "quality",           label: "Quality Gates",   icon: ShieldAlert,   badge: "M12" },
        { id: "change-management", label: "Change Requests",  icon: GitPullRequest, badge: "M13" },
      ]
    },
    {
      title: "Reporting",
      items: [
        { id: "communication", label: "Communication",  icon: MessageSquare, badge: "M14" },
        { id: "kpis",          label: "KPI Performance",icon: Activity,      badge: "M16", badgeColor: "badge-cyan" },
        { id: "documents",     label: "Document Export",icon: FileText,      badge: "M17" },
      ]
    },
    {
      title: "Program Management",
      items: [
        { id: "program-hub", label: "Program Hub",       icon: GitMerge, badge: "PGM", badgeColor: "badge-violet" },
        { id: "benefits",    label: "Benefits Realization",icon: Target,  badge: "BRM" },
        { id: "vendors",     label: "Vendor Management", icon: Package,  badge: "VND" },
        { id: "closure",     label: "Project Closure",   icon: Archive,  badge: "CLO" },
      ]
    }
  ];

  return (
    <aside
      className="shrink-0 flex flex-col h-screen overflow-hidden"
      style={{
        width: "220px",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2.5 px-4 shrink-0"
        style={{ height: "56px", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: "32px", height: "32px",
            background: "var(--grad-primary)",
            boxShadow: "0 4px 12px var(--accent-glow)"
          }}
        >
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-0.5 leading-tight">
            <span style={{ fontWeight: 800, fontSize: "var(--text-base)", color: "var(--text-primary)" }}>ProjectPlanner</span>
            <span style={{ fontWeight: 800, fontSize: "var(--text-base)", color: "var(--accent)" }}>AI</span>
          </div>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.02em" }}>Enterprise PMO Suite</p>
        </div>
      </div>

      {/* Nav scroll area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group, idx) => {
          const visibleItems = group.items.filter(item => isModuleAllowed(currentRole, item.id));
          if (visibleItems.length === 0) return null;
          return (
            <div key={idx}>
              <p className="section-label px-2 mb-1.5">{group.title}</p>
              <ul className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
                        style={{
                          color: isActive ? "#fff" : "var(--text-secondary)",
                          fontSize: "var(--text-sm)",
                          marginLeft: isActive ? "0" : undefined,
                        }}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon
                            className="shrink-0"
                            style={{
                              width: "14px", height: "14px",
                              color: isActive ? "var(--accent)" : "var(--text-muted)"
                            }}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`font-bold px-1.5 py-0.5 rounded-md shrink-0 ${item.badgeColor || ""}`}
                            style={{
                              fontSize: "var(--text-xs)",
                              ...(item.badgeColor ? {} : {
                                background: isActive ? "var(--accent-glow)" : "rgba(255,255,255,0.05)",
                                color: isActive ? "var(--accent)" : "var(--text-muted)",
                                border: "1px solid " + (isActive ? "var(--accent-border)" : "var(--border)"),
                              })
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* User card at bottom */}
      <div
        className="px-3 py-3 shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center gap-2.5 p-2.5 rounded-xl"
          style={{ background: "var(--accent-glow)", border: "1px solid var(--accent-border)" }}
        >
          <div
            className="rounded-lg flex items-center justify-center text-white font-bold shrink-0"
            style={{
              width: "30px", height: "30px",
              background: authUser?.roleColor || "var(--grad-primary)",
              fontSize: "var(--text-xs)"
            }}
          >
            {authUser?.avatarInitials || "SK"}
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)" }} className="truncate">
              {authUser?.displayName || "Sumit"}
            </p>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--accent)", fontWeight: 500 }} className="truncate">
              {authUser?.role || "PMO Admin"}
            </p>
          </div>
        </div>

        {/* AI Copilot indicator */}
        <div className="mt-2 flex items-center gap-1.5 px-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 500 }}>AI Copilot Active</p>
        </div>
      </div>
    </aside>
  );
};
