import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function Testimonials() {
  const quotes = [
    {
      text: "I came for one run and stayed for the people. Nobody asked what my pace was — they asked if I had a headlamp.",
      by: "COMMUNITY RUNNER",
      tag: "FULL MOON RUN",
    },
    {
      text: "We ran past temples I have walked past my whole life and had never actually looked at.",
      by: "COMMUNITY RUNNER",
      tag: "HERITAGE LOOP",
    },
    {
      text: "They built the whole route around my birthday, down to where the group would stop for photos.",
      by: "PRIVATE EVENT HOST",
      tag: "SPECIALIZED EVENT",
    },
  ];

  return (
    <section id="community" className="testimonials-section">
      <div className="container-max testimonials-grid">
        {/* Left Column */}
        <div className="testimonials-col-left">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>COMMUNITY</span>
            </div>
            <h2 className="story-headline">
              MORE THAN A RUN.
            </h2>
            <p style={{ marginTop: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: "1.6", maxWidth: "24rem" }}>
              The run is the excuse. What people come back for is the group at the start line, the regroup on the climb and the tea at the end.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="zoom-in" delay={250} duration={850}>
            <div style={{ marginTop: "2.5rem", aspectRatio: "4/3", backgroundColor: "#1A1A18", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
              <img
                src="src/assets/nightrun2.jpg"
                alt="Community Runners"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(125%)" }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Quotes */}
        <div className="testimonials-col-right" style={{ alignSelf: "center" }}>
          {quotes.map((q, i) => (
            <ScrollReveal key={i} variant="fade-up" delay={150 * (i + 1)} duration={800}>
              <blockquote className="quote-box">
                <p className="quote-text">
                  "{q.text}"
                </p>
                <footer className="quote-footer">
                  {q.by} <span style={{ color: "var(--color-gold)" }}>· {q.tag}</span>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
