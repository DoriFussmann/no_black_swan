import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function guidePath() {
  const siteDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(siteDir, "..", "DESIGN_GUIDE.md"),
    join(process.cwd(), "..", "DESIGN_GUIDE.md"),
    join(process.cwd(), "DESIGN_GUIDE.md"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(
    'Design tokens: missing DESIGN_GUIDE.md (looked one level above site/, process.cwd()/.., and process.cwd()).',
  );
}

const guide = readFileSync(guidePath(), "utf8");
const fences = [...guide.matchAll(/```tokens\r?\n([\s\S]*?)\r?\n```/g)];
if (fences.length !== 1) {
  throw new Error(
    `Design tokens: expected a single \`\`\`tokens fence in DESIGN_GUIDE.md, found ${fences.length}.`,
  );
}

let parsed;
try {
  parsed = JSON.parse(fences[0][1]);
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  throw new Error(`Design tokens: the \`\`\`tokens fence is not valid JSON — ${detail}.`);
}

const TEMPLATES = ["alpine", "heritage", "pristine", "kinetic", "tactile", "nocturne"];
const COLOR_KEYS = [
  "bg",
  "surface",
  "surfaceAlt",
  "fg",
  "muted",
  "border",
  "accent",
  "accentHover",
  "accentFg",
  "accentInk",
  "highlight",
  "band",
  "bandFg",
  "bandMuted",
  "headerBg",
  "headerFg",
  "footerBg",
  "footerFg",
  "onImage",
  "focus",
];
const HEX = /^#[0-9A-Fa-f]{6}$/;
const PX = /^\d+(?:\.\d+)?px$/;
const REM = /^\d+(?:\.\d+)?rem$/;
const EM = /^-?\d+(?:\.\d+)?em$/;
const NPM = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;
const DENSITY = {
  compact: { mobile: 40, desktop: 64 },
  regular: { mobile: 56, desktop: 96 },
  airy: { mobile: 64, desktop: 104 },
};

function fail(key, detail) {
  throw new Error(`Design tokens: invalid "${key}" — ${detail}.`);
}

function missing(key) {
  throw new Error(`Design tokens: missing "${key}".`);
}

function isObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function requireObject(value, key) {
  if (!isObject(value)) missing(key);
  return value;
}

function requireKey(obj, key, path) {
  if (!Object.prototype.hasOwnProperty.call(obj, key) || obj[key] == null) missing(path);
  return obj[key];
}

function oneOf(value, key, allowed) {
  if (!allowed.includes(value)) fail(key, `expected one of ${allowed.join(" | ")}`);
  return value;
}

function requireString(value, key) {
  if (typeof value !== "string") fail(key, "expected a string");
  return value;
}

function requireNonEmpty(value, key) {
  const text = requireString(value, key);
  if (!text.trim()) fail(key, "expected a non-empty string");
  return text;
}

function requireNumber(value, key) {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    fail(key, "expected a number");
  }
  return value;
}

function requirePx(value, key) {
  const text = requireString(value, key);
  if (!PX.test(text)) fail(key, "expected a px length");
  return text;
}

function requireRem(value, key) {
  const text = requireString(value, key);
  if (!REM.test(text)) fail(key, "expected a rem length");
  return text;
}

function requireEm(value, key) {
  const text = requireString(value, key);
  if (!EM.test(text)) fail(key, "expected an em length");
  return text;
}

function requireWeight(value, key) {
  const weight = requireNumber(value, key);
  if (!Number.isInteger(weight) || weight < 100 || weight > 900) {
    fail(key, "expected an integer from 100 to 900");
  }
  return weight;
}

function requireBoolean(value, key) {
  if (typeof value !== "boolean") fail(key, "expected a boolean");
  return value;
}

function requireMs(value, key) {
  const ms = requireNumber(value, key);
  if (ms < 0) fail(key, "expected a number of milliseconds");
  return ms;
}

function requireFontRole(value, key) {
  const role = requireObject(value, key);
  requireNonEmpty(requireKey(role, "family", `${key}.family`), `${key}.family`);
  requireNonEmpty(requireKey(role, "fallback", `${key}.fallback`), `${key}.fallback`);
  const pkg = requireNonEmpty(requireKey(role, "package", `${key}.package`), `${key}.package`);
  if (!NPM.test(pkg)) fail(`${key}.package`, "expected an npm package name");
  const imports = requireKey(role, "imports", `${key}.imports`);
  if (!Array.isArray(imports) || imports.length === 0) {
    fail(`${key}.imports`, "expected a non-empty array of import specifiers");
  }
  imports.forEach((item, index) => {
    if (typeof item !== "string" || !item.trim()) {
      fail(`${key}.imports[${index}]`, "expected a non-empty string");
    }
  });
  return role;
}

