import { defineConfig } from "astro/config";

// "file" output writes about.html, which GitHub Pages serves at /about (no trailing slash).
export default defineConfig({
  site: "https://fattahwg.github.io",
  trailingSlash: "never",
  build: { format: "file" },
});
