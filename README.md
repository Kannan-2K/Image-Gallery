# React Responsive Image Gallery

A modern, responsive React Image Gallery demonstrating component modularity, props passing, dynamic `.map()` rendering from an array of objects, and React Fragments.

---

## 🚀 Features & Requirements Covered

- **Reusable Image Card Component**: Dedicated [`ImageCard`](src/components/ImageCard.jsx) component that accepts image details via props and renders an optimized image card with title, description, category tag, author credits, and interactive hover animations.
- **Array of Objects Data Source**: Image items are defined in [`src/data/images.js`](src/data/images.js), each containing `id`, `title`, `imageUrl`, `description`, `category`, `author`, and `date`.
- **Dynamic `.map()` Rendering**: [`Gallery`](src/components/Gallery.jsx) uses `.map()` to iterate through the array and render an `ImageCard` for each object with a unique `key`.
- **Props Delegation**: Parent-to-child data flow passing image objects and callback functions (`onSelectImage`, `onToggleFavorite`).
- **Clean Component Separation**:
  - `App.jsx`: Top-level state and orchestrator
  - `Header.jsx`: Search, category filtering, and add-image action
  - `Gallery.jsx`: Grid layout container and counter
  - `ImageCard.jsx`: Reusable individual card
  - `ImageModal.jsx`: Lightbox preview modal
  - `AddImageModal.jsx`: Form modal to add new objects to the array
- **Responsive CSS Grid Layout**: Uses modern CSS Grid (`repeat(auto-fill, minmax(300px, 1fr))`) adapting seamlessly from mobile phones (1 column), tablets (2 columns), to desktop screens (3-4 columns).
- **React Fragments**: Utilizes `<React.Fragment>` and `<> ... </>` across multiple components to eliminate redundant `<div>` DOM wrappers.
- **Dynamic Array Mutation (Expected Outcome)**: The UI includes an **"Add New Image"** modal with quick presets so you can add new image objects to the array and watch them reflect immediately without altering the JSX structure.

---

## 📁 Project Structure

```
react-image-gallery/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── components/
│   │   ├── AddImageModal.jsx      # Modal form to dynamically insert new image objects
│   │   ├── AddImageModal.css
│   │   ├── Gallery.jsx            # Parent container mapping over the image array
│   │   ├── Gallery.css            # Responsive CSS Grid styling
│   │   ├── Header.jsx             # Branding, search input, and category pills
│   │   ├── Header.css
│   │   ├── ImageCard.jsx          # Reusable presentation card receiving props
│   │   ├── ImageCard.css          # Card styling, aspect-ratio, hover lift effect
│   │   ├── ImageModal.jsx         # Fullscreen lightbox preview dialog
│   │   └── ImageModal.css
│   ├── data/
│   │   └── images.js              # Array of image objects (title, URL, description)
│   ├── App.jsx                    # Root component managing state & filtering
│   ├── App.css
│   ├── index.css                  # Modern CSS resets and typography
│   └── main.jsx                   # Entry point
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 3. Production Build
```bash
npm run build
```

