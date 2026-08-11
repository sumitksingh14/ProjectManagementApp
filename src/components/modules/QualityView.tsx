import React from "react";
import { useProject } from "../../context/ProjectContext";
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, ArrowUpRight } from "lucide-react";

export const QualityView: React.FC = () => {
  const { activeProject } = useProject();
  const quality = activeProject?.quality || {
    passRatePercent: 98,
    testCoveragePercent: 94,
    defectLeakagePercent: 0.8,
    defectsCount: 2,
    reworkPercent: 1.5,
    qualityGates: []
  };

  const kpis = [
    { label: "Test Pass Rate", value: `${quality.passRatePercent}%`, delta: "Target: > 95%", up: true, sub: "Automated test execution", accentColor: "var(--green)", glowColor: "rgba(16,185,129,0.15)" },
    { label: "Test Suite Coverage", value: `${quality.testCoveragePercent}%`, delta: "High Coverage", up: true, sub: "Unit, Integration & E2E", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
    { label: "Defect Leakage Rate", value: `${quality.defectLeakagePercent}%`, delta: "Target: < 2.0%", up: true, sub: "Production release defects", accentColor: "var(--amber)", glowColor: "rgba(245,158,11,0.15)" },
    { label: "Active Defects", value: String(quality.defectsCount), delta: `Rework: ${quality.reworkPercent}%`, up: quality.defectsCount <= 3, sub: "Currently open QA tickets", accentColor: "var(--pink)", glowColor: "rgba(236,72,153,0.15)" },
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
              Module 12
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMO Quality Assurance Standard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Quality Management & Quality Gates
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Monitor test coverage, defect leakage, pass rates, rework percentage, and phase sign-off quality gates.
          </p>
        </div>
      </div>

      {/* Quality KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="animate-fadeIn">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "20px",
              background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)` }}
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

      {/* Quality Gates Checklist */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Phase Sign-off Quality Gates
          </h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Governance Audit</span>
        </div>

        <div style={{ padding: "18px 20px" }} className="space-y-6 text-sm">
          {(quality.qualityGates || []).map((qg) => (
            <div key={qg.id} className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{qg.gateName}</span>
                  <span className="badge-violet" style={{ fontSize: "12px" }}>
                    Phase: {qg.phaseName}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                  Criteria: {qg.criteria.join(" • ")}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={qg.passed ? "badge-green" : "badge-red"}>
                  {qg.passed ? <CheckCircle2 className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />}
                  {qg.passed ? "Gate Passed" : "Gate Pending"}
                </span>
                {qg.reviewer && <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Reviewer: {qg.reviewer}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


