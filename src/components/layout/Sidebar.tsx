import React from "react";
import { useProject } from "../../context/ProjectContext";
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
  Briefcase
} from "lucide-react";

interface NavGroup {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, activeProject } = useProject();

  const navGroups: NavGroup[] = [
    {
      title: "Governance",
      items: [
        { id: "dashboard", label: "PMO Overview", icon: LayoutDashboard },
        { id: "portfolio", label: "Portfolios & Health", icon: Briefcase, badge: "M18" },
        { id: "intake", label: "Project Intake", icon: FileSpreadsheet, badge: "M1" },
        { id: "governance", label: "Cost & Governance", icon: Landmark, badge: "M15" }
      ]
    },
    {
      title: "Scope & Planning",
      items: [
        { id: "stakeholders", label: "Stakeholders", icon: Users, badge: "M2" },
        { id: "requirements", label: "Requirements", icon: CheckSquare, badge: "M3" },
        { id: "ai-planner", label: "AI WBS Generator", icon: Sparkles, badge: "AI" },
        { id: "scheduling", label: "Schedule & Gantt", icon: Calendar, badge: "M5" },
        { id: "resources", label: "Resource Allocation", icon: UserCheck, badge: "M6" }
      ]
    },
    {
      title: "Financials & EVM",
      items: [
        { id: "budget", label: "Budget & Cost", icon: DollarSign, badge: "M8" },
        { id: "evm", label: "EVM Analytics", icon: TrendingUp, badge: "M9" },
        { id: "estimation", label: "Estimation", icon: Calculator, badge: "M7" }
      ]
    },
    {
      title: "Risks & Quality",
      items: [
        {
          id: "risks",
          label: "Risk Register",
          icon: AlertTriangle,
          badge: `${(activeProject?.risks || []).filter((r) => r.status === "Open").length}`
        },
        {
          id: "issues",
          label: "Issue Tracking",
          icon: HelpCircle,
          badge: `${(activeProject?.issues || []).filter((i) => i.status !== "Resolved").length}`
        },
        { id: "quality", label: "Quality Gates", icon: ShieldAlert, badge: "M12" },
        { id: "change-mgmt", label: "Change Requests", icon: GitPullRequest, badge: "M13" }
      ]
    },
    {
      title: "Reporting",
      items: [
        { id: "communication", label: "Communication", icon: MessageSquare, badge: "M14" },
        { id: "kpis", label: "KPI Performance", icon: Activity, badge: "M16" },
        { id: "documents", label: "Document Export", icon: FileText, badge: "M17" }
      ]
    }
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-900 p-4 text-slate-300 flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto select-none">
      <div className="space-y-5">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? "bg-white/10 text-white font-semibold shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isActive
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-800 text-slate-400 border border-slate-700/60"
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
        ))}

        {/* Active Projects Quick Section */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Active Projects</p>
          <ul className="space-y-2.5 px-2">
            <li className="border-l-2 border-emerald-500 pl-3">
              <p className="text-xs font-medium text-white truncate">{activeProject.name}</p>
              <p className="text-[10px] text-slate-500">84% Portfolio Health</p>
            </li>
            <li className="border-l-2 border-amber-500 pl-3">
              <p className="text-xs font-medium text-white truncate">ERP Migration S/4HANA</p>
              <p className="text-[10px] text-slate-500">Delay Risk (Medium)</p>
            </li>
          </ul>
        </div>
      </div>

      {/* AI Copilot Card */}
      <div className="mt-6 rounded-xl bg-indigo-500/20 p-3.5 border border-indigo-500/30">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
          <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">AI Copilot Ready</p>
        </div>
        <p className="text-[11px] text-indigo-100 leading-snug">
          Ask me to generate a Risk Register or EVM variance forecast.
        </p>
      </div>
    </aside>
  );
};
