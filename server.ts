import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini AI Client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Project Plan Generator Endpoint
app.post("/api/ai/generate-plan", async (req, res) => {
  try {
    const { projectName, projectType, department, description, estimatedBudget, durationMonths } = req.body;
    const ai = getAiClient();

    if (!ai) {
      // Fallback deterministic AI template if key missing
      return res.json({
        success: true,
        source: "fallback",
        lifecyclePhases: [
          {
            name: "Discovery & Initiation",
            durationDays: 15,
            workPackages: [
              {
                name: "Stakeholder Alignment & Charter",
                tasks: [
                  { title: "Define Business Case & Scope Statement", effortDays: 5, role: "Business Analyst", dependencies: [] },
                  { title: "Establish Steering Committee & RACI", effortDays: 3, role: "Project Manager", dependencies: ["Define Business Case & Scope Statement"] }
                ]
              }
            ]
          },
          {
            name: "Architecture & Design",
            durationDays: 25,
            workPackages: [
              {
                name: "Technical & System Specification",
                tasks: [
                  { title: "Draft Technical Architecture Document", effortDays: 10, role: "System Architect", dependencies: [] },
                  { title: "Security & Compliance Review", effortDays: 5, role: "Security Architect", dependencies: ["Draft Technical Architecture Document"] }
                ]
              }
            ]
          },
          {
            name: "Implementation & Build",
            durationDays: 45,
            workPackages: [
              {
                name: "Core Features Development",
                tasks: [
                  { title: "Develop Integration Microservices", effortDays: 20, role: "Senior Developer", dependencies: [] },
                  { title: "Frontend Dashboard Implementation", effortDays: 15, role: "UI Engineer", dependencies: ["Develop Integration Microservices"] }
                ]
              }
            ]
          },
          {
            name: "Quality Assurance & UAT",
            durationDays: 20,
            workPackages: [
              {
                name: "Validation & User Acceptance",
                tasks: [
                  { title: "Execute End-to-End Regression Test Suite", effortDays: 10, role: "QA Lead", dependencies: [] },
                  { title: "UAT Sign-off & Defect Remediation", effortDays: 8, role: "Business Lead", dependencies: ["Execute End-to-End Regression Test Suite"] }
                ]
              }
            ]
          },
          {
            name: "Deployment & Hypercare",
            durationDays: 15,
            workPackages: [
              {
                name: "Go-Live & Transition",
                tasks: [
                  { title: "Production Cutover & Rollout", effortDays: 3, role: "DevOps Engineer", dependencies: [] },
                  { title: "Hypercare Support & Handover to Ops", effortDays: 10, role: "Project Manager", dependencies: ["Production Cutover & Rollout"] }
                ]
              }
            ]
          }
        ],
        suggestedRisks: [
          { title: "Integration Dependency Delay", category: "Technical", probability: "Medium", impact: "High", mitigation: "Establish early mock APIs and contract test cases." },
          { title: "Resource Availability Contention", category: "Resource", probability: "High", impact: "Medium", mitigation: "Secure pre-allocated dedicated sprint teams during discovery." }
        ]
      });
    }

    const prompt = `You are an enterprise PMO Director and Lead Solution Architect.
Generate a comprehensive, structured project plan for the following project:
Project Name: ${projectName || "Enterprise Software Initiative"}
Project Type: ${projectType || "IT Transformation"}
Department: ${department || "IT"}
Budget: $${estimatedBudget || "500,000"}
Expected Duration: ${durationMonths || "6"} months
Context & Scope: ${description || "Comprehensive enterprise project implementation"}

Return ONLY a JSON object with this exact structure:
{
  "lifecyclePhases": [
    {
      "name": "Phase Name",
      "durationDays": number,
      "workPackages": [
        {
          "name": "Work Package Name",
          "tasks": [
            {
              "title": "Task title",
              "effortDays": number,
              "role": "Role Name",
              "dependencies": ["Prerequisite task title"]
            }
          ]
        }
      ]
    }
  ],
  "suggestedRisks": [
    {
      "title": "Risk Title",
      "category": "Technical | Schedule | Budget | Resource | Governance",
      "probability": "Low | Medium | High",
      "impact": "Low | Medium | High",
      "mitigation": "Recommended action"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedText = response.text ? response.text.trim() : "{}";
    const data = JSON.parse(parsedText);
    res.json({ success: true, source: "gemini", ...data });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate plan" });
  }
});

// AI Risk & Mitigation Predictor Endpoint
app.post("/api/ai/predict-risks", async (req, res) => {
  try {
    const { projectName, projectType, scopeSummary, currentBudget, timelineMonths } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: "fallback",
        predictedRisks: [
          {
            title: "Vendor SLA Breach & External Dependencies",
            category: "Vendor",
            probability: "Medium",
            impact: "High",
            severityScore: 15,
            rootCause: "Third-party vendor interface specs not finalized",
            trigger: "Delayed API documentation delivery beyond Sprint 2",
            mitigation: "Include strict financial penalty SLA clauses and parallel mock stub creation",
            contingency: "Re-allocate internal developers to build interim adapter service"
          },
          {
            title: "Scope Creep from Unaligned Stakeholders",
            category: "Scope",
            probability: "High",
            impact: "High",
            severityScore: 20,
            rootCause: "Multiple business units with conflicting operational requirements",
            trigger: "More than 3 change requests submitted in a single sprint",
            mitigation: "Implement strict formal CCB governance sign-off step",
            contingency: "Defer non-critical requests to Phase 2 roadmap"
          }
        ]
      });
    }

    const prompt = `Analyze risks for this enterprise project:
Name: ${projectName}
Type: ${projectType}
Scope: ${scopeSummary}
Budget: $${currentBudget}
Timeline: ${timelineMonths} months

Return a JSON object:
{
  "predictedRisks": [
    {
      "title": "Risk Name",
      "category": "Technical | Schedule | Financial | Resource | Vendor | Compliance",
      "probability": "Low | Medium | High",
      "impact": "Low | Medium | High",
      "severityScore": number (1 to 25),
      "rootCause": "Root Cause explanation",
      "trigger": "Early warning trigger",
      "mitigation": "Proactive mitigation strategy",
      "contingency": "Reactive contingency plan"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI Copilot Conversational Assistant Endpoint
app.post("/api/ai/copilot", async (req, res) => {
  try {
    const { prompt, projectContext } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        reply: `[AI Copilot - Fallback Mode] Processed query: "${prompt}". \n\nKey Recommendation for project ${projectContext?.name || 'Active Project'}:\n1. Ensure EVM CPI/SPI remain above 0.95.\n2. Review Top 3 critical path dependencies before next release.\n3. Verify resource allocation capacity heatmap to resolve over-allocated senior architects.`,
        actionType: "INFO_SUMMARY"
      });
    }

    const systemPrompt = `You are ProjectPlanner AI Copilot, an elite PMO Director & Enterprise Project Architect assistant.
Context of active project: ${JSON.stringify(projectContext || {})}

Provide clear, structured, professional, and actionable advice or answers.
If asked to generate or suggest tasks/risks/budget updates, provide direct actionable insights.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt
      }
    });

    res.json({
      reply: response.text,
      actionType: "GENERAL_REPLY"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Vite Middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ProjectPlanner AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
