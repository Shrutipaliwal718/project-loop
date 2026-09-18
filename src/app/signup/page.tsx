import Link from "next/link";
import SignupForm from "@/components/Auth/SignupForm";
import styles from "@/components/Auth/auth.module.css";

export default function SignupPage() {
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
          <SignupForm />
        </div>

        <aside className={styles.infoColumn}>
          <div className={styles.infoContent}>
            <div className={styles.infoBadge}>
              <span />
              Built for modern customer teams
            </div>

            <h2>
              Your feedback already has
              <span> the answers.</span>
            </h2>

            <p>
              LOOP helps your team surface those answers through analytics,
              AI-powered classification and customer intelligence.
            </p>

            <div className={styles.metricPreview}>
              <div className={styles.metricHeader}>
                <span>Customer signal</span>

                <span className={styles.liveIndicator}>
                  <i />
                  LIVE
                </span>
              </div>

              <div className={styles.metricValue}>
                <strong>86%</strong>
                <span>positive sentiment</span>
              </div>

              <div className={styles.miniChart}>
                <span style={{ height: "38%" }} />
                <span style={{ height: "52%" }} />
                <span style={{ height: "46%" }} />
                <span style={{ height: "67%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "78%" }} />
                <span style={{ height: "91%" }} />
              </div>
            </div>

            <div className={styles.signalRow}>
              <div>
                <span className={styles.signalDot} />
                <span>Sentiment</span>
              </div>

              <strong>Positive</strong>
            </div>

            <div className={styles.signalRow}>
              <div>
                <span className={`${styles.signalDot} ${styles.violetDot}`} />
                <span>Top theme</span>
              </div>

              <strong>Product experience</strong>
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
