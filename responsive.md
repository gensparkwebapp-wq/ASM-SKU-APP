# Responsive Behavior

## Core Philosophy: Mobile-First & Adaptive Design

The Sangeet Kalakar Union application is built with a mobile-first approach, ensuring a seamless and fully functional experience on any device. The layout and components are designed to be fluid and adaptive, gracefully adjusting to different screen sizes and orientations.

---

### Mobile Devices (Screens < 768px)

On smaller screens, the interface is optimized for touch interaction and vertical scrolling.

*   **Layout:** Content is primarily displayed in a single-column layout to maintain readability and ease of navigation.
*   **Artist Directory:** Artist cards are stacked vertically.
*   **Filters:** To maximize content visibility, the comprehensive filter panel is hidden by default. It can be accessed via a "Filters" button, which opens a full-screen modal or a slide-out drawer.
*   **Navigation:** The main navigation bar is collapsed into a hamburger menu. Tapping it reveals the navigation links in a slide-in panel.
*   **Profile Page:** Tabs for "About," "Portfolio," etc., are scrollable horizontally to fit within the screen width.

### Tablet Devices (Screens 768px - 1024px)

Tablets benefit from increased screen real estate, allowing for more information to be displayed at once.

*   **Layout:** The application transitions to a multi-column grid where appropriate.
*   **Artist Directory:** Artist cards are displayed in a **2-column grid**, allowing users to see more artists at a glance.
*   **Filters:** The filter controls may be presented in a popover or a more compact, always-visible section, depending on the available width.
*   **Profile Page:** The layout adjusts to show content side-by-side, such as placing the "Contact & Socials" card next to the main "About" section.

### Desktop Devices (Screens > 1024px)

The desktop experience is designed to be immersive and information-rich, taking full advantage of the available space.

*   **Layout:** The interface expands to utilize the full width of the screen.
*   **Artist Directory:** Artist cards are arranged in a **3-column or 4-column grid**, maximizing the number of profiles a user can browse simultaneously.
*   **Filters:** The complete set of filters is displayed in a **persistent sidebar** next to the artist grid. This allows for real-time filtering without obscuring the search results.
*   **Navigation:** The full navigation bar with all links is always visible in the header.
*   **Profile & Edit Pages:** These pages use a multi-column layout to organize information logically, preventing long vertical scrolls and making data entry more efficient.

---

### Universal Accessibility

All pages, from the home screen to the detailed studio booking interface and the artist profile editor, are designed to be fully responsive. Every feature and piece of information is accessible and usable, regardless of whether the user is on a phone, tablet, or desktop computer. This ensures a consistent and high-quality experience for every member of the Sangeet Kalakar Union.
