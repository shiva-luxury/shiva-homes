# Shiva Homes — homes.shivaluxury.com

Public-facing lead-generation landing page for Shiva Nelson, Rise Real Estate Group (DRE #02251909). This is the app every social media link points to — independent from `start.shivaluxury.com` (the internal content/lead-engine tool), with its own webhook configuration.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Playfair Display + Inter · deployed on Vercel.

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SHEETS_WEBHOOK` | **Yes** | Zapier Catch Hook URL → Google Sheets "Lead Tracker". Every lead form (Buy, Sell, Rent, exit popup) POSTs here. |
| `NEXT_PUBLIC_FUB_WEBHOOK` | **Yes** | Zapier Catch Hook URL → Follow Up Boss. POSTs simultaneously with the Sheets webhook on every form submit. |
| `ANTHROPIC_API_KEY` | Optional | Powers the live homepage market-stats bar (median price, DOM, $/sqft) via Claude web search. Without it, the bar shows a static reference snapshot instead of a live daily pull. |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` + `NEXT_PUBLIC_YOUTUBE_CHANNEL_HANDLE` | Optional | Powers the "Watch and Learn" grid of the channel's latest 6 videos. Without it, the section shows a Subscribe-only card. |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` + `NEXT_PUBLIC_GOOGLE_PLACE_ID` | Optional | Pulls live Google reviews for the homepage trust section. Without it, the site shows one manually verified review + the real aggregate rating (5.0, 9 reviews) rather than fabricating the rest. |

This app does **not** use or share any webhook/API key from `start.shivaluxury.com` — every credential above is independent, even if you reuse the same Zapier Zaps.

## Adding environment variables in Vercel

1. Go to your Vercel project → **Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_SHEETS_WEBHOOK` and `NEXT_PUBLIC_FUB_WEBHOOK` (Production + Preview), same as `ANTHROPIC_API_KEY` was added for the lead engine project.
3. Add the optional variables if you have them ready; otherwise the site launches with graceful fallbacks and you can add them later — just click **Redeploy** after adding any new variable, since `NEXT_PUBLIC_*` values are baked in at build time.

## Deploying

Push to `main` on `github.com/shiva-luxury/shiva-homes` — Vercel auto-deploys on push once the project is linked. To link/deploy manually:

```bash
npx vercel --prod
```

## Pointing homes.shivaluxury.com at this deployment (IONOS)

1. In Vercel → your project → **Settings → Domains**, add `homes.shivaluxury.com`.
2. In IONOS → **Domains → shivaluxury.com → DNS**, add a CNAME record:
   - Host: `homes`
   - Points to: `cname.vercel-dns.com`
   - TTL: 3600
3. Wait for DNS propagation (usually a few minutes, up to 24h), then confirm `https://homes.shivaluxury.com` loads and shows a valid SSL certificate (Vercel issues this automatically once DNS resolves).

## Structure

- `app/page.tsx` — homepage (hero, market stats, featured properties, neighborhoods, blog, YouTube, reviews, press, about)
- `app/properties`, `app/about`, `app/blog`, `app/blog/[slug]`, `app/neighborhoods/[slug]` — subpages
- `app/api/market-stats` — live market data endpoint (Claude + web search)
- `lib/blog.ts` — 10 launch blog posts (edit/add posts here)
- `lib/neighborhoods.ts` — 8 neighborhood guides (stats, schools, recent sales)
- `lib/properties.ts` — featured property placeholders (replace with real IDX/MLS data)
- `lib/webhook.ts` — dual-webhook lead submission used by every form
- `lib/reviews.ts` — verified Google review data + optional live Places API pull

## Known placeholders to replace before/soon after launch

- Hero background video/image, all property photos, neighborhood photos, and Shiva's portrait are styled placeholder blocks — swap in real media.
- `lib/properties.ts` contains example listings, not live MLS data — connect an IDX feed or update manually.
- Only 1 of 9 Google reviews is shown without `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` configured (see above) — this is intentional, not a bug; the alternative would be fabricating reviews.
- Press strip has 1 confirmed placement (Voyage LA) and 4 open slots — fill in as features run.
