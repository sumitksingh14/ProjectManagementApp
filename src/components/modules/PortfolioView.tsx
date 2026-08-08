import React from "react";
import { useProject } from "../../context/ProjectContext";
import { Layers, TrendingUp, DollarSign, ArrowRight, ShieldCheck, Briefcase } from "lucide-react";

export const PortfolioView: React.FC = () => {
  const { activePortfolio, activeProject, setActiveProjectById } = useProject();

  const portfolioName = activePortfolio?.name || "Enterprise Digital Portfolio";
  const portfolioDesc = activePortfolio?.description || "Strategic IT and Product Initiatives";
  const portfolioBudget = activePortfolio?.totalBudget ? (activePortfolio.totalBudget / 1000000).toFixed(1) : "12.5";
  const portfolioOwner = activePortfolio?.owner || "VP of Strategy";
  const alignmentScore = activePortfolio?.strategicAlignmentScore || 92;
  const projectList = activePortfolio?.projects || [];

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
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
              Module 18 & 20
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Enterprise PMO Portfolio Management</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Briefcase className="w-8 h-8 text-[var(--accent)]" />
            {portfolioName}
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            {portfolioDesc}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <Briefcase style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* Portfolio KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-[var(--cyan)]" />
            <span className="section-label">Total Portfolio Investment</span>
          </div>
          <div className="kpi-value">${portfolioBudget}M</div>
          <p className="helper-text">Owner: {portfolioOwner}</p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[var(--green)]" />
            <span className="section-label">Strategic Alignment Score</span>
          </div>
          <div className="kpi-value text-[var(--green)]">{alignmentScore} / 100</div>
          <p className="helper-text">Corporate Strategy Focus 2026</p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[var(--accent)]" />
            <span className="section-label">Active Projects</span>
          </div>
          <div className="kpi-value">{projectList.length}</div>
          <p className="helper-text">Active PMO Supervision</p>
        </div>
      </div>

      {/* Portfolio Projects Cards */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2 border-b border-[var(--border)] pb-3">
          <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
          <h3 className="section-label">Portfolio Projects Roster</h3>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {projectList.map((p) => {
            const isCurrent = p.id === activeProject?.id;
            const healthBadge = p.health?.overallHealth === "Red" ? "badge-red" :
                                p.health?.overallHealth === "Amber" ? "badge-amber" : "badge-green";

            return (
              <div
                key={p.id}
                onClick={() => setActiveProjectById(p.id)}
                className={`glass-card p-5 transition-all cursor-pointer space-y-4 group ${
                  isCurrent
                    ? "border-[var(--accent)] shadow-[0_0_15px_var(--accent-glow)] scale-[1.01]"
                    : "hover:border-[var(--accent-border)] hover:bg-[var(--bg-card-hover)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="badge-cyan font-mono">{p.code}</span>
                  <span className={healthBadge}>Health: {p.health?.overallHealth || "Green"}</span>
                </div>

                <div>
                  <h4 className="card-heading group-hover:text-[var(--accent)] transition-colors">{p.name}</h4>
                  <p className="body-text text-sm line-clamp-2 mt-1">{p.intake?.strategicObjective || "No strategic objective defined."}</p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="flex gap-4 font-mono text-sm text-[var(--text-primary)]">
                    <span className="flex items-center gap-1">
                      <span className="text-[var(--text-muted)]">CPI:</span> 
                      <strong className={p.evm?.CPI < 1 ? "text-[var(--pink)]" : "text-[var(--green)]"}>{p.evm?.CPI || 1.0}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-[var(--text-muted)]">SPI:</span> 
                      <strong className={p.evm?.SPI < 1 ? "text-[var(--pink)]" : "text-[var(--green)]"}>{p.evm?.SPI || 1.0}</strong>
                    </span>
                  </div>
                  <span className={`flex items-center gap-1 font-semibold text-sm ${isCurrent ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"}`}>
                    {isCurrent ? "Active Project" : "Switch View"} 
                    <ArrowRight className={`w-4 h-4 ${isCurrent ? "" : "opacity-50 group-hover:opacity-100"} transition-all group-hover:translate-x-1`} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
