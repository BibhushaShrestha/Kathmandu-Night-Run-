// src/components/Footer.jsx
import React from "react";

export default function Footer({ onNavigate }) {
  const navLinks = [
    { name: "Home", path: "home", href: "#hero" },
    { name: "About", path: "about", href: "#about-hero" },
    { name: "Services", path: "services", href: "#services-hero" },
    { name: "Events", path: "home", href: "#next-event" },
    { name: "Routes", path: "home", href: "#after-dark" },
    { name: "Field Notes", path: "home", href: "#field-notes" },
    { name: "Gallery", path: "home", href: "#run-with-us" },
    { name: "Contact", path: "contact", href: "#contact-hero" },
  ];

  const handleClick = (e, link) => {
    e.preventDefault();
    if (!onNavigate) return;
    if (link.path === "about") onNavigate("about");
    else if (link.path === "services") onNavigate("services");
    else if (link.path === "contact") onNavigate("contact");
    else onNavigate("home", link.href);
  };

  return (
    <footer id="footer" className="footer-root">
      <div className="container-max footer-grid">
        {/* Brand Col */}
        <div className="footer-col-brand">
          <a href="#hero" onClick={(e) => handleClick(e, { path: "home", href: "#hero" })} className="header-logo" style={{ display: "block" }}>
            <div className="header-logo-top" style={{ fontSize: "1.5rem" }}>KATHMANDU</div>
            <div className="header-logo-bottom" style={{ fontSize: "1.5rem" }}>NIGHT RUN</div>
          </a>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginTop: "1rem", textTransform: "uppercase" }}>
            EXPERIENCE KATHMANDU AFTER DARK.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
            <p>@Off Route</p>
            <p>hello@Off Route.com</p>
            <p>Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Nav Col */}
        <div className="footer-col-nav">
          <div style={{ fontSize: "0.625rem", fontWeight: "800", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem", textTransform: "uppercase" }}>NAVIGATE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} onClick={(e) => handleClick(e, l)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                {l.name}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Col */}
        <div className="footer-col-news">
          <div style={{ fontSize: "0.625rem", fontWeight: "800", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem", textTransform: "uppercase" }}>NEWSLETTER</div>
          <h4 className="threeways-item-title" style={{ fontSize: "1.5rem" }}>GET THE NEXT RUN IN YOUR INBOX.</h4>
          <form style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@email.com" style={{ flex: 1, minWidth: "180px", backgroundColor: "#161614", border: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#fff" }} />
            <button type="submit" className="btn-gold" style={{ padding: "0.75rem 1.25rem" }}>SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <div className="container-max" style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
        <span>© {new Date().getFullYear()} Off Route. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#terms" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}