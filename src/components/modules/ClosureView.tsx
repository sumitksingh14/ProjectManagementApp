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
  "Not Started": "bg-slate-100 text-slate-600 border-slate-300",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-300",
  "Submitted": "bg-amber-100 text-amber-700 border-amber-300",
  "Accepted": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Rejected": "bg-red-100 text-red-700 border-red-300"
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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl text-white flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-500/30 text-slate-200 border border-slate-400/30">Project Closure</span>
          </div>
          <h1 className="text-2xl font-bold">Project Closure & Lessons Learned</h1>
          <p className="text-sm text-slate-300 mt-1">Manage deliverable acceptance, capture lessons, and complete the formal closure process.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-center">
            <div className={`text-3xl font-extrabold font-mono ${closureReadiness === 100 ? "text-emerald-400" : closureReadiness >= 60 ? "text-amber-400" : "text-slate-400"}`}>{closureReadiness}%</div>
            <div className="text-xs text-slate-400">Closure Readiness</div>
          </div>
        </div>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Deliverables Accepted", value: `${acceptedDeliverables}/${deliverables.length}`, color: acceptedDeliverables === deliverables.length ? "text-emerald-600" : "text-amber-600" },
          { label: "Lessons Captured", value: lessons.length, color: "text-indigo-600" },
          { label: "Closure Checklist", value: `${checklistDone}/${closureChecklist.length}`, color: checklistDone === closureChecklist.length ? "text-emerald-600" : "text-slate-700" },
          { label: "Project Phase", value: closureStatus.phase, color: "text-slate-800" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">{kpi.label}</p>
            <div className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div className="flex bg-white border border-slate-200 rounded-xl p-1 text-xs gap-1 w-max shadow-sm">
        {[
          { id: "deliverables", label: "Deliverable Sign-offs", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          { id: "lessons", label: "Lessons Learned", icon: <Lightbulb className="w-3.5 h-3.5" /> },
          { id: "checklist", label: "Closure Checklist", icon: <Archive className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* DELIVERABLES */}
      {activeTab === "deliverables" && (
        <div className="space-y-3">
          {deliverables.map(del => (
            <div key={del.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-bold">{del.phase}</span>
                    <span className="font-bold text-slate-800 text-sm">{del.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{del.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {del.acceptanceCriteria.map((ac, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">✓ {ac}</span>
                    ))}
                  </div>
                  {del.signedOffBy && (
                    <div className="mt-2 text-[10px] text-emerald-700 font-bold">
                      Signed off by: {del.signedOffBy} on {del.signOffDate}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${deliverableStatusColor[del.status]}`}>{del.status}</span>
                  <div className="flex gap-1">
                    {(["Accepted", "Rejected"] as ProjectDeliverable["status"][]).map(s => (
                      <button
                        key={s}
                        onClick={() => updateDeliverableStatus(del.id, s)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${s === "Accepted" ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50" : "border-red-300 text-red-700 hover:bg-red-50"}`}
                      >
                        {s === "Accepted" ? "Accept ✓" : "Reject ✗"}
                      </button>
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-400">Owner: {del.owner} | Due: {del.dueDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LESSONS LEARNED */}
      {activeTab === "lessons" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button onClick={() => setShowLessonForm(!showLessonForm)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
              <PlusCircle className="w-4 h-4" /> Add Lesson
            </button>
          </div>
          {showLessonForm && (
            <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Capture New Lesson</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {[
                  { label: "Title *", key: "title", type: "text" },
                  { label: "Phase", key: "phase", type: "text", placeholder: "e.g. Planning" },
                  { label: "Captured By *", key: "capturedBy", type: "text" },
                  { label: "Description *", key: "description", type: "text" },
                  { label: "Recommendation", key: "recommendation", type: "text" }
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-slate-600 font-bold mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={(newLesson as any)[f.key] || ""}
                      onChange={e => setNewLesson(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-slate-600 font-bold mb-1 text-xs">Category</label>
                  <select value={newLesson.category || "Process"} onChange={e => setNewLesson(p => ({ ...p, category: e.target.value as LessonsLearned["category"] }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none">
                    {["Technical", "Process", "People", "Risk", "Communication", "Governance", "Vendor"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1 text-xs">Impact</label>
                  <select value={newLesson.impact || "Medium"} onChange={e => setNewLesson(p => ({ ...p, impact: e.target.value as LessonsLearned["impact"] }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none">
                    {["High", "Medium", "Low"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={addLesson} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg">Save Lesson</button>
                <button onClick={() => setShowLessonForm(false)} className="text-slate-500 text-xs font-bold px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Cancel</button>
              </div>
            </div>
          )}
          {lessons.map(lesson => {
            const isEx = expandedLesson === lesson.id;
            return (
              <div key={lesson.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => setExpandedLesson(isEx ? null : lesson.id)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${lesson.impact === "High" ? "bg-red-50 border-red-200 text-red-600" : lesson.impact === "Medium" ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                      {lessonCategoryIcons[lesson.category] || <FileText className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{lesson.title}</div>
                      <div className="text-[10px] text-slate-500">{lesson.category} · {lesson.phase} · Captured by: {lesson.capturedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${lesson.impact === "High" ? "bg-red-100 text-red-700 border-red-300" : lesson.impact === "Medium" ? "bg-amber-100 text-amber-700 border-amber-300" : "bg-slate-100 text-slate-600 border-slate-300"}`}>{lesson.impact} Impact</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-2.5 py-1 rounded">{lesson.status}</span>
                    {isEx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {isEx && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Description</span>
                      <p className="text-xs text-slate-700 mt-1">{lesson.description}</p>
                    </div>
                    {lesson.recommendation && (
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Recommendation</span>
                        <p className="text-xs text-emerald-800 mt-1 bg-emerald-50 border border-emerald-100 rounded-lg p-2">{lesson.recommendation}</p>
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
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Formal Project Closure Checklist</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${closureReadiness === 100 ? "bg-emerald-100 text-emerald-700 border-emerald-300" : "bg-amber-100 text-amber-700 border-amber-300"}`}>
              {checklistDone}/{closureChecklist.length} Complete
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${closureReadiness}%` }} />
          </div>
          <div className="space-y-3">
            {closureChecklist.map(item => (
              <div
                key={item.key}
                onClick={() => toggleChecklistItem(item.key)}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${item.done ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200 hover:border-slate-300"}`}
              >
                {item.done
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />}
                <span className={`text-sm font-medium ${item.done ? "text-emerald-800 line-through" : "text-slate-700"}`}>{item.label}</span>
              </div>
            ))}
          </div>
          {closureReadiness === 100 && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-800">Project is ready for formal closure!</p>
              <p className="text-xs text-emerald-600 mt-1">All closure criteria have been met. Notify the PMO to issue the formal project closure certificate.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
