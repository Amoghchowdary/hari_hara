# V4 — GitHub Pages Frontend + Google Apps Script Backend

- Configured exact Git repository `Amoghchowdary/hari_hara` and the supplied Google Apps Script `/exec` endpoint.
- Replaced V3 WhatsApp-only enquiry submission with a server-bound enquiry form; left the existing fields and branding in place.
- Added a matched Google Apps Script server implementation for writing enquiries into a private Google Sheet, with an HTML-iframe postMessage acknowledgement.
- Added success reference display, in-progress state, safe non-confirmation errors, and manual WhatsApp fallback.
- Added server-side field validation, spreadsheet formula escaping, simple anti-spam control, request deduplication and a 60-second per-phone throttle.
- Retained the original Harihara logo, website images, branded favicon, public routes, and static GitHub Actions release process.
- Added Apps Script redeployment instructions and offline backend contract tests.

## Validation boundary

- Local source/config release checks and simulated Apps Script tests: executed.
- Browser build, live Apps Script endpoint compatibility, and actual Google Sheets write: not yet independently verified.
- GitHub repository: currently empty at time of inspection; V4 files are not yet pushed.
