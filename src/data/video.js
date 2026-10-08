import fs from "node:fs";
import path from "node:path";

// Build-time check: a demo video shows only when its encoded file is in public/assets/video.
export const hasVideo = (slug) =>
  fs.existsSync(path.join(process.cwd(), "public", "assets", "video", `${slug}.mp4`));
