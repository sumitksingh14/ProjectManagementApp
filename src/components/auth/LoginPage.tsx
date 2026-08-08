import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { AUTH_USERS, AuthUser } from "../../auth/roleConfig";
import {
  Layers, Lock, User, Eye, EyeOff, ArrowRight,
  AlertCircle, ChevronRight, Users, ShieldCheck
} from "lucide-react";

// Role color pill styles — aligned to design token colors
const rolePillStyle: Record<string, { bg: string; text: string; border: string }> = {
  "Executive Sponsor": { bg: "rgba(139,92,246,0.15)",  text: "#A78BFA", border: "rgba(139,92,246,0.35)" },
  "PMO Admin":         { bg: "rgba(6,182,212,0.12)",   text: "#22D3EE", border: "rgba(6,182,212,0.30)" },
  "Portfolio Manager": { bg: "rgba(59,130,246,0.12)",  text: "#93C5FD", border: "rgba(59,130,246,0.30)" },
  "Program Manager":   { bg: "rgba(6,182,212,0.12)",   text: "#67E8F9", border: "rgba(6,182,212,0.30)" },
  "Project Manager":   { bg: "rgba(16,185,129,0.12)",  text: "#6EE7B7", border: "rgba(16,185,129,0.30)" },
  "Team Member":       { bg: "rgba(245,158,11,0.12)",  text: "#FCD34D", border: "rgba(245,158,11,0.30)" },
  "Stakeholder":       { bg: "rgba(236,72,153,0.12)",  text: "#F9A8D4", border: "rgba(236,72,153,0.30)" },
};

// Unique users (exclude the Sumit legacy duplicate for display)
const DISPLAY_USERS = AUTH_USERS.filter(u => u.username !== "sumit");

// ── Shared style helpers ────────────────────────────────────────────────────────
const S = {
  panel: {
    background: "var(--bg-sidebar)",
    borderRight: "1px solid var(--border)",
  } as React.CSSProperties,
  rightPanel: {
    background: "var(--bg-page)",
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    padding: "48px 24px",
    position: "relative" as const,
    overflow: "hidden",
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    transition: "border-color 0.15s, background 0.15s",
  } as React.CSSProperties,
  input: {
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "16px",
    paddingTop: "11px",
    paddingBottom: "11px",
    background: "var(--bg-input)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-family)",
    fontSize: "var(--text-base)",   // 14px — WCAG readable
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontFamily: "var(--font-family)",
    fontSize: "var(--text-xs)",     // 11px
    fontWeight: 700,
    color: "var(--text-secondary)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    marginBottom: "6px",
  } as React.CSSProperties,
};

