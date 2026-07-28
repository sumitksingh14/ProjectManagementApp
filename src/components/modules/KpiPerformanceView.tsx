import React from "react";
import { useProject } from "../../context/ProjectContext";
import { Activity, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";

export const KpiPerformanceView: React.FC = () => {
  const { activeProject } = useProject();
  const { health, evm, quality } = activeProject;

  const getRaciBadge = (status: string) => {
    switch (status) {
      case "Green":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "Amber":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      default:
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 16
            </span>
            <span className="text-xs text-slate-400">PMO Health Matrix</span>
          </div>
          <h1 className="text-2xl font-bold text-white">KPI & Performance Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            RAG health indicators across Schedule, Cost, Scope, Quality, Risk, and Resource utilization.
          </p>
        </div>
      </div>

      {/* RAG Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Schedule Performance Index (SPI)", value: evm.SPI, status: health.scheduleHealth, desc: "Task completion velocity" },
          { title: "Cost Performance Index (CPI)", value: evm.CPI, status: health.budgetHealth, desc: "Budget burn rate efficiency" },
          { title: "Quality Pass Rate", value: `${quality.passRatePercent}%`, status: health.qualityHealth, desc: "Automated test suite health" },
          { title: "Risk Exposure Level", value: `${activeProject?.risks?.length || 0} Risks`, status: health.riskHealth, desc: "Active threat severity" },
          { title: "Scope Drift", value: "Controlled", status: health.scopeHealth, desc: "Approved CCB change count" },
          { title: "Resource Utilization", value: "92%", status: health.resourceHealth, desc: "Team capacity optimization" }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{kpi.title}</span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded border ${getRaciBadge(kpi.status)}`}>
                {kpi.status}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{kpi.value}</div>
            <p className="text-[11px] text-slate-400">{kpi.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
