# fattahWG.github.io

Personal portfolio of Fattah Widjaya Gandhi: SQA Engineer growing into test automation, and Studio Director for
Roblox games at Lawak Studio.

Live site: https://fattahwg.github.io/

## Pages

| Page | Content |
| --- | --- |
| `index.html` | Hero, the QA → automation → games path, game tiles |
| `about.html` | About me, how I work, current focus |
| `experience.html` | SQA Engineer role, Studio Director role, skills |
| `projects.html` | Roblox games, Lawak Gamehouse community, public automation work |
| `contact.html` | Email, TikTok, Roblox, Discord, GitHub, LinkedIn |
| `404.html` | Not-found page for GitHub Pages |

## Stack

- Plain HTML and CSS, no build step. GitHub Pages serves the files from the `main` branch.
- Dark soft-UI (neumorphism) theme in `assets/style.css`. Colors are tokens at the top of the file.
- [Motion](https://motion.dev) 11.18.2 from jsDelivr for the scroll reveal in `assets/main.js`.
  The page shows all content without animation if the visitor asks for reduced motion or the script cannot load.
- Icons: an SVG sprite in `assets/icons.svg`, built from [Lucide](https://github.com/lucide-icons/lucide) 0.460.0 (ISC)
  and [Simple Icons](https://github.com/simple-icons/simple-icons) 13.21.0 (CC0).
- Fonts: Plus Jakarta Sans and JetBrains Mono from Google Fonts.

## Update the content

- Text lives directly in each HTML page. The header and footer are the same on every page, so change all six pages together.
- Game images are in `assets/img/`. They are local copies, because Roblox image links expire.

## Preview on your computer

Icons load from an external sprite, which browsers block on `file://`. Use a local server:

```
python -m http.server 8000
```

Then open http://localhost:8000.
