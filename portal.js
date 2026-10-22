(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // Scroll-bound portal (plays in both directions)
  const hero = document.querySelector(".hero");
  const fold = document.querySelector(".fold");
  let ticking = false;
  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty("--sp", clamp(scrollY / max, 0, 1).toFixed(4));
    if (!reduce) {
      const span = hero.offsetHeight - innerHeight;
      const p = clamp(scrollY / span, 0, 1);
      root.style.setProperty("--p", p.toFixed(4));
      root.style.setProperty("--o", clamp(p / 0.78, 0, 1).toFixed(4));
      const r = fold.getBoundingClientRect();
      const d = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
      root.style.setProperty("--d", (d * 2 - 1).toFixed(4));
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();

  // Entry reveals: fire once, never undo
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js-reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll(".rows, .way-grid").forEach((g) =>
      [...g.children].forEach((el, i) => (el.style.transitionDelay = Math.min(i, 5) * 70 + "ms")));
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  // Mobile menu
  const navEl = document.getElementById("nav");
  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  document.querySelectorAll("#menu a").forEach((a) =>
    a.addEventListener("click", () => {
      navEl.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }));

  // Fit the closing wordmark to the page width
  const big = document.getElementById("big");
  function fit() {
    const s = big.firstElementChild;
    big.style.fontSize = "100px";
    const w = s.getBoundingClientRect().width;
    const fs = (100 * root.clientWidth) / w;
    big.style.fontSize = fs + "px";
    big.style.height = fs * 0.86 + "px";
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
  addEventListener("resize", fit);

  // Throwable deck
  const deck = document.getElementById("deck");
  const cards = [...deck.querySelectorAll(".card")];
  const dots = [...document.querySelectorAll("#dots i")];
  let order = cards.slice();
  let busy = false;

  function stackTransform(i) {
    const k = Math.min(i, 4);
    return `translate(${k * 14}px, ${k * -9}px) scale(${1 - k * 0.04}) rotate(${k % 2 ? k * 1.5 : k * -1.5}deg)`;
  }
  function layout() {
    order.forEach((c, i) => {
      c.style.zIndex = cards.length - i;
      c.style.transform = stackTransform(i);
      c.style.opacity = i > 3 ? 0 : 1;
      c.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    });
    const top = cards.indexOf(order[0]);
    dots.forEach((d, i) => d.classList.toggle("on", i === top));
  }
  layout();

  function throwTop(dir) {
    if (busy) return;
    busy = true;
    const c = order[0];
    const w = deck.getBoundingClientRect().width;
    c.classList.remove("drag");
    c.style.transform = `translate(${dir * w * 1.15}px, -28px) rotate(${dir * 22}deg)`;
    c.style.opacity = 0;
    setTimeout(() => {
      order.push(order.shift());
      c.style.transition = "none";
      layout();
      void c.offsetWidth;
      c.style.transition = "";
      busy = false;
    }, 420);
  }

  let start = null;
  deck.addEventListener("pointerdown", (e) => {
    if (busy) return;
    start = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
    deck.setPointerCapture(e.pointerId);
    order[0].classList.add("drag");
  });
  deck.addEventListener("pointermove", (e) => {
    if (!start || e.pointerId !== start.id) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) > 4) start.moved = true;
    order[0].style.transform = `translate(${dx}px, ${dy * 0.3}px) rotate(${dx / 14}deg) scale(1.02)`;
  });
  function end(e) {
    if (!start || e.pointerId !== start.id) return;
    const dx = e.clientX - start.x;
    const w = deck.getBoundingClientRect().width;
    start = null;
    order[0].classList.remove("drag");
    if (Math.abs(dx) > w * 0.1) throwTop(dx > 0 ? 1 : -1);
    else layout();
  }
  deck.addEventListener("pointerup", end);
  deck.addEventListener("pointercancel", end);
  deck.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); throwTop(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); throwTop(-1); }
  });
})();
