# Design Guide

Direction: Blueprint — navy bands · modest boxes · never bold (light)
Contract: v3
Overrides: Force Inter on · Force no bold on
Export: B-MVJYKZD7

This file lives at the repository root as `DESIGN_GUIDE.md`. It is the single source of truth for the site's visual design. The `tokens` block at the end is the machine-readable contract; everything above it explains how to apply those values. Never edit this file by hand — regenerate it from the design prototype with "Export Design Guide".

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
- Add pages, sections, features or controls that do not exist in the code. Patterns from the Pattern library restyle and rearrange existing content; they are not a licence to add any (for example article search, topic filters or a contact form). Style what exists; list anything from this guide that has no counterpart in the code under "Not implemented" in your PR description.
- Move content between pages or between sections, hide content, or remove content.
- Add, replace, download or generate images, icons or logos. Use only the assets already in the repository. Small stroke UI icons (chevron, mail, lock, eye, search) may be inline SVG.

When a rule in this guide cannot be met without breaking the list above, the list above wins. Leave it as is and note it in the PR.

## Placeholders → real content

The prototype uses stand-ins. Map each one to what the site already has; never ship a placeholder.

| In the prototype | Stands for | Rule |
| --- | --- | --- |
| Any text (headlines, paragraphs, labels, [00] stats, [EMAIL], [PHONE]) | The site's existing copy | Keep the real copy exactly. Design must hold real lengths: headings wrap, cards keep equal height, card summaries may clamp to 3 lines with CSS. |
| "N" square and "The Night Ventures" wordmark | The site's existing logo or wordmark | Use the existing logo asset. If there is none, set the wordmark from `brand` tokens (or the site name) next to a 32px accent square with the initial, radius 8px. |
| Floating cards in the hero (Your Model, Research Plan, Scenarios, Live Deal) | Existing hero media | Apply only through Pattern library P1. The cards are an illustrative composition. Never invent their text: build them only from existing product screenshots or UI images in the repo (each image becomes one floating card). If none exist, use the carousel spec with existing hero images; if there are none of those either, run the hero as a single text column. |
| Role switcher (Founders & CEOs, CFOs & Finance…) and its summary card | Existing audience, service or tab content | Apply only through Pattern library P4. Style existing tabbed or segmented content with the Role switcher spec. If the site has a plain list of audiences, it may become tabs only if each item already has its own content to show; never invent panel text, stats or the summary card. Otherwise skip and note it. |
| Light cool-tinted blocks labelled "Image 1–4" in the hero (carousel option) | Existing hero images | 5:4 frame, `object-fit: cover`, imagery filter, radiusLg, 1px border in white at 18%, shadow 0 24px 60px black at 28%. Hero images must read clearly against the band: light, high-key images; never navy-dominant or dark images that blend into the hero. Two or more images: carousel. One image: static, no arrows or dots. None: the hero runs as a single text column on the band; no empty frame. |
| Tinted blocks on article cards and the article cover | Existing article images | Cards 16:10, cover 2:1, `object-fit: cover`, imagery filter. Missing image: surfaceAlt block, no text inside. |
| About image, inline article figures | Existing images in those slots | Keep each image's existing aspect within a radiusLg frame; never crop out faces or text. |
| Grey circle beside the author name | Existing author photo | 40px, radius radiusLg-scaled (12px). Missing photo: surfaceAlt block. Never generate initials or avatars. |
| Made-up client logos (Halcyon, Arcfield…) | Real client logos in the repo | Render in muted with `filter: grayscale(1)` and opacity 0.75, equal visual height (~28px). If the site has no client logos, do not build the Select Clients section; note it in the PR. |
| Index numbers 01–03 on What We Do cards | Order of the existing cards | Generate with CSS counters, not text. |
| Typewriter words (Data., Numbers., Evidence., Research.) | The hero headline's existing final word | The real final word is typed in first. Cycle through other words only if the content already provides them; otherwise type the real word once and keep the caret blinking. The two-line rule still applies. |
| "Clients · Projects" meta row at the bottom of the hero | Existing hero meta links or stats, if any | Style what exists. If nothing exists, leave the row out. |
| Log In card, Forgot Password, Leave a Message form | Existing auth and contact UI, if any | Style what exists with the field, button and accordion specs. Never add auth, a reset flow or a contact form. |
| Topic chips, article count, "Showing X of Y", Load More | Existing article categories and pagination, if any | Style what exists with the chip, count and button specs. If filtering, search or pagination do not exist in the code, do not build them. |
| Generated dates, read times, tags | Existing article metadata | Show only metadata the site already outputs. |

