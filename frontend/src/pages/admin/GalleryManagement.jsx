import React, { useState, useRef, useEffect } from "react";

// Import images from assets directory
import group1 from "../../assets/group1.jpg";
import group2 from "../../assets/group2.jpg";
import group3 from "../../assets/group3.jpg";
import group4 from "../../assets/group4.jpg";

import nightRun from "../../assets/night_run.jpg";
import image from "../../assets/image.jpg";

export default function GalleryManagement() {
  // Initial gallery items matching the screenshot
  const initialItems = [
    {
      id: 1,
      title: "Start line at Chobhar",
      event: "Valley Night Run",
      date: "2026-08-14",
      src: group1,
      fallback: "/images/exp_community.jpg"
    },
    {
      id: 2,
      title: "Moonrise over Boudha",
      event: "Full Moon Run",
      date: "2026-07-21",
      src: group3,
      fallback: "/images/full_moon.jpg"
    },
    {
      id: 3,
      title: "Headlamps in the forest",
      event: "Shivapuri Night Trail",
      date: "2026-06-28",
      src: nightRun,
      fallback: "/images/exp_trail.jpg"
    },
    {
      id: 4,
      title: "Patan courtyard finish",
      event: "Kathmandu Heritage Run",
      date: "2026-06-02",
      src: group2,
      fallback: "/images/our_story.jpg"
    },
    {
      id: 5,
      title: "Ridge line at dusk",
      event: "Valley Night Run",
      date: "2026-05-18",
      src: group4,
      fallback: "/images/exp_specialized.jpg"
    },
    {
      id: 6,
      title: "Steps repeats",
      event: "Full Moon Run",
      date: "2026-05-04",
      src: image,
      fallback: "/images/full_moon.jpg"
    }
  ];

  const [galleryItems, setGalleryItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  // Edit form state matching Screenshot 1
  const [editForm, setEditForm] = useState({
    caption: "",
    event: "Valley Night Run",
    date: "",
    src: ""
  });

  // New image upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    event: "Full Moon Run",
    date: new Date().toISOString().split("T")[0],
    preview: ""
  });

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const eventOptions = [
    { id: "all", label: "All events" },
    { id: "Full Moon Run", label: "Full Moon Run" },
    { id: "Shivapuri Night Trail", label: "Shivapuri Night Trail" },
    { id: "Kathmandu Heritage Run", label: "Kathmandu Heritage Run" },
    { id: "Valley Night Run", label: "Valley Night Run" }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchEvent = item.event.toLowerCase().includes(q);
      if (!matchTitle && !matchEvent) return false;
    }

    if (selectedEvent !== "all" && item.event !== selectedEvent) {
      return false;
    }

    return true;
  });

  // Handle image upload
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadForm((prev) => ({ ...prev, preview: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.preview && !uploadForm.title.trim()) return;

    const newItem = {
      id: Date.now(),
      title: uploadForm.title.trim() || "Night Run Moment",
      event: uploadForm.event,
      date: uploadForm.date || new Date().toISOString().split("T")[0],
      src: uploadForm.preview || "/images/hero.jpg",
      fallback: "/images/hero.jpg"
    };

    setGalleryItems((prev) => [newItem, ...prev]);
    setIsUploadModalOpen(false);
    setUploadForm({
      title: "",
      event: "Full Moon Run",
      date: new Date().toISOString().split("T")[0],
      preview: ""
    });
  };

  // Delete item
  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this image from the gallery?")) {
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Open the edit modal, pre-filled with the clicked card's current data
  const openEditModal = (item, e) => {
    e.stopPropagation();
    setEditingItem(item);
    setEditForm({
      caption: item.title,
      event: item.event,
      date: item.date,
      src: item.src
    });
  };

  // Handle replacing the image while editing
  const handleEditFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm((prev) => ({ ...prev, src: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save the edited item back into the gallery list
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: editForm.caption.trim() || item.title,
              event: editForm.event,
              date: editForm.date || item.date,
              src: editForm.src || item.src
            }
          : item
      )
    );

    setEditingItem(null);
  };

  const currentEventLabel =
    eventOptions.find((opt) => opt.id === selectedEvent)?.label || "All events";

  return (
    <div className="admin-gallery-view">
      {/* Header Row */}
      <div className="admin-events-header">
        <div>
          <h1 className="admin-events-title">GALLERY</h1>
          <p className="admin-events-subtitle">
            Manage moments from the Kathmandu Night Run community.
          </p>
        </div>

        {/* Upload Images Button */}
        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="admin-btn-gold"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Images
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
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Events Dropdown */}
        <div className="admin-custom-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className={`admin-dropdown-btn ${dropdownOpen ? "active" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{currentEventLabel}</span>
            <svg
              className={`admin-dropdown-chevron ${dropdownOpen ? "open" : ""}`}
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

          {dropdownOpen && (
            <div className="admin-dropdown-menu">
              {eventOptions.map((opt) => {
                const isSelected = selectedEvent === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`admin-dropdown-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedEvent(opt.id);
                      setDropdownOpen(false);
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

      {/* Gallery Cards Grid */}
      <div className="admin-gallery-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="admin-gallery-card"
              onClick={() => setViewingItem(item)}
            >
              <div className="admin-gallery-card-img-wrapper">
                <img
                  src={item.src}
                  alt={item.title}
                  className="admin-gallery-card-img"
                  onError={(e) => {
                    if (item.fallback && e.target.src !== item.fallback) {
                      e.target.src = item.fallback;
                    }
                  }}
                />
                {/* Hover overlay: View / Edit / Delete */}
                <div className="admin-gallery-card-overlay">
                  <button
                    type="button"
                    className="admin-gallery-overlay-btn"
                    title="View image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingItem(item);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="admin-gallery-overlay-btn"
                    title="Edit image"
                    onClick={(e) => openEditModal(item, e)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="admin-gallery-overlay-btn delete"
                    title="Delete image"
                    onClick={(e) => handleDeleteItem(item.id, e)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="admin-gallery-card-body">
                <div className="admin-gallery-card-title">{item.title}</div>
                <div className="admin-gallery-card-event">{item.event}</div>
                <div className="admin-gallery-card-date">{item.date}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="admin-gallery-empty" style={{ gridColumn: "1 / -1" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5C6B61" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <div style={{ color: "#FFFFFF", fontWeight: 700, marginTop: "0.75rem" }}>
              No gallery images found
            </div>
            <p style={{ color: "#8A988E", fontSize: "0.8125rem", margin: "0.25rem 0 1rem" }}>
              Try adjusting your search query or event filter.
            </p>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => {
                setSearchQuery("");
                setSelectedEvent("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Upload Images Modal */}
      {isUploadModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsUploadModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2 className="admin-modal-title">UPLOAD TO GALLERY</h2>
                <p className="admin-modal-subtitle">
                  Add high-resolution moments from Kathmandu Night Run events.
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setIsUploadModalOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="admin-modal-form">
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">IMAGE TITLE</label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="admin-modal-input"
                  placeholder="e.g. Finish line celebration"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">EVENT</label>
                  <div className="admin-modal-select-wrapper">
                    <select
                      className="admin-modal-select"
                      value={uploadForm.event}
                      onChange={(e) => setUploadForm({ ...uploadForm, event: e.target.value })}
                    >
                      <option value="Full Moon Run">Full Moon Run</option>
                      <option value="Shivapuri Night Trail">Shivapuri Night Trail</option>
                      <option value="Kathmandu Heritage Run">Kathmandu Heritage Run</option>
                      <option value="Valley Night Run">Valley Night Run</option>
                    </select>
                    <div className="admin-modal-select-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">DATE</label>
                  <input
                    type="date"
                    required
                    className="admin-modal-input"
                    value={uploadForm.date}
                    onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">SELECT IMAGE</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                />
                {uploadForm.preview ? (
                  <div className="admin-modal-dropzone-preview" style={{ height: "140px" }}>
                    <img src={uploadForm.preview} alt="Upload preview" className="admin-modal-dropzone-img" />
                    <button
                      type="button"
                      className="admin-modal-dropzone-remove"
                      onClick={() => setUploadForm({ ...uploadForm, preview: "" })}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div
                    className="admin-modal-dropzone"
                    style={{ padding: "1.25rem" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="admin-modal-dropzone-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <span className="admin-modal-dropzone-text">
                      Click to choose image from assets / disk
                    </span>
                    <span className="admin-modal-dropzone-sub">
                      JPG, PNG, WebP up to 10MB
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-modal-cancel-btn"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-save-btn">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2 className="admin-modal-title">EDIT GALLERY IMAGE</h2>
                <p className="admin-modal-subtitle">
                  Update the caption, event or photo for this gallery item.
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setEditingItem(null)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="admin-modal-form">
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">IMAGE TITLE</label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="admin-modal-input"
                  placeholder="e.g. Finish line celebration"
                  value={editForm.caption}
                  onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">EVENT</label>
                  <div className="admin-modal-select-wrapper">
                    <select
                      className="admin-modal-select"
                      value={editForm.event}
                      onChange={(e) => setEditForm({ ...editForm, event: e.target.value })}
                    >
                      <option value="Full Moon Run">Full Moon Run</option>
                      <option value="Shivapuri Night Trail">Shivapuri Night Trail</option>
                      <option value="Kathmandu Heritage Run">Kathmandu Heritage Run</option>
                      <option value="Valley Night Run">Valley Night Run</option>
                    </select>
                    <div className="admin-modal-select-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">DATE</label>
                  <input
                    type="date"
                    required
                    className="admin-modal-input"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Replace Image Dropzone */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">IMAGE</label>
                <input
                  type="file"
                  ref={editFileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleEditFileSelect(e.target.files?.[0])}
                />
                <div className="admin-modal-dropzone-preview" style={{ height: "140px" }}>
                  <img src={editForm.src} alt="Current" className="admin-modal-dropzone-img" />
                  <button
                    type="button"
                    className="admin-modal-dropzone-remove"
                    onClick={() => editFileInputRef.current?.click()}
                    title="Replace image"
                  >
                    ✎
                  </button>
                </div>
                <span className="admin-modal-dropzone-sub" style={{ display: "block", marginTop: "0.4rem" }}>
                  Click the pencil icon to choose a new photo (optional)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-modal-cancel-btn"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {viewingItem && (
        <div className="admin-modal-backdrop" onClick={() => setViewingItem(null)}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: "720px", padding: "1.25rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header" style={{ marginBottom: "0.5rem" }}>
              <div>
                <h2 className="admin-modal-title" style={{ fontSize: "1.2rem" }}>
                  {viewingItem.title}
                </h2>
                <p className="admin-modal-subtitle">
                  {viewingItem.event} • {viewingItem.date}
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setViewingItem(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{ borderRadius: "8px", overflow: "hidden", maxHeight: "68vh", display: "flex", justifyContent: "center", backgroundColor: "#0A0D0B" }}>
              <img
                src={viewingItem.src}
                alt={viewingItem.title}
                style={{ width: "100%", maxHeight: "68vh", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
