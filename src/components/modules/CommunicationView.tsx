import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  MessageSquare,
  Send,
  Sparkles,
  FileText,
  CheckCircle2,
  PlusCircle,
  Calendar,
  Users,
  Inbox,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertCircle,
  XCircle
} from "lucide-react";
import { ActionItem, MeetingMinutes } from "../../types";

const defaultActionItems: ActionItem[] = [
  { id: "ai-001", description: "Finalize API contract specification with SecureAuth vendor", owner: "Lead Architect", dueDate: "2026-08-20", priority: "High", status: "In Progress", sourceType: "Meeting", sourceRef: "Steering Committee Aug 5", createdDate: "2026-08-05" },
  { id: "ai-002", description: "Complete risk assessment for cloud migration phase 2", owner: "Risk Manager", dueDate: "2026-08-25", priority: "High", status: "Open", sourceType: "Risk", sourceRef: "RSK-012", createdDate: "2026-08-08" },
  { id: "ai-003", description: "Send weekly status update to executive sponsor", owner: "Project Manager", dueDate: "2026-08-15", priority: "Medium", status: "Completed", sourceType: "Meeting", sourceRef: "PMO Status Review", createdDate: "2026-08-10", completedDate: "2026-08-14" },
  { id: "ai-004", description: "Review and approve UAT test cases for auth module", owner: "QA Lead", dueDate: "2026-08-30", priority: "Medium", status: "Open", sourceType: "Change Request", sourceRef: "CR-008", createdDate: "2026-08-12" }
];

const defaultMeetings: MeetingMinutes[] = [
  {
    id: "mm-001",
    meetingType: "Steering Committee",
    title: "August Steering Committee Review",
    date: "2026-08-05",
    attendees: ["Alex Thompson", "Dr. Maya Chen", "James Rivera", "Sarah Lee"],
    agenda: ["Portfolio health review", "Q3 budget variance", "Vendor escalation — SecureAuth delay", "Risk register update"],
    keyDecisions: ["Extend SecureAuth deadline to Sep 30", "Activate $50K contingency reserve for cloud over-runs", "Approve Phase 3 feature deferral"],
    actionItems: ["ai-001", "ai-002"],
    nextMeetingDate: "2026-09-02",
    facilitator: "Sarah Lee"
  },
  {
    id: "mm-002",
    meetingType: "Risk Review",
    title: "Monthly Risk & Issue Review",
    date: "2026-08-12",
    attendees: ["Sarah Lee", "Marcus Johnson", "Lisa Wang", "Risk Manager"],
    agenda: ["Review open risks", "New risk identification", "Issue escalation review"],
    keyDecisions: ["Escalate RSK-012 to program level", "Close RSK-007 — mitigated successfully"],
    actionItems: ["ai-004"],
    nextMeetingDate: "2026-09-12",
    facilitator: "Marcus Johnson"
  }
];

const priorityConfig: Record<ActionItem["priority"], string> = {
  High: "bg-red-100 text-[var(--pink)] border-red-300",
  Medium: "bg-amber-100 text-[var(--amber)] border-amber-300",
  Low: "bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border-[var(--border)]"
};