function pxNumber(value) {
  return Number.parseFloat(value);
}

function fontStack(role) {
  return `"${role.family}", ${role.fallback}`;
}

if (!isObject(parsed)) missing("tokens");

if (!Object.prototype.hasOwnProperty.call(parsed, "version")) missing("version");
if (parsed.version !== 3) fail("version", "expected 3");

oneOf(requireKey(parsed, "template", "template"), "template", TEMPLATES);
requireNonEmpty(requireKey(parsed, "templateName", "templateName"), "templateName");
requireString(requireKey(parsed, "tagline", "tagline"), "tagline");
oneOf(requireKey(parsed, "mode", "mode"), "mode", ["light", "dark"]);

const brand = requireObject(requireKey(parsed, "brand", "brand"), "brand");
requireString(requireKey(brand, "wordmarkPrimary", "brand.wordmarkPrimary"), "brand.wordmarkPrimary");
requireString(requireKey(brand, "wordmarkAccent", "brand.wordmarkAccent"), "brand.wordmarkAccent");

const colors = requireObject(requireKey(parsed, "colors", "colors"), "colors");
for (const key of COLOR_KEYS) {
  const value = requireKey(colors, key, `colors.${key}`);
  if (typeof value !== "string" || !HEX.test(value)) fail(`colors.${key}`, "expected a 6-digit hex color");
}

const type = requireObject(requireKey(parsed, "type", "type"), "type");
const display = requireFontRole(requireKey(type, "display", "type.display"), "type.display");
const body = requireFontRole(requireKey(type, "body", "type.body"), "type.body");
requirePx(requireKey(type, "base", "type.base"), "type.base");
const scale = requireNumber(requireKey(type, "scale", "type.scale"), "type.scale");
if (scale <= 1) fail("type.scale", "expected a ratio greater than 1");
requireWeight(requireKey(type, "headingWeight", "type.headingWeight"), "type.headingWeight");
requireWeight(requireKey(type, "uiWeight", "type.uiWeight"), "type.uiWeight");
requireWeight(requireKey(type, "strongWeight", "type.strongWeight"), "type.strongWeight");
requireWeight(requireKey(type, "bodyWeight", "type.bodyWeight"), "type.bodyWeight");
requireEm(requireKey(type, "headingTracking", "type.headingTracking"), "type.headingTracking");
requireNumber(requireKey(type, "headingLeading", "type.headingLeading"), "type.headingLeading");
oneOf(requireKey(type, "headingCase", "type.headingCase"), "type.headingCase", ["none", "uppercase"]);
oneOf(requireKey(type, "eyebrow", "type.eyebrow"), "type.eyebrow", ["uppercase", "sentence"]);
requireEm(requireKey(type, "eyebrowTracking", "type.eyebrowTracking"), "type.eyebrowTracking");

const shape = requireObject(requireKey(parsed, "shape", "shape"), "shape");
requirePx(requireKey(shape, "radius", "shape.radius"), "shape.radius");
requirePx(requireKey(shape, "radiusLg", "shape.radiusLg"), "shape.radiusLg");
oneOf(requireKey(shape, "button", "shape.button"), "shape.button", ["solid", "outline", "pill"]);

const layout = requireObject(requireKey(parsed, "layout", "layout"), "layout");
oneOf(requireKey(layout, "density", "layout.density"), "layout.density", ["compact", "regular", "airy"]);
requireRem(requireKey(layout, "container", "layout.container"), "layout.container");
requireRem(requireKey(layout, "measure", "layout.measure"), "layout.measure");

