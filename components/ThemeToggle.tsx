"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { triggerStorm, THEME_CHANGE_EVENT } from "@/utils/storm";
import {
  getStoredThemePreference,
  isThemePreference,
  resolveTheme,
  THEME_PREFERENCE_ATTR,
  THEME_STORAGE_KEY,
  type ThemeMode,
  type ThemePreference,
} from "@/utils/theme";

export default function ThemeToggle() {
  const readState = (): { preference: ThemePreference; resolvedTheme: ThemeMode } => {
    if (typeof document === "undefined") {
      return { preference: "system", resolvedTheme: "light" };
    }

    const root = document.documentElement;
    const attrPreference = root.getAttribute(THEME_PREFERENCE_ATTR);
    const preference = isThemePreference(attrPreference)
      ? attrPreference
      : getStoredThemePreference();

    return {
      preference,
      resolvedTheme: root.classList.contains("dark") ? "dark" : "light",
    };
  };

  const [isHydrated, setIsHydrated] = useState(false);
  const [{ preference, resolvedTheme }, setThemeState] = useState<{
    preference: ThemePreference;
    resolvedTheme: ThemeMode;
  }>({
    preference: "system",
    resolvedTheme: "light",
  });

  useEffect(() => {
    const sync = () => setThemeState(readState());
    sync();
    setIsHydrated(true);
    window.addEventListener(THEME_CHANGE_EVENT, sync as EventListener);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, sync as EventListener);
  }, []);

  const activePreference = isHydrated ? preference : "system";
  const activeResolvedTheme = isHydrated ? resolvedTheme : "light";

  const nextPreference = (() => {
    if (activePreference === "system") return "light";
    if (activePreference === "light") return "dark";
    return "system";
  })();

  const toggle = () => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    } catch {}

    const nextTheme = resolveTheme(nextPreference);
    setThemeState({ preference: nextPreference, resolvedTheme: nextTheme });
    triggerStorm({ cause: "theme", theme: nextTheme, preference: nextPreference });
  };

  const labelMap: Record<ThemePreference, string> = {
    system: "System",
    light: "Light",
    dark: "Dark",
  };

  const currentLabel =
    activePreference === "system"
      ? `System (${activeResolvedTheme})`
      : labelMap[activePreference];

  const ModeIcon = activePreference === "system"
    ? Monitor
    : activePreference === "light"
      ? Sun
      : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900/50 text-zinc-500 shadow-sm backdrop-blur transition hover:border-mutedGold/30 hover:bg-zinc-800/60 hover:text-cream sm:w-auto sm:gap-2 sm:px-2.5 md:px-3"
      aria-label={`Theme: ${currentLabel}. Switch to ${labelMap[nextPreference]} mode`}
      title={`Theme: ${currentLabel} · Next: ${labelMap[nextPreference]}`}
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <ModeIcon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
        {activePreference === "system" && (
          <span
            aria-hidden="true"
            className={[
              "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-offBlack",
              activeResolvedTheme === "dark" ? "bg-zinc-400" : "bg-mutedGold",
            ].join(" ")}
          />
        )}
      </span>

      <span className="hidden text-[10px] font-semibold uppercase tracking-widest md:inline">
        {labelMap[activePreference]}
      </span>

      {activePreference === "system" && (
        <span
          aria-hidden="true"
          className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500/90 md:block"
        >
          Auto
        </span>
      )}
    </button>
  );
}
