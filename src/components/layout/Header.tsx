import React from "react";
import { useProject } from "../../context/ProjectContext";

import {
  Sparkles,
  Search,
  PlusCircle,
  Briefcase,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  Bell,
  Layers,
  LogOut,
  User
} from "lucide-react";

export const Header: React.FC = () => {
  const {
    projects,
    activeProject,
    setActiveProjectById,
    currentRole,
    setCopilotOpen,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    authUsername,
    authUser,
    logout
  } = useProject();




  return (
    <header className="h-14 bg-white border-b border-slate-200 text-slate-800 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm shrink-0">
      {/* Brand & Project Switcher */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
          <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white shadow-sm flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold tracking-tight text-slate-800">ProjectPlanner</span>
              <span className="text-indigo-600 font-bold text-lg">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Enterprise PMO & Portfolio Platform</p>
          </div>
        </div>

        {/* Project Selector */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
          <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs text-slate-500 font-medium">Project:</span>
          <select
            value={activeProject.id}
            onChange={(e) => setActiveProjectById(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-1"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} className="bg-white text-slate-800">
                {p.code} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center w-64 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
        <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search projects, tasks, risks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-slate-800 placeholder-slate-400 outline-none w-full text-xs"
        />
      </div>

      {/* Right Controls: Role Switcher, AI Copilot, Intake Action */}
      <div className="flex items-center gap-3">
        {/* Role Badge (read-only, set at login) */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">Role View</span>
            <span className="text-xs font-semibold text-slate-800">{currentRole}</span>
          </div>
        </div>


        {/* AI Copilot Button */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>AI Copilot</span>
        </button>

        {/* New Intake Quick Action */}
        <button
          onClick={() => setActiveTab("intake")}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 shadow-sm transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">New Intake</span>
        </button>

        {/* Notification bell */}
        <div className="relative p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer rounded-md hover:bg-slate-100">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </div>

        {/* User Profile Badge & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-lg ${authUser?.roleColor || "bg-indigo-600"} text-white text-[10px] font-bold flex items-center justify-center shadow shrink-0`}>
              {authUser?.avatarInitials || (authUsername ? authUsername.charAt(0).toUpperCase() : "S")}
            </div>
            {/* Name + Role pill */}
            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-semibold text-slate-800 leading-tight">{authUsername || "Sumit"}</span>
              <span className="text-[9px] text-slate-400 leading-tight">{currentRole}</span>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
