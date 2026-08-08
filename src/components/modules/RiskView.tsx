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
            Risk Register &amp; Predictive Risk Engine
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Capture root causes, triggers, mitigations, contingencies, severity heatmaps, and AI predictive risk analysis.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <button
            onClick={() => generateAiRisks?.()}
            className="btn-accent flex items-center gap-1.5"
            style={{ padding: "8px 16px" }}
            disabled={isAiLoading}
          >
            {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles style={{ width: "13px", height: "13px", color: "#FCD34D" }} />}
            AI Risk Analysis
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-xl transition-all cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)",
              color: "#fff", padding: "8px 14px", fontSize: "12px", fontWeight: 600, backdropFilter: "blur(10px)"
            }}
          >
            <Plus style={{ width: "14px", height: "14px" }} />
            Add Risk
          </button>
        </div>
      </div>

      {/* Manual Risk Form */}
      {showForm && (
        <form
          onSubmit={handleAddRisk}
          className="glass-card animate-fadeIn"
          style={{
            padding: "24px",
            borderColor: "var(--accent-border)",
            background: "linear-gradient(145deg, rgba(109,40,217,0.08) 0%, var(--bg-card) 100%)"
          }}
        >
          <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
            Add Risk to Register
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Risk Category", key: "category", type: "select", options: ["Technical", "Schedule", "Financial", "Resource", "Vendor", "Scope"] },
              { label: "Probability", key: "probability", type: "select", options: ["High", "Medium", "Low"] },
              { label: "Impact", key: "impact", type: "select", options: ["High", "Medium", "Low"] },
            ].map(field => (
              <div key={field.key}>
                <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>{field.label}</label>
                <select
                  value={(newRisk as any)[field.key]}
                  onChange={(e) => setNewRisk({ ...newRisk, [field.key]: e.target.value as any })}
                  className="form-input-dark"
                >
                  {field.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px" }}>
            <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>Risk Statement / Description *</label>
            <textarea
              required
              rows={2}
              value={newRisk.description}
              onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
              className="form-input-dark"
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>Proactive Mitigation Strategy</label>
            <textarea
              rows={2}
              value={newRisk.mitigation}
              onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
              className="form-input-dark"
            />
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
            <button type="submit" className="btn-accent">Save Risk</button>
          </div>
        </form>
      )}

      {/* Risk Register Table */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)" }}>
            Active Risk Register &amp; Mitigation Strategy
          </h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Risk ID", "Category & Description", "Prob / Impact", "Severity", "Proactive Mitigation", "Owner", "Status"].map(h => (
                  <th key={h} className="section-label" style={{ padding: "10px 16px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id} className="table-row-dark">
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontWeight: 700, color: "var(--amber)" }}>{r.riskCode}</td>
                  <td style={{ padding: "12px 16px", maxWidth: "200px" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{r.description}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Category: {r.category}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                    <span style={{ color: "var(--amber)" }}>{r.probability}</span>
                    {" / "}
                    <span style={{ color: "var(--pink)" }}>{r.impact}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                    <span style={{ background: "var(--pink-dim)", color: "var(--pink)", fontWeight: 800, padding: "2px 8px", borderRadius: "6px", border: "1px solid rgba(236,72,153,0.25)" }}>
                      {r.severityScore} / 25
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "var(--text-sm)", color: "var(--text-muted)", maxWidth: "200px", lineHeight: 1.6 }}>{r.mitigation}</td>
                  <td style={{ padding: "12px 16px", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{r.owner}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span className={r.status === "Open" ? "badge-amber" : "badge-green"}>
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
