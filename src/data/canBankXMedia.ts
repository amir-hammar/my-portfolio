import landingDesktopEn from "../assets/images/projects/canbankx/landing_desktop_en.webp";
import landingDesktopFr from "../assets/images/projects/canbankx/landing_desktop_fr.webp";
import landingMobileEn from "../assets/images/projects/canbankx/landing_mobile_en.webp";
import landingMobileFr from "../assets/images/projects/canbankx/landing_mobile_fr.webp";

import mfaDesktop from "../assets/images/projects/canbankx/mfa_desktop.webp";
import mfaMobile from "../assets/images/projects/canbankx/mfa_mobile.webp";

import homeDesktop from "../assets/images/projects/canbankx/home_desktop.webp";
import homeMobile from "../assets/images/projects/canbankx/home_mobile.webp";

import accountsDesktop from "../assets/images/projects/canbankx/accounts_desktop.webp";
import accountsMobile from "../assets/images/projects/canbankx/accounts_mobile.webp";

import transferDesktop from "../assets/images/projects/canbankx/transfer_desktop.webp";
import transferMobile from "../assets/images/projects/canbankx/transfer_mobile.webp";

export type CanBankXLang = "en" | "fr";
export type CanBankXRole = "landing" | "mfa" | "home" | "accounts" | "transfer";

type ByLang = Record<CanBankXLang, string>;

/**
 * Only the public landing page is bilingual in the real app — the
 * authenticated screens (MFA, home, accounts, transfer) never localize past
 * English, same as the product itself. Those roles still carry a `ByLang`
 * shape with both keys pointing at the same shot, so the showcase component
 * can index every role by language uniformly instead of special-casing it.
 */
export const CAN_BANK_X_MEDIA: Record<CanBankXRole, { desktop: ByLang; mobile: ByLang }> = {
  landing: {
    desktop: { en: landingDesktopEn, fr: landingDesktopFr },
    mobile: { en: landingMobileEn, fr: landingMobileFr },
  },
  mfa: {
    desktop: { en: mfaDesktop, fr: mfaDesktop },
    mobile: { en: mfaMobile, fr: mfaMobile },
  },
  home: {
    desktop: { en: homeDesktop, fr: homeDesktop },
    mobile: { en: homeMobile, fr: homeMobile },
  },
  accounts: {
    desktop: { en: accountsDesktop, fr: accountsDesktop },
    mobile: { en: accountsMobile, fr: accountsMobile },
  },
  transfer: {
    desktop: { en: transferDesktop, fr: transferDesktop },
    mobile: { en: transferMobile, fr: transferMobile },
  },
};
