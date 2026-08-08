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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 17
            </span>
            <span className="text-xs text-slate-400">Automated Artifact Generator</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Automated Document Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Instantly generate Project Charters, WBS Dictionaries, Risk Registers, and Executive Decks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied Markdown!" : "Copy Document"}</span>
          </button>
        </div>
      </div>

      {/* Document Selector Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs gap-2">
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
              docType === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Formatted Document Markdown Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 bg-slate-950 p-6 rounded-xl border border-slate-800/80 leading-relaxed overflow-x-auto">
          {getDocContent()}
        </pre>
      </div>
    </div>
  );
};
