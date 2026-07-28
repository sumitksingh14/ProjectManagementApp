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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 11
            </span>
            <span className="text-xs text-slate-400">Issue Management & Aging Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Issue Register & Escalation</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track active impediments, issue aging, owner assignments, and resolution SLAs.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Add Issue Modal */}
      {showForm && (
        <form onSubmit={handleAddIssue} className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Report New Issue</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Priority</label>
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
              <label className="block text-slate-400 mb-1">Severity</label>
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
              <label className="block text-slate-400 mb-1">Assigned Owner</label>
              <input
                type="text"
                value={newIss.owner}
                onChange={(e) => setNewIss({ ...newIss, owner: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Issue Description *</label>
            <textarea
              required
              rows={2}
              value={newIss.description}
              onChange={(e) => setNewIss({ ...newIss, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg">
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
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
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
                  <td className="p-3 text-slate-300">{iss.owner}</td>
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
