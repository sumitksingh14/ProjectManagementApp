import React from "react";
import { useProject } from "../../context/ProjectContext";
import { TrendingUp, DollarSign, Activity, AlertCircle, CheckCircle2 } from "lucide-react";

export const FinancialEvmView: React.FC = () => {
  const { activeProject } = useProject();
  const evm = activeProject?.evm ?? {
    BAC: 0, PV: 0, EV: 0, AC: 0, CV: 0, SV: 0,
    CPI: 1.0, SPI: 1.0, EAC: 0, ETC: 0, VAC: 0
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
              Module 9
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Earned Value Management (EVM) Standard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Financial & EVM Analytics
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Standard PMP Earned Value metrics (CPI, SPI, BAC, EAC, ETC, VAC) and S-Curve performance tracking.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* EVM Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <span className="text-[var(--text-muted)] font-medium">Cost Performance Index (CPI)</span>
          <div className="text-3xl font-extrabold text-white font-mono">{evm.CPI}</div>
          <p className="text-[10px] text-[var(--text-muted)]">Formula: EV / AC ({evm.CPI >= 1 ? "Under Budget / Efficient" : "Over Budget"})</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <span className="text-[var(--text-muted)] font-medium">Schedule Performance Index (SPI)</span>
          <div className="text-3xl font-extrabold text-white font-mono">{evm.SPI}</div>
          <p className="text-[10px] text-[var(--text-muted)]">Formula: EV / PV ({evm.SPI >= 1 ? "Ahead of Schedule" : "Behind Schedule"})</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <span className="text-[var(--text-muted)] font-medium">Estimate at Completion (EAC)</span>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">${(evm.EAC / 1000).toFixed(0)}k</div>
          <p className="text-[10px] text-[var(--text-muted)]">Formula: BAC / CPI (Baseline: ${(evm.BAC / 1000).toFixed(0)}k)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-2">
          <span className="text-[var(--text-muted)] font-medium">Variance at Completion (VAC)</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">+${(evm.VAC / 1000).toFixed(0)}k</div>
          <p className="text-[10px] text-[var(--text-muted)]">Formula: BAC - EAC (Favorable cost saving)</p>
        </div>
      </div>

      {/* EVM S-Curve Representation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          Earned Value S-Curve Performance (PV vs EV vs AC)
        </h3>

        <div className="space-y-4 text-xs">
          {/* Planned Value */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-blue-400">Planned Value (PV)</span>
              <span className="font-mono text-slate-200">${evm.PV.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: "65%" }}></div>
            </div>
          </div>

          {/* Earned Value */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-emerald-400">Earned Value (EV)</span>
              <span className="font-mono text-slate-200">${evm.EV.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-[var(--green-dim)]0 h-full" style={{ width: "68%" }}></div>
            </div>
          </div>

          {/* Actual Cost */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-purple-400">Actual Cost (AC)</span>
              <span className="font-mono text-slate-200">${evm.AC.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
