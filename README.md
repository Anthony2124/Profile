# Anthony Cordial — Portfolio

A responsive, interactive personal portfolio with a dark/light theme, filterable projects, accessible project dialogs, a skills explorer, an experience timeline, and a working portfolio terminal. Project descriptions come from the public KasiGuru and MyFit READMEs. Career highlights, contact details, education, and certifications come from the supplied résumé. Project previews are original illustrations, not application screenshots. No runtime dependencies or API keys are needed.

## Run locally

Requires Node.js 20 or newer. In PowerShell:

```powershell
npm.cmd run dev
```

Open **http://127.0.0.1:5173**. The server selects the next available port if 5173 is occupied; check its output. Refresh after editing files.

## Add your photo

Your supplied portrait is already included as **`assets/profile.jpg`**. Replace it with another image using the same filename, then refresh. A portrait around 800 pixels tall works well.

For automatic detection, set `photo: ""` in `profile.js`, then drop a portrait into `D:\Profile` or `D:\Profile\assets`. JPG, JPEG, PNG, WebP, AVIF, and GIF are supported. Filenames starting with `profile`, `portrait`, `headshot`, `photo`, or `anthony` take priority; otherwise a root image is selected before an image in `assets`.

You can select a specific photo in `profile.js` with `photo: "assets/my-photo.jpg"`. Adjust `photoPosition` to change the crop. The abstract artwork remains visible until a valid photo is available.

## Personalize

Edit **`profile.js`** for your name, role, biography, skills, project details, and links.

- Your email, GitHub, and LinkedIn are already connected. Update them in `profile.js` as needed.
- Your résumé is included as `assets/Anthony_Cordial_Resume.pdf`; replace it when you have an updated copy.
- Add public learner/demo URLs to project `liveUrl` fields if available. The KasiGuru admin portal is deliberately not presented as a public demo.
- Project source buttons link to your actual public repositories.
- Update the static title and social metadata in `index.html` if your name or role changes.

Career claims reproduce information supplied in your résumé; project details are based on your GitHub READMEs.

## Publish

```powershell
npm.cmd run build
```

Upload **`dist/`** to a static host such as GitHub Pages, Netlify, or Vercel. Build again after adding a photo or changing your content. If deploying the repository directly, use `npm run build` as the build command and `dist` as the output directory. No server or database is needed in production.

## Checks

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run test:browser
```

The local server only serves site assets; configuration, source tooling, and hidden files are not public. Theme preferences stay in the visitor’s browser. The terminal only recognizes its own commands and never executes code. Motion respects the visitor’s reduced-motion preference.

Browser checks require `npm.cmd install` and Chromium installed with `npx.cmd playwright install chromium`. On this computer, the checks can use the installed Brave browser. Set `PORTFOLIO_BROWSER_PATH` to use another Chromium-based browser. Fonts and all visual assets are self-hosted; their licenses are included in `assets/fonts`.

## Files

| File | Purpose |
| --- | --- |
| `profile.js` | Personal content and project details |
| `index.html` | Page structure and metadata |
| `styles.css` | Responsive design, themes, and animation |
| `app.js` | Project filters, dialogs, skill tabs, terminal, and contact behavior |
| `server.mjs` | Dependency-free local server and automatic photo detection |
| `build.mjs` | Creates a static site and a photo manifest in `dist/` |
