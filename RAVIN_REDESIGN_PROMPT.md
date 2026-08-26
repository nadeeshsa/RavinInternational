# Ravin International — full site redesign brief

Paste this whole document into Claude in VS Code as your first message on the Ravin International repository. It is written for you (the executing Claude) to read once end-to-end before touching any file. It has explicit checkpoints where you must stop and wait for the user (Nadeesh) before continuing.

Do not skim. Do not skip checkpoints. Do not begin work you were told to defer until Nadeesh approves the previous step.

---

## 1. Context

The live site is https://ravininternational.vercel.app/. The business is ラビンインターナショナル株式会社 — a Japanese exporter of used vehicles, heavy machinery, commercial trucks, and parts, licensed dealer No. 452740019730, based at 286-1 Mimase, Aikawa-machi, Aiko-gun, Kanagawa 243-0308, Japan.

The reference site whose look-and-feel we are drawing from is https://site-beta-seven-76.vercel.app/ (Zen-Nihon Shokai, a truck dealership). We are **inspired by** its neutral corporate minimal aesthetic and its home-page rhythm. We are **not** cloning it — different business, different content, different accent character, different imagery.

The user's exact framing was:

> "modify ravininternational like the second one but not a copy. home page and theme need to be like it but not the same. colours need to match the device theme if its light need to be light if it is dark it needs to be dark."

So: home page and theme are redesigned to feel like the reference; the site as a whole is themed; light/dark follows the device's OS/browser preference automatically via `prefers-color-scheme` — no manual toggle.

Language decision (already made with the user): **Japanese primary with an English toggle.** The site is Japanese-first (like the reference), with a language switcher that flips content to English for Ravin's international buyers.

Content policy (already made with the user): **preserve business info verbatim, rewrite section copy as needed.** Phone numbers, addresses, license number, socials, real inventory data, real auction data — untouched. Section headings, taglines, marketing blurbs, and the copy you need to fit new sections may be rewritten by you.

## 2. Non-negotiable guardrails

Read these before you touch anything.

**Preserve exactly, character-for-character, from the current site:**
- Company name and legal form: `ラビンインターナショナル株式会社` (JP) / `Ravin International Co., Ltd.` (EN, if present in the repo — otherwise keep the JP form as the canonical name)
- License number: `452740019730`
- Address: `286-1 Mimase, Aikawa-machi, Aiko-gun, Kanagawa 243-0308, Japan` (Japanese form also — keep whatever the current repo has, both forms)
- Phones: mobile `080-4387-3344`, TEL/FAX `046-210-4308`
- Email: `rvinint.jp@gmail.com`
- WhatsApp: `+81-80-4387-3344`
- Social handles: YouTube, Facebook, LINE VOOM, Instagram (Instagram needs a real URL — see bugs)
- All real inventory items and their specs, prices, images, stock IDs
- All real auction items (Yahoo Auctions listings) — auction IDs, prices, valid-until dates, links
- All gallery images (41 photos) and working video embeds

**Do not copy from the reference:**
- Do not copy its color palette pixel-for-pixel. Match the *character* (neutral, corporate, minimal) and pick concrete tokens the user will approve at the design-token checkpoint.
- Do not copy its exact section headings or copy strings verbatim.
- Do not copy its logo, photography, or staff imagery.
- Do not copy its identity language ("トラックのことなら…" belongs to Zen-Nihon Shokai). Ravin has a different value proposition — export, global reach, multi-category (vehicles + machinery + parts), auction access.
- Do not lift its exact 5-step purchase-flow wording. Ravin has a different flow (Define Needs → Evaluate Verified Inventory → Seamless Global Fulfillment is the current 3-step story — you may keep 3 steps or expand to a fuller flow, but write the copy fresh).

**Never do these:**
- Do not add third-party tracking, analytics, or fonts from CDNs the current site does not already use, unless you first ask.
- Do not remove any existing route, page, or listing without asking.
- Do not change the tech stack (framework, package manager, deployment target) without asking.
- Do not delete the license number, phone number, or any legal/identity text under any circumstance.

## 3. Repo audit — CHECKPOINT 1

Before writing any code, do this and report back.

Run this exact sequence and post the results to Nadeesh in a single reply:

