/* KSIJ Mumbai — shared header, footer and small behaviours */
(function () {
  const I = {
    heart: '<path d="M12 21s-7-4.4-9.3-9A5.3 5.3 0 0 1 12 6.4 5.3 5.3 0 0 1 21.3 12C19 16.6 12 21 12 21z"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    hands: '<path d="M12 21c-4-2.5-7-5.2-7-9V6l7 3 7-3v6c0 3.800-3 6.500-7 9z"/><path d="M9.500 12l2 2 3.500-4"/>',
    hall: '<path d="M3 21h18M5 21V10l7-6 7 6v11"/><path d="M10 21v-6h4v6"/>',
    medical: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M12 10.500v6M9 13.500h6"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500M22 9v6"/>',
    family: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.200"/><path d="M3 20c0-3.500 2.500-6 6-6s6 2.500 6 6M15 14.500c3 0 6 1.500 6 5"/>',
    users: '<circle cx="9" cy="8" r="3.200"/><path d="M3 20c0-3.600 2.600-6 6-6s6 2.400 6 6"/><path d="M16 5.500a3 3 0 0 1 0 5.500M18 14c2 .8 3 2.800 3 6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12M3.500 6l1 1 2-2M3.500 12l1 1 2-2M3.500 18l1 1 2-2"/>',
    home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
    news: '<path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.500"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>'
  };
  const svg = (n, extra) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra || ""}>${I[n]}</svg>`;
  window.KSIJ = { icon: svg };

  const page = document.body.dataset.page || "";
  const link = (href, text, key) =>
    `<a href="${href}"${key === page ? ' aria-current="page"' : ""}>${text}</a>`;

  const header = `
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap bar">
      <a class="brand" href="index.html" aria-label="KSIJ Mumbai, home">
        <img src="assets/logo-ksij.jpg" alt="" width="56" height="56">
        <span><b>KSIJ Mumbai</b><small>Khoja Shia Isna Ashari Jamat</small></span>
      </a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu">${svg("menu")}</button>
      <nav class="nav" id="nav" aria-label="Main">
        <ul>
          <li>${link("index.html", "Home", "home")}</li>
          <li class="dd">
            <button class="dd-btn${["membership"].includes(page) ? " current" : ""}" aria-expanded="false" aria-haspopup="true">About us ${svg("chev")}</button>
            <ul class="dd-menu">
              <li><a href="index.html#history">History</a></li>
              <li><a href="index.html#roster">Office bearers</a></li>
              <li><a href="index.html#roster">Committees</a></li>
              <li>${link("membership.html", "Lifetime membership", "membership")}</li>
            </ul>
          </li>
          <li>${link("projects.html", "Projects", "projects")}</li>
          <li>${link("bookings.html", "Bookings", "bookings")}</li>
          <li>${link("gallery.html", "Gallery", "gallery")}</li>
          <li>${link("contact.html", "Contact us", "contact")}</li>
        </ul>
        <a class="btn btn-brass" href="donate.html"${page === "donate" ? ' aria-current="page"' : ""}>${svg("heart")} Make a donation</a>
      </nav>
    </div>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="foot-brand"><img src="assets/logo-ksij.jpg" alt="" width="64" height="64"><b>KSIJ Mumbai</b></div>
          <p>Khoja Shia Isna Ashari Jamat, Mumbai. Serving the community through medical aid, education and support for families.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html#history">History</a></li>
            <li><a href="index.html#updates">News and updates</a></li>
            <li><a href="index.html#roster">Office bearers</a></li>
            <li><a href="index.html#roster">Committees</a></li>
            <li><a href="gallery.html">Gallery</a></li>
          </ul>
        </div>
        <div>
          <h4>Give and join</h4>
          <ul>
            <li><a href="donate.html">Make a donation</a></li>
            <li><a href="membership.html">Lifetime membership</a></li>
            <li><a href="qaumi-sahayak.html">Qaumi Sahayak</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="bookings.html">Bookings</a></li>
          </ul>
        </div>
        <div>
          <h4>Visit or write</h4>
          <p>66/70, Hazrat Abbas (a.s.) Street,<br>Dongri, Mumbai 400 009</p>
          <p><a href="mailto:info@ksijamat.org">info@ksijamat.org</a></p>
        </div>
      </div>
      <div class="foot-bottom"><span>&copy; <span id="yr"></span> Khoja Shia Isna Ashari Jamat, Mumbai</span><span>Donations may qualify for tax benefits under Section 80G.</span></div>
    </div>
  </footer>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);
  document.getElementById("yr").textContent = new Date().getFullYear();

  // Icons placed by data-icon
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.insertAdjacentHTML("afterbegin", svg(el.dataset.icon));
  });

  // Toast
  let tt;
  window.KSIJ.toast = (msg) => {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("show"), 5200);
  };

  // Mobile menu
  const tog = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");
  tog.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    tog.setAttribute("aria-expanded", open);
    tog.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    tog.innerHTML = svg(open ? "close" : "menu");
  });

  // Dropdowns (click, hover on desktop, Esc to close)
  const dds = [...document.querySelectorAll(".dd")];
  const setDD = (dd, open) => {
    dd.classList.toggle("open", open);
    dd.querySelector(".dd-btn").setAttribute("aria-expanded", open);
  };
  dds.forEach((dd) => {
    dd.querySelector(".dd-btn").addEventListener("click", () => setDD(dd, !dd.classList.contains("open")));
    dd.addEventListener("mouseenter", () => matchMedia("(min-width:1081px)").matches && setDD(dd, true));
    dd.addEventListener("mouseleave", () => matchMedia("(min-width:1081px)").matches && setDD(dd, false));
  });
  document.addEventListener("click", (e) => dds.forEach((dd) => !dd.contains(e.target) && setDD(dd, false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && dds.forEach((dd) => setDD(dd, false)));

  // Tabs (donate page)
  const tabs = [...document.querySelectorAll(".tab")];
  if (tabs.length) {
    const show = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => show(t));
      t.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!d) return;
        const n = tabs[(i + d + tabs.length) % tabs.length];
        n.focus();
        show(n);
      });
    });
  }

  // Copy buttons
  document.querySelectorAll(".copy").forEach((b) =>
    b.addEventListener("click", async () => {
      const v = b.dataset.copy;
      try { await navigator.clipboard.writeText(v); } catch (_) {}
      window.KSIJ.toast("Copied " + v);
    })
  );

  // Forms (front-end only: validate, then confirm)
  document.querySelectorAll("form[data-confirm]").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      window.KSIJ.toast(f.dataset.confirm);
    })
  );
})();
