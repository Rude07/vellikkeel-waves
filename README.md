# Vellikkeel Waves — vellikkeelwaves.in

Bilingual (English/Malayalam) website + CMS for Vellikkeel Eco Tourism Private Limited.

- **Framework:** Eleventy (static site — fast, secure, free to host)
- **CMS:** Sveltia CMS at `/admin` (edits content files in this repo; every save auto-deploys)
- **Hosting:** Cloudflare Pages (free plan)
- **Booking:** WhatsApp deep-links — no backend, no cost

## Local development

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # outputs to _site/
```

## Where content lives

| What | File |
|---|---|
| Contact, phones, WhatsApp, SEO, socials | `src/_data/site.json` |
| Homepage (hero, cruises, gallery, reviews, food, plan) | `src/_data/home.json` |
| About page (story, team, values) | `src/_data/about.json` |
| Photos | `static/uploads/` |

All of the above are editable in the browser at **vellikkeelwaves.in/admin** once deployed.

## Deployment (one-time, ~30 min, ₹0)

See the step-by-step guide provided with this project, or in short:

1. Push this folder to a **GitHub repo**.
2. **Cloudflare Pages** → connect repo → build command `npm run build`, output dir `_site`.
3. Add `vellikkeelwaves.in` to Cloudflare (free) → change nameservers at Hostinger.
4. Pages → Custom domains → add `www.vellikkeelwaves.in` and `vellikkeelwaves.in`.
5. CMS login: create a **GitHub OAuth App** + deploy the free **sveltia-cms-auth** Worker,
   then fill in `repo:` and `base_url:` in `admin/config.yml`.
6. Submit `https://www.vellikkeelwaves.in/sitemap.xml` in Google Search Console.

## Notes

- `admin/config.yml` has two `TODO` values (repo name, auth worker URL) — the CMS won't log in until they're set.
- `geoLat`/`geoLng` in Site Settings are approximate — right-click your jetty on Google Maps, copy the exact coordinates, and update them in the CMS (used for the map embed + Google's structured data).
- Replace the grey/blue placeholder images via the CMS as real photos come in. Keep photos under ~400 KB (use WhatsApp-quality JPEGs or squoosh.app).
