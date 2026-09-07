// Static imports rather than a template-string path: Vite needs the asset
// path literally in the source to bundle and fingerprint it, so a dynamic
// `coeur-solidaire/${role}-${device}-${theme}-${lang}.webp` string wouldn't
// resolve. 24 explicit imports is the price of that, same as every other
// asset in this codebase (see data/skills.ts).
import dashboardDesktopDarkEn from "../assets/images/projects/coeur-solidaire/dashboard-desktop-dark-en.webp";
import dashboardDesktopDarkFr from "../assets/images/projects/coeur-solidaire/dashboard-desktop-dark-fr.webp";
import dashboardDesktopLightEn from "../assets/images/projects/coeur-solidaire/dashboard-desktop-light-en.webp";
import dashboardDesktopLightFr from "../assets/images/projects/coeur-solidaire/dashboard-desktop-light-fr.webp";
import dashboardMobileDarkEn from "../assets/images/projects/coeur-solidaire/dashboard-mobile-dark-en.webp";
import dashboardMobileDarkFr from "../assets/images/projects/coeur-solidaire/dashboard-mobile-dark-fr.webp";
import dashboardMobileLightEn from "../assets/images/projects/coeur-solidaire/dashboard-mobile-light-en.webp";
import dashboardMobileLightFr from "../assets/images/projects/coeur-solidaire/dashboard-mobile-light-fr.webp";

import calendarDesktopDarkEn from "../assets/images/projects/coeur-solidaire/calendar-desktop-dark-en.webp";
import calendarDesktopDarkFr from "../assets/images/projects/coeur-solidaire/calendar-desktop-dark-fr.webp";
import calendarDesktopLightEn from "../assets/images/projects/coeur-solidaire/calendar-desktop-light-en.webp";
import calendarDesktopLightFr from "../assets/images/projects/coeur-solidaire/calendar-desktop-light-fr.webp";
import calendarMobileDarkEn from "../assets/images/projects/coeur-solidaire/calendar-mobile-dark-en.webp";
import calendarMobileDarkFr from "../assets/images/projects/coeur-solidaire/calendar-mobile-dark-fr.webp";
import calendarMobileLightEn from "../assets/images/projects/coeur-solidaire/calendar-mobile-light-en.webp";
import calendarMobileLightFr from "../assets/images/projects/coeur-solidaire/calendar-mobile-light-fr.webp";

import routeDesktopDarkEn from "../assets/images/projects/coeur-solidaire/route-desktop-dark-en.webp";
import routeDesktopDarkFr from "../assets/images/projects/coeur-solidaire/route-desktop-dark-fr.webp";
import routeDesktopLightEn from "../assets/images/projects/coeur-solidaire/route-desktop-light-en.webp";
import routeDesktopLightFr from "../assets/images/projects/coeur-solidaire/route-desktop-light-fr.webp";
import routeMobileDarkEn from "../assets/images/projects/coeur-solidaire/route-mobile-dark-en.webp";
import routeMobileDarkFr from "../assets/images/projects/coeur-solidaire/route-mobile-dark-fr.webp";
import routeMobileLightEn from "../assets/images/projects/coeur-solidaire/route-mobile-light-en.webp";
import routeMobileLightFr from "../assets/images/projects/coeur-solidaire/route-mobile-light-fr.webp";

export type CoeurTheme = "dark" | "light";
export type CoeurLang = "en" | "fr";
export type CoeurRole = "dashboard" | "calendar" | "route";

type ByLang = Record<CoeurLang, string>;
type ByTheme = Record<CoeurTheme, ByLang>;

export const COEUR_SOLIDAIRE_MEDIA: Record<
  CoeurRole,
  { desktop: ByTheme; mobile: ByTheme }
> = {
  // Coordinator dashboard: the busiest, most data-dense screen — the
  // strongest first impression for the tab that opens by default.
  dashboard: {
    desktop: {
      dark: { en: dashboardDesktopDarkEn, fr: dashboardDesktopDarkFr },
      light: { en: dashboardDesktopLightEn, fr: dashboardDesktopLightFr },
    },
    mobile: {
      dark: { en: dashboardMobileDarkEn, fr: dashboardMobileDarkFr },
      light: { en: dashboardMobileLightEn, fr: dashboardMobileLightFr },
    },
  },
  // Family member's visit calendar — shows the read-only, Law 25-gated view.
  calendar: {
    desktop: {
      dark: { en: calendarDesktopDarkEn, fr: calendarDesktopDarkFr },
      light: { en: calendarDesktopLightEn, fr: calendarDesktopLightFr },
    },
    mobile: {
      dark: { en: calendarMobileDarkEn, fr: calendarMobileDarkFr },
      light: { en: calendarMobileLightEn, fr: calendarMobileLightFr },
    },
  },
  // Caregiver's daily route — the one screen that's genuinely mobile-first.
  route: {
    desktop: {
      dark: { en: routeDesktopDarkEn, fr: routeDesktopDarkFr },
      light: { en: routeDesktopLightEn, fr: routeDesktopLightFr },
    },
    mobile: {
      dark: { en: routeMobileDarkEn, fr: routeMobileDarkFr },
      light: { en: routeMobileLightEn, fr: routeMobileLightFr },
    },
  },
};
