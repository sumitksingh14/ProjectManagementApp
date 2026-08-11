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
    setNewIss({
      description: "",
      priority: "High",
      severity: "Blocker",
      owner: "Liam O'Connor",
      reportedDate: new Date().toISOString().split("T")[0],
      dueDate: "2026-08-15",
      status: "Open",
      daysOpen: 1
    });
  };

  const openIssuesCount = (issues || []).filter(i => i?.status !== "Resolved").length;
  const blockerCount = (issues || []).filter(i => i?.severity === "Blocker" || i?.priority === "Critical").length;

  const kpis = [
    { label: "Total Logged Issues", value: String(issues.length), delta: `${openIssuesCount} Active Issues`, up: openIssuesCount === 0, sub: "Issue Management Log", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
    { label: "Critical Blockers", value: String(blockerCount), delta: "Immediate Action Required", up: blockerCount === 0, sub: "Blocker severity items", accentColor: "var(--pink)", glowColor: "rgba(236,72,153,0.15)" },
    { label: "Mean Time to Resolve", value: "2.4 Days", delta: "Optimal Resolution Rate", up: true, sub: "SLA compliance tracking", accentColor: "var(--cyan)", glowColor: "rgba(6,182,212,0.15)" },
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
              Module 11
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMP Issue Resolution Standard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Issue Tracking & Impediment Log
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Track active impediments, blockers, priority levels, assignment owners, and resolution target dates.
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
            Add Issue
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

      {/* Add Issue Modal */}
      {showForm && (
        <form
          onSubmit={handleAddIssue}
          className="glass-card animate-fadeIn"
          style={{ padding: "24px", borderColor: "var(--accent-border)", background: "linear-gradient(145deg, rgba(109,40,217,0.08) 0%, var(--bg-card) 100%)" }}
        >
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Report New Issue</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "10px" }}>Priority</label>
              <select
                value={newIss.priority}
                onChange={(e) => setNewIss({ ...newIss, priority: e.target.value as any })}
                className="form-input-dark"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "10px" }}>Severity</label>
              <select
                value={newIss.severity}
                onChange={(e) => setNewIss({ ...newIss, severity: e.target.value as any })}
                className="form-input-dark"
              >
                <option>Blocker</option>
                <option>Major</option>
                <option>Minor</option>
              </select>
            </div>
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "10px" }}>Assigned Owner</label>
              <input
                type="text"
                value={newIss.owner}
                onChange={(e) => setNewIss({ ...newIss, owner: e.target.value })}
                className="form-input-dark"
              />
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <label className="section-label" style={{ display: "block", marginBottom: "10px" }}>Issue Description *</label>
            <textarea
              required
              rows={2}
              value={newIss.description}
              onChange={(e) => setNewIss({ ...newIss, description: e.target.value })}
              className="form-input-dark"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "var(--text-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-accent">Save Issue</button>
          </div>
        </form>
      )}

      {/* Issues Table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Active Issue Log &amp; Aging Report</h3>
          <button onClick={() => setShowForm(!showForm)} className="btn-accent flex items-center gap-1.5" style={{ padding: "6px 12px" }}>
            <Plus className="w-3.5 h-3.5" /> Add Issue
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Issue ID", "Description", "Priority / Severity", "Days Open", "Owner", "Status"].map(h => (
                  <th key={h} className="section-label" style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((iss) => (
                <tr key={iss.id} className="table-row-dark">
                  <td style={{ padding: "14px 20px" }}>
                    <span className="badge-pink" style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}>
                      {iss.issueCode}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontWeight: 600, color: "var(--text-primary)", maxWidth: "280px", fontSize: "var(--text-sm)" }}>{iss.description}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ color: "var(--pink)", fontWeight: 700 }}>{iss.priority}</span>
                    {" / "}
                    <span style={{ color: "var(--amber)", fontWeight: 500 }}>{iss.severity}</span>
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace", fontWeight: 700, color: "var(--text-primary)" }}>{iss.daysOpen} Days</td>
                  <td style={{ padding: "14px 20px", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{iss.owner}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span className="badge-red">{iss.status}</span>
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
