# Orla Properties — Dubai Real Estate Website

## Versions (the root `/` redirects to the live one)
- **`version-3/` — LIVE. Orla Properties company brand.** Emerald + champagne-gold palette matched to the real Orla logo & IG (@orlaproperties); copy rewritten firm-first, Munir featured as Founder & CEO. Contact = `hello@orlaproperties.com` (real domain, from their IG).
- **`version-2/` — ARCHIVED. Munir Al Deraawi personal brand.** The previous live version, kept intact so it can be restored anytime by pointing the root `index.html` redirect back to `version-2/`.
- **`version-1/` — original first cut.**

**Before publishing v3:** replace the WhatsApp/phone placeholders (`wa.me/9715XXXXXXXX`, `+971 5X XXX XXXX`), swap the illustrative testimonials for verified Property Finder reviews, and confirm `hello@orlaproperties.com` routes. Assets (portrait/listings/logos) are shared across versions in each folder's `assets/`.

---

## Munir Al Deraawi — Luxury Real Estate Bio Website (original brief)

A conversion-focused personal-brand website for **Munir Al Deraawi**, Founder & CEO of
Orla Properties (Dubai luxury real estate). Built on the findings in
[`research/website-research-report-luxury-realestate-agent-dubai.md`](research/website-research-report-luxury-realestate-agent-dubai.md).

Two design directions, both zero-build static sites (plain HTML/CSS/JS, deploy anywhere):

| Version | Folder | Design language |
|---------|--------|-----------------|
| **v1 — Cinematic Gold** | `version-1/` | Playfair Display + Jost, near-black/ivory/gold, full-bleed hero, gold CTAs, logo ticker |
| **v2 — Halston Editorial** | `version-2/` | Inspired by the *Halston* Webflow architecture template: JetBrains Mono everywhere, ivory + ink + bronze, dot labels, giant display type, parallax images, fullscreen expertise panels, dark areas/CTA/footer sections, oversized "Consultation" footer text |

Each version folder contains its own `index.html`, `styles.css`, `script.js` and `assets/`.
v2 is a from-scratch rebuild of the Halston look (no Webflow CSS/JS dependencies) with Munir's
content, plus fresh figures pulled from his Property Finder / Bayut profiles (Jul 2026):
Founder of ORLA PROPERTIES L.L.C, 14 yrs, 4.8★ SuperAgent (9 ratings), 76 active listings,
AED 40.1M trailing-12-month volume, Bayut TruBroker™ / Quality Lister / Responsive Broker,
BRN 41837, and his Instagram positioning line "I don't sell property, I shape the right decision."

## Run locally
```bash
cd munir-deraawi-site
python3 -m http.server 4321
# open http://localhost:4321/version-1/  or  http://localhost:4321/version-2/
```

## Design principles applied (from the research)
1. Quantified hero (big AED number above the fold) — winners lead with a metric, not an adjective.
2. The person is the brand (name, face, story, philosophy).
3. A "Track Record" trophy case of real numbers, not a listings feed.
4. Credibility strip (Consultancy-ME, Property Finder SuperAgent, Bayut TruBroker™, RERA BRN).
5. One repeated CTA = **WhatsApp** (how Dubai buyers transact).
6. Restrained cinematic luxury: black/ivory/gold, serif + sans, full-bleed imagery.
7. Market-intelligence section that positions him as an advisor and feeds SEO.

---

## ⚠️ BEFORE PUBLISHING — replace these placeholders

Everything below is a placeholder or a figure sourced from public profiles. Confirm with Munir and swap in real assets. Applies to **both versions** (v2 uses the same assets, WhatsApp placeholder `9715XXXXXXXX`, guessed email, and Unsplash hero/panel imagery).

| What | Where | Current placeholder |
|------|-------|---------------------|
| **WhatsApp number** | `index.html` + `script.js` — search `9715XXXXXXXX` | `https://wa.me/9715XXXXXXXX` (4 places) |
| **Phone** | `index.html` contact section | `+971 5X XXX XXXX` |
| **Email** | `index.html` contact section | `munir@orlaproperties.ae` (guessed) |
| **Portrait photo** | `.portrait` (about) → `assets/article_1.jpg` | His **real portrait** — the bearded studio shot from his Consultancy-ME article (900×514, confirmed by client as current). `assets/headshot_li.jpg` (LinkedIn, grey suit) is kept as an alternate. Swap in a high-res original before launch. |
| **Ticker logos** | `.ticker` (after hero) → `assets/logos/*` | Real, moving logo ticker: Property Finder, Bayut, Dubai Land Department, Consultancy-ME, Orla Properties. Logos are greyscaled on ivory chips for a consistent press-bar look. Some are low-res (Orla 260px) — replace with vector/hi-res if available. |
| **Hero background** | `.hero__media` in `styles.css` | Unsplash Dubai skyline (stock). Replace with a real photo/video of Munir or his listings for maximum impact. |
| **Listing photos & data** | Portfolio cards → `assets/listing_*.webp` | Now his **4 real Property Finder listings** (Forte/Downtown, Hado/Dubai Islands, Eden House/Al Wasl, Marriott/Dubai Science Park) with real prices + specs. Source images are only 416px wide — swap in full-resolution originals before launch. |
| **Instagram** | — | IG **could not be scraped** — Instagram blocks scrapers and its image URLs are signed/expiring. To use his IG content, export the originals from the app and drop them into `assets/`. |
| **Testimonials** | `.quotes` section (marked `REPLACE` in HTML) | 3 illustrative quotes with generic attributions. Replace with his real Property Finder / Google reviews (with permission). |
| **Domain / canonical** | `index.html` structured data + og:url | `https://munirderaawi.com` (assumed) |
| **Insights links** | Insights cards | "Playbook" and "Guide" cards point to `#contact` as lead magnets — wire to real gated content/PDF when available. The "Featured · Consultancy-ME" card links to his real published article. |

### Figures used (verify before publishing)
- **AED 81M** closed in a single Nad Al Sheba Gardens launch — *from his Instagram post*.
- **AED 39.9M** trailing-12-month deal value, **77** active listings, **21** closed deals, **4.8★ (9 ratings)** — *from his Property Finder profile as of 1 Jul 2026*.
- **14+ years** (since 2012), **RERA BRN 41837**, languages **EN/AR/FR**, areas of expertise — *from Property Finder / Bayut*.
- Career-wide totals (e.g. lifetime sales volume) were intentionally **not** invented. Add his real career figure to the hero for maximum impact — that is the single highest-leverage addition (see research principle #1).

## Lead form behaviour
The contact form does not post to a server. On submit it opens a pre-filled **WhatsApp** message to Munir
(name, phone, goal, budget, notes). To capture leads in a CRM instead, point the form `submit` handler in
`script.js` at your endpoint (e.g. Formspree, a serverless function, or your CRM's web-to-lead URL).

## Deploy
Any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, or S3. Just upload the folder.
