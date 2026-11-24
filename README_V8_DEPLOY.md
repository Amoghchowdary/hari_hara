# Harihara V8 — Hostinger + GitHub Pages + Apps Script

## Exact custom domain

`www.hariharafabrictionsandconstructions.in` — from provided browser address screenshot. Verify Hostinger's purchased-domain spelling before pushing.

## DNS at Hostinger

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | amoghchowdary.github.io |

Remove *conflicting* A/CNAME records for @ and www, but retain mail MX/TXT settings. Do not create wildcard A or wildcard CNAME.

## GitHub

- Source repo: https://github.com/Amoghchowdary/hari_hara
- Pages: https://github.com/Amoghchowdary/hari_hara/settings/pages
- Publishing source **GitHub Actions**.
- Custom domain **www.hariharafabrictionsandconstructions.in** (set in Pages UI). V8's `public/CNAME` is informational because GitHub Actions uses the Pages UI's custom domain configuration.
- V8 Vite build `base: '/'` is fixed. Remove any old `SITE_BASE_PATH=/hari_hara/` repository variable for clarity (V8 ignores it).
- HTTPS: wait for DNS check + certificate provisioning, then **Enforce HTTPS**.

## Google Apps Script

Existing live endpoint is kept. V8's `apps-script/Code.gs` adds two exact allowed origins:

- https://www.hariharafabrictionsandconstructions.in
- https://hariharafabrictionsandconstructions.in

Copy/merge whitelist into the actual Apps Script project; Deploy → Manage deployments → Edit → New version → Deploy. **Use the existing deployment**, or `/exec` URL will differ. Verify a test enquiry produces a receipt and Google Sheets row. No live call is completed as part of this package.

## Local checks

```powershell
npm install
npm run backend:check
npm run verify
npm run preview
```

Visit http://127.0.0.1:4173 locally. V8's production build always uses domain-root URLs.

## Copy to existing clone (no .git deletion)

```powershell
$src = 'C:\Users\MYPC\Desktop\Hari Hara\Harihara_Constructions_GITHUB_V8'
$dst = 'C:\Users\MYPC\Desktop\Hari Hara\Deployment Folder\hari_hara'
robocopy $src $dst /E /R:2 /W:2 /XD .git node_modules dist apps-script /XF '.env' '.env.*' '*.log'
if ($LASTEXITCODE -ge 8) { throw 'Robocopy failed' }
Set-Location $dst
npm install
if ($LASTEXITCODE -ne 0) { throw 'NPM install failed' }
npm run verify
if ($LASTEXITCODE -ne 0) { throw 'Verification failed' }
git add -A
git commit -m 'V8 - Fix custom domain assets, favicon and release checks'
git push origin main
```

If `npm run verify` fails, do not push. `npm run backend:check` requires the optional private Apps Script folder and is intentionally not required in the public frontend repository.

## Deployment checks

- Site `https://www.hariharafabrictionsandconstructions.in/` opens without TLS errors after HTTPS provisioning.
- F12 → Network shows CSS + JS 200 responses, without `/hari_hara/` prefixes.
- `https://www.hariharafabrictionsandconstructions.in/favicon.ico` returns an image.
- Navigation, project media, internal links and mobile layout work.
- Test enquiry reaches the new Apps Script Code.gs version and Sheets record appears.

## Production hardening limitations

GitHub Pages cannot set arbitrary HTTP response security headers per route like a conventional web server. Strict CSP/HSTS policy control, private application backends and custom server redirects require an additional service/proxy. This V8 package has no private secrets and deploys only `dist`.
