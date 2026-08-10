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
  Search,
  Sun,
  Moon,
  Bell,
  LogOut
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
  const {
    activeTab,
    setActiveTab,
    activeProject,
    currentRole,
    authUser,
    searchQuery,
    setSearchQuery,
    copilotOpen,
    setCopilotOpen,
    logout
  } = useProject();

  const navGroups: NavGroup[] = [
    {
      title: "Governance",
      items: [
        { id: "dashboard",    label: "PMO Overview",        icon: LayoutDashboard },
        { id: "onboarding",   label: "Project Onboarding",  icon: PlusCircle,     badge: "NEW" },
        { id: "edit-project", label: "Edit Project",        icon: Edit3,          badge: "EDIT" },
        { id: "portfolio",    label: "Portfolios & Health",  icon: Briefcase,      badge: "M18" },
        { id: "intake",       label: "Project Intake",       icon: FileSpreadsheet,badge: "M1" },
        { id: "governance",   label: "Cost & Governance",    icon: Landmark,       badge: "M15" },
      ]
    },
    {
      title: "Scope & Planning",
      items: [
        { id: "stakeholders", label: "Stakeholders",     icon: Users,     badge: "M2" },
        { id: "requirements", label: "Requirements",     icon: CheckSquare,badge: "M3" },
        { id: "ai-planner",   label: "AI WBS Generator", icon: Sparkles,  badge: "AI" },
        { id: "scheduling",   label: "Schedule & Gantt", icon: Calendar,  badge: "M5" },
        { id: "resources",    label: "Resource Alloc.",  icon: UserCheck, badge: "M6" },
      ]
    },
    {
      title: "Financials & EVM",
      items: [
        { id: "budget",      label: "Budget & Cost",   icon: DollarSign, badge: "M8" },
        { id: "evm",         label: "EVM Analytics",   icon: TrendingUp, badge: "M9" },
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
          badge: `${(activeProject?.risks || []).filter((r) => r.status === "Open").length || "5"}`
        },
        {
          id: "issues",
          label: "Issue Tracking",
          icon: HelpCircle,
          badge: `${(activeProject?.issues || []).filter((i) => i.status !== "Resolved").length || "1"}`
        },
        { id: "quality",           label: "Quality Gates",   icon: ShieldAlert,   badge: "M12" },
        { id: "change-management", label: "Change Requests",  icon: GitPullRequest, badge: "M13" },
      ]
    },
    {
      title: "Reporting",
      items: [
        { id: "communication", label: "Communication",  icon: MessageSquare, badge: "M14" },
        { id: "kpis",          label: "KPI Performance",icon: Activity,      badge: "M16" },
        { id: "documents",     label: "Document Export",icon: FileText,      badge: "M17" },
      ]
    },
    {
      title: "Program Management",
      items: [
        { id: "program-hub", label: "Program Hub",       icon: GitMerge, badge: "PGM" },
        { id: "benefits",    label: "Benefits Realization",icon: Target,  badge: "BRM" },
        { id: "vendors",     label: "Vendor Management", icon: Package,  badge: "VND" },
        { id: "closure",     label: "Project Closure",   icon: Archive,  badge: "CLO" },
      ]
    }
  ];

  return (
    <aside
      className="shrink-0 flex flex-col h-screen overflow-hidden text-slate-200 select-none"
      style={{
        width: "256px",
        background: "#0B0A12",
        borderRight: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Brand Header (Dashify Style) */}
      <div className="flex items-center gap-3 px-4 shrink-0 h-[60px]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-violet-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-purple-500/25 shrink-0">
          <div className="w-full h-full rounded-full bg-[#120F1D] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <span className="font-bold text-[16px] text-white tracking-tight">ProjectPlanner</span>
          <span className="font-bold text-[16px] text-purple-400">AI</span>
        </div>
      </div>

      {/* Search Input Bar (Matching Dashify Screenshot) */}
      <div className="px-3.5 mb-2 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1A1726] border border-white/[0.06] focus-within:border-purple-500/40 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[13px] text-slate-200 placeholder-slate-400 w-full min-w-0"
          />
          <span className="text-[12px] font-mono font-medium text-slate-400 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-md shrink-0">
            Ctrl+D
          </span>
        </div>
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 sidebar-scroll">
        {navGroups.map((group, idx) => {
          const visibleItems = group.items.filter(item => isModuleAllowed(currentRole, item.id));
          if (visibleItems.length === 0) return null;
          return (
            <div key={idx} className={idx > 0 ? "pt-4 mt-4 border-t border-white/[0.06]" : ""}>
              <p className="px-3 mb-2.5 text-[12px] font-medium text-slate-400 select-none">
                {group.title}
              </p>
              <ul className="space-y-2">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  const isNumericBadge = item.badge && !isNaN(Number(item.badge));
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer sidebar-item ${
                          isActive ? "sidebar-item-active" : "text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className="shrink-0 transition-colors"
                            style={{
                              width: "18px",
                              height: "18px",
                              color: isActive ? "#FFFFFF" : "#94A3B8"
                            }}
                          />
                          <span className="truncate text-left font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`shrink-0 font-mono ${
                              isNumericBadge
                                ? "min-w-[20px] h-[20px] px-1 rounded-full bg-white/[0.08] text-slate-300 text-[12px] font-semibold flex items-center justify-center leading-none"
                                : "text-[12px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10"
                            }`}
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

      {/* Darkmode Toggle Bar (Matching Dashify Screenshot) */}
      <div className="px-3.5 py-3 border-t border-white/[0.06] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 text-slate-300 text-[13px] font-medium">
          <div className="w-11 h-6 rounded-full bg-[#1A1726] border border-white/10 p-0.5 flex items-center justify-between">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400">
              <Sun className="w-3 h-3" />
            </div>
            <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm">
              <Moon className="w-3 h-3" />
            </div>
          </div>
          <span>Darkmode</span>
        </div>
      </div>

      {/* User Profile Footer (Matching Dashify Screenshot) */}
      <div className="px-3.5 py-3 border-t border-white/[0.06] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {authUser?.avatarInitials || "SK"}
            </div>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-[#0B0A12]" />
          </div>
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-white truncate leading-tight">
              {authUser?.displayName || "DashView"}
            </p>
            <p className="text-[12px] text-slate-400 truncate leading-tight">
              {authUser?.role || "PMO Admin"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setCopilotOpen(!copilotOpen)}
            className="relative p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="AI Copilot"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-500" />
          </button>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

