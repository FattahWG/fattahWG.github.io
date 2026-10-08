# fattahWG.github.io

Personal portfolio of Fattah Widjaya Gandhi: SQA Engineer growing into test automation, and Studio Director for
Roblox games at Lawak Studio.

Live site: https://fattahwg.github.io/

## Pages

| URL | Source | Content |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero, the QA → automation → games path, game tiles |
| `/about` | `src/pages/about.astro` | About me, how I work, current focus |
| `/experience` | `src/pages/experience.astro` | SQA role, Studio Director role, demo videos, skills |
| `/projects` | `src/pages/projects.astro` | Roblox games, Lawak Gamehouse, public automation work |
| `/contact` | `src/pages/contact.astro` | Email, TikTok, Roblox, Discord, GitHub, LinkedIn |

## Stack

- [Astro](https://astro.build) 5 static site. Pages build to `about.html` and so on, which GitHub Pages serves at `/about`.
- `src/layouts/Base.astro` holds the head, header, and footer for every page.
- `src/data/site.js` holds the links, games, role lists, skills, and tool links. Edit content there first.
- Dark soft-UI theme in `public/assets/style.css`. Colors are tokens at the top of the file.
- [Motion](https://motion.dev) 11.18.2 for the scroll reveal in `public/assets/main.js`.
  Visitors who ask for reduced motion get no animation, and the demo videos wait for a click.
- Icons: SVG sprite `public/assets/icons.svg` from [Lucide](https://github.com/lucide-icons/lucide) 0.460.0 (ISC)
  and [Simple Icons](https://github.com/simple-icons/simple-icons) 13.21.0 (CC0).

## Demo videos

`public/assets/video/` holds our own recordings, so there is no copyright issue:

- `qa-playwright.*`: a real Playwright 1.55 smoke test of this portfolio in Microsoft Edge (5 steps, all pass),
  captured with the browser screencast and encoded with ffmpeg.
- `roblox-studio.*`: footage from Roblox Studio of a Lawak Gamehouse map.

A video shows on the Experience page only when its `.mp4` file exists.

## Run locally

```
npm install
npm run dev
```

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.
In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.
