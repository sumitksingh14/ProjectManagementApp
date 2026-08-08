import React from "react";
import { useProject } from "../../context/ProjectContext";
import { Activity, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";

export const KpiPerformanceView: React.FC = () => {
  const { activeProject } = useProject();
  const { health, evm, quality } = activeProject;

  const getRaciBadge = (status: string) => {
    switch (status) {
      case "Green":
        return "bg-[var(--green-dim)]0/20 text-emerald-400 border-emerald-500/40";
      case "Amber":
        return "bg-[var(--amber-dim)]0/20 text-amber-400 border-amber-500/40";
      default:
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              Module 16
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>PMO Health Matrix</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            KPI & Performance Analytics
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            RAG health indicators across Schedule, Cost, Scope, Quality, Risk, and Resource utilization.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
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
          <div key={idx} className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">{kpi.title}</span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded border ${getRaciBadge(kpi.status)}`}>
                {kpi.status}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{kpi.value}</div>
            <p className="text-[11px] text-[var(--text-muted)]">{kpi.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

