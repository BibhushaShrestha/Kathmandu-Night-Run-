// src/pages/public/Services.jsx
import React, { useEffect } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";

export default function ServicesPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goHome = (hash) => (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate("home", hash);
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--color-black)", minHeight: "100vh", overflowX: "hidden" }}>
      <Header currentPath="services" onNavigate={onNavigate} />

      {/* ===================== 1. HERO (Image 1) ===================== */}
      <section id="services-hero" className="hero-section" style={{ minHeight: "72vh" }}>
        <div className="hero-bg">
          <img
            src="/images/exp_trail.jpg"
            alt="Dark forest silhouette at night"
            className="hero-img"
            style={{ filter: "grayscale(100%) brightness(45%) contrast(140%)" }}
          />
          <div className="hero-overlay-top" />
          <div className="hero-overlay-left" />
        </div>

        <div className="hero-content">
          <ScrollReveal variant="fade-down" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>SERVICES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={900}>
            <h1 className="hero-headline">
              THREE WAYS
              <br />
              TO RUN NEPAL.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={350}>
            <p className="hero-subtext">
              One community run, one private event service, one trail-running venture. Different scales, same idea: run the place properly.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={450}>
            <div className="hero-buttons">
              <a href="#enquiry" onClick={goHome("#footer")} className="btn-gold">
                START AN ENQUIRY
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===================== 2. SERVICE 01 — COMMUNITY RUN EVENTS (Image 2) ===================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "5rem 1.5rem" }}>
        <div className="container-max story-grid">
          <div className="story-col-left">
            <ScrollReveal variant="fade-right" delay={150} duration={900}>
              <div className="story-img-container" style={{ aspectRatio: "4 / 3" }}>
                <img src="/images/full_moon.jpg" alt="Community full moon run group photo" className="story-img" />
              </div>
            </ScrollReveal>
          </div>

          <div className="story-col-right" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", color: "#C9C9BE", marginBottom: "0.25rem" }}>01</span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline">COMMUNITY RUN EVENTS</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={300}>
              <p className="service-subtitle">EVERY FULL MOON, RUN KATHMANDU'S OUTSKIRTS WITH THE COMMUNITY.</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <p style={{ marginTop: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: "1.7" }}>
                Our full moon runs are the heart of Kathmandu Night Run. Once a month, when the valley goes quiet and the moon does most of the lighting, we gather at a meeting point on the edge of the city and run together — temples, back roads, forest tracks and ridgelines. No entry fee culture, no race clock, no pressure. Runners of every pace show up, and nobody finishes alone.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={450}>
              <div className="eyebrow" style={{ marginTop: "1.75rem" }}>
                <span className="eyebrow-dash" />
                <span>THE EXPERIENCE</span>
              </div>
              <ul className="service-checklist">
                <li className="service-check-item"><span className="service-check-icon">✓</span>A briefing, a route map and a sweep runner at the back</li>
                <li className="service-check-item"><span className="service-check-icon">✓</span>Mixed pace groups so the run stays social</li>
                <li className="service-check-item"><span className="service-check-icon">✓</span>Kathmandu's outskirts: heritage streets, hill roads and forest trail</li>
                <li className="service-check-item"><span className="service-check-icon">✓</span>Tea, food and conversation once everyone is in</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={500}>
              <div className="service-divider" />
              <div className="service-who-label">WHO IT'S FOR</div>
              <p className="service-who-text">ANYONE WHO CAN COVER THE SHORTER DISTANCE OPTION — FIRST-TIMERS INCLUDED.</p>
              <a href="#next-event" onClick={goHome("#next-event")} className="btn-dark-green" style={{ marginTop: "1.75rem" }}>
                EXPLORE FULL MOON RUNS
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===================== 3. SERVICE 02 — SPECIALIZED RUNNING EVENTS (Image 3) ===================== */}
      <section className="threeways-section">
        <div className="container-max story-grid">
          <div className="story-col-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", marginBottom: "0.25rem" }}>02</span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline" style={{ color: "var(--color-text-light)" }}>
                SPECIALIZED RUNNING
                <br />
                EVENTS
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={300}>
              <p className="service-subtitle" style={{ color: "var(--color-gold)" }}>
                CUSTOM RUNNING EXPERIENCES FOR BIRTHDAYS, CELEBRATIONS AND MILESTONES.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem", lineHeight: "1.7" }}>
                Some people mark the moment with a cake. Others want twenty friends, headlamps and a hill at midnight. We design and run private night events end to end — route design, recon, permissions, lighting, marshals, support vehicle, photography and the finish-line moment that people actually remember.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={450}>
              <div className="eyebrow" style={{ marginTop: "1.75rem" }}>
                <span className="eyebrow-dash" />
                <span>THE EXPERIENCE</span>
              </div>
              <ul className="service-checklist" style={{ color: "rgba(255,255,255,0.75)" }}>
                <li className="service-check-item"><span className="service-check-icon" style={{ color: "var(--color-gold)" }}>✓</span>Route designed around your group, distance and timing</li>
                <li className="service-check-item"><span className="service-check-icon" style={{ color: "var(--color-gold)" }}>✓</span>Full recon and safety plan before the day</li>
                <li className="service-check-item"><span className="service-check-icon" style={{ color: "var(--color-gold)" }}>✓</span>Marshals, sweep support and lighting where the route needs it</li>
                <li className="service-check-item"><span className="service-check-icon" style={{ color: "var(--color-gold)" }}>✓</span>Documentation by photographers who shoot at night for a living</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={500}>
              <div className="service-divider" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
              <div className="service-who-label" style={{ color: "rgba(255,255,255,0.5)" }}>WHO IT'S FOR</div>
              <p className="service-who-text" style={{ color: "var(--color-text-light)" }}>
                BIRTHDAYS, ANNIVERSARIES, TEAM DAYS, BRAND ACTIVATIONS AND PERSONAL MILESTONES.
              </p>
              <a href="#footer" onClick={goHome("#footer")} className="btn-gold" style={{ marginTop: "1.75rem" }}>
                PLAN YOUR EVENT
              </a>
            </ScrollReveal>
          </div>

          <div className="story-col-right">
            <ScrollReveal variant="fade-left" delay={250} duration={900}>
              <div className="story-img-container" style={{ aspectRatio: "4 / 3", backgroundColor: "#0E1E18", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src="/images/exp_specialized.jpg" alt="Private milestone night run group photo" className="story-img" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===================== 4. SERVICE 03 — CURATED TRAIL RUNNING (Image 4) ===================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "5rem 1.5rem" }}>
        <div className="container-max story-grid">
          <div className="story-col-left">
            <ScrollReveal variant="fade-right" delay={150} duration={900}>
              <div className="story-img-container" style={{ aspectRatio: "4 / 3" }}>
                <img src="/images/exp_trail.jpg" alt="Trail runners with headlamps at night" className="story-img" style={{ filter: "grayscale(100%) contrast(140%) brightness(85%)" }} />
              </div>
            </ScrollReveal>
          </div>

          <div className="story-col-right" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", color: "#C9C9BE", marginBottom: "0.25rem" }}>03</span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline">CURATED TRAIL RUNNING</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={300}>
              <p className="service-subtitle">CUSTOM TRAIL-RUNNING JOURNEYS ACROSS NEPAL.</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <p style={{ marginTop: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: "1.7" }}>
                Beyond the valley, Nepal is one long trail. We build multi-day running journeys — Pokhara's lake ridges, Bardiya's flat forest tracks, the hills of Dhading and Rasuwa, the wind and dust of Mustang, the remoteness of Jumla. Runnable lines, local guides, honest logistics and local stays rather than a packaged tour.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={450}>
              <div className="eyebrow" style={{ marginTop: "1.75rem" }}>
                <span className="eyebrow-dash" />
                <span>THE EXPERIENCE</span>
              </div>
              <ul className="service-checklist">
                <li className="service-check-item"><span className="service-check-icon">✓</span>Itineraries built around your weekly mileage, not a brochure</li>
                <li className="service-check-item"><span className="service-check-icon">✓</span>Local guides and locally owned stays</li>
                <li className="service-check-item"><span className="service-check-icon">✓</span>Transport, permits and support handled</li>
                <li className="service-check-item"><span className="service-check-icon">✓</span>Distances, elevation and difficulty confirmed at planning stage</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={500}>
              <div className="service-divider" />
              <div className="service-who-label">WHO IT'S FOR</div>
              <p className="service-who-text">TRAIL RUNNERS AND VISITING RUNNERS WHO WANT NEPAL AT RUNNING PACE.</p>
              <a href="#footer" onClick={goHome("#footer")} className="btn-dark-green" style={{ marginTop: "1.75rem" }}>
                PLAN YOUR TRAIL TRIP
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===================== 5. CTA "NOT SURE WHICH ONE" (Image 5 top) ===================== */}
      <section className="threeways-section">
        <div className="container-max" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <ScrollReveal variant="fade-up" delay={100}>
            <div>
              <h2 className="threeways-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                NOT SURE WHICH ONE
                <br />
                YOU WANT?
              </h2>
              <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem", maxWidth: "30rem", lineHeight: "1.6" }}>
                Tell us the group, the dates and roughly how far you like to run. We'll come back with the version of this that fits.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={250}>
            <a href="#footer" onClick={goHome("#footer")} className="btn-gold">
              SEND AN ENQUIRY
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ===================== 6. FOOTER (reused component) ===================== */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}