Image rules for every slot: keep existing `alt` text, `loading="lazy"` below the fold is allowed, never bake text into images, never stretch (always `object-fit: cover` inside a fixed aspect frame), and apply the imagery CSS filter consistently.

## Direction

Blueprint. A deep architectural navy used as a frame, never as wallpaper: the header opens on navy, the hero breaks into a bright blue gradient that sinks back to near-black navy, the footer closes on navy, and everything between is white and calm, with one pale-blue section for the role switcher. A faint blueprint grid lives only in the hero (and the log-in panel), fading out to the right, so it reads as a signature, not a pattern. Modest boxes: hairline borders, small corners on controls, slightly larger corners on cards. One electric blue for action. Inter throughout, nothing bold.

## Brand identity

Wordmark: when the wordmark tokens are empty, the site name is used. Set in the display font at 400, 20px, tracking -0.01em, bandFg on the header band and footer. It sits 14px after a 32px accent square (radius 8px) carrying the initial in accentFg at 15px — the logo mark placeholder; an existing logo asset always replaces it.

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| bg | #FFFFFF | Page background |
| surface | #FFFFFF | Cards, dropdowns, accordion cards |
| surfaceAlt | #F5F7FA | Alternate section (How It Works), hover fills, tag chips |
| fg | #14171C | Body and heading text on light |
| muted | #5B616B | Secondary text, meta lines, captions |
| border | #E3E6EA | Hairlines and card borders |
| accent | #3062FF | Fills: primary buttons, logo mark, active dots, focus |
| accentHover | #2953D9 | Primary button hover fill |
| accentFg | #FFFFFF | Text on an accent fill |
| accentInk | #3062FF | Accent used as TEXT on light: links, Forgot Password, card indexes, Read More |
| highlight | #BFD4FF | Accent text on the band: typewriter word and caret, eyebrows on navy |
| band | #2C4A6E | The navy: header, hero, footer, log-in panel |
| bandFg | #FFFFFF | Text on band |
| bandMuted | #B9C6D8 | Secondary text on band |
| headerBg | #1B2E47 | Header background (opaque), deliberately different from the hero band |
| headerFg | #FFFFFF | Header text |
| footerBg | #2C4A6E | Footer background |
| footerFg | #FFFFFF | Footer text |
| onImage | #FFFFFF | Text placed over photographs |
| focus | #3062FF | Focus ring |

Accent is a fill color. Accent text on light uses accentInk; accent text on the band uses highlight. Text on an accent fill uses accentFg.

Extras (prose values, emit as `--x-*`): hero gradient stops #0B57D0 / #0A55C8 / #0A3C8F / #071C40 and hero glow rgba(24,150,255,.55), on-blue primary button #FFFFFF with #0B2F6E text, floating card fill rgba(9,32,78,.62), connector and bar blue #3DA0FF, pale section #F0F5FF, active tab #DCE6FB / #C7D6F7, stat tile #F7F9FC, alert tile #FFF5F0 / #F6CDBB / #C2410C, success #15803D / #E7F6EC, danger #B42318 / #FDECEC, warning #B45309 / #FEF3E2, band glow #78A0CD (radial, 38% at the upper left of the hero, 14% at the lower right), field fill #E8EEFB, field border #DCE3EE, strong border #D5DAE1 (outline buttons, inputs on white), card hover border #C9D2DE, outline-on-band white at 35%, nav hover on band white at 8%, active nav on band white at 12%, grid line white at 8%.

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
| H3 | 28.43px | 21.33px |
| H2 | 37.9px | 28.43px |
| H1 | 50.52px | 37.9px |

Body is the base size. Lead is base × 1.2. H3 is base × scale², H2 base × scale³, H1 base × scale⁴ at the large breakpoint; on mobile each heading drops one step. Headings scale fluidly between the two. The hero headline is the exception: see Hero headline below.

