# V6 — GitHub Pages release verification fix (2026-11-23)

## Reason for fix
- User's V5 Robocopy copied all 109 frontend files successfully and npm installed 338 packages.
- `npm run verify` failed because `scripts/verify-release.mjs` required `apps-script/Code.gs`, but the prescribed Robocopy explicitly excluded `apps-script`.
- This is a verification-script bug, not a broken NPM installation.

## Changes
- `npm run verify` now checks the frontend release and executes TypeScript and Vite production build; no Google Apps Script source is required in the deployment clone.
- `npm run backend:check` remains a separate offline Apps Script simulation and requires `apps-script/Code.gs` (included in this source ZIP).
- Added `npm run verify:all` for checking both frontend and backend when working from the complete source ZIP.
- `scripts/verify-release.mjs` checks backend source **only if present**, explicitly reports skipped backend source otherwise.
- No changes to website components, stylesheet, logo, favicon, assets, routing, Apps Script URL, or backend Code.gs.

## Security and limits
- User's npm output reported 1 low and 2 high vulnerabilities; versions/advisories are not identified in that log. Run `npm audit` to identify and assess them before calling the release production-ready.
- NPM full install/build and live website–Apps Script submission cannot be reproduced here due to inaccessible npm registry; do not claim those checks passed.
