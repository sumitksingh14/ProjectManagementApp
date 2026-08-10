import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  Archive,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Users,
  FileText,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Package
} from "lucide-react";
import { LessonsLearned, ProjectDeliverable, ClosureStatus } from "../../types";

const defaultDeliverables: ProjectDeliverable[] = [
  { id: "del-001", title: "Technical Architecture Document", description: "Final approved system architecture blueprint", phase: "Architecture & Design", dueDate: "2026-09-15", owner: "Lead Architect", acceptanceCriteria: ["Reviewed by CISO", "Approved by CTO board", "Version 1.0 signed off"], status: "Accepted", signedOffBy: "CTO", signOffDate: "2026-09-14" },
  { id: "del-002", title: "User Acceptance Testing Report", description: "Complete UAT sign-off report with defect summary", phase: "QA & UAT", dueDate: "2026-10-31", owner: "QA Lead", acceptanceCriteria: ["Pass rate > 95%", "Zero critical defects open", "Business Lead sign-off obtained"], status: "Submitted" },
  { id: "del-003", title: "Production Go-Live Sign-off", description: "Formal confirmation of successful production deployment", phase: "Deployment", dueDate: "2026-11-15", owner: "Project Manager", acceptanceCriteria: ["All services operational", "Zero P1 incidents in 24h", "Runbook handed to Ops team"], status: "Not Started" },
  { id: "del-004", title: "End-User Training Completion", description: "Training program delivered to all affected users", phase: "Deployment", dueDate: "2026-11-10", owner: "Change Manager", acceptanceCriteria: ["Training completion rate > 90%", "Assessment pass rate > 80%"], status: "In Progress" }
];

const defaultLessons: LessonsLearned[] = [
  { id: "ll-001", phase: "Planning", category: "Process", title: "Stakeholder alignment sessions should run in parallel with planning, not after", description: "Significant rework occurred in week 3 because key stakeholders had not reviewed scope boundaries during WBS development.", recommendation: "Embed weekly stakeholder alignment sessions into the planning phase schedule from Day 1.", impact: "High", capturedBy: "Project Manager", capturedDate: "2026-08-01", status: "Published" },
  { id: "ll-002", phase: "Architecture & Design", category: "Technical", title: "API contract-first development prevents late integration failures", description: "Integration delays in Sprint 5 were caused by undocumented API schema changes from the vendor.", recommendation: "Mandate API contract reviews and mock stubs as an entry condition for each integration sprint.", impact: "High", capturedBy: "Lead Architect", capturedDate: "2026-08-10", status: "Applied" },
  { id: "ll-003", phase: "Execution", category: "People", title: "Cross-team dependencies need explicit RACI mapping at task level", description: "Three blocked tasks remained unresolved for 9 days due to unclear ownership across teams.", recommendation: "Add Accountable owner field to every blocked task in the issue tracker, with 48h escalation SLA.", impact: "Medium", capturedBy: "Scrum Master", capturedDate: "2026-08-15", status: "Captured" }
];

const defaultClosureStatus: ClosureStatus = {
  phase: "In Progress",
  deliverablesAccepted: false,
  lessonsLearnedCaptured: true,
  resourcesReleased: false,
  documentationArchived: false,
  finalReportSubmitted: false
};

const deliverableStatusColor: Record<ProjectDeliverable["status"], string> = {
  "Not Started": "badge-slate",
  "In Progress": "badge-blue",
  "Submitted": "badge-amber",
  "Accepted": "badge-green",
  "Rejected": "badge-red"
};

const lessonCategoryIcons: Record<string, React.ReactNode> = {
  Technical: <FileText className="w-3.5 h-3.5" />,
  Process: <Clock className="w-3.5 h-3.5" />,
  People: <Users className="w-3.5 h-3.5" />,
  Risk: <AlertTriangle className="w-3.5 h-3.5" />,
  Communication: <BookOpen className="w-3.5 h-3.5" />,
  Governance: <Package className="w-3.5 h-3.5" />,
  Vendor: <Package className="w-3.5 h-3.5" />
};

