# Akademos Project Documentation

## 1. Overview

Akademos is an adaptive learning platform designed to help students learn efficiently by building a learner model around the concepts they must master. Instead of presenting a static syllabus, the platform estimates which concepts are weak, what depends on them, and what should be studied next.

The product is designed around a loop:

- assess concept mastery
- map prerequisite relationships
- adapt the roadmap
- schedule study time
- revisit progression with new evidence

This project currently provides a working frontend demo and a FastAPI backend that returns realistic mock data for a learner model.

## 2. Project Structure

- `backend/` – FastAPI API service
  - `app/main.py` – app entrypoint
  - `app/api/routes.py` – API endpoints
  - `app/data/demo.py` – realistic mock data payloads
- `frontend/` – React + TypeScript + Vite app
  - `src/App.tsx` – route definitions
  - `src/pages/` – dashboard, roadmap, knowledge graph, etc.
  - `src/lib/data.ts` – API fallback data and fetch helpers
- `docker-compose.yml` – local Postgres and Neo4j services
- `README.md` – minimal project startup instructions

## 3. Core Design Principles

### Adaptive learning workflow

The application models a student learning plan as a graph of concepts, with prerequisites and mastery values. That allows the platform to:

- identify gaps in understanding
- prioritize the next most valuable concept
- show what is blocked by missing prerequisites
- update study plans after each assessment

### Knowledge graph structure

Concepts are connected through dependency relationships. For example:

- SQL Fundamentals → Relational Model
- Relational Model → Functional Dependencies
- Functional Dependencies → Normalization

This means that weak understanding of a prerequisite can block the next topic in the roadmap.

### Personalized roadmap generation

The roadmap is not static. It adapts using mastery values and dependencies. In the demo data, the current weak concept is Functional Dependencies, which blocks Normalization.

## 4. Backend API

The backend lives in FastAPI and exposes route groups under `/api`.

### Health endpoint

- `GET /health`
- Returns service health status

### Working data endpoints

- `GET /api/dashboard`
- `GET /api/student`
- `GET /api/knowledge-graph`
- `GET /api/roadmap`
- `GET /api/progress`
- `GET /api/resources`
- `GET /api/learning/{concept_id}`
- `GET /api/assessment`
- `GET /api/mastery`
- `GET /api/recommendations`

The backend is intentionally using realistic in-memory demo payloads so the app can function logically even without a database connection.

## 5. Frontend Experience

The frontend is a complete demo interface with pages for:

- landing page
- onboarding flow
- dashboard overview
- roadmap
- knowledge graph
- progress and mastery tracking
- learning concept pages
- assessment flow
- resources library

The UI is designed to look like a polished product demo while remaining logically coherent with the same underlying dataset.

## 6. Data Model

### Student

- id
- name
- subject
- goal
- plan_days
- study_hours_per_day
- overall_mastery
- concepts_mastered
- total_concepts

### Concept

- id
- name
- mastery
- status
- difficulty
- x/y placement in graph
- prerequisites[]

### Roadmap item

- id
- title
- meta
- mastery
- status
- time
- description

## 7. How the Site Works Logically

1. A user starts on the landing page and chooses to build a learning path.
2. The onboarding flow defines learning subject, goal, proficiency, time availability, and resources.
3. The backend returns a learner snapshot and recommended next concept.
4. The dashboard shows:
   - mastery metrics
   - study streak
   - next recommendation
   - weekly schedule
5. The roadmap visualizes the current learning path with adaptive priorities.
6. The knowledge graph shows how concepts are connected and where weak areas block progress.
7. The user can start a learning session, then complete a concept assessment.
8. After assessment, the mastery model updates and the roadmap changes accordingly.

## 8. How to Run It

### Start infrastructure

```bash
cd /home/kaushik/projects/akademos
docker compose up -d
```

### Start backend

```bash
cd /home/kaushik/projects/akademos/backend
source .venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Start frontend

```bash
cd /home/kaushik/projects/akademos/frontend
npm install
npm run dev -- --host 0.0.0.0
```

### Access the app

- Frontend: http://localhost:5173/
- Backend health: http://localhost:8000/health

## 9. Current Realistic State

This version does not yet persist learner data in a real database. It is intentionally built as a logical demo product using a backend data layer and in-memory payloads. This is the correct staging point before adding:

- PostgreSQL models
- Neo4j graph persistence
- authentication
- file upload indexing
- algorithmic mastery updates
- real assessment scoring

## 10. Recommended Next Steps

1. Add database models for students, concepts, assessments, and learning sessions.
2. Replace mock data with PostgreSQL-backed learner data.
3. Persist graph structures in Neo4j.
4. Connect onboarding and assessment updates to real model recalculation.
5. Add authentication and profile storage.
6. Integrate real resource ingestion for PDFs and notes.
7. Add actual adaptive algorithms (BKT / IRT / graph traversal) behind the API.

## 11. Summary

Akademos is structured as a realistic adaptive learning platform demo and now runs logically with coherent data. The project is ready for continued product development and database-backed implementation.
