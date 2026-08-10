import React from "react";
import { useProject } from "../../context/ProjectContext";
import { DollarSign, PieChart, TrendingUp, AlertTriangle, ArrowUpRight } from "lucide-react";

export const BudgetCostView: React.FC = () => {
  const { activeProject } = useProject();
  const costLineItems = activeProject?.costLineItems || [];
  const intake = activeProject?.intake || { estimatedBudget: 0 };

  const totalPlanned = costLineItems.reduce((acc, c) => acc + c.plannedAmount, 0);
  const totalForecast = costLineItems.reduce((acc, c) => acc + c.forecastAmount, 0);
  const totalActual = costLineItems.reduce((acc, c) => acc + c.actualAmount, 0);

  const kpis = [
    { label: "Approved Planned Budget", value: `$${totalPlanned.toLocaleString()}`, delta: "Baseline Budget", up: true, sub: "Total baseline allocation", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
    { label: "Forecasted Total Spend", value: `$${totalForecast.toLocaleString()}`, delta: totalForecast <= totalPlanned ? "Within Plan" : "Above Plan", up: totalForecast <= totalPlanned, sub: "End of project EAC projection", accentColor: "var(--cyan)", glowColor: "rgba(6,182,212,0.15)" },
    { label: "Actual Incurred Spend", value: `$${totalActual.toLocaleString()}`, delta: "Actual To Date", up: true, sub: "Billed and posted costs", accentColor: "var(--green)", glowColor: "rgba(16,185,129,0.15)" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", fontFamily: "Inter, sans-serif" }} className="space-y-6 animate-fadeIn">
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
              Module 8
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Cost Breakdown Structure (CBS)</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Budget & Cost Management
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Track planned budget vs forecast vs actual expenditures across Labor, Cloud, Licenses, Vendors & Contingency.
          </p>
        </div>
      </div>

      {/* Financial Summary KPI Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="animate-fadeIn">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "20px",
              background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)`,
            }}
          >
            <p className="section-label" style={{ marginBottom: "12px" }}>{kpi.label}</p>
            <div className="kpi-value" style={{ marginBottom: "10px" }}>{kpi.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ArrowUpRight style={{ width: "13px", height: "13px", color: kpi.accentColor }} />
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: kpi.accentColor }}>{kpi.delta}</span>
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "6px" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Cost Breakdown Structure Table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <DollarSign style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Cost Breakdown Structure (CBS) Line Items
          </h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Financial Ledger</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Cost Category", "Description", "Planned ($)", "Forecast ($)", "Actual Incurred ($)", "Variance ($)"].map(h => (
                <th key={h} className="section-label" style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costLineItems.map((c) => {
              const variance = c.plannedAmount - c.forecastAmount;
              return (
                <tr key={c.id} className="table-row-dark">
                  <td style={{ padding: "14px 20px" }}>
                    <span className="badge-violet">
                      {c.category}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", color: "var(--text-secondary)" }}>{c.description}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", fontFamily: "monospace", color: "var(--text-primary)", fontWeight: 600 }}>${c.plannedAmount.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", fontFamily: "monospace", color: "var(--cyan)", fontWeight: 600 }}>${c.forecastAmount.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", fontFamily: "monospace", color: "var(--green)", fontWeight: 600 }}>${c.actualAmount.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px", fontSize: "12px", fontFamily: "monospace", fontWeight: 700 }}>
                    <span style={{ color: variance >= 0 ? "var(--green)" : "var(--pink)" }}>
                      {variance >= 0 ? `+$${variance.toLocaleString()}` : `-$${Math.abs(variance).toLocaleString()}`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


