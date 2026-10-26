/**
 * Public, build-time settings read from the environment (Vercel → Settings →
 * Environment Variables, or site/.env locally). Empty values keep the
 * feature off. Never put secrets here: PUBLIC_ values ship in the HTML.
 */

/** Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). */
export const ANALYTICS_ID = String(import.meta.env.PUBLIC_ANALYTICS_ID ?? "")
  .trim()
  .replace(/[^A-Za-z0-9-]/g, "");

/** Google Search Console HTML-tag verification token. */
export const SEARCH_CONSOLE_VERIFICATION = String(import.meta.env.PUBLIC_SEARCH_CONSOLE_VERIFICATION ?? "").trim();

/** Public Cal.com event URL for the discovery-call scheduler on /book-call/. */
export const CAL_COM_URL = String(
  import.meta.env.PUBLIC_CAL_COM_URL || "https://cal.com/dori-fussmann-lqbqlb/30min",
).trim();
