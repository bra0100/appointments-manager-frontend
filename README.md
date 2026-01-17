# Appointments Management System - Frontend

Frontend SPA for managing appointments in a service-based business.

Built with **Vue 3** and focused on clean architecture, usability, accessibility (a11y), and real-world backend integration.

This frontend consumes a REST API to manage **clients**, **services**, and **appointments**.

## Tech Stack

- Vue 3 (Composition API)
- Vite
- JavaScript (ES Modules)
- HTML5 semantic elements
- CSS 
- REST API consumption via Fetch

---

## Backend Integration

This frontend works together with a dedicated backend API:

**Backend repository:**
https://github.com/bra0100/appointments-manager-backend

The backend provides:
- REST API endpoints
- Business rules validation
- Appointment conflict prevention
- Database persistence (SQLite)

## Accessibility (a11y)

Accessibility was considered from the beginning.

### Implemented practices:

- Semantic HTML (article, header, section, footer)
- aria-labelledby for accessible naming of appointment cards
- Live status updates with role="status" and aria-live="polite"
- Fully keyboard-accessible actions
- Accessible modal:
  - role="dialog"
  - focus trapping
  - Escape key to close
  - focus restoration on close

Accessibility decisions follow *WAI-ARIA Authoring Practices* and *MDN guidelines*.

---

## Animations

- Vue <Transition> for modal enter/leave
- Vue <TransitionGroup> for appointment list animations
- CSS-based transitions for performance and clarity

---

## Design Decisions

- Composition API for scalable logic organization
- Domain-based CSS instead of generic utility files
- Appointments treated as independent entities
- Frontend orchestrates UI and UX; business logic lives in the backend

## Future Improvements

- Vue Router for multi-view navigation
- Improved form validation feedback
- Global state management if the app scales
- UI component tests

## How to run

### Development Server

```bash
npm install
npm run dev
```

Server runs at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Requirements
- Node.js
- npm
- Backend API running on port 3000

---

## Notes

Built as part of a full-stack architecture exercise focused on clean separation of concerns and real-world practices.