1. Read `package.json` — report framework (Next.js? version?), UI library (Tailwind, shadcn, Chakra, plain CSS?), and every dependency related to styling, i18n, and image handling.
2. Read `next.config.*` (or equivalent) — report i18n config if present, image domains, redirects.
3. Map the routing structure — for App Router, list every folder under `app/`; for Pages Router, list every file under `pages/`. Note actual URL paths (some may differ from the nav labels — see §4 below).
4. Identify the styling approach — Tailwind config path if present, CSS modules, global CSS location, any theme file.
5. Identify how the current site handles Japanese vs English — is there a real i18n setup (`next-intl`, `next-i18next`), a language toggle, or is content hard-coded?
6. Identify how (if at all) dark mode is currently implemented (`class="dark"` strategy? `prefers-color-scheme` media queries? none?).
7. List every top-level component in `components/` (or equivalent) with a one-line description of what each does.
8. Confirm the live URLs of every route below still map to the same files in the repo:
   - Home: `/`
   - Inventory: `/inventory`
   - Auctions: `/yahoo-auctions` (nav label reads "Auctions")
   - Gallery: `/media` (nav label reads "Gallery")
   - About Us: `/about`
   - Contact: `/contact`

**STOP after step 8. Post the report. Do not proceed until Nadeesh replies "go" (or gives corrections). This is checkpoint 1.**

## 4. Bugs to fix (independently verify each in the running app)

These were found via a text-mode audit of the live site. Some may be false positives once you see the code. **For each bug: reproduce in the running app first, then fix.** If a bug turns out not to exist, note that in your reply and move on.

**Global (appears on multiple pages):**

1. **Instagram social link is `href="#"` everywhere it appears.** Every page shows an Instagram social item that goes nowhere. Ask Nadeesh for the real Instagram URL. If he doesn't have one, remove the Instagram link entirely rather than leaving a dead anchor.

2. **No dark mode.** The site is light-only. The new theme must respect `prefers-color-scheme` (see §5).

3. **Missing/insufficient alt text on many `<img>` elements.** Every image needs a meaningful `alt` (or `alt=""` if purely decorative). Listings/auction images should describe the vehicle. Trailing spaces in existing alt text (e.g. `alt="Tesla Model X Plaid "`) must be trimmed.

4. **Nav label ↔ URL mismatch.** Nav says "Auctions" but URL is `/yahoo-auctions`; nav says "Gallery" but URL is `/media`. Not necessarily a bug, but a discoverability/SEO concern. Discuss with Nadeesh whether to add redirects from `/auctions` → `/yahoo-auctions` and `/gallery` → `/media`, or rename the routes. Do not act unilaterally.

**Home page:**

5. **Awkward bilingual insertion in English H2s.** Current headings read `How ラビンインターナショナル株式会社 Secures Your Export Process` and `Latest Export-Ready Vehicles & Machinery by ラビンインターナショナル株式会社`. In the JP-primary redesign, these become Japanese headings with an English subhead (see §6 home-page spec). The mid-sentence brand-name insertion goes away.

6. **Only one inventory item featured on the home page (Tesla Model X Plaid).** Home should feature the top N most recent listings — pull from whatever data source the Inventory page uses. If there are only a handful of listings in the data, show them all; do not fabricate additional listings. If there is a single listing, present it in a way that does not look empty (e.g. a single "featured" hero-style card, not a lonely tile in a grid).

**Inventory page:**

7. **Filter dropdowns show only options that match the data.** "All Makes" is misleading when the only option is Tesla. Either derive filter options dynamically from the actual dataset (correct), or hide filters when there is only one option. Do the former.

8. **Year Range and Price Range filters render but have no visible min/max inputs.** Fix.

9. **No pagination present** even though the layout implies more than one page could exist. Add pagination if there are more items than the page size, or omit if not.

10. **Listing card actions ("View Specs") — target/behavior is unclear.** Should link to a detail route (`/inventory/[stockId]`) if one exists, or expand inline. Coordinate with what exists in the repo.

**Auctions (`/yahoo-auctions`):**

11. **Missing alt text on auction images** (see global bug 3).

12. **Dates "Valid until 27 Aug 2026" are shown for auctions that may already have ended** — audit date logic. If any auction is past its expiry, hide it or mark it "Ended".

**Gallery (`/media`):**

13. **Filter buttons ("All", "Classic Vehicles", "Special Auctions", "Vehicle Inspections", "Specialized Units") do nothing.** Either implement filtering (each item needs a category tag) or remove the buttons. Do not leave dead UI. Ask Nadeesh which — filtering is the better answer if the data supports it.

