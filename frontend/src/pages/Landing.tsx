import React, { useEffect, useState } from "react";
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
  const [introFinished, setIntroFinished] = useState(false);
  const [introFading, setIntroFading] = useState(false);

  useEffect(() => {
    // Don't allow scrolling while intro is playing
    document.body.style.overflow = "hidden";

    // Start fading Akademos
    const fadeTimer = setTimeout(() => {
      setIntroFading(true);
    }, 1000);

    // Finish intro
    const finishTimer = setTimeout(() => {
      setIntroFinished(true);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen">

      {!introFinished && (
        <div
          className={`
            fixed inset-0 z-[100]
            flex items-center justify-center
            overflow-hidden
            bg-[#f7f0e7]
            font-times
            transition-all duration-[1200ms] ease-in-out
            ${
              introFading
                ? "opacity-0 scale-[1.02]"
                : "opacity-100 scale-100"
            }
          `}
        >
          {/* Rings */}
          <div
            className="
              absolute
              top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[550px] h-[550px]
              lg:w-[750px] lg:h-[750px]
              pointer-events-none
              opacity-15
            "
          >
            <div
              className="
                w-full h-full
                rounded-full
                border border-[#92817A]
                flex items-center justify-center
              "
            >
              <div
                className="
                  w-[80%] h-[80%]
                  rounded-full
                  border border-dashed border-[#92817A]
                  flex items-center justify-center
                "
              >
                <div
                  className="
                    w-[60%] h-[60%]
                    rounded-full
                    border border-[#92817A]
                  "
                />
              </div>
            </div>
          </div>

          {/* Akademos title */}
          <main
            className="
              relative z-10
              flex flex-col
              items-center
              text-center
              akademos-fade-in
            "
          >
            <h1
              className="
                font-times
                text-6xl sm:text-7xl lg:text-8xl
                tracking-[0.24em]
                font-normal
                text-[#000500]
                mb-6
                akademos-scale-in
              "
            >
              Akademos.
            </h1>

            <div
              className="
                w-16 h-[1px]
                bg-[#92817A]/40
                akademos-fade-in
              "
              style={{
                animationDelay: "0.2s",
                animationFillMode: "both",
              }}
            />
          </main>
        </div>
      )}

      
      <div
        className={`
          transition-all
          duration-[1600ms]
          ease-out
          ${
            introFinished
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }
        `}
      >

        <div className="landing">

          

          <nav className="landing-nav">

            <div className="logo">
              <span className="logo-mark">A</span>

              <span>
                akadem
                <span className="logo-accent">o</span>
                s
              </span>
            </div>

            <div className="nav-center">
              <a href="#how">How it works</a>
              <a href="#adaptive">Adaptive engine</a>
              <a href="#graph">Knowledge graph</a>
            </div>

            <div className="nav-right">
              

              <Link to="/login" className="nav-cta">
                Login/Sign up
                <ArrowRight size={15} />
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
                Akademos builds a learning path around your goal,
                your time, your resources, and what you actually know.
              </p>

              <div className="hero-actions">

                <Link
                  to="/onboarding"
                  className="primary-btn"
                >
                  Build my learning path
                  <ArrowRight size={16} />
                </Link>

                

              </div>

              <div className="hero-note">
                <span className="note-dot" />
                Your roadmap changes when your understanding changes.
              </div>

            </div>


            <div className="hero-visual">

              <div className="graph-preview">

                <div className="preview-head">
                  <span>LIVE LEARNER MODEL</span>

                  <span className="live">
                    <i />
                    Updating
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

                    <svg
                      viewBox="0 0 600 330"
                      preserveAspectRatio="none"
                    >
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

                    <b>
                      Functional Dependencies
                    </b>

                    <small>
                      Prerequisite gap detected
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </section>


          <section
            id="how"
            className="how-section"
          >

            <div className="section-intro">

              <span className="eyebrow">
                THE LOOP
              </span>

              <h2>
                One system. Not a fixed course.
              </h2>

              <p>
                Akademos turns your material into a structured
                model, then uses your performance to decide
                what happens next.
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


          <section
            id="adaptive"
            className="statement"
          >

            <span className="eyebrow">
              THE DIFFERENCE
            </span>

            <h2>
              Traditional courses give you a path.
              <br />
              <span>
                Akademos gives you a path that can change.
              </span>
            </h2>

            <Link
              to="/onboarding"
              className="secondary-btn"
            >
              Start with your goal
              <ArrowRight size={15} />
            </Link>

          </section>

        </div>

      </div>

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
      <div className="step-number">{n}</div>

      <div className="step-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}