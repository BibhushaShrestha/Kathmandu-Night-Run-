import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/public/Home.jsx";
import AboutPage from "./pages/public/About.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

/* ─── Public Site Shell ─── */
function PublicShell() {
  const [currentPath, setCurrentPath] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#about" || hash.includes("about")) {
        setCurrentPath("about");
      } else if (hash === "#home" || hash === "#hero" || hash === "") {
        setCurrentPath("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (targetPath, targetHash) => {
    if (targetPath === currentPath) {
      if (targetHash) {
        const elem = document.querySelector(targetHash);
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPath(targetPath);
      window.scrollTo({ top: 0, behavior: "instant" });
      if (targetPath === "about") {
        window.location.hash = "about";
      } else if (targetHash) {
        window.location.hash = targetHash.replace("#", "");
      } else {
        window.location.hash = "home";
      }

      setTimeout(() => {
        setIsTransitioning(false);
        if (targetHash && targetPath === "home") {
          const elem = document.querySelector(targetHash);
          if (elem) elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }, 250);
  };

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {currentPath === "about" ? (
        <AboutPage onNavigate={handleNavigate} />
      ) : (
        <HomePage onNavigate={handleNavigate} />
      )}
    </div>
  );
}

/* ─── App Router ─── */
function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/events" element={<AdminDashboard initialTab="events" />} />
      <Route path="/admin/gallery" element={<AdminDashboard initialTab="gallery" />} />

      {/* Public Routes — catch-all for existing hash-based navigation */}
      <Route path="*" element={<PublicShell />} />
    </Routes>
  );
}

export default App;