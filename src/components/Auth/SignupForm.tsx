"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoopLogo from "@/components/Common/LoopLogo";
import styles from "./auth.module.css";

type SignupMode = "CREATE" | "JOIN";

const SignupForm = () => {
  const router = useRouter();

  const [mode, setMode] = useState<SignupMode>("CREATE");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );
    const termsAccepted = formData.get("terms") === "on";

    const workspaceName = String(
      formData.get("workspaceName") ?? "",
    ).trim();

    const inviteCode = String(
      formData.get("inviteCode") ?? "",
    ).trim();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (mode === "CREATE" && !workspaceName) {
      setError("Please enter a workspace name.");
      return;
    }

    if (mode === "JOIN" && !inviteCode) {
      setError("Please enter your invite code.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          mode,
          workspaceName: mode === "CREATE" ? workspaceName : undefined,
          inviteCode: mode === "JOIN" ? inviteCode : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to create your account.");
      }

      setMessage(
        mode === "CREATE"
          ? "Workspace created successfully. Redirecting to login..."
          : "You joined the workspace successfully. Redirecting to login...",
      );

      setTimeout(() => {
        router.push("/login");
      }, 900);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong during signup.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.brandBlock}>
        <LoopLogo size={54} />

        <div className={styles.brandText}>
          <span>LOOP</span>
          <small>Customer Feedback Intelligence</small>
        </div>
      </div>

      <div className={styles.formHeader}>
        <p className={styles.eyebrow}>GET STARTED</p>

        <h1>
          {mode === "CREATE"
            ? "Create your workspace"
            : "Join a workspace"}
        </h1>

        <p>
          {mode === "CREATE"
            ? "Bring customer feedback together and turn it into intelligence."
            : "Join your team workspace using the invite code provided by an admin."}
        </p>
      </div>

      <div className={styles.signupMode}>
        <label
          className={`${styles.modeOption} ${
            mode === "CREATE" ? styles.modeOptionActive : ""
          }`}
        >
          <input
            type="radio"
            name="signupMode"
            value="CREATE"
            checked={mode === "CREATE"}
            onChange={() => {
              setMode("CREATE");
              setError("");
              setMessage("");
            }}
          />

          <span className={styles.radioIndicator} />

          <span className={styles.modeContent}>
            <strong>Create Workspace</strong>
            <small>Start a new workspace as admin</small>
          </span>
        </label>

        <label
          className={`${styles.modeOption} ${
            mode === "JOIN" ? styles.modeOptionActive : ""
          }`}
        >
          <input
            type="radio"
            name="signupMode"
            value="JOIN"
            checked={mode === "JOIN"}
            onChange={() => {
              setMode("JOIN");
              setError("");
              setMessage("");
            }}
          />

          <span className={styles.radioIndicator} />

          <span className={styles.modeContent}>
            <strong>Join Workspace</strong>
            <small>Use an invite code from your admin</small>
          </span>
        </label>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {mode === "CREATE" ? (
          <div className={styles.fieldGroup}>
            <label htmlFor="signup-workspace">
              Workspace Name
            </label>

            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 20V7.5L12 4l8 3.5V20"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <input
                id="signup-workspace"
                name="workspaceName"
                type="text"
                placeholder="Enter your workspace name"
                autoComplete="organization"
              />
            </div>
          </div>
        ) : (
          <div className={styles.fieldGroup}>
            <label htmlFor="signup-invite">
              Invite Code
            </label>

            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8.5 15.5 15.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M7 17a3.5 3.5 0 1 1-5-5l4-4a3.5 3.5 0 0 1 5 0"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M17 7a3.5 3.5 0 1 1 5 5l-4 4a3.5 3.5 0 0 1-5 0"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <input
                id="signup-invite"
                name="inviteCode"
                type="text"
                placeholder="Enter your unique invite code"
                autoComplete="off"
                spellCheck={false}
                style={{ textTransform: "uppercase" }}
              />
            </div>
          </div>
        )}

        <div className={styles.fieldGroup}>
          <label htmlFor="signup-name">Full name</label>

          <div className={styles.inputWrapper}>
            <svg
              className={styles.inputIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="3.2"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M5 20c.7-3.6 3.2-5.5 7-5.5s6.3 1.9 7 5.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="signup-name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="signup-email">Work email</label>

          <div className={styles.inputWrapper}>
            <svg
              className={styles.inputIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6.5h16v11H4z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="m5 8 7 5 7-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="signup-password">Password</label>

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
                strokeWidth="1.7"
              />
              <path
                d="M8 10V7.5a4 4 0 0 1 8 0V10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="signup-confirm-password">
            Confirm password
          </label>

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
                strokeWidth="1.7"
              />
              <path
                d="M8 10V7.5a4 4 0 0 1 8 0V10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <label className={styles.checkboxRow}>
          <input type="checkbox" name="terms" />

          <span>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </span>
        </label>

        {error ? (
          <div className={styles.formError} role="alert">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className={styles.formSuccess} role="status">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={loading}
        >
          <span>
            {loading
              ? "Creating account..."
              : mode === "CREATE"
                ? "Create Workspace"
                : "Join Workspace"}
          </span>

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
        </button>
      </form>

      <div className={styles.switchAuth}>
        <span>Already have an account?</span>

        <Link href="/login">Sign in</Link>
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
            d="m9 12 2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <span>Your workspace is protected by LOOP authentication</span>
      </div>
    </div>
  );
};

export default SignupForm;
