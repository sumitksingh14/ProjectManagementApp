import React from "react";
import { useProject } from "../../context/ProjectContext";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  PieChart,
  ShieldAlert,
  Edit3
} from "lucide-react";

export const DashboardView: React.FC = () => {
  const { activeProject, activePortfolio, currentRole, setActiveTab } = useProject();
  const {
    evm = { BAC: 0, PV: 0, EV: 0, AC: 0, CPI: 1.0, SPI: 1.0, EAC: 0, VAC: 0, SV: 0, CV: 0 },
    health = { overallHealth: "Green", scheduleHealth: "Green", budgetHealth: "Green", scopeHealth: "Green", qualityHealth: "Green", riskHealth: "Green", resourceHealth: "Green", aiHealthCommentary: "" },
    intake = { executiveSummary: "", strategicObjective: "" },
    risks = [],
    lifecyclePhases = [],
    name = "Project",
    code = "PRJ"
  } = activeProject || {};

  const totalTasks = (lifecyclePhases || []).reduce(
    (acc, ph) => acc + (ph.workPackages || []).reduce((wpAcc, wp) => wpAcc + (wp.tasks || []).length, 0),
    0
  );
  const completedTasks = (lifecyclePhases || []).reduce(
    (acc, ph) =>
      acc +
      (ph.workPackages || []).reduce(
        (wpAcc, wp) => wpAcc + (wp.tasks || []).filter((t) => t?.status === "Completed").length,
        0
      ),
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 68;

  const getHealthBadge = (status: string) => {
    switch (status) {
      case "Green":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold";
      case "Amber":
        return "bg-amber-50 text-amber-600 border border-amber-200 font-bold";
      default:
        return "bg-red-50 text-red-600 border border-red-200 font-bold";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-900 font-sans">
      {/* Top Banner / Portfolio Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              {activeProject?.code || "PRJ"}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getHealthBadge(health.overallHealth)}`}>
              Overall Health: {health.overallHealth}
            </span>
            <span className="text-xs text-slate-500">| View Role: <strong className="text-slate-800">{currentRole}</strong></span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{activeProject?.name}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{intake.executiveSummary || intake.strategicObjective}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab("edit-project")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Edit Project Details</span>
          </button>
          <button
            onClick={() => setActiveTab("ai-planner")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI WBS Generator</span>
          </button>
        </div>
      </div>

      {/* KPI Header Grid - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Portfolio Health</p>
          <p className="text-2xl font-bold text-slate-800">84% <span className="text-xs font-medium text-emerald-500 ml-1">+2.4%</span></p>
          <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[84%]"></div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cost Performance (CPI)</p>
          <p className="text-2xl font-bold text-slate-800">${(evm.BAC / 1000).toFixed(1)}k <span className="text-xs font-medium text-emerald-500 ml-1">CPI {evm.CPI}</span></p>
          <p className="text-[10px] text-slate-500">Under planned budget limit</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Schedule Risk Exposure</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-800">{(risks || []).filter(r => r?.status === "Open").length}</p>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">High Criticality</span>
          </div>
          <p className="text-[10px] text-slate-500">Predictively identified by AI</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resource Utilization</p>
          <p className="text-2xl font-bold text-slate-800">92%</p>
          <p className="text-[10px] text-slate-500">Targeting optimal balance</p>
        </div>
      </div>

      {/* Main Split: Gantt & Resource Allocation / AI commentary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Schedule View */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="border-b border-slate-100 p-3.5 flex justify-between items-center bg-slate-50">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Project Schedule: {activeProject.name}</h3>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 text-[10px] font-bold bg-white border border-slate-200 rounded shadow-sm text-slate-700">Day</button>
                <button className="px-2.5 py-1 text-[10px] font-bold bg-indigo-600 text-white rounded shadow-sm">Week</button>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="grid grid-cols-12 gap-0 border-b border-slate-100 pb-2 text-[10px] font-bold text-slate-400 uppercase min-w-[500px]">
                <div className="col-span-4">Phase / Task Name</div>
                <div className="col-span-8 flex justify-between">
                  <span>Oct 01</span><span>Oct 15</span><span>Nov 01</span><span>Nov 15</span><span>Dec 01</span>
                </div>
              </div>
              <div className="space-y-3.5 mt-3 min-w-[500px]">
                <div className="grid grid-cols-12 items-center text-xs">
                  <div className="col-span-4 font-semibold text-slate-700 truncate pr-2">Phase 1: Architecture Design</div>
                  <div className="col-span-8 relative h-4 bg-slate-100 rounded">
                    <div className="absolute left-[5%] w-[35%] h-full bg-indigo-500 rounded-sm opacity-90 shadow-sm"></div>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center text-xs">
                  <div className="col-span-4 font-semibold text-slate-700 truncate pr-2">Phase 2: Core Engine Build</div>
                  <div className="col-span-8 relative h-4 bg-slate-100 rounded">
                    <div className="absolute left-[40%] w-[35%] h-full bg-emerald-500 rounded-sm shadow-sm"></div>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center text-xs">
                  <div className="col-span-4 font-semibold text-slate-700 truncate pr-2">Phase 3: Integration Testing</div>
                  <div className="col-span-8 relative h-4 bg-slate-100 rounded">
                    <div className="absolute left-[70%] w-[20%] h-full bg-slate-300 rounded-sm shadow-sm"></div>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center text-xs opacity-60">
                  <div className="col-span-4 font-semibold text-slate-700 truncate pr-2">Phase 4: Global Deployment</div>
                  <div className="col-span-8 relative h-4 bg-slate-100 rounded">
                    <div className="absolute left-[90%] w-[10%] h-full bg-slate-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Load Heatmap Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Portfolio Resource Allocation</h3>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Heatmap View</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-400 uppercase bg-white border-b border-slate-100">
                    <th className="p-3">Resource Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">Projects</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
                  <tr>
                    <td className="p-3 font-bold text-slate-800">Sarah Jenkins</td>
                    <td className="p-3">Lead Architect</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <div className="h-3.5 w-3.5 bg-red-500 rounded-xs"></div>
                        <div className="h-3.5 w-3.5 bg-red-500 rounded-xs"></div>
                        <div className="h-3.5 w-3.5 bg-amber-500 rounded-xs"></div>
                      </div>
                    </td>
                    <td className="p-3">3 Active</td>
                    <td className="p-3"><span className="text-red-600 font-bold uppercase text-[10px] bg-red-50 px-1.5 py-0.5 rounded border border-red-200">Overloaded</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-800">Marcus Wong</td>
                    <td className="p-3">Senior Frontend</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <div className="h-3.5 w-3.5 bg-emerald-500 rounded-xs"></div>
                        <div className="h-3.5 w-3.5 bg-emerald-500 rounded-xs"></div>
                        <div className="h-3.5 w-3.5 bg-slate-200 rounded-xs"></div>
                      </div>
                    </td>
                    <td className="p-3">1 Active</td>
                    <td className="p-3"><span className="text-emerald-600 font-bold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Available</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: AI Health Analysis & Executive Score */}
        <div className="flex flex-col gap-6">
          <div className="bg-indigo-900 rounded-xl overflow-hidden shadow-md text-white p-4 space-y-4 border border-indigo-800">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-white flex items-center justify-center text-indigo-900 font-bold">
                  <Sparkles className="h-3.5 h-3.5 text-indigo-900" />
                </div>
                <span className="font-bold text-xs tracking-wider uppercase">Copilot Predictive AI</span>
              </div>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded font-mono">v4.2</span>
            </div>

            <div className="bg-white/10 rounded-lg p-3 text-[11px] leading-relaxed">
              <span className="text-indigo-200 font-bold mb-1 block uppercase text-[10px]">PREDICTIVE RISK ANALYSIS</span>
              {health.aiHealthCommentary}
            </div>

            <div className="bg-indigo-950/60 rounded-lg p-3 text-[11px] leading-relaxed italic border border-white/10">
              "Generate a mitigation plan for the Resource Gap identified in Mobile Banking V2."
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Executive Summary AI Health Matrix</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: "Schedule Health", status: health.scheduleHealth },
                { label: "Budget Health", status: health.budgetHealth },
                { label: "Scope Health", status: health.scopeHealth },
                { label: "Quality Health", status: health.qualityHealth },
                { label: "Risk Health", status: health.riskHealth },
                { label: "Resource Health", status: health.resourceHealth }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-md border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium text-[11px]">{item.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${getHealthBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
