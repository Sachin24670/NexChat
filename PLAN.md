# Implementation Plan: Mobile Bottom Navbar + Collapsible Desktop Sidebar

## Overview

Two layout changes to the Chat page:

1. **Mobile (< md)**: Add a WhatsApp-style bottom navigation bar with tab icons
2. **Desktop (>= md)**: Make the sidebar collapsible with a toggle button

---

## Changes

### 1. Add `sidebarCollapsed` state to Zustand store

**File:** `frontend/src/store/slices/chat.slice.js`

- Add `sidebarCollapsed: false` state
- Add `setSidebarCollapsed` action

### 2. Create Mobile Bottom Navbar component

**New file:** `frontend/src/pages/chat/components/bottom-navbar/index.jsx`

- Visible only on mobile (`md:hidden`), fixed at the bottom of the screen
- 4 tab icons: **Chats** (MessageCircle), **Channels** (Users), **Profile** (User), **New DM** (Plus/Search)
- Active tab highlighted with the app's purple accent (`#a78bfa`)
- Tapping "Chats" or "Channels" shows the respective section in the main area
- Tapping "Profile" navigates to `/profile`
- Tapping "New DM" opens the new DM dialog
- Hidden when a chat is actively open (same pattern as current sidebar hide)

### 3. Restructure ContactContainer for collapsible desktop sidebar

**File:** `frontend/src/pages/chat/components/contact-container/index.jsx`

- Add a collapse toggle button (chevron icon) at the top of the sidebar
- **Expanded state (default):** Current layout — logo text, section titles, full contact list
- **Collapsed state:** Narrow width (~60-70px), show only icons (logo icon, DM icon, channels icon, profile avatar)
- Smooth CSS transition on width change
- Icons in collapsed state should have tooltips showing what they are
- On mobile: hide the entire ContactContainer (replaced by bottom navbar + mobile content area)

### 4. Adapt ProfileInfo for collapsed sidebar

**File:** `frontend/src/pages/chat/components/contact-container/components/profile-info/index.jsx`

- In collapsed state: show only the avatar (no name, no edit/logout text buttons — just icon buttons)
- In expanded state: current layout unchanged

### 5. Update Chat page layout

**File:** `frontend/src/pages/chat/index.jsx`

- Add the `BottomNavbar` component (mobile only)
- On mobile: show a "mobile content area" that renders DM list or Channel list based on active bottom tab (instead of the full sidebar)
- Add padding-bottom on mobile to account for the bottom navbar height
- Desktop layout stays the same, but sidebar now respects collapsed state width

### 6. Create MobileContactList component

**New file:** `frontend/src/pages/chat/components/mobile-contact-list/index.jsx`

- Renders the chat/channel list content for mobile view (takes full width)
- Includes the Logo at the top
- Shows the appropriate section based on the active bottom tab
- Hidden when a chat is selected (existing behavior preserved)

---

## Files Modified (summary)

| File                                                      | Change                                             |
| --------------------------------------------------------- | -------------------------------------------------- |
| `store/slices/chat.slice.js`                              | Add `sidebarCollapsed` + `activeTab` state         |
| `chat/index.jsx`                                          | Add BottomNavbar, MobileContactList, adjust layout |
| `contact-container/index.jsx`                             | Collapsible logic, toggle button, icon-only mode   |
| `contact-container/components/profile-info/index.jsx`     | Adapt for collapsed state                          |
| `chat/components/bottom-navbar/index.jsx` **(new)**       | WhatsApp-style bottom nav                          |
| `chat/components/mobile-contact-list/index.jsx` **(new)** | Mobile main content view                           |

## Design Notes

- Uses existing Tailwind classes and color scheme (`#a78bfa` purple accent, `#0e0e14` sidebar bg)
- Uses `lucide-react` icons (already in the project)
- Transitions via Tailwind `transition-all duration-300`
- No new dependencies needed
