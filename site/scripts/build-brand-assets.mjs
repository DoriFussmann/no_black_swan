// One-shot brand and cover generator. Re-running overwrites logo, OG, favicon, and illustrations.
// The original team photo is copied to dori-fussmann-original.jpg only when that file is absent.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const imageDir = join(publicDir, "images");
const teamDir = join(root, "src", "assets", "team");
const articleDir = join(root, "src", "assets", "articles");
mkdirSync(imageDir, { recursive: true });

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#2F5BEA"/>
  <path d="M8.5 22c1.4-6 4.6-9.2 8.8-9.2 2.5 0 4.2 1.4 5.4 3.4-2.8-4.8-2.3-8.8.8-11" fill="none" stroke="#FAFAF9" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 22.2h8.4c0 2.3-2.1 3.8-4.8 3.8-2.5 0-3.6-1.3-3.6-3.8z" fill="#FAFAF9"/>
  <circle cx="23.4" cy="7.6" r="1.15" fill="#FAFAF9"/>
</svg>`;

writeFileSync(join(publicDir, "favicon.svg"), mark);

function scene(shapes) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1280" viewBox="0 0 1600 1280">
  <rect width="1600" height="1280" fill="#E7E6E3"/>
  <rect x="70" y="70" width="1460" height="1140" rx="28" fill="#F7F6F3"/>
  ${shapes}
</svg>`;
}

const scenes = {
  "home-hero-1.svg": scene(`
    <rect x="180" y="280" width="520" height="720" rx="20" fill="#FFFFFF"/>
    <rect x="240" y="360" width="70" height="280" rx="8" fill="#2F5BEA"/>
    <rect x="340" y="460" width="70" height="180" rx="8" fill="#9DB3D6"/>
    <rect x="440" y="400" width="70" height="240" rx="8" fill="#17181B"/>
    <rect x="540" y="520" width="70" height="120" rx="8" fill="#5F6168"/>
    <rect x="820" y="360" width="560" height="400" rx="20" fill="#FFFFFF"/>
    <rect x="880" y="440" width="440" height="16" rx="8" fill="#E7E6E3"/>
    <rect x="880" y="490" width="360" height="16" rx="8" fill="#E7E6E3"/>
    <rect x="880" y="540" width="400" height="16" rx="8" fill="#2F5BEA"/>
    <rect x="880" y="620" width="180" height="80" rx="12" fill="#F3F2EF"/>
    <rect x="1090" y="620" width="180" height="80" rx="12" fill="#F3F2EF"/>`),
  "home-hero-2.svg": scene(`
    <rect x="200" y="240" width="280" height="180" rx="16" fill="#FFFFFF"/>
    <rect x="520" y="240" width="280" height="180" rx="16" fill="#FFFFFF"/>
    <rect x="840" y="240" width="280" height="180" rx="16" fill="#FFFFFF"/>
    <rect x="1160" y="240" width="220" height="180" rx="16" fill="#2F5BEA"/>
    <path d="M340 330h140M660 330h140M980 330h140" stroke="#17181B" stroke-width="8" stroke-linecap="round"/>
    <rect x="240" y="560" width="1120" height="420" rx="20" fill="#FFFFFF"/>
    <rect x="320" y="660" width="220" height="220" rx="16" fill="#F3F2EF"/>
    <rect x="600" y="700" width="640" height="18" rx="9" fill="#E7E6E3"/>
    <rect x="600" y="760" width="520" height="18" rx="9" fill="#E7E6E3"/>
    <rect x="600" y="820" width="400" height="18" rx="9" fill="#9DB3D6"/>`),
  "home-hero-3.svg": scene(`
    <circle cx="420" cy="620" r="180" fill="#FFFFFF"/>
    <circle cx="800" cy="520" r="140" fill="#2F5BEA"/>
    <circle cx="1120" cy="680" r="160" fill="#17181B"/>
    <path d="M560 620h120M900 560h90" stroke="#5F6168" stroke-width="10" stroke-linecap="round"/>
    <rect x="260" y="880" width="1080" height="24" rx="12" fill="#FFFFFF"/>`),
  "home-hero-4.svg": scene(`
    <rect x="220" y="260" width="1160" height="760" rx="24" fill="#FFFFFF"/>
    <rect x="300" y="360" width="360" height="560" rx="16" fill="#F3F2EF"/>
    <rect x="740" y="360" width="540" height="120" rx="16" fill="#2F5BEA"/>
    <rect x="740" y="520" width="540" height="120" rx="16" fill="#E7E6E3"/>
    <rect x="740" y="680" width="540" height="120" rx="16" fill="#17181B"/>
    <rect x="360" y="440" width="240" height="16" rx="8" fill="#9DB3D6"/>
    <rect x="360" y="490" width="180" height="16" rx="8" fill="#FFFFFF"/>`),
  "home-split-1.svg": scene(`
    <rect x="180" y="300" width="700" height="700" rx="24" fill="#FFFFFF"/>
    <path d="M280 860V480M280 480h180M460 480v220M460 700h200" fill="none" stroke="#17181B" stroke-width="10" stroke-linecap="round"/>
    <circle cx="280" cy="480" r="18" fill="#2F5BEA"/>
    <circle cx="460" cy="700" r="18" fill="#2F5BEA"/>
    <circle cx="660" cy="700" r="18" fill="#2F5BEA"/>
    <rect x="980" y="360" width="400" height="560" rx="20" fill="#17181B"/>
    <rect x="1040" y="440" width="280" height="16" rx="8" fill="#9DB3D6"/>
    <rect x="1040" y="500" width="220" height="16" rx="8" fill="#FAFAF9"/>`),
  "home-split-2.svg": scene(`
    <rect x="200" y="340" width="360" height="220" rx="18" fill="#FFFFFF"/>
    <rect x="620" y="260" width="360" height="300" rx="18" fill="#2F5BEA"/>
    <rect x="1040" y="420" width="360" height="180" rx="18" fill="#17181B"/>
    <rect x="250" y="700" width="1100" height="20" rx="10" fill="#FFFFFF"/>
    <rect x="250" y="760" width="800" height="20" rx="10" fill="#FFFFFF"/>`),
  "home-split-3.svg": scene(`
    <rect x="240" y="300" width="480" height="680" rx="20" fill="#FFFFFF"/>
    <rect x="880" y="300" width="480" height="680" rx="20" fill="#FFFFFF"/>
    <path d="M720 640h160" stroke="#2F5BEA" stroke-width="12" stroke-linecap="round"/>
    <rect x="320" y="400" width="320" height="18" rx="9" fill="#E7E6E3"/>
    <rect x="320" y="460" width="240" height="18" rx="9" fill="#E7E6E3"/>
    <rect x="960" y="400" width="320" height="18" rx="9" fill="#2F5BEA"/>
    <rect x="960" y="460" width="240" height="18" rx="9" fill="#E7E6E3"/>`),
  "home-split-4.svg": scene(`
    <rect x="200" y="280" width="1200" height="720" rx="24" fill="#FFFFFF"/>
    <circle cx="480" cy="640" r="120" fill="#F3F2EF"/>
    <circle cx="800" cy="640" r="120" fill="#2F5BEA"/>
    <circle cx="1120" cy="640" r="120" fill="#17181B"/>
    <path d="M600 640h80M920 640h80" stroke="#5F6168" stroke-width="8" stroke-linecap="round"/>`),
  "about-approach.svg": scene(`
    <rect x="220" y="260" width="1160" height="760" rx="24" fill="#FFFFFF"/>
    <rect x="320" y="380" width="420" height="520" rx="16" fill="#F3F2EF"/>
    <rect x="820" y="380" width="440" height="70" rx="12" fill="#2F5BEA"/>
    <rect x="820" y="490" width="440" height="70" rx="12" fill="#E7E6E3"/>
    <rect x="820" y="600" width="440" height="70" rx="12" fill="#E7E6E3"/>
    <rect x="820" y="710" width="300" height="70" rx="12" fill="#17181B"/>`),
  "about-plan.svg": scene(`
    <rect x="180" y="320" width="1240" height="640" rx="24" fill="#FFFFFF"/>
    <rect x="280" y="460" width="200" height="360" rx="12" fill="#9DB3D6"/>
    <rect x="540" y="560" width="200" height="260" rx="12" fill="#2F5BEA"/>
    <rect x="800" y="420" width="200" height="400" rx="12" fill="#17181B"/>
    <rect x="1060" y="620" width="200" height="200" rx="12" fill="#E7E6E3"/>`),
};

