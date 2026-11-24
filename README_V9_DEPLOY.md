# Harihara Constructions — V9 security release

The supplied V8 logs demonstrate that TypeScript and Vite build were successful; only NPM's dependency audit blocked release. V9 updates the offending dependency graph while retaining the design, branding, custom-domain GitHub Pages configuration, favicon and Google Apps Script backend.

**Security fix**: Vite is pinned to 7.3.8. Zod and the legacy Zod form resolver were removed; form validation is implemented in `src/lib/enquiry-validation.ts` with regression tests in `scripts/test-form-validation.mjs`. No frontend API or backend contract changes.

## Windows deployment (after extracting V9)

```powershell
$source = "C:\Users\MYPC\Desktop\Hari Hara\Harihara_Constructions_GITHUB_V9"
$repo = "C:\Users\MYPC\Desktop\Hari Hara\Deployment Folder\hari_hara"

if (!(Test-Path "$source\package.json")) { throw "V9 source folder missing" }
if (!(Test-Path "$repo\.git")) { throw "Git clone missing" }

# From a clean clone if possible; do not overwrite local work unintentionally.
robocopy "$source" "$repo" /E /R:2 /W:2 /NP /XD .git node_modules dist apps-script /XF ".env" ".env.*" "*.log"
if ($LASTEXITCODE -ge 8) { throw "Robocopy failed" }

Set-Location $repo
npm install
if ($LASTEXITCODE -ne 0) { throw "NPM install failed" }
npm run verify
if ($LASTEXITCODE -ne 0) { throw "TypeScript/build or release verification failed" }
npm audit --omit=dev --audit-level=high
if ($LASTEXITCODE -ne 0) { throw "Production dependency audit still reports high vulnerabilities; inspect with npm audit" }

# Confirm versions and no unwanted Zod dependency
npm ls vite zod @hookform/resolvers

git status
git add -A
git commit -m "V9 - Repair Vite audit and remove vulnerable Zod dependency"
git push origin main
```

`npm ls` may report an empty result for Zod / resolver (that's the intended direct dependency state); audit is the authoritative gate. `npm install` updates your existing `package-lock.json`; commit it so GitHub Actions' `npm ci` produces the same dependency tree.

Do **not** run `npm audit fix --force`; that can migrate to incompatible major versions. No Apps Script redeployment is needed for these changes. Use GitHub Pages settings and Hostinger DNS independently for the custom-domain certificate/HTTPS check.

**Limitations**: The packaged source passes static verification and Node-only regression tests in the authoring environment; external NPM registry access was unavailable, so the final NPM installation, complete TypeScript build and security audit have not been run here.
