import React from "react";
import { useProject } from "../../context/ProjectContext";
import { UserCheck, Zap, AlertCircle, BarChart2, ShieldCheck, DollarSign } from "lucide-react";

export const ResourceView: React.FC = () => {
  const { users } = useProject();
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
              Module 6
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Enterprise Resource & Capacity Optimization</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Resource Management & Capacity Planning
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Analyze skill gaps, utilization heatmaps, hourly cost rates, and resolve resource allocation conflicts.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* Resource Utilization Heatmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          Resource Allocation & Monthly Utilization Heatmap (%)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[var(--text-muted)] font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Team Member</th>
                <th className="p-3">Role & Dept</th>
                <th className="p-3">Hourly Rate</th>
                <th className="p-3 font-mono">Aug 2026</th>
                <th className="p-3 font-mono">Sep 2026</th>
                <th className="p-3 font-mono">Oct 2026</th>
                <th className="p-3 font-mono">Nov 2026</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((usr, idx) => {
                const util = idx === 4 ? 120 : idx === 5 ? 95 : 80;
                return (
                  <tr key={usr.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white flex items-center gap-2.5">
                      <img src={usr.avatar} alt={usr.name} className="w-7 h-7 rounded-full object-cover border border-slate-700" />
                      <div>
                        <div>{usr.name}</div>
                        <div className="text-[10px] text-[var(--text-muted)] font-normal">{usr.email}</div>
                      </div>
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">
                      <div>{usr.role}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{usr.department}</div>
                    </td>
                    <td className="p-3 font-mono text-emerald-400">${usr.costRate}/hr</td>
                    <td className="p-3 font-mono">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        util > 100 ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-[var(--green-dim)]0/20 text-emerald-300"
                      }`}>
                        {util}%
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="bg-[var(--accent-glow)]0/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
                        {Math.min(util, 100)}%
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="bg-[var(--accent-glow)]0/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
                        85%
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="bg-[var(--accent-glow)]0/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
                        75%
                      </span>
                    </td>
                    <td className="p-3">
                      {util > 100 ? (
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30 flex items-center gap-1 w-max">
                          <AlertCircle className="w-3 h-3" /> Over-Allocated
                        </span>
                      ) : (
                        <span className="text-[10px] bg-[var(--green-dim)]0/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 w-max block">
                          Balanced
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skills Gap Analysis */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Skills Gap Analysis & Capability Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {[
            { skill: "Cloud Architecture (AWS/GCP)", demand: "High", availableCount: 2, gap: "Balanced" },
            { skill: "React 19 / TypeScript", demand: "High", availableCount: 1, gap: "Gap (+1 Senior Eng)" },
            { skill: "Cybersecurity & PCI Compliance", demand: "Critical", availableCount: 1, gap: "Balanced" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{item.skill}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.gap.includes("Gap") ? "bg-[var(--amber-dim)]0/20 text-amber-300" : "bg-[var(--green-dim)]0/20 text-emerald-300"
                }`}>
                  {item.gap}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">Demand Level: <strong className="text-slate-200">{item.demand}</strong></p>
              <p className="text-[11px] text-[var(--text-muted)]">Available Qualified FTEs: <strong className="text-indigo-400">{item.availableCount}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
