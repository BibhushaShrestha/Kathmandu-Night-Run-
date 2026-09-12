import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import fullmoonrun from "../assets/fullmoonrun.jpg";

export default function FullMoonEvent() {
  const specs = [
    { label: "DATE", value: "TO BE ANNOUNCED" },
    { label: "TIME", value: "TO BE ANNOUNCED" },
    { label: "LOCATION", value: "KATHMANDU VALLEY OUTSKIRTS" },
    { label: "DISTANCE", value: "TO BE ANNOUNCED" },
    { label: "ELEVATION", value: "TO BE ANNOUNCED" },
    { label: "DIFFICULTY", value: "TO BE ANNOUNCED" },
  ];

  return (
    <section id="next-event" className="fullmoon-section">
      <div className="container-max fullmoon-grid">
        
        {/* Left Column: Event Information */}
        <div className="fullmoon-col-left">
          {/* Eyebrow */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>NEXT EVENT</span>
            </div>
          </ScrollReveal>

          {/* Big Stacked Headline */}
          <ScrollReveal variant="fade-up" delay={200} duration={850}>
            <h2 className="fullmoon-headline">
              FULL
              <br />
              MOON
              <br />
              RUN.
            </h2>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal variant="fade-up" delay={300}>
            <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.7)", maxWidth: "28rem", fontSize: "0.9375rem", lineHeight: "1.6" }}>
              The monthly community run. Meeting point and route are announced on Instagram a few days before the moon.
            </p>
          </ScrollReveal>

          {/* Specifications Grid */}
          <ScrollReveal variant="fade-up" delay={400}>
            <div className="specs-grid">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <div className="spec-label">
                    {spec.label}
                  </div>
                  <div className="spec-value">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Buttons */}
          <ScrollReveal variant="fade-up" delay={500}>
            <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href="#register" className="btn-gold">
                VIEW EVENT
              </a>
              <a href="#run-with-us" className="btn-outline">
                ALL EVENTS
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Full Moon Image Card */}
        <div className="fullmoon-col-right">
          <ScrollReveal variant="zoom-in" delay={250} duration={900}>
            <div className="fullmoon-img-box">
              {/* Top-Left Tag Badge */}
              <div className="fullmoon-tag">
                EVERY FULL MOON
              </div>

              <img
                src={fullmoonrun}
                alt="Full moon shining over Kathmandu night runners"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(125%)" }}
              />

              {/* Gradient Overlays */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(5,11,7,0.8), transparent)",
                }}
              />
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
