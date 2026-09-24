import React, { useEffect } from "react";
import Header from "../../components/Header.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import Footer from "../../components/Footer.jsx";

export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-black)", backgroundColor: "var(--color-black)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Navigation Header */}
      <Header currentPath="about" onNavigate={onNavigate} />

      {/* ==================== 1. ABOUT HERO (IMAGE 5) ==================== */}
      <section id="about-hero" className="hero-section" style={{ minHeight: "85vh" }}>
        {/* Background Image & Overlay */}
        <div className="hero-bg">
          <img
            src="/src/assets/four_friends.jpg"
            alt="Off Route Team Four Friends"
            className="hero-img"
            style={{ filter: "grayscale(100%) brightness(60%) contrast(130%)" }}
          />
          <div className="hero-overlay-top" />
          <div className="hero-overlay-left" />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <ScrollReveal variant="fade-down" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>ABOUT</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={900}>
            <h1 className="hero-headline" style={{ fontSize: "clamp(3.5rem, 14vw, 8rem)" }}>
              OUR
              <br />
              ORIGINS
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={350}>
            <p className="hero-subtext" style={{ fontSize: "1.25rem", maxWidth: "36rem" }}>
              Four friends who bonded over a shared appetite of trails, culture and a sense of wanderlust of the country they lived in, built a community without any intention. Taking hundreds running, through temples and routes beyond the tourist path, an adventure running venture formed.

            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* ==================== 2. QUOTE SECTION (IMAGE 1) ==================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "5rem 1.5rem", borderBottom: "1px solid rgba(11,11,9,0.1)" }}>
        <div className="container-max" style={{ maxWidth: "64rem" }}>
          <ScrollReveal variant="fade-up" delay={100} duration={850}>
            <blockquote className="about-quote-box">
              “WHAT DOES KATHMANDU LOOK LIKE WHEN THE CITY GOES QUIET?” — THE QUESTION THAT STARTED EVERYTHING, ASKED SOMEWHERE AFTER TEN AT NIGHT.
            </blockquote>
          </ScrollReveal>
        </div>
      </section>


      {/* ==================== 3. 01 HOW IT STARTED (IMAGE 2) ==================== */}
      <section style={{ backgroundColor: "var(--color-cream-grey)", color: "var(--color-black)", padding: "5rem 1.5rem", borderTop: "1px solid rgba(11,11,9,0.15)" }}>
        <div className="container-max story-grid">
          
          {/* Left: B&W Image */}
          <div className="story-col-left">
            <ScrollReveal variant="fade-right" delay={150} duration={900}>
              <div className="story-img-container">
                <img
                  src="/src/assets/four_friends.jpg"
                  alt="Four Friends How It Started"
                  className="story-img"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Text */}
          <div className="story-col-right" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", marginBottom: "0.5rem" }}>
                01
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline">
                 How our journey began
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <div style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.2em", color: "#8A8578", textTransform: "uppercase", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
                FOUR FRIENDS AND A CITY THAT CHANGES AFTER TEN.
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <div className="story-body">
                <p>
                  Off Route began with four friends who wanted to see their own city without the traffic, the crowds and the noise in the way. The first runs had no route and no plan — just a few torches and a direction.
                </p>
                <p>
                  What they found was a different Kathmandu. Temple squares standing empty. Streets you could hear your own footsteps on. Trails at the edge of the valley that felt a long way from the city they had just left.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ==================== 4. 02 WHO WE ARE (IMAGE 3) ==================== */}
      <section className="threeways-section">
        <div className="container-max story-grid">
          
          {/* Left: Text */}
          <div className="story-col-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", marginBottom: "0.5rem" }}>
                02
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline" style={{ color: "var(--color-text-light)" }}>
                WHO WE ARE
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <div style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.2em", color: "var(--color-gold)", textTransform: "uppercase", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
                A RUNNING COMMUNITY, AND A TEAM THAT BUILDS RUNNING EXPERIENCES.
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <div className="story-body" style={{ color: "rgba(255,255,255,0.7)" }}>
                <p>
                  Today Off Route is two things at once. It is an open community that meets on the full moon and runs the valley's outskirts together, and it is a small team that designs private night events and curated trail-running journeys across Nepal.
                </p>
                <p>
                  There is no membership and no pace requirement. People arrive on their own, run in a group and leave knowing a dozen more runners than they did.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: B&W Image */}
          <div className="story-col-right">
            <ScrollReveal variant="fade-left" delay={250} duration={900}>
              <div className="story-img-container" style={{ backgroundColor: "#0E1E18", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img
                  src="/src/assets/nightrun2.jpg"
                  alt="Runners sitting on temple steps at night"
                  className="story-img"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ==================== 5. 03 WHAT WE BELIEVE (IMAGE 4) ==================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "5rem 1.5rem" }}>
        <div className="container-max story-grid">
          
          {/* Left: B&W Image */}
          <div className="story-col-left">
            <ScrollReveal variant="fade-right" delay={150} duration={900}>
              <div className="story-img-container">
                <img
                  src="/src/assets/group2.jpg"
                  alt="Runner in moonlit night alleyway"
                  className="story-img"
                  style={{ filter: "grayscale(100%) contrast(140%)" }}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Text */}
          <div className="story-col-right" style={{ display: "flex", flexDirection: "column", justify: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", marginBottom: "0.5rem" }}>
                03
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline">
                WHAT WE BELIEVE
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <div style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.2em", color: "#8A8578", textTransform: "uppercase", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
                THE RUN BELONGS TO WHOEVER SHOWS UP.
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <div className="story-body">
                <p>
                  We believe running is the most honest way to learn a place — you cover ground slowly enough to notice it and fast enough to see a lot of it.
                </p>
                <p>
                  We believe nobody should finish alone, that local guides and local stays should be the default rather than an upgrade, and that a well-run night event is mostly invisible preparation.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ==================== 6. 04 WHY WE RUN (NEW IMAGE 3) ==================== */}
      <section className="threeways-section" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container-max story-grid">
          
          {/* Left: Text */}
          <div className="story-col-left" style={{ display: "flex", flexDirection: "column", justify: "center" }}>
            <ScrollReveal variant="fade-up" delay={100}>
              <span className="threeways-num" style={{ display: "block", marginBottom: "0.5rem" }}>
                04
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200} duration={850}>
              <h2 className="story-headline" style={{ color: "var(--color-text-light)" }}>
                WHY WE RUN
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <div style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.2em", color: "var(--color-gold)", textTransform: "uppercase", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
                BECAUSE KATHMANDU AFTER DARK IS WORTH BEING AWAKE FOR.
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <div className="story-body" style={{ color: "rgba(255,255,255,0.7)" }}>
                <p>
                  The moon does most of the lighting. The city gives back the streets. Somewhere on the climb, a group of strangers becomes a group.
                </p>
                <p>
                  That is the whole reason. Everything else — the events, the trips, the routes across seven regions of Nepal — grew out of it.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: B&W Photo */}
          <div className="story-col-right">
            <ScrollReveal variant="fade-left" delay={250} duration={900}>
              <div className="story-img-container" style={{ backgroundColor: "#0E1E18", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img
                  src="/src/assets/kathmandu_valley.jpg"
                  alt="Boudhanath Stupa under Full Moon"
                  className="story-img"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ==================== 7. THREE WAYS TO RUN NEPAL (NEW IMAGE 1) ==================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "5rem 1.5rem", borderTop: "1px solid rgba(11,11,9,0.1)" }}>
        <div className="container-max">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>WHAT WE DO NOW</span>
            </div>

            <h2 className="story-headline" style={{ marginBottom: "3rem" }}>
              THREE WAYS TO RUN NEPAL.
            </h2>
          </ScrollReveal>

          {/* 3 Columns Grid */}
          <div className="ways-3col-grid">
            {/* Col 01 */}
            <ScrollReveal variant="fade-up" delay={150}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="threeways-num" style={{ color: "#A4B4A2", fontSize: "3.5rem", marginBottom: "0.75rem" }}>
                  01
                </span>
                <h3 className="story-headline" style={{ fontSize: "1.5rem" }}>
                  COMMUNITY RUN EVENTS
                </h3>
                <p style={{ marginTop: "0.75rem", color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: "1.6" }}>
                  Every full moon, run Kathmandu's outskirts with the community.
                </p>
                <a
                  href="#next-event"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate("home", "#next-event");
                  }}
                  className="link-arrow"
                  style={{ color: "var(--color-black)", marginTop: "1.5rem" }}
                >
                  <span>EXPLORE FULL MOON RUNS</span>
                  <span>↗</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Col 02 */}
            <ScrollReveal variant="fade-up" delay={300}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="threeways-num" style={{ color: "#A4B4A2", fontSize: "3.5rem", marginBottom: "0.75rem" }}>
                  02
                </span>
                <h3 className="story-headline" style={{ fontSize: "1.5rem" }}>
                  SPECIALIZED RUNNING EVENTS
                </h3>
                <p style={{ marginTop: "0.75rem", color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: "1.6" }}>
                  Custom running experiences for birthdays, celebrations and milestones.
                </p>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate("home", "#services");
                  }}
                  className="link-arrow"
                  style={{ color: "var(--color-black)", marginTop: "1.5rem" }}
                >
                  <span>PLAN YOUR EVENT</span>
                  <span>↗</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Col 03 */}
            <ScrollReveal variant="fade-up" delay={450}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="threeways-num" style={{ color: "#A4B4A2", fontSize: "3.5rem", marginBottom: "0.75rem" }}>
                  03
                </span>
                <h3 className="story-headline" style={{ fontSize: "1.5rem" }}>
                  CURATED TRAIL RUNNING
                </h3>
                <p style={{ marginTop: "0.75rem", color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: "1.6" }}>
                  Custom trail-running journeys across Nepal.
                </p>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate("home", "#services");
                  }}
                  className="link-arrow"
                  style={{ color: "var(--color-black)", marginTop: "1.5rem" }}
                >
                  <span>PLAN YOUR TRAIL TRIP</span>
                  <span>↗</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ==================== 8. COME AND SEE IT FOR YOURSELF BANNER (NEW IMAGE 2) ==================== */}
      <section className="threeways-section" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container-max" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <ScrollReveal variant="fade-up" delay={100}>
            <div>
              <h2 className="threeways-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                COME AND SEE IT FOR
                <br />
                YOURSELF.
              </h2>
              <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem", maxWidth: "28rem", lineHeight: "1.6" }}>
                The next full moon run is open to anyone with shoes and a headlamp. Meeting point goes out a few days before.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={250}>
            <a
              href="#next-event"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("home", "#next-event");
              }}
              className="btn-gold"
            >
              JOIN THE NEXT RUN
            </a>
          </ScrollReveal>
        </div>
      </section>


      {/* ==================== 9. EXACT ABOUT FOOTER (NEW IMAGE 2) ==================== */}
            <Footer onNavigate={onNavigate} />
    </div>
  );
}
