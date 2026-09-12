import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import group2 from "../../assets/group2.jpg";
import fullmoonrun from "../../assets/fullmoonrun.jpg";
import nightrun2 from "../../assets/nightrun2.jpg";
import temple from "../../assets/temple.jpg";

const TABS = ["ALL", "FULL MOON", "SPECIAL EVENTS", "TRAIL RUNS"];

const EVENTS = [
  {
    tag: "FULL MOON",
    meta: "TO BE ANNOUNCED",
    title: "FULL MOON RUN",
    desc: "The monthly community run. Meeting point and route are announced on Instagram a few days before the moon.",
    where: "Kathmandu Valley outskirts",
    dist: "To be announced",
    level: "To be announced",
    image: group2,
  },
  {
    tag: "FULL MOON",
    meta: "TO BE ANNOUNCED",
    title: "KATHMANDU AFTER DARK — HERITAGE LOOP",
    desc: "A slower, photography-led night loop past the valley's temple squares and courtyards.",
    where: "Inner Kathmandu",
    dist: "To be announced",
    level: "To be announced",
    image: fullmoonrun,
  },
  {
    tag: "TRAIL RUNS",
    meta: "DEPARTURES ON REQUEST",
    title: "NEPAL TRAIL RUNNING JOURNEY",
    desc: "Multi-day curated trail running across Nepal, built around your mileage and dates.",
    where: "Pokhara · Dhading · Mustang",
    dist: "Built to your weekly mileage",
    level: "Moderate to hard",
    image: nightrun2,
  },
  {
    tag: "SPECIAL EVENTS",
    meta: "BY ARRANGEMENT",
    title: "PRIVATE MILESTONE NIGHT RUN",
    desc: "A private night event designed around a birthday, celebration or milestone.",
    where: "Kathmandu Valley or chosen location",
    dist: "Designed with you",
    level: "Designed with you",
    image: temple,
  },
];

export default function EventsPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [filter, setFilter] = useState("ALL");
  const filteredEvents = filter === "ALL" ? EVENTS : EVENTS.filter((ev) => ev.tag === filter);

  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--color-black)", minHeight: "100vh", overflowX: "hidden" }}>
      <Header currentPath="events" onNavigate={onNavigate} />

      {/* ==================== 1. EVENTS HERO ==================== */}
      <section id="events-hero" className="hero-section" style={{ minHeight: "78vh" }}>
        <div className="hero-bg">
          <img
            src={group2}
            alt="Kathmandu Night Run community group photo"
            className="hero-img"
            style={{ filter: "grayscale(100%) brightness(55%) contrast(130%)" }}
          />
          <div className="hero-overlay-top" />
          <div className="hero-overlay-left" />
        </div>

        <div className="hero-content">
          <ScrollReveal variant="fade-down" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>EVENTS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={900}>
            <h1 className="hero-headline">
              RUN
              <br />
              WITH US.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={350}>
            <p className="hero-subtext">
              Community runs on the full moon, private events by arrangement, and trail journeys that leave when you do. Routes and meeting points are announced before each run.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== 2. THE CALENDAR ==================== */}
      <section id="calendar" className="calendar-section">
        <div className="container-max">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="calendar-header">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-dash" />
                  <span>UPCOMING</span>
                </div>
                <h2 className="threeways-title" style={{ color: "var(--color-black)" }}>
                  THE CALENDAR
                </h2>
              </div>

              <div className="calendar-tabs">
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`calendar-tab ${filter === t ? "active" : ""}`}
                    onClick={() => setFilter(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="calendar-grid">
            {filteredEvents.map((ev, idx) => (
              <ScrollReveal key={ev.title} variant="fade-up" delay={120 * (idx + 1)} duration={800}>
                <div className="calendar-card">
                  <div className="calendar-card-img-box">
                    <span className={`calendar-card-tag ${ev.tag === "TRAIL RUNS" ? "trail" : ""}`}>
                      {ev.tag}
                    </span>
                    <img src={ev.image} alt={ev.title} className="calendar-card-img" />
                  </div>

                  <div className="calendar-card-meta">{ev.meta}</div>
                  <h3 className="calendar-card-title">{ev.title}</h3>
                  <p className="calendar-card-desc">{ev.desc}</p>

                  <div className="calendar-specs">
                    <div>
                      <div className="calendar-spec-label">WHERE</div>
                      <div className="calendar-spec-value">{ev.where}</div>
                    </div>
                    <div>
                      <div className="calendar-spec-label">DIST.</div>
                      <div className="calendar-spec-value">{ev.dist}</div>
                    </div>
                    <div>
                      <div className="calendar-spec-label">LEVEL</div>
                      <div className="calendar-spec-value">{ev.level}</div>
                    </div>
                  </div>

                  <a href="#register" className="calendar-view-link">
                    <span>VIEW EVENT</span>
                    <span>→</span>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 3. ALREADY RUN (ARCHIVE) ==================== */}
      <section className="archive-section">
        <div className="container-max">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>PAST RUNS</span>
            </div>
            <h2 className="threeways-title">ALREADY RUN</h2>
            <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: "34rem", fontSize: "0.9375rem", lineHeight: "1.6" }}>
              Our archive of past runs is being put together — every full moon route we have run will be listed here with photographs from the night.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== 4. WANT THE MEETING POINT FIRST? (CTA) ==================== */}
      <section className="cta-section">
        <div
          className="container-max"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}
        >
          <ScrollReveal variant="fade-up" delay={100} duration={850}>
            <div>
              <h2 className="threeways-title" style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}>
                WANT THE MEETING
                <br />
                POINT FIRST?
              </h2>
              <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.6)", maxWidth: "30rem", fontSize: "0.9375rem", lineHeight: "1.6" }}>
                Announcements go out on Instagram and to the mailing list a few days before each run.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={250}>
            <a
              href="#footer"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#footer")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold"
           >
              GET IN TOUCH
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}