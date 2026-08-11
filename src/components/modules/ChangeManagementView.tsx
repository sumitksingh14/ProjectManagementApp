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

  const submittedCount = (changeRequests || []).filter(c => c?.status === "Submitted" || c?.status === "Under Review").length;
  const totalCostImpact = (changeRequests || []).reduce((acc, c) => acc + (c?.impactCostAmount || 0), 0);
  const totalDaysImpact = (changeRequests || []).reduce((acc, c) => acc + (c?.impactScheduleDays || 0), 0);

  const kpis = [
    { label: "Pending Change Requests", value: String(submittedCount), delta: "CCB Review Queue", up: submittedCount === 0, sub: "Requests awaiting approval", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
    { label: "Total Financial Cost Impact", value: `$${(totalCostImpact / 1000).toFixed(0)}k`, delta: "Budget Impact", up: true, sub: "Cumulative cost adjustment", accentColor: "var(--cyan)", glowColor: "rgba(6,182,212,0.15)" },
    { label: "Schedule Impact (Days)", value: `+${totalDaysImpact} Days`, delta: "Baseline Extension", up: true, sub: "Total milestone adjustment", accentColor: "var(--amber)", glowColor: "rgba(245,158,11,0.15)" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fadeIn">
      {/* Header */}
      <div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              Module 13
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMO Change Control Board (CCB)</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Change Control & Request Log
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Formal change request log, CCB approval workflow, scope impact analysis, and budget/schedule adjustments.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-xl transition-all cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)",
              color: "#fff", padding: "8px 14px", fontSize: "12px", fontWeight: 600, backdropFilter: "blur(10px)"
            }}
          >
            <Plus style={{ width: "14px", height: "14px" }} />
            New Change Request
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="animate-fadeIn">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "20px",
              background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)` }}
          >
            <p className="section-label" style={{ marginBottom: "12px" }}>{kpi.label}</p>
            <div className="kpi-value" style={{ marginBottom: "10px" }}>{kpi.value}</div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleAddCr} className="glass-card p-6 space-y-6 text-sm">
          <h3 className="text-sm font-bold text-white">Submit Change Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Title *</label>
              <input
                type="text"
                required
                value={newCr.title}
                onChange={(e) => setNewCr({ ...newCr, title: e.target.value })}
                className="form-input-dark"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Requested By</label>
              <input
                type="text"
                value={newCr.requestedBy}
                onChange={(e) => setNewCr({ ...newCr, requestedBy: e.target.value })}
                className="form-input-dark"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Schedule Impact (+ Days)</label>
              <input
                type="number"
                value={newCr.impactScheduleDays}
                onChange={(e) => setNewCr({ ...newCr, impactScheduleDays: Number(e.target.value) })}
                className="form-input-dark font-mono"
              />
            </div>
            <div>
              <label className="block text-[var(--text-muted)] mb-1">Cost Impact ($)</label>
              <input
                type="number"
                value={newCr.impactCostAmount}
                onChange={(e) => setNewCr({ ...newCr, impactCostAmount: Number(e.target.value) })}
                className="form-input-dark font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-[var(--text-muted)] mb-1">Scope & Technical Impact</label>
            <textarea
              rows={2}
              value={newCr.description}
              onChange={(e) => setNewCr({ ...newCr, description: e.target.value })}
              className="form-input-dark"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="badge-slate p-2">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[var(--accent)] text-white font-bold rounded-lg">
              Submit CR
            </button>
          </div>
        </form>
      )}

      {/* Change Register */}
      <div className="glass-card p-6 space-y-6">
        <h3 className="text-sm font-bold text-white">Change Request Audit Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[var(--text-muted)] font-bold uppercase tracking-wider text-[12px]">
                <th className="p-3">CR #</th>
                <th className="p-3">Title & Justification</th>
                <th className="p-3">Schedule Impact</th>
                <th className="p-3 font-mono">Cost Impact</th>
                <th className="p-3">Requested By</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="">
              {changeRequests.map((cr) => (
                <tr key={cr.id} className="table-row-dark">
                  <td className="p-3 font-mono font-bold text-indigo-400">{cr.crNumber}</td>
                  <td className="p-3 font-semibold text-white max-w-sm">
                    <div>{cr.title}</div>
                    <div className="text-[12px] text-[var(--text-muted)] font-normal">{cr.justification}</div>
                  </td>
                  <td className="p-3 font-mono text-amber-300">+{cr.impactScheduleDays} Days</td>
                  <td className="p-3 font-mono text-emerald-400">+${cr.impactCostAmount.toLocaleString()}</td>
                  <td className="p-3 text-[var(--text-muted)]">{cr.requestedBy}</td>
                  <td className="p-3">
                    <span className="text-[12px] bg-[var(--green-dim)]0/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">
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