Fixed UI sizes: nav 15px · buttons 15px · field text 16px · labels 15px · card titles 20–22px · accordion titles 18px · eyebrow 13px · meta, captions and chips 13px · article body 18px.

| Weight role | Value | Applies to |
| --- | --- | --- |
| Heading | 400 | h1–h3, card titles, accordion titles, wordmark |
| Display light | 300 | stat values, pull quotes |
| UI | 400 | eyebrows, buttons, nav links, labels |
| Strong | 400 | strong, b, th, dt, markdown bold (emphasis comes from size and color, never weight) |
| Body | 400 | all running text |

Headings: tracking -0.03em, leading 1.08, Title Case. Body line-height 1.6; article body 1.75. Eyebrow: uppercase, tracking 0.06em, accentInk on light and highlight on band. Set `font-synthesis-weight: none` so the browser never fakes bold, and `-webkit-font-smoothing: antialiased`.

Capitalization: headings, buttons, nav items, tabs, chips, labels and card titles read in Title Case (Get Started, Log In, Forgot Password?, Leave a Message). Apply it with CSS `text-transform: capitalize` only — never retype the copy. Running text stays as written.

## Layout & spacing

Density: regular — 96px desktop / 56px mobile section padding. Hero: 96px top, 112px bottom.
Container: 77.5rem (1240px) with a 24px side gutter. Measure (reading width): 42.5rem (680px).
Wide pages: Articles and Article use a wide container, 90rem (1440px), with clamp(16px, 3vw, 40px) side gutters; their header and footer use the same width so edges line up. Reading text never runs full width: the article body column is capped at 47.5rem (760px) and the remaining width goes to the right rail.
Radius: 6px on controls (buttons, fields, chips' inner shapes, nav hover, icon buttons); large radius 16px on cards, accordion cards, media frames, dropdowns and the CTA box. Only small indicators are fully rounded (carousel dots, topic tags on cards); filter chips use the control radius.
Gaps: 20px between cards, 56px between split columns, 16px between accordion cards, 24px between form fields.
Controls: buttons 44px high, 20px side padding; full-width buttons inside cards (Log In, Submit); fields 52px high with a 20px stroke icon inset 18px. Minimum touch target 44×44px.

## Components

| Component | Value | Behavior |
| --- | --- | --- |
| Header | band | Sticky, opaque header in a deeper navy than the hero (#1B2E47), 1px bottom rule in white at 8%, so the header reads as its own bar above the hero. Links in headerFg at 86%; hover white 8%; active white 12%. Log In is an outline in white at 35%. Wordmark left; links right: What We Do (dropdown), How It Works, About, Articles, Log In. |
| Dropdown | chevron | 14px stroke chevron rotates 180° on open (350ms). Menu: surface, 1px border, radiusLg, 6px padding, shadow 0 16px 40px fg/10%, items in fg; fades in and slides down 6px. |
| Hero | band | Full-bleed hero on the blue gradient: linear 180° from #0B57D0 (0%) through #0A55C8 (40%) and #0A3C8F (75%) to #071C40 (100%), plus a radial glow rgba(24,150,255,.55) centered at 62% 45% fading out by 70%. Lead text in white at 88% (bandMuted is too weak on bright blue). Primary button is a white fill with #0B2F6E text — an accent-blue button disappears on blue. Secondary is the outline-on-band. No grid on the gradient. Copy left (H1, lead, two buttons), media right. A meta row sits at the bottom of the hero with 20px stroke icons. Copy column takes ~58% of the container, media ~42%. |
| Hero media | floating cards | Floating cards: 3–4 small dark-glass cards (rgba(9,32,78,.62) fill, 1px white 12% border, 12px radius, 18px 20px padding, 8px backdrop blur, shadow 0 20px 50px rgba(3,12,35,.35)) arranged loosely on the right half, joined by thin curved connector lines in rgba(130,195,255,.45). Card eyebrows 12px uppercase, tracking .14em, white 62%; content 14–17px white; progress bars 4px on white 14% with #3DA0FF fill. Each card bobs 8px on a 7s ease-in-out loop, offset per card. Below 720px the cards stack in a single column and the connector lines hide. |
| Hero headline | two lines | Always exactly two lines: an explicit break after line one, line two nowrap. The typewriter word slot reserves the width of the longest word (invisible copy stacked under the live word with inline-grid). Size is set from the copy column, not the viewport: clamp(28px, 4.4vw, 54px) for a ~660px column — reduce the max until line two fits the real column, never let it wrap. |
| Hero overlay | none | No overlay. |
| Texture | grid | Blueprint grid: 1px lines in white at 8% on a 64px grid, masked to fade out to the right (mask: black → 60% at 55% → transparent). Under it, the band glow. Allowed only on: the hero band and the log-in panel. Not on the header, footer or any other surface. Never on two consecutive sections, never behind body text blocks. |
| Card | line | surface, 1px border, radiusLg, 28px padding. Index number (01, 02…) in accentInk 13px above the title. Read More link in accentInk with a chevron. |
| Button | solid | Primary: accent fill, accentFg text, radius, hover accentHover. Secondary on light: 1px strong-border outline, fg text, hover surfaceAlt. Secondary on band: 1px white 35% outline, bandFg text, hover white 8%. |
| Field | filled | Log-in style: field fill, 1px field border, radius, 52px, 20px stroke icon left in muted, value in fg 16px; trailing icon button (eye) 44px. Form style: white, 1px strong border, radius, label above in fg 15px, 24px between fields. Focus: border accent plus 3px accent ring at 12%. |
| Accordion | card | Each item is its own card: surface, 1px border, radiusLg. Header row 64px: title left (fg 18px), chevron right (20px, rotates 180° when open). When open a 1px border hairline separates header and body. Opens with grid-template-rows 0fr → 1fr (450ms) plus fade (350ms). One open at a time. |
| Role switcher | tabs + panel | Section on a pale blue (#F0F5FF) with hairlines top and bottom; centered H2 and lead above. Left: a vertical tab list (~30% width) of cards, 68px min height, radiusLg, 1px border, 18px padding, a 40px icon square (radius 8px) and the label at 17px. Inactive: surface, muted icon square on surfaceAlt. Active: #DCE6FB fill, #C7D6F7 border, a 3px inset accent bar on the left edge, icon square in band with white icon. Right: one large surface card (radiusLg, 40px padding) with H3, lead, Learn More (accentInk + arrow), and a nested summary card: header row with title and date, a row of stat tiles (radius 10px, #F7F9FC; values 40px at weight 300; positive notes in success green; one alert tile in #FFF5F0 / #F6CDBB with the value in #C2410C), a Highlights & Risks list of row tiles with status chips, and a takeaway bar on field fill with an accent bolt icon. Switching tabs swaps the panel content with a 450ms fade-and-rise. Real tab semantics: role="tablist", role="tab", aria-selected, role="tabpanel". Below 900px the tab list sits above the panel. |
| Status chips | pill | 12px text, 3px 10px padding, fully rounded: success #15803D on #E7F6EC, danger #B42318 on #FDECEC, warning #B45309 on #FEF3E2. Always paired with an icon or label, never color alone. |
| Section rhythm | flat | Light sections on bg separated by 1px hairlines; How It Works sits on surfaceAlt. Navy appears only as bookends: header + hero at the top, footer at the bottom. |
| Hover | lift | Cards move up 4px, border darkens to the card hover border and gain shadow 0 12px 32px fg/8% over 350ms. |
| Carousel | crossfade | Slides crossfade (900ms) while settling from scale 1.04 to 1 (1200ms). 44px round prev/next buttons in surface with a 1px border and fg chevrons. Dots sit on the image: 6px band at 30%, active stretches to a 22px pill in band. The frame lifts off the band with the shadow above. |
| Logo marquee | marquee | "Select Clients" eyebrow left-aligned above a single row of client logos in muted at 75% opacity (~28px tall, 72px apart). Scrolls right to left, endless and seamless, fading at both edges through a mask over the outer 14%. Hover pauses it. |
| Filter chips | button | 36px high, 14px side padding, radius (same as buttons), 1px strong border; active = band fill with bandFg text. Not pills. |
| Search | field | 44px, radius, 1px strong border, 16px search icon inset left; focus as Field. |
| Footer | band | footerBg, link columns in bandMuted, column heads in footerFg, 1px rule in white at 10% above a centered copyright line in bandMuted. |
| Portrait | rounded | Author photos 40px with 12px radius. |
| Eyebrow mark | none | Eyebrow text only. |
| Reveal motion | rise | Scroll-linked rise with a soft blur (see Motion). |

## Motion

Easing everywhere: cubic-bezier(0.2, 0.7, 0.2, 1). Nothing bounces.

- Load: hero elements rise 16px and fade in over 800ms, staggered 80ms.
- Scroll reveal: opacity 0 → 1, translateY 36px → 0, blur 6px → 0. Scroll-linked (`animation-timeline: view()`, range entry 0% → cover 28%); cards in a row stagger by offsetting the range 10% each. Where unsupported, content simply shows.
- Typewriter: the last word of the hero H1 types in and out — 95ms per letter typing, hold 1800ms, 45ms per letter deleting, 350ms pause. Words: Data., Numbers., Evidence., Research. All in highlight, with a 2px highlight caret blinking at 1s (steps).
- Logo marquee: continuous linear scroll right to left, about 3.5s per logo (70s for 20), seamless; pauses on hover.
- Carousel interval 4500ms; autoplay on.
- Under `prefers-reduced-motion: reduce`: no reveal motion, no typewriter (show the first word static), no hover transforms, no carousel autoplay, no marquee movement (logos sit static and centered).

## Imagery

Treatment: architectural-cool
CSS filter: saturate(0.85) contrast(1.05)
Radius: 16px
Aspect: 5:4 (hero), 16:10 (cards), 2:1 (article cover)
Direction: Architectural, high-key photography and clean data visuals: drawings, plans, measured lines, daylight on glass and concrete. Cool neutrals with navy and at most one electric-blue element. Calm, exact, analytical.
Hero rule: images on the band must be light and high-contrast against it; anything that matches the navy disappears.
Avoid: Stock-photo clichés (handshakes, pointing at screens), text or logos baked into the image, watermarks, AI-looking gloss, distorted hands or faces, warm color casts.
Key palette: fg #14171C, bg #FFFFFF, band #2C4A6E, accent #3062FF, highlight #BFD4FF

## Pattern library — apply when the content fits

These are the patterns this direction offers. None of them is mandatory. For every section of the real site, check the triggers below in order, and apply the first pattern whose trigger matches the content that already exists. If nothing matches, use the base styling (type, color, cards, spacing) and move on. A pattern may rearrange and restyle existing content inside its own section; it never adds copy, data or assets (see Scope).

How to decide:
1. Read the section's existing content: how many sibling items, what each item holds (title, body, image, number, link, own page), and whether there is a form.
2. Pick the first matching trigger. Prefer the simplest pattern that fits.
3. Check the limits column. If a limit is hit, fall back to the listed alternative.
4. Record the decision (section → pattern → why) for the report.

| # | Pattern | Use when the existing content has… | Build it from | Limits / fall back to |
| --- | --- | --- | --- | --- |
| P1 | Floating cards hero | A hero with 2–4 product or UI screenshots, OR a hero that already contains 3–5 short structured items (features, steps, metrics) in its own markup | Each screenshot or existing item becomes one dark-glass card; existing item text moves into the card unchanged | Exactly one hero pattern per page. Items longer than ~8 words each → P2 or P3 |
| P2 | Carousel hero | A hero with 2+ photographs or illustrations and no structured items | The existing images, light and high-key | One image → static framed image, no arrows or dots |
| P3 | Single-column hero | A hero with text only | The existing headline, lead and buttons | — |
| P4 | Role switcher (tabs + panel) | One section with 3–7 sibling items of the same kind (audiences, roles, services, industries, use cases) where each item has its own body of at least two sentences or its own sub-elements (list, numbers, image) | Item titles → tabs; the active item's own body → the panel; existing numbers → P7 tiles inside the panel; existing lists → P8 rows inside the panel | Max one per page. Items with one line each → P5. Never invent a summary card: render only the sub-parts that exist |
| P5 | Indexed cards | 3–6 sibling items of similar weight, each a title plus a short line | One card per item, with a CSS-counter index (01, 02…) above the title | 7+ items → two rows; items with long bodies → P6 |
| P6 | Accordion cards | 4+ items where each has a short title and a longer body (FAQs, process steps with detail, policies) | Title → header row, body → collapsible panel | Fewer than 4 items, or bodies under two lines → P5 |
| P7 | Stat tiles | 2–4 numbers that each have a label | One tile per number; value at 40px weight 300, label above, existing note below | Alert styling only if the content itself marks the number as a risk or warning |
| P8 | Status chips + row tiles | Items that already carry a status, rating, category or tag | Row tile with icon, label and the existing status text as a chip | Map status text to success / danger / warning only when its meaning is clear; otherwise neutral chip (surfaceAlt, muted text) |
| P9 | Logo marquee | 6+ client or partner logos | The existing logo files | 2–5 logos → a static centered row, no motion. No logos → skip the section |
| P10 | Takeaway bar | An existing summary, key point, note or callout sentence | Field-fill bar with an accent bolt icon, label in fg | One per section |
| P11 | Filled field with icon | Log-in, sign-up, newsletter or search inputs (1–2 fields) | Existing inputs, with a stroke icon matched to the field type | — |
| P12 | Labelled form | Forms with 3+ fields | Existing labels and inputs; full-width primary button | — |
| P13 | Collapsed secondary form | A second form on a page whose primary task is another form (e.g. contact form under log-in) | The secondary form inside an accordion card, collapsed by default | Only when that form already exists on that page |
| P14 | Pull quote | A real quote or testimonial with an existing source | Quote at weight 300 between hairlines, source below in muted | Never without a real source |
| P15 | Pale-blue section | The single most important mid-page section, usually the P4 section | #F0F5FF background with hairlines | Max one per page; never adjacent to a navy band |
| P16 | Blueprint grid | Hero in the blueprint-grid style, or a log-in / auth split panel | The grid spec in Texture | Never on consecutive sections or behind body text |
| P17 | Typewriter | A hero headline whose final word or phrase has existing alternatives in the content | The real final word first, then the existing alternatives | No alternatives → type the real word once, caret keeps blinking |

Page-level limits: one hero pattern, at most one P4 and one P15 per page, and never two consecutive sections using the same heavy pattern (P4, P6). If two patterns would sit back to back, demote the second to its fall-back.

## Pages

The pages below show the prototype with every pattern switched on. On the real site, each section gets the pattern its content triggers.

- Home: Header (band) → Hero (band, grid, glow) → Select Clients (logo marquee) → What We Do (3 indexed cards) → Who We Serve (role switcher on pale blue) → How It Works (accordion cards, surfaceAlt) → About (image + copy + 3 stats) → Latest Articles (3 cards + View All) → closing CTA box (white card, filled email field + Subscribe) → Footer (band). What We Do, How It Works and About are anchors on Home; Articles and Log In are their own pages.
- Log In: full-height split screen. Left half is the band with the grid and glow: logo + wordmark top-left, the hero headline and lead bottom-third, meta row (Clients · Projects) at the bottom. Right half is white with a centered 460px column: the log-in card (radiusLg, 1px border, 28px padding: filled email field with mail icon, filled password field with lock icon and eye toggle, Forgot Password? right-aligned in accentInk, full-width Log In button), 24px gap, the Leave a Message accordion card (collapsed by default; opens to labelled Name, Email, Message fields and a full-width Submit), then the copyright line centered in muted.
- Articles: header band, then light: eyebrow + H1 at clamp(40px, 4.4vw, 64px) up to 1000px wide + lead; filter chips left and title search right above a hairline; "Showing X of Y"; auto-fill grid (min 280px, four columns at full width) of article cards; first 21 shown, Load More Articles adds 9; dashed empty state.
- Article: back link (All Articles), topic pill, H1 at clamp(36px, 4.2vw, 64px) up to 1120px wide, standfirst 20px muted up to 860px, author row between hairlines across the full container with icon buttons, a 21:9 cover across the full container, then two columns: the body (max 760px, 18px / 1.75, H2 28px, pull quote at the light weight between hairlines, figures with captions) on the left and a sticky right rail (300px, 1px border, large radius, 24px padding, top 96px) holding the article's existing meta: its table of contents if the site already has one (or if the article has 3+ H2s and the site already renders heading anchors), then tags. Below 900px the rail drops under the body and stops being sticky. Keep Reading row of 3 cards below, full container width.

## Signature details

These make the Direction recognisable. Implement every one with CSS and small markup additions to existing components.

- Navy bookends: the page opens on the band and closes on the band; everything between is white. The header is a separate bar in its own color above the hero.
- The blueprint grid, fading right, only where allowed — one appearance per page.
- Filled log-in fields with stroke icons, and full-width blue action buttons inside cards.
- Every disclosure is a bordered card with a thin chevron that rotates 180°.
- Small index numbers (01, 02, 03) in accentInk above card titles.
- The typewriter word in highlight on the hero.
- The hero as a bright blue gradient deepening to near-black navy, with dark-glass cards floating on it.
- The role switcher: tab cards on the left, one large detailed card on the right.
- Thin-to-regular type only; nothing on the site is bold. Title Case on every heading and button.

## Voice (reference only)

Clipped and declarative. Examples: "Sharp strategy. Built on hard data.", "Fewer parts. Better work.".
Never rewrite existing site copy to match this. It is guidance for future copy only.

## Don'ts

- Bold or semibold anywhere.
- The grid texture on more than the allowed surfaces, or on consecutive sections.
- Navy section after navy section; navy is a frame, not a background.
- A second typeface.
- Gradients other than the hero gradient and glows defined here.
- Large rounded "bubbly" corners; nothing above the large radius.
- Bouncy or springy motion.

## Rules

- Design and optics only. No copy, logic, routing, data or content changes (see Scope).
- Every color, font, weight, radius, shadow and easing comes from this file. No hard-coded hex, font-family or font-weight anywhere in components or CSS.
- Accent as text always means accentInk on light and highlight on the band.
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
- highlight on band
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
  "templateName": "Blueprint",
  "tagline": "Navy bands · modest boxes · never bold",
  "mode": "light",
  "brand": {
    "wordmarkPrimary": "",
    "wordmarkAccent": ""
  },
  "colors": {
    "bg": "#FFFFFF",
    "surface": "#FFFFFF",
    "surfaceAlt": "#F5F7FA",
    "fg": "#14171C",
    "muted": "#5B616B",
    "border": "#E3E6EA",
    "accent": "#3062FF",
    "accentHover": "#2953D9",
    "accentFg": "#FFFFFF",
    "accentInk": "#3062FF",
    "highlight": "#BFD4FF",
    "band": "#2C4A6E",
    "bandFg": "#FFFFFF",
    "bandMuted": "#B9C6D8",
    "headerBg": "#1B2E47",
    "headerFg": "#FFFFFF",
    "footerBg": "#2C4A6E",
    "footerFg": "#FFFFFF",
    "onImage": "#FFFFFF",
    "focus": "#3062FF"
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
    "scale": 1.333,
    "headingWeight": 400,
    "uiWeight": 400,
    "strongWeight": 400,
    "bodyWeight": 400,
    "headingTracking": "-0.03em",
    "headingLeading": 1.08,
    "headingCase": "none",
    "eyebrow": "uppercase",
    "eyebrowTracking": "0.06em"
  },
  "shape": {
    "radius": "6px",
    "radiusLg": "16px",
    "button": "solid"
  },
  "layout": {
    "density": "regular",
    "container": "77.5rem",
    "measure": "42.5rem"
  },
  "variants": {
    "header": "band",
    "hero": "band",
    "heroOverlay": "none",
    "card": "line",
    "rhythm": "flat",
    "texture": "grid",
    "hover": "lift",
    "portrait": "rounded",
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
    "treatment": "architectural-cool",
    "cssFilter": "saturate(0.85) contrast(1.05)",
    "radius": "16px",
    "aspect": "5:4",
    "direction": "Architectural, high-key photography and clean data visuals: drawings, plans, measured lines, daylight on glass and concrete. Cool neutrals with navy and at most one electric-blue element. Calm, exact, analytical.",
    "avoid": "Stock-photo clichés (handshakes, pointing at screens), text or logos baked into the image, watermarks, AI-looking gloss, distorted hands or faces, warm color casts."
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
