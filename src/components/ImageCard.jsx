import React, { useState } from 'react';
import './ImageCard.css';

/**
 * Reusable ImageCard Component
 * Displays an individual image with its title, description, and metadata.
 * Receives data via props (supports both individual props and image object prop).
 */
export default function ImageCard({
  imageUrl,
  title,
  description,
  category,
  author,
  date,
  id,
  image,
  onCardClick,
  onToggleFavorite,
  isFavorite = false
}) {
  // Support both individual props (imageUrl, title, description) and image object prop
  const currentImageUrl = imageUrl || image?.imageUrl || image?.url || image?.src || '';
  const currentTitle = title || image?.title || 'Untitled Image';
  const currentDescription = description || image?.description || '';
  const currentCategory = category || image?.category;
  const currentAuthor = author || image?.author;
  const currentDate = date || image?.date;
  const currentId = id || image?.id;

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Normalized object for callbacks and modal preview
  const cardData = {
    id: currentId,
    imageUrl: currentImageUrl,
    title: currentTitle,
    description: currentDescription,
    category: currentCategory,
    author: currentAuthor,
    date: currentDate,
    ...image
  };

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(cardData);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="image-card"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${currentTitle}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Media container */}
      <div className="image-card__media">
        {!isLoaded && !hasError && (
          <div className="image-card__skeleton" aria-hidden="true" />
        )}

        {hasError ? (
          <div className="image-card__error" aria-label="Image failed to load">
            <svg
              className="image-card__error-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Image preview unavailable</span>
          </div>
        ) : (
          <img
            src={currentImageUrl}
            alt={currentTitle}
            loading="lazy"
            className={`image-card__img ${isLoaded ? 'image-card__img--loaded' : ''}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
          />
        )}

        {/* Category Pill Tag */}
        {currentCategory && (
          <span className="image-card__category" title={`Category: ${currentCategory}`}>
            {currentCategory}
          </span>
        )}

        {/* Favorite Heart Button */}
        {onToggleFavorite && (
          <button
            type="button"
            className={`image-card__fav-btn ${isFavorite ? 'image-card__fav-btn--active' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(cardData);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      {/* Card Content using React Fragments to group metadata cleanly */}
      <div className="image-card__content">
        <React.Fragment>
          <h3 className="image-card__title" title={currentTitle}>
            {currentTitle}
          </h3>

          <p className="image-card__description">
            {currentDescription}
          </p>
        </React.Fragment>

        {/* Footer with author and date */}
        {(currentAuthor || currentDate) && (
          <footer className="image-card__footer">
            <React.Fragment>
              {currentAuthor && (
                <span className="image-card__author" title={`Photographer: ${currentAuthor}`}>
                  <svg
                    className="image-card__author-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {currentAuthor}
                </span>
              )}
              {currentDate && (
                <span className="image-card__date">
                  {currentDate}
                </span>
              )}
            </React.Fragment>
          </footer>
        )}
      </div>
    </div>
  );
}
