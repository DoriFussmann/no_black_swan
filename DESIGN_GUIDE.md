# Design Guide

Direction: Quiet — light · airy · never bold (light)
Contract: v3
Overrides: Force Inter on · Force no bold on
Export: Q-MVBE0EWD

This file lives at the repository root as `DESIGN_GUIDE.md`. It is the single source of truth for the site's visual design. The `tokens` block at the end is the machine-readable contract; everything above it explains how to apply those values. Never edit this file by hand — regenerate it from the design prototype with "Export Design Guide.md".

## Scope — design only (read this first)

This guide changes how the site looks and moves. Nothing else. It was built from a prototype filled with placeholder text and images; the real site already has its final copy and content.

You may:
- Change styles: color, type, size, weight, spacing, radius, borders, shadows, motion, responsive behavior.
- Make small layout moves inside a section: alignment, order of elements within the same section, grouping, column placement, spacing between items.
- Add presentational markup and CSS (wrappers, classes, aria-hidden decorative elements) and presentational-only JavaScript inside components that already exist: carousel, dropdown, accordion, typewriter, scroll reveal, marquee.
- Apply casing with CSS (`text-transform`) where this guide asks for it.

You may not:
- Change, add, remove, shorten or retype any copy — headings, body, buttons, labels, alt text, meta text, legal text. Not even a typo; flag it instead.
- Change logic: routing, links and their targets, data fetching, forms and their submission, authentication, validation, state, analytics, SEO tags, APIs, environment or build config.
- Add pages, sections, features or controls that do not exist in the code (for example article search or topic filters). Style what exists; list anything from this guide that has no counterpart in the code under "Not implemented" in your PR description.
- Move content between pages or between sections, hide content, or remove content.
- Add, replace, download or generate images, icons or logos. Use only the assets already in the repository.

When a rule in this guide cannot be met without breaking the list above, the list above wins. Leave it as is and note it in the PR.

## Placeholders → real content

The prototype uses stand-ins. Map each one to what the site already has; never ship a placeholder.

| In the prototype | Stands for | Rule |
| --- | --- | --- |
| Any text (headlines, paragraphs, labels, [00] stats, [EMAIL], [PHONE]) | The site's existing copy | Keep the real copy exactly. Design must hold real lengths: headings wrap, cards keep equal height, card summaries may clamp to 3 lines with CSS. |
| "Brandname" and the accent square | The site's existing logo or wordmark | Use the existing logo asset. If there is none, set the wordmark from `brand` tokens as described in Brand identity. |
| Tinted blocks labelled "Image 1–4" in the hero | Existing hero images | 5:4 frame, `object-fit: cover`, imagery filter, radiusLg. Two or more images: carousel. One image: static, no arrows or dots. None: a surfaceAlt block with no label. |
| Tinted blocks on article cards and the article cover | Existing article images | Cards 16:10, cover 2:1, `object-fit: cover`, imagery filter. Missing image: surfaceAlt block, no text inside. |
| About image, inline article figures | Existing images in those slots | Keep each image's existing aspect within a radiusLg frame; never crop out faces or text. |
| Grey circle beside the author name | Existing author photo | 40px circle. Missing photo: surfaceAlt circle. Never generate initials or avatars. |
| Made-up client logos (Halcyon, Arcfield…) | Real client logos in the repo | Render in muted with `filter: grayscale(1)` and opacity 0.75, equal visual height (~28px). If the site has no client logos, do not build the Select Clients section; note it in the PR. |
| Circle-and-clock icons on What We Do cards | Existing icons, if any | Use existing icons recolored to accentInk. If none exist, leave the slot out; do not add icons. |
| Typewriter words (Tone, Pace, Standard, Mood, Reality) | The hero headline's existing final word | The real final word is typed in first. Cycle through other words only if the content already provides them; otherwise type the real word once and keep the caret blinking. The two-line rule still applies: break before the last few words of the real headline so both lines fit. |
| Topic chips, article count, "Showing X of Y", Load More | Existing article categories and pagination, if any | Style what exists with the chip, count and button specs. If filtering, search or pagination do not exist in the code, do not build them. |
| Generated dates, read times, tags | Existing article metadata | Show only metadata the site already outputs. |

