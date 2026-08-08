import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  Layers,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Link2,
  BarChart2,
  ShieldAlert,
  Activity,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap
} from "lucide-react";
import { HealthStatus } from "../../types";

const HealthBadge: React.FC<{ status: HealthStatus }> = ({ status }) => {
  const map: Record<HealthStatus, string> = {
    Green: "badge-green",
    Amber: "badge-amber",
    Red: "badge-red"
  };
  return (
    <span className={map[status]}>{status}</span>
  );
};

export const ProgramHubView: React.FC = () => {
  const { projects, programs, activeProgram, setActiveProjectById, setActiveTab } = useProject();
  const [selectedProgramId, setSelectedProgramId] = useState<string>(activeProgram?.id || programs[0]?.id || "");

  const selectedProgram = programs.find(p => p.id === selectedProgramId) || programs[0];
  const linkedProjectIds = selectedProgram?.projectIds || [];
  const programProjects = linkedProjectIds.length > 0
    ? projects.filter(p => linkedProjectIds.includes(p.id))
    : projects; // Fall back to all projects when program has no linked projects yet


  const totalBudget = programProjects.reduce((acc, p) => acc + (p.intake?.estimatedBudget || 0), 0);
  const totalActual = programProjects.reduce((acc, p) => acc + (p.evm?.AC || 0), 0);
  const avgCpi = programProjects.length > 0
    ? (programProjects.reduce((acc, p) => acc + (p.evm?.CPI || 1), 0) / programProjects.length).toFixed(2)
    : "1.00";
  const avgSpi = programProjects.length > 0
    ? (programProjects.reduce((acc, p) => acc + (p.evm?.SPI || 1), 0) / programProjects.length).toFixed(2)
    : "1.00";
  const openRisks = programProjects.reduce((acc, p) => acc + (p.risks || []).filter(r => r.status === "Open").length, 0);
  const openIssues = programProjects.reduce((acc, p) => acc + (p.issues || []).filter(i => i.status !== "Resolved").length, 0);

  const healthCounts = { Green: 0, Amber: 0, Red: 0 };
  programProjects.forEach(p => {
    const h = p.health?.overallHealth;
    if (h === "Green" || h === "Amber" || h === "Red") healthCounts[h]++;
  });

  const dependencies = [
    { from: programProjects[0]?.name || "Project A", to: programProjects[1]?.name || "Project B", type: "Finish-to-Start", impact: "Critical", status: "Active" },
    { from: programProjects[1]?.name || "Project B", to: programProjects[2]?.name || "Project C", type: "Start-to-Start", impact: "High", status: "At Risk" },
  ].filter(d => d.from && d.to && d.from !== d.to);

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
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
              Program Management Hub
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Enterprise PMO</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            {selectedProgram?.name || "Program Overview"}
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            {selectedProgram?.description}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* KPI Roll-up Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Projects", value: programProjects.length, color: "text-[var(--accent)]", sub: "In Program" },
          { label: "Total Budget", value: `$${(totalBudget / 1000000).toFixed(1)}M`, color: "text-[var(--text-primary)]", sub: "Baseline" },
          { label: "Actual Cost", value: `$${(totalActual / 1000000).toFixed(1)}M`, color: "text-[var(--amber)]", sub: "Incurred" },
          { label: "Avg CPI", value: avgCpi, color: parseFloat(avgCpi) >= 1 ? "text-[var(--green)]" : "text-[var(--pink)]", sub: "Cost Index" },
          { label: "Avg SPI", value: avgSpi, color: parseFloat(avgSpi) >= 1 ? "text-[var(--green)]" : "text-[var(--amber)]", sub: "Schedule Index" },
          { label: "Open Risks", value: openRisks, color: "text-[var(--pink)]", sub: `+ ${openIssues} Issues` }
        ].map((kpi, i) => (
          <div key={i} className="glass-card rounded-xl p-4 shadow-sm">
            <p className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wide">{kpi.label}</p>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${kpi.color}`}>{kpi.value}</div>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Portfolio Health Radar + Project List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Summary */}
        <div className="glass-card rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="section-label flex items-center gap-2">
            <Activity className="w-4 h-4" style={{ color: "var(--accent)" }} />
            Program Health Radar
          </h3>
          <div className="space-y-3">
            {[
              { label: "Green (On Track)", count: healthCounts.Green, barColor: "var(--green)" },
              { label: "Amber (At Risk)", count: healthCounts.Amber, barColor: "var(--amber)" },
              { label: "Red (Critical)", count: healthCounts.Red, barColor: "var(--pink)" }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">{item.label}</span>
                  <span className="font-bold text-[var(--text-primary)]">{item.count} project{item.count !== 1 ? "s" : ""}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-card-hover)] rounded-full">
                  <div
                    style={{ height: "100%", width: programProjects.length > 0 ? `${(item.count / programProjects.length) * 100}%` : "0%", background: item.barColor, borderRadius: "99px" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--border)] space-y-2">
            <div className="flex justify-between text-xs text-[var(--text-secondary)]">
              <span>Program Manager</span>
              <span className="font-bold text-[var(--text-primary)]">{selectedProgram?.manager}</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--text-secondary)]">
              <span>Target Completion</span>
              <span className="font-bold text-[var(--text-primary)]">{selectedProgram?.targetCompletion}</span>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="section-label flex items-center gap-2">
            <Layers className="w-4 h-4" style={{ color: "var(--accent)" }} />
            Projects in Program ({programProjects.length})
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {programProjects.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">No projects linked to this program yet.</p>
            ) : programProjects.map(proj => (
              <div
                key={proj.id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--accent-glow)] hover:border-[var(--accent-border)] transition-all group cursor-pointer"
                onClick={() => { setActiveProjectById(proj.id); setActiveTab("dashboard"); }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 700, background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--accent-border)", padding: "2px 8px", borderRadius: "4px" }}>{proj.code}</span>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">{proj.name}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">CPI: {proj.evm?.CPI?.toFixed(2)} | SPI: {proj.evm?.SPI?.toFixed(2)} | Risks: {(proj.risks || []).filter(r => r.status === "Open").length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HealthBadge status={proj.health?.overallHealth || "Green"} />
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Project Dependencies */}
      <div className="glass-card rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="section-label flex items-center gap-2">
          <Link2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
          Cross-Project Dependency Map
        </h3>
        {dependencies.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)] italic">No cross-project dependencies detected. Add projects to this program to map interdependencies.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wide">
                  <th className="p-3 text-left">Predecessor Project</th>
                  <th className="p-3 text-center">Dependency Type</th>
                  <th className="p-3 text-left">Successor Project</th>
                  <th className="p-3 text-center">Impact</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {dependencies.map((dep, i) => (
                  <tr key={i} className="hover:bg-[var(--bg-card)]">
                    <td className="p-3 font-semibold text-[var(--text-primary)]">{dep.from}</td>
                    <td className="p-3 text-center">
                      <span className="bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-border)] px-2 py-0.5 rounded font-mono text-[10px]">{dep.type}</span>
                    </td>
                    <td className="p-3 font-semibold text-[var(--text-primary)]">{dep.to}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${dep.impact === "Critical" ? "badge-red" : "badge-amber"}`}>{dep.impact}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${dep.status === "Active" ? "badge-green" : "badge-amber"}`}>{dep.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Consolidated Financial Roll-up */}
      <div className="glass-card rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="section-label flex items-center gap-2">
          <DollarSign className="w-4 h-4" style={{ color: "var(--accent)" }} />
          Consolidated Financial Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wide">
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-right font-mono">Budget (BAC)</th>
                <th className="p-3 text-right font-mono">Planned (PV)</th>
                <th className="p-3 text-right font-mono">Earned (EV)</th>
                <th className="p-3 text-right font-mono">Actual (AC)</th>
                <th className="p-3 text-center">CPI</th>
                <th className="p-3 text-center">SPI</th>
                <th className="p-3 text-center">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {programProjects.map(proj => (
                <tr key={proj.id} className="hover:bg-[var(--bg-card)]">
                  <td className="p-3 font-bold text-[var(--text-primary)]">{proj.name}</td>
                  <td className="p-3 text-right font-mono text-[var(--text-primary)]">${(proj.evm?.BAC || 0).toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-[var(--text-secondary)]">${(proj.evm?.PV || 0).toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-[var(--accent)]">${(proj.evm?.EV || 0).toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-[var(--amber)]">${(proj.evm?.AC || 0).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className={`font-mono font-bold ${(proj.evm?.CPI || 1) >= 1 ? "text-[var(--green)]" : "text-[var(--pink)]"}`}>
                      {(proj.evm?.CPI || 1).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`font-mono font-bold ${(proj.evm?.SPI || 1) >= 1 ? "text-[var(--green)]" : "text-[var(--amber)]"}`}>
                      {(proj.evm?.SPI || 1).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3 text-center"><HealthBadge status={proj.health?.overallHealth || "Green"} /></td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="bg-[var(--bg-card)] font-bold border-t-2 border-[var(--border)]">
                <td className="p-3 text-[var(--text-primary)]">PROGRAM TOTAL</td>
                <td className="p-3 text-right font-mono text-[var(--text-primary)]">${programProjects.reduce((a, p) => a + (p.evm?.BAC || 0), 0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-[var(--text-secondary)]">${programProjects.reduce((a, p) => a + (p.evm?.PV || 0), 0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-[var(--accent)]">${programProjects.reduce((a, p) => a + (p.evm?.EV || 0), 0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-[var(--amber)]">${programProjects.reduce((a, p) => a + (p.evm?.AC || 0), 0).toLocaleString()}</td>
                <td colSpan={3} className="p-3 text-center text-[var(--text-secondary)]">Avg CPI: {avgCpi} | Avg SPI: {avgSpi}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

