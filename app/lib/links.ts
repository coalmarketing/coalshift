/**
 * Canonical outbound destinations. The Coalshift website only links to the
 * separate application for registration and login; it does not change those
 * flows. Kept in one place so every CTA agrees.
 */
export const REGISTER_URL = "https://app.coalshift.cz/register";
export const LOGIN_URL = "https://app.coalshift.cz/login";

/** Homepage in-page section ids (fragment targets). */
export const SECTION = {
  benefits: "benefits",
  features: "features",
  industries: "industries",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
} as const;
