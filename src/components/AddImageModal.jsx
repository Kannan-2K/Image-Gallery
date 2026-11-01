import React, { useState } from 'react';
import './AddImageModal.css';

const PRESET_SAMPLES = [
  {
    title: 'Aurora Borealis in Tromsø',
    description: 'Vivid green and violet northern lights dancing over snow-capped fjords and arctic waters in Norway.',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    category: 'Nature',
    author: 'Vincent Guth'
  },
  {
    title: 'Cyberpunk Alleyway',
    description: 'Atmospheric neon-lit narrow backstreet with hanging lanterns and futuristic cyber aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    category: 'Urban',
    author: 'Sean Foley'
  },
  {
    title: 'Minimalist Modern Villa',
    description: 'Cantilevered architectural residence blending seamlessly into coastal cliffs with infinity pool reflection.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    category: 'Architecture',
    author: 'R ARCHITECTURE'
  }
];

export default function AddImageModal({ isOpen, onClose, onAddImage }) {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    category: 'Nature',
    author: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleUsePreset = (preset) => {
    setFormData({
      title: preset.title,
      imageUrl: preset.imageUrl,
      description: preset.description,
      category: preset.category,
      author: preset.author
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+/i.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid HTTP(S) URL';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newImage = {
      id: `img-${Date.now()}`,
      title: formData.title.trim(),
      imageUrl: formData.imageUrl.trim(),
      description: formData.description.trim(),
      category: formData.category,
      author: formData.author.trim() || 'Anonymous Photographer',
      date: 'Just now'
    };

    onAddImage(newImage);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-container"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="modal-title" className="modal-title">Add New Image Object</h2>
            <p className="modal-subtitle">
              Adding this object to the array dynamically updates the UI via props &amp; .map()
            </p>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        {/* Quick Presets */}
        <div className="modal-presets">
          <span className="modal-presets-label">Quick fill sample:</span>
          <div className="modal-presets-buttons">
            {PRESET_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                className="preset-btn"
                onClick={() => handleUsePreset(sample)}
              >
                {sample.title.split(' ')[0]} ({sample.category})
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Image Title <span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="e.g. Misty Mountain Sunrise"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Image URL <span className="required">*</span>
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              className={`form-input ${errors.imageUrl ? 'form-input--error' : ''}`}
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && <span className="form-error">{errors.imageUrl}</span>}
          </div>

          <div className="form-row">
            <div className="form-group form-group--half">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Nature">Nature</option>
                <option value="Architecture">Architecture</option>
                <option value="Urban">Urban</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Travel">Travel</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group form-group--half">
              <label htmlFor="author" className="form-label">Author / Credit</label>
              <input
                id="author"
                name="author"
                type="text"
                className="form-input"
                placeholder="e.g. John Doe"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`form-textarea ${errors.description ? 'form-textarea--error' : ''}`}
              placeholder="Provide a rich visual description of the photo..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Form Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
            >
              Insert Image into Array
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

