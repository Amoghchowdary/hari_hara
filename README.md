> **V9 security release:** See [README_V9_DEPLOY.md](README_V9_DEPLOY.md) and [CHANGELOG_V9.md](CHANGELOG_V9.md).

> **V8 CUSTOM DOMAIN:** Before deploying, read [README_V8_DEPLOY.md](README_V8_DEPLOY.md). V8 targets `https://www.hariharafabrictionsandconstructions.in/` with Vite `base: "/"`; the Apps Script origin allowlist must be updated separately.

# Harihara Constructions — V7 (GitHub Pages artifact workflow fix)

**V7 affects deployment automation only.** The website design, fonts, images, favicon and Apps Script endpoint are unchanged.

The old single-job GitHub Actions workflow could fail at `actions/deploy-pages` with `No artifacts named "github-pages" were found`, even after a successful upload, because artifact discovery sometimes races the upload. This workflow uses two jobs: `build` uploads; the dependent `deploy` job publishes. See GitHub issue https://github.com/actions/deploy-pages/issues/451.

## Updating your existing deployment repository

```powershell
$source = "C:\Users\MYPC\Desktop\Hari Hara\Harihara_Constructions_GITHUB_V7"
$repo = "C:\Users\MYPC\Desktop\Hari Hara\Deployment Folder\hari_hara"
if (!(Test-Path "$source\.github\workflows\deploy.yml")) { throw "Missing V7 workflow" }
if (!(Test-Path "$repo\.git")) { throw "Missing existing Git clone" }
cd "$repo"
git pull --ff-only origin main
robocopy "$source" "$repo" /E /R:2 /W:2 /NP /XD node_modules dist .git apps-script /XF ".env" ".env.*" "*.log"
if ($LASTEXITCODE -ge 8) { throw "Robocopy failed" }
git add -A
git commit -m "V7 - Separate Pages build and deploy jobs"
git push origin main
```

If the V7 workflow has already been updated directly in GitHub, **run `git pull --ff-only origin main`** in your existing clone rather than committing the same change twice.

GitHub repository: https://github.com/Amoghchowdary/hari_hara
Expected GitHub Pages URL: https://amoghchowdary.github.io/hari_hara/

The private Google Apps Script backend does not belong in public Git and should remain deployed separately. Test a real enquiry submission after the website is live. Review the GitHub Actions run and Pages settings to confirm publishing succeeded.

---

# Harihara Constructions — V6 (GitHub Pages frontend + separately deployed Apps Script)

V6 fixes a deploy-blocking mistake in V5: `npm run verify` incorrectly demanded `apps-script/Code.gs` even when that folder was deliberately excluded from the public frontend Git clone. **The website and backend integrations have not been redesigned.**

## Commands in the existing cloned Git repository

Extract V6 to `C:\Users\MYPC\Desktop\Hari Hara\Harihara_Constructions_GITHUB_V6`. Do **not** delete or reclone `Deployment Folder\hari_hara`.

```powershell
$source = "C:\Users\MYPC\Desktop\Hari Hara\Harihara_Constructions_GITHUB_V6"
$repo = "C:\Users\MYPC\Desktop\Hari Hara\Deployment Folder\hari_hara"
if (!(Test-Path "$source\package.json")) { throw "V6 source folder missing" }
if (!(Test-Path "$repo\.git")) { throw "Existing Git clone missing" }
robocopy "$source" "$repo" /E /R:2 /W:2 /NP /XD node_modules dist .git apps-script /XF ".env" ".env.*" "*.log"
if ($LASTEXITCODE -ge 8) { throw "Robocopy failed" }
cd "$repo"
npm install
if ($LASTEXITCODE -ne 0) { throw "NPM installation failed" }
npm run verify
if ($LASTEXITCODE -ne 0) { throw "Frontend verification or build failed; do not push" }
git status
git add -A
git commit -m "V6 - Repair GitHub Pages frontend verification"
if ($LASTEXITCODE -ne 0) { throw "Git commit failed" }
git push -u origin main
```

`npm run verify` checks only the GitHub Pages frontend: static source and asset validation, TypeScript, and production build. It does **not** claim the live Apps Script endpoint works. When `apps-script/Code.gs` is present (in the extracted source package, not necessarily the clone), run `npm run backend:check` there to execute backend simulation tests. `npm run verify:all` combines the frontend and backend checks and requires `apps-script/Code.gs`.

GitHub Actions publishes **only `dist/`**, not the `apps-script/` folder. Even if the backend source is stored in the repository, it does not become part of the hosted website. This clone workflow intentionally omits it from the public repository.

**Production gates:** In the deployed website, verify images/styles/favicon, responsive layout, enquiry success reference, the matching Google Sheets row, and browser console. There were 3 npm audit findings in the Windows V5 install (1 low, 2 high); assess with `npm audit --omit=dev` and `npm audit` and review advisories before production sign-off. Do not run `npm audit fix --force` blindly.

---

## Previous documentation (V5 baseline)

# Harihara Constructions & Fabrication — GitHub Pages + Apps Script V5

This is the standalone public website, separated from Lovable and Supabase. React/Vite/TanStack Router runs locally through NPM and deploys automatically to GitHub Pages; customer enquiries go to an independent Google Apps Script backend which writes to a private Google Sheet.

## Project endpoints

- Git repository: https://github.com/Amoghchowdary/hari_hara
- GitHub Pages URL (after deployment): https://amoghchowdary.github.io/hari_hara/
- Apps Script URL: https://script.google.com/macros/s/AKfycbw9NZ_nPQQSdSCTD26LpQlZhD88gtp15VvR2cy4FelX13vjFwpQRsw3usF2bmONHbTO9A/exec

