# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Why Eat — a wellness brand website exploring the emotional and psychological
relationship with food ("we don't teach WHAT to eat, we ask WHY eat").
Editorial, minimal design: white/light-gray backgrounds, black serif body
text, an image wordmark (`/whyeatnewlogo-nobg.png`), sage-green accents, generous
whitespace.

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build (also runs the TypeScript check)
npm run start    # run the production build
npm run lint     # ESLint (flat config, eslint-config-next)
```

There is no test runner configured. `npm run build` is the fastest way to
type-check the whole project (`tsc` runs as part of the build step).

## Architecture

Next.js 16 App Router, TypeScript, Tailwind CSS v4, React 19.

- Routes live under `src/app/<route>/page.tsx`. `src/app/page.tsx` (the `/`
  root) is a client component (`"use client"`) that checks
  `localStorage.getItem("whyeat_survey_done")` inside a `useEffect` and
  `router.replace()`s to `/home` if it's `"true"`, otherwise to `/intro` —
  so first-time visitors land on the onboarding flow, but returning
  visitors who've already been through it skip straight to `/home`. The
  check is deliberately client-only (inside `useEffect`, not read during
  render) so the static-rendered shell doesn't depend on `localStorage` at
  all — avoids a hydration mismatch, at the cost of a brief blank
  (`bg-cream`) flash before the redirect fires. `/intro` (`finishIntro()`)
  sets that flag right before navigating away, on both "Skip" and a
  successful submit in step 6 — reaching the end of the flow counts as
  "completed" either way. The homepage is a named route (`/home`), not the
  root, so it lines up with the "Home" nav link; visiting `/home` directly
  never renders any intro content, since it's a fully separate route.
- There is no top navbar. `src/components/Footer.tsx` is a client component
  (`usePathname` for active-link styling) rendered once from
  `src/app/layout.tsx`, so it's shared across every route — except it
  renders `null` on `/intro`, which is intentionally chrome-free. It's
  deliberately oversized (40px links on `sm:`+, 32px below, EB Garamond,
  generous letter-spacing) to read as a proper editorial footer rather than
  a footnote — stacks vertically on narrow screens, generously spaced
  horizontally above `sm:`. Its `NAV_LINKS` currently omits `/product`
  (still a live route, just not linked from the footer nav). Add new
  top-level pages to `NAV_LINKS` to get them into the footer.
- `src/components/FadeInSection.tsx` is a client component that wraps a
  block in an `IntersectionObserver`-driven opacity fade (0 → 1 over 1s,
  triggers once when ~15% visible, then unobserves). Used throughout
  `/home` for scroll-triggered reveals — wrap any new scroll-reveal content
  in it rather than building a second observer.
- `src/components/PageTransition.tsx` wraps `{children}` in
  `src/app/layout.tsx` and cross-fades between routes (~400ms: 200ms fade
  out the old page, swap, 200ms fade in) whenever `usePathname()` changes.
  It intentionally skips the fade on first mount (`isFirstRender` ref) so
  initial page load isn't double-animated on top of a page's own hero
  fade-ins (e.g. `/home`, `/intro` step 1).
- `src/components/ContactForm.tsx` is a client component with local
  `useState` only — there is no backend/API route wired up yet; submitting
  just swaps in a thank-you message client-side.
- Tailwind v4 uses CSS-based config (no `tailwind.config.js`). Theme tokens
  — the `sage-*` color scale and the font CSS variable — are declared in
  `@theme inline` inside `src/app/globals.css`. Add new design tokens
  there, not in a JS config file.
- Fonts are loaded via `next/font/google` in `src/app/layout.tsx`:
  `EB_Garamond` → `--font-serif-body` → mapped to Tailwind's `font-sans`
  (i.e. `font-sans` in this project renders the editorial serif, not a
  sans-serif — this is deliberate, matches the design brief). The brand
  wordmark is now the `/whyeatnewlogo-nobg.png` image (used in the `/home` hero
  and intro step 1), not a script font — there's no script/logo font
  loaded anymore.

### Pages

- `/intro` — single-page onboarding flow (`src/app/intro/page.tsx`), all
  client-side: one component drives 6 steps with `useState`
  (`step`/`selectedCategories`/`flatQuestionIndex`/`answers`), no routing
  between steps. A generic `goTo(update)` helper fades the step container
  out/in (CSS `opacity` transition) around each state change — reuse it for
  any new step-to-step or question-to-question transition rather than
  adding a second animation mechanism. Category selection (step 3) is
  multi-select; `buildQuestionQueue()` flattens every selected category's
  questions, in `CATEGORIES` order, into one queue for step 4. Category and
  question data lives in `src/lib/introCategories.ts`, shared with the API
  route below so question/option text isn't duplicated. `StepQuestion`
  appends an `OTHER_OPTION` ("Other (write your own)") after every
  question's options at render time — it's not part of the data in
  `introCategories.ts`. Picking it reveals an underline-only text input
  (optional; Enter or the small "→" button confirms); the saved answer is
  the typed text, or the literal string `"Other"` if left blank — either
  way it's stored in `answers` exactly like a normal option, so no changes
  were needed in `selectAnswer()` or the API route for it to show up in
  the survey email. `StepQuestion` is given a `key` (category + question
  index) so this local "Other" state resets between questions. Ends with
  an email capture form (step 6) that posts to `/api/send-survey`, then
  redirects to `/home` (auto after 2s post-submit, or immediately via
  "Skip").
- `src/app/api/send-survey/route.ts` — POST endpoint used by the intro
  flow's step 6. Sends the survey (name/email/message/selected
  categories/answers) to `whyeatlab@gmail.com` via Resend, from
  `onboarding@whyeatlab.com` (requires the `whyeatlab.com` domain to be
  verified in the Resend dashboard, since Resend rejects sends from an
  unverified domain). Requires `RESEND_API_KEY` in `.env.local`; returns a
  500 with a clear JSON error if it's unset rather than throwing, since
  local dev won't always have a real key configured.
- `/home` — homepage, editorial/sumi-e-inspired: cream background
  (`bg-cream`, `#faf9f6`), thin `border-divider` (`#d0ccc4`, 0.5px) lines
  between every section. Five sections in order: hero logo (fades in on
  load, links to `/intro` via "begin the survey"), a single testimony,
  brand-intro tagline, newspaper preview (links to the featured article's
  own page), then the global `Footer`. There is no founder section.
  Sections 2+ use `FadeInSection` for scroll-triggered reveals; the hero
  uses the mount-based `fade-in-opacity` keyframe instead, same pattern as
  `/intro` step 1.
