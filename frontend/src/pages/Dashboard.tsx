import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Flame,
  Network,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import ProgressBar from "../components/ui/ProgressBar";
import { getDashboardData, type DashboardData } from "../lib/data";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let active = true;
    getDashboardData().then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const dashboard = data ?? {
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

  return (
    <AppShell title="Overview" eyebrow="YOUR LEARNING PLAN">
      <div className="welcome-row">
        <div>
          <h2>{dashboard.title}</h2>
          <p>{dashboard.subtitle}</p>
        </div>
        <Link to="/roadmap" className="secondary-btn">
          View full roadmap <ArrowRight size={15} />
        </Link>
      </div>

      <div className="metric-grid">
        {dashboard.metrics.map((metric) => (
          <Metric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            sub={metric.subtext}
            icon={iconFor(metric.type)}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="panel main-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">ADAPTIVE ROADMAP</span>
              <h3>What to work on next</h3>
            </div>
            <Link to="/roadmap" className="panel-link">
              See all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="next-card">
            <div className="next-tag">RECOMMENDED NEXT</div>
            <div className="next-title">
              <div>
                <h2>{dashboard.next_concept.title}</h2>
                <p>{dashboard.next_concept.summary}</p>
              </div>
              <span className="big-mastery">
                {dashboard.next_concept.mastery}%
              </span>
            </div>
            <ProgressBar value={dashboard.next_concept.mastery} />
            <div className="next-foot">
              <span>
                <Clock3 size={14} /> {dashboard.next_concept.time}
              </span>
              <Link to={dashboard.next_concept.path} className="primary-btn">
                Start session <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="compact-roadmap">
            {dashboard.schedule.slice(0, 3).map((slot, index) => (
              <div className="compact-item" key={`${slot.day}-${slot.date}`}>
                <span className="compact-index">0{index + 2}</span>
                <div>
                  <strong>
                    {index === 0
                      ? "Candidate Keys"
                      : index === 1
                        ? "Normalization"
                        : "Transactions"}
                  </strong>
                  <small>
                    {index === 0
                      ? "Prerequisite · 28 min"
                      : index === 1
                        ? "Target concept · 55 min"
                        : "Next module · 45 min"}
                  </small>
                </div>
                <span>{index === 0 ? 68 : index === 1 ? 31 : 65}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">KNOWLEDGE GRAPH</span>
              <h3>Current state</h3>
            </div>
            <Link to="/knowledge-graph" className="panel-link">
              Explore <ChevronRight size={14} />
            </Link>
          </div>
          <div className="mini-graph">
            <div className="mini-line l1" />
            <div className="mini-line l2" />
            <div className="mini-node a">
              SQL<span>92%</span>
            </div>
            <div className="mini-node b">
              FD<span>48%</span>
            </div>
            <div className="mini-node c">
              Norm<span>31%</span>
            </div>
            <div className="mini-node d">
              TX<span>65%</span>
            </div>
          </div>
          <div className="graph-summary">
            <span>
              <i className="g-good" />
              Mastered <b>23</b>
            </span>
            <span>
              <i className="g-warn" />
              Learning <b>6</b>
            </span>
            <span>
              <i className="g-bad" />
              Weak <b>3</b>
            </span>
          </div>
        </section>
      </div>

      <section className="panel schedule-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">THIS WEEK</span>
            <h3>Study schedule</h3>
          </div>
          <span className="muted">
            <CalendarDays size={15} /> 5 days · 7.5h
          </span>
        </div>
        <div className="week">
          {dashboard.schedule.map((day) => (
            <Day
              key={`${day.day}-${day.date}`}
              d={day.day}
              n={day.date}
              done={day.status === "done"}
              current={day.status === "current"}
              off={day.status === "off"}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Metric({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="metric">
      <div className="metric-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{sub}</small>
    </div>
  );
}

function Day({
  d,
  n,
  done,
  current,
  off,
}: {
  d: string;
  n: string;
  done?: boolean;
  current?: boolean;
  off?: boolean;
}) {
  return (
    <div
      className={`day ${done ? "done" : ""} ${current ? "current" : ""} ${off ? "off" : ""}`}
    >
      <span>{d}</span>
      <b>{n}</b>
      <i>{done ? "✓" : current ? "•" : ""}</i>
    </div>
  );
}

function iconFor(type: string) {
  switch (type) {
    case "mastery":
      return <Target />;
    case "concepts":
      return <Network />;
    case "time":
      return <Clock3 />;
    case "streak":
      return <Flame />;
    default:
      return <Target />;
  }
}
