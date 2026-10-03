# Akademos

Akademos is an adaptive learning platform. A learner supplies a subject, goal, target proficiency, time constraints, and optional learning material. The backend persists that learner state, extracts concepts from uploaded material, builds prerequisite relationships, creates a diagnostic assessment, updates mastery with BKT-style updates, and recalculates the roadmap after assessment.

## Stack

- React + TypeScript + Vite
- React Router + React Flow + Recharts
- FastAPI + SQLAlchemy + PostgreSQL
- Alembic migrations
- PDF/DOCX/TXT/Markdown extraction
- Optional Neo4j client retained for graph persistence/integration

## 1. Start PostgreSQL

The included Compose file provides PostgreSQL and Neo4j:

```bash
docker compose up -d postgres neo4j
```

If you do not need Neo4j yet, PostgreSQL alone is enough for the current application.

## 2. Configure the backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

The default database configuration matches the included PostgreSQL container:

```text
postgresql+psycopg://postgres:postgres@localhost:5432/akademos
```

Run migrations:

```bash
alembic upgrade head
```

Start the API:

```bash
uvicorn app.main:app --reload --port 8000
```

## 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

If the API is not running on `http://localhost:8000`, create `frontend/.env`:

```text
VITE_API_URL=http://localhost:8000
```

## 4. First-use flow

1. Open the frontend.
2. Complete onboarding.
3. Optionally upload PDF, DOCX, TXT, or Markdown material.
4. Akademos creates the learner, concepts, prerequisite graph, roadmap, and diagnostic assessment.
5. Complete the assessment.
6. Assessment answers update concept mastery and trigger roadmap recalculation.
7. Dashboard, roadmap, graph, progress, learning, and resources read the persisted learner state.

## Important implementation note

There is deliberately no demo learner or frontend fallback dataset in the active application flow. A learner must be created through onboarding. The current concept extraction is deterministic and resource-grounded; an LLM provider can be added later for richer concept extraction, explanations, and question generation without changing the frontend data flow.