Image rules for every slot: keep existing `alt` text, `loading="lazy"` below the fold is allowed, never bake text into images, never stretch (always `object-fit: cover` inside a fixed aspect frame), and apply the imagery CSS filter consistently.

## Direction

Quiet, editorial and light. Warm off-white ground, near-black ink and one accent. Large headlines in a thin weight; nothing is ever bold. Soft rounded corners, hairline borders and slow, smooth easing. Calm over clever.

## Brand identity

Wordmark: not set in this export. Both wordmark tokens are empty, so the site name is used as the wordmark. When set, the first part uses headerFg (footerFg in the footer); the second part uses accentInk. When both are empty, the site name is the fallback. The wordmark uses the display font at 400, 17px, tracking -0.01em, preceded 10px by a 26px accent square with a 7px radius (the logo mark placeholder).

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| bg | #FAFAF9 | Page background (warm off-white) |
| surface | #FFFFFF | Cards, dropdowns, accordion rows, form fields |
| surfaceAlt | #F3F2EF | Alternate section (How It Works), hover fills, tag chips |
| fg | #17181B | Body and heading text; primary button fill |
| muted | #5F6168 | Secondary text, meta lines, captions |
| border | #E7E6E3 | Hairlines and card borders |
| accent | #2F5BEA | Fills: logo mark, conversion button (Subscribe), active states |
| accentHover | #274BC0 | Accent fill hover |
| accentFg | #FFFFFF | Text on an accent fill |
| accentInk | #2F5BEA | Accent used as TEXT: eyebrows, links, wordmark accent |
| highlight | #9DB3D6 | Focus borders on inputs, decorative marks |
| band | #17181B | Band surfaces: footer |
| bandFg | #FAFAF9 | Text on band |
| bandMuted | #9C9EA4 | Secondary text on band |
| headerBg | #FAFAF9 | Header background (used at 85% opacity) |
| headerFg | #17181B | Header text |
| footerBg | #17181B | Footer background (dark) |
| footerFg | #FAFAF9 | Footer text |
| onImage | #FFFFFF | Text placed over photographs |
| focus | #2F5BEA | Focus ring |

Accent is a fill color. Any accent-colored text uses accentInk. Text on an accent fill uses accentFg. Outline borders on secondary buttons and the search field use #DEDDD9 (border, one step stronger).

Log In panel (one-off brand surface): #2D4A6E with a 38px grid of 1px white lines at 4.5% and a soft radial glow of #78A0CD at 38% from the upper left. Text on it is white; secondary text white at 82%; footnote white at 62%. Not part of the token contract yet.

## Typography

Overrides applied: Force Inter (Inter replaces Inter Tight) and Force no bold (no weight above 400 anywhere).

| Role | Family | Package | Imports | Fallback |
| --- | --- | --- | --- | --- |
| Display (headings, wordmark, stat values, card titles, pull quotes) | Inter Variable | `@fontsource-variable/inter` | `@fontsource-variable/inter` | system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif |
| Body (everything else) | Inter Variable | `@fontsource-variable/inter` | `@fontsource-variable/inter` | system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif |

| Size role | Desktop | Mobile |
| --- | --- | --- |
| Body | 16px | 16px |
| Lead | 19.2px | 19.2px |
| H3 | 32px | 22.62px |
| H2 | 45.23px | 32px |
| H1 | 63.96px | 45.23px |

Body is the base size. Lead is base × 1.2. H3 is base × scale², H2 base × scale³, H1 base × scale⁴ at the large breakpoint; on mobile each heading drops one step. Headings scale fluidly between the two.

Fixed UI sizes: nav 15px · buttons 14px · card titles 20–22px · accordion titles 19px · eyebrow 13px · meta, captions and chips 12–13px · article body 18px.

