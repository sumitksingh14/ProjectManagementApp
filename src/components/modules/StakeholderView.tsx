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

  const kpis = [
    { label: "Total Mapped Stakeholders", value: String(stakeholders.length), delta: `${keyPlayers.length} Key Players`, up: true, sub: "Registered stakeholder directory", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
    { label: "High Influence / High Interest", value: String(keyPlayers.length), delta: "Manage Closely", up: true, sub: "Executive Steering focus", accentColor: "var(--pink)", glowColor: "rgba(236,72,153,0.15)" },
    { label: "Engagement Alignment", value: "Optimal", delta: "Strategy Active", up: true, sub: "Communication matrix active", accentColor: "var(--cyan)", glowColor: "rgba(6,182,212,0.15)" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", gap: "25px" }} className="animate-fadeIn">
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
              Module 7
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMP Stakeholder Engagement Standard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Stakeholder Power / Interest Matrix
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Map key decision makers, communication preferences, influence/interest quadrants, and engagement strategies.
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
            Add Stakeholder
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
              background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)`,
            }}
          >
            <p className="section-label" style={{ marginBottom: "12px" }}>{kpi.label}</p>
            <div className="kpi-value" style={{ marginBottom: "10px" }}>{kpi.value}</div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Add Stakeholder Form */}
      {showForm && (
        <form
          onSubmit={handleAddStakeholder}
          className="glass-card animate-fadeIn"
          style={{
            padding: "24px",
            borderColor: "var(--accent-border)",
            background: "linear-gradient(145deg, rgba(109,40,217,0.08) 0%, var(--bg-card) 100%)"
          }}
        >
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
            New Stakeholder Record
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Name *", key: "name", type: "text", required: true },
              { label: "Position / Title", key: "position", type: "text" },
              { label: "Department", key: "department", type: "text" },
            ].map(field => (
              <div key={field.key}>
                <label className="section-label" style={{ display: "block", marginBottom: "10px" }}>{field.label}</label>
                <input
                  type={field.type}
                  required={field.required}
                  value={(newStk as any)[field.key] || ""}
                  onChange={(e) => setNewStk({ ...newStk, [field.key]: e.target.value })}
                  className="form-input-dark"
                />
              </div>
            ))}
            {[
              { label: "Influence Power", key: "influence", options: ["High", "Medium", "Low"] },
              { label: "Interest Level", key: "interest", options: ["High", "Medium", "Low"] },
              { label: "Communication Channel", key: "communicationPreference", options: ["Weekly Steering", "Bi-Weekly Email", "Ad-hoc Dashboard", "Slack/Teams"] },
            ].map(field => (
              <div key={field.key}>
                <label className="section-label" style={{ display: "block", marginBottom: "10px" }}>{field.label}</label>
                <select
                  value={(newStk as any)[field.key] || ""}
                  onChange={(e) => setNewStk({ ...newStk, [field.key]: e.target.value as any })}
                  className="form-input-dark"
                >
                  {field.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: "8px 16px", borderRadius: "8px", fontSize: "var(--text-sm)",
                background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                color: "var(--text-muted)", cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-accent">Save Stakeholder</button>
          </div>
        </form>
      )}

      {/* 2x2 Stakeholder Matrix */}
      <div className="glass-card" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Users style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
          Stakeholder Power / Interest Grid (2×2 Matrix)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Players (High Power, High Interest) */}
          <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", padding: "16px", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(139,92,246,0.20)", paddingBottom: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Key Players (Manage Closely)</span>
              <span className="badge-violet" style={{ fontFamily: "monospace" }}>High Power / High Interest</span>
            </div>
            <div className="space-y-6 text-sm">
              {keyPlayers.length > 0 ? keyPlayers.map((s) => (
                <div key={s.id} style={{ background: "var(--bg-card)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(139,92,246,0.20)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{s.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.position} ({s.department})</p>
                  </div>
                  <span className="badge-violet" style={{ fontFamily: "monospace" }}>{s.communicationPreference}</span>
                </div>
              )) : (
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontStyle: "italic" }}>No stakeholders mapped in this quadrant.</p>
              )}
            </div>
          </div>

          {/* Keep Satisfied (High Power, Low/Med Interest) */}
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", padding: "16px", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(245,158,11,0.20)", paddingBottom: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Keep Satisfied</span>
              <span className="badge-amber" style={{ fontFamily: "monospace" }}>High Power / Low-Med Interest</span>
            </div>
            <div className="space-y-6 text-sm">
              {keepSatisfied.length > 0 ? (
                keepSatisfied.map((s) => (
                  <div key={s.id} style={{ background: "var(--bg-card)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(245,158,11,0.20)" }}>
                    <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{s.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.position}</p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontStyle: "italic" }}>No stakeholders currently mapped in this quadrant.</p>
              )}
            </div>
          </div>

          {/* Keep Informed (Low/Med Power, High Interest) */}
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", padding: "16px", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(16,185,129,0.20)", paddingBottom: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Keep Informed</span>
              <span className="badge-green" style={{ fontFamily: "monospace" }}>Low Power / High Interest</span>
            </div>
            <div className="space-y-6 text-sm">
              {keepInformed.length > 0 ? keepInformed.map((s) => (
                <div key={s.id} style={{ background: "var(--bg-card)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.20)" }}>
                  <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{s.name}</p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.position}</p>
                </div>
              )) : (
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontStyle: "italic" }}>No stakeholders currently mapped in this quadrant.</p>
              )}
            </div>
          </div>

          {/* Monitor Only */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", padding: "16px", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Monitor (Minimal Effort)</span>
              <span className="badge-slate" style={{ fontFamily: "monospace" }}>Low Power / Low Interest</span>
            </div>
            <div className="space-y-6 text-sm">
              {monitorOnly.length > 0 ? (
                monitorOnly.map((s) => (
                  <div key={s.id} style={{ background: "var(--bg-card)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                    <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{s.name}</p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", fontStyle: "italic" }}>No stakeholders currently mapped in this quadrant.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Register Table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Stakeholder Register &amp; Engagement Strategy
          </h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Stakeholder", "Role & Dept", "Power / Interest", "Comm Channel", "Engagement Strategy"].map(h => (
                  <th key={h} className="section-label" style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stakeholders.map((s) => (
                <tr key={s.id} className="table-row-dark">
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{s.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.position}</div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{s.role}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.department}</div>
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace" }}>
                    <span style={{ color: "var(--accent)" }}>{s.influence} Influence</span>
                    {" / "}
                    <span style={{ color: "var(--green)" }}>{s.interest} Interest</span>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{s.communicationPreference}</td>
                  <td style={{ padding: "14px 20px", fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: "240px", lineHeight: 1.6 }}>{s.engagementStrategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