for (const [name, svg] of Object.entries(scenes)) {
  writeFileSync(join(imageDir, name), svg);
}

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32">${mark.replace(/^<svg[^>]*>/, "").replace("</svg>", "")}</svg>`;
await sharp(Buffer.from(iconSvg)).png().toFile(join(publicDir, "logo.png"));
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(join(publicDir, "apple-touch-icon.png"));
await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile(join(publicDir, "favicon-32.png"));

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#FAFAF9"/>
  <g transform="translate(96 247) scale(5.625)">${mark.replace(/^<svg[^>]*>/, "").replace("</svg>", "")}</g>
  <text x="320" y="330" fill="#17181B" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="400">No Black Swan</text>
  <text x="320" y="400" fill="#5F6168" font-family="Segoe UI, Arial, sans-serif" font-size="28">Practical AI. Connected workflows. Real business outcomes.</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(join(publicDir, "og-default.png"));

const photos = [
  "ai-agent-development-company",
  "ai-automation-services",
  "ai-consulting-companies-for-small-business",
  "ai-consulting-for-small-business",
  "ai-consulting-for-small-business-faq",
  "ai-consulting-services",
  "ai-implementation-services",
  "boutique-ai-consultant-vs-large-consulting-firm-small-business",
  "how-to-choose-an-ai-consultant-for-small-business",
  "industry-and-local-pages",
];

for (const name of photos) {
  const src = join(articleDir, `${name}.png`);
  const dest = join(articleDir, `${name}.jpg`);
  let quality = 76;
  let buf = await sharp(src).resize(1600, 800, { fit: "cover", position: "centre" }).jpeg({ quality, mozjpeg: true }).toBuffer();
  while (buf.length > 500 * 1024 && quality > 50) {
    quality -= 6;
    buf = await sharp(src).resize(1600, 800, { fit: "cover", position: "centre" }).jpeg({ quality, mozjpeg: true }).toBuffer();
  }
  writeFileSync(dest, buf);
  const mdPath = join(root, "src", "content", "articles", `${name}.md`);
  const md = readFileSync(mdPath, "utf8").replace(`../../assets/articles/${name}.png`, `../../assets/articles/${name}.jpg`);
  writeFileSync(mdPath, md);
  console.log(name, Math.round(buf.length / 1024) + "KB", "q" + quality);
}

const original = join(teamDir, "dori-fussmann-original.jpg");
const current = join(teamDir, "dori-fussmann.jpg");
if (!existsSync(original)) copyFileSync(current, original);
const portrait = await sharp(original).resize(1200, 1200, { fit: "cover", position: "attention" }).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
writeFileSync(current, portrait);
console.log("portrait", Math.round(portrait.length / 1024) + "KB", (await sharp(portrait).metadata()).width);
