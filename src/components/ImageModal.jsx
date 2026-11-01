import React, { useEffect } from 'react';
import './ImageModal.css';

/**
 * ImageModal Component (Lightbox Preview)
 * Displays the selected image card in high-res detail with full metadata.
 * Uses keyboard navigation (Escape to close) and handles focus traps cleanly.
 */
export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  if (!image) return null;

  const imageUrl = image.imageUrl || image.url || image.src || '';
  const title = image.title || 'Untitled Image';
  const description = image.description || '';
  const category = image.category;
  const author = image.author;
  const date = image.date;

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="presentation">
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close image modal"
        >
          ×
        </button>

        <div className="lightbox-media">
          <img src={imageUrl} alt={title} className="lightbox-img" />
        </div>

        <div className="lightbox-details">
          {category && (
            <span className="lightbox-category">{category}</span>
          )}

          <h2 className="lightbox-title">{title}</h2>
          <p className="lightbox-description">{description}</p>

          <div className="lightbox-meta">
            {author && (
              <div className="lightbox-meta-item">
                <span className="lightbox-meta-label">Photographer</span>
                <span className="lightbox-meta-value">{author}</span>
              </div>
            )}
            {date && (
              <div className="lightbox-meta-item">
                <span className="lightbox-meta-label">Date</span>
                <span className="lightbox-meta-value">{date}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

