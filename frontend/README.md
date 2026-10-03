# Akademos Frontend

React + Vite SPA for the Akademos adaptive learning platform.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.

Set `VITE_API_URL` when connecting to the FastAPI backend, e.g.:

```env
VITE_API_URL=http://localhost:8000
```

## Included

- Editorial/minimalist Akademos visual system
- Palette: #000500, #362417, #92817A, #F1DABF
- Landing page
- 5-step learner onboarding
- Diagnostic assessment flow
- Dashboard
- Adaptive roadmap
- Interactive React Flow knowledge graph
- Learning session
- Progress analytics
- Resource library
- Responsive SPA routing

The current data is intentionally mocked in `src/lib/data.ts`; API calls are isolated in `src/services/api.ts` so the FastAPI/Neo4j backend can be wired in without redesigning the UI.
