// src/pages/public/Contact.jsx
import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";

export default function ContactPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [interest, setInterest] = useState("Full Moon Run");
  const [openFaq, setOpenFaq] = useState(1);

  const interests = ["Full Moon Run", "Specialized Event", "Curated Trail Trip"];

  const faqs = [
    {
      q: "Do I need to be a fast runner to join a full moon run?",
      a: "No. Runs are organised into pace groups with a sweep runner at the back, and there is always a shorter distance option. If you can cover the short option at any pace, you can join.",
    },
    {
      q: "How do I find out the date and meeting point?",
      a: "Routes and meeting points are announced on Instagram and to our mailing list a few days before each run, once the route has been checked.",
    },
    {
      q: "Is it safe to run in Kathmandu at night?",
      a: "Routes are recced in advance, groups run together with a sweep runner, and busier heritage areas and lit roads are favoured over isolated back streets after dark.",
    },
    {
      q: "Can you organise a private event for my group?",
      a: "Yes. We handle route design, recon, permissions, lighting, marshals, a support vehicle and photography for birthdays, anniversaries, team days and other milestones.",
    },
    {
      q: "What does a curated trail trip cost?",
      a: "It depends on the region, group size, number of days and season. Send an enquiry with your rough dates and mileage and we'll come back with a quote.",
    },
  ];

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--color-black)", minHeight: "100vh", overflowX: "hidden" }}>
      <Header currentPath="contact" onNavigate={onNavigate} />

      {/* ===================== 1. HERO ===================== */}
      <section id="contact-hero" className="hero-section" style={{ minHeight: "68vh" }}>
        <div className="hero-bg">
          <img
            src="/src/assets/group2.jpg"
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
              <span>CONTACT</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={900}>
            <h1 className="hero-headline">
              LET'S PLAN
              <br />
              YOUR RUN.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={350}>
            <p className="hero-subtext">
              Community run questions, private events, trail trips — tell us what you have in mind and we'll come back with a plan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===================== 2. FORM + SIDE INFO ===================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "5rem 1.5rem" }}>
        <div className="container-max contact-form-grid">
          {/* Left: Form */}
          <div className="contact-form-col">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                <span>ENQUIRY</span>
              </div>
              <h2 className="story-headline" style={{ marginBottom: "2rem" }}>SEND US THE DETAILS</h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200}>
              <form onSubmit={(e) => e.preventDefault()} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" placeholder="you@email.com" className="form-input" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" placeholder="+977" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Group Size</label>
                    <input type="number" min="1" placeholder="1" className="form-input" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Interest</label>
                    <div className="interest-btn-group">
                      {interests.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInterest(opt)}
                          className={`interest-btn ${interest === opt ? "active" : ""}`}
                        >
                          {opt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea rows="5" placeholder="Where do you want to run, and when?" className="form-input form-textarea" />
                </div>

                <button type="submit" className="btn-dark-green" style={{ marginTop: "0.5rem" }}>
                  SEND ENQUIRY
                </button>
              </form>
            </ScrollReveal>
          </div>

          {/* Right: Side info */}
          <div className="contact-side-col">
            <ScrollReveal variant="fade-left" delay={200} duration={800}>
              <div className="contact-dark-box">
                <div className="contact-dark-label">REACH US</div>
                <div className="contact-reach-item">
                  <span className="contact-reach-icon">◎</span>
                  <span>@kathmandunightrun</span>
                </div>
                <div className="contact-reach-item">
                  <span className="contact-reach-icon">✉</span>
                  <span>hello@kathmandunightrun.com</span>
                </div>
                <div className="contact-reach-item">
                  <span className="contact-reach-icon">📍</span>
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={300} duration={800}>
              <div className="contact-info-box">
                <div className="contact-info-title">CUSTOM TRIP ENQUIRY</div>
                <p className="contact-info-text">
                  For multi-day trail journeys, include your dates, weekly mileage, group size and which regions interest you. That is usually enough for us to send back a draft itinerary.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={400} duration={800}>
              <div className="contact-map-box">
                <svg viewBox="0 0 400 220" className="contact-map-svg">
                  <path d="M15,140 L50,110 L70,120 L95,90 L130,95 L150,70 L180,80 L205,55 L230,65 L255,45 L280,60 L305,50 L330,75 L360,70 L385,95"
                    fill="none" stroke="var(--color-gold)" strokeWidth="1.4" opacity="0.55" />
                  <path d="M20,155 L55,128 L78,136 L100,108 L135,112 L155,88 L183,96 L208,72 L233,80 L258,62 L282,76 L308,66 L333,90 L362,86 L388,110"
                    fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.35" />
                  <path d="M25,170 L60,146 L82,152 L105,126 L138,130 L158,106 L185,113 L210,90 L235,97 L260,80 L284,92 L310,83 L335,105 L363,102 L389,124"
                    fill="none" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.22" />
                </svg>
                <div className="contact-map-caption">
                  <div className="contact-map-label">BASED IN</div>
                  <div className="contact-map-place">KATHMANDU, NEPAL</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===================== 3. FAQ ACCORDION ===================== */}
      <section style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)", padding: "0 1.5rem 5rem" }}>
        <div className="container-max faq-grid">
          <div className="faq-col-left">
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                <span>FAQ</span>
              </div>
              <h2 className="story-headline">BEFORE YOU ASK</h2>
            </ScrollReveal>
          </div>

          <div className="faq-col-right">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={item.q} variant="fade-up" delay={120 * (idx + 1)} duration={700}>
                  <div className="faq-item">
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q.toUpperCase()}</span>
                      <span className={`faq-icon ${isOpen ? "open" : ""}`}>⌄</span>
                    </button>
                    <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}