const variants = requireObject(requireKey(parsed, "variants", "variants"), "variants");
oneOf(requireKey(variants, "header", "variants.header"), "variants.header", ["solid", "blur", "band"]);
oneOf(requireKey(variants, "hero", "variants.hero"), "variants.hero", ["plain", "band", "glow", "framed", "photo"]);
oneOf(requireKey(variants, "heroOverlay", "variants.heroOverlay"), "variants.heroOverlay", [
  "none",
  "dark",
  "fade",
  "vignette",
]);
oneOf(requireKey(variants, "card", "variants.card"), "variants.card", ["line", "filled", "elevated"]);
oneOf(requireKey(variants, "rhythm", "variants.rhythm"), "variants.rhythm", ["alternate", "flat", "bands"]);
oneOf(requireKey(variants, "texture", "variants.texture"), "variants.texture", ["none", "grid", "dots", "scanline"]);
oneOf(requireKey(variants, "hover", "variants.hover"), "variants.hover", [
  "zoom",
  "lift",
  "jelly",
  "glitch",
  "brighten",
]);
oneOf(requireKey(variants, "portrait", "variants.portrait"), "variants.portrait", [
  "rounded",
  "circle",
  "square",
  "blob",
]);
oneOf(requireKey(variants, "eyebrowMark", "variants.eyebrowMark"), "variants.eyebrowMark", [
  "none",
  "dot",
  "rule",
  "slashes",
]);

const motion = requireObject(requireKey(parsed, "motion", "motion"), "motion");
oneOf(requireKey(motion, "style", "motion.style"), "motion.style", ["none", "fade", "rise", "blur", "spring"]);
requireMs(requireKey(motion, "duration", "motion.duration"), "motion.duration");
requireNonEmpty(requireKey(motion, "easing", "motion.easing"), "motion.easing");
requireMs(requireKey(motion, "stagger", "motion.stagger"), "motion.stagger");
requireMs(requireKey(motion, "carouselInterval", "motion.carouselInterval"), "motion.carouselInterval");

const imagery = requireObject(requireKey(parsed, "imagery", "imagery"), "imagery");
for (const key of ["treatment", "cssFilter", "direction", "avoid"]) {
  requireNonEmpty(requireKey(imagery, key, `imagery.${key}`), `imagery.${key}`);
}
requirePx(requireKey(imagery, "radius", "imagery.radius"), "imagery.radius");
const aspect = requireString(requireKey(imagery, "aspect", "imagery.aspect"), "imagery.aspect");
if (!/^\d+:\d+$/.test(aspect)) fail("imagery.aspect", 'expected a ratio like "4:5"');

const overrides = requireObject(requireKey(parsed, "overrides", "overrides"), "overrides");
requireBoolean(requireKey(overrides, "forceInter", "overrides.forceInter"), "overrides.forceInter");
requireBoolean(requireKey(overrides, "forceNoBold", "overrides.forceNoBold"), "overrides.forceNoBold");

const breakpoints = requireObject(requireKey(parsed, "breakpoints", "breakpoints"), "breakpoints");
for (const key of ["sm", "md", "lg", "xl"]) {
  requirePx(requireKey(breakpoints, key, `breakpoints.${key}`), `breakpoints.${key}`);
}

export const tokens = parsed;

/** Colors named in the guide prose and not in the token contract. */
export const extras = {
  heroStop1: "#16233A",
  heroStop2: "#16233A",
  heroStop3: "#14203A",
  heroStop4: "#0D1626",
  heroGlow: "rgba(110, 140, 180, 0.30)",
  heroGlowAt: "18% 30%",
  bandGlow: "#6E8CB4",
  onBluePrimary: "#1F7A6B",
  onBluePrimaryInk: "#FFFFFF",
  onBluePrimaryHover: "#196356",
  polaroidBorder: "#F4F2EC",
  polaroidShadow: "rgba(4, 8, 16, 0.45)",
  glassCard: "rgba(10, 18, 32, 0.62)",
  connectorBlue: "#5FB3A1",
  paleSection: "#E6EEF0",
  activeTab: "#E6EEF0",
  activeTabBorder: "#B5DACE",
  statTile: "#F0F3F3",
  chipInput: "#CFE8E1",
  chipInputInk: "#0E4D42",
  chipCalc: "#E3E6EA",
  chipOutput: "#FBE6D0",
  chipOutputInk: "#9A4D0E",
  fieldFill: "#E6EEF0",
  fieldBorder: "#D9DCE1",
  strongBorder: "#C9CED6",
  cardHoverBorder: "#BCC3CD",
  outlineOnBand: "rgba(255, 255, 255, 0.35)",
  navHoverOnBand: "rgba(255, 255, 255, 0.08)",
  navActiveOnBand: "rgba(255, 255, 255, 0.12)",
  gridLine: "rgba(255, 255, 255, 0.00)",
  headerRule: "rgba(255, 255, 255, 0.08)",
  footerRule: "rgba(255, 255, 255, 0.10)",
};

