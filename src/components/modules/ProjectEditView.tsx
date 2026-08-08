import React, { useState, useEffect } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  Target,
  Users,
  Briefcase,
  Layers,
  ArrowLeft
} from "lucide-react";

interface ValidationErrors {
  [key: string]: string;
}

export const ProjectEditView: React.FC = () => {
  const { activeProject, updateActiveProject, setActiveTab } = useProject();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    department: "",
    businessUnit: "",
    priority: "Strategic" as "Strategic" | "High" | "Medium" | "Low",
    estimatedBudget: 0,
    plannedStartDate: "",
    plannedEndDate: "",
    problemStatement: "",
    executiveSummary: "",
    strategicObjective: "",
    expectedRoiPercent: 0,
    primaryObjective: "",
    inScope: "",
    outOfScope: "",
    sponsor: "",
    overallHealth: "Green" as "Green" | "Amber" | "Red",
    aiHealthCommentary: ""
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (activeProject && activeProject.intake) {
      setFormData({
        name: activeProject.name || "",
        code: activeProject.code || "",
        type: activeProject.intake.type || "",
        department: activeProject.intake.department || "",
        businessUnit: activeProject.intake.businessUnit || "",
        priority: activeProject.intake.priority || "Strategic",
        estimatedBudget: activeProject.intake.estimatedBudget || 0,
        plannedStartDate: activeProject.intake.plannedStartDate || "",
        plannedEndDate: activeProject.intake.plannedEndDate || "",
        problemStatement: activeProject.intake.problemStatement || "",
        executiveSummary: activeProject.intake.executiveSummary || "",
        strategicObjective: activeProject.intake.strategicObjective || "",
        expectedRoiPercent: activeProject.intake.expectedRoiPercent || 0,
        primaryObjective: activeProject.intake.primaryObjective || "",
        inScope: Array.isArray(activeProject.intake.inScope)
          ? activeProject.intake.inScope.join("\n")
          : activeProject.intake.inScope || "",
        outOfScope: Array.isArray(activeProject.intake.outOfScope)
          ? activeProject.intake.outOfScope.join("\n")
          : activeProject.intake.outOfScope || "",
        sponsor: activeProject.intake.sponsor || "",
        overallHealth: activeProject.health?.overallHealth || "Green",
        aiHealthCommentary: activeProject.health?.aiHealthCommentary || ""
      });
    }
  }, [activeProject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setIsSaved(false);
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project Name is required.";
    if (!formData.code.trim()) newErrors.code = "Project Code is required.";
    if (!formData.estimatedBudget || Number(formData.estimatedBudget) <= 0) {
      newErrors.estimatedBudget = "Budget must be greater than $0.";
    }
    if (formData.plannedStartDate && formData.plannedEndDate) {
      if (new Date(formData.plannedEndDate) <= new Date(formData.plannedStartDate)) {
        newErrors.plannedEndDate = "End date must be after start date.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    updateActiveProject((prev) => {
      return {
        ...prev,
        name: formData.name,
        code: formData.code,
        lastUpdated: new Date().toISOString().split("T")[0],
        intake: {
          ...prev.intake,
          code: formData.code,
          type: formData.type,
          department: formData.department,
          businessUnit: formData.businessUnit,
          priority: formData.priority,
          estimatedBudget: Number(formData.estimatedBudget),
          plannedStartDate: formData.plannedStartDate,
          plannedEndDate: formData.plannedEndDate,
          problemStatement: formData.problemStatement,
          executiveSummary: formData.executiveSummary,
          strategicObjective: formData.strategicObjective,
          expectedRoiPercent: Number(formData.expectedRoiPercent),
          primaryObjective: formData.primaryObjective,
          inScope: formData.inScope.split("\n").filter(Boolean),
          outOfScope: formData.outOfScope.split("\n").filter(Boolean),
          sponsor: formData.sponsor
        },
        health: {
          ...prev.health,
          overallHealth: formData.overallHealth,
          aiHealthCommentary: formData.aiHealthCommentary
        }
      };
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Settings & Modifications
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-indigo-400" />
            Edit Project Details ({activeProject?.code})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update project metadata, scope boundaries, budget allocations, and health commentary in SQLite.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved to SQLite DB
          </div>
        )}
      </div>

      {/* Main Edit Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Identity & General */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" /> Core Project Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm text-slate-900 outline-none ${
                    errors.name ? "border-rose-500" : "border-slate-300 focus:border-indigo-500"
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Project Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm font-mono text-slate-900 outline-none ${
                    errors.code ? "border-rose-500" : "border-slate-300 focus:border-indigo-500"
                  }`}
                />
                {errors.code && <p className="text-xs text-rose-500 mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Priority Level
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                >
                  <option value="Strategic">Strategic</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Budget & Timeline */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Budget & Timeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Estimated Budget ($) *
                </label>
                <input
                  type="number"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm font-mono text-slate-900 outline-none ${
                    errors.estimatedBudget ? "border-rose-500" : "border-slate-300 focus:border-indigo-500"
                  }`}
                />
                {errors.estimatedBudget && <p className="text-xs text-rose-500 mt-1">{errors.estimatedBudget}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Planned Start Date
                </label>
                <input
                  type="date"
                  name="plannedStartDate"
                  value={formData.plannedStartDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target End Date
                </label>
                <input
                  type="date"
                  name="plannedEndDate"
                  value={formData.plannedEndDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                />
                {errors.plannedEndDate && <p className="text-xs text-rose-500 mt-1">{errors.plannedEndDate}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Executive Summary & Health */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" /> Executive Summary & Health Commentary
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Executive Summary
                </label>
                <textarea
                  rows={3}
                  name="executiveSummary"
                  value={formData.executiveSummary}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Overall Project Health
                  </label>
                  <select
                    name="overallHealth"
                    value={formData.overallHealth}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                  >
                    <option value="Green">Green (On Track)</option>
                    <option value="Amber">Amber (At Risk)</option>
                    <option value="Red">Red (Critical Delay)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    PMO Health Commentary
                  </label>
                  <input
                    type="text"
                    name="aiHealthCommentary"
                    value={formData.aiHealthCommentary}
                    onChange={handleChange}
                    placeholder="Brief health commentary..."
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-bold rounded-lg shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Changes to SQLite DB
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
