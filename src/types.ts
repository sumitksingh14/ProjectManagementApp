export type UserRole =
  | "Executive Sponsor"
  | "PMO Admin"
  | "Portfolio Manager"
  | "Program Manager"
  | "Project Manager"
  | "Team Member"
  | "Stakeholder";

export type HealthStatus = "Green" | "Amber" | "Red";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  costRate: number; // Hourly cost
  availabilityPercent: number;
  skills: string[];
  password?: string; // Used for local auth (not stored in DB in plaintext in production)
}


export interface Portfolio {
  id: string;
  name: string;
  code: string;
  description: string;
  sponsor: string;
  budgetAllocated: number;
  budgetSpent: number;
  expectedRoiPercent: number;
  programs: string[]; // Program IDs
  health: HealthStatus;
  // Extended for portfolio management
  strategicThemes?: string[];
  prioritizationCriteria?: { name: string; weight: number }[];
  totalBudget?: number;
  owner?: string;
  strategicAlignmentScore?: number;
  projects?: Project[];
}

export interface Program {
  id: string;
  portfolioId: string;
  name: string;
  code: string;
  manager: string;
  description: string;
  targetCompletion: string;
  projectIds: string[];
  health: HealthStatus;
  // Extended for program management
  strategicObjective?: string;
  expectedBenefits?: string[];
  totalBudget?: number;
  totalActualCost?: number;
  strategicAlignmentScore?: number;
  steeringCommittee?: string[];
  programRisks?: ProgramRisk[];
  dependencies?: ProgramDependency[];
  benefitsRealized?: number; // percentage 0-100
}

// --- NEW: Program-level risk ---
export interface ProgramRisk {
  id: string;
  description: string;
  category: string;
  probability: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  affectedProjectIds: string[];
  mitigation: string;
  status: "Open" | "Mitigated" | "Closed";
}

// --- NEW: Cross-project dependency ---
export interface ProgramDependency {
  id: string;
  sourceProjectId: string;
  targetProjectId: string;
  type: "Finish-to-Start" | "Start-to-Start" | "Finish-to-Finish" | "Start-to-Finish";
  description: string;
  impactLevel: "Critical" | "High" | "Medium" | "Low";
  status: "Active" | "Resolved" | "At Risk";
  dueDate?: string;
}

// --- NEW: Benefits Realization ---
export interface Benefit {
  id: string;
  title: string;
  category: "Financial" | "Operational" | "Strategic" | "Customer" | "Compliance" | "Risk Reduction";
  description: string;
  owner: string;
  targetValue: string;
  targetDate: string;
  actualValue?: string;
  actualDate?: string;
  realizationStatus: "Not Started" | "In Progress" | "Partially Realized" | "Fully Realized" | "Not Achieved";
  measurementMethod: string;
  notes?: string;
}

// --- NEW: Lessons Learned ---
export interface LessonsLearned {
  id: string;
  phase: string;
  category: "Technical" | "Process" | "People" | "Risk" | "Communication" | "Governance" | "Vendor";
  title: string;
  description: string;
  recommendation: string;
  impact: "High" | "Medium" | "Low";
  capturedBy: string;
  capturedDate: string;
  status: "Captured" | "Reviewed" | "Published" | "Applied";
}

// --- NEW: Project Deliverable (for closure) ---
export interface ProjectDeliverable {
  id: string;
  title: string;
  description: string;
  phase: string;
  dueDate: string;
  owner: string;
  acceptanceCriteria: string[];
  status: "Not Started" | "In Progress" | "Submitted" | "Accepted" | "Rejected";
  signedOffBy?: string;
  signOffDate?: string;
  notes?: string;
}

// --- NEW: Vendor Management ---
export interface VendorItem {
  id: string;
  vendorCode: string;
  vendorName: string;
  category: "Software" | "Hardware" | "Consulting" | "Cloud Services" | "Staffing" | "Other";
  contractType: "Fixed Price" | "Time & Materials" | "Retainer" | "SLA-Based";
  contractValue: number;
  startDate: string;
  endDate: string;
  accountManager: string;
  deliverables: VendorDeliverable[];
  slaTerms: string;
  performanceScore: number; // 1-100
  status: "Active" | "On Hold" | "Completed" | "Terminated";
  paymentTerms: string;
  notes?: string;
}

export interface VendorDeliverable {
  id: string;
  title: string;
  dueDate: string;
  status: "Pending" | "Delivered" | "Accepted" | "Overdue";
  amount: number;
}

// --- NEW: Decision Log (for Governance) ---
export interface DecisionLog {
  id: string;
  decisionDate: string;
  title: string;
  description: string;
  decisionMaker: string;
  participants: string[];
  rationale: string;
  impact: string;
  status: "Pending" | "Approved" | "Rejected" | "Deferred";
  reviewDate?: string;
}

