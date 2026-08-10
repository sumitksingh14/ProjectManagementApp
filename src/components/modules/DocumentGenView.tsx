import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { FileText, Copy, Printer, Check, Download, Sparkles } from "lucide-react";

export const DocumentGenView: React.FC = () => {
  const { activeProject } = useProject();
  const [docType, setDocType] = useState<"charter" | "wbs" | "risk" | "deck">("charter");
  const [copied, setCopied] = useState(false);
  const evm = activeProject?.evm ?? { BAC: 0, EAC: 0, CPI: 1, SPI: 1 };
  const intake = activeProject?.intake ?? {};
  const health = activeProject?.health ?? { overallHealth: 'Green' };
  const lifecyclePhases = activeProject?.lifecyclePhases ?? [];
  const risks = activeProject?.risks ?? [];


  const getDocContent = () => {
    switch (docType) {
      case "charter":
        return `# PROJECT CHARTER: ${activeProject?.name?.toUpperCase() ?? 'UNTITLED'}
**Project Code:** ${activeProject?.code ?? 'N/A'}
**Sponsor:** ${intake.sponsor ?? 'TBD'}
**Approved Budget:** $${(intake.estimatedBudget ?? 0).toLocaleString()}
**Target Launch:** ${intake.plannedEndDate ?? 'TBD'}

---

### 1. EXECUTIVE SUMMARY & OBJECTIVES
${intake.executiveSummary ?? ''}

**Strategic Objective:** ${intake.strategicObjective ?? ''}

---

### 2. BUSINESS CASE & EXPECTED BENEFITS
- **Problem Statement:** ${intake.problemStatement ?? ''}
- **Expected ROI:** ${intake.expectedRoiPercent ?? 0}%
- **Key Business Benefits:**
${intake.expectedBenefits ?? ''}

---

### 3. PROJECT SCOPE & BOUNDARIES
- **In Scope:**
${intake.inScope ?? ''}

- **Out of Scope:**
${intake.outOfScope ?? ''}

---

### 4. GOVERNANCE & EARNED VALUE BASES
- **CPI:** ${evm.CPI} | **SPI:** ${evm.SPI}
- **Estimate at Completion (EAC):** $${(evm.EAC ?? 0).toLocaleString()}
`;


      case "wbs":
        return `# WORK BREAKDOWN STRUCTURE (WBS) DICTIONARY: ${activeProject?.name?.toUpperCase() ?? 'UNTITLED'}

${lifecyclePhases
  .map(
    (ph) => `## PHASE ${ph.wbsCode}: ${ph.name} (${ph.durationDays} Days)
${ph.workPackages
  .map(
    (wp) => `### Work Package ${wp.wbsCode}: ${wp.name} (Owner: ${wp.owner})
${wp.tasks
  .map(
    (t) => `- **[${t.wbsCode}] ${t.title}**
  - Assigned: ${t.assignedTo} (${t.assignedRole})
  - Duration: ${t.durationDays}d | Effort: ${t.effortDays}d
  - Status: ${t.status}
  - Deliverable: ${t.deliverableName}`
  )
  .join("\n")}`
  )
  .join("\n\n")}`
  )
  .join("\n\n---\n\n")}`;

      case "risk":
        return `# PROJECT RISK REGISTER & MITIGATION LOG: ${activeProject?.name?.toUpperCase() ?? 'UNTITLED'}

${risks
  .map(
    (r) => `### [${r.riskCode}] ${r.description}
- **Category:** ${r.category}
- **Probability:** ${r.probability} | **Impact:** ${r.impact} | **Severity Score:** ${r.severityScore}/25
- **Owner:** ${r.owner}
- **Proactive Mitigation:** ${r.mitigation}
- **Contingency Plan:** ${r.contingency}
`
  )
  .join("\n---\n")}`;

      case "deck":
        return `# EXECUTIVE STEERING COMMITTEE DECK: ${activeProject?.name?.toUpperCase() ?? 'UNTITLED'}
**Status:** Overall Health - ${health.overallHealth}

## 1. FINANCIAL & SCHEDULE PERFORMANCE
- **Budget (BAC):** $${(evm.BAC ?? 0).toLocaleString()}
- **Forecast Spend (EAC):** $${(evm.EAC ?? 0).toLocaleString()}
- **CPI (Cost Index):** ${evm.CPI}
- **SPI (Schedule Index):** ${evm.SPI}

## 2. HIGH-PRIORITY OPEN RISKS & ISSUES
- Active Risks: ${(activeProject?.risks || []).filter((r) => r.status === "Open").length}
- Active Issues: ${(activeProject?.issues || []).length}
`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getDocContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", fontFamily: "Inter, sans-serif" }} className="space-y-6 animate-fadeIn">
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
              Module 17
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Automated Artifact Generator</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Automated Document Generator
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Instantly generate Project Charters, WBS Dictionaries, Risk Registers, and Executive Decks.
          </p>
        </div>
      </div>

      {/* Document Selector Tabs */}
      <div className="flex glass-card p-1.5 rounded-2xl text-sm gap-2">
        {[
          { id: "charter", label: "Project Charter" },
          { id: "wbs", label: "WBS Dictionary" },
          { id: "risk", label: "Risk Register" },
          { id: "deck", label: "Executive Steering Deck" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDocType(tab.id as any)}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
              docType === tab.id ? "bg-[var(--accent)] text-white shadow-lg shadow-indigo-600/30" : "text-[var(--text-muted)] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Formatted Document Markdown Viewer */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Document Markdown Preview
          </h3>
          <button
            onClick={handleCopy}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
              color: "#fff", borderRadius: "8px", padding: "6px 12px",
              fontSize: "12px", fontWeight: 600, cursor: "pointer"
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Markdown"}
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          <pre className="whitespace-pre-wrap font-mono text-sm text-[var(--text-primary)] p-6 rounded-xl border border-[var(--border)] leading-relaxed overflow-x-auto" style={{ background: "rgba(0,0,0,0.2)" }}>
            {getDocContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};