- `/how-we-work` — static brand philosophy content (already final copy, not
  placeholder).
- `/newspaper` — real content (not placeholder), backed by
  `src/app/newspaper/articles.ts` (the `articles` array, each with
  `slug`/`title`/`date`/`preview`/`content`/`closing`, plus optional
  `cardNews?: boolean`) — the single source of truth for article
  *metadata*. To add a plain-text article, just append to that array (with
  `content`/`closing` filled in); nothing else needs updating.
  `/newspaper/page.tsx` lists every article as a preview card (date, 28px
  title, 16px preview, "Read →") using only `date`/`title`/`preview`/
  `slug`, so it renders card-news entries the same way with no special
  casing. `/home`'s newspaper preview imports `articles` directly
  (`featuredArticle = articles[0]`) rather than duplicating any article
  data — array order is "most recent first" and also drives what's
  featured on `/home`.
  - `/newspaper/[slug]/page.tsx` is the dynamic route for plain-text
    articles: date, 40px title, divider, body at 18px/1.9 line-height
    capped at 680px (paragraphs split from `content` on blank lines,
    `white-space: pre-line` so single `\n`s inside a paragraph still
    break), closing with a right-aligned italic attribution line (omitted
    if empty), "← Back to Newspaper" at top. `generateStaticParams`
    excludes `cardNews` articles (they're pre-rendered by their own
    dedicated page instead); `notFound()` for an unknown slug, and a
    `redirect("/newspaper")` safety net if a `cardNews` article is ever
    reached here directly (shouldn't happen — see below).
  - A `cardNews: true` article instead gets a *dedicated* page at
    `src/app/newspaper/<slug>/page.tsx` — Next.js always matches that
    static segment before the `[slug]` dynamic one for the same URL, so it
    takes over entirely; `content`/`closing` stay empty strings and are
    unused for these. The pattern (see
    `src/app/newspaper/nates-brain-part1/page.tsx`): the actual card
    artwork is a numbered sequence of pre-made PNGs at
    `public/card-news/<slug>/01.png`, `02.png`, … (currently 1080×1350,
    4:5 — exported elsewhere, not generated by this codebase), and the
    page itself is just a thin `next/image` gallery looping over that
    count, each capped at `max-width: 680px` with `aspect-ratio: 4/5`. To
    add another card-news piece: drop its numbered PNGs in a new
    `public/card-news/<slug>/` folder, copy the gallery page's pattern
    into `src/app/newspaper/<slug>/page.tsx` (update the image count and
    alt text), and add a matching `cardNews: true` entry to `articles.ts`
    for it to show in the listing/home preview.
- `/contact` — dark sage block with mailto link (`whyeatlab@gmail.com`)
  beside the `ContactForm` component.
- `/product` — placeholder only, to be designed later.
