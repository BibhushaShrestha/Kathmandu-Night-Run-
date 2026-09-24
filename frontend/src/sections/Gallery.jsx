// src/sections/Gallery.jsx
import ScrollReveal from "../components/ScrollReveal.jsx";
import group1 from "../assets/group1.jpg";
import group2 from "../assets/group2.jpg";
import group3 from "../assets/group3.jpg";
import fullmoonrun from "../assets/fullmoonrun.jpg";
import kathmandu_valley from "../assets/kathmandu_valley.jpg";
import temple from "../assets/temple.jpg";

export default function Gallery() {
  const photos = [
    { src: fullmoonrun, alt: "Runners posing at a stupa at night" }, // pos 1 (col1, row1)
    { src: group2, alt: "Group cheering in a night street" }, // pos 2 (col2, row1)
    { src: group3, alt: "Group photo on a footbridge" }, // pos 3 (col3, tall)
    { src: group1, alt: "Runners posing with headlamps" }, // pos 4 (col4, row1)
    { src: kathmandu_valley, alt: "Kathmandu valley skyline at night" }, // pos 5 (col1, row2)
    { src: temple, alt: "Moonlit temple bell close-up" }, // pos 6 (col4, row2)
  ];

  return (
    <section id="gallery" className="gallery-section">
      <div className="container-max">
        {/* Header */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="threeways-header">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                <span>GALLERY</span>
              </div>
              <h2 className="threeways-title">SHOT AT NIGHT.</h2>
            </div>
            <a
              href="#gallery-full"
              className="link-arrow"
              style={{ color: "var(--color-gold)" }}
            >
              <span>VIEW GALLERY</span>
              <span>↗</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Photo Grid */}
        <div className="gallery-grid">
          {photos.map((p, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-up"
              delay={100 * (idx + 1)}
              duration={700}
              className={`gallery-item gallery-pos-${idx + 1}`}
            >
              <img src={p.src} alt={p.alt} className="gallery-img" />
            </ScrollReveal>
          ))}
        </div>

        {/* Caption */}
        <ScrollReveal variant="fade-up" delay={500}>
          <p className="gallery-caption">TAG @OFFROUTE TO BE FEATURED.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
