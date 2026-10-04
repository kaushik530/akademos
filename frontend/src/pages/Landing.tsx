import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  Network,
  Play,
  ScanSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="logo">
          <span className="logo-mark">A</span>
          <span>
            akadem<span className="logo-accent">o</span>s
          </span>
        </div>
        <div className="nav-center">
          <a href="#how">How it works</a>
          <a href="#adaptive">Adaptive engine</a>
          <a href="#graph">Knowledge graph</a>
        </div>
        <div className="nav-right">
          <Link to="/dashboard" className="nav-login">
            Open demo
          </Link>
          <Link to="/onboarding" className="nav-cta">
            Build my path <ArrowRight size={15} />
          </Link>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <div className="kicker">
            <span />
            ADAPTIVE LEARNING SYSTEM
          </div>
          <h1>
            Learn what you need.
            <br />
            <em>Skip what you know.</em>
          </h1>
          <p>
            Akademos builds a learning path around your goal, your time, your
            resources, and what you actually know.
          </p>
          <div className="hero-actions">
            <Link to="/onboarding" className="primary-btn">
              Build my learning path <ArrowRight size={16} />
            </Link>
            <a href="#how" className="secondary-btn">
              <Play size={14} /> See how it works
            </a>
          </div>
          <div className="hero-note">
            <span className="note-dot" /> Your roadmap changes when your
            understanding changes.
          </div>
        </div>
        <div className="hero-visual">
          <div className="graph-preview">
            <div className="preview-head">
              <span>LIVE LEARNER MODEL</span>
              <span className="live">
                <i /> Updating
              </span>
            </div>
            <div className="preview-grid">
              <div className="preview-main">
                <div className="fake-node n1">
                  SQL <b>92%</b>
                </div>
                <div className="fake-node n2">
                  Functional Dependencies <b>48%</b>
                </div>
                <div className="fake-node n3">
                  Normalization <b>31%</b>
                </div>
                <div className="fake-node n4">
                  Transactions <b>65%</b>
                </div>
                <svg viewBox="0 0 600 330" preserveAspectRatio="none">
                  <path d="M130 55 C190 70 210 125 280 145" />
                  <path d="M370 180 C390 205 390 220 380 260" />
                  <path d="M420 170 C470 170 490 190 510 230" />
                </svg>
              </div>
              <div className="preview-side">
                <span>MASTERY</span>
                <strong>71%</strong>
                <div className="mini-bar">
                  <i style={{ width: "71%" }} />
                </div>
                <small>
                  23 of 32 concepts
                  <br />
                  at target depth
                </small>
                <div className="preview-divider" />
                <span>NEXT MOVE</span>
                <b>Functional Dependencies</b>
                <small>Prerequisite gap detected</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how" className="how-section">
        <div className="section-intro">
          <span className="eyebrow">THE LOOP</span>
          <h2>One system. Not a fixed course.</h2>
          <p>
            Akademos turns your material into a structured model, then uses your
            performance to decide what happens next.
          </p>
        </div>
        <div className="steps">
          <Step
            n="01"
            icon={<ScanSearch />}
            title="Assess"
            text="Measure concept-level knowledge instead of assuming a blank slate."
          />
          <Step
            n="02"
            icon={<Network />}
            title="Map"
            text="Build a prerequisite graph from the material you need to learn."
          />
          <Step
            n="03"
            icon={<BrainCircuit />}
            title="Adapt"
            text="Update mastery and recalculate the path after every meaningful assessment."
          />
          <Step
            n="04"
            icon={<Clock3 />}
            title="Schedule"
            text="Fit the highest-value work into the time you actually have."
          />
        </div>
      </section>
      <section id="adaptive" className="statement">
        <span className="eyebrow">THE DIFFERENCE</span>
        <h2>
          Traditional courses give you a path.
          <br />
          <span>Akademos gives you a path that can change.</span>
        </h2>
        <Link to="/onboarding" className="secondary-btn">
          Start with your goal <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
function Step({
  n,
  icon,
  title,
  text,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="step">
      <div className="step-num">{n}</div>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
