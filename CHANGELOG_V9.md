# V9 — Production dependency security repair

## Why
V8 passes TypeScript, build, and dist checks locally but `npm audit --omit=dev --audit-level=high` reported:
- Vite 7.3.2 vulnerabilities (multiple advisories, patched in later 7.3.x releases)
- Zod 3.x high-severity collection validation advisory fixed only in Zod 4.6.6+

## Changes
- Pin Vite to **7.3.8** (patched Vite 7 line; no forced upgrade to Vite 8).
- Remove `zod` and `@hookform/resolvers` from direct dependencies. These were used solely by the enquiry form and `/quote` search validation.
- Replace enquiry Zod schema with direct field-level checks and React Hook Form's custom resolver. Form fields, texts, layout and Apps Script payload are unchanged.
- Replace TanStack `/quote` Zod search schema with a small typed `validateSearch` function.
- Add `npm run test:validation` and include it in release verification.
- Gate GitHub Pages artifact upload on `npm audit --omit=dev --audit-level=high`.
- Keep all logo, favicon, CSS and page content files byte-for-byte unchanged.

## Required release check
Run `npm install` in the existing Git clone so the existing `package-lock.json` is regenerated with the corrected dependency graph. Check in the resulting lockfile with the V9 source files.

The NPM registry was unreachable in this authoring environment; actual dependency install, TypeScript build, audit clearance and browser/Apps Script live tests **require validation locally**. Do not claim production sign-off before these pass.
