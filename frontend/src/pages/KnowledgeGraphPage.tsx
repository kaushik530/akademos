import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import KnowledgeGraph from "../components/knowledge-graph/KnowledgeGraph";
import { getKnowledgeGraphData, type GraphApiData } from "../lib/data";

export default function KnowledgeGraphPage() {
  const [data, setData] = useState<GraphApiData | null>(null);

  useEffect(() => {
    let active = true;
    getKnowledgeGraphData().then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const graphData = data ?? {
    concepts: [
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
    ],
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

  return (
    <AppShell title="Knowledge graph" eyebrow="LEARNER MODEL">
      <div className="graph-page-head">
        <div>
          <h2>DBMS concept map</h2>
          <p>
            32 concepts · 47 prerequisite relationships · learner state included
          </p>
        </div>
        <button className="secondary-btn">
          <SlidersHorizontal size={15} /> Filter
        </button>
      </div>
      <div className="graph-legend">
        {graphData.legend.map((item) => (
          <span key={item.tone}>
            <i className={`lg ${item.tone}`} />
            {item.label}
          </span>
        ))}
      </div>
      <KnowledgeGraph concepts={graphData.concepts} edges={graphData.edges} />
    </AppShell>
  );
}