export const ClosureView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();

  const deliverables: ProjectDeliverable[] = (activeProject?.deliverables && activeProject.deliverables.length > 0)
    ? activeProject.deliverables
    : defaultDeliverables;
  const lessons: LessonsLearned[] = (activeProject?.lessonsLearned && activeProject.lessonsLearned.length > 0)
    ? activeProject.lessonsLearned
    : defaultLessons;
  const closureStatus: ClosureStatus = activeProject?.closureStatus || defaultClosureStatus;

  const [activeTab, setActiveTab] = useState<"deliverables" | "lessons" | "checklist">("deliverables");
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [newLesson, setNewLesson] = useState<Partial<LessonsLearned>>({ category: "Process", impact: "Medium", status: "Captured" });

  const acceptedDeliverables = deliverables.filter(d => d.status === "Accepted").length;
  const closureChecklist = [
    { key: "deliverablesAccepted", label: "All Deliverables Accepted by Customer", done: closureStatus.deliverablesAccepted },
    { key: "lessonsLearnedCaptured", label: "Lessons Learned Captured & Published", done: closureStatus.lessonsLearnedCaptured },
    { key: "resourcesReleased", label: "Team Resources Released to Resource Pool", done: closureStatus.resourcesReleased },
    { key: "documentationArchived", label: "Project Documentation Archived", done: closureStatus.documentationArchived },
    { key: "finalReportSubmitted", label: "Final Project Report Submitted to PMO", done: closureStatus.finalReportSubmitted }
  ];
  const checklistDone = closureChecklist.filter(c => c.done).length;
  const closureReadiness = Math.round((checklistDone / closureChecklist.length) * 100);

  const updateDeliverableStatus = (id: string, status: ProjectDeliverable["status"]) => {
    updateActiveProject(prev => ({
      ...prev,
      deliverables: (prev.deliverables || defaultDeliverables).map(d => d.id === id ? { ...d, status } : d)
    }));
  };

  const toggleChecklistItem = (key: string) => {
    updateActiveProject(prev => ({
      ...prev,
      closureStatus: { ...(prev.closureStatus || defaultClosureStatus), [key]: !(prev.closureStatus as any)?.[key] }
    }));
  };

  const addLesson = () => {
    if (!newLesson.title || !newLesson.capturedBy || !newLesson.description) return;
    const lesson: LessonsLearned = {
      id: `ll-${Date.now()}`,
      phase: newLesson.phase || "General",
      category: newLesson.category as LessonsLearned["category"] || "Process",
      title: newLesson.title!,
      description: newLesson.description!,
      recommendation: newLesson.recommendation || "",
      impact: newLesson.impact as LessonsLearned["impact"] || "Medium",
      capturedBy: newLesson.capturedBy!,
      capturedDate: new Date().toISOString().split("T")[0],
      status: "Captured"
    };
    updateActiveProject(prev => ({ ...prev, lessonsLearned: [...(prev.lessonsLearned || []), lesson] }));
    setShowLessonForm(false);
    setNewLesson({ category: "Process", impact: "Medium", status: "Captured" });
  };

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
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
              Project Closure
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Enterprise PMO</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Project Closure & Lessons Learned
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Manage deliverable acceptance, capture lessons, and complete the formal closure process.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Deliverables Accepted", value: `${acceptedDeliverables}/${deliverables.length}`, color: acceptedDeliverables === deliverables.length ? "text-[var(--green)]" : "text-[var(--amber)]" },
          { label: "Lessons Captured", value: lessons.length, color: "text-[var(--accent)]" },
          { label: "Closure Checklist", value: `${checklistDone}/${closureChecklist.length}`, color: checklistDone === closureChecklist.length ? "text-[var(--green)]" : "text-[var(--text-primary)]" },
          { label: "Project Phase", value: closureStatus.phase, color: "text-[var(--text-primary)]" }
        ].map((kpi, i) => (
          <div key={i} className="glass-card rounded-xl p-4 shadow-sm">
            <p className="text-[12px] text-[var(--text-secondary)] uppercase font-bold tracking-wide">{kpi.label}</p>
            <div className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div className="flex glass-card rounded-xl p-1 text-xs gap-1 w-max shadow-sm">
        {[
          { id: "deliverables", label: "Deliverable Sign-offs", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          { id: "lessons", label: "Lessons Learned", icon: <Lightbulb className="w-3.5 h-3.5" /> },
          { id: "checklist", label: "Closure Checklist", icon: <Archive className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab.id ? "bg-[var(--accent)] text-white shadow" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* DELIVERABLES */}
      {activeTab === "deliverables" && (
        <div className="space-y-6">
          {deliverables.map(del => (
            <div key={del.id} className="glass-card rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-border)] px-2 py-0.5 rounded font-bold">{del.phase}</span>
                    <span className="font-bold text-[var(--text-primary)] text-sm">{del.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{del.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {del.acceptanceCriteria.map((ac, i) => (
                      <span key={i} className="text-[12px] bg-[var(--bg-card-hover)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">✓ {ac}</span>
                    ))}
                  </div>
                  {del.signedOffBy && (
                    <div className="mt-2 text-[12px] text-[var(--green)] font-bold">
                      Signed off by: {del.signedOffBy} on {del.signOffDate}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full border ${deliverableStatusColor[del.status]}`}>{del.status}</span>
                  <div className="flex gap-1">
                    {(["Accepted", "Rejected"] as ProjectDeliverable["status"][]).map(s => (
                      <button
                        key={s}
                        onClick={() => updateDeliverableStatus(del.id, s)}
                        className={`text-[12px] font-bold px-2.5 py-1 rounded-lg border transition-all ${s === "Accepted" ? "border-[var(--border)] text-[var(--green)] hover:bg-[var(--green-dim)]" : "border-[var(--border)] text-[var(--pink)] hover:bg-[var(--pink-dim)]"}`}
                      >
                        {s === "Accepted" ? "Accept ✓" : "Reject ✗"}
                      </button>
                    ))}
                  </div>
                  <div className="text-[12px] text-[var(--text-muted)]">Owner: {del.owner} | Due: {del.dueDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LESSONS LEARNED */}
      {activeTab === "lessons" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => setShowLessonForm(!showLessonForm)} className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
              <PlusCircle className="w-4 h-4" /> Add Lesson
            </button>
          </div>
          {showLessonForm && (
            <div className="bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-xl p-5 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Capture New Lesson</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {[
                  { label: "Title *", key: "title", type: "text" },
                  { label: "Phase", key: "phase", type: "text", placeholder: "e.g. Planning" },
                  { label: "Captured By *", key: "capturedBy", type: "text" },
                  { label: "Description *", key: "description", type: "text" },
                  { label: "Recommendation", key: "recommendation", type: "text" }
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-[var(--text-secondary)] font-bold mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={(newLesson as any)[f.key] || ""}
                      onChange={e => setNewLesson(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-[var(--text-secondary)] font-bold mb-1 text-xs">Category</label>
                  <select value={newLesson.category || "Process"} onChange={e => setNewLesson(p => ({ ...p, category: e.target.value as LessonsLearned["category"] }))}
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] outline-none">
                    {["Technical", "Process", "People", "Risk", "Communication", "Governance", "Vendor"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--text-secondary)] font-bold mb-1 text-xs">Impact</label>
                  <select value={newLesson.impact || "Medium"} onChange={e => setNewLesson(p => ({ ...p, impact: e.target.value as LessonsLearned["impact"] }))}
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] outline-none">
                    {["High", "Medium", "Low"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={addLesson} className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-xs font-bold px-4 py-2 rounded-lg">Save Lesson</button>
                <button onClick={() => setShowLessonForm(false)} className="text-[var(--text-secondary)] text-xs font-bold px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-card)]">Cancel</button>
              </div>
            </div>
          )}
          {lessons.map(lesson => {
            const isEx = expandedLesson === lesson.id;
            return (
              <div key={lesson.id} className="glass-card rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-card)]" onClick={() => setExpandedLesson(isEx ? null : lesson.id)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${lesson.impact === "High" ? "bg-[var(--pink-dim)] border-[var(--border)] text-[var(--pink)]" : lesson.impact === "Medium" ? "bg-[var(--amber-dim)] border-[var(--border)] text-[var(--amber)]" : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-secondary)]"}`}>
                      {lessonCategoryIcons[lesson.category] || <FileText className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">{lesson.title}</div>
                      <div className="text-[12px] text-[var(--text-secondary)]">{lesson.category} · {lesson.phase} · Captured by: {lesson.capturedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[12px] font-bold px-2.5 py-1 rounded border ${lesson.impact === "High" ? "badge-red" : lesson.impact === "Medium" ? "badge-amber" : "badge-slate"}`}>{lesson.impact} Impact</span>
                    <span className="badge-violet">{lesson.status}</span>
                    {isEx ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                  </div>
                </div>
                {isEx && (
                  <div className="border-t border-[var(--border)] p-4 bg-[var(--bg-card)]/50 space-y-2">
                    <div>
                      <span className="text-[12px] font-bold text-[var(--text-secondary)] uppercase">Description</span>
                      <p className="text-xs text-[var(--text-primary)] mt-1">{lesson.description}</p>
                    </div>
                    {lesson.recommendation && (
                      <div>
                        <span className="text-[12px] font-bold text-[var(--green)] uppercase">Recommendation</span>
                        <p className="text-xs text-[var(--text-primary)] mt-1 bg-[var(--green-dim)] border border-[var(--border)] rounded-lg p-2">{lesson.recommendation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CLOSURE CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="glass-card rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Formal Project Closure Checklist</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${closureReadiness === 100 ? "badge-green" : "badge-amber"}`}>
              {checklistDone}/{closureChecklist.length} Complete
            </span>
          </div>
          <div className="h-2 w-full bg-[var(--bg-card-hover)] rounded-full overflow-hidden mb-4">
            <div className="h-full rounded-full transition-all" style={{ width: `${closureReadiness}%`, background: "var(--grad-primary)" }} />
          </div>
          <div className="space-y-6">
            {closureChecklist.map(item => (
              <div
                key={item.key}
                onClick={() => toggleChecklistItem(item.key)}
                className={`flex items-center gap-6 p-4 rounded-xl border cursor-pointer transition-all ${item.done ? "bg-[var(--green-dim)] border-[var(--border)]" : "bg-[var(--bg-card)] border-[var(--border)] hover:border-[var(--accent-border)]"}`}
              >
                {item.done
                  ? <CheckCircle2 className="w-5 h-5 text-[var(--green)] shrink-0" />
                  : <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] shrink-0" />}
                <span className={`text-sm font-medium ${item.done ? "text-[var(--green)] line-through" : "text-[var(--text-primary)]"}`}>{item.label}</span>
              </div>
            ))}
          </div>
          {closureReadiness === 100 && (
            <div className="mt-4 p-4 bg-[var(--green-dim)] border border-[var(--border)] rounded-xl text-center">
              <CheckCircle2 className="w-8 h-8 text-[var(--green)] mx-auto mb-2" />
              <p className="text-sm font-bold text-[var(--text-primary)]">Project is ready for formal closure!</p>
              <p className="text-xs text-[var(--green)] mt-1">All closure criteria have been met. Notify the PMO to issue the formal project closure certificate.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
