import React, { useState, useRef, useEffect } from "react";
import { useProject } from "../../context/ProjectContext";
import { Sparkles, X, Send, Bot, User, Loader2, Zap, ArrowRight } from "lucide-react";

export const CopilotDrawer: React.FC = () => {
  const { copilotOpen, setCopilotOpen, copilotMessages, sendCopilotQuery, isAiLoading, activeProject } = useProject();
  const [inputQuery, setInputQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [copilotMessages, isAiLoading]);

  if (!copilotOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isAiLoading) return;
    const query = inputQuery;
    setInputQuery("");
    sendCopilotQuery(query);
  };

  const presetQueries = [
    `Generate project plan for ${activeProject.name}`,
    `Predict project risks and mitigations`,
    `Forecast budget variance and EVM CPI/SPI`,
    `Generate executive summary for Steering Committee`
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-indigo-900 border-l border-indigo-800 z-50 shadow-2xl flex flex-col transition-all text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-indigo-950/80">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded bg-white flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-indigo-900" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">Copilot Intelligence</span>
            <span className="text-[10px] text-indigo-200">v4.2 AI Engine • Gemini 3.6</span>
          </div>
        </div>
        <button
          onClick={() => setCopilotOpen(false)}
          className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {copilotMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-[10px] font-bold ${
                msg.sender === "user"
                  ? "bg-white text-indigo-900"
                  : "bg-indigo-700 text-white border border-indigo-500/40"
              }`}
            >
              {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`p-3 rounded-lg max-w-[85%] text-[11px] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-white/20 text-white rounded-tr-none border border-white/20"
                  : "bg-white/10 text-indigo-50 border border-white/10 rounded-tl-none space-y-1.5"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`text-[9px] ${
                  msg.sender === "user" ? "text-indigo-200" : "text-indigo-300/70"
                } text-right mt-1 font-mono`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isAiLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-indigo-700 text-white border border-indigo-500/40 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white/10 border border-white/10 p-3 rounded-lg rounded-tl-none text-indigo-100 flex items-center gap-2 text-[11px]">
              <Loader2 className="w-4 h-4 text-indigo-300 animate-spin shrink-0" />
              <span>Analyzing PMO context & generating recommendations...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Presets */}
      <div className="p-3 bg-white/5 border-t border-white/10 space-y-1.5">
        <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-300" />
          Suggested Commands:
        </span>
        <div className="flex flex-col gap-1">
          {presetQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery("");
                sendCopilotQuery(query);
              }}
              disabled={isAiLoading}
              className="text-left text-[11px] text-indigo-100 bg-white/10 hover:bg-white/20 border border-white/10 rounded px-2.5 py-1.5 flex items-center justify-between transition-colors group"
            >
              <span className="truncate">{query}</span>
              <ArrowRight className="w-3 h-3 text-indigo-300 group-hover:text-white shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-indigo-950 border-t border-white/10 flex gap-2">
        <div className="flex-1 flex items-center bg-white/10 rounded px-3 py-1.5 border border-white/10 focus-within:border-white/30">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Command Copilot..."
            className="bg-transparent border-none text-[11px] text-white placeholder-white/40 flex-1 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!inputQuery.trim() || isAiLoading}
          className="bg-white text-indigo-900 hover:bg-indigo-50 disabled:opacity-50 px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center justify-center shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
