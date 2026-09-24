import React, { useState } from "react";
import logoIcon from "../../assets/off-route-icon-white.png";
import { useNavigate } from "react-router-dom";
import { adminAuthService } from "../../services/api";
import "../../admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await adminAuthService.login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-root">
      {/* Background Image Layer */}
      <div className="admin-login-bg">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80"
          alt=""
          className="admin-login-bg-img"
          aria-hidden="true"
        />
        <div className="admin-login-overlay" />
      </div>

      {/* Login Card */}
      <div className="admin-login-card">
        {/* Moon Icon */}
        {/* Brand Icon */}
        <div className="admin-login-icon-box">
          <img src={logoIcon} alt="Off Route" className="admin-login-icon-img" />
        </div>

        {/* Heading */}
        <div className="admin-login-eyebrow">Off Route</div>
        <h1 className="admin-login-title">Admin Portal</h1>
        <p className="admin-login-subtitle">Manage the Off Route experience.</p>

        {/* Error Message */}
        {error && (
          <div style={{
            background: "rgba(255, 107, 107, 0.1)",
            border: "1px solid rgba(255, 107, 107, 0.3)",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
            marginBottom: "1.25rem",
            fontSize: "0.8125rem",
            color: "#FF6B6B",
            textAlign: "left"
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-email">Email</label>
            <div className="admin-input-wrapper">
              <input
                id="admin-email"
                type="email"
                className="admin-form-input"
                placeholder="admin@offroute.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-password">Password</label>
            <div className="admin-input-wrapper">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                className="admin-form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-input-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="admin-form-row">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: "var(--admin-gold)",
                  width: "16px",
                  height: "16px"
                }}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="admin-forgot-link">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="admin-submit-btn"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Need Access */}
        <a href="#" className="admin-need-access">Need access?</a>
      </div>
    </div>
  );
}
