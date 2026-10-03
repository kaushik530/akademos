import { ArrowUpRight, Check, Clock, LockKeyhole } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";

export type RoadmapItemView = {
  id: string;
  title: string;
  meta: string;
  mastery: number;
  status: "done" | "current" | "upcoming";
  time: string;
  description: string;
};

export default function RoadmapList({ items }: { items: RoadmapItemView[] }) {
  return (
    <div className="roadmap-list">
      {items.map((item, i) => (
        <div className={`roadmap-item ${item.status}`} key={item.id}>
          <div className="road-line">
            <span className="road-node">
              {item.status === "done" ? <Check size={14} /> : i + 1}
            </span>
            {i < items.length - 1 && <span className="road-stem" />}
          </div>
          <div className="road-card">
            <div className="road-card-head">
              <div>
                <div className="micro">{item.meta}</div>
                <h3>{item.title}</h3>
              </div>
              <Badge tone={item.status === "current" ? "warn" : "neutral"}>
                {item.status === "current" ? "Up next" : item.status}
              </Badge>
            </div>
            <p>{item.description}</p>
            <div className="road-meta">
              <span>
                <Clock size={14} />
                {item.time}
              </span>
              <span>Mastery {item.mastery}%</span>
            </div>
            <ProgressBar value={item.mastery} />
            <div className="road-card-foot">
              <span>
                {item.status === "current" ? "Recommended next" : "Planned"}
              </span>
              {item.status === "current" ? (
                <button className="text-btn">
                  Start session <ArrowUpRight size={14} />
                </button>
              ) : (
                <span className="muted">
                  <LockKeyhole size={13} /> Unlocks adaptively
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
