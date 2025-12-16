# Sangeet Kalakar Union

## Overview

The Sangeet Kalakar Union is the official digital platform for musical artists across India to connect, collaborate, and grow their careers. It serves as a comprehensive directory, a portfolio showcase, and a booking hub, empowering artists by providing equitable access to resources and a supportive community.

Built with a modern tech stack including React and TypeScript, this application provides a seamless and responsive user experience for both artists and those looking to hire them.

---

## Core Navigation Flow

The application is designed with a logical and intuitive user journey, allowing users to seamlessly transition from discovery to direct interaction and profile management.

### 1. Home Page → Artist Directory

*   **Entry Point:** The user journey begins on the Home Page, which features trending artists, performances, and promotional content.
*   **Navigation:** From the main navigation bar, the user clicks on **"Artists Directory"**.
*   **Result:** This action navigates the user to the `ArtistsDirectory` component. By default, this view displays a comprehensive, filterable list of all artists on the platform, sorted by rating.

*(Note: For development purposes, the application currently defaults to loading the `ArtistsDirectory` view on startup.)*

### 2. "Find Artists Near Me" → Geolocation Search

*   **Action:** Within the `ArtistsDirectory`, the user clicks the prominent **"Find Artists Near Me"** button.
*   **System Prompt:** The browser will prompt the user for geolocation permission. This is handled by `navigator.geolocation.getCurrentPosition()`.
*   **Result (Permission Granted):**
    *   The user's coordinates are fetched.
    *   The `ArtistsDirectory` component recalculates the distance between the user and every artist using the Haversine formula.
    *   The artist list is automatically re-filtered and re-sorted to show the nearest artists first. A distance radius slider appears, allowing the user to refine the search area.
*   **Result (Permission Denied):** A message is displayed informing the user that location access was denied, and the directory remains in its default state.

### 3. Artist Card → Artist Profile

*   **Action:** The user browses the list of artists displayed in `ArtistCard` components within the `ArtistsDirectory`. They click on any card to learn more about a specific artist.
*   **Navigation:** The `onClick` handler on the `ArtistCard` triggers the main `App` component's navigation handler.
*   **Result:** The application view changes to the `ArtistProfile` component. This page displays detailed information about the selected artist, including:
    *   Banner and profile images.
    *   Bio, skills, and equipment.
    *   A tabbed interface for "About," "Portfolio," "Posts," and "Reviews."
    *   Follower/Following counts and contact buttons (Follow, Message, WhatsApp).

### 4. Edit Profile → Update Directory Listing

*   **Precondition:** The user is an artist who is logged into their own account.
*   **Action:** While viewing their own `ArtistProfile` page, the artist clicks the **"Edit Profile"** button.
*   **Navigation:** This action navigates them to the `EditProfile` component, which is pre-populated with their current data.
*   **Result:**
    *   The artist can modify all their details, including their name, bio, social links, and availability. They can also manage their media through the `artists-portfolio` management section.
    *   Upon clicking "Save," the updated artist object is passed back to the main `App` component.
    *   The central `artists` state is updated, and the user is navigated back to their refreshed `ArtistProfile` page.
    *   All changes are instantly reflected across the application, including the artist's card in the `ArtistsDirectory`.
