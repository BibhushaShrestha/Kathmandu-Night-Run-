import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import nightrun3 from "../../assets/nightrun3.jpg";
import group1 from "../../assets/group1.jpg";
import kathmanduValley from "../../assets/kathmandu_valley.jpg";
import nightRun from "../../assets/night_run.jpg";
import group3 from "../../assets/group3.jpg";
import group4 from "../../assets/group4.jpg";

const TABS = ["ALL", "ROUTE GUIDES", "FULL MOON RUNS", "TRAIL RUNNING", "TRAINING", "GEAR", "NEPAL TRAVEL"];

const FEATURED = {
  tag: "FEATURED · GEAR",
  title: "WHAT TO CARRY ON A FULL MOON RUN",
  desc: "Headlamp, water, a warm layer and less than you think. A practical kit list for running Kathmandu at night.",
  image: group1,
};

const NOTES = [
  {
    tag: "FULL MOON RUNS",
    title: "THE VALLEY WINDS DOWN",
    desc: "There is a moment, somewhere after ten, when Kathmandu stops being a traffic problem and becomes a city again.",
    where: "KATHMANDU VALLEY",
    image: kathmanduValley,
  },
  {
    tag: "ROUTE GUIDES",
    title: "RUNNING THE TERRACES OF DHADING",
    desc: "Two hours from Kathmandu, the road runs out and the terraces start. Notes from a recon weekend.",
    where: "DHADING",
    image: nightRun,
  },
  {
    tag: "TRAINING",
    title: "TRAINING FOR NIGHT TRAIL",
    desc: "Running in the dark is a skill, not a handicap. How to build it without scaring yourself off trail.",
    where: "KATHMANDU VALLEY",
    image: nightrun3,
  },
  {
    tag: "NEPAL TRAVEL",
    title: "WHY WE RUN TOGETHER",
    desc: "It started with four friends and a bad idea about the time of day. It became something else.",
    where: "KATHMANDU VALLEY",
    image: group3,
  },
  {
    tag: "TRAIL RUNNING",
    title: "TRAIL NOTES: MUSTANG",
    desc: "Wind from eleven in the morning, dust in everything, and some of the most striking running in Nepal.",
    where: "MUSTANG",
    image: group4,
  },
];

export default function FieldNotesPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [filter, setFilter] = useState("ALL");
  const filteredNotes = filter === "ALL" ? NOTES : NOTES.filter((n) => n.tag === filter);

  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--color-black)", minHeight: "100vh", overflowX: "hidden" }}>
      <Header currentPath="fieldnotes" onNavigate={onNavigate} />

      {/* ==================== 1. FIELD NOTES HERO ==================== */}
      <section id="fieldnotes-hero" className="hero-section" style={{ minHeight: "78vh" }}>
        <div className="hero-bg">
          <img
            src={nightrun3}
            alt="Kathmandu skyline at night"
            className="hero-img"
          />
          <div className="hero-overlay-top" />
          <div className="hero-overlay-left" />
        </div>

        <div className="hero-content">
          <ScrollReveal variant="fade-down" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>FIELD NOTES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={900}>
            <h1 className="hero-headline">
              STORIES FROM
              <br />
              THE TRAILS.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={350}>
            <p className="hero-subtext">
              Route guides, night running notes, gear that survives Kathmandu dust, and what we learn on recon.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== 2. FEATURED NOTE ==================== */}
      <section className="fieldnotes-featured-section">
        <div className="container-max">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="fieldnotes-featured-card">
              <div className="fieldnotes-featured-img-box">
                <img src={FEATURED.image} alt={FEATURED.title} className="fieldnotes-featured-img" />
              </div>
              <div className="fieldnotes-featured-body">
                <div className="eyebrow" style={{ color: "var(--color-green)" }}>
                  <span className="eyebrow-dash" style={{ backgroundColor: "var(--color-green)" }} />
                  <span>{FEATURED.tag}</span>
                </div>
                <h2 className="threeways-title" style={{ color: "var(--color-black)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                  {FEATURED.title}
                </h2>
                <p style={{ marginTop: "1rem", color: "var(--color-text-muted)", fontSize: "1rem", lineHeight: "1.6", maxWidth: "34rem" }}>
                  {FEATURED.desc}
                </p>
                <a href="#article" className="link-arrow" style={{ color: "var(--color-green)", marginTop: "1.25rem" }}>
                  <span>READ MORE</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== 3. ALL FIELD NOTES ==================== */}
      <section className="fieldnotes-archive-section">
        <div className="container-max">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="fieldnotes-archive-header">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-dash" />
                  <span>LATEST</span>
                </div>
                <h2 className="threeways-title">
                  ALL FIELD
                  <br />
                  NOTES
                </h2>
              </div>

              <div className="fieldnotes-tabs">
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`fieldnotes-tab ${filter === t ? "active" : ""}`}
                    onClick={() => setFilter(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="calendar-grid" style={{ marginTop: "3rem" }}>
            {filteredNotes.map((n, idx) => (
              <ScrollReveal key={n.title} variant="fade-up" delay={120 * (idx + 1)} duration={800}>
                <div className="fieldnotes-archive-card">
                  <div className="calendar-card-img-box">
                    <img src={n.image} alt={n.title} className="calendar-card-img" />
                  </div>

                  <div className="fieldnotes-archive-tag">{n.tag}</div>
                  <h3 className="fieldnotes-archive-title">{n.title}</h3>
                  <p className="fieldnotes-archive-desc">{n.desc}</p>

                  <div className="fieldnotes-archive-footer">
                    <span>{n.where}</span>
                    <a href="#article" aria-label={`Read ${n.title}`}>→</a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. RUN THE ROUTES WE WRITE ABOUT (CTA) ==================== */}
      <section className="cta-section">
        <div
          className="container-max"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}
        >
          <ScrollReveal variant="fade-up" delay={100} duration={850}>
            <div>
              <h2 className="threeways-title" style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}>
                RUN THE ROUTES WE
                <br />
                WRITE ABOUT.
              </h2>
              <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.6)", maxWidth: "30rem", fontSize: "0.9375rem", lineHeight: "1.6" }}>
                Most field notes start as a recon for a run we are about to put on. Join one and see it first-hand.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={250}>
            <a
              href="#events-hero"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("events");
              }}
              className="btn-gold"
            >
              SEE UPCOMING EVENTS
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
