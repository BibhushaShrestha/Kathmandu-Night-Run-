import React, { useState, useEffect } from "react";

export default function Header({ currentPath = "home", onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { name: "HOME", path: "home", href: "#hero" },
    { name: "ABOUT", path: "about", href: "#our-story" },
    { name: "SERVICES", path: "home", href: "#services" },
    { name: "EVENTS", path: "home", href: "#next-event" },
    { name: "ROUTES", path: "home", href: "#after-dark" },
    { name: "FIELD NOTES", path: "home", href: "#field-notes" },
    { name: "GALLERY", path: "home", href: "#run-with-us" },
    { name: "CONTACT", path: "home", href: "#footer" },
  ];

  const handleLinkClick = (e, link) => {
    if (onNavigate) {
      e.preventDefault();
      if (link.name === "ABOUT") {
        onNavigate("about");
      } else if (link.name === "HOME") {
        onNavigate("home");
      } else {
        onNavigate("home", link.href);
      }
    }
    setOpen(false);
  };

  return (
    <header className={`header-root ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, { name: "HOME", path: "home", href: "#hero" })}
          className="header-logo"
        >
          <div className="header-logo-top">KATHMANDU</div>
          <div className="header-logo-bottom">NIGHT RUN</div>
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navLinks.map((link) => {
            const isActive = (link.name === "ABOUT" && currentPath === "about") || (link.name === "HOME" && currentPath === "home");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <a
          href="#next-event"
          onClick={(e) => handleLinkClick(e, { name: "HOME", path: "home", href: "#next-event" })}
          className="btn-gold header-cta"
        >
          JOIN THE NEXT RUN
        </a>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${open ? "open" : ""}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="mobile-nav-link"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#next-event"
          onClick={(e) => handleLinkClick(e, { name: "HOME", path: "home", href: "#next-event" })}
          className="btn-gold"
          style={{ marginTop: "2rem", width: "fit-content" }}
        >
          JOIN THE NEXT RUN
        </a>
      </div>
    </header>
  );
}
