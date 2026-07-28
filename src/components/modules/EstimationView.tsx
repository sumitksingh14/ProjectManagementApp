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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 7
            </span>
            <span className="text-xs text-slate-400">PMP Estimation Standards</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Estimation Engine & PERT Analysis</h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculate probabilistic estimates using 3-Point PERT, Bottom-Up WBS rollup, Analogous metrics, and Expert Judgement.
          </p>
        </div>
      </div>

      {/* Interactive PERT Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            3-Point PERT Effort Estimator
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Optimistic Days (a)</label>
              <input
                type="number"
                value={optimistic}
                onChange={(e) => setOptimistic(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-emerald-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Most Likely Days (m)</label>
              <input
                type="number"
                value={mostLikely}
                onChange={(e) => setMostLikely(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-indigo-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Pessimistic Days (b)</label>
              <input
                type="number"
                value={pessimistic}
                onChange={(e) => setPessimistic(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-rose-400 font-mono font-bold"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
            <p className="text-slate-400 font-mono">PMP Formula: Expected Effort E = (a + 4m + b) / 6</p>
            <p className="text-slate-400 font-mono">Standard Deviation σ = (b - a) / 6 = {standardDeviation}</p>
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">PERT Expected Estimate</span>
            <div className="text-4xl font-black text-white mt-2 font-mono">
              {pertEstimate} <span className="text-sm text-indigo-300 font-normal">Days</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              68% Confidence Interval: <strong className="text-white">{(pertEstimate - standardDeviation).toFixed(1)} - {(pertEstimate + standardDeviation).toFixed(1)} Days</strong>
            </p>
          </div>

          <div className="pt-3 border-t border-indigo-500/20 text-xs text-slate-300">
            Statistical Variance: <strong className="text-amber-300">{variance}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
