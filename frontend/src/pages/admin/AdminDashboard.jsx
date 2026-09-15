import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";
import Navbar from "../../components/admin/Navbar.jsx";
import PageHeader from "../../components/admin/PageHeader.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import EventsManagement from "./EventsManagement.jsx";
import RoutesManagement from "./RoutesManagement.jsx";
import GalleryManagement from "./GalleryManagement.jsx";
import "../../admin.css";

export default function AdminDashboard({ initialTab = "dashboard" }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(initialTab);

  const handleLogout = () => {
    navigate("/admin/login");
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Full Moon Run",
      date: "2026-09-18",
      time: "19:30",
      location: "Boudhanath Stupa",
      status: "published",
      thumb: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=140&q=80"
    },
    {
      id: 2,
      title: "Shivapuri Night Trail",
      date: "2026-09-27",
      time: "18:45",
      location: "Shivapuri National Park",
      status: "upcoming",
      thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=140&q=80"
    },
    {
      id: 3,
      title: "Kathmandu Heritage Run",
      date: "2026-10-05",
      time: "20:00",
      location: "Patan Durbar Square",
      status: "draft",
      thumb: null
    }
  ];

  // Recent activity data
  const recentActivity = [
    { id: 1, text: "New event created — Shivapuri Night Trail", time: "2 hours ago", icon: "calendar" },
    { id: 2, text: "6 images uploaded to Valley Night Run", time: "Yesterday", icon: "image" },
    { id: 3, text: "Field Note published — Headlamps, Layers and Cold Hands", time: "2 days ago", icon: "file" },
    { id: 4, text: "New message from Anisha Karki", time: "3 days ago", icon: "mail" },
    { id: 5, text: "Event updated — Full Moon Run", time: "5 days ago", icon: "edit" }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "calendar":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case "image":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
        );
      case "file":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
        );
      case "mail":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case "edit":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "published": return "Published";
      case "upcoming": return "Upcoming";
      case "draft": return "Draft";
      default: return status;
    }
  };

  return (
    <div className="admin-layout-root">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 35,
          }}
        />
      )}

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Navbar */}
        <Navbar onMobileToggle={() => setMobileOpen(!mobileOpen)} />

        {/* Content Area */}
        <main className="admin-content-body">
          {currentTab === "events" ? (
            <EventsManagement />
          ) : currentTab === "routes"? <RoutesManagement /> 
            :currentTab === "gallery" ? (
            <GalleryManagement />
          ) : (
            <>
              {/* Greeting Header */}
              <PageHeader
                title={`${getGreeting()}, Bibhusha`}
                subtitle="Here's what's happening with Kathmandu Night Run."
              />

              {/* Stat Cards */}
              <div className="admin-stats-grid">
                <StatCard
                  label="Upcoming Events"
                  value="3"
                  subtext="Next 60 days"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  }
                />
                <StatCard
                  label="Gallery Images"
                  value="6"
                  subtext="Across all events"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  }
                />
                <StatCard
                  label="Published Field Notes"
                  value="2"
                  subtext="1 in draft"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    </svg>
                  }
                />
                <StatCard
                  label="New Messages"
                  value="2"
                  subtext="Unread from contact form"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                />
              </div>

              {/* Quick Actions */}
              <div className="admin-quick-actions-section">
                <div className="admin-section-title">Quick Actions</div>
                <div className="admin-quick-actions-grid">
                  <button
                    className="admin-quick-action-btn"
                    onClick={() => setCurrentTab("events")}
                  >
                    <div className="admin-quick-action-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    + Add Event
                  </button>
                  <button className="admin-quick-action-btn">
                    <div className="admin-quick-action-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
                      </svg>
                    </div>
                    + Add Route
                  </button>
                  <button
                    className="admin-quick-action-btn"
                    onClick={() => setCurrentTab("gallery")}
                  >
                    <div className="admin-quick-action-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    + Upload Image
                  </button>
                  <button className="admin-quick-action-btn">
                    <div className="admin-quick-action-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    + Create Field Note
                  </button>
                </div>
              </div>

              {/* Two-Column Dashboard Section */}
              <div className="admin-dashboard-columns">
                {/* Left — Upcoming Events */}
                <div>
                  <div className="admin-card-header">
                    <div className="admin-section-title" style={{ marginBottom: 0 }}>Upcoming Events</div>
                    <a
                      href="#"
                      className="admin-card-header-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab("events");
                      }}
                    >
                      View all
                    </a>
                  </div>
                  <div className="admin-events-list">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="admin-event-item">
                        {event.thumb ? (
                          <img src={event.thumb} alt={event.title} className="admin-event-thumb" />
                        ) : (
                          <div
                            className="admin-event-thumb"
                            style={{
                              backgroundColor: "var(--admin-card-bg)",
                              border: "1px solid var(--admin-card-border)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--admin-text-dim)"
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        )}
                        <div className="admin-event-info">
                          <div className="admin-event-title">{event.title}</div>
                          <div className="admin-event-meta">
                            <span className="admin-event-meta-item">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              {event.date}
                            </span>
                            <span className="admin-event-meta-item">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                              </svg>
                              {event.time}
                            </span>
                            <span className="admin-event-meta-item">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                              </svg>
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <span className={`admin-badge ${event.status}`}>{getStatusLabel(event.status)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Recent Activity */}
                <div>
                  <div className="admin-activity-card">
                    <div className="admin-card-header">
                      <div className="admin-section-title" style={{ marginBottom: 0 }}>Recent Activity</div>
                    </div>
                    <div className="admin-activity-list">
                      {recentActivity.map((item) => (
                        <div key={item.id} className="admin-activity-item">
                          <div className="admin-activity-icon">
                            {getActivityIcon(item.icon)}
                          </div>
                          <div>
                            <div className="admin-activity-text">{item.text}</div>
                            <div className="admin-activity-time">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="admin-submit-btn"
                      style={{ marginTop: "auto" }}
                      onClick={() => setCurrentTab("messages")}
                    >
                      Review Messages
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