| Weight role | Value | Applies to |
| --- | --- | --- |
| Heading | 300 | h1–h3, card titles, accordion titles, pull quotes |
| Display light | 200 | stat values, pull quotes |
| UI | 400 | eyebrows, buttons, nav links, labels |
| Strong | 400 | strong, b, th, dt, markdown bold (emphasis comes from size and color, never weight) |
| Body | 400 | all running text |

Headings: tracking -0.035em (H1) and -0.03em (H2), leading 1.05–1.1, Title Case. Body line-height 1.6–1.65; article body 1.75. Eyebrow: uppercase, tracking 0.04em, accentInk. Set `font-synthesis-weight: none` so the browser never fakes bold, and `-webkit-font-smoothing: antialiased`.

Capitalization: headings, buttons, nav items, tabs, chips and card titles read in Title Case (Get Started, Learn More, Log In). Apply it with CSS `text-transform: capitalize` only — never retype the copy. Running text stays as written.

## Layout & spacing

Density: airy — 104px desktop / 64px mobile section padding.
Container: 77.5rem (1240px) with a 24px side gutter. Measure (reading width): 42.5rem (680px).
Radius: 12px; large radius: 20px; chips, tags and dots are fully rounded (999px). Login card and fields: 8px / 6px.
Gaps: 20px between cards, 64px between split columns, 12px between accordion rows.
Buttons: 40px high, 18px side padding (Log In in the header 38px; login Continue 34px). Minimum touch target on mobile stays 44×44px — extend the hit area with padding.

## Components

