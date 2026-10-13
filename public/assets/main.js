const root = document.documentElement;

// Phone menu: the sidebar opens as a drawer over the page.
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.getElementById("sidebar");
const scrim = document.querySelector(".scrim");
if (menuBtn && sidebar) {
  const setOpen = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    sidebar.classList.toggle("open", open);
    if (scrim) scrim.hidden = !open;
  };
  menuBtn.addEventListener("click", () => setOpen(menuBtn.getAttribute("aria-expanded") !== "true"));
  scrim?.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      setOpen(false);
      menuBtn.focus();
    }
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setOpen(false));
}

// Desktop: collapse the sidebar to an icon rail. The head script applies the saved state before paint.
const collapseBtn = document.querySelector(".collapse-btn");
if (collapseBtn) {
  const sync = () => {
    collapseBtn.setAttribute("aria-pressed", String(root.classList.contains("nav-collapsed")));
  };
  sync();
  collapseBtn.addEventListener("click", () => {
    root.classList.toggle("nav-collapsed");
    try {
      localStorage.setItem("sidebar", root.classList.contains("nav-collapsed") ? "collapsed" : "open");
    } catch { /* storage blocked: the choice lasts for this page only */ }
    sync();
  });
}

// Copy email
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const label = btn.querySelector("[data-copy-label]");
  const icon = btn.querySelector("use");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
      return;
    }
    if (label) label.textContent = "Copied";
    if (icon) icon.setAttribute("href", icon.getAttribute("href").replace(/#.*/, "#i-check"));
    setTimeout(() => {
      if (label) label.textContent = "Copy email";
      if (icon) icon.setAttribute("href", icon.getAttribute("href").replace(/#.*/, "#i-copy"));
    }, 1800);
  });
});

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Demo videos: play only while on screen. With reduced motion, stop and show controls instead.
const videos = document.querySelectorAll("video.loop-video");
if (videos.length) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const stopAll = () =>
    videos.forEach((v) => {
      v.pause();
      v.controls = true;
      v.closest(".media-frame")?.querySelector(".media-badge")?.remove();
    });
  if (reduce.matches) {
    stopAll();
  } else {
    const vio = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.play().catch(() => (e.target.controls = true));
          else e.target.pause();
        }),
      { threshold: 0.25 }
    );
    videos.forEach((v) => vio.observe(v));
    reduce.addEventListener("change", (e) => {
      if (e.matches) {
        vio.disconnect();
        stopAll();
      }
    });
  }
}
