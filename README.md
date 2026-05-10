# Index Works Portfolio

A typographic one-page portfolio concept inspired by editorial studio indexes, literary homepages, bookshop grids, production-company slates, and compact cultural design systems.

## Run locally

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

## Deploy

This project deploys to GitHub Pages through the `Deploy portfolio` GitHub Actions workflow. The workflow runs on pushes to `main`, installs dependencies with `npm ci`, builds with `npm run build`, uploads `dist/`, and publishes it with GitHub Pages.

If your default branch is not `main`, update `.github/workflows/deploy.yml` to match your deployment branch.