14. **One video entry "Toyota Carina TA45 1600GT 2TG DOHC 5MT Walkaround" has no embed** — missing YouTube URL. Ask Nadeesh for the URL or remove the entry.

15. **Generic photo captions** ("location photo 1"). If richer captions exist in the source data, use them; otherwise, at minimum group photos into logical sections (inspection, loading, dealership, etc.) with proper section headings.

16. **No lightbox/modal.** Clicking a gallery photo should open it full-size in a modal with keyboard nav (←/→/Esc). Implement or explicitly decide not to.

**About:**

17. **Duplicate license information** — the same license number and business details appear in two adjacent sections. Consolidate.

18. **Google Maps link exists but no embedded map.** Embed the map via Google Maps iframe (Kanagawa office coordinates).

19. **No team, mission, or company history content** — but do not fabricate any. If Nadeesh has this content he'll provide it; leave the page as-is on those axes unless asked.

**Contact:**

20. **Form fields use placeholders as labels** (accessibility fail). Every input needs a real `<label>` — visible or `sr-only` — bound via `htmlFor`/`id`. Placeholders should be examples, not labels.

21. **No required-field indicators.** Mark required fields visibly (`*` or "required") and set the `required` attribute.

22. **No submit-state feedback.** After submission, show a success or error state. If there is no backend hooked up, coordinate with Nadeesh on whether to add Formspree, Resend, an API route, or leave a placeholder handler.

23. **Phone number formatting inconsistency across the site** — pick one format for each number and use it everywhere. Suggested: `080-4387-3344` (mobile), `046-210-4308` (office), `+81-80-4387-3344` (WhatsApp, international-only).

## 5. Theme system — light + dark via `prefers-color-scheme` only

**Rule:** the site's color scheme is determined solely by `@media (prefers-color-scheme: dark)`. There is no manual toggle. There is no `class="dark"` toggle. If the OS/browser says dark, the site is dark. Otherwise light.

**Implementation approach:**

Define all colors as CSS custom properties in `:root`, and redefine them under `@media (prefers-color-scheme: dark)`. Every component reads from tokens; no component hard-codes a color. If Tailwind is in use, wire the tokens through Tailwind's theme (`extend.colors` referencing `var(--...)`) so utility classes automatically re-theme.

**Head tag requirements:**
- `<meta name="color-scheme" content="light dark">` — tells the browser both schemes exist so form controls, scrollbars, etc. re-theme.
- `<meta name="theme-color" media="(prefers-color-scheme: light)" content="..."/>` and the dark counterpart for the mobile browser chrome.

**Aesthetic target:** neutral corporate minimal — warm off-white and near-black in light mode; deep neutral (not pure black) in dark mode; a single restrained accent color for CTAs and interactive hover states; generous whitespace; subtle borders and shadows rather than heavy chrome.

**Design tokens — CHECKPOINT 2**

Before styling anything, propose the concrete design tokens as a table Nadeesh can eyeball. Include, for both light and dark:

| Token | Purpose | Light | Dark |
| --- | --- | --- | --- |
| `--bg` | page background | | |
| `--bg-elevated` | card/section background | | |
| `--bg-muted` | subtle section background | | |
| `--fg` | primary text | | |
| `--fg-muted` | secondary text | | |
| `--fg-subtle` | tertiary/caption text | | |
| `--border` | dividers, card borders | | |
| `--border-strong` | input borders, emphasized dividers | | |
| `--accent` | primary CTA fill, primary link | | |
| `--accent-fg` | text on accent fill | | |
| `--accent-hover` | hover state of accent | | |
| `--focus-ring` | keyboard focus outline | | |
| `--danger` | destructive/error state | | |
| `--success` | success state | | |

**On accent selection:** the reference site leans on a warm-orange or navy-blue accent. Ravin should feel adjacent but distinct — since Ravin operates in international export, I suggest a deep teal (`#0F766E`-family in light, brightened for dark) or a warm terracotta (`#B45309`-family) as candidate accents. Propose 2–3 concrete options with sample color swatches (small colored HTML rectangles inline) and let Nadeesh pick.

