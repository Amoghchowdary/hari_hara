# Harihara Constructions — V5 dependency repair

- Fixed npm `ERESOLVE` reported 23 Nov 2026 (`@tanstack/router-plugin@1.168.21` vs `@tanstack/react-router@1.168.21`).
- Removed the conflicting Vite router-plugin dependency and Vite plugin invocation.
- Retained checked-in `src/routeTree.gen.ts`, all seven public route definitions, all source assets, favicon, and the original branding.
- Unchanged Apps Script URL, enquiry form contract, server-side reference implementation, GitHub repository and Pages basepath.
- Strengthened release verifier to reject reintroduction of the plugin.
- Deployment workflow now selects `npm ci` when a package lock is present.
- All existing page routes remain supported; newly created page files require route tree maintenance.

## Test boundary

Static checks and offline backend simulation are included. Full NPM installation/build and
live Google Apps Script submissions require connected client-side/runtime verification.