// --- NEW: Action Item (for Communications) ---
export interface ActionItem {
  id: string;
  description: string;
  owner: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Completed" | "Cancelled";
  sourceType: "Meeting" | "Risk" | "Issue" | "Change Request" | "Steering Committee";
  sourceRef?: string;
  createdDate: string;
  completedDate?: string;
}

// --- NEW: Meeting Minutes ---
export interface MeetingMinutes {
  id: string;
  meetingType: "Steering Committee" | "Project Status" | "Risk Review" | "CCB" | "Retrospective" | "Stakeholder";
  title: string;
  date: string;
  attendees: string[];
  agenda: string[];
  keyDecisions: string[];
  actionItems: string[];
  nextMeetingDate?: string;
  facilitator: string;
}

// Module 1: Intake & General Info
export interface ProjectIntake {
  code: string;
  type: string;
  department: string;
  businessUnit: string;
  customer?: string;
  sponsor: string;
  programId?: string;
  portfolioId?: string;
  priority: "Strategic" | "High" | "Medium" | "Low";
  strategicObjective: string;
  estimatedBudget: number;
  plannedStartDate: string;
  plannedEndDate: string;
  // Business Case
  problemStatement: string;
  executiveSummary: string;
  expectedBenefits: string[];
  strategicAlignment: string;
  expectedRoiPercent: number;
  businessDrivers: string[];
  // Objectives
  primaryObjective: string;
  secondaryObjectives: string[];
  successMeasures: string[];
  kpiTargets: { metric: string; target: string }[];
  // Scope Management
  inScope: string[];
  outOfScope: string[];
  assumptions: string[];
  constraints: string[];
  dependencies: string[];
}

// Module 2: Stakeholder Management
export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department: string;
  position: string;
  influence: "High" | "Medium" | "Low";
  interest: "High" | "Medium" | "Low";
  communicationPreference: "Weekly Steering" | "Bi-Weekly Email" | "Ad-hoc Dashboard" | "Slack/Teams";
  engagementStrategy: string;
  escalationRole: string;
}

// Module 3: Requirements Management
export interface Requirement {
  id: string;
  code: string;
  title: string;
  description: string;
  type: "Functional" | "Non-Functional";
  category?: "Security" | "Performance" | "Scalability" | "Reliability" | "Availability" | "Compliance" | "Accessibility";
  priority: "Must Have" | "Should Have" | "Could Have" | "Won't Have";
  complexity: "High" | "Medium" | "Low";
  businessValue: number; // 1 - 10
  acceptanceCriteria: string[];
  status: "Draft" | "Approved" | "In Development" | "Verified" | "Deferred";
  wbsTaskId?: string;
}

// Module 4 & 5: WBS, Schedule & Task Engine
export type TaskStatus = "Not Started" | "In Progress" | "Completed" | "Blocked";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
}

export interface WBSTask {
  id: string;
  wbsCode: string; // e.g. 1.2.1
  title: string;
  phaseId: string;
  workPackageId: string;
  assignedTo?: string;
  assignedRole: string;
  effortDays: number;
  durationDays: number;
  progressPercent: number;
  startDate: string;
  endDate: string;
  dependencies: string[]; // Task IDs
  isCriticalPath: boolean;
  isMilestone: boolean;
  deliverableName?: string;
  status: TaskStatus;
  subtasks: Subtask[];
  baselineStartDate?: string;
  baselineEndDate?: string;
  actualCost?: number;
}

export interface WorkPackage {
  id: string;
  wbsCode: string;
  name: string;
  phaseId: string;
  owner: string;
  tasks: WBSTask[];
}

export interface LifecyclePhase {
  id: string;
  wbsCode: string;
  name: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  workPackages: WorkPackage[];
}

// Module 6: Resource Management
export interface ResourceAllocation {
  id: string;
  userId: string;
  userName: string;
  role: string;
  allocatedHoursPerWeek: number;
  costRate: number;
  month: string; // YYYY-MM
  utilizationPercent: number;
}

// Module 7: Estimation Engine
export interface PERTEstimate {
  taskId: string;
  taskTitle: string;
  optimisticDays: number;
  mostLikelyDays: number;
  pessimisticDays: number;
  pertDays: number; // (O + 4M + P) / 6
  variance: number;
}

// Module 8 & 9: Budget, Costs & EVM
export type CostCategory =
  | "Labor"
  | "Cloud Costs"
  | "Infrastructure"
  | "Licenses"
  | "Vendors"
  | "Training"
  | "Travel"
  | "Operations"
  | "Contingency";

export interface CostLineItem {
  id: string;
  category: CostCategory;
  description: string;
  plannedAmount: number;
  forecastAmount: number;
  actualAmount: number;
}

