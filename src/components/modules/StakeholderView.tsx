import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { Users, Plus, ShieldCheck, Mail, Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { Stakeholder } from "../../types";

export const StakeholderView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const stakeholders = activeProject?.stakeholders || [];
  const [showForm, setShowForm] = useState(false);

  const [newStk, setNewStk] = useState<Partial<Stakeholder>>({
    name: "",
    role: "Stakeholder",
    department: "Operations",
    position: "Director",
    influence: "High",
    interest: "High",
    communicationPreference: "Weekly Steering",
    engagementStrategy: "Direct status brief and milestone review.",
    escalationRole: "Executive Board"
  });

  const handleAddStakeholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStk.name) return;
    const added: Stakeholder = {
      id: `stk-${Date.now()}`,
      name: newStk.name!,
      role: newStk.role || "Stakeholder",
      department: newStk.department || "Business Ops",
      position: newStk.position || "Director",
      influence: (newStk.influence as any) || "High",
      interest: (newStk.interest as any) || "High",
      communicationPreference: (newStk.communicationPreference as any) || "Weekly Steering",
      engagementStrategy: newStk.engagementStrategy || "Regular updates",
      escalationRole: newStk.escalationRole || "Steering Committee"
    };

    updateActiveProject((prev) => ({
      ...prev,
      stakeholders: [...prev.stakeholders, added]
    }));

    setShowForm(false);
    setNewStk({ name: "", role: "Stakeholder", department: "", position: "" });
  };

  // Group stakeholders by 2x2 matrix
  const keyPlayers = stakeholders.filter((s) => s.influence === "High" && s.interest === "High");
  const keepSatisfied = stakeholders.filter((s) => s.influence === "High" && s.interest !== "High");
  const keepInformed = stakeholders.filter((s) => s.influence !== "High" && s.interest === "High");
  const monitorOnly = stakeholders.filter((s) => s.influence !== "High" && s.interest !== "High");

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
              Module 2
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>PMO Stakeholder Governance</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Stakeholder Management
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Analyze influence & interest power dynamics, engagement strategies, and communication protocols.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <Plus style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* Add Stakeholder Form Modal */}
      {showForm && (
        <form onSubmit={handleAddStakeholder} className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">New Stakeholder Record</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Name *</label>
              <input
                type="text"
                required
                value={newStk.name}
                onChange={(e) => setNewStk({ ...newStk, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Position / Title</label>
              <input
                type="text"
                value={newStk.position}
                onChange={(e) => setNewStk({ ...newStk, position: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Department</label>
              <input
                type="text"
                value={newStk.department}
                onChange={(e) => setNewStk({ ...newStk, department: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Influence Power</label>
              <select
                value={newStk.influence}
                onChange={(e) => setNewStk({ ...newStk, influence: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Interest Level</label>
              <select
                value={newStk.interest}
                onChange={(e) => setNewStk({ ...newStk, interest: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Communication Channel</label>
              <select
                value={newStk.communicationPreference}
                onChange={(e) => setNewStk({ ...newStk, communicationPreference: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              >
                <option>Weekly Steering</option>
                <option>Bi-Weekly Email</option>
                <option>Ad-hoc Dashboard</option>
                <option>Slack/Teams</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-800 text-[var(--text-muted)] rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[var(--accent)] text-white font-bold rounded-lg">
              Save Stakeholder
            </button>
          </div>
        </form>
      )}

      {/* 2x2 Stakeholder Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          Stakeholder Power / Interest Grid (2x2 Matrix)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Players (High Power, High Interest) */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Key Players (Manage Closely)</span>
              <span className="text-[10px] bg-[var(--accent-glow)]0/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                High Power / High Interest
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {keyPlayers.map((s) => (
                <div key={s.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-indigo-500/20 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{s.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{s.position} ({s.department})</p>
                  </div>
                  <span className="text-[10px] bg-[var(--accent)]/40 text-indigo-200 px-2 py-0.5 rounded border border-indigo-500/40">
                    {s.communicationPreference}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Keep Satisfied (High Power, Low/Med Interest) */}
          <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Keep Satisfied</span>
              <span className="text-[10px] bg-[var(--amber-dim)]0/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                High Power / Low-Med Interest
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {keepSatisfied.length > 0 ? (
                keepSatisfied.map((s) => (
                  <div key={s.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-amber-500/20">
                    <p className="font-bold text-white">{s.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{s.position}</p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-[var(--text-secondary)] italic">No stakeholders currently mapped in this quadrant.</p>
              )}
            </div>
          </div>

          {/* Keep Informed (Low/Med Power, High Interest) */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Keep Informed</span>
              <span className="text-[10px] bg-[var(--green-dim)]0/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Low Power / High Interest
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {keepInformed.map((s) => (
                <div key={s.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-emerald-500/20">
                  <p className="font-bold text-white">{s.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{s.position}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monitor Only */}
          <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Monitor (Minimal Effort)</span>
              <span className="text-[10px] bg-slate-800 text-[var(--text-muted)] px-2 py-0.5 rounded font-mono">
                Low Power / Low Interest
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {monitorOnly.length > 0 ? (
                monitorOnly.map((s) => (
                  <div key={s.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <p className="font-bold text-white">{s.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-[var(--text-secondary)] italic">No stakeholders currently mapped in this quadrant.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Register Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Stakeholder Register & Engagement Strategy</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[var(--text-muted)] font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Stakeholder</th>
                <th className="p-3">Role & Dept</th>
                <th className="p-3">Power / Interest</th>
                <th className="p-3">Comm Channel</th>
                <th className="p-3">Engagement Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stakeholders.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-white">
                    <div>{s.name}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">{s.position}</div>
                  </td>
                  <td className="p-3 text-[var(--text-muted)]">
                    <div>{s.role}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">{s.department}</div>
                  </td>
                  <td className="p-3 font-mono">
                    <span className="text-indigo-400">{s.influence} Influence</span> /{" "}
                    <span className="text-emerald-400">{s.interest} Interest</span>
                  </td>
                  <td className="p-3 text-[var(--text-muted)]">{s.communicationPreference}</td>
                  <td className="p-3 text-[var(--text-muted)] max-w-xs leading-relaxed">{s.engagementStrategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
