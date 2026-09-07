import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function CTAFooter() {
  const steps = [
    { num: "01", title: "Join a Full Moon Run", sub: "Monthly community run", href: "#next-event" },
    { num: "02", title: "Plan a Special Event", sub: "Private night events", href: "#services" },
    { num: "03", title: "Build a Custom Trail Trip", sub: "Multi-day across Nepal", href: "#services" },
  ];

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#our-story" },
    { name: "Services", href: "#services" },
    { name: "Events", href: "#next-event" },
    { name: "Routes", href: "#after-dark" },
    { name: "Field Notes", href: "#field-notes" },
    { name: "Gallery", href: "#run-with-us" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <>
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container-max">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>PLAN YOUR RUN</span>
            </div>

            <h2 className="threeways-title" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
              WHERE DO YOU
              <br />
              WANT TO RUN?
            </h2>
          </ScrollReveal>

          <div className="cta-grid">
            {steps.map((s, idx) => (
              <ScrollReveal key={s.num} variant="fade-up" delay={150 * (idx + 1)} duration={800}>
                <div>
                  <div className="threeways-num" style={{ fontSize: "2.5rem", color: "#8A9B8F" }}>
                    {s.num}
                  </div>
                  <h3 className="threeways-item-title" style={{ fontSize: "1.25rem", marginTop: "0.75rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{s.sub}</p>
                  <a href={s.href} style={{ marginTop: "1rem", display: "inline-block", color: "var(--color-gold)", textDecoration: "none", fontSize: "1.25rem", fontWeight: "700" }}>
                    →
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={500}>
            <div style={{ marginTop: "3rem" }}>
              <a href="#contact" className="btn-gold">
                LET'S PLAN YOUR RUN
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Footer */}
      <footer id="footer" className="footer-root">
        <div className="container-max footer-grid">
          {/* Brand Col */}
          <div className="footer-col-brand">
            <a href="#hero" className="header-logo" style={{ display: "block" }}>
              <div className="header-logo-top" style={{ fontSize: "1.5rem" }}>KATHMANDU</div>
              <div className="header-logo-bottom" style={{ fontSize: "1.5rem" }}>NIGHT RUN</div>
            </a>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.2em", marginTop: "1rem", textTransform: "uppercase" }}>
              EXPERIENCE KATHMANDU AFTER DARK.
            </p>

            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
              <p>@kathmandunightrun</p>
              <p>hello@kathmandunightrun.com</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Nav Col */}
          <div className="footer-col-nav">
            <div style={{ fontSize: "0.625rem", fontWeight: "800", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem", textTransform: "uppercase" }}>NAVIGATE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>
              {navLinks.map((l) => (
                <a key={l.name} href={l.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                  {l.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="footer-col-news">
            <div style={{ fontSize: "0.625rem", fontWeight: "800", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem", textTransform: "uppercase" }}>NEWSLETTER</div>
            <h4 className="threeways-item-title" style={{ fontSize: "1.5rem" }}>
              GET THE NEXT RUN IN YOUR INBOX.
            </h4>
            <form style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                style={{ flex: 1, minWidth: "180px", backgroundColor: "#161614", border: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#ffffff", outline: "none" }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: "0.75rem 1.25rem" }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="container-max" style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
          <span>© {new Date().getFullYear()} Kathmandu Night Run. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#terms" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
