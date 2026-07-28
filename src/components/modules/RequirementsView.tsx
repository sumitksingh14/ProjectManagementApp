import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { CheckSquare, Plus, ShieldCheck, FileCheck, Layers, AlertCircle } from "lucide-react";
import { Requirement } from "../../types";

export const RequirementsView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const requirements = activeProject?.requirements || [];
  const [showForm, setShowForm] = useState(false);

  const [newReq, setNewReq] = useState<Partial<Requirement>>({
    code: `FR-${Math.floor(10 + Math.random() * 90)}`,
    title: "",
    description: "",
    type: "Functional",
    category: "Security",
    priority: "Must Have",
    complexity: "Medium",
    businessValue: 8,
    acceptanceCriteria: ["Must pass automated test suite", "Response time under 500ms"],
    status: "Draft"
  });

  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReq.title) return;
    const req: Requirement = {
      id: `req-${Date.now()}`,
      code: newReq.code || `FR-${Math.floor(10 + Math.random() * 90)}`,
      title: newReq.title,
      description: newReq.description || "",
      type: (newReq.type as any) || "Functional",
      category: newReq.category as any,
      priority: (newReq.priority as any) || "Must Have",
      complexity: (newReq.complexity as any) || "Medium",
      businessValue: newReq.businessValue || 8,
      acceptanceCriteria: newReq.acceptanceCriteria || ["Validated in UAT"],
      status: "Approved"
    };

    updateActiveProject((prev) => ({
      ...prev,
      requirements: [...prev.requirements, req]
    }));

    setShowForm(false);
    setNewReq({ title: "", description: "", type: "Functional" });
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case "Must Have":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "Should Have":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 3
            </span>
            <span className="text-xs text-slate-400">Requirement Traceability Matrix (RTM)</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Requirements Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Trace functional & non-functional requirements to WBS execution tasks, acceptance criteria, and UAT signoff.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Requirement</span>
        </button>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <form onSubmit={handleAddRequirement} className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Create New Requirement</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Requirement Code *</label>
              <input
                type="text"
                required
                value={newReq.code}
                onChange={(e) => setNewReq({ ...newReq, code: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Requirement Title *</label>
              <input
                type="text"
                required
                value={newReq.title}
                onChange={(e) => setNewReq({ ...newReq, title: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Type</label>
              <select
                value={newReq.type}
                onChange={(e) => setNewReq({ ...newReq, type: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>Functional</option>
                <option>Non-Functional</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Priority MoSCoW</label>
              <select
                value={newReq.priority}
                onChange={(e) => setNewReq({ ...newReq, priority: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>Must Have</option>
                <option>Should Have</option>
                <option>Could Have</option>
                <option>Won't Have</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Complexity</label>
              <select
                value={newReq.complexity}
                onChange={(e) => setNewReq({ ...newReq, complexity: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Business Value (1-10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={newReq.businessValue}
                onChange={(e) => setNewReq({ ...newReq, businessValue: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Detailed Description</label>
            <textarea
              rows={2}
              value={newReq.description}
              onChange={(e) => setNewReq({ ...newReq, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg">
              Save Requirement
            </button>
          </div>
        </form>
      )}

      {/* RTM Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-indigo-400" />
          Requirement Traceability Matrix (RTM)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Req ID</th>
                <th className="p-3">Title & Description</th>
                <th className="p-3">Type & Category</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Acceptance Criteria</th>
                <th className="p-3">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {requirements.map((req) => (
                <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-400">{req.code}</td>
                  <td className="p-3 font-semibold text-white max-w-xs">
                    <div>{req.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal leading-relaxed">{req.description}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-slate-300 font-medium">{req.type}</span>
                    {req.category && <div className="text-[10px] text-slate-500">{req.category}</div>}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(req.priority)}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 text-[11px] max-w-xs">
                    <ul className="list-disc list-inside space-y-0.5">
                      {req.acceptanceCriteria.map((ac, idx) => (
                        <li key={idx} className="truncate">{ac}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        req.status === "Verified"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : req.status === "In Development"
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {req.status}
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
