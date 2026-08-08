import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { AUTH_USERS, AuthUser } from "../../auth/roleConfig";
import {
  Layers, Lock, User, Eye, EyeOff, ArrowRight,
  AlertCircle, ChevronRight, Users
} from "lucide-react";

// Role color pill helper
const rolePillClass: Record<string, string> = {
  "Executive Sponsor": "bg-purple-900/60 text-purple-300 border-purple-500/40",
  "PMO Admin": "bg-indigo-900/60 text-indigo-300 border-indigo-500/40",
  "Portfolio Manager": "bg-blue-900/60 text-blue-300 border-blue-500/40",
  "Program Manager": "bg-cyan-900/60 text-cyan-300 border-cyan-500/40",
  "Project Manager": "bg-emerald-900/60 text-emerald-300 border-emerald-500/40",
  "Team Member": "bg-amber-900/60 text-amber-300 border-amber-500/40",
  "Stakeholder": "bg-rose-900/60 text-rose-300 border-rose-500/40",
};

// Unique users (exclude the Sumit legacy duplicate for display)
const DISPLAY_USERS = AUTH_USERS.filter(u => u.username !== "sumit");

export const LoginPage: React.FC = () => {
  const { login } = useProject();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUserList, setShowUserList] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = login(username, password);
      setIsLoading(false);
      if (!success) {
        setErrorMessage("Invalid credentials. Select a user from the list below to quick-login.");
      }
    }, 400);
  };

  const handleQuickLogin = (user: AuthUser) => {
    setUsername(user.username);
    setPassword(user.password);
    setErrorMessage("");
    // Auto-submit
    setIsLoading(true);
    setTimeout(() => {
      const success = login(user.username, user.password);
      setIsLoading(false);
      if (!success) setErrorMessage("Login failed. Please try again.");
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Left panel – Role User List */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] bg-slate-900 border-r border-slate-800 flex-col p-8 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white tracking-tight">ProjectPlanner</span>
            <span className="text-indigo-400 font-extrabold text-lg">AI</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-slate-400" />
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Demo User Accounts</h2>
        </div>

        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {DISPLAY_USERS.map((user) => (
            <button
              key={user.userId + user.username}
              onClick={() => handleQuickLogin(user)}
              disabled={isLoading}
              className="w-full text-left group flex items-center gap-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-xl p-3 transition-all cursor-pointer disabled:opacity-50"
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-lg ${user.roleColor} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow`}>
                {user.avatarInitials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border mt-0.5 ${rolePillClass[user.role] || "bg-slate-700 text-slate-300"}`}>
                  {user.role}
                </span>
              </div>

              {/* Credentials */}
              <div className="text-right shrink-0">
                <p className="text-[10px] text-slate-400 font-mono">{user.username}</p>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 ml-auto mt-0.5 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Click any user to instantly log in with that role. Each role sees a tailored set of modules and lands on the most relevant page.
          </p>
        </div>
      </div>

      {/* Right panel – Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* BG effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Brand (mobile only) */}
          <div className="flex flex-col items-center text-center mb-8 lg:hidden">
            <div className="h-14 w-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center mb-3">
              <Layers className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-white">ProjectPlanner</span>
              <span className="text-indigo-400 font-extrabold text-2xl">AI</span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">Enterprise PMO & Portfolio Management Platform</p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Sign in</h1>
            <p className="text-slate-400 text-sm mt-1">Select a user from the list, or enter credentials manually.</p>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mobile quick-login toggle */}
          <div className="lg:hidden mb-4">
            <button
              type="button"
              onClick={() => setShowUserList(!showUserList)}
              className="w-full flex items-center justify-between bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:border-indigo-500 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Quick Login — Select a Role
              </span>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showUserList ? "rotate-90" : ""}`} />
            </button>

            {showUserList && (
              <div className="mt-2 space-y-1.5 bg-slate-900/80 border border-slate-800 rounded-xl p-2">
                {DISPLAY_USERS.map((user) => (
                  <button
                    key={user.username}
                    onClick={() => { handleQuickLogin(user); setShowUserList(false); }}
                    disabled={isLoading}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <div className={`w-7 h-7 rounded-md ${user.roleColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                      {user.avatarInitials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{user.displayName}</p>
                      <p className="text-[10px] text-slate-400">{user.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[11px] text-slate-500 font-medium">or sign in manually</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. sarah, david, priya…"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-sm mt-2"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Credentials hint */}
          <p className="mt-5 text-center text-[11px] text-slate-600">
            Legacy access: <span className="font-mono text-slate-500">sumit / Passwd12345</span>
          </p>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} ProjectPlanner AI Enterprise Suite. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
