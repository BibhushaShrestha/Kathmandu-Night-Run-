import React from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import viewImage from "../assets/view.jpg";

export default function AfterDark() {
  return (
    <section id="after-dark" className="afterdark-section">
      <div className="container-max afterdark-grid">
        <div className="afterdark-col-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="eyebrow">
              <span className="eyebrow-dash" />
              <span>KATHMANDU 27°42'N</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={850}>
            <h2 className="afterdark-headline">KATHMANDU<br />AFTER DARK.</h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300}>
            <p style={{ marginTop: "1.5rem", color: "var(--color-text-muted)", fontSize: "1.0625rem", lineHeight: "1.6", maxWidth: "28rem" }}>
              Moonlit temples. Hidden trails. A side of Kathmandu most people never see.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={400}>
            <div style={{ marginTop: "2rem" }}>
              <a href="#gallery" className="link-arrow" style={{ color: "var(--color-black)", borderBottom: "2px solid var(--color-gold)", paddingBottom: "0.25rem" }}>
                <span>SEE THE NIGHT</span><span>↗</span>
              </a>
            </div>
          </ScrollReveal>
        </div>

        <div className="afterdark-col-right">
          <ScrollReveal variant="fade-left" delay={250} duration={900}>
            <div className="afterdark-img-box">
              <img src={viewImage} alt="Kathmandu after dark moonlit stupa"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(150%) brightness(90%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
              <div className="afterdark-img-tag">MOONLIT TRAILS & TEMPLES</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
