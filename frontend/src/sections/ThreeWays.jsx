import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";


export default function ThreeWays() {
  const experiences = [
    {
      num: "01",
      title: "COMMUNITY RUN EVENTS",
      desc: "Every full moon, run Kathmandu's outskirts with the community.",
      cta: "EXPLORE FULL MOON RUNS",
      image: "/images/exp_community.jpg",
      href: "#next-event",
    },
    {
      num: "02",
      title: "SPECIALIZED RUNNING EVENTS",
      desc: "Custom running experiences for birthdays, celebrations and milestones.",
      cta: "PLAN YOUR EVENT",
      image: "/images/exp_specialized.jpg",
      href: "#services",
    },
    {
      num: "03",
      title: "CURATED TRAIL RUNNING",
      desc: "Custom trail-running journeys across Nepal.",
      cta: "PLAN YOUR TRAIL TRIP",
      image: "/images/exp_trail.jpg",
      href: "#services",
    },
  ];

  return (
    <section id="services" className="threeways-section">
      <div className="container-max">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="threeways-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                <span>THREE CORE EXPERIENCES</span>
              </div>
              <h2 className="threeways-title">
                THREE WAYS TO RUN NEPAL
              </h2>
            </div>
            
            <a href="#services" className="link-arrow" style={{ color: "var(--color-gold)", paddingBottom: "0.25rem" }}>
              <span>ALL SERVICES</span>
              <span>↗</span>
            </a>
          </div>
        </ScrollReveal>

        {/* List of 3 Experiences */}
        <div className="threeways-list">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={exp.num} variant="fade-up" delay={150 * (idx + 1)} duration={800}>
              <div className="threeways-row">
                {/* Number */}
                <span className="threeways-num">
                  {exp.num}
                </span>

                {/* Middle Content */}
                <div>
                  <h3 className="threeways-item-title">
                    {exp.title}
                  </h3>
                  <p className="threeways-item-desc">
                    {exp.desc}
                  </p>
                  <a href={exp.href} className="threeways-item-cta">
                    <span>{exp.cta}</span>
                    <span>→</span>
                  </a>
                </div>

                {/* Right Image */}
                <div className="threeways-img-box">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="threeways-img"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
