import React from "react";

export default function StatCard({ label, value, subtext, icon }) {
  return (
    <div className="admin-stat-card">
      <div>
        <div className="admin-stat-label">{label}</div>
        <div className="admin-stat-value">{value}</div>
        {subtext && <div className="admin-stat-sub">{subtext}</div>}
      </div>
      {icon && <div className="admin-stat-icon-box">{icon}</div>}
    </div>
  );
}
