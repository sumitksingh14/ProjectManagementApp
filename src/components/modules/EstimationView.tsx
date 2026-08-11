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
              Module 7
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMP Estimation Standards</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Estimation Engine & PERT Analysis
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Calculate probabilistic estimates using 3-Point PERT, Bottom-Up WBS rollup, Analogous metrics, and Expert Judgement.
          </p>
        </div>
      </div>

      {/* Interactive PERT Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
              <Calculator style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
              3-Point PERT Effort Estimator
            </h3>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Standard Formula</span>
          </div>

          <div style={{ padding: "20px" }} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block section-label mb-1.5">Optimistic Days (a)</label>
                <input
                  type="number"
                  value={optimistic}
                  onChange={(e) => setOptimistic(Number(e.target.value))}
                  className="input-dark font-mono font-bold"
                  style={{ color: "var(--green)" }}
                />
              </div>
              <div>
                <label className="block section-label mb-1.5">Most Likely Days (m)</label>
                <input
                  type="number"
                  value={mostLikely}
                  onChange={(e) => setMostLikely(Number(e.target.value))}
                  className="input-dark font-mono font-bold"
                  style={{ color: "var(--accent)" }}
                />
              </div>
              <div>
                <label className="block section-label mb-1.5">Pessimistic Days (b)</label>
                <input
                  type="number"
                  value={pessimistic}
                  onChange={(e) => setPessimistic(Number(e.target.value))}
                  className="input-dark font-mono font-bold"
                  style={{ color: "var(--pink)" }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl space-y-6 text-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-slate-300">PMP Formula: Expected Effort E = (a + 4m + b) / 6</p>
              <p className="font-mono text-slate-400">Standard Deviation σ = (b - a) / 6 = <strong className="text-white">{standardDeviation}</strong></p>
            </div>
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: "24px", background: "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, var(--bg-card) 60%)" }}>
          <div>
            <p className="section-label" style={{ color: "var(--accent)" }}>PERT Expected Estimate</p>
            <div className="kpi-value" style={{ fontSize: "2.5rem", marginTop: "12px", marginBottom: "8px" }}>
              {pertEstimate} <span style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 500 }}>Days</span>
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "8px" }}>
              68% Confidence Interval: <strong style={{ color: "var(--text-primary)" }}>{(pertEstimate - standardDeviation).toFixed(1)} - {(pertEstimate + standardDeviation).toFixed(1)} Days</strong>
            </p>
          </div>

          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            Statistical Variance: <strong style={{ color: "var(--amber)" }}>{variance}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};