const statusConfig: Record<ActionItem["status"], { color: string; icon: React.ReactNode }> = {
  Open: { color: "text-[var(--text-primary)]", icon: <Clock className="w-3.5 h-3.5" /> },
  "In Progress": { color: "text-blue-700", icon: <AlertCircle className="w-3.5 h-3.5" /> },
  Completed: { color: "text-[var(--green)]", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  Cancelled: { color: "text-[var(--pink)]", icon: <XCircle className="w-3.5 h-3.5" /> }
};

export const CommunicationView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const [activeTab, setActiveTab] = useState<"report" | "actions" | "meetings">("report");
  const [reportType, setReportType] = useState<"weekly" | "executive">("weekly");
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const [showAddAction, setShowAddAction] = useState(false);
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({ priority: "Medium", status: "Open", sourceType: "Meeting" });

  const actionItems: ActionItem[] = (activeProject?.actionItems && activeProject.actionItems.length > 0)
    ? activeProject.actionItems
    : defaultActionItems;
  const meetings: MeetingMinutes[] = (activeProject?.meetingMinutes && activeProject.meetingMinutes.length > 0)
    ? activeProject.meetingMinutes
    : defaultMeetings;

  const openActions = actionItems.filter(a => a.status === "Open" || a.status === "In Progress").length;
  const overdueActions = actionItems.filter(a => (a.status === "Open" || a.status === "In Progress") && new Date(a.dueDate) < new Date()).length;
  const completedActions = actionItems.filter(a => a.status === "Completed").length;

  const addAction = () => {
    if (!newAction.description || !newAction.owner || !newAction.dueDate) return;
    const action: ActionItem = {
      id: `ai-${Date.now()}`,
      description: newAction.description!,
      owner: newAction.owner!,
      dueDate: newAction.dueDate!,
      priority: newAction.priority as ActionItem["priority"] || "Medium",
      status: "Open",
      sourceType: newAction.sourceType as ActionItem["sourceType"] || "Meeting",
      createdDate: new Date().toISOString().split("T")[0]
    };
    updateActiveProject(prev => ({ ...prev, actionItems: [...(prev.actionItems || []), action] }));
    setShowAddAction(false);
    setNewAction({ priority: "Medium", status: "Open", sourceType: "Meeting" });
  };

  const toggleActionStatus = (id: string, status: ActionItem["status"]) => {
    updateActiveProject(prev => ({
      ...prev,
      actionItems: (prev.actionItems || defaultActionItems).map(a => a.id === id ? { ...a, status } : a)
    }));
  };

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
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
              Module 14
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Communication & Status Reporting</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Communication Management
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Action items, meeting minutes, stakeholder status reports, and communication tracking.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* Tabs */}
      <div className="flex glass-card rounded-xl p-1 text-xs gap-1 shadow-sm w-max">
        {[
          { id: "report", label: "Status Reports", icon: <FileText className="w-3.5 h-3.5" /> },
          { id: "actions", label: "Action Items", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          { id: "meetings", label: "Meeting Minutes", icon: <Calendar className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab.id ? "bg-[var(--accent)] text-white shadow" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* STATUS REPORT */}
      {activeTab === "report" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {[{ id: "weekly", label: "Weekly PMO Status Report" }, { id: "executive", label: "Executive 1-Pager Brief" }].map(r => (
              <button key={r.id} onClick={() => setReportType(r.id as any)}
                className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all ${reportType === r.id ? "bg-[var(--accent)] text-white border-indigo-600" : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-indigo-400"}`}>
                {r.label}
              </button>
            ))}
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {reportType === "weekly" ? "Weekly Project Status Summary" : "Executive Steering Brief"} — {activeProject?.name}
              </h3>
              <span className="text-[var(--text-muted)] font-mono">Date: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
              <div>
                <span className="font-bold text-white uppercase tracking-wider text-[10px]">Overall Health</span>
                <div className="flex gap-3 mt-2">
                  {[
                    { label: "Schedule", val: activeProject?.health?.scheduleHealth || "Green" },
                    { label: "Budget", val: activeProject?.health?.budgetHealth || "Green" },
                    { label: "Scope", val: activeProject?.health?.scopeHealth || "Green" },
                    { label: "Quality", val: activeProject?.health?.qualityHealth || "Green" },
                    { label: "Risk", val: activeProject?.health?.riskHealth || "Green" }
                  ].map(h => (
                    <div key={h.label} className="text-center">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${h.val === "Green" ? "bg-[var(--green-dim)]0" : h.val === "Amber" ? "bg-[var(--amber-dim)]0" : "bg-[var(--pink-dim)]0"}`} />
                      <div className="text-[10px] text-[var(--text-muted)]">{h.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-white uppercase tracking-wider text-[10px]">EVM Performance</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {[
                    { label: "CPI", value: activeProject?.evm?.CPI?.toFixed(2) || "1.00" },
                    { label: "SPI", value: activeProject?.evm?.SPI?.toFixed(2) || "1.00" },
                    { label: "EAC", value: `$${(activeProject?.evm?.EAC || 0).toLocaleString()}` },
                    { label: "VAC", value: `$${(activeProject?.evm?.VAC || 0).toLocaleString()}` }
                  ].map(m => (
                    <div key={m.label} className="bg-slate-800/60 rounded-lg p-3 text-center">
                      <div className="text-[10px] text-[var(--text-muted)]">{m.label}</div>
                      <div className="text-lg font-extrabold text-white font-mono">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-white uppercase tracking-wider text-[10px]">Open Risks & Issues</span>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between"><span>Open Risks:</span><span className="text-rose-400 font-bold">{(activeProject?.risks || []).filter(r => r.status === "Open").length}</span></div>
                  <div className="flex justify-between"><span>Active Issues:</span><span className="text-amber-400 font-bold">{(activeProject?.issues || []).filter(i => i.status !== "Resolved").length}</span></div>
                  <div className="flex justify-between"><span>Pending Actions:</span><span className="text-indigo-400 font-bold">{openActions}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTION ITEMS */}
      {activeTab === "actions" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowAddAction(!showAddAction)} className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-xs font-bold px-4 py-2 rounded-lg">
              <PlusCircle className="w-4 h-4" /> Add Action Item
            </button>
          </div>
          {showAddAction && (
            <div className="bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">New Action Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {[
                  { label: "Description *", key: "description", type: "text" },
                  { label: "Owner *", key: "owner", type: "text" },
                  { label: "Due Date *", key: "dueDate", type: "date" },
                  { label: "Source Reference", key: "sourceRef", type: "text" }
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-[var(--text-secondary)] font-bold mb-1">{f.label}</label>
                    <input type={f.type} value={(newAction as any)[f.key] || ""}
                      onChange={e => setNewAction(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-[var(--text-secondary)] font-bold mb-1 text-xs">Priority</label>
                  <select value={newAction.priority || "Medium"} onChange={e => setNewAction(p => ({ ...p, priority: e.target.value as ActionItem["priority"] }))}
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] outline-none">
                    {["High", "Medium", "Low"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--text-secondary)] font-bold mb-1 text-xs">Source Type</label>
                  <select value={newAction.sourceType || "Meeting"} onChange={e => setNewAction(p => ({ ...p, sourceType: e.target.value as ActionItem["sourceType"] }))}
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] outline-none">
                    {["Meeting", "Risk", "Issue", "Change Request", "Steering Committee"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={addAction} className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-xs font-bold px-4 py-2 rounded-lg">Save Action</button>
                <button onClick={() => setShowAddAction(false)} className="text-[var(--text-secondary)] text-xs font-bold px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-card)]">Cancel</button>
              </div>
            </div>
          )}
          <div className="glass-card rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wide bg-[var(--bg-card)]">
                  <th className="p-3 text-left">Action Item</th>
                  <th className="p-3 text-left">Owner</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-center">Priority</th>
                  <th className="p-3 text-center">Source</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {actionItems.map(item => {
                  const cfg = statusConfig[item.status];
                  const isOverdue = (item.status === "Open" || item.status === "In Progress") && new Date(item.dueDate) < new Date();
                  return (
                    <tr key={item.id} className={`hover:bg-[var(--bg-card)] ${isOverdue ? "bg-[var(--pink-dim)]/30" : ""}`}>
                      <td className="p-3 font-semibold text-[var(--text-primary)] max-w-xs">{item.description}</td>
                      <td className="p-3 text-[var(--text-secondary)]">{item.owner}</td>
                      <td className={`p-3 font-mono ${isOverdue ? "text-[var(--pink)] font-bold" : "text-[var(--text-secondary)]"}`}>{item.dueDate}{isOverdue && " ⚠️"}</td>
                      <td className="p-3 text-center"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityConfig[item.priority]}`}>{item.priority}</span></td>
                      <td className="p-3 text-center"><span className="text-[10px] bg-[var(--bg-card-hover)] text-[var(--text-secondary)] px-2 py-0.5 rounded">{item.sourceType}</span></td>
                      <td className={`p-3 text-center font-bold text-xs ${cfg.color}`}>
                        <span className="flex items-center justify-center gap-1">{cfg.icon} {item.status}</span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-1">
                          {item.status !== "Completed" && (
                            <button onClick={() => toggleActionStatus(item.id, "Completed")} className="text-[10px] text-[var(--green)] font-bold hover:bg-[var(--green-dim)] px-2 py-0.5 rounded">Done</button>
                          )}
                          {item.status === "Open" && (
                            <button onClick={() => toggleActionStatus(item.id, "In Progress")} className="text-[10px] text-blue-700 font-bold hover:bg-blue-100 px-2 py-0.5 rounded">Start</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MEETING MINUTES */}
      {activeTab === "meetings" && (
        <div className="space-y-3">
          {meetings.map(meeting => {
            const isEx = expandedMeeting === meeting.id;
            return (
              <div key={meeting.id} className="glass-card rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-card)]" onClick={() => setExpandedMeeting(isEx ? null : meeting.id)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-glow)] border border-[var(--accent-border)] flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">{meeting.title}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{meeting.meetingType} · {meeting.date} · Facilitated by {meeting.facilitator}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-border)] font-bold px-2 py-0.5 rounded">{meeting.attendees.length} Attendees</span>
                    <span className="text-[10px] bg-[var(--amber-dim)] text-[var(--amber)] border border-amber-200 font-bold px-2 py-0.5 rounded">{meeting.keyDecisions.length} Decisions</span>
                    {isEx ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                  </div>
                </div>
                {isEx && (
                  <div className="border-t border-[var(--border)] p-4 bg-[var(--bg-card)]/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-[var(--text-secondary)] uppercase text-[10px]">Attendees</span>
                      <div className="flex flex-wrap gap-1 mt-1">{meeting.attendees.map((a, i) => <span key={i} className="bg-[var(--bg-card-hover)] text-[var(--text-primary)] px-2 py-0.5 rounded-full">{a}</span>)}</div>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--text-secondary)] uppercase text-[10px]">Agenda</span>
                      <ul className="mt-1 space-y-0.5 list-disc list-inside text-[var(--text-primary)]">{meeting.agenda.map((a, i) => <li key={i}>{a}</li>)}</ul>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--green)] uppercase text-[10px]">Key Decisions</span>
                      <ul className="mt-1 space-y-1">{meeting.keyDecisions.map((d, i) => <li key={i} className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[var(--text-primary)]">{d}</span></li>)}</ul>
                    </div>
                    {meeting.nextMeetingDate && (
                      <div className="bg-[var(--accent-glow)] border border-indigo-100 rounded-lg p-3">
                        <span className="font-bold text-[var(--accent)] uppercase text-[10px]">Next Meeting</span>
                        <div className="font-bold text-indigo-800 mt-1">{meeting.nextMeetingDate}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
