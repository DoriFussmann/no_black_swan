/**
 * Display-only Title Case for labels stored in lowercase (topic keywords, tags).
 * The stored value is never changed; this only affects how it renders.
 */
const ACRONYMS = new Set(["ai", "seo", "smb", "faq", "lcp", "cls", "inp", "ux", "ui", "api", "crm", "roi"]);
const SMALL = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "the", "to", "vs", "via", "with"]);

function word(part: string, edge: boolean): string {
  const lower = part.toLowerCase();
  if (ACRONYMS.has(lower)) return lower.toUpperCase();
  if (!edge && SMALL.has(lower)) return lower;
  // Keep words that already carry capitals (e.g. "JavaScript") as written.
  if (part !== lower) return part;
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function titleCase(text: string): string {
  const words = text.trim().split(/\s+/);
  return words
    .map((w, i) =>
      w
        .split("-")
        .map((p) => word(p, i === 0 || i === words.length - 1))
        .join("-"),
    )
    .join(" ");
}