Also propose:
- **Type scale**: H1 / H2 / H3 / body / small — px values for desktop and mobile.
- **Font families**: for Japanese, load Noto Sans JP (Google Fonts) with system-JP fallback; for Latin, either Inter or a similarly neutral geometric sans. Weights 400/500/700. Give the exact `font-family` stack.
- **Spacing scale**: section vertical padding (desktop / mobile), container max-width, grid gutters, card gap.
- **Radius scale**: `--radius-sm`, `--radius-md`, `--radius-lg`.
- **Shadow scale**: subtle only — `--shadow-sm` for cards, `--shadow-md` for elevated states.

**STOP after posting the token table. Wait for Nadeesh's approval or edits. This is checkpoint 2. Do not touch any component styling until he says "go".**

## 6. Home page redesign — inspired-by, not clone-of

Once tokens are locked, rebuild the home page around this rhythm. **Copy strings below are directional guidance, not the final copy.** Write final copy in Japanese first, then generate the English equivalents for the toggle. Preserve the tone: professional, trustworthy, export-focused.

### Section A — Hero

- Full-width container, ~85vh on desktop, natural height on mobile.
- Left column: Japanese H1 tagline (something like "世界へ、確かな一台を。" or similar — write 2–3 candidate taglines and let Nadeesh pick), one-line English subhead, two CTAs — primary "在庫を見る" → `/inventory`, secondary "お問い合わせ" → `/contact`.
- Right column: a single strong photo of a vehicle-on-ship or a container-loading scene from the existing gallery (do not source new photos from the web; use what exists in `/media`).
- Language toggle sits in the top-right corner of the nav (see §7).
- No decorative badges, no gradients that fight the neutral palette. One quiet horizontal rule under the hero to separate it from the next section.

### Section B — Value / trust strip (new)

