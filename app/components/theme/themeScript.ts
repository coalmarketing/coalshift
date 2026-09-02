/**
 * Inline, render-blocking theme bootstrap.
 *
 * Runs in <head> before first paint so the correct theme class is on <html>
 * with no flash. First visit defaults to dark; an explicit choice is read back
 * from localStorage. System `prefers-color-scheme` is intentionally ignored
 * (the family design ships dark-first). Every storage access is guarded so a
 * blocked/again-unavailable storage API cannot break rendering.
 */
export const THEME_STORAGE_KEY = "coalshift-theme";

export const themeScript = `
(function () {
  try {
    var stored = null;
    try { stored = window.localStorage.getItem("${THEME_STORAGE_KEY}"); } catch (e) {}
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;
