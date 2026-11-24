# V3 release changelog

- Remove all Supabase dependencies, schema, migrations, server API, admin dashboard and authentication pages.
- Preserve public layout, pages, imagery and logo.
- Fix invalid PNG-encoded logo asset; create matching favicon, iOS and app icons.
- Convert to static Vite React SPA and GitHub Pages Actions deployment.
- Replace lead capture with WhatsApp submit handoff; no unsupported claims of successful lead storage.
- Static route shells and 404 fallback for direct URL refresh support.
- NPM build remains to be tested on a networked Windows development environment.
