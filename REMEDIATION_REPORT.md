# Remediation report

20 October 2026. Final production-readiness pass, limited to this repository. Privacy and Terms are treated as approved for publication. No credentials, testimonials, client outcomes, prices, governing law, effective date, or other unestablished facts were invented.

## Changes made in this pass

- `/privacy/` and `/terms/` are published notices. Public wording that called them drafts, pending legal review, or awaiting an effective date after counsel was removed. The substantive limits that were already true stayed: email-only contact, no form, no advertising pixels, Analytics off while no measurement ID is set, Vercel hosting, Google Workspace mailbox, no published postal address, liability limited only to the extent the law allows.
- Visitor-facing sentences that described missing “company information” were rewritten as the same business facts: no rate card, no published case studies, no outcome promised before the engagement is agreed.
- Remaining article sentences that stated an unsourced market share, failure rate, analyst forecast, client volume, or dated product release were rewritten as practical guidance. No citations were added.
- `@types/node` `^26.6.5` was added as a devDependency of the `site` workspace so `astro check` can typecheck `site/scripts/audit-dist.ts`. The audit script was not weakened.

Earlier remediation still stands: canonical origin `https://noblackswan.com`, swan mark and brand assets, empty organization `sameAs`, email-only contact, unpublished testimonials route, four SEO articles kept as drafts, 2026 copyright, and the industry-page article as a general guide.

## Commands and results

Run from `C:\Dev\no-black-swan` on 20 October 2026.

| Command | Result |
| --- | --- |
| `npm run check` | Passed. `astro check`: 46 files, 0 errors, 0 warnings, 0 hints. |
| `npm run build` | Passed after the last content edit. Contrast check passed. Astro built 26 pages. seo-core wrote 25 sitemap URLs. `audit-dist` theme gates passed. The root `build` script runs the site build and then `npm run audit`, so the audit runs twice; both runs passed. |

`audit-dist` printed 11 warnings. They do not fail the build:

- Organization `sameAs` is empty.
- Each of the 10 published articles has 0 external links. The checker asks for 3. Unsourced claims were removed instead of adding links that do not support a sentence.

During content sync, Astro sometimes warns that an article id is duplicated while that file is being rewritten. Each slug is one file. The build emitted each article route once.

## Verified

Checked in `site/dist` and in a local preview of that build at `http://localhost:4322`.

- Built HTML, sitemap, `llms.txt`, `llms-full.txt`, `rss.xml`, and `robots.txt` do not contain “legal review,” “this draft,” “company information,” `example.com`, `www.noblackswan.com`, a GA4 script, or a Search Console verification tag. The only “placeholder” hit is the industry article’s ordinary sentence about thin pages, not an editorial note.
- Every built HTML page has a title and a meta description. The 26 descriptions are unique. Every canonical URL starts with `https://noblackswan.com`.
- Sitemap has 25 URLs, all on `https://noblackswan.com`, including `/privacy/` and `/terms/`. Those two pages stay indexable. That is the existing policy.
- Sitemap excludes `/testimonials/`, `/articles/2/`, and the four draft slugs. `/404.html` is `noindex` and is not in the sitemap.
- `robots.txt` allows crawling and points to `https://noblackswan.com/sitemap.xml`.
- `logo.png`, `og-default.png`, `favicon.svg`, `favicon-32.png`, and `apple-touch-icon.png` are present in `site/dist`.
- Preview rendered home, about, contact, privacy, terms, the article index (10 articles), `/articles/ai-agent-development-company/`, and `/testimonials/` (custom 404: “That page is not on this site.”). Contact shows `team@noblackswan.com` and “We reply within 1 business day.” Footer positioning and “© 2026 No Black Swan” are present. Skip-to-content and keyboard-focusable navigation are in the pages. Contrast check passed for the pristine theme.

## Not independently verified

- The live host and the Vercel project environment were not inspected. This report does not claim production has a GA4 ID, a Search Console token, or the latest build.
- No mobile screenshot pass was run. Layout was not changed in this pass.
- Article author-bio images still use seo-core’s hardcoded alt “headshot.” Team pages use “Portrait of {name}.” Patching `node_modules` would not survive an install.

## Analytics and Search Console

`site/src/config/publicEnv.ts` reads two public build-time variables. Empty values keep the features off. The production build succeeds with both empty.

| Variable | Where to set it | Current behavior |
| --- | --- | --- |
| `PUBLIC_ANALYTICS_ID` | `site/.env` locally; Vercel → Settings → Environment Variables for production | Trimmed to letters, digits, and hyphens. When empty, `BaseLayout.astro` does not emit the gtag script. |
| `PUBLIC_SEARCH_CONSOLE_VERIFICATION` | Same two places | Trimmed. When empty, the `google-site-verification` meta tag is omitted. |

