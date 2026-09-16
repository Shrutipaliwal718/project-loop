"use client";

import Link from "next/link";
import { useState } from "react";
import LoopLogo from "@/components/Common/LoopLogo";
import styles from "./auth.module.css";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        <h1>Create your workspace</h1>

        <p>Bring customer feedback together and turn it into intelligence.</p>
      </div>

      <form className={styles.form}>
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
          <label htmlFor="signup-confirm-password">Confirm password</label>

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
              onClick={() => setShowConfirmPassword((current) => !current)}
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

        <button type="submit" className={styles.primaryButton}>
          <span>Create workspace</span>

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
            strokeLinejoin="round"
          />
        </svg>

        <span>Your workspace is protected by LOOP authentication</span>
      </div>
    </div>
  );
};

export default SignupForm;
