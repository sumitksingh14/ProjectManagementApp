import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { GitPullRequest, Plus, CheckCircle2, DollarSign, Calendar, ShieldCheck } from "lucide-react";
import { ChangeRequest } from "../../types";

export const ChangeManagementView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const changeRequests = activeProject?.changeRequests || [];
  const [showForm, setShowForm] = useState(false);

  const [newCr, setNewCr] = useState<Partial<ChangeRequest>>({
    crNumber: `CR-2026-${Math.floor(100 + Math.random() * 900)}`,
    title: "",
    requestedBy: "Rachel Green",
    requestDate: new Date().toISOString().split("T")[0],
    description: "",
    justification: "",
    impactScheduleDays: 5,
    impactCostAmount: 25000,
    impactScopeDescription: "",
    status: "Submitted"
  });

  const handleAddCr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCr.title) return;
    const cr: ChangeRequest = {
      id: `cr-${Date.now()}`,
      crNumber: newCr.crNumber || `CR-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newCr.title,
      requestedBy: newCr.requestedBy || "Rachel Green",
      requestDate: newCr.requestDate || new Date().toISOString().split("T")[0],
      description: newCr.description || "",
      justification: newCr.justification || "",
      impactScheduleDays: newCr.impactScheduleDays || 5,
      impactCostAmount: newCr.impactCostAmount || 25000,
      impactScopeDescription: newCr.impactScopeDescription || "Scope adjustment",
      status: "Submitted"
    };

    updateActiveProject((prev) => ({
      ...prev,
      changeRequests: [...prev.changeRequests, cr]
    }));

    setShowForm(false);
    setNewCr({ title: "", description: "" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 13
            </span>
            <span className="text-xs text-slate-400">CCB Governance Workflow</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Change Control Board (CCB) Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Formal change request workflow: Draft → Impact Analysis → CCB Review → Approval → Implementation.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Change Request</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleAddCr} className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Submit Change Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Title *</label>
              <input
                type="text"
                required
                value={newCr.title}
                onChange={(e) => setNewCr({ ...newCr, title: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Requested By</label>
              <input
                type="text"
                value={newCr.requestedBy}
                onChange={(e) => setNewCr({ ...newCr, requestedBy: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Schedule Impact (+ Days)</label>
              <input
                type="number"
                value={newCr.impactScheduleDays}
                onChange={(e) => setNewCr({ ...newCr, impactScheduleDays: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Cost Impact ($)</label>
              <input
                type="number"
                value={newCr.impactCostAmount}
                onChange={(e) => setNewCr({ ...newCr, impactCostAmount: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Scope & Technical Impact</label>
            <textarea
              rows={2}
              value={newCr.description}
              onChange={(e) => setNewCr({ ...newCr, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg">
              Submit CR
            </button>
          </div>
        </form>
      )}

      {/* Change Register */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Change Request Audit Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">CR #</th>
                <th className="p-3">Title & Justification</th>
                <th className="p-3">Schedule Impact</th>
                <th className="p-3 font-mono">Cost Impact</th>
                <th className="p-3">Requested By</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {changeRequests.map((cr) => (
                <tr key={cr.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-400">{cr.crNumber}</td>
                  <td className="p-3 font-semibold text-white max-w-sm">
                    <div>{cr.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{cr.justification}</div>
                  </td>
                  <td className="p-3 font-mono text-amber-300">+{cr.impactScheduleDays} Days</td>
                  <td className="p-3 font-mono text-emerald-400">+${cr.impactCostAmount.toLocaleString()}</td>
                  <td className="p-3 text-slate-300">{cr.requestedBy}</td>
                  <td className="p-3">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">
                      {cr.status}
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
