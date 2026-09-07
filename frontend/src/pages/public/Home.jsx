import React from "react";
import Header from "../../components/Header.jsx";
import Hero from "../../sections/Hero.jsx";
import OurStory from "../../sections/OurStory.jsx";
import ThreeWays from "../../sections/ThreeWays.jsx";
import FullMoonEvent from "../../sections/FullMoonEvent.jsx";
import AfterDark from "../../sections/AfterDark.jsx";
import RunWithUs from "../../sections/RunWithUs.jsx";
import FieldNotes from "../../sections/FieldNotes.jsx";
import Testimonials from "../../sections/Testimonials.jsx";
import CTAFooter from "../../sections/CTAFooter.jsx";

export default function HomePage({ onNavigate }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-black)", backgroundColor: "var(--color-black)", minHeight: "100vh", overflowX: "hidden" }}>
      <Header currentPath="home" onNavigate={onNavigate} />
      <Hero />
      <OurStory />
      <ThreeWays />
      <FullMoonEvent />
      <AfterDark />
      <RunWithUs />
      <FieldNotes />
      <Testimonials />
      <CTAFooter />
    </div>
  );
}