export const LoginPage: React.FC = () => {
  const { login } = useProject();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

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
        setErrorMessage("Invalid credentials. Select a user from the list to quick-login.");
      }
    }, 400);
  };

  const handleQuickLogin = (user: AuthUser) => {
    setErrorMessage("");
    setIsLoading(true);
    setTimeout(() => {
      const success = login(user.username, user.password);
      setIsLoading(false);
      if (!success) setErrorMessage("Login failed. Please try again.");
    }, 350);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "var(--font-family)",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── LEFT PANEL — User cards ───────────────────────────────────────────── */}
      <div
        style={{
          width: "400px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          ...S.panel,
        }}
        className="hidden lg:flex"
      >
        {/* Brand */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "38px", height: "38px", borderRadius: "12px",
                background: "var(--grad-primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px var(--accent-glow)", flexShrink: 0,
              }}
            >
              <Layers style={{ width: "18px", height: "18px", color: "#fff" }} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "2px", lineHeight: 1.1 }}>
                <span style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text-primary)" }}>
                  ProjectPlanner
                </span>
                <span style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--accent)" }}>
                  AI
                </span>
              </div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 500, marginTop: "1px" }}>
                Enterprise PMO Suite
              </p>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div style={{ padding: "16px 20px 10px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users style={{ width: "14px", height: "14px", color: "var(--text-muted)" }} />
            <span className="section-label">Demo User Accounts</span>
          </div>
        </div>

        {/* User cards list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {DISPLAY_USERS.map((user) => {
              const pill = rolePillStyle[user.role] || { bg: "rgba(255,255,255,0.05)", text: "var(--text-secondary)", border: "var(--border)" };
              const isHovered = hoveredUser === user.username;
              return (
                <button
                  key={user.userId + user.username}
                  onClick={() => handleQuickLogin(user)}
                  onMouseEnter={() => setHoveredUser(user.username)}
                  onMouseLeave={() => setHoveredUser(null)}
                  disabled={isLoading}
                  style={{
                    width: "100%", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "12px",
                    background: isHovered ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isHovered ? "var(--accent-border)" : "var(--border)"}`,
                    borderRadius: "12px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "38px", height: "38px", borderRadius: "10px",
                      background: user.roleColor || "var(--grad-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "var(--text-xs)", fontWeight: 700,
                      flexShrink: 0,
                      boxShadow: isHovered ? "0 2px 10px var(--accent-glow)" : "none",
                    }}
                  >
                    {user.avatarInitials}
                  </div>

                  {/* Name + Role pill */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: "var(--text-base)",   // 14px — primary label
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {user.displayName}
                    </p>
                    <span style={{
                      display: "inline-block",
                      fontSize: "var(--text-xs)",     // 11px badge
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "6px",
                      background: pill.bg,
                      color: pill.text,
                      border: `1px solid ${pill.border}`,
                      letterSpacing: "0.02em",
                    }}>
                      {user.role}
                    </span>
                  </div>

                  {/* Username + arrow */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "monospace" }}>
                      {user.username}
                    </p>
                    <ChevronRight style={{
                      width: "14px", height: "14px",
                      color: isHovered ? "var(--accent)" : "var(--text-muted)",
                      marginLeft: "auto", marginTop: "4px",
                      transition: "color 0.15s",
                    }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer hint */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid var(--border)",
          flexShrink: 0,
        }}>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: "var(--lh-relaxed)" }}>
            Click any user to instantly log in with that role. Each role sees a tailored set of modules.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Sign-in form ────────────────────────────────────────── */}
      <div style={S.rightPanel}>
        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: "25%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: "280px", height: "280px",
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 10 }}>

          {/* Mobile brand (hidden on large screens) */}
          <div className="lg:hidden" style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "16px",
              background: "var(--grad-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0 6px 20px var(--accent-glow)",
            }}>
              <Layers style={{ width: "24px", height: "24px", color: "#fff" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
              <span style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)" }}>ProjectPlanner</span>
              <span style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--accent)" }}>AI</span>
            </div>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: "4px" }}>
              Enterprise PMO & Portfolio Platform
            </p>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{
              fontSize: "var(--text-4xl)",    // 36px — prominent
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.5px",
              lineHeight: "var(--lh-tight)",
              marginBottom: "8px",
            }}>
              Sign in
            </h1>
            <p style={{
              fontSize: "var(--text-base)",   // 14px — readable subtitle
              color: "var(--text-secondary)",
              lineHeight: "var(--lh-normal)",
            }}>
              Select a user from the list, or enter credentials manually.
            </p>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div
              className="animate-fadeIn"
              style={{
                marginBottom: "20px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "var(--pink-dim)",
                border: "1px solid rgba(236,72,153,0.30)",
                display: "flex", alignItems: "flex-start", gap: "10px",
              }}
            >
              <AlertCircle style={{ width: "16px", height: "16px", color: "var(--pink)", flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontSize: "var(--text-base)", color: "var(--pink)", lineHeight: "var(--lh-normal)" }}>
                {errorMessage}
              </span>
            </div>
          )}

          {/* Mobile quick-login toggle */}
          <div className="lg:hidden" style={{ marginBottom: "16px" }}>
            <button
              type="button"
              onClick={() => setShowUserList(!showUserList)}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "var(--text-secondary)",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-family)",
                transition: "border-color 0.15s",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users style={{ width: "15px", height: "15px", color: "var(--accent)" }} />
                Quick Login — Select a Role
              </span>
              <ChevronRight style={{
                width: "15px", height: "15px", color: "var(--text-muted)",
                transform: showUserList ? "rotate(90deg)" : "none",
                transition: "transform 0.2s",
              }} />
            </button>

            {showUserList && (
              <div style={{
                marginTop: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "8px",
                display: "flex", flexDirection: "column", gap: "4px",
              }}>
                {DISPLAY_USERS.map((user) => (
                  <button
                    key={user.username}
                    onClick={() => { handleQuickLogin(user); setShowUserList(false); }}
                    disabled={isLoading}
                    style={{
                      width: "100%", textAlign: "left",
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "10px 12px", borderRadius: "8px",
                      background: "transparent", border: "none",
                      cursor: "pointer", fontFamily: "var(--font-family)",
                      transition: "background 0.15s",
                      opacity: isLoading ? 0.5 : 1,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(139,92,246,0.08)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "8px",
                      background: user.roleColor || "var(--grad-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "var(--text-xs)", fontWeight: 700, flexShrink: 0,
                    }}>
                      {user.avatarInitials}
                    </div>
                    <div>
                      <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)" }}>
                        {user.displayName}
                      </p>
                      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>{user.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
              or sign in manually
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Username */}
            <div>
              <label style={S.label} htmlFor="login-username">Username</label>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                  color: "var(--text-muted)", pointerEvents: "none",
                }}>
                  <User style={{ width: "15px", height: "15px" }} />
                </div>
                <input
                  id="login-username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. sarah, david, priya…"
                  style={S.input}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={S.label} htmlFor="login-password">Password</label>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                  color: "var(--text-muted)", pointerEvents: "none",
                }}>
                  <Lock style={{ width: "15px", height: "15px" }} />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ ...S.input, paddingRight: "44px" }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    color: "var(--text-muted)", cursor: "pointer",
                    display: "flex", alignItems: "center",
                    padding: "4px",
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff style={{ width: "15px", height: "15px" }} />
                    : <Eye style={{ width: "15px", height: "15px" }} />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="btn-sign-in"
              disabled={isLoading}
              className="btn-accent"
              style={{
                width: "100%",
                padding: "13px 18px",                // tall enough touch target
                marginTop: "4px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontSize: "var(--text-base)",         // 14px — readable CTA
                opacity: isLoading ? 0.6 : 1,
                pointerEvents: isLoading ? "none" : "auto",
              }}
            >
              {isLoading ? (
                <span style={{
                  display: "inline-block", width: "18px", height: "18px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight style={{ width: "15px", height: "15px" }} />
                </>
              )}
            </button>
          </form>

          {/* Security badge */}
          <div style={{
            marginTop: "24px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          }}>
            <ShieldCheck style={{ width: "13px", height: "13px", color: "var(--green)" }} />
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "center" }}>
              Legacy access:{" "}
              <span style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>sumit / Passwd12345</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          position: "absolute", bottom: "20px",
          fontSize: "var(--text-xs)",
          color: "var(--text-muted)",
          textAlign: "center",
          width: "100%",
        }}>
          © {new Date().getFullYear()} ProjectPlanner AI Enterprise Suite. All rights reserved.
        </footer>
      </div>

      {/* Spin keyframe (inline) */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
