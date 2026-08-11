import React from "react";
import { useProject } from "../../context/ProjectContext";
import { Activity, ShieldAlert, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";

export const KpiPerformanceView: React.FC = () => {
  const { activeProject } = useProject();
  const { health = { scheduleHealth: "Green", budgetHealth: "Green", qualityHealth: "Green", riskHealth: "Green", scopeHealth: "Green", resourceHealth: "Green" }, evm = { SPI: 1.0, CPI: 1.0 }, quality = { passRatePercent: 98 } } = activeProject || {};

  const getHealthBadge = (status: string) => {
    switch (status) {
      case "Green":
        return "badge-green";
      case "Amber":
        return "badge-amber";
      default:
        return "badge-red";
    }
  };

  const kpis = [
    { title: "Schedule Performance Index (SPI)", value: evm.SPI ? evm.SPI.toFixed(2) : "1.00", status: health.scheduleHealth, desc: "Task completion velocity", glowColor: "rgba(16,185,129,0.15)" },
    { title: "Cost Performance Index (CPI)", value: evm.CPI ? evm.CPI.toFixed(2) : "1.00", status: health.budgetHealth, desc: "Budget burn rate efficiency", glowColor: "rgba(6,182,212,0.15)" },
    { title: "Quality Pass Rate", value: `${quality?.passRatePercent || 98}%`, status: health.qualityHealth, desc: "Automated test suite health", glowColor: "rgba(139,92,246,0.15)" },
    { title: "Risk Exposure Level", value: `${activeProject?.risks?.length || 0} Risks`, status: health.riskHealth, desc: "Active threat severity", glowColor: "rgba(245,158,11,0.15)" },
    { title: "Scope Drift", value: "Controlled", status: health.scopeHealth, desc: "Approved CCB change count", glowColor: "rgba(16,185,129,0.15)" },
    { title: "Resource Utilization", value: "92%", status: health.resourceHealth, desc: "Team capacity optimization", glowColor: "rgba(6,182,212,0.15)" }
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fadeIn">
      {/* Header */}
      <div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              Module 16
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMO Health Matrix</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            KPI & Performance Analytics
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            RAG health indicators across Schedule, Cost, Scope, Quality, Risk, and Resource utilization.
          </p>
        </div>
      </div>

      {/* RAG Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="animate-fadeIn">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: "20px",
              background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)` }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <p className="section-label">{kpi.title}</p>
              <span className={getHealthBadge(kpi.status)}>
                ● {kpi.status}
              </span>
            </div>
            <div className="kpi-value" style={{ marginBottom: "10px" }}>{kpi.value}</div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{kpi.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


