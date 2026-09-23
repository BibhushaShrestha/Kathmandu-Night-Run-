import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/public/Home.jsx";
import AboutPage from "./pages/public/About.jsx";
import ServicesPage from "./pages/public/Services.jsx";
import EventsPage from "./pages/public/Events.jsx";
import ContactPage from "./pages/public/Contact.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import { adminAuthService } from "./services/api";

/* ─── Guard: token nabhaye /admin/login ma pathaune ─── */
function ProtectedRoute({ children }) {
  if (!adminAuthService.isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

/* ─── Public Site Shell ─── */
function PublicShell() {
  const [currentPath, setCurrentPath] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#about" || hash.includes("about-hero")) {
        setCurrentPath("about");
      } else if (hash.includes("services-hero")) {
        setCurrentPath("services");
      } else if (hash.includes("events-hero")) {
        setCurrentPath("events");
      } else if (hash.includes("contact-hero")) {
        setCurrentPath("contact");
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
        window.location.hash = "about-hero";
      } else if (targetPath === "services") {
        window.location.hash = "services-hero";
      } else if (targetPath === "events") {
        window.location.hash = "events-hero";
      } else if (targetPath === "contact") {
        window.location.hash = "contact-hero";
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
      ) : currentPath === "services" ? (
        <ServicesPage onNavigate={handleNavigate} />
      ) : currentPath === "events" ? (
        <EventsPage onNavigate={handleNavigate} />
      ) : currentPath === "contact" ? (
        <ContactPage onNavigate={handleNavigate} />
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
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <AdminDashboard initialTab="events" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/routes"
        element={
          <ProtectedRoute>
            <AdminDashboard initialTab="routes" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <AdminDashboard initialTab="gallery" />
          </ProtectedRoute>
        }
      />

      {/* Public Routes — catch-all for existing hash-based navigation */}
      <Route path="*" element={<PublicShell />} />
    </Routes>
  );
}

export default App;