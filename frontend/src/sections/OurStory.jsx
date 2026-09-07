import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function OurStory() {
  return (
    <section id="our-story" className="story-section">
      <div className="container-max story-grid">
        
        {/* Left Side: Photo with Badge */}
        <div className="story-col-left" style={{ position: "relative" }}>
          <ScrollReveal variant="fade-right" delay={100} duration={900}>
            <div className="story-img-container">
              <img
                src="/images/our_story.jpg"
                alt="Four friends overlooking Kathmandu after dark"
                className="story-img"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              />
            </div>

            {/* Badge at Bottom-Left */}
            <div className="story-badge">
              FOUR FRIENDS. ONE LATE IDEA.
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Narrative Text */}
        <div className="story-col-right" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Eyebrow */}
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>OUR STORY</span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal variant="fade-up" delay={250} duration={850}>
            <h2 className="story-headline">
              WHAT DOES KATHMANDU LOOK LIKE WHEN THE CITY GOES QUIET?
            </h2>
          </ScrollReveal>

          {/* Body Paragraphs */}
          <ScrollReveal variant="fade-up" delay={350}>
            <div className="story-body">
              <p>
                Kathmandu Night Run started with four friends exploring Kathmandu after dark. No route, no plan, a couple of torches between them and a suspicion that the city was more interesting once it stopped shouting.
              </p>
              <p>
                What began as those late runs grew into a running community — and then into an adventure-running venture that designs private night events and curated trail journeys across Nepal.
              </p>
            </div>
          </ScrollReveal>

          {/* Action Link */}
          <ScrollReveal variant="fade-up" delay={450}>
            <div style={{ marginTop: "2rem" }}>
              <a
                href="#about"
                className="link-arrow"
                style={{ color: "var(--color-green)", borderBottom: "1px solid currentColor", paddingBottom: "0.25rem" }}
              >
                <span>OUR STORY</span>
                <span>↗</span>
              </a>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
