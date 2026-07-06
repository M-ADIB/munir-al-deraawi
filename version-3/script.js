/* Munir Al Deraawi — v2 (Halston design language) */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- viewport zoom lock (iOS ignores user-scalable=no) ---------- */
  ["gesturestart", "gesturechange", "gestureend"].forEach((evt) => {
    document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
  });
  document.addEventListener("touchmove", (e) => {
    if (e.scale !== undefined && e.scale !== 1) e.preventDefault();
  }, { passive: false });

  /* ---------- preloader ---------- */
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
    setTimeout(() => document.body.classList.add("is-done"), 2000);
  });
  // Fallback if load never fires (slow external images)
  setTimeout(() => {
    document.body.classList.add("is-loaded");
    setTimeout(() => document.body.classList.add("is-done"), 2000);
  }, 3500);

  /* ---------- fullscreen menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- scroll reveals ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  /* ---------- animated counters ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      countIO.unobserve(el);
      if (prefersReduced) return;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const dur = 1600;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- parallax images + giant hero title ---------- */
  const parallaxImgs = Array.from(document.querySelectorAll(".parallax__img"));
  const heroGiant = document.getElementById("heroGiant");

  const raf = () => {
    const vh = window.innerHeight;
    parallaxImgs.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      img.style.transform = `translateY(${(-progress * r.height * 0.075).toFixed(1)}px)`;
    });
    if (heroGiant) {
      heroGiant.style.transform = `translateX(-50%) translateY(${(window.scrollY * 0.18).toFixed(1)}px)`;
    }
  };
  if (!prefersReduced) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { raf(); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf();
  }

  /* ---------- footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