There is no consent banner. That matches the privacy notice, which says Analytics is not running. If a real measurement ID is added later, the current layout loads gtag as soon as the page loads. The privacy notice would need a matching update, and any required consent, before that change is published.

## Facts the legal pages do not state

These are absent because they are not established in the repository. They are not review notes, and they are not blockers for the pages as published.

- Governing law and venue (the terms section that would have named them was removed).
- An effective date on either page.
- Retention periods for email, logs, or backups.
- Security controls or an incident process.
- Named privacy statutes, rights, or response deadlines.
- A postal address (the pages say none is published).
- Processors other than Vercel for hosting and Google Workspace for the mailbox, and any international-transfer terms.
- A numeric liability cap. The terms limit indirect and consequential loss only to the extent the law allows, and they say they do not exclude liability that cannot legally be excluded.

## Remaining owner actions

1. Set `PUBLIC_ANALYTICS_ID` to the real GA4 measurement ID in `site/.env` and in the Vercel project environment. Leave it empty until then. Before setting it in production, update `/privacy/` and decide on consent, because the script loads immediately once the ID exists.
2. Set `PUBLIC_SEARCH_CONSOLE_VERIFICATION` to the real HTML-tag token in the same two places.
3. Add official organization profile URLs to `SAME_AS` in `site/src/config/site.ts` when those profiles exist.
4. Optional: supply any of the legal clauses listed above if you want them on the pages.
5. Optional: replace the swan mark.
6. Optional: approve the four draft SEO articles and supply 2:1 covers of at least 2160×1080.
7. Optional: supply real approved testimonials before restoring that section or `/testimonials/`.

## Claim-to-source table

Private audit of the 10 published articles. No external URL was added. A source is listed only where one directly supports the sentence. Illustrative examples (a sample invoice workload, “48 hours,” “ninety minutes,” a suggested question about “twelve weeks”) are hypothetical problem statements, not market claims, and are not listed as citations.

| Article | Claim | Supporting source | Outcome |
| --- | --- | --- | --- |
| `ai-agent-development-company` | Single-agent work is “the majority of deployments in the market.” | None | Removed. The page now says a defined task is an easier starting point than a network of agents. |
| `ai-agent-development-company` | “Most agents lose performance within months of launch.” | None | Rewritten as a risk: model, API, or data changes can go unnoticed without monitoring. |
| `ai-agent-development-company` | “New tooling released in October 2026” closes the observability gap. | None | Removed. The page still asks a partner to describe the observability they will provide. |
| `ai-agent-development-company` | “Analysts expect” agents to become full ecosystems. | None | Removed. The page keeps the point that the first agent shapes later architecture. |
| `ai-automation-services` | Named ROI percentages and survey benchmarks. | None | Already removed in the prior pass. Comparison is the hours the workflow uses now. Boomi is named only as an example of an integration platform. |
| `ai-consulting-companies-for-small-business` | A boutique “has done it thirty times”; “three dominant” market pricing models. | None | Rewritten as “shipped that kind of workflow” and “three common ways to price the work.” |
| `ai-consulting-for-small-business` | “Most small business owners have tried at least one AI tool” as a prevalence claim. | None | Rewritten as a familiar starting point, not a measured share. |
| `ai-consulting-for-small-business-faq` | Hours returned for “the overwhelming majority” of projects; a three-month abandonment rate. | None | Prevalence and the time-bound statistic removed. The page says to measure the workflow and not to borrow a survey figure. |
| `ai-consulting-services` | A “within three months” abandonment figure. | None | Removed in this pass. The page describes teams that skip practice going back to the old way once work gets busy. |
| `ai-implementation-services` | Firms “often outperform” large consultancies; “most SMB AI projects fail”; Boomi is “frequently used.” | None | Reframed as structural fit, reasons projects stall, and Boomi as one example platform. |
| `boutique-ai-consultant-vs-large-consulting-firm-small-business` | “Forty to sixty percent” cheaper; “fifty clients per quarter.” | None | Percentage already removed. The client-volume figure is now “many clients at once.” |
| `how-to-choose-an-ai-consultant-for-small-business` | Discovery is “typically 2–4 weeks”; a pilot “proves ROI” in a few weeks. | None | Discovery is described as a paid phase with a fixed fee. The pilot sentence no longer states a duration or an ROI result. |
| `industry-and-local-pages` | This site publishes industry or city pages, or a measured lift from those pages. | None | The article is a decision guide. It says this site does not publish those pages. “Placeholders” in the body means thin pages, not an editorial note. |

Cover alt text on the 10 published articles describes the still life in the file. The four unpublished covers describe solid-color fields. No published article links to an unpublished slug.