function extraVar(key) {
  const name = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return `  --x-${name}: ${extras[key]};`;
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function clampFluid(minPx, maxPx, minVw, maxVw) {
  const min = round(minPx);
  const max = round(maxPx);
  if (max <= min) return `${max}px`;
  const slope = (max - min) / (maxVw - minVw);
  const intercept = min - slope * minVw;
  return `clamp(${min}px, ${round(intercept)}px + ${round(slope * 100)}vw, ${max}px)`;
}

const base = pxNumber(type.base);
const lgPx = pxNumber(breakpoints.lg);
const minVw = 390;

/** Modular steps for Tailwind keys xs…4xl. Headings use the clamp variables. */
export const typeScale = {
  xs: `${round(base / scale ** 2)}px`,
  sm: `${round(base / scale)}px`,
  base: `${round(base)}px`,
  lg: `${round(base * scale)}px`,
  xl: `${round(base * scale ** 2)}px`,
  "2xl": `${round(base * scale ** 3)}px`,
  "3xl": `${round(base * scale ** 4)}px`,
  "4xl": `${round(base * scale ** 5)}px`,
};

const h3 = base * scale ** 2;
const h2 = base * scale ** 3;
const h1 = base * scale ** 4;
const h3Mobile = base * scale;
const h2Mobile = h3;
const h1Mobile = h2;
const lead = base * 1.2;
const uppercase = type.eyebrow === "uppercase";
const headingTransform = type.headingCase === "uppercase" ? "uppercase" : "none";
const density = DENSITY[layout.density];
const [aspectW, aspectH] = aspect.split(":");
const buttonRadius = shape.button === "pill" ? "999px" : shape.radius;

const colorVars = COLOR_KEYS.map((key) => `  --c-${key}: ${colors[key]};`).join("\n");

export function themeCss() {
  return `:root {
${colorVars}
  --font-display: ${fontStack(display)};
  --font-body: ${fontStack(body)};
  --weight-heading: ${type.headingWeight};
  --weight-ui: ${type.uiWeight};
  --weight-strong: ${type.strongWeight};
  --weight-body: ${type.bodyWeight};
  --type-base: ${round(base)}px;
  --type-lead: ${round(lead)}px;
  --fs-h1: ${clampFluid(h1Mobile, h1, minVw, lgPx)};
  --fs-h2: ${clampFluid(h2Mobile, h2, minVw, lgPx)};
  --fs-h3: ${clampFluid(h3Mobile, h3, minVw, lgPx)};
  --heading-tracking: ${type.headingTracking};
  --heading-leading: ${type.headingLeading};
  --heading-transform: ${headingTransform};
  --eyebrow-size: ${uppercase ? "13px" : "0.95rem"};
  --weight-display-light: ${Math.min(300, type.headingWeight)};
${Object.keys(extras).map((key) => extraVar(key)).join("\n")}
  --eyebrow-tracking: ${type.eyebrowTracking};
  --eyebrow-transform: ${uppercase ? "uppercase" : "none"};
  --eyebrow-color: ${uppercase ? "var(--c-accentInk)" : "var(--c-muted)"};
  --eyebrow-band-color: ${uppercase ? "var(--c-highlight)" : "var(--c-muted)"};
  --radius: ${shape.radius};
  --radius-lg: ${shape.radiusLg};
  --radius-button: ${buttonRadius};
  --container: ${layout.container};
  --measure: ${layout.measure};
  --article-max-width: ${layout.container};
  --section-py: ${density.mobile}px;
  --motion-duration: ${motion.duration}ms;
  --motion-easing: ${motion.easing};
  --motion-stagger: ${motion.stagger}ms;
  --carousel-interval: ${motion.carouselInterval}ms;
  --imagery-filter: ${imagery.cssFilter};
  --imagery-radius: ${imagery.radius};
  --imagery-aspect: ${aspectW} / ${aspectH};
  --mask-solid: #000;
  color-scheme: ${parsed.mode};
}
@media (min-width: ${breakpoints.lg}) {
  :root { --section-py: ${density.desktop}px; }
}`;
}
