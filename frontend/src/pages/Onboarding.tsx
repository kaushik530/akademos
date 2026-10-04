import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  FileUp,
  GraduationCap,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const goals = [
  ["exam", "Pass an exam", GraduationCap],
  ["interview", "Pass an interview", BriefcaseBusiness],
  ["project", "Build a project", Target],
  ["job", "Become job-ready", BookOpen],
] as const;
export default function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("exam");
  const [subject, setSubject] = useState("DBMS");
  const [level, setLevel] = useState(3);
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(1.5);
  const labels = ["Subject", "Goal", "Proficiency", "Schedule", "Resources"];
  return (
    <div className="onboarding">
      <header className="onboard-head">
        <div className="logo">
          <span className="logo-mark">A</span>
          <span>
            akadem<span className="logo-accent">o</span>s
          </span>
        </div>
        <div className="stepper">
          {labels.map((x, i) => (
            <div
              className={`stepper-item ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
              key={x}
            >
              <span>{i < step ? <Check size={12} /> : i + 1}</span>
              {x}
            </div>
          ))}
        </div>
        <span className="save">Autosaved</span>
      </header>
      <main className="onboard-main">
        <div className="onboard-intro">
          <span className="eyebrow">SET UP YOUR LEARNING PATH</span>
          <h1>
            {step === 0
              ? "What do you want to learn?"
              : step === 1
                ? "What are you learning for?"
                : step === 2
                  ? "How far do you need to go?"
                  : step === 3
                    ? "How much time do you have?"
                    : "Bring the material you already trust."}
          </h1>
          <p>
            {step === 0
              ? "Akademos will use your subject as the starting point for the knowledge graph."
              : step === 1
                ? "Your goal changes which concepts and assessments receive priority."
                : step === 2
                  ? "Choose the depth you need. The target becomes the mastery threshold for your roadmap."
                  : step === 3
                    ? "We will fit the roadmap into your real schedule rather than inventing study time."
                    : "Upload notes, books, slides, or other material. They become the source for your learning path."}
          </p>
        </div>
        <div className="onboard-card">
          {step === 0 && (
            <>
              <label>Subject</label>
              <input
                className="big-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Data Structures & Algorithms"
              />
              <div className="suggestions">
                <span>DBMS</span>
                <span>Machine Learning</span>
                <span>Python</span>
                <span>Full-Stack Development</span>
              </div>
            </>
          )}
          {step === 1 && (
            <div className="choice-grid">
              {goals.map(([id, label, Icon]) => (
                <button
                  className={`choice ${goal === id ? "selected" : ""}`}
                  onClick={() => setGoal(id)}
                  key={id}
                >
                  <span className="choice-icon">
                    <Icon size={19} />
                  </span>
                  <strong>{label}</strong>
                  {goal === id && <Check className="choice-check" size={16} />}
                </button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="level-list">
              {[
                "Fundamentals",
                "Application",
                "Proficiency",
                "Project Ready",
                "Advanced",
              ].map((x, i) => (
                <button
                  className={`level ${level === i + 1 ? "selected" : ""}`}
                  onClick={() => setLevel(i + 1)}
                  key={x}
                >
                  <span>{i + 1}</span>
                  <div>
                    <strong>{x}</strong>
                    <small>
                      {
                        [
                          "Explain concepts and basic ideas",
                          "Apply concepts to standard problems",
                          "Solve unfamiliar problems independently",
                          "Build substantial projects",
                          "Handle complex problems and design decisions",
                        ][i]
                      }
                    </small>
                  </div>
                  {level === i + 1 && <Check size={17} />}
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="schedule-grid">
              <div>
                <label>Target duration</label>
                <div className="number-field">
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(+e.target.value)}
                  />
                  <span>days</span>
                </div>
              </div>
              <div>
                <label>Hours per day</label>
                <div className="number-field">
                  <input
                    type="number"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(+e.target.value)}
                  />
                  <span>hours</span>
                </div>
              </div>
              <div className="availability">
                <label>Study days</label>
                <div className="days">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <button className={i < 5 ? "on" : ""} key={`${d}${i}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="upload-zone">
              <div className="upload-icon">
                <FileUp size={23} />
              </div>
              <strong>Drop your learning material here</strong>
              <span>PDF, DOCX, TXT or Markdown · up to 50 MB</span>
              <button className="secondary-btn">Choose files</button>
            </div>
          )}
          <div className="onboard-foot">
            {step > 0 ? (
              <button
                className="secondary-btn"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={15} /> Back
              </button>
            ) : (
              <span />
            )}
            <button
              className="primary-btn"
              onClick={() =>
                step < 4 ? setStep(step + 1) : nav("/assessment")
              }
            >
              {step < 4 ? "Continue" : "Build my assessment"}{" "}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
