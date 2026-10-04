export type MasteryStatus = "mastered" | "learning" | "weak" | "locked";
export type Concept = {
  id: string;
  name: string;
  mastery: number;
  status: MasteryStatus;
  difficulty: number;
  x: number;
  y: number;
  prerequisites?: string[];
};
export type RoadmapItem = {
  id: string;
  title: string;
  meta: string;
  mastery: number;
  status: "done" | "current" | "upcoming";
  time: string;
  description: string;
};
