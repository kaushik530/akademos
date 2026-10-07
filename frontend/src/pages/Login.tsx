import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // --------------------------------
    // SIGNUP VALIDATION
    // --------------------------------

    if (isSignup) {
      if (!formData.name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (!formData.email.trim()) {
        setError("Please enter your email.");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    // --------------------------------
    // LOGIN VALIDATION
    // --------------------------------

    if (!isSignup) {
      if (!formData.email.trim()) {
        setError("Please enter your email.");
        return;
      }

      if (!formData.password) {
        setError("Please enter your password.");
        return;
      }
    }

    try {
      // --------------------------------
      // API ENDPOINT
      // --------------------------------

      const endpoint = isSignup
        ? "http://127.0.0.1:8000/api/auth/signup"
        : "http://127.0.0.1:8000/api/auth/login";

      // --------------------------------
      // REQUEST BODY
      // --------------------------------

      const requestBody = isSignup
        ? {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }
        : {
            email: formData.email.trim(),
            password: formData.password,
          };

      // --------------------------------
      // SEND REQUEST TO FASTAPI
      // --------------------------------

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // --------------------------------
      // HANDLE BACKEND ERROR
      // --------------------------------

      if (!response.ok) {
        throw new Error(
          data.detail || "Something went wrong. Please try again."
        );
      }

      // --------------------------------
      // SAVE JWT + USER
      // --------------------------------

      localStorage.setItem(
        "akademosToken",
        data.access_token
      );

      localStorage.setItem(
        "akademosUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "akademosAuthenticated",
        "true"
      );

      // --------------------------------
      // SUCCESS + REDIRECT
      // --------------------------------

      if (isSignup) {
        setSuccess("Account created successfully.");

        setTimeout(() => {
          navigate("/onboarding");
        }, 700);
      } else {
        setSuccess("Welcome back.");

        setTimeout(() => {
          navigate("/dashboard");
        }, 700);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server."
      );
    }
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setError("");
    setSuccess("");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="auth-page">

      {/* -------------------------------- */}
      {/* BACKGROUND RINGS */}
      {/* -------------------------------- */}

      <div className="auth-rings">
        <div className="auth-ring auth-ring-one">
          <div className="auth-ring auth-ring-two">
            <div className="auth-ring auth-ring-three" />
          </div>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* TOP LOGO */}
      {/* -------------------------------- */}

      <header className="auth-header">

        <Link to="/" className="logo auth-logo">
          <div className="logo">
            <span className="logo-mark">A</span>

            <span>
              akadem
              <span className="logo-accent">o</span>
              s
            </span>
          </div>
        </Link>

      </header>

      {/* -------------------------------- */}
      {/* MAIN AUTH CONTAINER */}
      {/* -------------------------------- */}

      <main className="auth-container">

        <div className="auth-card">

          {/* -------------------------------- */}
          {/* HEADING */}
          {/* -------------------------------- */}

          <div className="auth-heading">

            <span className="auth-eyebrow">
              {isSignup
                ? "BEGIN YOUR PATH"
                : "WELCOME BACK"}
            </span>

            <h1>
              {isSignup
                ? "Create your account."
                : "Continue learning."}
            </h1>

            <p>
              {isSignup
                ? "Build a learning path around what you actually know."
                : "Pick up where your learning path left off."}
            </p>

          </div>

          {/* -------------------------------- */}
          {/* FORM */}
          {/* -------------------------------- */}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* -------------------------------- */}
            {/* NAME - SIGNUP ONLY */}
            {/* -------------------------------- */}

            {isSignup && (
              <div className="input-group">

                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />

              </div>
            )}

            {/* -------------------------------- */}
            {/* EMAIL */}
            {/* -------------------------------- */}

            <div className="input-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />

            </div>

            {/* -------------------------------- */}
            {/* PASSWORD */}
            {/* -------------------------------- */}

            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder={
                    isSignup
                      ? "At least 8 characters"
                      : "Your password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete={
                    isSignup
                      ? "new-password"
                      : "current-password"
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>

            {/* -------------------------------- */}
            {/* CONFIRM PASSWORD - SIGNUP ONLY */}
            {/* -------------------------------- */}

            {isSignup && (
              <div className="input-group">

                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className="password-wrapper">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>
            )}

            {/* -------------------------------- */}
            {/* FORGOT PASSWORD */}
            {/* -------------------------------- */}

            {!isSignup && (
              <div className="forgot-row">

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError(
                      "Password reset will be available soon."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>
            )}

            {/* -------------------------------- */}
            {/* ERROR MESSAGE */}
            {/* -------------------------------- */}

            {error && (
              <div className="auth-message error">
                {error}
              </div>
            )}

            {/* -------------------------------- */}
            {/* SUCCESS MESSAGE */}
            {/* -------------------------------- */}

            {success && (
              <div className="auth-message success">
                <Check size={15} />
                {success}
              </div>
            )}

            {/* -------------------------------- */}
            {/* SUBMIT BUTTON */}
            {/* -------------------------------- */}

            <button
              type="submit"
              className="auth-submit"
            >

              <span>
                {isSignup
                  ? "Create my account"
                  : "Log in"}
              </span>

              <ArrowRight size={16} />

            </button>

          </form>

          {/* -------------------------------- */}
          {/* DIVIDER */}
          {/* -------------------------------- */}

          <div className="auth-divider">
            <span />
            <p>OR</p>
            <span />
          </div>

          {/* -------------------------------- */}
          {/* GOOGLE */}
          {/* -------------------------------- */}

          <button
            type="button"
            className="google-button"
            onClick={() =>
              setError(
                "Google authentication will be connected soon."
              )
            }
          >

            <span className="google-icon">
              G
            </span>

            Continue with Google

          </button>

          {/* -------------------------------- */}
          {/* SWITCH LOGIN / SIGNUP */}
          {/* -------------------------------- */}

          <div className="auth-switch">

            <span>
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>

            <button
              type="button"
              onClick={switchMode}
            >
              {isSignup
                ? "Log in"
                : "Sign up"}
            </button>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* FOOTER */}
        {/* -------------------------------- */}

        <p className="auth-footer">
          By continuing, you agree to Akademos'{" "}
          <span>Terms</span> and{" "}
          <span>Privacy Policy</span>.
        </p>

      </main>

    </div>
  );
}