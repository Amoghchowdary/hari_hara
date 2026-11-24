# V8 — Custom-domain repair and production checks

- Canonical public domain: `https://www.hariharafabrictionsandconstructions.in/` (spelling copied from supplied browser screenshot).
- GitHub Pages production build is explicitly rooted at `/`, not `/hari_hara/`.
- Kept original logo, website artwork, layout and favicon image bytes unchanged; fixed favicon URL paths and browser cache query.
- Added a first-paint loading fallback so blocked JS cannot present a featureless blank page.
- Added Vite-output validation: all referenced built JS/CSS files must exist; favicon, CNAME, 404 and SEO files verified.
- Added `robots.txt` and a sitemap generated for 15 site paths.
- Kept two-job GitHub Pages deployment workflow and set least-privilege per-job permissions.
- Updated optional Apps Script Code.gs to allow HTTPS requests from the root and www custom domain.
- No backend server secrets are packaged in frontend `dist`.

## External steps — mandatory

1. Set GitHub repo Settings → Pages → Custom domain to `www.hariharafabrictionsandconstructions.in` and publishing source to **GitHub Actions**.
2. Hostinger: `www` CNAME → `amoghchowdary.github.io`; `@` A records → four official GitHub Pages IPv4 addresses.
3. Wait for GitHub to provision a certificate; enable Enforce HTTPS. Source changes cannot fix certificate failure.
4. Update **existing** Apps Script deployment using the included `apps-script/Code.gs` change, keeping the existing `/exec` URL, otherwise enquiries are rejected at origin validation.
5. Validate HTTPS site, favicon, forms, responsive layout and Google Sheets receipt in a real browser.

## Test boundary

Archive integrity, static verification and Apps Script simulation are executable offline. NPM install/typecheck/production build may require online packages, and production DNS/HTTPS must be tested externally.
