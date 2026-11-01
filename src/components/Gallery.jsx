import React from 'react';
import ImageCard from './ImageCard';
import './Gallery.css';

/**
 * Gallery Component
 * Parent container responsible for rendering the collection of ImageCards.
 * Uses .map() method to iterate dynamically over the images array.
 * Passes image data to each ImageCard child component via props.
 */
export default function Gallery({
  images = [],
  onSelectImage,
  onToggleFavorite,
  favorites = [],
  activeCategory = 'All',
  searchQuery = ''
}) {
  // If no images match current filters
  if (images.length === 0) {
    return (
      <div className="gallery__empty">
        <div className="gallery__empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="gallery__empty-title">No images found</h3>
        <p className="gallery__empty-text">
          {searchQuery
            ? `No matches found for "${searchQuery}". Try different keywords or reset filters.`
            : `No images currently available in category "${activeCategory}".`}
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* Gallery status and counter bar */}
      <div className="gallery__status-bar">
        <span className="gallery__count">
          Showing <strong>{images.length}</strong> {images.length === 1 ? 'image' : 'images'}
          {activeCategory !== 'All' && <span> in <em>{activeCategory}</em></span>}
          {searchQuery && <span> matching <em>"{searchQuery}"</em></span>}
        </span>
      </div>

      {/* Main Responsive Grid Layout */}
      <section className="gallery__grid" aria-label="Image collection">
        {images.map((image, index) => {
          const cardId = image.id || `img-${index}`;
          return (
            <ImageCard
              key={cardId}
              id={cardId}
              imageUrl={image.imageUrl || image.url}
              title={image.title}
              description={image.description}
              category={image.category}
              author={image.author}
              date={image.date}
              image={image}
              onCardClick={onSelectImage}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(cardId)}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
}

