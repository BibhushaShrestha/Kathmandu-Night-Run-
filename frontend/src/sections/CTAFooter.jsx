import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function CTAFooter() {
  const steps = [
    { num: "01", title: "Join a Full Moon Run", sub: "Monthly community run", href: "#next-event" },
    { num: "02", title: "Plan a Special Event", sub: "Private night events", href: "#services" },
    { num: "03", title: "Build a Custom Trail Trip", sub: "Multi-day across Nepal", href: "#services" },
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
    </>
  );
}