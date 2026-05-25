# Index Works Portfolio

A typographic one-page portfolio concept inspired by editorial studio indexes, literary homepages, bookshop grids, production-company slates, and compact cultural design systems.

## Edit site content

Most public-facing copy, project records, teaching materials, CV downloads, navigation labels, footer text, and admin interface text live in `content.json` at the project root. Edit that JSON file, keep the same keys, and refresh the site to see the updates.

For adding video or image media to Works project records, see `WORKS_CONFIG.md`.

When you run `npm run build`, `content.json` is copied into the built `dist/` folder next to `index.html` so it can also be edited after deployment.

## Run locally

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```
