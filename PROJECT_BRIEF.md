# Harihara Constructions — V4 Project Brief

## Site
Public showcase for Harihara Constructions & Fabrication: Home, About, Services, Project Gallery, Contact, Request a Quote and individual service pages. Original site design and original Harihara logo/favicons retained.

## Hosting architecture

- Frontend: static Vite React site deployed through GitHub Actions to repository `https://github.com/Amoghchowdary/hari_hara`, expected Pages URL `https://amoghchowdary.github.io/hari_hara/`.
- Backend: existing Google Apps Script deployment at `https://script.google.com/macros/s/AKfycbw9NZ_nPQQSdSCTD26LpQlZhD88gtp15VvR2cy4FelX13vjFwpQRsw3usF2bmONHbTO9A/exec`.
- Storage: private Google Spreadsheet created by `setupSpreadsheet()` in the matching `apps-script/Code.gs` backend.

## Lead workflow

1. Visitor fills the original enquiry form and selects Submit Enquiry.
2. Browser sends URL-encoded POST to the supplied Apps Script URL in a hidden iframe.
3. Matching backend validates fields, de-duplicates requests and appends a lead to a private spreadsheet.
4. Backend sends a correlated acknowledgement to the frontend through postMessage; success is shown only if this arrives.
5. If no receipt is received after 30 seconds, the site displays an uncertainty warning with manual WhatsApp fallback. It does not silently claim the lead was saved.

## Not in V4

No Supabase, Lovable, user accounts, secure CRM/admin panel, Apps Script code auto-deployment, image upload or automatic WhatsApp send. Apps Script must be configured and updated by its owner, as described in `apps-script/README.md`.

## Delivery boundary

Local packaged files are ready; end-to-end deployment and live Google Sheets writes are pending verification.
