# EduLedger Student Course Management Portal — Updated

This package preserves the original `frontend/` as the untouched backup and adds `react-frontend/` as the React/Vite implementation.

## Changes
- Converted the portal pages into React components.
- Added React Router routes for all existing portal pages.
- Converted local page links to React Router `Link`/`NavLink` components.
- Added a JavaScript `appNavigate()` bridge for legacy JavaScript redirects so navigation remains JavaScript-driven.
- Preserved the original CSS in `react-frontend/public/css/` without redesigning it.
- Preserved the original JS/business logic in `react-frontend/public/legacy/js/`, with navigation redirects adapted to SPA routes.
- Added reusable React components: `PageCss`, `LegacyScript`, `Navbar`, `Footer`, `CourseCard`, and `AuthContext`.

## Run
```
cd react-frontend
npm install
npm run dev
```
