const root = document.documentElement;

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  const setOpen = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
  };
  menuBtn.addEventListener("click", () => setOpen(menuBtn.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      menuBtn.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setOpen(false));
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
    if (icon) icon.setAttribute("href", "assets/icons.svg#i-check");
    setTimeout(() => {
      if (label) label.textContent = "Copy email";
      if (icon) icon.setAttribute("href", "assets/icons.svg#i-copy");
    }, 1800);
  });
});

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Reveal on scroll. The head script hides [data-reveal] only when motion is allowed,
// and shows everything again if this import fails.
if (root.classList.contains("motion-ready")) {
  import("https://cdn.jsdelivr.net/npm/motion@11.18.2/+esm")
    .then(({ animate, stagger }) => {
      window.__motionOk = true;
      const ease = [0.22, 1, 0.36, 1];
      const show = (target) => {
        const kids = target.hasAttribute("data-stagger") ? [...target.children] : null;
        if (kids) {
          animate(target, { opacity: 1 }, { duration: 0.01 });
          kids.forEach((k) => (k.style.opacity = "0"));
          animate(
            kids,
            { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0px)"] },
            { duration: 0.55, ease, delay: stagger(0.07) }
          );
        } else {
          animate(
            target,
            { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] },
            { duration: 0.55, ease }
          );
        }
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            show(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    })
    .catch(() => root.classList.remove("motion-ready"));
}
