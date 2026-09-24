import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import group1 from "../assets/group1.jpg";
import view from "../assets/view.jpg";
import nightrun2 from "../assets/nightrun2.jpg";
import temple from "../assets/temple.jpg";


export default function RunWithUs() {
  const events = [
    {
      tag: "FULL MOON",
      title: "Full Moon Run",
      sub: "To be announced",
      rows: ["Kathmandu Valley outskirts", "To be announced", "To be announced"],
      image: group1,
    },
    {
      tag: "FULL MOON",
      title: "Kathmandu After Dark — Heritage Loop",
      sub: "To be announced",
      rows: ["Inner Kathmandu", "To be announced", "To be announced"],
      image: view,
    },
   
    {
      tag: "TRAIL RUNS",
      title: "Nepal Trail Running Journey",
      sub: "Departures on request",
      rows: ["Pokhara · Dhading · Mustang", "Built to your weekly mileage", "Moderate to hard"],
      image: nightrun2,
    },
     {
      tag: "SPECIAL EVENTS",
      title: "Private Milestone Night Run",
      sub: "By arrangement",
      rows: ["Kathmandu Valley or chosen location", "Designed with you", "Designed with you"],
      image: temple,
    },
  ];

  return (
    <section id="run-with-us" className="runwithus-section">
      <div className="container-max">
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="threeways-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                <span>UPCOMING</span>
              </div>
              <h2 className="threeways-title">
                RUN WITH US.
              </h2>
            </div>
            <a href="#events" className="link-arrow" style={{ color: "var(--color-gold)" }}>
              <span>ALL EVENTS</span>
              <span>↗</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Event Cards Grid */}
        <div className="events-grid">
          {events.map((ev, idx) => (
            <ScrollReveal key={ev.title} variant="fade-up" delay={120 * (idx + 1)} duration={800}>
              <div className="event-card">
                <div className="event-card-img-box">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="event-card-img"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  />
                </div>
                
                <span className="event-tag">{ev.tag}</span>
                
                <h3 className="event-title">
                  {ev.title}
                </h3>
                
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{ev.sub}</p>
                
                <div className="event-rows">
                  {ev.rows.map((r, i) => (
                    <p key={i} className="event-row-item">{r}</p>
                  ))}
                </div>
                
                <a href="#register" className="link-arrow" style={{ color: "var(--color-text-light)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
                  <span>DETAILS</span>
                  <span>→</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
