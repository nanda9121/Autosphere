# AutoSphere — Full-stack automotive discovery

AutoSphere is a premium car discovery experience rebuilt with a React client and a Node.js/Express API. It combines editorial-style browsing with useful catalog interactions: search, category filtering, sorting, favorites, vehicle detail views, and comparison selection.

## What changed

- Replaced the old Bootstrap/Jinja presentation with a responsive React/Vite interface.
- Added a Node.js + Express REST API backed by SQLite.
- Added persistent favorites and seeded catalog data.
- Added a responsive design system with keyboard-friendly controls, mobile navigation, detail modal, and compare workflow.
- Kept the original Flask implementation in the repository as a historical reference while the new app runs through Node.

## Stack

- React 18, React Router, Lucide React
- Vite
- Node.js, Express, CORS
- JSON-backed persistence for favorites and catalog data
- CSS with responsive layouts and design tokens

## Run locally

Requirements: Node.js 20+

```powershell
npm install
npm run dev
```

Open the frontend at `http://127.0.0.1:5173`.

The API runs at `http://127.0.0.1:5001`.

## Production build

```powershell
npm run build
npm start
```

The Express server serves the Vite build from `dist`.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/cars` | Search, filter, sort, and list cars |
| GET | `/api/cars/:id` | Read one car |
| POST | `/api/favorites/:id` | Toggle a saved car |
| GET | `/api/meta` | Read catalog categories and totals |

## Project structure

```text
Autosphere/
├── server/index.js       # Express API and SQLite setup
├── src/main.jsx          # React application
├── src/styles.css        # Responsive visual system
├── vite.config.js
├── package.json
└── legacy Flask files     # Original implementation retained for reference
```
