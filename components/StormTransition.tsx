"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  STORM_TRIGGER_EVENT,
  THEME_CHANGE_EVENT,
  StormCause,
  StormTriggerDetail,
  ThemeMode,
} from "@/utils/storm";
import {
  applyThemeToDocument,
  getStoredThemePreference,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/utils/theme";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches;

const applyTheme = (nextTheme: ThemeMode, preference: ThemePreference = "system") => {
  applyThemeToDocument(preference, nextTheme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
};

const setStorming = (cause: StormCause | null) => {
  if (typeof document === "undefined") return;
  if (cause) {
    document.documentElement.dataset.storming = cause;
  } else {
    document.documentElement.removeAttribute("data-storming");
  }
};

export default function StormTransition() {
  const activeRef = useRef(false);
  const pendingThemeRef = useRef<ThemeMode | null>(null);
  const pendingPreferenceRef = useRef<ThemePreference | null>(null);
  const endTimerRef = useRef<number | null>(null);
  const themeTimerRef = useRef<number | null>(null);
  const preferenceRef = useRef<ThemePreference>("system");

  const startStorm = useCallback((detail: StormTriggerDetail) => {
    const nextPreference = detail.preference ?? preferenceRef.current;

    if (activeRef.current) {
      if (detail.theme) {
        pendingThemeRef.current = detail.theme;
        pendingPreferenceRef.current = nextPreference;
        preferenceRef.current = nextPreference;
        applyTheme(detail.theme, nextPreference);
      }
      return;
    }
    if (prefersReducedMotion()) {
      if (detail.theme) {
        preferenceRef.current = nextPreference;
        applyTheme(detail.theme, nextPreference);
      }
      return;
    }

    const duration = detail.cause === "theme" ? 680 : detail.cause === "load" ? 520 : 360;
    const themeOffset = Math.round(duration * 0.45);
    const cause: StormCause = detail.cause ?? "route";
    activeRef.current = true;
    pendingThemeRef.current = detail.theme ?? null;
    pendingPreferenceRef.current = detail.preference ?? preferenceRef.current;
    preferenceRef.current = detail.preference ?? preferenceRef.current;
    setStorming(cause);
    document.documentElement.style.setProperty("--storm-duration", `${duration}ms`);

    if (endTimerRef.current) window.clearTimeout(endTimerRef.current);
    if (themeTimerRef.current) window.clearTimeout(themeTimerRef.current);

    if (pendingThemeRef.current) {
      themeTimerRef.current = window.setTimeout(() => {
        if (!pendingThemeRef.current) return;
        applyTheme(
          pendingThemeRef.current,
          pendingPreferenceRef.current ?? preferenceRef.current,
        );
      }, themeOffset);
    }

    endTimerRef.current = window.setTimeout(() => {
      activeRef.current = false;
      pendingThemeRef.current = null;
      pendingPreferenceRef.current = null;
      setStorming(null);
    }, duration);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<StormTriggerDetail>).detail ?? {};
      startStorm(detail);
    };
    window.addEventListener(STORM_TRIGGER_EVENT, handler as EventListener);
    return () => window.removeEventListener(STORM_TRIGGER_EVENT, handler as EventListener);
  }, [startStorm]);

  useEffect(() => {
    const initialPreference = getStoredThemePreference();
    preferenceRef.current = initialPreference;
    applyTheme(
      initialPreference === "system"
        ? window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
          ? "dark"
          : "light"
        : initialPreference,
      initialPreference,
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mediaQuery) return;

    const onChange = () => {
      let storedTheme: string | null = null;
      try {
        storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {}

      if (storedTheme === "light" || storedTheme === "dark") return;

      preferenceRef.current = "system";
      startStorm({
        cause: "theme",
        theme: mediaQuery.matches ? "dark" : "light",
        preference: "system",
      });
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, [startStorm]);

  useEffect(() => {
    return () => {
      if (endTimerRef.current) window.clearTimeout(endTimerRef.current);
      if (themeTimerRef.current) window.clearTimeout(themeTimerRef.current);
      setStorming(null);
    };
  }, []);

  return null;
}
