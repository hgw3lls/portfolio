# DreamHost static deployment package

This portfolio is packaged as a static Vite build for DreamHost shared hosting. Binary deployment artifacts are generated locally and are intentionally not tracked in git.

## Create the ZIP package

Run:

```sh
npm run package:dreamhost
```

This command generates the downloadable PDF files, builds the site into `dist/`, and creates:

```text
tony-yanick-portfolio-dreamhost.zip
```

## Upload to DreamHost

1. In the DreamHost panel, make sure the domain points to a web directory such as `example.com/` or `tonyyanick.com/`.
2. Upload `tony-yanick-portfolio-dreamhost.zip` to that web directory using SFTP, SSH, or the DreamHost file manager.
3. Unzip the package directly inside the web directory.
4. Confirm that `index.html`, `assets/`, and `docs/` are at the top level of the web directory.
5. Visit the domain in a browser.

## Package contents

The ZIP is intentionally rooted at the deployed files, not at a wrapping folder. After unzipping, DreamHost should see:

```text
index.html
assets/
docs/
.htaccess
```

The Vite build uses a relative base path, so the package works from either a domain root or a subdirectory. If the ZIP is deleted, rerun `npm run package:dreamhost` to recreate it from source.
