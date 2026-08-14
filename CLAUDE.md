# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Why Eat — a wellness brand website exploring the emotional and psychological
relationship with food ("we don't teach WHAT to eat, we ask WHY eat").
Editorial, minimal design: white/light-gray backgrounds, black serif body
text, a handwritten-script wordmark, sage-green accents, generous whitespace.

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
  root) just `redirect()`s to `/intro` — first-time visitors land on the
  onboarding flow, which itself redirects to `/home` once completed. The
  homepage is a named route (`/home`), not the root, so it lines up with
  the "Home" nav link.
- `src/components/Navbar.tsx` is a client component (`usePathname` for
  active-link styling) rendered once from `src/app/layout.tsx`, so it's
  shared across every route — except it renders `null` on `/intro`, which
  is intentionally chrome-free. Add new top-level pages to its `NAV_LINKS`
  array to get them into the nav bar.
- `src/components/ContactForm.tsx` is a client component with local
  `useState` only — there is no backend/API route wired up yet; submitting
  just swaps in a thank-you message client-side.
- Tailwind v4 uses CSS-based config (no `tailwind.config.js`). Theme tokens
  — the `sage-*` color scale and the two font CSS variables — are declared
  in `@theme inline` inside `src/app/globals.css`. Add new design tokens
  there, not in a JS config file.
- Fonts are loaded via `next/font/google` in `src/app/layout.tsx`:
  - `EB_Garamond` → `--font-serif-body` → mapped to Tailwind's `font-sans`
    (i.e. `font-sans` in this project renders the editorial serif, not a
    sans-serif — this is deliberate, matches the design brief).
  - `Caveat` → `--font-script-logo` → exposed as `font-script`, used only
    for the "Why Eat" wordmark in the Navbar.

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
  route below so question/option text isn't duplicated. Ends with an email
  capture form (step 6) that posts to `/api/send-survey`, then redirects to
  `/home` (auto after 2s post-submit, or immediately via "Skip").
- `src/app/api/send-survey/route.ts` — POST endpoint used by the intro
  flow's step 6. Sends the survey (name/email/message/selected
  categories/answers) to `whyeatlab@gmail.com` via Resend, from
  `onboarding@resend.dev` (Resend's shared sender — swap once a custom
  domain is verified). Requires `RESEND_API_KEY` in `.env.local`; returns a
  500 with a clear JSON error if it's unset rather than throwing, since
  local dev won't always have a real key configured.
- `/home` — homepage with hero, brand intro, testimonials, and CTA
  sections.
- `/how-we-work` — static brand philosophy content (already final copy, not
  placeholder).
- `/newspaper` — two-column layout: "Articles" (larger, left) and "Updates"
  (smaller, right), each entry has a placeholder thumbnail + title + date.
  Content in `ARTICLES`/`UPDATES` arrays is placeholder.
- `/contact` — dark sage block with mailto link (`whyeatlab@gmail.com`)
  beside the `ContactForm` component.
- `/product` — placeholder only, to be designed later.
