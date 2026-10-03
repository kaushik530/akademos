import type { Concept, RoadmapItem } from "../types";

export const concepts: Concept[] = [
  {
    id: "sql",
    name: "SQL Fundamentals",
    mastery: 0.92,
    status: "mastered",
    difficulty: 0.25,
    x: 40,
    y: 40,
  },
  {
    id: "relational",
    name: "Relational Model",
    mastery: 0.84,
    status: "mastered",
    difficulty: 0.35,
    x: 280,
    y: 40,
  },
  {
    id: "er",
    name: "ER Model",
    mastery: 0.71,
    status: "learning",
    difficulty: 0.4,
    x: 520,
    y: 40,
  },
  {
    id: "fd",
    name: "Functional Dependencies",
    mastery: 0.48,
    status: "weak",
    difficulty: 0.55,
    x: 280,
    y: 220,
    prerequisites: ["relational"],
  },
  {
    id: "keys",
    name: "Candidate Keys",
    mastery: 0.68,
    status: "learning",
    difficulty: 0.5,
    x: 520,
    y: 220,
    prerequisites: ["relational"],
  },
  {
    id: "normalization",
    name: "Normalization",
    mastery: 0.31,
    status: "weak",
    difficulty: 0.72,
    x: 400,
    y: 400,
    prerequisites: ["fd", "keys"],
  },
  {
    id: "transactions",
    name: "Transactions",
    mastery: 0.65,
    status: "learning",
    difficulty: 0.64,
    x: 690,
    y: 400,
    prerequisites: ["sql"],
  },
  {
    id: "concurrency",
    name: "Concurrency Control",
    mastery: 0.22,
    status: "locked",
    difficulty: 0.78,
    x: 690,
    y: 570,
    prerequisites: ["transactions"],
  },
];

export const roadmap: RoadmapItem[] = [
  {
    id: "1",
    title: "Functional Dependencies",
    meta: "Core prerequisite",
    mastery: 48,
    status: "current",
    time: "42 min",
    description:
      "Strengthen the concept that is currently blocking your normalization path.",
  },
  {
    id: "2",
    title: "Candidate Keys",
    meta: "Prerequisite",
    mastery: 68,
    status: "upcoming",
    time: "28 min",
    description: "Practice identifying minimal superkeys and candidate keys.",
  },
  {
    id: "3",
    title: "Normalization",
    meta: "Target concept",
    mastery: 31,
    status: "upcoming",
    time: "55 min",
    description: "Move from 1NF through BCNF using dependency-driven examples.",
  },
  {
    id: "4",
    title: "Transactions",
    meta: "Next module",
    mastery: 65,
    status: "upcoming",
    time: "45 min",
    description: "ACID properties, schedules, and transaction states.",
  },
];

export const quiz = [
  {
    q: "Which dependency is required to determine whether a relation is in 3NF?",
    opts: [
      "Functional dependency",
      "Foreign key only",
      "Index order",
      "Transaction log",
    ],
    answer: 0,
  },
  {
    q: "A candidate key is best described as:",
    opts: [
      "Any superkey",
      "A minimal superkey",
      "A foreign key",
      "A primary index",
    ],
    answer: 1,
  },
];

const API_BASE =
  (import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api";

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export type DashboardData = {
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; subtext: string; type: string }[];
  next_concept: {
    id: string;
    title: string;
    summary: string;
    mastery: number;
    time: string;
    path: string;
  };
  schedule: { day: string; date: string; status: string }[];
};

export type RoadmapApiData = {
  summary: {
    title: string;
    subtitle: string;
    concept_count: number;
    study_hours: string;
    updated: string;
  };
  items: RoadmapItem[];
};

export type GraphApiData = {
  concepts: Concept[];
  edges: { source: string; target: string }[];
  legend: { label: string; tone: string }[];
};

export type ProgressApiData = {
  overall_mastery: number;
  study_time_hours: number;
  assessments: number;
  accuracy: number;
  reviews_due: number;
  chart: { day: string; value: number }[];
  mastery_breakdown: { name: string; value: number }[];
};