export interface EVMMetrics {
  BAC: number; // Budget at Completion
  PV: number;  // Planned Value
  EV: number;  // Earned Value
  AC: number;  // Actual Cost
  CV: number;  // Cost Variance (EV - AC)
  SV: number;  // Schedule Variance (EV - PV)
  CPI: number; // Cost Performance Index (EV / AC)
  SPI: number; // Schedule Performance Index (EV / PV)
  EAC: number; // Estimate at Completion (BAC / CPI)
  ETC: number; // Estimate to Complete (EAC - AC)
  VAC: number; // Variance at Completion (BAC - EAC)
}

// Module 10: Risk Management
export interface RiskItem {
  id: string;
  riskCode: string;
  category: "Technical" | "Schedule" | "Financial" | "Resource" | "Vendor" | "Governance" | "Scope";
  description: string;
  rootCause: string;
  trigger: string;
  probability: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  severityScore: number; // 1 to 25
  owner: string;
  mitigation: string;
  contingency: string;
  dueDate: string;
  status: "Open" | "Mitigated" | "Closed" | "Realized into Issue";
}

// Module 11: Issue Management
export interface IssueItem {
  id: string;
  issueCode: string;
  description: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  severity: "Blocker" | "Major" | "Minor";
  owner: string;
  reportedDate: string;
  dueDate: string;
  status: "Open" | "In Investigation" | "Escalated" | "Resolved";
  resolution?: string;
  daysOpen: number;
}

// Module 12: Quality Management
export interface QualityGate {
  id: string;
  phaseName: string;
  gateName: string;
  criteria: string[];
  passed: boolean;
  reviewer: string;
  signoffDate?: string;
}

export interface QualityMetrics {
  defectsCount: number;
  defectLeakagePercent: number;
  testCoveragePercent: number;
  passRatePercent: number;
  reworkPercent: number;
  qualityGates: QualityGate[];
}

// Module 13: Change Management
export interface ChangeRequest {
  id: string;
  crNumber: string;
  title: string;
  requestedBy: string;
  requestDate: string;
  description: string;
  justification: string;
  impactScheduleDays: number;
  impactCostAmount: number;
  impactScopeDescription: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected" | "Implemented";
  approver?: string;
  approvalDate?: string;
}

// Module 14: Communication Management
export interface CommItem {
  id: string;
  audience: string;
  frequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Milestone Based";
  format: "Dashboard Presentation" | "Steering Deck" | "Email Newsletter" | "Executive Summary Document";
  owner: string;
  nextScheduledDate: string;
}

// Module 15: Governance Framework
export interface RACIRow {
  activity: string;
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
}

export interface GovernancePlan {
  steeringCommitteeMembers: string[];
  changeControlBoardMembers: string[];
  escalationLevel1: string;
  escalationLevel2: string;
  escalationLevel3: string;
  raciMatrix: RACIRow[];
  // Extended governance fields
  decisionLog?: DecisionLog[];
  meetingCadence?: string;
  nextSteeringDate?: string;
}

// Module 16: KPI & Performance Management
export interface HealthChecks {
  scheduleHealth: HealthStatus;
  budgetHealth: HealthStatus;
  scopeHealth: HealthStatus;
  qualityHealth: HealthStatus;
  riskHealth: HealthStatus;
  resourceHealth: HealthStatus;
  overallHealth: HealthStatus;
  aiHealthCommentary: string;
}

// Project Closure Status
export interface ClosureStatus {
  phase: "Not Started" | "In Progress" | "Pending Sign-off" | "Closed";
  deliverablesAccepted: boolean;
  lessonsLearnedCaptured: boolean;
  resourcesReleased: boolean;
  documentationArchived: boolean;
  finalReportSubmitted: boolean;
  closureDate?: string;
  closedBy?: string;
}

// Main Project Entity
export interface Project {
  id: string;
  name: string;
  code: string;
  intake: ProjectIntake;
  stakeholders: Stakeholder[];
  requirements: Requirement[];
  lifecyclePhases: LifecyclePhase[];
  costLineItems: CostLineItem[];
  evm: EVMMetrics;
  risks: RiskItem[];
  issues: IssueItem[];
  quality: QualityMetrics;
  changeRequests: ChangeRequest[];
  communicationPlan: CommItem[];
  governance: GovernancePlan[];
  health: HealthChecks;
  lastUpdated: string;
  // Extended for full PM suite
  benefits?: Benefit[];
  vendors?: VendorItem[];
  deliverables?: ProjectDeliverable[];
  lessonsLearned?: LessonsLearned[];
  actionItems?: ActionItem[];
  meetingMinutes?: MeetingMinutes[];
  closureStatus?: ClosureStatus;
}

// Copilot Chat Message
export interface CopilotMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  actionType?: "PLAN_GENERATED" | "RISKS_GENERATED" | "INFO_SUMMARY";
}
