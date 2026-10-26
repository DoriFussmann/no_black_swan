# Content to-do

Updated 20 October 2026 after the production-readiness pass. Checked items are done in this repository. Unchecked items still need you. Nothing here was filled with invented testimonials, client results, credentials, prices, analytics IDs, or Search Console tokens.

## Summary

| Status | What it covers |
| --- | --- |
| Done | Public review notes, legal pages as published notices, type check, article reset |
| Still open | GA4 measurement ID, Search Console token, official organization profile URLs |
| Later, only if you want it | Extra legal clauses, a different logo, real testimonials |

## Done

- [x] Positioning phrase is “Practical AI. Connected workflows. Real business outcomes.”
- [x] Header mark is the original SVG swan. `logo.png`, `og-default.png`, `favicon.svg`, `favicon-32.png`, and `apple-touch-icon.png` use that mark.
- [x] Canonical origin is `https://noblackswan.com`. `vercel.json` and `site/vercel.json` redirect `www.noblackswan.com` to that origin.
- [x] Contact is email only (`team@noblackswan.com`) and says replies are within 1 business day.
- [x] `/privacy/` and `/terms/` are published pages. They do not say they are drafts or awaiting legal review.
- [x] `/testimonials/` is not generated.
- [x] Articles reset to zero on 26 October 2026. New articles, keywords and supporting keywords are planned in The Night Ventures SEO Advisor and published to `site/src/content/articles/`. The homepage articles section stays hidden until the first article is published.
- [x] Published articles do not state named survey results, market-share figures, ROI percentages, or price lists.
- [x] Copyright line stays “© 2026 No Black Swan”.

## Still needs you

- [ ] **GA4 measurement ID.** Set `PUBLIC_ANALYTICS_ID` to the real ID (shape `G-XXXXXXXXXX`) in `site/.env` for a local build and in Vercel → Settings → Environment Variables for production. Leave it empty until then. The site does not load Analytics while it is empty. Before you set it in production, update the privacy notice: the page currently says Analytics is off, and the layout loads the script immediately once the ID is present. There is no consent banner.
- [ ] **Google Search Console verification token.** Set `PUBLIC_SEARCH_CONSOLE_VERIFICATION` to the HTML-tag token in the same two places. Leave it empty until then. The verification meta tag is omitted while it is empty.
- [ ] **Organization profiles.** Add official No Black Swan profile URLs to `SAME_AS` in `site/src/config/site.ts` when those profiles exist. The founder’s personal LinkedIn URL stays on the team page and is not an organization profile.

## Later, only if you want it

- [x] **Full legal pages.** Replaced on 26 October 2026 with a full Privacy Policy and Terms of Use supplied by the owner: effective date, California law with Sonoma County venue, postal address, dori@thenightventures.com as the legal contact, Cal.com booking, Vercel hosting, no analytics, $100 liability cap.
- [ ] **A different logo.** The shipped mark is the original geometric swan.
- [ ] **Testimonials.** Restore the section or `/testimonials/` only with approved quotes, names, and roles.
