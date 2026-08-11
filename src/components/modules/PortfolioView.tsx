import React from "react";
import { useProject } from "../../context/ProjectContext";
import { Layers, TrendingUp, DollarSign, ArrowRight, ShieldCheck, Briefcase, ArrowUpRight } from "lucide-react";

export const PortfolioView: React.FC = () => {
  const { activePortfolio, activeProject, setActiveProjectById } = useProject();

  const portfolioName = activePortfolio?.name || "Enterprise Digital Portfolio";
  const portfolioDesc = activePortfolio?.description || "Strategic IT and Product Initiatives";
  const portfolioBudget = activePortfolio?.totalBudget ? (activePortfolio.totalBudget / 1000000).toFixed(1) : "12.5";
  const portfolioOwner = activePortfolio?.owner || "VP of Strategy";
  const alignmentScore = activePortfolio?.strategicAlignmentScore || 92;
  const projectList = activePortfolio?.projects || [];

  const kpis = [
    { label: "Total Portfolio Investment", value: `$${portfolioBudget}M`, delta: `Owner: ${portfolioOwner}`, up: true, sub: "Approved Capital Allocation", accentColor: "var(--cyan)", glowColor: "rgba(6,182,212,0.15)" },
    { label: "Strategic Alignment Score", value: `${alignmentScore} / 100`, delta: "Corporate Target 2026", up: true, sub: "High Strategic Value", accentColor: "var(--green)", glowColor: "rgba(16,185,129,0.15)" },
    { label: "Active Projects Under Management", value: String(projectList.length), delta: "PMO Supervision", up: true, sub: "Active Supervised Initiatives", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fadeIn">
      {/* Hero Banner */}
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
              Module 18 & 20
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Enterprise PMO Portfolio Management</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            {portfolioName}
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            {portfolioDesc}
          </p>
        </div>
      </div>

      {/* Portfolio KPI Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="animate-fadeIn">
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

      {/* Portfolio Projects Cards */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Portfolio Projects Roster
          </h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Executive View</span>
        </div>

        <div style={{ padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {projectList.map((p) => {
              const isCurrent = p.id === activeProject?.id;
              const healthBadge = p.health?.overallHealth === "Red" ? "badge-red" :
                                  p.health?.overallHealth === "Amber" ? "badge-amber" : "badge-green";

              return (
                <div
                  key={p.id}
                  onClick={() => setActiveProjectById(p.id)}
                  className={`glass-card p-5 transition-all cursor-pointer space-y-6 group ${
                    isCurrent
                      ? "border-[var(--accent)] shadow-[0_0_15px_var(--accent-glow)]"
                      : "hover:border-[var(--accent-border)]"
                  }`}
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="badge-cyan font-mono">{p.code}</span>
                    <span className={healthBadge}>● {p.health?.overallHealth || "Green"}</span>
                  </div>

                  <div>
                    <h4 className="card-heading group-hover:text-[var(--accent)] transition-colors">{p.name}</h4>
                    <p className="body-text text-sm line-clamp-2 mt-1">{p.intake?.strategicObjective || "No strategic objective defined."}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <div className="flex gap-6 font-mono text-sm text-[var(--text-primary)]">
                      <span className="flex items-center gap-2">
                        <span className="text-[var(--text-muted)]">CPI:</span> 
                        <strong className={p.evm?.CPI < 1 ? "text-[var(--pink)]" : "text-[var(--green)]"}>{p.evm?.CPI || 1.0}</strong>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-[var(--text-muted)]">SPI:</span> 
                        <strong className={p.evm?.SPI < 1 ? "text-[var(--pink)]" : "text-[var(--green)]"}>{p.evm?.SPI || 1.0}</strong>
                      </span>
                    </div>
                    <span className={`flex items-center gap-2 font-semibold text-sm ${isCurrent ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"}`}>
                      {isCurrent ? "Active Project" : "Switch View"} 
                      <ArrowRight className={`w-3.5 h-3.5 ${isCurrent ? "" : "opacity-50 group-hover:opacity-100"} transition-all group-hover:translate-x-1`} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

