export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export const THEME_STORAGE_KEY = "theme";
export const THEME_PREFERENCE_ATTR = "data-theme-preference";

export const isThemeMode = (value: string | null): value is ThemeMode =>
  value === "light" || value === "dark";

export const isThemePreference = (
  value: string | null,
): value is ThemePreference => value === "system" || isThemeMode(value);

export const getStoredThemePreference = (): ThemePreference => {
  if (typeof window === "undefined") return "system";

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) return stored;
  } catch {}

  return "system";
};

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
};

export const resolveTheme = (preference: ThemePreference): ThemeMode =>
  preference === "system" ? getSystemTheme() : preference;

export const applyThemeToDocument = (
  preference: ThemePreference,
  resolvedTheme: ThemeMode,
) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.setAttribute(THEME_PREFERENCE_ATTR, preference);

  if (resolvedTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