export type ResourceApiData = {
  items: { title: string; type: string; meta: string; status: string }[];
};

export const dashboardFallback: DashboardData = {
  title: "Good afternoon, Kaushik.",
  subtitle: "Your DBMS plan is 61% through the current target path.",
  metrics: [
    {
      label: "Overall mastery",
      value: "71%",
      subtext: "+8% this week",
      type: "mastery",
    },
    {
      label: "Concepts mastered",
      value: "23 / 32",
      subtext: "3 added this week",
      type: "concepts",
    },
    {
      label: "Study time",
      value: "18.5h",
      subtext: "of 30h planned",
      type: "time",
    },
    {
      label: "Current streak",
      value: "6 days",
      subtext: "Keep it going",
      type: "streak",
    },
  ],
  next_concept: {
    id: "fd",
    title: "Functional Dependencies",
    summary: "Your current gap is blocking Normalization.",
    mastery: 48,
    time: "42 min",
    path: "/learn/fd",
  },
  schedule: [
    { day: "MON", date: "06", status: "done" },
    { day: "TUE", date: "07", status: "done" },
    { day: "WED", date: "08", status: "current" },
    { day: "THU", date: "09", status: "upcoming" },
    { day: "FRI", date: "10", status: "upcoming" },
    { day: "SAT", date: "11", status: "off" },
    { day: "SUN", date: "12", status: "off" },
  ],
};

export const roadmapFallback: RoadmapApiData = {
  summary: {
    title: "DBMS · Exam readiness",
    subtitle: "30-day target · 1.5 hours/day · Proficiency level 3",
    concept_count: 32,
    study_hours: "18.5 / 30h",
    updated: "Updated today",
  },
  items: roadmap,
};

export const graphFallback: GraphApiData = {
  concepts,
  edges: [
    { source: "sql", target: "relational" },
    { source: "relational", target: "er" },
    { source: "relational", target: "fd" },
    { source: "relational", target: "keys" },
    { source: "fd", target: "normalization" },
    { source: "keys", target: "normalization" },
    { source: "sql", target: "transactions" },
    { source: "transactions", target: "concurrency" },
  ],
  legend: [
    { label: "Mastered", tone: "mastered" },
    { label: "Learning", tone: "learning" },
    { label: "Weak", tone: "weak" },
    { label: "Locked", tone: "locked" },
  ],
};

export const progressFallback: ProgressApiData = {
  overall_mastery: 71,
  study_time_hours: 18.5,
  assessments: 14,
  accuracy: 86,
  reviews_due: 4,
  chart: [
    { day: "W1", value: 58 },
    { day: "W2", value: 63 },
    { day: "W3", value: 67 },
    { day: "W4", value: 71 },
    { day: "W5", value: 74 },
  ],
  mastery_breakdown: [
    { name: "SQL Fundamentals", value: 92 },
    { name: "Relational Model", value: 84 },
    { name: "ER Model", value: 71 },
    { name: "Functional Dependencies", value: 48 },
    { name: "Normalization", value: 31 },
  ],
};

export const resourceFallback: ResourceApiData = {
  items: [
    {
      title: "DBMS Unit III Notes.pdf",
      type: "PDF",
      meta: "42 pages · indexed",
      status: "Ready",
    },
    {
      title: "Database Management Systems",
      type: "BOOK",
      meta: "Chapter 1–8 · linked",
      status: "Ready",
    },
    {
      title: "Normalization lecture slides",
      type: "SLIDES",
      meta: "36 slides · indexed",
      status: "Ready",
    },
  ],
};

export function getDashboardData() {
  return getJson<DashboardData>("/dashboard", dashboardFallback);
}

export function getRoadmapData() {
  return getJson<RoadmapApiData>("/roadmap", roadmapFallback);
}

export function getKnowledgeGraphData() {
  return getJson<GraphApiData>("/knowledge-graph", graphFallback);
}

export function getProgressData() {
  return getJson<ProgressApiData>("/progress", progressFallback);
}

export function getResourcesData() {
  return getJson<ResourceApiData>("/resources", resourceFallback);
}
