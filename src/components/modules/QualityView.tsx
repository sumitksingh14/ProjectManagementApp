import React from "react";
import { useProject } from "../../context/ProjectContext";
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const QualityView: React.FC = () => {
  const { activeProject } = useProject();
  const { quality } = activeProject;

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
              Module 12
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>PMO Quality Assurance Standard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Quality Management & Quality Gates
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Monitor test coverage, defect leakage, pass rates, rework percentage, and phase sign-off quality gates.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* Quality KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Test Pass Rate</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{quality.passRatePercent}%</div>
          <p className="text-[10px] text-[var(--text-muted)]">Target: &gt; 95%</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Test Suite Coverage</span>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">{quality.testCoveragePercent}%</div>
          <p className="text-[10px] text-[var(--text-muted)]">Automated Unit & E2E</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Defect Leakage Rate</span>
          <div className="text-3xl font-extrabold text-amber-300 font-mono">{quality.defectLeakagePercent}%</div>
          <p className="text-[10px] text-[var(--text-muted)]">Target: &lt; 2.0%</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md space-y-1">
          <span className="text-[var(--text-muted)] font-medium">Active Defects</span>
          <div className="text-3xl font-extrabold text-rose-400 font-mono">{quality.defectsCount}</div>
          <p className="text-[10px] text-[var(--text-muted)]">Rework Rate: {quality.reworkPercent}%</p>
        </div>
      </div>

      {/* Quality Gates Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          Phase Sign-off Quality Gates
        </h3>

        <div className="space-y-3 text-xs">
          {quality.qualityGates.map((qg) => (
            <div key={qg.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{qg.gateName}</span>
                  <span className="text-[10px] bg-[var(--accent-glow)]0/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
                    Phase: {qg.phaseName}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  Criteria: {qg.criteria.join(" • ")}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                  qg.passed ? "bg-[var(--green-dim)]0/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                }`}>
                  {qg.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {qg.passed ? "Gate Passed" : "Gate Pending"}
                </span>
                {qg.reviewer && <span className="text-[10px] text-[var(--text-muted)]">Reviewer: {qg.reviewer}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
