import { Portfolio, Program, Project, User } from "../types";

export const seedUsers: User[] = [
  {
    id: "usr-1",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@enterprise.com",
    role: "Executive Sponsor",
    department: "Executive Committee",
    costRate: 220,
    availabilityPercent: 100,
    skills: ["Strategic Governance", "Portfolio Investment", "Risk Oversight"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    password: "Exec@2026"
  },
  {
    id: "usr-2",
    name: "Marcus Vance",
    email: "marcus.vance@enterprise.com",
    role: "PMO Admin",
    department: "Enterprise PMO",
    costRate: 160,
    availabilityPercent: 100,
    skills: ["PMO Governance", "Methodology Standard", "Portfolio Reporting"],
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    password: "PMO@2026"
  },
  {
    id: "usr-3",
    name: "Elena Rostova",
    email: "elena.rostova@enterprise.com",
    role: "Portfolio Manager",
    department: "Digital Transformation",
    costRate: 180,
    availabilityPercent: 100,
    skills: ["Resource Capacity", "Budget Balancing", "Program Roadmap"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    password: "Portfolio@2026"
  },
  {
    id: "usr-8",
    name: "Priya Sharma",
    email: "priya.sharma@enterprise.com",
    role: "Program Manager",
    department: "Digital Banking BU",
    costRate: 165,
    availabilityPercent: 100,
    skills: ["Program Governance", "Benefits Realization", "Dependency Management", "Stakeholder Alignment"],
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    password: "Program@2026"
  },
  {
    id: "usr-4",
    name: "David Chen",
    email: "david.chen@enterprise.com",
    role: "Project Manager",
    department: "IT Engineering",
    costRate: 140,
    availabilityPercent: 100,
    skills: ["Agile/Scrum", "EVM Financials", "Risk Management", "FullCalendar"],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    password: "Project@2026"
  },
  {
    id: "usr-5",
    name: "Aisha Patel",
    email: "aisha.patel@enterprise.com",
    role: "Team Member",
    department: "Cloud Architecture",
    costRate: 130,
    availabilityPercent: 100,
    skills: ["Solution Architecture", "AWS/GCP", "Kubernetes", "Microservices"],
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    password: "Team@2026"
  },
  {
    id: "usr-6",
    name: "Liam O'Connor",
    email: "liam.oconnor@enterprise.com",
    role: "Team Member",
    department: "Software Engineering",
    costRate: 110,
    availabilityPercent: 100,
    skills: ["React 19", "TypeScript", "Node.js", "Express"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    password: "Team@2026"
  },
  {
    id: "usr-7",
    name: "Rachel Green",
    email: "rachel.green@enterprise.com",
    role: "Stakeholder",
    department: "Business Operations",
    costRate: 150,
    availabilityPercent: 80,
    skills: ["Change Management", "Business Analysis", "UAT Validation"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    password: "Stake@2026"
  }
];


export const seedPortfolios: Portfolio[] = [
  {
    id: "port-1",
    name: "Digital Financial Transformation 2026",
    code: "PORT-DFT-01",
    description: "Enterprise portfolio modernizing core banking, omnichannel digital applications, and real-time fraud AI.",
    sponsor: "Sarah Jenkins",
    budgetAllocated: 5000000,
    budgetSpent: 2150000,
    expectedRoiPercent: 28,
    programs: ["prog-1", "prog-2"],
    health: "Green"
  },
  {
    id: "port-2",
    name: "Cloud Infrastructure & ERP Modernization",
    code: "PORT-CIE-02",
    description: "Migration of legacy SAP environments and datacenters to cloud hybrid platforms with Zero-Trust security.",
    sponsor: "Marcus Vance",
    budgetAllocated: 7500000,
    budgetSpent: 3800000,
    expectedRoiPercent: 22,
    programs: ["prog-3"],
    health: "Amber"
  }
];

export const seedPrograms: Program[] = [
  {
    id: "prog-1",
    portfolioId: "port-1",
    name: "Next-Gen Mobile & Web Banking Program",
    code: "PROG-MBANK",
    manager: "Elena Rostova",
    description: "Delivering unified mobile banking app, biometric auth, instant cross-border payments, and AI financial manager.",
    targetCompletion: "2026-12-31",
    projectIds: ["prj-1"],
    health: "Green"
  },
  {
    id: "prog-2",
    portfolioId: "port-1",
    name: "AI & Predictive Analytics Core",
    code: "PROG-AI-ANALYTICS",
    manager: "Elena Rostova",
    description: "Real-time transaction fraud detection, AI customer copilot, and credit underwriting engines.",
    targetCompletion: "2027-03-31",
    projectIds: ["prj-2"],
    health: "Green"
  }
];

export const seedProjects: Project[] = [
  {
    id: "prj-1",
    name: "Global Mobile Banking Modernization",
    code: "PRJ-MBANK-2026",
    lastUpdated: "2026-07-27",
    intake: {
      code: "PRJ-MBANK-2026",
      type: "Mobile Software Engineering",
      department: "Digital Banking BU",
      businessUnit: "Retail Banking",
      customer: "Global Retail Customers (4.5M active users)",
      sponsor: "Sarah Jenkins",
      programId: "prog-1",
      portfolioId: "port-1",
      priority: "Strategic",
      strategicObjective: "Increase mobile user engagement by 40% and reduce branch operational overhead by $3.2M/yr.",
      estimatedBudget: 1500000,
      plannedStartDate: "2026-02-01",
      plannedEndDate: "2026-11-30",
      problemStatement: "Legacy banking mobile web wrapper app exhibits slow performance (6.2s load), high bug rate, and lacks biometrics.",
      executiveSummary: "A top-tier omnichannel mobile banking platform featuring native React/TypeScript architecture, instant biometrics, AI budgeting assistant, and microservices backend.",
      expectedBenefits: [
        "40% increase in monthly active users",
        "25% reduction in customer service call volume via self-service AI",
        "Compliance with open banking regulations & ISO 20022"
      ],
      strategicAlignment: "Directly aligns with corporate Strategic Goal #1: Customer Digital First & Operations Automation.",
      expectedRoiPercent: 32,
      businessDrivers: ["Market share protection", "Fintech competition response", "Operational efficiency"],
      primaryObjective: "Deliver native mobile banking app on iOS & Android with 99.99% uptime and <1.2s API response latency.",
      secondaryObjectives: [
        "Automate KYC & onboarding flow under 3 minutes",
        "Implement AI contextual spending insights engine"
      ],
      successMeasures: ["App Store rating > 4.7/5", "Zero P1 security vulnerabilities", "99.99% uptime"],
      kpiTargets: [
        { metric: "API Latency", target: "< 200ms" },
        { metric: "Customer Onboarding Time", target: "< 180s" },
        { metric: "Sprint Velocity", target: "42 story points/sprint" }
      ],
      inScope: [
        "Native mobile iOS/Android app frontend in React 19",
        "Secure OAuth2 + WebAuthn biometric login service",
        "Real-time pushing notifications & transaction stream",
        "AI Chatbot spending assistant integrated via Gemini"
      ],
      outOfScope: [
        "Commercial corporate loan underwriting portal (Phase 2)",
        "Atm hardware firmware updates"
      ],
      assumptions: [
        "Core banking REST APIs will support OAuth token delegation",
        "AWS Cloud infrastructure will be provisioned by Sprint 2"
      ],
      constraints: [
        "Must comply with GDPR and PCI-DSS Level 1 certification",
        "Hard launch deadline prior to Black Friday shopping peak"
      ],
      dependencies: [
        "Core Banking Microservice API Gateway v3.2 release",
        "Enterprise IAM Azure AD tenant federation setup"
      ]
    },
    stakeholders: [
      {
        id: "stk-1",
        name: "Sarah Jenkins",
        role: "Executive Sponsor",
        department: "Executive",
        position: "Chief Digital Officer",
        influence: "High",
        interest: "High",
        communicationPreference: "Weekly Steering",
        engagementStrategy: "Direct weekly status brief with EVM & RAG health matrix.",
        escalationRole: "Ultimate Decision Maker"
      },
      {
        id: "stk-2",
        name: "Rachel Green",
        role: "Business Owner",
        department: "Retail Operations",
        position: "VP Retail Banking",
        influence: "High",
        interest: "High",
        communicationPreference: "Bi-Weekly Email",
        engagementStrategy: "Involve in Sprint Demo reviews and UAT quality gate signoffs.",
        escalationRole: "Operational Sign-off"
      },
      {
        id: "stk-3",
        name: "Aisha Patel",
        role: "Technical Lead Architect",
        department: "IT Architecture",
        position: "Principal Architect",
        influence: "Medium",
        interest: "High",
        communicationPreference: "Slack/Teams",
        engagementStrategy: "Weekly architecture review board and technical debt triage.",
        escalationRole: "Technical Escalation"
      }
    ],
    requirements: [
      {
        id: "req-1",
        code: "FR-01",
        title: "Biometric & Multi-Factor Login",
        description: "Users must authenticate using Face ID / Touch ID / WebAuthn with encrypted JWT fallback.",
        type: "Functional",
        priority: "Must Have",
        complexity: "Medium",
        businessValue: 10,
        acceptanceCriteria: [
          "Login completes in under 1.5 seconds",
          "Fails gracefully to 6-digit PIN if biometrics fail 3 times"
        ],
        status: "Verified",
        wbsTaskId: "task-101"
      },
      {
        id: "req-2",
        code: "FR-02",
        title: "Real-time Account Ledger & Stream",
        description: "Display pending & settled account transactions with instant categorization.",
        type: "Functional",
        priority: "Must Have",
        complexity: "High",
        businessValue: 9,
        acceptanceCriteria: [
          "WebSocket push notification within 500ms of transaction event",
          "Auto-categorizes into 14 spending buckets"
        ],
        status: "In Development",
        wbsTaskId: "task-102"
      },
      {
        id: "req-3",
        code: "NFR-01",
        title: "PCI-DSS Level 1 Data Encryption",
        description: "All client-server payloads encrypted with TLS 1.3; sensitive card PAN tokens masked at REST.",
        type: "Non-Functional",
        category: "Security",
        priority: "Must Have",
        complexity: "High",
        businessValue: 10,
        acceptanceCriteria: [
          "Zero plain-text storage of credentials in log files",
          "Passes automated SAST/DAST security scans with 0 high defects"
        ],
        status: "Approved"
      }
    ],
    lifecyclePhases: [
      {
        id: "ph-1",
        wbsCode: "1.0",
        name: "Discovery & Architecture",
        durationDays: 30,
        startDate: "2026-02-01",
        endDate: "2026-03-02",
        workPackages: [
          {
            id: "wp-1",
            wbsCode: "1.1",
            name: "Requirements & Scope Framing",
            phaseId: "ph-1",
            owner: "David Chen",
            tasks: [
              {
                id: "task-101",
                wbsCode: "1.1.1",
                title: "In-Depth Stakeholder Workshops & Requirements Signoff",
                phaseId: "ph-1",
                workPackageId: "wp-1",
                assignedTo: "David Chen",
                assignedRole: "Project Manager",
                effortDays: 10,
                durationDays: 10,
                progressPercent: 100,
                startDate: "2026-02-01",
                endDate: "2026-02-10",
                dependencies: [],
                isCriticalPath: true,
                isMilestone: false,
                deliverableName: "Signed Requirements Specification Doc",
                status: "Completed",
                baselineStartDate: "2026-02-01",
                baselineEndDate: "2026-02-10",
                actualCost: 14000,
                subtasks: [
                  { id: "st-1", title: "Conduct 4 department interviews", completed: true },
                  { id: "st-2", title: "Draft Requirements Traceability Matrix", completed: true }
                ]
              },
              {
                id: "task-102",
                wbsCode: "1.1.2",
                title: "Security & PCI Compliance Blueprinting",
                phaseId: "ph-1",
                workPackageId: "wp-1",
                assignedTo: "Aisha Patel",
                assignedRole: "Security Architect",
                effortDays: 12,
                durationDays: 12,
                progressPercent: 100,
                startDate: "2026-02-11",
                endDate: "2026-02-22",
                dependencies: ["task-101"],
                isCriticalPath: true,
                isMilestone: true,
                deliverableName: "Security Architecture Blueprint",
                status: "Completed",
                baselineStartDate: "2026-02-11",
                baselineEndDate: "2026-02-22",
                actualCost: 18000,
                subtasks: [
                  { id: "st-3", title: "Review tokenization vendor specs", completed: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ph-2",
        wbsCode: "2.0",
        name: "Design & Microservices Development",
        durationDays: 60,
        startDate: "2026-03-03",
        endDate: "2026-05-01",
        workPackages: [
          {
            id: "wp-2",
            wbsCode: "2.1",
            name: "Core Backend Services & APIs",
            phaseId: "ph-2",
            owner: "Aisha Patel",
            tasks: [
              {
                id: "task-201",
                wbsCode: "2.1.1",
                title: "OAuth2 / WebAuthn Biometric Service Build",
                phaseId: "ph-2",
                workPackageId: "wp-2",
                assignedTo: "Aisha Patel",
                assignedRole: "Backend Lead",
                effortDays: 20,
                durationDays: 20,
                progressPercent: 100,
                startDate: "2026-03-03",
                endDate: "2026-03-22",
                dependencies: ["task-102"],
                isCriticalPath: true,
                isMilestone: false,
                deliverableName: "Auth Microservice Container",
                status: "Completed",
                baselineStartDate: "2026-03-03",
                baselineEndDate: "2026-03-22",
                actualCost: 26000,
                subtasks: []
              },
              {
                id: "task-202",
                wbsCode: "2.1.2",
                title: "Real-time Transaction WebSocket Engine",
                phaseId: "ph-2",
                workPackageId: "wp-2",
                assignedTo: "Liam O'Connor",
                assignedRole: "Full Stack Developer",
                effortDays: 25,
                durationDays: 25,
                progressPercent: 85,
                startDate: "2026-03-23",
                endDate: "2026-04-17",
                dependencies: ["task-201"],
                isCriticalPath: true,
                isMilestone: false,
                deliverableName: "Ledger Push Event Bus",
                status: "In Progress",
                baselineStartDate: "2026-03-23",
                baselineEndDate: "2026-04-17",
                actualCost: 22000,
                subtasks: [
                  { id: "st-4", title: "Setup Redis Pub/Sub buffer", completed: true },
                  { id: "st-5", title: "Perform 10k event/sec load benchmark", completed: false }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ph-3",
        wbsCode: "3.0",
        name: "Testing, UAT & Hypercare",
        durationDays: 45,
        startDate: "2026-05-02",
        endDate: "2026-06-15",
        workPackages: [
          {
            id: "wp-3",
            wbsCode: "3.1",
            name: "QA & User Acceptance",
            phaseId: "ph-3",
            owner: "Rachel Green",
            tasks: [
              {
                id: "task-301",
                wbsCode: "3.1.1",
                title: "End-to-End Penetration & Load Testing",
                phaseId: "ph-3",
                workPackageId: "wp-3",
                assignedTo: "Aisha Patel",
                assignedRole: "Security QA",
                effortDays: 15,
                durationDays: 15,
                progressPercent: 30,
                startDate: "2026-05-02",
                endDate: "2026-05-16",
                dependencies: ["task-202"],
                isCriticalPath: true,
                isMilestone: true,
                deliverableName: "PCI Audit Certification",
                status: "In Progress",
                baselineStartDate: "2026-05-02",
                baselineEndDate: "2026-05-16",
                actualCost: 5000,
                subtasks: []
              }
            ]
          }
        ]
      }
    ],
    costLineItems: [
      { id: "c-1", category: "Labor", description: "Engineering & PM Leadership Team", plannedAmount: 850000, forecastAmount: 865000, actualAmount: 520000 },
      { id: "c-2", category: "Cloud Costs", description: "AWS ECS, ElastiCache & API Gateway", plannedAmount: 180000, forecastAmount: 175000, actualAmount: 95000 },
      { id: "c-3", category: "Licenses", description: "Security Tokenization & Auth SDKs", plannedAmount: 120000, forecastAmount: 120000, actualAmount: 80000 },
      { id: "c-4", category: "Vendors", description: "External Penetration Testing Auditor", plannedAmount: 90000, forecastAmount: 95000, actualAmount: 45000 },
      { id: "c-5", category: "Contingency", description: "10% Management Risk Buffer", plannedAmount: 150000, forecastAmount: 120000, actualAmount: 20000 }
    ],
    evm: {
      BAC: 1390000,
      PV: 820000,
      EV: 845000,
      AC: 760000,
      CV: 85000,   // EV - AC (Favorable)
      SV: 25000,   // EV - PV (Favorable)
      CPI: 1.11,   // EV / AC (>1.0 under budget)
      SPI: 1.03,   // EV / PV (>1.0 ahead of schedule)
      EAC: 1252252, // BAC / CPI
      ETC: 492252,  // EAC - AC
      VAC: 137748   // BAC - EAC
    },
    risks: [
      {
        id: "risk-1",
        riskCode: "RSK-01",
        category: "Vendor",
        description: "Third-party biometric tokenization vendor API latency exceeding 400ms SLA during peak traffic.",
        rootCause: "Vendor EU datacenter routing overhead",
        trigger: "Latency metric spike > 350ms in staging load test",
        probability: "Medium",
        impact: "High",
        severityScore: 16,
        owner: "Aisha Patel",
        mitigation: "Negotiate US East coast edge routing & configure local in-memory token cache.",
        contingency: "Fallback to native OAuth JWT session handling with local encryption.",
        dueDate: "2026-08-15",
        status: "Open"
      },
      {
        id: "risk-2",
        riskCode: "RSK-02",
        category: "Resource",
        description: "Key Senior React Native engineer turnover impacting mobile UI velocity.",
        rootCause: "Market competition for senior mobile talent",
        trigger: "Resignation notice or single point of failure warning",
        probability: "Low",
        impact: "High",
        severityScore: 12,
        owner: "David Chen",
        mitigation: "Cross-train 2 full-stack engineers and maintain active staff augmentation vendor contract.",
        contingency: "Activate pre-approved agency contractor within 5 business days.",
        dueDate: "2026-09-01",
        status: "Mitigated"
      }
    ],
    issues: [
      {
        id: "iss-1",
        issueCode: "ISS-01",
        description: "Legacy Core Banking Staging API returned 502 Gateway Timeout under 2,000 concurrent socket stress.",
        priority: "High",
        severity: "Blocker",
        owner: "Liam O'Connor",
        reportedDate: "2026-07-20",
        dueDate: "2026-08-01",
        status: "In Investigation",
        daysOpen: 7
      }
    ],
    quality: {
      defectsCount: 4,
      defectLeakagePercent: 1.2,
      testCoveragePercent: 88.5,
      passRatePercent: 96.8,
      reworkPercent: 3.5,
      qualityGates: [
        {
          id: "qg-1",
          phaseName: "Discovery & Architecture",
          gateName: "Gate 1: Architecture & Security Sign-off",
          criteria: ["RTM baseline complete", "Zero high-risk security flaws in specs", "PMO budget approved"],
          passed: true,
          reviewer: "Marcus Vance",
          signoffDate: "2026-03-02"
        },
        {
          id: "qg-2",
          phaseName: "Design & Microservices",
          gateName: "Gate 2: Code Quality & Load Test Readiness",
          criteria: ["Unit test coverage > 85%", "SAST Security scan green", "API documentation published"],
          passed: false,
          reviewer: "Aisha Patel"
        }
      ]
    },
    changeRequests: [
      {
        id: "cr-1",
        crNumber: "CR-2026-004",
        title: "Add Apple Pay & Google Wallet Direct Provisioning",
        requestedBy: "Rachel Green",
        requestDate: "2026-07-10",
        description: "Incorporate instant card token push to Apple Pay & Google Wallet inside the mobile app.",
        justification: "Critical competitive feature requested by 68% of beta survey respondents.",
        impactScheduleDays: 10,
        impactCostAmount: 45000,
        impactScopeDescription: "Adds 1 new work package and 2 API endpoints in Phase 2.",
        status: "Approved",
        approver: "Sarah Jenkins",
        approvalDate: "2026-07-15"
      }
    ],
    communicationPlan: [
      { id: "com-1", audience: "Executive Steering Committee", frequency: "Weekly", format: "Steering Deck", owner: "David Chen", nextScheduledDate: "2026-08-01" },
      { id: "com-2", audience: "All Stakeholders & BU Leads", frequency: "Bi-Weekly", format: "Executive Summary Document", owner: "David Chen", nextScheduledDate: "2026-08-05" }
    ],
    governance: [
      {
        steeringCommitteeMembers: ["Sarah Jenkins (CDO)", "Marcus Vance (PMO)", "Rachel Green (VP Ops)"],
        changeControlBoardMembers: ["David Chen (PM)", "Aisha Patel (Tech Lead)", "Marcus Vance (PMO)"],
        escalationLevel1: "Project Manager (David Chen)",
        escalationLevel2: "Portfolio Manager (Elena Rostova)",
        escalationLevel3: "Executive Sponsor (Sarah Jenkins)",
        raciMatrix: [
          { activity: "Project Charter Signoff", responsible: "PM", accountable: "Executive Sponsor", consulted: "PMO Admin", informed: "Stakeholders" },
          { activity: "Architecture Design Review", responsible: "Tech Lead", accountable: "Tech Lead", consulted: "PMO Admin", informed: "PM" },
          { activity: "Scope Change Requests (> $25k)", responsible: "PM", accountable: "Steering Committee", consulted: "Tech Lead", informed: "Team" }
        ]
      }
    ],
    health: {
      scheduleHealth: "Green",
      budgetHealth: "Green",
      scopeHealth: "Green",
      qualityHealth: "Amber",
      riskHealth: "Amber",
      resourceHealth: "Green",
      overallHealth: "Green",
      aiHealthCommentary: "Project is currently performing ahead of schedule (SPI 1.03) and significantly under budget (CPI 1.11). Technical velocity remains strong at 88.5% test coverage. Primary watch-item is Risk RSK-01 regarding 3rd-party latency SLA and Quality Gate 2 pending core load test clearance."
    }
  }
];
