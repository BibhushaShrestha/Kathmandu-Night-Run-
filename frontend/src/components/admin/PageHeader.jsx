import React from "react";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="admin-page-header" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
      <div>
        <h1 className="admin-page-title">{title}</h1>
        {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
