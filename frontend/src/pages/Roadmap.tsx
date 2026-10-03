import { Clock3, RefreshCw, Route } from "lucide-react";
import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import RoadmapList from "../components/roadmap/RoadmapList";
import { getRoadmapData, type RoadmapApiData } from "../lib/data";

export default function Roadmap() {
  const [data, setData] = useState<RoadmapApiData | null>(null);

  useEffect(() => {
    let active = true;
    getRoadmapData().then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const roadmap = data ?? {
    summary: {
      title: "DBMS · Exam readiness",
      subtitle: "30-day target · 1.5 hours/day · Proficiency level 3",
      concept_count: 32,
      study_hours: "18.5 / 30h",
      updated: "Updated today",
    },
    items: [
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
        description:
          "Practice identifying minimal superkeys and candidate keys.",
      },
      {
        id: "3",
        title: "Normalization",
        meta: "Target concept",
        mastery: 31,
        status: "upcoming",
        time: "55 min",
        description:
          "Move from 1NF through BCNF using dependency-driven examples.",
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
    ],
  };

  return (
    <AppShell title="Roadmap" eyebrow="ADAPTIVE PATH">
      <div className="roadmap-summary">
        <div>
          <h2>{roadmap.summary.title}</h2>
          <p>{roadmap.summary.subtitle}</p>
        </div>
        <div className="roadmap-summary-stats">
          <span>
            <Route size={15} /> {roadmap.summary.concept_count} concepts
          </span>
          <span>
            <Clock3 size={15} /> {roadmap.summary.study_hours}
          </span>
          <span>
            <RefreshCw size={15} /> {roadmap.summary.updated}
          </span>
        </div>
      </div>
      <div className="adaptive-note">
        <div className="note-icon">
          <RefreshCw size={17} />
        </div>
        <div>
          <strong>This roadmap is live.</strong>
          <span>
            Every assessment updates mastery and can change what appears next.
          </span>
        </div>
      </div>
      <RoadmapList items={roadmap.items} />
    </AppShell>
  );
}
