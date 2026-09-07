import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function FieldNotes() {
  const notes = [
    {
      tag: "FULL MOON RUNS",
      title: "The Valley Winds Down",
      desc: "There is a moment, somewhere after ten, when Kathmandu stops being a traffic problem and becomes a city again.",
      image: "/images/full_moon.jpg",
    },
    {
      tag: "ROUTE GUIDES",
      title: "Running the Terraces of Dhading",
      desc: "Two hours from Kathmandu, the road runs out and the terraces start. Notes from a recon weekend.",
      image: "/images/exp_trail.jpg",
    },
    {
      tag: "TRAINING",
      title: "Training for Night Trail",
      desc: "Running in the dark is a skill, not a handicap. How to build it without scaring yourself off trail.",
      image: "/images/exp_community.jpg",
    },
  ];

  return (
    <section id="field-notes" className="fieldnotes-section">
      <div className="container-max">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="eyebrow">
            <span className="eyebrow-dash" />
            <span>FIELD NOTES</span>
          </div>
          <h2 className="story-headline" style={{ maxWidth: "42rem" }}>
            STORIES FROM THE TRAILS WE RUN.
          </h2>
        </ScrollReveal>

        <div className="fieldnotes-grid">
          {/* Featured Article */}
          <div className="fieldnotes-col-featured">
            <ScrollReveal variant="fade-right" delay={200} duration={850}>
              <div style={{ cursor: "pointer" }}>
                <div style={{ aspectRatio: "4/3", backgroundColor: "#1A1A18", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                  <img
                    src="/images/our_story.jpg"
                    alt="What to Carry on a Full Moon Run"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(125%)" }}
                  />
                </div>
                <div style={{ marginTop: "1.5rem", fontSize: "0.625rem", fontWeight: "800", letterSpacing: "0.15em", color: "#8A8578", textTransform: "uppercase" }}>GEAR</div>
                <h3 className="story-headline" style={{ fontSize: "1.75rem", marginTop: "0.5rem" }}>
                  WHAT TO CARRY ON A FULL MOON RUN
                </h3>
                <p style={{ marginTop: "0.75rem", color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: "1.6" }}>
                  Headlamp, water, a warm layer and less than you think. A practical kit list for running Kathmandu at night.
                </p>
                <a href="#article" className="link-arrow" style={{ color: "var(--color-green)", marginTop: "1rem" }}>
                  <span>READ MORE</span>
                  <span>→</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* List of Note Items */}
          <div className="fieldnotes-col-list">
            {notes.map((n, idx) => (
              <ScrollReveal key={n.title} variant="fade-up" delay={150 * (idx + 1)} duration={800}>
                <div className="note-item">
                  <div>
                    <div style={{ fontSize: "0.625rem", fontWeight: "800", letterSpacing: "0.15em", color: "#8A8578", textTransform: "uppercase" }}>{n.tag}</div>
                    <h4 className="story-headline" style={{ fontSize: "1.25rem", marginTop: "0.25rem" }}>
                      {n.title}
                    </h4>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", marginTop: "0.25rem", lineHeight: "1.5" }}>{n.desc}</p>
                  </div>
                  <div>
                    <img
                      src={n.image}
                      alt={n.title}
                      className="note-item-img"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
            
            <ScrollReveal variant="fade-up" delay={500}>
              <div style={{ paddingTop: "1.5rem" }}>
                <a href="#all-notes" className="link-arrow" style={{ color: "var(--color-green)" }}>
                  <span>ALL FIELD NOTES</span>
                  <span>↗</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
