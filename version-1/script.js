/* Munir Al Deraawi — interactions */
(function () {
  "use strict";

  /* ---- year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- nav scrolled state + hide-on-scroll + scroll progress ---- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  var menuEl = document.getElementById("mobileMenu");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (y > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");

    // hide going down, reveal going up (never while the mobile menu is open)
    var menuOpen = menuEl && menuEl.classList.contains("open");
    if (!menuOpen && y > 140 && y > lastY + 6) nav.classList.add("hide");
    else if (y < lastY - 6 || y <= 140) nav.classList.remove("hide");

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (h > 0 ? Math.min(y / h, 1) : 0) + ")";
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- reveal on scroll ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- count-up numbers ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var dur = 1500;
    var final = target.toFixed(decimals) + suffix;
    var done = false;
    function settle() { if (!done) { done = true; el.textContent = final; } }
    var start = null;
    function step(ts) {
      if (done) return;
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else settle();
    }
    requestAnimationFrame(step);
    // Guarantee the final value even if rAF is throttled (e.g. backgrounded tab).
    setTimeout(settle, dur + 500);
  }

  var nums = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  if (reduce || !("IntersectionObserver" in window)) {
    nums.forEach(function (el) {
      var d = parseInt(el.getAttribute("data-decimals") || "0", 10);
      el.textContent = parseFloat(el.getAttribute("data-count")).toFixed(d) + (el.getAttribute("data-suffix") || "");
    });
  } else {
    var numIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          numIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { numIO.observe(el); });
  }

  /* ---- lead form ---- */
  var form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      if (!name.value.trim() || !phone.value.trim()) {
        (name.value.trim() ? phone : name).focus();
        return;
      }
      // Compose a WhatsApp deep-link so the lead reaches Munir instantly.
      var intent = form.querySelector("#intent").value;
      var budget = form.querySelector("#budget").value;
      var msg = form.querySelector("#message").value;
      var text =
        "Hi Munir, I'd like a consultation.%0A" +
        "Name: " + encodeURIComponent(name.value) + "%0A" +
        "Phone: " + encodeURIComponent(phone.value) + "%0A" +
        "Goal: " + encodeURIComponent(intent) + "%0A" +
        "Budget: " + encodeURIComponent(budget) +
        (msg ? "%0ANotes: " + encodeURIComponent(msg) : "");
      var note = document.getElementById("formNote");
      if (note) note.hidden = false;
      // TODO: replace 9715XXXXXXXX with Munir's real WhatsApp number.
      window.open("https://wa.me/9715XXXXXXXX?text=" + text, "_blank", "noopener");
    });
  }

  /* ---- magnetic buttons (fine pointers only) ---- */
  if (!reduce && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".btn--gold, .fab-wa").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (mx * 0.16).toFixed(1) + "px," + (my * 0.3).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
})();
