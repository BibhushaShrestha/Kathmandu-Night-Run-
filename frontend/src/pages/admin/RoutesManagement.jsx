import React, { useState, useRef, useEffect } from "react";

// Route thumbnail images from assets
import group1 from "../../assets/group1.jpg";
import nightrun2 from "../../assets/nightrun2.jpg";
import kathmanduValley from "../../assets/kathmandu_valley.jpg";
import view from "../../assets/view.jpg";

export default function RoutesManagement() {
  // Initial routes matching the screenshot
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: "Bagmati Riverside",
      location: "Teku to Sankhamul",
      description: "Flat, well-lit corridor. Great for first-timers and recovery nights.",
      distance: "9 km",
      elevation: "80 m",
      difficulty: "Easy",
      image: group1
    },
    {
      id: 2,
      name: "Godavari Dark Trail",
      location: "Phulchowki base",
      description: "The valley's toughest night line. Support vehicle recommended.",
      distance: "21 km",
      elevation: "1100 m",
      difficulty: "Hard",
      image: nightrun2
    },
    {
      id: 3,
      name: "Nagarjun Ridge Loop",
      location: "Nagarjun Forest Reserve",
      description: "Steady forest climb to the viewpoint, fast descent on fire road.",
      distance: "16 km",
      elevation: "760 m",
      difficulty: "Hard",
      image: kathmanduValley
    },
    {
      id: 4,
      name: "Swayambhu Steps",
      location: "Swayambhunath",
      description: "365 steps repeats with prayer flags and city lights below.",
      distance: "7 km",
      elevation: "310 m",
      difficulty: "Moderate",
      image: view
    }
  ]);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Dropdown open states
  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    distance: "",
    elevation: "",
    difficulty: "Easy",
    location: "",
    description: "",
    image: ""
  });

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const difficultyDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const difficultyOptions = [
    { id: "all", label: "All difficulties" },
    { id: "easy", label: "Easy" },
    { id: "moderate", label: "Moderate" },
    { id: "hard", label: "Hard" }
  ];

  const sortOptions = [
    { id: "name", label: "Sort: Name" },
    { id: "distance", label: "Sort: Distance" },
    { id: "elevation", label: "Sort: Elevation" }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(event.target)) {
        setDifficultyDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper: parse "9 km" -> 9, "1100 m" -> 1100
  const parseNumber = (str) => parseFloat(String(str).replace(/[^\d.]/g, "")) || 0;

  // Filter + sort
  const visibleRoutes = routes
    .filter((r) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchLocation = r.location.toLowerCase().includes(q);
        if (!matchName && !matchLocation) return false;
      }
      if (difficultyFilter !== "all" && r.difficulty.toLowerCase() !== difficultyFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "distance") return parseNumber(a.distance) - parseNumber(b.distance);
      if (sortBy === "elevation") return parseNumber(a.elevation) - parseNumber(b.elevation);
      return a.name.localeCompare(b.name);
    });

  // Image upload / drag-drop handling
  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open "Add Route" modal
  const openAddModal = () => {
    setFormData({
      name: "",
      distance: "",
      elevation: "",
      difficulty: "Easy",
      location: "",
      description: "",
      image: ""
    });
    setEditingRoute(null);
    setIsModalOpen(true);
  };

  // Open "Edit Route" modal, pre-filled with the clicked card's data
  const openEditModal = (route) => {
    setFormData({
      name: route.name || "",
      distance: route.distance || "",
      elevation: route.elevation || "",
      difficulty: route.difficulty || "Easy",
      location: route.location || "",
      description: route.description || "",
      image: route.image || ""
    });
    setEditingRoute(route);
    setIsModalOpen(true);
  };

  // Save (Add or Edit) route
  const handleSaveRoute = (e) => {
    e.preventDefault();

    const routeData = {
      name: formData.name.trim() || "Untitled Route",
      distance: formData.distance.trim() || "0 km",
      elevation: formData.elevation.trim() || "0 m",
      difficulty: formData.difficulty,
      location: formData.location.trim(),
      description: formData.description.trim(),
      image: formData.image
    };

    if (editingRoute) {
      setRoutes((prev) =>
        prev.map((r) => (r.id === editingRoute.id ? { ...r, ...routeData } : r))
      );
    } else {
      setRoutes((prev) => [{ id: Date.now(), ...routeData }, ...prev]);
    }

    setIsModalOpen(false);
    setEditingRoute(null);
  };

  // Delete route
  const handleDeleteRoute = (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const currentDifficultyLabel =
    difficultyOptions.find((opt) => opt.id === difficultyFilter)?.label || "All difficulties";
  const currentSortLabel =
    sortOptions.find((opt) => opt.id === sortBy)?.label || "Sort: Name";

  return (
    <div className="admin-routes-view">
      {/* Page Header */}
      <div className="admin-events-header">
        <div>
          <h1 className="admin-events-title">ROUTES</h1>
          <p className="admin-events-subtitle">
            Manage the night run lines across the Kathmandu valley.
          </p>
        </div>

        <button type="button" onClick={openAddModal} className="admin-btn-gold">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Route
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
            placeholder="Search routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Difficulty Dropdown */}
        <div className="admin-custom-dropdown" ref={difficultyDropdownRef}>
          <button
            type="button"
            className={`admin-dropdown-btn ${difficultyDropdownOpen ? "active" : ""}`}
            onClick={() => {
              setDifficultyDropdownOpen(!difficultyDropdownOpen);
              setSortDropdownOpen(false);
            }}
          >
            <span>{currentDifficultyLabel}</span>
            <svg
              className={`admin-dropdown-chevron ${difficultyDropdownOpen ? "open" : ""}`}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {difficultyDropdownOpen && (
            <div className="admin-dropdown-menu">
              {difficultyOptions.map((opt) => {
                const isSelected = difficultyFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`admin-dropdown-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setDifficultyFilter(opt.id);
                      setDifficultyDropdownOpen(false);
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

        {/* Sort Dropdown */}
        <div className="admin-custom-dropdown" ref={sortDropdownRef}>
          <button
            type="button"
            className={`admin-dropdown-btn ${sortDropdownOpen ? "active" : ""}`}
            onClick={() => {
              setSortDropdownOpen(!sortDropdownOpen);
              setDifficultyDropdownOpen(false);
            }}
          >
            <span>{currentSortLabel}</span>
            <svg
              className={`admin-dropdown-chevron ${sortDropdownOpen ? "open" : ""}`}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {sortDropdownOpen && (
            <div className="admin-dropdown-menu">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`admin-dropdown-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSortBy(opt.id);
                      setSortDropdownOpen(false);
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

      {/* Routes Card Grid */}
      {visibleRoutes.length > 0 ? (
        <div className="admin-routes-grid">
          {visibleRoutes.map((route) => (
            <div key={route.id} className="admin-route-card">
              <div className="admin-route-card-img-wrapper">
                <img
                  src={route.image}
                  alt={route.name}
                  className="admin-route-card-img"
                />
              </div>

              <div className="admin-route-card-body">
                <div className="admin-route-card-header">
                  <h3 className="admin-route-card-title">{route.name}</h3>
                  <span className={`admin-badge-pill ${route.difficulty.toLowerCase()}`}>
                    {route.difficulty.toUpperCase()}
                  </span>
                </div>

                {route.location && (
                  <p className="admin-route-card-location">{route.location}</p>
                )}

                {route.description && (
                  <p className="admin-route-card-desc">{route.description}</p>
                )}

                <div className="admin-route-stats-row">
                  <div>
                    <span className="admin-route-stat-label">Distance</span>
                    <span className="admin-route-stat-value">{route.distance}</span>
                  </div>
                  <div>
                    <span className="admin-route-stat-label">Elevation</span>
                    <span className="admin-route-stat-value">{route.elevation}</span>
                  </div>
                </div>

                <div className="admin-route-card-actions">
                  <button
                    type="button"
                    className="admin-route-action-btn"
                    onClick={() => openEditModal(route)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-route-action-btn delete"
                    onClick={() => handleDeleteRoute(route.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-routes-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5C6B61" strokeWidth="1.5">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          </svg>
          <div style={{ color: "#FFFFFF", fontWeight: 700, marginTop: "0.75rem" }}>
            No routes found
          </div>
          <p style={{ color: "#8A988E", fontSize: "0.8125rem", margin: "0.25rem 0 1rem" }}>
            Try adjusting your search query or difficulty filter.
          </p>
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() => {
              setSearchQuery("");
              setDifficultyFilter("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Add / Edit Route Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2 className="admin-modal-title">
                  {editingRoute ? "EDIT ROUTE" : "ADD ROUTE"}
                </h2>
                <p className="admin-modal-subtitle">
                  Describe the line, the climb and the surface.
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                title="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="admin-modal-form">
              {/* ROUTE NAME */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">ROUTE NAME</label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="admin-modal-input"
                  placeholder="Bagmati Riverside"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* DISTANCE & ELEVATION */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">DISTANCE</label>
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="9 km"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  />
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">ELEVATION</label>
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="80 m"
                    value={formData.elevation}
                    onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                  />
                </div>
              </div>

              {/* DIFFICULTY & LOCATION */}
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
                    </select>
                    <div className="admin-modal-select-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="admin-modal-form-group">
                  <label className="admin-modal-label">LOCATION</label>
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="Teku to Sankhamul"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">DESCRIPTION</label>
                <textarea
                  className="admin-modal-textarea"
                  placeholder="Flat, well-lit corridor. Great for first-timers and recovery nights."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* ROUTE IMAGE / MAP */}
              <div className="admin-modal-form-group">
                <label className="admin-modal-label">ROUTE IMAGE / MAP</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />
                {formData.image ? (
                  <>
                    <div className="admin-modal-dropzone-preview" style={{ height: "150px" }}>
                      <img src={formData.image} alt="Route preview" className="admin-modal-dropzone-img" />
                    </div>
                    <button
                      type="button"
                      className="admin-remove-image-btn"
                      onClick={() => setFormData({ ...formData, image: "" })}
                    >
                      Remove image
                    </button>
                  </>
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
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-modal-save-btn">
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
