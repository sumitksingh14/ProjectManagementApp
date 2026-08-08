import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { AlertTriangle, Sparkles, Plus, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import { RiskItem } from "../../types";

export const RiskView: React.FC = () => {
  const { activeProject, generateAiRisks, isAiLoading, updateActiveProject } = useProject();
  const risks = activeProject?.risks || [];
  const [showForm, setShowForm] = useState(false);

  const [newRisk, setNewRisk] = useState<Partial<RiskItem>>({
    riskCode: `RSK-${Math.floor(10 + Math.random() * 90)}`,
    category: "Technical",
    description: "",
    rootCause: "",
    trigger: "",
    probability: "Medium",
    impact: "High",
    severityScore: 15,
    owner: "David Chen",
    mitigation: "",
    contingency: "",
    dueDate: "2026-09-30",
    status: "Open"
  });

  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRisk.description) return;
    const rsk: RiskItem = {
      id: `rsk-${Date.now()}`,
      riskCode: newRisk.riskCode || `RSK-${Math.floor(10 + Math.random() * 90)}`,
      category: (newRisk.category as any) || "Technical",
      description: newRisk.description,
      rootCause: newRisk.rootCause || "Architectural complexity",
      trigger: newRisk.trigger || "Key threshold breach",
      probability: (newRisk.probability as any) || "Medium",
      impact: (newRisk.impact as any) || "High",
      severityScore: newRisk.probability === "High" && newRisk.impact === "High" ? 20 : 12,
      owner: newRisk.owner || "David Chen",
      mitigation: newRisk.mitigation || "Proactive monitoring",
      contingency: newRisk.contingency || "FTE fallback",
      dueDate: newRisk.dueDate || "2026-09-30",
      status: "Open"
    };

    updateActiveProject((prev) => ({
      ...prev,
      risks: [...prev.risks, rsk]
    }));

    setShowForm(false);
    setNewRisk({ description: "", mitigation: "" });
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
              Module 10
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>PMP Risk Governance Framework</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            
            Risk Register & Predictive Risk Engine
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Capture root causes, triggers, mitigations, contingencies, severity heatmaps, and AI predictive risk analysis.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <AlertTriangle style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* Manual Risk Form */}
      {showForm && (
        <form onSubmit={handleAddRisk} className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Add Risk to Register</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Risk Category</label>
              <select
                value={newRisk.category}
                onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>Technical</option>
                <option>Schedule</option>
                <option>Financial</option>
                <option>Resource</option>
                <option>Vendor</option>
                <option>Scope</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Probability</label>
              <select
                value={newRisk.probability}
                onChange={(e) => setNewRisk({ ...newRisk, probability: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Impact</label>
              <select
                value={newRisk.impact}
                onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[var(--text-muted)] mb-1">Risk Statement / Description *</label>
            <textarea
              required
              rows={2}
              value={newRisk.description}
              onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-[var(--text-muted)] mb-1">Proactive Mitigation Strategy</label>
            <textarea
              rows={2}
              value={newRisk.mitigation}
              onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-800 text-[var(--text-muted)] rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[var(--accent)] text-white font-bold rounded-lg">
              Save Risk
            </button>
          </div>
        </form>
      )}

      {/* Risk Register Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white">Active Risk Register & Mitigation Strategy</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[var(--text-muted)] font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Risk ID</th>
                <th className="p-3">Category & Description</th>
                <th className="p-3">Prob / Impact</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Proactive Mitigation</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {risks.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-amber-400">{r.riskCode}</td>
                  <td className="p-3 max-w-xs">
                    <div className="font-semibold text-white">{r.description}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Category: {r.category}</div>
                  </td>
                  <td className="p-3 font-mono">
                    <span className="text-amber-300">{r.probability}</span> / <span className="text-rose-400">{r.impact}</span>
                  </td>
                  <td className="p-3 font-mono">
                    <span className="bg-rose-500/20 text-rose-300 font-extrabold px-2 py-0.5 rounded border border-rose-500/30">
                      {r.severityScore} / 25
                    </span>
                  </td>
                  <td className="p-3 text-[var(--text-muted)] max-w-xs leading-relaxed">{r.mitigation}</td>
                  <td className="p-3 text-[var(--text-muted)]">{r.owner}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      r.status === "Open" ? "bg-[var(--amber-dim)]0/20 text-amber-300" : "bg-[var(--green-dim)]0/20 text-emerald-300"
                    }`}>
                      {r.status}
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
