# Sangeet Kalakar Union - Data Flow

## Core Principle: Single Source of Truth

The application operates on a "single source of truth" model. All artist data is managed in a central database, ensuring consistency across all components and views. The frontend application state is a direct reflection of this database, which is queried in real-time.

---

### 1. Artist Profile Creation & Updates

This flow describes how data is persisted when an artist creates or modifies their profile.

*   **Action:** An artist navigates to the "Edit Profile" page (`EditProfile.tsx`).
*   **Process:**
    *   The artist fills out or modifies form fields (name, bio, location, etc.).
    *   Media files like avatars and cover photos are uploaded. These are sent to their respective storage buckets (`artists-profile`, `artists-cover`). The URLs returned by the storage service are then stored in the database.
    *   Upon clicking "Save," the frontend application packages all form data into a structured artist object.
*   **Backend Interaction:** An API call (e.g., `PUT /api/artists/:id` or `POST /api/artists`) is made to the backend server. The server validates the data and updates the `artists` table in the database.
*   **Result:** All artist information is permanently saved in the database, becoming the new single source of truth for that artist's profile.

### 2. Real-time Directory Display

This flow ensures that the directory always shows the most current information.

*   **Action:** A user navigates to the "Artists Directory" (`ArtistsDirectory.tsx`).
*   **Process:** The component makes an initial API call (e.g., `GET /api/artists`) to fetch the list of artists.
*   **Backend Interaction:** The server queries the `artists` table and returns an array of all artist objects.
*   **Result:** The directory displays up-to-date information directly from the database. Any changes an artist makes to their profile are immediately reflected the next time the directory data is fetched.

### 3. Search and Filtering Logic

This flow explains how user queries interact with the database for efficient results.

*   **Action:** A user interacts with the search bar or applies filters in the directory.
*   **Process:** The search query and filter parameters (category, location, etc.) are collected by the frontend.
*   **Backend Interaction:** An API call is made to the backend (e.g., `GET /api/artists?search=...&category=...`). The backend constructs an efficient SQL query with appropriate `WHERE` clauses based on these parameters.
*   **Result:** The database performs the heavy lifting of filtering and sorting, returning only the relevant artists to the frontend. This ensures the application remains fast and scalable, even with thousands of artists.

### 4. Portfolio Management

This flow details how an artist's media portfolio is managed separately for better performance and organization.

*   **Action:** An artist adds, edits, or removes an item from their portfolio via the "Edit Profile" page.
*   **Process:**
    *   The media file (image, video, etc.) is first uploaded to the dedicated `artists-portfolio` storage bucket.
*   **Backend Interaction:**
    *   Upon successful upload, an API call is made to a separate endpoint (e.g., `POST /api/portfolio`).
    *   The backend creates a new entry in the `artists_portfolio` table. This entry includes the media URL, title, description, and a foreign key (`artist_id`) that links it back to the correct artist in the `artists` table.
*   **Result:** This relational structure keeps the main `artists` table lean while efficiently managing a potentially large collection of portfolio items for each artist. When a user views an artist's profile, a `JOIN` query is used to retrieve their associated portfolio items.

---

### Visual Data Flow Diagram

```
[Artist UI (Edit Profile)] --- (Save Action) ---> [API Server] ---> [Database (artists table)]
       ^                                                                   |
       | (Data reflects in Profile/Directory)                              | (Queried by...)
       |                                                                   |
[User UI (Directory)] <--- (Filtered/Sorted Data) <--- [API Server] <-------+
       |                                                                   ^
       +--- (Search/Filter Action) ----------------------------------------+

[Portfolio UI] --- (Upload) ---> [Storage Bucket] --- (URL) ---> [API Server] ---> [Database (artists_portfolio table)]
```
