import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Clock3,
  Lightbulb,
  Network,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import ProgressBar from "../components/ui/ProgressBar";
export default function Learn() {
  const { conceptId } = useParams();
  return (
    <AppShell title="Learning session" eyebrow="FUNCTIONAL DEPENDENCIES">
      <div className="learn-layout">
        <article className="learn-content">
          <div className="session-meta">
            <span>
              <Clock3 size={14} /> 42 min
            </span>
            <span>
              <Network size={14} /> prerequisite for Normalization
            </span>
          </div>
          <h2>Functional Dependencies</h2>
          <p className="lead">
            A functional dependency describes a constraint between two sets of
            attributes in a relation.
          </p>
          <div className="lesson-block">
            <span className="eyebrow">01 · CORE IDEA</span>
            <h3>When one attribute determines another</h3>
            <p>
              If the value of attribute X uniquely determines the value of
              attribute Y, we write <code>X → Y</code>. This becomes the
              foundation for reasoning about keys and normalization.
            </p>
            <div className="example">
              <span>Example</span>
              <strong>StudentID → StudentName</strong>
              <p>
                A StudentID should identify exactly one student name in the
                relation.
              </p>
            </div>
          </div>
          <div className="lesson-block">
            <span className="eyebrow">02 · FROM YOUR MATERIAL</span>
            <h3>Why this matters for your roadmap</h3>
            <p>
              Your current mastery is 48%. Normalization is at 31%, and the
              graph identifies functional dependencies as a prerequisite
              bottleneck. Strengthening this concept is expected to unlock the
              next step.
            </p>
          </div>
          <div className="learn-actions">
            <Link to="/roadmap" className="secondary-btn">
              <ArrowLeft size={15} /> Back
            </Link>
            <Link to="/assessment/1" className="primary-btn">
              Test my understanding <ArrowRight size={15} />
            </Link>
          </div>
        </article>
        <aside className="session-aside">
          <div className="session-card">
            <span className="eyebrow">SESSION PROGRESS</span>
            <strong>1 / 3</strong>
            <ProgressBar value={34} />
            <small>Concept explanation</small>
            <div className="session-list">
              <span className="active">
                <i />
                Core idea
              </span>
              <span>
                <i />
                Worked examples
              </span>
              <span>
                <i />
                Assessment
              </span>
            </div>
          </div>
          <div className="insight-card">
            <Lightbulb size={18} />
            <div>
              <strong>Why this now?</strong>
              <p>
                It is the weakest prerequisite on your current path to
                Normalization.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
