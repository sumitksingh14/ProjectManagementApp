import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  Target,
  ShieldCheck,
  DollarSign,
  AlertCircle,
  Calendar,
  Briefcase,
  Users,
  Layers
} from "lucide-react";

interface ValidationErrors {
  [key: string]: string;
}

export const ProjectOnboardingView: React.FC = () => {
  const { createProjectFromIntake, setActiveTab, generateAiProjectPlan, setActiveProjectById } = useProject();
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
    projectType: "Cloud Microservices Modernization",
    department: "Digital Engineering",
    businessUnit: "Retail Banking",
    customer: "Global Enterprise Clients",
    sponsor: "Sarah Jenkins",
    priority: "Strategic" as "Strategic" | "High" | "Medium" | "Low",
    strategicObjective: "Modernize legacy architecture and reduce operational cost.",
    estimatedBudget: 1500000,
    plannedStartDate: new Date().toISOString().split("T")[0],
    plannedEndDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],

    // Business Case
    problemStatement: "Legacy monolithic application restricts rapid feature deployment and causes outage risk during high traffic peaks.",
    executiveSummary: "A modern cloud-native architecture featuring React micro-frontends, containerized microservices, and AI assistant.",
    expectedBenefits: "40% faster transaction speeds\n$2.5M operational cost reduction\nPCI-DSS compliance",
    strategicAlignment: "Directly advances Corporate Strategic Focus #1 for 2026.",
    expectedRoiPercent: 30,

    // Objectives & Scope
    primaryObjective: "Deploy new cloud microservice platform supporting 2M active users under 1s latency.",
    secondaryObjectives: "Automate CI/CD pipelines\nAchieve 99.99% system availability",
    inScope: "Native web & mobile portal\nOAuth2 authentication\nReal-time push events engine",
    outOfScope: "Legacy ATM firmware updates\nInternal HR portal",
    assumptions: "AWS cloud accounts provisioned by Sprint 2\nCore API endpoints available",
    constraints: "Hard compliance launch deadline prior to Q4 peak",
    dependencies: "Enterprise IAM Azure AD federation setup",

    // Key Roles
    projectManager: "David Chen",
    leadArchitect: "Aisha Patel",
    businessOwner: "Rachel Green"
  });

  const validateStep = (currentStep: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (currentStep === 1) {
      if (!formData.projectName.trim()) {
        newErrors.projectName = "Project Name is required.";
      }
      if (!formData.projectCode.trim()) {
        newErrors.projectCode = "Project Code is required.";
      }
      if (!formData.plannedStartDate) {
        newErrors.plannedStartDate = "Start date is required.";
      }
      if (!formData.plannedEndDate) {
        newErrors.plannedEndDate = "End date is required.";
      } else if (new Date(formData.plannedEndDate) <= new Date(formData.plannedStartDate)) {
        newErrors.plannedEndDate = "End date must be after start date.";
      }
    }

    if (currentStep === 2) {
      if (!formData.problemStatement.trim()) {
        newErrors.problemStatement = "Problem Statement is required.";
      }
      if (!formData.executiveSummary.trim()) {
        newErrors.executiveSummary = "Executive Summary is required.";
      }
      if (!formData.estimatedBudget || Number(formData.estimatedBudget) <= 0) {
        newErrors.estimatedBudget = "Estimated budget must be greater than $0.";
      }
    }

    if (currentStep === 3) {
      if (!formData.primaryObjective.trim()) {
        newErrors.primaryObjective = "Primary Objective is required.";
      }
      if (!formData.inScope.trim()) {
        newErrors.inScope = "In-Scope deliverables are required.";
      }
    }

    if (currentStep === 4) {
      if (!formData.sponsor.trim()) {
        newErrors.sponsor = "Executive Sponsor is required.";
      }
      if (!formData.projectManager.trim()) {
        newErrors.projectManager = "Project Manager is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    try {
      const newPrj = createProjectFromIntake({
        ...formData,
        estimatedBudget: Number(formData.estimatedBudget),
        expectedRoiPercent: Number(formData.expectedRoiPercent)
      });

      setActiveProjectById(newPrj.id);
      sessionStorage.setItem("projectplanner_active_id", newPrj.id);

      // Trigger AI plan generation for the newly onboarded project
      await generateAiProjectPlan({
        projectName: newPrj.name,
        projectType: newPrj.intake.type,
        department: newPrj.intake.department,
        description: newPrj.intake.executiveSummary,
        estimatedBudget: newPrj.intake.estimatedBudget,
        durationMonths: 6
      });

      setIsSubmitting(false);
      setActiveTab("dashboard");
    } catch (err) {
      console.error("Failed to onboard project:", err);
      setIsSubmitting(false);
    }
  };

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
              Module 1
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Step {step} of 5 • Onboarding Wizard</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            New Project Onboarding Wizard
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Capture project charter, scope bounds, financial baseline, and team governance into the SQLite database.
          </p>
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="glass-card rounded-2xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Core Project Identity */}
          {step === 1 && (
            <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
              <div className="border-b border-[var(--border)] pb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">Step 1: Core Project Identity</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="e.g. Next-Gen Payment Gateway Modernization"
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.projectName ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.projectName && <p className="text-xs text-rose-500 mt-1">{errors.projectName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Project Code *
                  </label>
                  <input
                    type="text"
                    name="projectCode"
                    value={formData.projectCode}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.projectCode ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.projectCode && <p className="text-xs text-rose-500 mt-1">{errors.projectCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  >
                    <option value="Mobile Software Engineering">Mobile Software Engineering</option>
                    <option value="Cloud Microservices Modernization">Cloud Microservices Modernization</option>
                    <option value="AI & Machine Learning Engine">AI & Machine Learning Engine</option>
                    <option value="ERP & Enterprise Integration">ERP & Enterprise Integration</option>
                    <option value="Cybersecurity & Zero Trust">Cybersecurity & Zero Trust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  >
                    <option value="Strategic">Strategic (Must-do corporate goal)</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Business Unit
                  </label>
                  <input
                    type="text"
                    name="businessUnit"
                    value={formData.businessUnit}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Planned Start Date *
                  </label>
                  <input
                    type="date"
                    name="plannedStartDate"
                    value={formData.plannedStartDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                  {errors.plannedStartDate && <p className="text-xs text-rose-500 mt-1">{errors.plannedStartDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Planned Target End Date *
                  </label>
                  <input
                    type="date"
                    name="plannedEndDate"
                    value={formData.plannedEndDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                  {errors.plannedEndDate && <p className="text-xs text-rose-500 mt-1">{errors.plannedEndDate}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Business Case & Financials */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-[var(--border)] pb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[var(--green)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">Step 2: Business Case & Financial Baseline</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Problem Statement *
                  </label>
                  <textarea
                    rows={2}
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    placeholder="Describe the operational pain point or market opportunity..."
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.problemStatement ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.problemStatement && <p className="text-xs text-rose-500 mt-1">{errors.problemStatement}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Executive Summary & Solution Scope *
                  </label>
                  <textarea
                    rows={3}
                    name="executiveSummary"
                    value={formData.executiveSummary}
                    onChange={handleChange}
                    placeholder="High-level solution architecture and core deliverable summary..."
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.executiveSummary ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.executiveSummary && <p className="text-xs text-rose-500 mt-1">{errors.executiveSummary}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Estimated Total Budget ($) *
                  </label>
                  <input
                    type="number"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.estimatedBudget ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.estimatedBudget && <p className="text-xs text-rose-500 mt-1">{errors.estimatedBudget}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Expected ROI (%)
                  </label>
                  <input
                    type="number"
                    name="expectedRoiPercent"
                    value={formData.expectedRoiPercent}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm font-mono text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Strategic Alignment Notes
                  </label>
                  <input
                    type="text"
                    name="strategicAlignment"
                    value={formData.strategicAlignment}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Scope Bounds & Objectives */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-[var(--border)] pb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">Step 3: Scope Bounds & Project Objectives</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Primary Success Objective *
                  </label>
                  <input
                    type="text"
                    name="primaryObjective"
                    value={formData.primaryObjective}
                    onChange={handleChange}
                    placeholder="Clear quantitative objective statement..."
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.primaryObjective ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.primaryObjective && <p className="text-xs text-rose-500 mt-1">{errors.primaryObjective}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--green)] uppercase tracking-wider mb-1">
                      In-Scope Deliverables (1 per line) *
                    </label>
                    <textarea
                      rows={4}
                      name="inScope"
                      value={formData.inScope}
                      onChange={handleChange}
                      placeholder="Native mobile iOS and Android app&#10;OAuth2 login service"
                      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.inScope ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                        }`}
                    />
                    {errors.inScope && <p className="text-xs text-rose-500 mt-1">{errors.inScope}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-rose-700 uppercase tracking-wider mb-1">
                      Out-of-Scope Items (1 per line)
                    </label>
                    <textarea
                      rows={4}
                      name="outOfScope"
                      value={formData.outOfScope}
                      onChange={handleChange}
                      placeholder="Hardware ATM upgrades&#10;Internal HR portal"
                      className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                      Key Assumptions
                    </label>
                    <input
                      type="text"
                      name="assumptions"
                      value={formData.assumptions}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                      Project Constraints & Regulatory Mandates
                    </label>
                    <input
                      type="text"
                      name="constraints"
                      value={formData.constraints}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Stakeholders & Team Setup */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-[var(--border)] pb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">Step 4: Stakeholders & Governance Team</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Executive Sponsor *
                  </label>
                  <input
                    type="text"
                    name="sponsor"
                    value={formData.sponsor}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.sponsor ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.sponsor && <p className="text-xs text-rose-500 mt-1">{errors.sponsor}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Project Manager Lead *
                  </label>
                  <input
                    type="text"
                    name="projectManager"
                    value={formData.projectManager}
                    onChange={handleChange}
                    placeholder="e.g. David Chen"
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-colors ${errors.projectManager ? "border-rose-500 focus:ring-rose-500" : "border-[var(--border)] focus:border-indigo-500 focus:ring-indigo-500"
                      }`}
                  />
                  {errors.projectManager && <p className="text-xs text-rose-500 mt-1">{errors.projectManager}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Technical Lead Architect
                  </label>
                  <input
                    type="text"
                    name="leadArchitect"
                    value={formData.leadArchitect}
                    onChange={handleChange}
                    placeholder="e.g. Aisha Patel"
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    Business Owner
                  </label>
                  <input
                    type="text"
                    name="businessOwner"
                    value={formData.businessOwner}
                    onChange={handleChange}
                    placeholder="e.g. Rachel Green"
                    className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Submit */}
          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-[var(--border)] pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                  <h2 className="text-base font-bold text-[var(--text-primary)]">Step 5: Review & Confirm Onboarding</h2>
                </div>
                <span className="text-xs font-bold text-[var(--green)] bg-[var(--green-dim)] border border-emerald-200 px-2.5 py-1 rounded-md">
                  Validation Passed
                </span>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 text-sm" style={{ gap: "25px" }}>
                <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-xl space-y-6">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[var(--accent)]" /> Project Identity
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[var(--text-secondary)]">
                    <div>Name: <span className="font-semibold text-[var(--text-primary)]">{formData.projectName}</span></div>
                    <div>Code: <span className="font-mono font-semibold text-[var(--text-primary)]">{formData.projectCode}</span></div>
                    <div>Department: <span className="font-semibold text-[var(--text-primary)]">{formData.department}</span></div>
                    <div>Priority: <span className="font-semibold text-[var(--accent)]">{formData.priority}</span></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-xl space-y-6">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[var(--green)]" /> Financials & Schedule
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[var(--text-secondary)]">
                    <div>Budget: <span className="font-mono font-bold text-[var(--green)]">${Number(formData.estimatedBudget).toLocaleString()}</span></div>
                    <div>ROI: <span className="font-bold text-[var(--text-primary)]">{formData.expectedRoiPercent}%</span></div>
                    <div>Start: <span className="font-semibold text-[var(--text-primary)]">{formData.plannedStartDate}</span></div>
                    <div>Target End: <span className="font-semibold text-[var(--text-primary)]">{formData.plannedEndDate}</span></div>
                  </div>
                </div>

                <div className="bg-[var(--bg-card)] border border-[var(--border)] p-4 rounded-xl space-y-6 md:col-span-2">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[var(--accent)]" /> Primary Executive Summary
                  </h4>
                  <p className="text-[var(--text-primary)] leading-relaxed">{formData.executiveSummary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-[var(--bg-card-hover)] hover:bg-slate-200 text-[var(--text-primary)] text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Continue to Step {step + 1} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold rounded-lg shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Save Project & Launch Dashboard</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
