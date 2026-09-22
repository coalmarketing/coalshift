/**
 * Canonical outbound destinations. The Coalshift website only links to the
 * separate application for registration and login; it does not change those
 * flows. Kept in one place so every CTA agrees.
 */
export const REGISTER_URL = "https://app.coalshift.cz/register";
export const LOGIN_URL = "https://app.coalshift.cz/login";

/**
 * Microsoft Bookings — owner-configured public page ("Pojďme probrat váš
 * provoz"). Public configuration only; no Microsoft credentials enter the
 * repository. The Bookings iframe/tab must only load after the user activates
 * the consultation CTA.
 */
export const BOOKINGS_URL =
  "https://bookings.cloud.microsoft/book/coalshift@coalsoft.cz/?ismsaljsauthenabled";

/**
 * The owner-approved unlisted YouTube product walkthrough. Embedding uses the
 * privacy-enhanced `youtube-nocookie.com` domain and must only load after the
 * user activates the click-to-play facade — never on page load.
 */
export const YOUTUBE_VIDEO_ID = "DgTN2nTfx_0";
export const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
export const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&hl=cs&cc_lang_pref=cs&rel=0`;
export const YOUTUBE_TITLE = "Jak funguje coalshift | Praktická ukázka aplikace";
/** image-registry.json key for the locally stored, verified YouTube thumbnail. */
export const YOUTUBE_POSTER_SRC = "/img/product-video-poster.jpg";

/** Homepage in-page section ids (fragment targets). */
export const SECTION = {
  benefits: "benefits",
  features: "features",
  industries: "industries",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
} as const;
