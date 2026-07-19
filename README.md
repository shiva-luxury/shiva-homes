# Shiva Homes — homes.shivaluxury.com

Public-facing lead-generation landing page for Shiva Luxury (agent Shiva Nelson, Rise Real Estate Group, DRE #02251909). This is the app every social media link points to — independent from `start.shivaluxury.com` (the internal content/lead-engine tool), with its own webhook configuration.

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
| `NEXT_PUBLIC_SHEETS_WEBHOOK` | **Yes** | Zapier Catch Hook URL → Google Sheets "Lead Tracker". Every lead form (Buy, Sell, Rent, newsletter popup, /newsletter page) POSTs here. |
| `NEXT_PUBLIC_FUB_WEBHOOK` | **Yes** | Zapier Catch Hook URL → Follow Up Boss. POSTs simultaneously with the Sheets webhook on every form submit. |
| `ANTHROPIC_API_KEY` | Optional | Powers the live homepage market-stats bar (median price, DOM, $/sqft) via Claude web search. Without it, the bar shows a static reference snapshot instead of a live daily pull. |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` + `NEXT_PUBLIC_YOUTUBE_CHANNEL_HANDLE` | Optional | Powers the "Watch and Learn" grid of the channel's latest 6 videos. Without it, the section shows a Subscribe-only card. |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` + `NEXT_PUBLIC_GOOGLE_PLACE_ID` | Optional | Pulls live Google reviews for the homepage trust section. Set (Place ID is `ChIJJWA5sSQ0eycREcmeuqzYC7A`). Without a working key, the site falls back to placeholder cards + the real aggregate rating (5.0, 9 reviews) rather than fabricating review text. |

This app does **not** use or share any webhook/API key from `start.shivaluxury.com` — every credential above is independent, even if you reuse the same Zapier Zaps.

### Creating a Google Places API key

The Places API key is separate from the YouTube Data API key — they are different products and a YouTube key will not work here.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and select (or create) the project you use for Shiva Luxury.
2. In the left nav, go to **APIs & Services → Library**, search for **"Places API (New)"**, and click **Enable**.
3. Go to **APIs & Services → Credentials → Create Credentials → API key**.
4. Click the new key, then under **API restrictions** choose **Restrict key** and select **Places API (New)** only.
5. Under **Application restrictions**, choose **Websites** and add `homes.shivaluxury.com/*` to limit where the key can be used.
6. Copy the key into Vercel as `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`.
7. `NEXT_PUBLIC_GOOGLE_PLACE_ID` is `ChIJJWA5sSQ0eycREcmeuqzYC7A` — verified by matching the listing's phone number, name, and CID against `google.com/maps/place/Shiva+Luxury`. Google's Places API only returns up to 5 individual review texts per place regardless of the total review count (a platform-wide limit, not something this app can change) — with the key and Place ID both set, the trust section will show the real 5.0 / 9-review aggregate plus up to 5 real review cards, with the remainder as placeholders.

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

## Google Search Console setup

1. In `app/layout.tsx`, the `metadata.verification.google` field contains a placeholder string `REPLACE_WITH_GSC_VERIFICATION_CODE`.
2. Go to [search.google.com/search-console](https://search.google.com/search-console), add `homes.shivaluxury.com` as a property, and choose the **HTML tag** verification method.
3. Copy just the content value (the string inside `content="..."`) from the tag Google gives you and paste it in place of the placeholder in `app/layout.tsx`.
4. Deploy, then click **Verify** in Search Console.
5. Once verified, go to **Sitemaps** in Search Console and submit `https://homes.shivaluxury.com/sitemap.xml` (auto-generated by `app/sitemap.ts`, includes all static pages, blog posts, and neighborhood guides).

## Structure

- `app/page.tsx` — homepage (hero, market stats, listings CTA, neighborhoods, blog, YouTube, reviews, press, about)
- `app/properties`, `app/about`, `app/blog`, `app/blog/[slug]`, `app/neighborhoods/[slug]`, `app/newsletter` — subpages
- `app/api/market-stats` — live market data endpoint (Claude + web search)
- `lib/blog.ts` — 10 launch blog posts (edit/add posts here)
- `lib/neighborhoods.ts` — 8 neighborhood guides (stats, schools, recent sales)
- `lib/images.ts` — curated real Unsplash photography (with attribution) plus the agent portrait photo URL
- `lib/webhook.ts` — dual-webhook lead submission used by every form
- `lib/reviews.ts` — verified Google aggregate rating + placeholder review cards, with optional live Places API pull

## Known placeholders to replace before/soon after launch

- With `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` + `NEXT_PUBLIC_GOOGLE_PLACE_ID` (`ChIJJWA5sSQ0eycREcmeuqzYC7A`) set, up to 5 real review cards show live; the remaining cards (up to 9 total) fall back to placeholder text since Google's API caps individual review text at 5 per place regardless of total review count.
- Press strip has 1 confirmed placement (Voyage LA) and 5 open/placeholder slots (including Bold Journey, link TBD) — fill in as features run.
- "Current Listings" section links to a contact form rather than showing live inventory — connect an IDX/MLS feed if live listing search is needed later.
