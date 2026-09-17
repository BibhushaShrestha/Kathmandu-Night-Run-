import React, { useState, useRef, useEffect } from "react";
import { eventService } from "../../services/api";

export default function EventsManagement() {
  // Backend bata aaune real events - suru ma khali array
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Component mount huda backend bata events tanne
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await eventService.getAll();
        // MongoDB le "_id" pathaucha, tara UI ma "id" use bhako cha - map garne
        setEvents(data.map((ev) => ({ ...ev, id: ev._id })));
        setLoadError("");
      } catch (err) {
        setLoadError(err.message || "Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Dropdown open states
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  // Form state for add/edit matching the exact modal fields
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    status: "Draft",
    description: "",
    thumb: ""
  });

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);

  // Status options matching screenshot 2
  const statusOptions = [
    { id: "all", label: "All statuses" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Draft" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" }
  ];

  // Date filter options
  const dateOptions = [
    { id: "all", label: "All dates" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter events logic
  const filteredEvents = events.filter((ev) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchLocation = ev.location.toLowerCase().includes(q);
      if (!matchTitle && !matchLocation) return false;
    }

    // Status filter match
    if (statusFilter !== "all" && ev.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    // Date filter match
    if (dateFilter === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      if (ev.date < today && ev.status !== "upcoming") return false;
    } else if (dateFilter === "past") {
      const today = new Date().toISOString().split("T")[0];
      if (ev.date >= today && ev.status !== "completed") return false;
    }

    return true;
  });

  // Toggle publish / unpublish status
  const handleTogglePublish = async (id) => {
    const target = events.find((ev) => ev.id === id);
    if (!target) return;
    const isPublishedOrUpcoming = target.status === "published" || target.status === "upcoming";
    const newStatus = isPublishedOrUpcoming ? "draft" : "published";

    try {
      const updated = await eventService.update(id, { status: newStatus });
      setEvents((prev) =>
        prev.map((ev) => (ev.id === id ? { ...updated, id: updated._id } : ev))
      );
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await eventService.remove(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete event");
    }
  };

  // Handle file select or drag drop for event image
  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, thumb: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Event Modal
  const openAddModal = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      distance: "",
      elevation: "",
      difficulty: "Moderate",
      status: "Draft",
      description: "",
      thumb: ""
    });
    setEditingEvent(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Event Modal
  const openEditModal = (ev) => {
    setFormData({
      title: ev.title || "",
      date: ev.date || "",
      time: ev.time || "",
      location: ev.location || "",
      distance: ev.distance || "",
      elevation: ev.elevation || "120 m",
      difficulty: ev.difficulty || "Moderate",
      status: ev.status ? (ev.status.charAt(0).toUpperCase() + ev.status.slice(1).toLowerCase()) : "Draft",
      description: ev.description || "",
      thumb: ev.thumb || ""
    });
    setEditingEvent(ev);
    setIsAddModalOpen(true);
  };

  // Save Event (Add or Edit) - backend sanga sync garne
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    const eventTitle = formData.title.trim() || "Full Moon Run";
    const eventDate = formData.date || "2026-09-18";
    const eventTime = formData.time || "19:30";
    const eventLocation = formData.location.trim() || "Boudhanath Stupa";
    const eventDistance = formData.distance.trim() || "10 km";
    const eventStatus = (formData.status || "Draft").toLowerCase();

    const payload = {
      ...formData,
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      distance: eventDistance,
      status: eventStatus,
      thumb:
        formData.thumb ||
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=140&q=80"
    };

    try {
      if (editingEvent) {
        const updated = await eventService.update(editingEvent.id, payload);
        setEvents((prev) =>
          prev.map((item) =>
            item.id === editingEvent.id ? { ...updated, id: updated._id } : item
          )
        );
      } else {
        const created = await eventService.create(payload);
        setEvents((prev) => [{ ...created, id: created._id }, ...prev]);
      }
      setIsAddModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      alert(err.message || "Failed to save event");
    }
  };

  const currentStatusLabel =
    statusOptions.find((opt) => opt.id === statusFilter)?.label || "All statuses";
  const currentDateLabel =
    dateOptions.find((opt) => opt.id === dateFilter)?.label || "All dates";

  return (
    <div className="admin-events-view">
      {/* Page Header */}
      <div className="admin-events-header">
        <div>
          <h1 className="admin-events-title">EVENTS</h1>
          <p className="admin-events-subtitle">
            Manage upcoming and past Kathmandu Night Run events.
          </p>
        </div>

        {/* Add Event Button */}
        <button
          type="button"
          onClick={openAddModal}
          className="admin-btn-gold"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-events-filter-bar">
        {/* Search Input */}
        <div className="admin-search-wrapper">
          <div className="admin-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Dropdown */}
        <div className="admin-custom-dropdown" ref={statusDropdownRef}>
          <button
            type="button"
            className={`admin-dropdown-btn ${statusDropdownOpen ? "active" : ""}`}
            onClick={() => {
              setStatusDropdownOpen(!statusDropdownOpen);
              setDateDropdownOpen(false);
            }}
          >
            <span>{currentStatusLabel}</span>
            <svg
              className={`admin-dropdown-chevron ${statusDropdownOpen ? "open" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {statusDropdownOpen && (
            <div className="admin-dropdown-menu">
              {statusOptions.map((opt) => {
                const isSelected = statusFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`admin-dropdown-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setStatusFilter(opt.id);
                      setStatusDropdownOpen(false);
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="admin-dropdown-item-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dates Dropdown */}
        <div className="admin-custom-dropdown" ref={dateDropdownRef}>
          <button
            type="button"
            className={`admin-dropdown-btn ${dateDropdownOpen ? "active" : ""}`}
            onClick={() => {
              setDateDropdownOpen(!dateDropdownOpen);
              setStatusDropdownOpen(false);
            }}
          >
            <span>{currentDateLabel}</span>
            <svg
              className={`admin-dropdown-chevron ${dateDropdownOpen ? "open" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dateDropdownOpen && (
            <div className="admin-dropdown-menu">
              {dateOptions.map((opt) => {
                const isSelected = dateFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`admin-dropdown-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setDateFilter(opt.id);
                      setDateDropdownOpen(false);
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="admin-dropdown-item-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Events Table Container */}
      <div className="admin-table-container">
        <div className="admin-table-responsive">
          <table className="admin-events-table">
            <thead>
              <tr>
                <th>EVENT</th>
                <th>DATE &amp; TIME</th>
                <th>LOCATION</th>
                <th>DISTANCE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  const isPublishedOrUpcoming =
                    event.status === "published" || event.status === "upcoming";

                  return (
                    <tr key={event.id}>
                      {/* Event (Thumb + Title) */}
                      <td>
                        <div className="admin-event-cell">
                          {event.thumb ? (
                            <img
                              src={event.thumb}
                              alt={event.title}
                              className="admin-event-cell-thumb"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=140&q=80";
                              }}
                            />
                          ) : (
                            <div className="admin-event-cell-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5C6B61" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                            </div>
                          )}
                          <span className="admin-event-cell-title">{event.title}</span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td>
                        <div className="admin-datetime-cell">
                          <span className="admin-datetime-date">{event.date}</span>
                          <span className="admin-datetime-time">{event.time}</span>
                        </div>
                      </td>

                      {/* Location */}
                      <td>{event.location}</td>

                      {/* Distance */}
                      <td>{event.distance}</td>

                      {/* Status */}
                      <td>
                        <span className={`admin-badge-pill ${event.status.toLowerCase()}`}>
                          {event.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="admin-actions-cell">
                          {/* View */}
                          <button
                            type="button"
                            className="admin-action-icon-btn"
                            title="View Event Details"
                            onClick={() => setViewingEvent(event)}
                          >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            className="admin-action-icon-btn"
                            title="Edit Event"
                            onClick={() => openEditModal(event)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            </svg>
                          </button>

                          {/* Publish / Unpublish Toggle */}
                          <button
                            type="button"
                            className="admin-action-text-btn"
                            onClick={() => handleTogglePublish(event.id)}
                          >
                            {isPublishedOrUpcoming ? "Unpublish" : "Publish"}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            className="admin-action-icon-btn delete"
                            title="Delete Event"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="admin-empty-state">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <div className="admin-empty-state-title">No events found</div>
                      <p style={{ margin: 0 }}>Try clearing filters or search query to see events.</p>
                      <button
                        type="button"
                        className="admin-btn-secondary"
                        onClick={() => {
                          setSearchQuery("");
                          setStatusFilter("all");
                          setDateFilter("all");
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Event Modal matching the user's screenshot */}
      {isAddModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2 className="admin-modal-title">
                  {editingEvent ? "EDIT EVENT" : "ADD EVENT"}
                </h2>
                <p className="admin-modal-subtitle">
                  Fill in the details for this night run.
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
                title="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="admin-modal-form">
              {/* EVENT TITLE */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">EVENT TITLE</label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="admin-modal-input"
                  placeholder="Full Moon Run"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* DATE & TIME */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">DATE</label>
                  <div className="admin-modal-input-icon-wrapper">
                    <input
                      type="text"
                      className="admin-modal-input"
                      placeholder="mm/dd/yyyy"
                      value={formData.date}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    <div className="admin-modal-input-right-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">TIME</label>
                  <div className="admin-modal-input-icon-wrapper">
                    <input
                      type="text"
                      className="admin-modal-input"
                      placeholder="--:-- --"
                      value={formData.time}
                      onFocus={(e) => (e.target.type = "time")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                    <div className="admin-modal-input-right-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">LOCATION</label>
                <input
                  type="text"
                  className="admin-modal-input"
                  placeholder="Boudhanath Stupa"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              {/* DISTANCE & ELEVATION */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">DISTANCE</label>
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="10 km"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  />
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">ELEVATION</label>
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="120 m"
                    value={formData.elevation}
                    onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                  />
                </div>
              </div>

              {/* DIFFICULTY & STATUS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">DIFFICULTY</label>
                  <div className="admin-modal-select-wrapper">
                    <select
                      className="admin-modal-select"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Hard">Hard</option>
                      <option value="Challenging">Challenging</option>
                    </select>
                    <div className="admin-modal-select-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">STATUS</label>
                  <div className="admin-modal-select-wrapper">
                    <select
                      className="admin-modal-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <div className="admin-modal-select-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">DESCRIPTION</label>
                <textarea
                  className="admin-modal-textarea"
                  placeholder="What makes this run special?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* EVENT IMAGE */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">EVENT IMAGE</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />
                {formData.thumb ? (
                  <div className="admin-modal-dropzone-preview">
                    <img src={formData.thumb} alt="Event Preview" className="admin-modal-dropzone-img" />
                    <button
                      type="button"
                      className="admin-modal-dropzone-remove"
                      onClick={() => setFormData({ ...formData, thumb: "" })}
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div
                    className={`admin-modal-dropzone ${dragOver ? "dragover" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleFileChange(e.dataTransfer.files?.[0]);
                    }}
                  >
                    <div className="admin-modal-dropzone-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                        <polyline points="12 12 12 16" />
                        <polyline points="9 13 12 10 15 13" />
                      </svg>
                    </div>
                    <span className="admin-modal-dropzone-text">
                      Drag and drop, or click to browse
                    </span>
                    <span className="admin-modal-dropzone-sub">
                      PNG or JPG up to 5MB
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-modal-cancel-btn"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-save-btn">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Event Modal */}
      {viewingEvent && (
        <div className="admin-modal-backdrop" onClick={() => setViewingEvent(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Event Details</h2>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setViewingEvent(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {viewingEvent.thumb && (
                <img
                  src={viewingEvent.thumb}
                  alt={viewingEvent.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                />
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#FFFFFF", margin: 0 }}>
                  {viewingEvent.title}
                </h3>
                <span className={`admin-badge-pill ${viewingEvent.status.toLowerCase()}`}>
                  {viewingEvent.status.toUpperCase()}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", color: "#C0CBC4", fontSize: "0.875rem" }}>
                <div>
                  <span style={{ color: "#68796E", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Date &amp; Time
                  </span>
                  <strong>{viewingEvent.date} at {viewingEvent.time}</strong>
                </div>
                <div>
                  <span style={{ color: "#68796E", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Distance
                  </span>
                  <strong>{viewingEvent.distance}</strong>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <span style={{ color: "#68796E", display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Location
                  </span>
                  <strong>{viewingEvent.location}</strong>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setViewingEvent(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="admin-btn-gold"
                  onClick={() => {
                    const target = viewingEvent;
                    setViewingEvent(null);
                    openEditModal(target);
                  }}
                >
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
