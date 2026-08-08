import React, { useState } from "react";
import { Calculator, TrendingUp, Layers, CheckCircle2, RefreshCw } from "lucide-react";

export const EstimationView: React.FC = () => {
  const [optimistic, setOptimistic] = useState<number>(10);
  const [mostLikely, setMostLikely] = useState<number>(18);
  const [pessimistic, setPessimistic] = useState<number>(32);

  // PERT Calculation: (O + 4M + P) / 6
  const pertEstimate = Number(((optimistic + 4 * mostLikely + pessimistic) / 6).toFixed(1));
  const standardDeviation = Number(((pessimistic - optimistic) / 6).toFixed(1));
  const variance = Number((standardDeviation * standardDeviation).toFixed(2));

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
              Module 7
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>PMP Estimation Standards</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Estimation Engine & PERT Analysis
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Calculate probabilistic estimates using 3-Point PERT, Bottom-Up WBS rollup, Analogous metrics, and Expert Judgement.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* Interactive PERT Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            3-Point PERT Effort Estimator
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[var(--text-muted)] mb-1 font-semibold">Optimistic Days (a)</label>
              <input
                type="number"
                value={optimistic}
                onChange={(e) => setOptimistic(Number(e.target.value))}
                className="w-full form-input-dark text-[var(--green)] font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1 font-semibold">Most Likely Days (m)</label>
              <input
                type="number"
                value={mostLikely}
                onChange={(e) => setMostLikely(Number(e.target.value))}
                className="w-full form-input-dark text-[var(--accent)] font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1 font-semibold">Pessimistic Days (b)</label>
              <input
                type="number"
                value={pessimistic}
                onChange={(e) => setPessimistic(Number(e.target.value))}
                className="w-full form-input-dark text-[var(--pink)] font-mono font-bold"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] space-y-2 text-xs">
            <p className="text-[var(--text-muted)] font-mono">PMP Formula: Expected Effort E = (a + 4m + b) / 6</p>
            <p className="text-[var(--text-muted)] font-mono">Standard Deviation σ = (b - a) / 6 = {standardDeviation}</p>
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">PERT Expected Estimate</span>
            <div className="text-4xl font-black text-white mt-2 font-mono">
              {pertEstimate} <span className="text-sm text-indigo-300 font-normal">Days</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              68% Confidence Interval: <strong className="text-white">{(pertEstimate - standardDeviation).toFixed(1)} - {(pertEstimate + standardDeviation).toFixed(1)} Days</strong>
            </p>
          </div>

          <div className="pt-3 border-t border-indigo-500/20 text-xs text-[var(--text-muted)]">
            Statistical Variance: <strong className="text-amber-300">{variance}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

