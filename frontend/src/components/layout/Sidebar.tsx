import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Network,
  BookOpenCheck,
  BarChart3,
  Library,
  Settings,
  ChevronRight,
} from "lucide-react";
import Logo from "./Logo";
const links = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/roadmap", "Roadmap", Map],
  ["/knowledge-graph", "Knowledge graph", Network],
  ["/learn/sql", "Learn", BookOpenCheck],
  ["/progress", "Progress", BarChart3],
  ["/resources", "Resources", Library],
] as const;
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="side-top">
        <Logo />
      </div>
      <div className="side-section">
        <span className="side-label">WORKSPACE</span>
        {links.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `side-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
            {label === "Roadmap" && <span className="side-count">4</span>}
          </NavLink>
        ))}
      </div>
      <div className="side-bottom">
        <div className="profile">
          <div className="avatar">K</div>
          <div>
            <strong>Kaushik</strong>
            <span>DBMS · 30 days</span>
          </div>
          <ChevronRight size={15} />
        </div>
        <NavLink to="/settings" className="side-link">
          <Settings size={17} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
