import React from "react";

export default function Navbar({ onMobileToggle, user }) {
  const currentUser = user || { name: "Bibhusha Shrestha", role: "Administrator" };

   return ( 
    <header className="admin-navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onMobileToggle}
          className="admin-icon-btn"
          style={{ display: "flex" }}
          aria-label="Toggle navigation sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Control Center Breadcrumb */}
        <div className="admin-breadcrumb">
          <span style={{ color: "var(--admin-gold)", fontSize: "0.875rem" }}>‹</span>
          <span>NIGHT CONTROL CENTER</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="admin-navbar-right">
        {/* Notifications Button */}
        <button className="admin-icon-btn" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="admin-badge-dot" />
        </button>

        {/* User Profile */}
        <div className="admin-user-profile">
          <div className="admin-avatar">
            BS
          </div>
          <div className="admin-user-info" style={{ display: "none" }}>
            <span className="admin-user-name">{currentUser.name}</span>
            <span className="admin-user-role">{currentUser.role}</span>
          </div>
          <div className="admin-user-info-desktop">
            <span className="admin-user-name">{currentUser.name}</span>
            <span className="admin-user-role">{currentUser.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
