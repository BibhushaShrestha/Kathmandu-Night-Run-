import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import nightrun3 from "../assets/nightrun3.jpg";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Background Image & Vignette Overlays */}
      <div className="hero-bg">
         <img
          src={nightrun3}
          alt="running by carrying headlamp"
          className="hero-img"
        />

        <div className="hero-overlay-top" />
        <div className="hero-overlay-left" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <ScrollReveal variant="fade-down" delay={100}>
          <div className="eyebrow">
            <span className="eyebrow-dash" />
            <span>KATHMANDU · NEPAL · SINCE THE FIRST FOUR</span>
          </div>
        </ScrollReveal>

        {/* Big Display Headline */}
        <ScrollReveal variant="fade-up" delay={200} duration={900}>
          <h1 className="hero-headline">
            RUN WHERE
            <br />
            THE CITY SLEEPS.
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal variant="fade-up" delay={350}>
          <p className="hero-subtext">
           Explore beyond the tourist trail with full moon runs, curated trail vacations and running experiences that take you deeper into Nepal — its trails, temples, communities and culture.

          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal variant="fade-up" delay={450}>
          <div className="hero-buttons">
            <a href="#next-event" className="btn-gold">
              JOIN THE NEXT FULL MOON RUN
            </a>
            <a href="#services" className="btn-outline">
              PLAN A TRAIL RUNNING TRIP
            </a>
          </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <ScrollReveal variant="fade-up" delay={550}>
          <div className="hero-bottom-bar">
            <span>EXPERIENCE KATHMANDU AFTER DARK.</span>
            <a href="#our-story" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>SCROLL</span>
              <span>↓</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
