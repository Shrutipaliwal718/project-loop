import Link from "next/link";
import LoginForm from "@/components/Auth/LoginForm";
import styles from "@/components/Auth/auth.module.css";

export default function LoginPage() {
  return (
    <main className={styles.authPage}>
      <div className={styles.backgroundGlowOne} />
      <div className={styles.backgroundGlowTwo} />
      <div className={styles.backgroundGlowThree} />

      <div className={styles.gridBackground} />

      <Link href="/" className={styles.backButton}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="m11 6-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Back to Home</span>
      </Link>

      <section className={styles.authLayout}>
        <div className={styles.formColumn}>
          <LoginForm />
        </div>

        <aside className={styles.infoColumn}>
          <div className={styles.infoContent}>
            <div className={styles.infoBadge}>
              <span />
              AI-powered feedback intelligence
            </div>

            <h2>
              Close the loop between
              <span> feedback and action.</span>
            </h2>

            <p>
              LOOP brings customer feedback, sentiment, themes and actionable
              insights into one intelligent workspace.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 18V6m0 12h16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 15.5 11 11l3 2.5L20 7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <strong>Understand customer sentiment</strong>
                  <span>See what customers feel and why it matters.</span>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle
                      cx="8"
                      cy="8"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="m10.2 10.2 3.6 3.6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <strong>Discover emerging themes</strong>
                  <span>Identify recurring patterns across feedback.</span>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 4v16M4 12h16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>

                <div>
                  <strong>Turn insights into action</strong>
                  <span>Move from customer signals to smarter decisions.</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <footer className={styles.authFooter}>
        <span>&copy; 2026 LOOP</span>
        <span className={styles.footerDot}>&bull;</span>
        <span>Customer Feedback Intelligence</span>
      </footer>
    </main>
  );
}