## Files changed since V3

- `src/lib/backend.ts`: exact provided Apps Script URL, Git URL, enquiry transport and verified receipt handling.
- `src/components/site/InquiryForm.tsx`: validates and POSTs to Apps Script, provides submit progress, a verified success reference, and explicit warning/WhatsApp fallback if no acknowledgement. Reuses the existing form's fields, cards and style.
- `apps-script/Code.gs`: matching Sheets backend for the supplied deployment, including script-owner storage, validation, replay protection, lightweight spam throttling and iframe receipt.
- `apps-script/README.md`: step-by-step backend setup and **redeployment of the existing Apps Script deployment**.
- `scripts/test-apps-script.mjs`: backend simulated contract tests.
- `.github/workflows/deploy.yml`: build/test/deploy static output using GitHub Actions.

**Original Harihara brand logo, favicon and website assets are preserved.** There is no Supabase or Lovable dependency; no admin CRM or authenticated backend. Images are attached via WhatsApp separately rather than stored with enquiries.

## Requirements

Node.js 22+ and NPM 10+.

## Local development

Extract the ZIP to:

`C:\Users\SarkshGroups\OneDrive\Desktop\Hari_Hara\Harihara_Constructions_GITHUB_V5`

Run in PowerShell:

```powershell
cd "C:\Users\SarkshGroups\OneDrive\Desktop\Hari_Hara\Harihara_Constructions_GITHUB_V5"
npm install
npm run dev
```

Site opens at `http://127.0.0.1:3000`.

## Verify before deployment

Stop the development server with `Ctrl+C`, then:

```powershell
npm run verify:release
npm run backend:check
npm run typecheck
npm run build
npm run preview
```

The backend contract check simulates Apps Script but does **not** certify the live deployed Google endpoint. Before launch, follow the steps in `apps-script/README.md`, submit a test from the website, and verify the Google Sheets row.

## Initial GitHub deployment (repository is currently empty)

Open a new PowerShell session and run:

```powershell
$source = "C:\Users\SarkshGroups\OneDrive\Desktop\Hari_Hara\Harihara_Constructions_GITHUB_V5"
$deploy = "C:\Users\SarkshGroups\OneDrive\Desktop\Hari_Hara\Harihara-Git-Deploy"

git clone "https://github.com/Amoghchowdary/hari_hara.git" "$deploy"

Get-ChildItem -LiteralPath $source -Force |
  Where-Object { $_.Name -notin @("node_modules", "dist", ".git") } |
  Copy-Item -Destination $deploy -Recurse -Force

cd "$deploy"
git status
git add -A
git commit -m "V4 - Google Apps Script backend and GitHub Pages frontend"
git push origin main
```

The `apps-script/` folder in the **GitHub source repository** is reference source only. GitHub Pages automatically deploys **only the compiled `dist/` directory**. Apps Script backend code needs to be installed and deployed separately in the Apps Script editor.

Then select **GitHub repository → Settings → Pages → Build and deployment → Source: GitHub Actions**. Go to **Actions** and verify the deployment workflow finishes successfully. If necessary, re-run it after enabling Pages.

Repo base URL `/hari_hara/` is configured automatically by the workflow. Do not use `/` for standard `username.github.io/repo/` hosting. If later switching to a custom domain, set the repository Actions variable `SITE_BASE_PATH` to `/`.

## Security and operational details

The frontend contains no Google credentials or private Sheets ID. The server executes under the Apps Script owner's account; do not share the spreadsheet publicly. The backend is a public submission endpoint, not a general API or admin interface. Lead storage is subject to Apps Script, Sheets and account quotas.

The submission mechanism is a form POST to a hidden iframe, not cross-origin JSON `fetch`: Google Apps Script does not guarantee browser-readable CORS API responses. Server acknowledgement is provided via an explicit `postMessage` receipt from the matching `Code.gs` implementation. If the existing deployment has different code, it must be updated or the frontend won't be able to confirm submissions.

**Testing status:** packaged/static code and offline backend simulations can be checked here, but NPM build and the live Google Apps Script request must pass on your computer before a production-success claim.


## V5 critical npm fix (2026-11-23)

V4 failed during `npm install` because `@tanstack/router-plugin@1.168.21` declares a
peer dependency on `@tanstack/react-router@^1.170.18`, while V4 locked the router at `1.168.21`.
V5 removes the **Vite router plugin only** and retains `@tanstack/react-router` and the
complete checked-in `src/routeTree.gen.ts` which describes all existing public pages.
This avoids the specific observed peer conflict; full npm install/build still needs testing
on a machine with access to the NPM registry.

Existing pages still have their route definitions. When adding or removing page files,
regenerate or update `src/routeTree.gen.ts`; V5 does not automatically watch/create route entries.

For this project, use the already-cloned Git repository under
`C:\Users\MYPC\Desktop\Hari Hara\Deployment Folder\hari_hara`.
Copy this V5 package into it with Robocopy, excluding `.git`, `node_modules`, `dist`,
`apps-script`, `.env`, and `*.log`. Run `npm install`, `npm run verify` and
`npm run build` **before** pushing. Commit `package-lock.json` generated by a successful
npm install, so the GitHub Pages workflow can use `npm ci` consistently.

Do not use `npm install --force` or `--legacy-peer-deps` to bypass dependency conflicts.
