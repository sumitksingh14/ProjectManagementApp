import React from "react";
import { useProject } from "../../context/ProjectContext";
import { TrendingUp, DollarSign, Activity, AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const FinancialEvmView: React.FC = () => {
  const { activeProject } = useProject();
  const evm = activeProject?.evm ?? {
    BAC: 0, PV: 0, EV: 0, AC: 0, CV: 0, SV: 0,
    CPI: 1.0, SPI: 1.0, EAC: 0, ETC: 0, VAC: 0
  };

  const kpis = [
    {
      label: "Cost Performance Index (CPI)",
      value: evm.CPI.toFixed(2),
      delta: evm.CPI >= 1 ? "Cost Efficient" : "Over Budget",
      up: evm.CPI >= 1,
      sub: `Formula: EV / AC (${evm.CPI >= 1 ? "Under Budget" : "Cost Overrun"})`,
      accentColor: evm.CPI >= 1 ? "var(--green)" : "var(--pink)",
      glowColor: evm.CPI >= 1 ? "rgba(16,185,129,0.15)" : "rgba(236,72,153,0.15)",
    },
    {
      label: "Schedule Performance Index (SPI)",
      value: evm.SPI.toFixed(2),
      delta: evm.SPI >= 1 ? "Ahead of Schedule" : "Behind Schedule",
      up: evm.SPI >= 1,
      sub: `Formula: EV / PV (${evm.SPI >= 1 ? "Optimal Velocity" : "Schedule Delay"})`,
      accentColor: evm.SPI >= 1 ? "var(--green)" : "var(--amber)",
      glowColor: evm.SPI >= 1 ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
    },
    {
      label: "Estimate at Completion (EAC)",
      value: `$${((evm.EAC || 0) / 1000).toFixed(0)}k`,
      delta: "EAC Forecast",
      up: true,
      sub: `Baseline BAC: $${((evm.BAC || 0) / 1000).toFixed(0)}k`,
      accentColor: "var(--accent)",
      glowColor: "rgba(139,92,246,0.15)",
    },
    {
      label: "Variance at Completion (VAC)",
      value: `+ $${((evm.VAC || 0) / 1000).toFixed(0)}k`,
      delta: "Favorable Variance",
      up: true,
      sub: "Formula: BAC - EAC (Cost Savings)",
      accentColor: "var(--cyan)",
      glowColor: "rgba(6,182,212,0.15)",
    },
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
              Module 9
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Earned Value Management (EVM) Standard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Financial & EVM Analytics
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Standard PMP Earned Value metrics (CPI, SPI, BAC, EAC, ETC, VAC) and S-Curve performance tracking.
          </p>
        </div>
      </div>

      {/* EVM Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="animate-fadeIn">
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
              {kpi.up
                ? <ArrowUpRight style={{ width: "13px", height: "13px", color: kpi.accentColor }} />
                : <ArrowDownRight style={{ width: "13px", height: "13px", color: "var(--pink)" }} />
              }
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: kpi.accentColor }}>{kpi.delta}</span>
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "6px" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* EVM S-Curve Representation */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Earned Value S-Curve Performance (PV vs EV vs AC)
          </h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Cumulative S-Curve</span>
        </div>

        <div style={{ padding: "20px" }} className="space-y-5 text-sm">
          {/* Planned Value */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-semibold text-cyan-400">Planned Value (PV)</span>
              <span className="font-mono text-slate-200 font-bold">${(evm.PV || 0).toLocaleString()}</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-white/[0.04]">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full shadow-sm" style={{ width: "65%" }}></div>
            </div>
          </div>

          {/* Earned Value */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-semibold text-emerald-400">Earned Value (EV)</span>
              <span className="font-mono text-slate-200 font-bold">${(evm.EV || 0).toLocaleString()}</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-white/[0.04]">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full shadow-sm" style={{ width: "68%" }}></div>
            </div>
          </div>

          {/* Actual Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-semibold text-violet-400">Actual Cost (AC)</span>
              <span className="font-mono text-slate-200 font-bold">${(evm.AC || 0).toLocaleString()}</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-white/[0.04]">
              <div className="bg-gradient-to-r from-violet-600 to-purple-500 h-full rounded-full shadow-sm" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


