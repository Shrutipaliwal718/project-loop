export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  try {
    const saved = localStorage.getItem("loop_theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // ignore
  }

  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return;

  const isLight = theme === "light";
  document.documentElement.classList.toggle("light", isLight);

  try {
    localStorage.setItem("loop_theme", theme);
  } catch {
    // ignore
  }

  window.dispatchEvent(new Event("loop-theme-change"));
}

export function toggleTheme(): Theme {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
