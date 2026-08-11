# 1st Place Express Carwash Website

Marketing site for **1st Place Express Carwash** in Picayune, MS.  
Domain: **[1stplaceexpress.com](https://1stplaceexpress.com)** (already purchased)

## Quick start (local preview)

**Easiest:** double-click `index.html` in this folder (or open it in Chrome/Edge).

Paths are **relative** (`css/styles.css`, `assets/logo.jpeg`) so the site works from a normal file open — not only on a web server.

Hard refresh if an old blank page is cached: `Ctrl + F5`.

```powershell
cd C:\Users\josia\1st-place-express-carwash
# Optional local server (needs Node):
npx --yes serve .
```

## Site map

| File | Page |
|------|------|
| `index.html` | Home |
| `packages.html` | Wash packages |
| `membership.html` | Unlimited Wash Club |
| `locations.html` | Both Picayune locations + maps |
| `contact.html` | Phone, Facebook, contact form UI |
| `SITE-COPY.md` | Full structure & copy document |
| `css/styles.css` | Design system |
| `js/main.js` | Mobile nav + form demo |
| `assets/` | Logo + photos |

## Replace your real logo & photos

Drop files into `assets/` (same filenames to swap instantly):

| File | Purpose |
|------|---------|
| `logo.jpeg` | Brand logo (from IMG_3155) |
| `hero-exterior.jpeg` | Roadside sign / exterior |
| `hero-tunnel.jpeg` | Tunnel action shot |
| `hero-shine.jpeg` | Clean vehicle result |
| `amenity-tunnel.jpeg`, `detail-wheel.jpeg`, `tunnel-front.jpeg` | Extra tunnel photos |

Original camera files (`IMG_*.jpeg`) are kept alongside the semantic names.

## Before go-live

1. ~~Package names~~ ✅ Basic / Deluxe / Supreme / Ultimate
2. ~~Club tiers~~ ✅ $20.99 / $29.99 / $39.99 / $49.99
3. ~~Hours~~ ✅ Mon–Sat 7:30–7 both; Sun 9–5 Hwy 43 only
4. Optional: add single-wash dollar prices when ready
4. Wire the contact form (Formspree, Netlify Forms, Resend, etc.)
5. Point DNS for `1stplaceexpress.com` to your host
6. Optional: also register `1stplaceexpress.com` and redirect

## Deploy

### Vercel
```powershell
cd C:\Users\josia\1st-place-express-carwash
npx --yes vercel
```
`vercel.json` is already included for clean static hosting.

### Netlify
Drag-and-drop the folder, or connect the repo. Publish directory = site root.

### cPanel / traditional host
Upload all files to `public_html` (or the domain’s document root).

## Brand

- Navy / deep blue backgrounds  
- Teal water accents  
- Gold “1st place” highlights  
- Fonts: Outfit (headings) + DM Sans (body)

## Business facts baked in

- Phone: **(601) 798-6331**
- Locations: **1508 Hwy 43 South** & **101 Hayden Oaks Dr**, Picayune, MS 39466
- Facebook: [facebook.com/1stplaceexpress](https://www.facebook.com/1stplaceexpress/)
