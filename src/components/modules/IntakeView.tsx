import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { FileText, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Building2, Target, ShieldCheck, DollarSign } from "lucide-react";

export const IntakeView: React.FC = () => {
  const { createProjectFromIntake, setActiveTab, generateAiProjectPlan } = useProject();
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
    projectType: "Mobile Banking Transformation",
    department: "Digital Banking BU",
    businessUnit: "Retail Operations",
    customer: "Global Retail Banking",
    sponsor: "Sarah Jenkins",
    priority: "Strategic",
    strategicObjective: "Increase digital engagement and automate branch workflows.",
    estimatedBudget: 1200000,
    plannedStartDate: "2026-08-01",
    plannedEndDate: "2027-04-30",

    // Business Case
    problemStatement: "Legacy monolithic application restricts rapid feature deployment and causes outage risk during high traffic peaks.",
    executiveSummary: "A modern cloud-native architecture with mobile biometrics, real-time push payments, and AI customer support.",
    expectedBenefits: "40% faster transaction speeds\n$2.5M operational cost reduction\nPCI-DSS compliance",
    strategicAlignment: "Directly advances Corporate Strategic Focus #1 for 2026.",
    expectedRoiPercent: 28,

    // Objectives
    primaryObjective: "Deploy new mobile platform supporting 2M active users under 1s latency.",
    inScope: "Mobile iOS and Android app\nBiometric WebAuthn service\nReal-time notification socket engine",
    outOfScope: "Branch ATM hardware replacements\nCorporate loan portal",
    assumptions: "AWS cloud accounts provisioned by Sprint 2\nCore API endpoints available",
    constraints: "Hard deadline prior to holiday shopping season",
    dependencies: "Enterprise IAM Azure AD federation setup"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPrj = createProjectFromIntake(formData);
    // Trigger AI WBS plan generation in background
    await generateAiProjectPlan({
      projectName: newPrj.name,
      projectType: newPrj.intake.type,
      department: newPrj.intake.department,
      description: newPrj.intake.executiveSummary,
      estimatedBudget: newPrj.intake.estimatedBudget,
      durationMonths: 8
    });
    setActiveTab("ai-planner");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              Module 1
            </span>
            <span className="text-xs text-slate-500">Enterprise PMO Intake Framework</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Project Intake Wizard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Capture strategic requirements, business case, KPIs, and scope boundaries for PMO review & AI plan generation.
          </p>
        </div>
        <FileText className="w-9 h-9 text-indigo-600" />
      </div>

      {/* Wizard Steps Navigation */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { num: 1, label: "General Information", icon: Building2 },
          { num: 2, label: "Business Case & Benefits", icon: DollarSign },
          { num: 3, label: "Objectives & KPIs", icon: Target },
          { num: 4, label: "Scope & Boundaries", icon: ShieldCheck }
        ].map((s) => {
          const Icon = s.icon;
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                isActive
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                  : isDone
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  isActive ? "bg-white text-indigo-600" : "bg-slate-100 text-slate-600"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : s.num}
              </div>
              <div className="hidden sm:block truncate">
                <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Step {s.num}</p>
                <p className="text-xs font-bold truncate">{s.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">1. General Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Project Name *</label>
                <input
                  type="text"
                  name="projectName"
                  required
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g. NextGen Cloud Core Banking"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Project Code *</label>
                <input
                  type="text"
                  name="projectCode"
                  required
                  value={formData.projectCode}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Mobile Banking Transformation</option>
                  <option>Cloud Infrastructure Migration</option>
                  <option>AI Customer Service Automation</option>
                  <option>Enterprise ERP S/4HANA</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Department / Business Unit</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Executive Sponsor</label>
                <input
                  type="text"
                  name="sponsor"
                  value={formData.sponsor}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Priority Level</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option>Strategic</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Estimated Budget ($)</label>
                <input
                  type="number"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Planned Target Launch Date</label>
                <input
                  type="date"
                  name="plannedEndDate"
                  value={formData.plannedEndDate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">2. Business Case & ROI Alignment</h3>
            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Problem Statement</label>
              <textarea
                name="problemStatement"
                rows={3}
                value={formData.problemStatement}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Executive Summary & Solution</label>
              <textarea
                name="executiveSummary"
                rows={3}
                value={formData.executiveSummary}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Expected Business Benefits (One per line)</label>
                <textarea
                  name="expectedBenefits"
                  rows={3}
                  value={formData.expectedBenefits}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Expected ROI (%)</label>
                <input
                  type="number"
                  name="expectedRoiPercent"
                  value={formData.expectedRoiPercent}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">3. Primary Objectives & KPIs</h3>
            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Primary Strategic Objective</label>
              <textarea
                name="primaryObjective"
                rows={3}
                value={formData.primaryObjective}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Strategic Objective Alignment</label>
              <input
                type="text"
                name="strategicObjective"
                value={formData.strategicObjective}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">4. Scope Boundaries & Assumptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">In Scope Items (One per line)</label>
                <textarea
                  name="inScope"
                  rows={4}
                  value={formData.inScope}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Out Of Scope Items (One per line)</label>
                <textarea
                  name="outOfScope"
                  rows={4}
                  value={formData.outOfScope}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Assumptions</label>
                <textarea
                  name="assumptions"
                  rows={3}
                  value={formData.assumptions}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Dependencies</label>
                <textarea
                  name="dependencies"
                  rows={3}
                  value={formData.dependencies}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-semibold px-4 py-2 rounded-md border border-slate-200 shadow-sm flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 rounded-md shadow-sm flex items-center gap-2 transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2 rounded-md shadow-sm flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Submit Intake & Generate AI Plan</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
