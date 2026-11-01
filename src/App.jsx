import React, { useState, useMemo } from 'react';
import initialImages from './data/images';
import Header from './components/Header';
import Gallery from './components/Gallery';
import ImageModal from './components/ImageModal';
import AddImageModal from './components/AddImageModal';
import './App.css';

/**
 * Main App Component
 * 
 * Demonstrates:
 * 1. Storing image details in an array of objects (initialImages).
 * 2. Proper separation of concerns (Header, Gallery, ImageCard, Modals).
 * 3. Passing image data to child components via props.
 * 4. Dynamic rendering using map() in Gallery.
 * 5. React Fragments to prevent extra wrapper DOM nodes.
 * 6. Responsive grid styling across mobile, tablet, and desktop screens.
 */
export default function App() {
  // Additional image objects added via the UI form
  const [userAddedImages, setUserAddedImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Combines user-added items with the data array from src/data/images.js.
  // Whenever a new object is added to the data array in images.js,
  // it immediately reflects in the UI without changing any JSX structure.
  const images = [...userAddedImages, ...initialImages];

  // Extract unique categories dynamically from images array
  const categories = useMemo(() => {
    const unique = new Set(images.map((img) => img.category).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [images]);

  // Dynamically filter images by active category and search query
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCategory =
        activeCategory === 'All' || img.category?.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        img.title?.toLowerCase().includes(query) ||
        img.description?.toLowerCase().includes(query) ||
        img.author?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [images, activeCategory, searchQuery]);

  // Handler to add a new image object to the array
  const handleAddImage = (newImage) => {
    setUserAddedImages((prev) => [newImage, ...prev]);
    // Reset category filter if necessary to ensure new image is visible
    if (activeCategory !== 'All' && newImage.category !== activeCategory) {
      setActiveCategory('All');
    }
  };

  // Handler to toggle favorite
  const handleToggleFavorite = (targetImage) => {
    const targetId = targetImage.id || targetImage.title;
    setFavorites((prev) =>
      prev.includes(targetId)
        ? prev.filter((id) => id !== targetId)
        : [...prev, targetId]
    );
  };

  return (
    <React.Fragment>
      <div className="app-container">
        {/* Header Component */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          totalCount={images.length}
        />

        {/* Gallery Component: Maps over array and passes data via props */}
        <main className="app-main">
          <Gallery
            images={filteredImages}
            onSelectImage={setSelectedImage}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            React Image Gallery &bull; Built with modular components, props delegation, and responsive CSS Grid.
          </p>
        </footer>
      </div>

      {/* Lightbox Preview Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {/* Add New Image Object Modal */}
      <AddImageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddImage={handleAddImage}
      />
    </React.Fragment>
  );
}

