"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import LoopLogo from "@/components/Common/LoopLogo";
import styles from "./auth.module.css";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login request failed:", error);
      setError("Unable to connect to LOOP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.brandBlock}>
        <Link href="/" className={styles.logoLink}>
          <LoopLogo />
        </Link>

        <div className={styles.brandText}>
          <strong>LOOP</strong>
          <small>Customer Feedback Intelligence</small>
        </div>
      </div>

      <div className={styles.formHeader}>
        <p className={styles.eyebrow}>WELCOME BACK</p>

        <h1>Sign in to LOOP</h1>

        <p>
          Access your workspace and turn customer feedback into actionable
          intelligence.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label htmlFor="email">Work email</label>

          <div className={styles.inputWrapper}>
            <svg
              className={styles.inputIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="password">Password</label>

            <button
              type="button"
              className={styles.forgotButton}
              aria-label="Forgot password"
            >
              Forgot password?
            </button>
          </div>

          <div className={styles.inputWrapper}>
            <svg
              className={styles.inputIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 3l18 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.9 4.3A10.7 10.7 0 0 1 12 4c5.2 0 9 5 9 5s-1.1 1.5-3 2.9M6.1 6.1C4.1 7.3 3 9 3 9s3.8 5 9 5c1 0 2-.2 2.9-.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2.3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />

          <span>Keep me signed in on this device</span>
        </label>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2.5 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={loading}
        >
          <span>{loading ? "Signing in..." : "Sign in to LOOP"}</span>

          {!loading && (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="m13 6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </form>

      <div className={styles.switchAuth}>
        <span>Don&apos;t have an account?</span>

        <Link href="/signup">Create an account</Link>
      </div>

      <div className={styles.securityNote}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m9.2 12 1.9 1.9 3.8-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Your workspace data is protected and encrypted.</span>
      </div>
    </div>
  );
};

export default LoginForm;
