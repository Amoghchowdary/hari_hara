# V7 — GitHub Pages artifact publication race fix

- Splits GitHub Actions into sequential `build` and `deploy` jobs (`needs: build`).
- Uploads the `github-pages` artifact only after successful static release verification and build.
- Uses `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4` as documented by GitHub.
- Keeps Node 22, GitHub repository subpath handling, existing React/CSS/images, branded favicon, and Apps Script endpoint unchanged.
- Root cause: the V6 single-job workflow uploaded an artifact and deployed immediately; GitHub sometimes returned zero artifacts because metadata had not propagated yet (GitHub actions/deploy-pages issue #451).
- No frontend or backend source changes; the existing Apps Script deployment does not need updating.
- New GitHub Actions run needed to verify deployment. Local file lint and YAML parse checks are not a substitute for production deployment verification.
