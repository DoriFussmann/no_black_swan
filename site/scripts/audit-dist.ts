import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import { runAudit } from "seo-core";
import { ARTICLES_BASE, SITE_NAME, SITE_URL } from "../src/config/site.ts";

const siteRoot = dirname(fileURLToPath(import.meta.url)).replace(/scripts$/, "");
const distDir = join(siteRoot, "dist");

runAudit({
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  articlesBase: ARTICLES_BASE,
  distDir,
  articlesDir: join(siteRoot, "src", "content", "articles"),
});

function walkHtml(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkHtml(full, acc);
    else if (name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

const themeErrors: string[] = [];
const articlesHref = `/${ARTICLES_BASE}/`;
const banned = ["[PLACEHOLDER", "[GAP", "Primary positioning phrase", "example.com", "this publication", "(no volume data)"];
const unpublished = [
  "/testimonials/",
  "/articles/content-strategy-foundations/",
  "/articles/technical-seo-foundations/",
  "/articles/core-web-vitals-complete-guide/",
  "/articles/improve-core-web-vitals-howto/",
];
const descriptions = new Map<string, string[]>();

function distHas(urlPath: string): boolean {
  const clean = urlPath.split("#")[0]?.split("?")[0] ?? "";
  if (!clean.startsWith("/")) return true;
  const rel = clean.replace(/^\/+/, "");
  if (rel === "") return existsSync(join(distDir, "index.html"));
  return (
    existsSync(join(distDir, rel)) ||
    existsSync(join(distDir, rel, "index.html")) ||
    (rel.endsWith("/") && existsSync(join(distDir, `${rel.slice(0, -1)}.html`)))
  );
}

for (const file of walkHtml(distDir)) {
  const rel = relative(distDir, file).replace(/\\/g, "/");
  const $ = cheerio.load(readFileSync(file, "utf8"));
  const h1Count = $("h1").length;
  if (h1Count !== 1) themeErrors.push(`${rel}: expected exactly one h1, found ${h1Count}`);

  const headerHrefs = $("header.site-header a")
    .map((_, el) => $(el).attr("href") || "")
    .get();
  if (!headerHrefs.includes(articlesHref)) {
    themeErrors.push(`${rel}: header missing link to ${articlesHref}`);
  }

  const footerHrefs = $("footer.site-footer a")
    .map((_, el) => $(el).attr("href") || "")
    .get();
  if (!footerHrefs.includes("/privacy/")) themeErrors.push(`${rel}: footer missing link to /privacy/`);
  if (!footerHrefs.includes("/terms/")) themeErrors.push(`${rel}: footer missing link to /terms/`);

  $("[class]").each((_, el) => {
    const cls = $(el).attr("class") || "";
    if (/\bfont-serif\b/.test(cls)) themeErrors.push(`${rel}: font-serif in class "${cls}"`);
    if (/#[0-9A-Fa-f]{3,8}/.test(cls)) themeErrors.push(`${rel}: hex color in class "${cls}"`);
  });

  const html = $.html();
  for (const token of banned) {
    if (html.includes(token)) themeErrors.push(`${rel}: contains ${token}`);
  }
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  if (!canonical.startsWith("https://noblackswan.com")) {
    themeErrors.push(`${rel}: canonical is not https://noblackswan.com (${canonical || "missing"})`);
  }
  const robots = $('meta[name="robots"]').attr("content") || "";
  const description = $('meta[name="description"]').attr("content") || "";
  if (description && !/noindex/i.test(robots)) {
    const pages = descriptions.get(description) ?? [];
    pages.push(rel);
    descriptions.set(description, pages);
  }
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (!href.startsWith("/") || href.startsWith("//")) return;
    if (!distHas(href)) themeErrors.push(`${rel}: broken internal link ${href}`);
  });
}

for (const asset of ["logo.png", "apple-touch-icon.png", "favicon-32.png", "favicon.svg", "og-default.png"]) {
  if (!existsSync(join(distDir, asset))) themeErrors.push(`missing asset /${asset}`);
}

const sitemapPath = join(distDir, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  themeErrors.push("missing sitemap.xml");
} else {
  const sitemap = readFileSync(sitemapPath, "utf8");
  if (sitemap.includes("example.com")) themeErrors.push("sitemap contains example.com");
  for (const route of unpublished) {
    if (sitemap.includes(route)) themeErrors.push(`sitemap includes unpublished route ${route}`);
  }
  const locs = sitemap.match(/<loc>[^<]+<\/loc>/g) ?? [];
  for (const loc of locs) {
    if (!loc.includes("https://noblackswan.com/")) themeErrors.push(`sitemap loc is off-origin: ${loc}`);
  }
}

for (const [description, pages] of descriptions) {
  if (pages.length > 1) themeErrors.push(`duplicate meta description on ${pages.join(", ")}: ${description}`);
}

if (themeErrors.length) {
  console.error(`audit-dist: ${themeErrors.length} theme error(s)`);
  for (const err of themeErrors) console.error(` - ${err}`);
  process.exit(1);
}

console.log("audit-dist: theme gates passed");
