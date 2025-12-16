# Performance Optimizations

## Core Goal: A Fast & Fluid Experience

To ensure the Sangeet Kalakar Union platform is fast, responsive, and efficient for all users, several key performance optimization strategies have been implemented. These techniques focus on loading assets and data intelligently, reducing initial page load times, and ensuring smooth interactions.

---

### 1. Image Optimization: Lazy Loading

Images are often the largest assets on a web page. To prevent non-essential images from blocking the initial render, we employ native browser lazy loading.

*   **Strategy:** The `loading="lazy"` attribute is added to `<img>` tags for images that are not immediately visible in the user's viewport (i.e., "below the fold").
*   **Mechanism:** The browser will automatically defer the loading of these images until the user scrolls near them.
*   **Impact:** This significantly improves the Largest Contentful Paint (LCP) and reduces initial bandwidth consumption, leading to a much faster perceived load time, especially on mobile networks.
*   **Implementation:** This is applied to artist avatars in the directory, portfolio thumbnails, gallery images, and other non-critical media across the application.

### 2. Data Fetching: Pagination in Directories

Loading and rendering a list of thousands of artists at once would be highly inefficient and detrimental to performance.

*   **Strategy:** The `ArtistsDirectory` view implements a "Load More" pagination system.
*   **Mechanism:** An initial batch of artists (e.g., 12) is displayed. When the user clicks the "Load More" button, the next batch is appended to the list.
*   **Impact:** This keeps the initial DOM size small, reduces JavaScript execution time, and makes the directory feel instantaneous. It provides a better user experience than traditional numbered pagination by allowing continuous browsing.

### 3. Search & Filtering: Memoization and Debouncing

Client-side searching and filtering can be resource-intensive if not handled correctly.

*   **Strategy:** We use a combination of debouncing and memoization (via React's `useEffect` hook).
*   **Mechanism (Debouncing):** Search and filter operations are not triggered on every keystroke. Instead, they are delayed by a few hundred milliseconds (`300ms`). The calculation only runs after the user has stopped typing, preventing dozens of unnecessary re-renders.
*   **Mechanism (Memoization):** The filtering and sorting logic is contained within a `useEffect` hook. This hook only re-executes when its dependencies (the search query, applied filters, or the master artist list) actually change. This prevents costly re-calculations on unrelated state updates.
*   **Impact:** This ensures the UI remains responsive and fluid, even when users are interacting rapidly with search and filter controls.

### 4. Distance Calculation Optimization

Geolocation-based sorting requires calculating the distance between the user and every artist.

*   **Strategy:** The Haversine formula, a standard and computationally efficient method, is used for calculations.
*   **Mechanism:** The key optimization is that these calculations are part of the main filtering logic, which is already memoized within the `useEffect` hook.
*   **Impact:**Distance calculations are only performed when necessary—when the user's location is first obtained or when the distance radius filter is adjusted—avoiding redundant processing and ensuring a smooth experience during location-based searches.
