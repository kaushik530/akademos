import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import ProgressBar from "../components/ui/ProgressBar";
import { getProgressData, type ProgressApiData } from "../lib/data";

export default function Progress() {
  const [data, setData] = useState<ProgressApiData | null>(null);

  useEffect(() => {
    let active = true;
    getProgressData().then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const progress = data ?? {
    overall_mastery: 71,
    study_time_hours: 18.5,
    assessments: 14,
    accuracy: 86,
    reviews_due: 4,
    chart: [
      { day: "Sep 28", value: 55 },
      { day: "29", value: 58 },
      { day: "30", value: 60 },
      { day: "Oct 1", value: 63 },
      { day: "2", value: 67 },
      { day: "3", value: 71 },
    ],
    mastery_breakdown: [
      { name: "SQL Fundamentals", value: 92 },
      { name: "Relational Model", value: 84 },
      { name: "ER Model", value: 71 },
      { name: "Functional Dependencies", value: 48 },
      { name: "Normalization", value: 31 },
    ],
  };

  return (
    <AppShell title="Progress" eyebrow="MASTERY & RETENTION">
      <div className="metric-grid">
        <div className="metric">
          <span>Overall mastery</span>
          <strong>{progress.overall_mastery}%</strong>
          <small>Target 80%</small>
        </div>
        <div className="metric">
          <span>Study time</span>
          <strong>{progress.study_time_hours}h</strong>
          <small>
            {Math.round((progress.study_time_hours / 30) * 100)}% of plan
          </small>
        </div>
        <div className="metric">
          <span>Assessments</span>
          <strong>{progress.assessments}</strong>
          <small>{progress.accuracy}% accuracy</small>
        </div>
        <div className="metric">
          <span>Reviews due</span>
          <strong>{progress.reviews_due}</strong>
          <small>Next: tomorrow</small>
        </div>
      </div>

      <div className="progress-grid">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">MASTERY</span>
              <h3>Concept mastery over time</h3>
            </div>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progress.chart}>
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#92817a" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#92817a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis domain={[40, 90]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#362417"
                  strokeWidth={2}
                  fill="url(#area)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">CONCEPTS</span>
              <h3>Mastery breakdown</h3>
            </div>
          </div>
          {progress.mastery_breakdown.map((item) => (
            <Mastery key={item.name} n={item.name} v={item.value} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}

function Mastery({ n, v }: { n: string; v: number }) {
  return (
    <div className="mastery-row">
      <div>
        <span>{n}</span>
        <b>{v}%</b>
      </div>
      <ProgressBar value={v} />
    </div>
  );
}