- Four value tiles in a row on desktop, 2×2 on tablet, stacked on mobile.
- Each tile: icon (line style, ~24px), short JP heading (3–6 chars), one-line description.
- Suggested four: 「正規ライセンス」 (Licensed dealer #452740019730), 「透明な検査」 (Transparent inspection reports), 「グローバル配送」 (Global shipping fulfillment), 「多カテゴリー対応」 (Vehicles, machinery, trucks, parts).

### Section C — Featured inventory

- Section eyebrow: "最新在庫" ("Latest Stock"), section H2: "輸出可能な最新車両・機械" (or similar).
- 3-column grid on desktop, 2-column tablet, 1-column mobile. If fewer than 3 items exist, render whatever count exists at a comfortable size — do not pad with placeholder cards.
- Card: image top (16:9 or 4:3 — pick one and be consistent), stock ID as small eyebrow, title, category chip, price (FOB), single primary CTA "詳細を見る" (View details).
- Section-level "在庫をすべて見る →" link right-aligned above the grid, linking to `/inventory`.

### Section D — Process / how it works

- Section H2: "ご購入までの流れ" (or similar).
- Three or four steps horizontal on desktop, stacked with connector line on mobile.
- Numbered circle (using `--accent`), step title, one-sentence description.
- Base the steps on Ravin's existing three-step story (Define Needs → Verified Inventory → Global Fulfillment) but rewrite in Japanese-primary. Optionally extend to four steps by splitting fulfillment into "手配" (arrange) and "配送" (deliver).

### Section E — Featured auctions

- Section H2: "ヤフオク出品情報" (Yahoo Auctions Listings).
- 2-column grid on desktop of the current live auctions from `/yahoo-auctions`.
- Card: image, JP title, price (¥), auction ID as small caption, valid-until date, "オークションを見る" CTA linking to the Yahoo listing.
- Section-level "オークションをすべて見る →" link to `/yahoo-auctions`.

### Section F — Gallery preview

- Section H2: "ギャラリー" or "検査・出荷の様子".
- Masonry-ish or 4-column grid of 8 recent photos from `/media`. Click opens a lightbox.
- Section-level "ギャラリーをすべて見る →" link.

### Section G — Contact CTA band

- Full-width band, muted background (`--bg-muted`).
- Centered H2 "お気軽にご相談ください" (or similar), one-sentence supporting copy.
- Row of contact affordances: TEL: 080-4387-3344 (tel: link), WhatsApp: +81-80-4387-3344 (wa.me link), Email: rvinint.jp@gmail.com (mailto:), and a primary CTA button "お問い合わせフォーム" to `/contact`.

### Section H — Footer

- Three columns on desktop (Company / Navigation / Contact), stacked on mobile.
- Company: legal name (JP + EN), address (JP + EN), license number.
- Navigation: Home / Inventory / Auctions / Gallery / About / Contact.
- Contact: phone, WhatsApp, email, social icons (YouTube, Facebook, LINE VOOM — omit Instagram if no real URL is provided).
- Bottom bar: `© 2026 ラビンインターナショナル株式会社`.

**CHECKPOINT 3 — after implementing the home page, deploy locally (`npm run dev` or equivalent), take screenshots at desktop (1440px) and mobile (390px) widths, in both light and dark mode, and post the four images to Nadeesh for approval. Do not proceed to other pages until he says "go".**

## 7. Sitewide theme rollout — remaining pages

Once the home page is approved, apply the same design tokens, header, footer, and component patterns to every other page. Structural changes per page:

**Inventory (`/inventory`)** — Same header/footer. Filter bar sits below page title; filters render dynamically from actual data (no dropdowns with a single option). Grid: 3 columns desktop, 2 tablet, 1 mobile. Pagination if data > page size. Fix listing card actions per bug 10.

**Auctions (`/yahoo-auctions`)** — Same header/footer. Page title: "ヤフオク出品情報". Same auction card style as home Section E. Fix expired-auction handling per bug 12.

**Gallery (`/media`)** — Same header/footer. Two subsections: "写真" (photos) and "動画" (videos). Implement or remove filter buttons per bug 13. Add lightbox per bug 16. Fix missing embed per bug 14.

**About (`/about`)** — Same header/footer. Sections: company overview, license & compliance (consolidated, per bug 17), office & map (embedded per bug 18), contact CTA band. No fabricated team/history.

**Contact (`/contact`)** — Same header/footer. Form with real labels per bug 20, required indicators per bug 21, submit feedback per bug 22. Alongside the form: contact card with phone (both), WhatsApp, email, address, hours, social icons.

**Header (all pages)** — Sticky on scroll. Transparent-over-hero on the home page, opaque background elsewhere. Logo left, nav links center or right, language toggle rightmost. On mobile: hamburger opens a full-height drawer with the same nav + language toggle.

**Language toggle** — small `JP | EN` pill in the header. Persists the choice in `localStorage` and reads it on next visit. If Nadeesh's repo does not already have an i18n framework wired, propose one at checkpoint 1 rather than inventing an ad-hoc mechanism.

**CHECKPOINT 4 — after each remaining page is done, post desktop + mobile screenshots (light + dark) before moving to the next. Do not batch all five and post at the end. One page, one round of screenshots, one approval, then next page.**

## 8. Accessibility & quality bar

Everything below is required, not optional:

- All interactive elements reachable and operable by keyboard.
- Visible focus indicator using `--focus-ring` (never `outline: none` without a replacement).
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text, in both light and dark modes.
- Every image has meaningful `alt` (or `alt=""` if purely decorative).
- Every form input has an associated `<label>`.
- Headings in strict hierarchical order (one `h1` per page, `h2` for sections, `h3` for sub-sections).
- `lang` attribute on `<html>` reflects current language (`ja` or `en`).
- No layout shift from font loading (`font-display: swap`, `size-adjust`).
- Meta description per page.
- Open Graph tags per page (`og:title`, `og:description`, `og:image`).
- No console errors on any page in production build.

Run Lighthouse (or the equivalent) after each page is done. Report the scores in the checkpoint reply. Target ≥ 90 on Accessibility, ≥ 90 on Best Practices, ≥ 90 on SEO. Performance target: ≥ 85 on mobile.

## 9. Commit hygiene

- One feature branch: `redesign/theme-and-home` for checkpoints 1–3, then `redesign/sitewide` for checkpoint 4 pages.
- Commit at each logical unit (tokens, header, hero section, value strip, etc.), not one giant commit.
- Do not commit `node_modules`, `.env`, or any secrets.
- Do not push to production or main. Push feature branch, open a draft PR, and share the preview URL (Vercel will auto-deploy the branch preview).

## 10. Summary of checkpoints

1. **Repo audit report** — stop, wait for "go".
2. **Design token proposal** (table + accent swatches + font/spacing/radius/shadow choices) — stop, wait for "go".
3. **Home page implemented** — post 4 screenshots (desktop light, desktop dark, mobile light, mobile dark), stop, wait for "go".
4. **Each remaining page implemented** (Inventory, Auctions, Gallery, About, Contact) — post 4 screenshots per page, one page at a time, wait for "go" before moving to the next.

If at any point you are uncertain about a design decision, business fact, or content choice — ask Nadeesh in one clear message. Do not assume.