| Component | Value | Behavior |
| --- | --- | --- |
| Header | blur | Sticky. headerBg at 85% opacity, 12px backdrop blur, 1px bottom border in border. Wordmark left; links right: What We Do (dropdown), How It Works, About, Articles, Log In (outline button). Active page link sits on a surfaceAlt fill. |
| Dropdown | chevron | 14px stroke chevron rotates 180° on open (350ms). Menu: surface, 1px border, radius, 6px padding, shadow 0 16px 40px fg/8%; fades in and slides down 6px (250ms opacity, 300ms transform). |
| Hero | plain | Split hero on bg: copy left (eyebrow pill, H1, lead, two buttons), image carousel right at 5:4 in radiusLg. |
| Hero overlay | none | No overlay. |
| Card | line | surface fill, 1px border, radius, 28px padding (22px on article cards). |
| Button | solid | Primary: solid fg fill with bg text, radius; hover 88% opacity. Conversion actions (Subscribe) use the accent fill. Secondary: 1px outline (#DEDDD9) with fg text; hover surfaceAlt fill. |
| Section rhythm | flat | Sections on bg separated by 1px hairlines; How It Works sits on surfaceAlt as the single alternate band. |
| Texture | none | No texture on the marketing pages. The Log In panel alone carries the grid and glow. |
| Hover | lift | Card moves up 4px, border darkens to #D9D8D4 and gains shadow 0 12px 32px fg/7% over 350ms. |
| Portrait | circle | Author avatars are 40px circles. |
| Eyebrow mark | none | Eyebrow text only. The hero eyebrow is a 1px-outlined pill instead. |
| Accordion | chevron | Rows on surface with 1px border and radius; index (01–04) in muted, title, 18px chevron right. Opens with grid-template-rows 0fr → 1fr (450ms) plus fade (350ms); chevron rotates 180°. One row open at a time. |
| Carousel | crossfade | Slides crossfade (900ms) while settling from scale 1.04 to 1 (1200ms). 44px round prev/next buttons on bg at 80%. Dots: 6px, active stretches to a 22px pill in fg. |
| Logo marquee | marquee | "Select Clients" eyebrow left-aligned above a single row of client logos in muted at 75% opacity (mark + wordmark, ~28px tall, 72px apart). The row scrolls right to left in an endless seamless loop (70s per cycle for 20 logos, linear; keep the speed constant as the count changes) and fades in and out at both edges through a mask gradient over the outer 14%. Hover pauses it. |
| Filter chips | pill | 36px pills, 1px border; active = fg fill with bg text. |
| Search | field | 44px, radius, 1px #DEDDD9 border, 16px search icon inset left; focus border highlight plus 3px accent ring at 10%. |
| Footer | band | footerBg, link columns in bandMuted, column heads in footerFg, 1px #2C2D32 rule above copyright. |
| Reveal motion | rise | Scroll-linked rise with a soft blur (see Motion). |

## Motion

Easing everywhere: cubic-bezier(0.2, 0.7, 0.2, 1). Nothing bounces.

- Load: hero elements rise 16px and fade in over 800ms, staggered 80ms (eyebrow, H1, lead, buttons, carousel).
- Scroll reveal: opacity 0 → 1, translateY 36px → 0, blur 6px → 0. Scroll-linked (`animation-timeline: view()`, range entry 0% → cover 28%), so it tracks the scroll position and reverses on scroll up. Cards in a row stagger by offsetting the range 10% each. Where scroll timelines are unsupported (Firefox today) content simply shows.
- Typewriter: the last word of the hero H1 types in and out — 95ms per letter typing, hold 1800ms, 45ms per letter deleting, 350ms pause. Words: Tone, Pace, Standard, Mood, Reality. Each word has its own color, in order: #2F5BEA, #C2410C, #0F766E, #7C3AED, #B45309. A 2px caret in the word's color blinks at 1s (steps). The hero headline is always exactly two lines: an explicit break after the first line, and the second line ("Sets the" + word) set to nowrap. The word slot reserves the width of the longest word (an invisible copy of it stacked under the live word with inline-grid), so typing and deleting never reflow the line. The H1 scales with clamp(38px, 6vw, 64px) so line two fits on mobile; any new word must be no wider than the reserved one.
- Logo marquee: continuous linear scroll right to left, about 3.5s per logo (70s for 20), seamless (the logo set is rendered twice and the track moves 50%); pauses on hover.
- Carousel interval 4500ms; autoplay on.
- Under `prefers-reduced-motion: reduce`: no reveal motion, no typewriter (show the first word static), no hover transforms, no carousel autoplay, no marquee movement (logos sit static and centered).

## Imagery

Treatment: architectural-neutral
CSS filter: saturate(0.9) contrast(1.05)
Radius: 20px
Aspect: 5:4 (hero), 16:10 (cards), 2:1 (article cover)
Direction: Architectural, high-key photography: clean geometry, strong negative space, soft daylight on white and concrete. Neutral greys with at most one accent-colored element. Calm, exact, editorial.
Avoid: Stock-photo clichés (handshakes, pointing at screens), text or logos baked into the image, watermarks, AI-looking gloss, distorted hands or faces.
Key palette: fg #17181B, bg #FAFAF9, accent #2F5BEA, highlight #9DB3D6

## Pages

- Home: Header → Hero → Select Clients (logo marquee) → What We Do (3 cards) → How It Works (accordion, surfaceAlt) → About (image + copy + 3 stats) → Latest Articles (3 cards + View All) → closing CTA box (email + Subscribe) → Footer. What We Do, How It Works and About are anchors on Home; Articles and Log In are their own pages.
- Log In: full-height split screen. Left half is the Log In panel (wordmark 40px, tagline 14px, footnote 12px bottom-left). Right half is white with a centered 336px card: 1px border, 8px radius, 18px padding; email and password fields on #EAF0FB, 40px high, 6px radius; eye button toggles password visibility; quiet outline Continue button.
- Articles: eyebrow + H1 + lead; filter chips (All plus topics) on the left and title search on the right above a hairline; a "Showing X of Y" line; auto-fill grid (min 300px) of article cards; first 21 shown, Load More Articles adds 9; dashed empty state when nothing matches.
- Article: back link (All Articles, chevron nudges on hover), topic pill, H1 52px, standfirst 20px muted, author row between hairlines with copy-link and share icon buttons, 2:1 cover at 1080px wide, 680px body column (18px / 1.75), H2 28px, pull quote 28px at weight 200 between hairlines, inline figures with captions, tag chips, Keep Reading row of 3 cards.

## Signature details

These make the Direction recognisable. Implement every one with CSS and small markup additions to existing components.

- Thin, large headlines; nothing on the site is bold.
- The typewriter word at the end of the hero headline, changing color with each word.
- Every disclosure (dropdown, accordion, load more) uses the same thin chevron that rotates 180°.
- Sections and cards ease up out of a soft blur as they scroll into view.
- Hairline borders and warm neutrals instead of shadows; shadows appear only on hover and dropdowns.
- Title Case on every heading and button.

## Voice (reference only)

Clipped and declarative. Examples: "Design that changes its clothes.", "Fewer parts. Better work.".
Never rewrite existing site copy to match this. It is guidance for future copy only.

## Don'ts

- Bold or semibold anywhere.
- A second typeface.
- Gradients or decorative illustration (the Log In panel glow is the only exception).
- Bouncy or springy motion.
- Heavy or always-on shadows.

## Rules

- Design and optics only. No copy, logic, routing, data or content changes (see Scope).
- Every color, font, weight, radius, shadow and easing comes from this file. No hard-coded hex, font-family or font-weight anywhere in components or CSS.
- Accent as text always means accentInk.
- No inline style attributes for design values.
- Never bake text into images. Never invent testimonials.
- Respect prefers-reduced-motion everywhere.
- Never ship a placeholder; map every stand-in to existing content (see Placeholders → real content).

## Contrast pairs

Each pair must reach 4.5:1 (foreground on background). The build must fail if one does not.

- fg on bg
- fg on surface
- fg on surfaceAlt
- muted on bg
- muted on surface
- muted on surfaceAlt
- accentInk on bg
- accentInk on surface
- accentFg on accent
- bandFg on band
- bandMuted on band
- headerFg on headerBg
- footerFg on footerBg

## Variant reference

Every value the contract allows, so the site can support all of them:

**header**

- `solid` — Opaque headerBg with a 1px bottom border in border.
- `blur` — Sticky. headerBg at 85% opacity, 16px backdrop blur, 1px bottom border at 50% headerFg. Transparent over a photo hero until the page scrolls 16px.
- `band` — Opaque headerBg, no border. Reads as one block with a band hero.

**hero**

- `plain` — Split hero on bg: copy left, image carousel right.
- `band` — Split hero on band; text uses bandFg and bandMuted.
- `glow` — Split hero on bg with two soft radial gradients in accent (16%) and highlight (14%).
- `framed` — Split hero on bg; the carousel sits in a radiusLg frame with a 1px border, surfaceAlt fill and 12px padding.
- `photo` — Full-bleed hero, min-height 88vh. The carousel becomes the background (absolutely positioned, inset 0, image radius 0, object-fit cover). Copy is one centered column (max 48rem) in onImage, on top of the overlay; the hero eyebrow uses highlight and the secondary button is an onImage outline. Carousel controls sit bottom-right over the image. Image placeholders without src use band as their background.

**heroOverlay**

- `none` — No overlay (non-photo heroes).
- `dark` — Linear gradient top→bottom: black 40% → black 20% → black 60%.
- `fade` — Linear gradient top→bottom: fg 30% → fg 20% → bg 100%. The photo dissolves into the page.
- `vignette` — Radial gradient: transparent at center → bg at 95% at the edges, plus a flat 25% bg layer.

**card**

- `line` — Transparent card, 1px border, radius.
- `filled` — surfaceAlt fill, no border, radius.
- `elevated` — surface fill, no border, two shadows tinted with fg: 0 1px 2px fg/10% and 0 8px 24px fg/12%.

**rhythm**

- `alternate` — Sections alternate bg and surfaceAlt.
- `flat` — Every section on bg, separated by a 1px border hairline.
- `bands` — bg everywhere except the stats row and the closing CTA, which sit on band.

**texture**

- `none` — No texture.
- `grid` — 1px grid lines on a 64px grid at 8% of the current text color, masked to fade right. Hero and closing band only.
- `dots` — 1.5px dots on a 24px grid at 12% of the current text color. Hero and closing band only.
- `scanline` — Repeating horizontal lines: 3px transparent, 1px accent at 6%. Over the hero, over hero media and over card images.

**hover**

- `zoom` — Images inside cards and media frames scale to 1.05 over 700ms ease-out; the card gains the elevated shadow.
- `lift` — Card moves up 4px and gains the elevated shadow over 300ms.
- `jelly` — Card scales to 1.03 and rotates -0.5° over 500ms with cubic-bezier(0.34, 1.56, 0.64, 1).
- `glitch` — Card plays a 300ms steps(2) shake (±1px, hue-rotate ±15°) once, and shows a 2px inset accent frame while hovered.
- `brighten` — Images go from brightness(0.85) to brightness(1) over 800ms. No scale.

**portrait**

- `rounded` — Team and author photos use radiusLg.
- `circle` — Team and author photos are circles.
- `square` — Team and author photos have radius 0.
- `blob` — Team and author photos use border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%.

**eyebrowMark**

- `none` — Eyebrow text only.
- `dot` — A 6px accent dot, 8px before the eyebrow text.
- `rule` — A 40px × 1px accent rule, 12px before the eyebrow text.
- `slashes` — The eyebrow text is prefixed with "// " via CSS ::before (decorative, aria-hidden by being generated content).

**button**

- `solid` — Primary is a solid accent fill with accentFg text, radius.
- `outline` — Primary is a 1px accent border with accentInk text; hover fills accent with accentFg text.
- `pill` — Primary is a solid accent fill with accentFg text and fully rounded ends.

**motion**

- `none` — No reveal motion.
- `fade` — Reveal: opacity 0 → 1.
- `rise` — Reveal: opacity 0 → 1 and translateY 24px → 0.
- `blur` — Reveal: opacity 0 → 1 and filter blur(8px) → 0.
- `spring` — Reveal: opacity 0 → 1, translateY 24px → 0 and scale 0.97 → 1 with the overshoot easing.

## Token contract (v3)

Top level: `version` (must be 3), `template`, `templateName`, `tagline`, `mode`, `brand`, `colors`, `type`, `shape`, `layout`, `variants`, `motion`, `imagery`, `overrides`, `breakpoints`.

- `brand`: `wordmarkPrimary`, `wordmarkAccent` (strings, may be empty).
- `colors`: `bg`, `surface`, `surfaceAlt`, `fg`, `muted`, `border`, `accent`, `accentHover`, `accentFg`, `accentInk`, `highlight`, `band`, `bandFg`, `bandMuted`, `headerBg`, `headerFg`, `footerBg`, `footerFg`, `onImage`, `focus` — each a 6-digit hex (#RRGGBB).
- `type.display` and `type.body`: `family` (string), `fallback` (string), `package` (npm name), `imports` (non-empty string array).
- `type`: `base` (px), `scale` (number > 1), `headingWeight`, `uiWeight`, `strongWeight`, `bodyWeight` (numbers 100–900), `headingTracking` (em), `headingLeading` (number), `headingCase`, `eyebrow`, `eyebrowTracking` (em).
- `shape`: `radius`, `radiusLg` (px), `button`.
- `layout`: `density`, `container`, `measure` (rem).
- `variants`: `header`, `hero`, `heroOverlay`, `card`, `rhythm`, `texture`, `hover`, `portrait`, `eyebrowMark`.
- `motion`: `style`, `duration` (ms number), `easing` (CSS easing string), `stagger` (ms number), `carouselInterval` (ms number).
- `imagery`: `treatment`, `cssFilter`, `direction`, `avoid` (non-empty strings), `radius` (px), `aspect` ("W:H").
- `overrides`: `forceInter`, `forceNoBold` (booleans; already applied to the values above).
- `breakpoints`: `sm`, `md`, `lg`, `xl` (px).

Enums:
- `template`: "alpine" | "heritage" | "pristine" | "kinetic" | "tactile" | "nocturne"
- `mode`: "light" | "dark"
- `type.headingCase`: "none" | "uppercase"
- `type.eyebrow`: "uppercase" | "sentence"
- `shape.button`: "solid" | "outline" | "pill"
- `layout.density`: "compact" | "regular" | "airy"
- `variants.header`: "solid" | "blur" | "band"
- `variants.hero`: "plain" | "band" | "glow" | "framed" | "photo"
- `variants.heroOverlay`: "none" | "dark" | "fade" | "vignette"
- `variants.card`: "line" | "filled" | "elevated"
- `variants.rhythm`: "alternate" | "flat" | "bands"
- `variants.texture`: "none" | "grid" | "dots" | "scanline"
- `variants.hover`: "zoom" | "lift" | "jelly" | "glitch" | "brighten"
- `variants.portrait`: "rounded" | "circle" | "square" | "blob"
- `variants.eyebrowMark`: "none" | "dot" | "rule" | "slashes"
- `motion.style`: "none" | "fade" | "rise" | "blur" | "spring"

## Token block

```tokens
{
  "version": 3,
  "template": "pristine",
  "templateName": "Quiet",
  "tagline": "Light · airy · never bold",
  "mode": "light",
  "brand": {
    "wordmarkPrimary": "",
    "wordmarkAccent": ""
  },
  "colors": {
    "bg": "#FAFAF9",
    "surface": "#FFFFFF",
    "surfaceAlt": "#F3F2EF",
    "fg": "#17181B",
    "muted": "#5F6168",
    "border": "#E7E6E3",
    "accent": "#2F5BEA",
    "accentHover": "#274BC0",
    "accentFg": "#FFFFFF",
    "accentInk": "#2F5BEA",
    "highlight": "#9DB3D6",
    "band": "#17181B",
    "bandFg": "#FAFAF9",
    "bandMuted": "#9C9EA4",
    "headerBg": "#FAFAF9",
    "headerFg": "#17181B",
    "footerBg": "#17181B",
    "footerFg": "#FAFAF9",
    "onImage": "#FFFFFF",
    "focus": "#2F5BEA"
  },
  "type": {
    "display": {
      "family": "Inter Variable",
      "fallback": "system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      "package": "@fontsource-variable/inter",
      "imports": [
        "@fontsource-variable/inter"
      ]
    },
    "body": {
      "family": "Inter Variable",
      "fallback": "system-ui, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      "package": "@fontsource-variable/inter",
      "imports": [
        "@fontsource-variable/inter"
      ]
    },
    "base": "16px",
    "scale": 1.414,
    "headingWeight": 300,
    "uiWeight": 400,
    "strongWeight": 400,
    "bodyWeight": 400,
    "headingTracking": "-0.03em",
    "headingLeading": 1.08,
    "headingCase": "none",
    "eyebrow": "uppercase",
    "eyebrowTracking": "0.04em"
  },
  "shape": {
    "radius": "12px",
    "radiusLg": "20px",
    "button": "solid"
  },
  "layout": {
    "density": "airy",
    "container": "77.5rem",
    "measure": "42.5rem"
  },
  "variants": {
    "header": "blur",
    "hero": "plain",
    "heroOverlay": "none",
    "card": "line",
    "rhythm": "flat",
    "texture": "none",
    "hover": "lift",
    "portrait": "circle",
    "eyebrowMark": "none"
  },
  "motion": {
    "style": "rise",
    "duration": 800,
    "easing": "cubic-bezier(0.2, 0.7, 0.2, 1)",
    "stagger": 80,
    "carouselInterval": 4500
  },
  "imagery": {
    "treatment": "architectural-neutral",
    "cssFilter": "saturate(0.9) contrast(1.05)",
    "radius": "20px",
    "aspect": "5:4",
    "direction": "Architectural, high-key photography: clean geometry, strong negative space, soft daylight on white and concrete. Neutral greys with at most one accent-colored element. Calm, exact, editorial.",
    "avoid": "Stock-photo clichés (handshakes, pointing at screens), text or logos baked into the image, watermarks, AI-looking gloss, distorted hands or faces."
  },
  "overrides": {
    "forceInter": true,
    "forceNoBold": true
  },
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px"
  }
}
```
