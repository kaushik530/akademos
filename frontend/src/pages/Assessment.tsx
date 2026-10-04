import { useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { quiz } from "../lib/data";
export default function Assessment() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  if (done)
    return (
      <div className="assessment-result">
        <div className="result-mark">
          <CheckCircle2 size={28} />
        </div>
        <span className="eyebrow">ASSESSMENT COMPLETE</span>
        <h1>Your learner model has been updated.</h1>
        <p>
          Akademos estimates your Functional Dependencies mastery at{" "}
          <strong>62%</strong>. The roadmap will use this result to decide what
          comes next.
        </p>
        <div className="result-card">
          <span>NEW MASTERY</span>
          <strong>62%</strong>
          <div className="result-delta">+14 percentage points</div>
        </div>
        <button className="primary-btn" onClick={() => nav("/roadmap")}>
          See updated roadmap <ArrowRight size={15} />
        </button>
      </div>
    );
  const q = quiz[i];
  return (
    <div className="assessment">
      <header className="assessment-head">
        <div className="logo">
          <span className="logo-mark">A</span>
          <span>
            akadem<span className="logo-accent">o</span>s
          </span>
        </div>
        <span>
          Diagnostic · {i + 1} of {quiz.length}
        </span>
      </header>
      <main>
        <div className="assessment-kicker">
          <BrainCircuit size={18} /> ADAPTIVE ASSESSMENT
        </div>
        <div className="assessment-progress">
          <span style={{ width: `${(i / quiz.length) * 100}%` }} />
        </div>
        <h1>{q.q}</h1>
        <div className="answer-list">
          {q.opts.map((o, j) => (
            <button
              className={`answer ${selected === j ? "selected" : ""}`}
              onClick={() => setSelected(j)}
              key={o}
            >
              <span>{String.fromCharCode(65 + j)}</span>
              {o}
            </button>
          ))}
        </div>
        <button
          className="primary-btn answer-next"
          disabled={selected === null}
          onClick={() =>
            i < quiz.length - 1
              ? (setI(i + 1), setSelected(null))
              : setDone(true)
          }
        >
          {i < quiz.length - 1 ? "Next question" : "Finish assessment"}{" "}
          <ArrowRight size={15} />
        </button>
      </main>
    </div>
  );
}
