import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { HelpCircle, Plus, AlertCircle, CheckCircle2 } from "lucide-react";
import { IssueItem } from "../../types";

export const IssueView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const issues = activeProject?.issues || [];
  const [showForm, setShowForm] = useState(false);

  const [newIss, setNewIss] = useState<Partial<IssueItem>>({
    issueCode: `ISS-${Math.floor(10 + Math.random() * 90)}`,
    description: "",
    priority: "High",
    severity: "Blocker",
    owner: "Liam O'Connor",
    reportedDate: new Date().toISOString().split("T")[0],
    dueDate: "2026-08-15",
    status: "Open",
    daysOpen: 1
  });

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIss.description) return;
    const added: IssueItem = {
      id: `iss-${Date.now()}`,
      issueCode: newIss.issueCode || `ISS-${Math.floor(10 + Math.random() * 90)}`,
      description: newIss.description,
      priority: (newIss.priority as any) || "High",
      severity: (newIss.severity as any) || "Blocker",
      owner: newIss.owner || "Liam O'Connor",
      reportedDate: newIss.reportedDate || new Date().toISOString().split("T")[0],
      dueDate: newIss.dueDate || "2026-08-15",
      status: "Open",
      daysOpen: 1
    };

    updateActiveProject((prev) => ({
      ...prev,
      issues: [...prev.issues, added]
    }));

    setShowForm(false);
    setNewIss({ description: "" });
  };

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
              Module 11
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Issue Management & Aging Analytics</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Issue Register & Escalation
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Track active impediments, issue aging, owner assignments, and resolution SLAs.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <Plus style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* Add Issue Modal */}
      {showForm && (
        <form onSubmit={handleAddIssue} className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Report New Issue</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Priority</label>
              <select
                value={newIss.priority}
                onChange={(e) => setNewIss({ ...newIss, priority: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Severity</label>
              <select
                value={newIss.severity}
                onChange={(e) => setNewIss({ ...newIss, severity: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>Blocker</option>
                <option>Major</option>
                <option>Minor</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Assigned Owner</label>
              <input
                type="text"
                value={newIss.owner}
                onChange={(e) => setNewIss({ ...newIss, owner: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-[var(--text-muted)] mb-1">Issue Description *</label>
            <textarea
              required
              rows={2}
              value={newIss.description}
              onChange={(e) => setNewIss({ ...newIss, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-800 text-[var(--text-muted)] rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[var(--accent)] text-white font-bold rounded-lg">
              Save Issue
            </button>
          </div>
        </form>
      )}

      {/* Issues Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Active Issue Log & Aging Report</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[var(--text-muted)] font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Issue ID</th>
                <th className="p-3">Description</th>
                <th className="p-3">Priority / Severity</th>
                <th className="p-3 font-mono">Days Open</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {issues.map((iss) => (
                <tr key={iss.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-rose-400">{iss.issueCode}</td>
                  <td className="p-3 font-semibold text-white max-w-sm">{iss.description}</td>
                  <td className="p-3">
                    <span className="text-rose-400 font-bold">{iss.priority}</span> /{" "}
                    <span className="text-amber-300 font-medium">{iss.severity}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-200">{iss.daysOpen} Days</td>
                  <td className="p-3 text-[var(--text-muted)]">{iss.owner}</td>
                  <td className="p-3">
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2.5 py-1 rounded-full border border-rose-500/30">
                      {iss.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
