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
    Green: "bg-emerald-100 text-emerald-700 border-emerald-300",
    Amber: "bg-amber-100 text-amber-700 border-amber-300",
    Red: "bg-red-100 text-red-700 border-red-300"
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${map[status]}`}>{status}</span>
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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Program Management Hub
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{selectedProgram?.name || "Program Overview"}</h1>
            <p className="text-sm text-indigo-200 mt-1 max-w-2xl">{selectedProgram?.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedProgramId}
              onChange={e => setSelectedProgramId(e.target.value)}
              className="bg-white/10 border border-white/20 text-white text-xs rounded-lg px-3 py-2 cursor-pointer outline-none"
            >
              {programs.map(pr => (
                <option key={pr.id} value={pr.id} className="text-slate-900">{pr.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Roll-up Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Projects", value: programProjects.length, color: "text-indigo-600", sub: "In Program" },
          { label: "Total Budget", value: `$${(totalBudget / 1000000).toFixed(1)}M`, color: "text-slate-800", sub: "Baseline" },
          { label: "Actual Cost", value: `$${(totalActual / 1000000).toFixed(1)}M`, color: "text-amber-600", sub: "Incurred" },
          { label: "Avg CPI", value: avgCpi, color: parseFloat(avgCpi) >= 1 ? "text-emerald-600" : "text-red-600", sub: "Cost Index" },
          { label: "Avg SPI", value: avgSpi, color: parseFloat(avgSpi) >= 1 ? "text-emerald-600" : "text-amber-600", sub: "Schedule Index" },
          { label: "Open Risks", value: openRisks, color: "text-red-600", sub: `+ ${openIssues} Issues` }
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">{kpi.label}</p>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${kpi.color}`}>{kpi.value}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Portfolio Health Radar + Project List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" />
            Program Health Radar
          </h3>
          <div className="space-y-3">
            {[
              { label: "Green (On Track)", count: healthCounts.Green, color: "bg-emerald-500" },
              { label: "Amber (At Risk)", count: healthCounts.Amber, color: "bg-amber-500" },
              { label: "Red (Critical)", count: healthCounts.Red, color: "bg-red-500" }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-bold text-slate-800">{item.count} project{item.count !== 1 ? "s" : ""}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: programProjects.length > 0 ? `${(item.count / programProjects.length) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Program Manager</span>
              <span className="font-bold text-slate-800">{selectedProgram?.manager}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Target Completion</span>
              <span className="font-bold text-slate-800">{selectedProgram?.targetCompletion}</span>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            Projects in Program ({programProjects.length})
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {programProjects.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No projects linked to this program yet.</p>
            ) : programProjects.map(proj => (
              <div
                key={proj.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all group cursor-pointer"
                onClick={() => { setActiveProjectById(proj.id); setActiveTab("dashboard"); }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{proj.code}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{proj.name}</div>
                    <div className="text-[10px] text-slate-500">CPI: {proj.evm?.CPI?.toFixed(2)} | SPI: {proj.evm?.SPI?.toFixed(2)} | Risks: {(proj.risks || []).filter(r => r.status === "Open").length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HealthBadge status={proj.health?.overallHealth || "Green"} />
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Project Dependencies */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Link2 className="w-4 h-4 text-indigo-500" />
          Cross-Project Dependency Map
        </h3>
        {dependencies.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No cross-project dependencies detected. Add projects to this program to map interdependencies.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-wide">
                  <th className="p-3 text-left">Predecessor Project</th>
                  <th className="p-3 text-center">Dependency Type</th>
                  <th className="p-3 text-left">Successor Project</th>
                  <th className="p-3 text-center">Impact</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {dependencies.map((dep, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">{dep.from}</td>
                    <td className="p-3 text-center">
                      <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded font-mono text-[10px]">{dep.type}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{dep.to}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${dep.impact === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{dep.impact}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${dep.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{dep.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Consolidated Financial Roll-up */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-indigo-500" />
          Consolidated Financial Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-wide">
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
            <tbody className="divide-y divide-slate-50">
              {programProjects.map(proj => (
                <tr key={proj.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{proj.name}</td>
                  <td className="p-3 text-right font-mono text-slate-700">${(proj.evm?.BAC || 0).toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-slate-500">${(proj.evm?.PV || 0).toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-indigo-600">${(proj.evm?.EV || 0).toLocaleString()}</td>
                  <td className="p-3 text-right font-mono text-amber-600">${(proj.evm?.AC || 0).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className={`font-mono font-bold ${(proj.evm?.CPI || 1) >= 1 ? "text-emerald-600" : "text-red-600"}`}>
                      {(proj.evm?.CPI || 1).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`font-mono font-bold ${(proj.evm?.SPI || 1) >= 1 ? "text-emerald-600" : "text-amber-600"}`}>
                      {(proj.evm?.SPI || 1).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3 text-center"><HealthBadge status={proj.health?.overallHealth || "Green"} /></td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                <td className="p-3 text-slate-900">PROGRAM TOTAL</td>
                <td className="p-3 text-right font-mono text-slate-900">${programProjects.reduce((a, p) => a + (p.evm?.BAC || 0), 0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-slate-600">${programProjects.reduce((a, p) => a + (p.evm?.PV || 0), 0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-indigo-700">${programProjects.reduce((a, p) => a + (p.evm?.EV || 0), 0).toLocaleString()}</td>
                <td className="p-3 text-right font-mono text-amber-700">${programProjects.reduce((a, p) => a + (p.evm?.AC || 0), 0).toLocaleString()}</td>
                <td colSpan={3} className="p-3 text-center text-slate-500">Avg CPI: {avgCpi} | Avg SPI: {avgSpi}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
