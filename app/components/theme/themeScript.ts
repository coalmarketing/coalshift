/**
 * Inline, render-blocking theme bootstrap.
 *
 * Runs in <head> before first paint so the correct theme class is on <html>
 * with no flash. Resolution order:
 *   1. a valid "light" / "dark" value in localStorage (a manual choice), else
 *   2. the system `prefers-color-scheme`, else
 *   3. a safe light fallback when storage or `matchMedia` is unavailable.
 * The class, `color-scheme` and `data-theme` are all set before paint. A manual
 * toggle writes the explicit value, so it keeps overriding the system on later
 * routes and reloads. Later OS changes on an already-open page are not followed.
 */
export const THEME_STORAGE_KEY = "coalshift-theme";

export const themeScript = `
(function () {
  try {
    var stored = null;
    try { stored = window.localStorage.getItem("${THEME_STORAGE_KEY}"); } catch (e) {}
    var theme = stored === "light" || stored === "dark" ? stored : null;
    if (!theme) {
      try {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } catch (e) {
        theme = "light";
      }
    }
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.setAttribute("data-theme", theme);
  } catch (e) {
    var root = document.documentElement;
    root.classList.remove("dark");
    root.style.colorScheme = "light";
    root.setAttribute("data-theme", "light");
  }
})();
`;
