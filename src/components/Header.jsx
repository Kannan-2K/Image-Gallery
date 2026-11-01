import React from 'react';
import './Header.css';

/**
 * Header Component
 * Contains branding, search input, category filters, and action to add new images.
 * Demonstrates clean separation of concerns and prop delegation.
 */
export default function Header({
  searchQuery,
  onSearchChange,
  categories = [],
  activeCategory,
  onSelectCategory,
  onOpenAddModal,
  totalCount
}) {
  return (
    <header className="gallery-header">
      <div className="gallery-header__top">
        <div className="gallery-header__brand">
          <div className="gallery-header__logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <div>
            <h1 className="gallery-header__title">React Image Gallery</h1>
            <p className="gallery-header__subtitle">
              Dynamic, responsive gallery powered by React component architecture
            </p>
          </div>
        </div>

        {/* Action Button: Add New Image */}
        <div className="gallery-header__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onOpenAddModal}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Image
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="gallery-header__controls">
        {/* Search Bar */}
        <div className="gallery-header__search-wrapper">
          <svg
            className="gallery-header__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="gallery-header__search-input"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search images"
          />
          {searchQuery && (
            <button
              type="button"
              className="gallery-header__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Pills */}
        <nav className="gallery-header__categories" aria-label="Filter by category">
          <React.Fragment>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${activeCategory === cat ? 'category-pill--active' : ''}`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </React.Fragment>
        </nav>
      </div>
    </header>
  );
}

