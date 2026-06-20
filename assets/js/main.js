/* =========================================================
   KOVAI RUDRA BUILDERS & DEVELOPERS — main.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- NAVBAR: scroll state + scrollspy ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const toggleMenu = (open) => {
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  };
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => toggleMenu(false))
  );

  /* scrollspy active link */
  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const spy = () => {
    const y = window.scrollY + 140;
    let cur = sections[0]?.id;
    for (const s of sections) if (s.offsetTop <= y) cur = s.id;
    links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + cur));
  };
  spy();
  window.addEventListener("scroll", spy, { passive: true });

  /* ---------- SCROLL REVEAL ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  const observeReveals = () =>
    document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => io.observe(el));

  /* ---------- SERVICES ---------- */
  const ic = (p) =>
    `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const services = [
    { t: "Residential Construction", d: "Custom homes, villas and apartments built with precision, premium materials and a finish you'll be proud to live in.", i: ic('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 21v-6h6v6"/>') },
    { t: "Commercial Construction", d: "Offices, retail and mixed-use developments engineered for performance, durability and lasting value.", i: ic('<path d="M3 21h18"/><path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16"/><path d="M14 9h4a1 1 0 0 1 1 1v11"/><path d="M8 8h2M8 12h2M8 16h2"/>') },
    { t: "Building Development", d: "End-to-end project development — from land assessment and planning to a fully delivered, ready-to-use property.", i: ic('<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>') },
    { t: "Renovation & Remodeling", d: "Breathe new life into existing spaces with thoughtful redesigns, structural upgrades and modern finishes.", i: ic('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6V21h3l6-6a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z"/>') },
    { t: "Interior Solutions", d: "Functional, elegant interiors — bespoke layouts, materials and detailing tailored to how you live and work.", i: ic('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>') },
    { t: "Project Management", d: "Transparent timelines, costing and quality control — one accountable team managing every stage to completion.", i: ic('<path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>') },
  ];
  document.getElementById("services-grid").innerHTML = services
    .map(
      (s, n) => `
      <article class="scard reveal" data-d="${(n % 3) + 1}">
        <span class="scard__no">0${n + 1}</span>
        <div class="scard__ico">${s.i}</div>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
      </article>`
    )
    .join("");

  /* ---------- WHY CHOOSE US ---------- */
  const why = [
    ["Experienced Professionals", "A skilled team of engineers, architects and craftsmen with deep on-ground experience."],
    ["Premium Quality Materials", "We never compromise — only trusted, certified materials go into your project."],
    ["Transparent Pricing", "Clear, itemised estimates with no hidden costs, agreed before we begin."],
    ["Timely Completion", "Realistic schedules we honour, so you move in or open on time."],
    ["Customer-Centric Approach", "Your vision leads. We listen, advise and adapt at every stage."],
    ["Commitment to Excellence", "An obsession with detail that turns every build into a lasting legacy."],
  ];
  document.getElementById("why-grid").innerHTML = why
    .map(
      (w, n) => `
      <article class="wcard reveal" data-d="${(n % 3) + 1}">
        <div class="wcard__n">0${n + 1}</div>
        <h3>${w[0]}</h3>
        <p>${w[1]}</p>
      </article>`
    )
    .join("");

  /* ---------- PROJECTS (admin-aware) ---------- */
  const DEFAULT_PROJECTS = [
    { name: "Modern Family Residence", category: "Residential", location: "Coimbatore", year: "Concept", img: "assets/img/modern-residence.jpg", desc: "A contemporary two-storey home with clean lines, open living and a private balcony — designed for modern family life." },
    { name: "Luxury Multi-Storey Villa", category: "Development", location: "Coimbatore", year: "Concept", img: "assets/img/luxury-villa.jpg", desc: "A premium multi-level residence featuring layered terraces, wood detailing and a striking rooftop structure." },
    { name: "Commercial Build Project", category: "Commercial", location: "Coimbatore", year: "Concept", img: "assets/img/site-team.jpg", desc: "A multi-storey commercial structure delivered on schedule with rigorous on-site safety and quality control." },
    { name: "Design & Planning Studio", category: "Development", location: "Coimbatore", year: "Concept", img: "assets/img/blueprint.jpg", desc: "Detailed architectural planning and engineering — the blueprint stage where every successful project begins." },
  ];

  const STORE_KEY = "krbd_projects";
  let projects;
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    projects = Array.isArray(saved) && saved.length ? saved : DEFAULT_PROJECTS;
  } catch (_) {
    projects = DEFAULT_PROJECTS;
  }

  const gallery = document.getElementById("gallery");
  let activeFilter = "all";

  const renderGallery = () => {
    const list = projects.filter((p) => activeFilter === "all" || p.category === activeFilter);
    gallery.innerHTML = list.length
      ? list
          .map(
            (p, i) => `
        <article class="pcard" data-i="${projects.indexOf(p)}" tabindex="0" role="button" aria-label="View ${escapeHtml(p.name)}">
          <img src="${escapeAttr(p.img)}" alt="${escapeAttr(p.name)} — ${escapeAttr(p.location)}" loading="lazy">
          <span class="pcard__plus">+</span>
          <div class="pcard__ov">
            <span class="pcard__cat">${escapeHtml(p.category)} · ${escapeHtml(p.year)}</span>
            <h3>${escapeHtml(p.name)}</h3>
            <span class="pcard__meta">${escapeHtml(p.location)}</span>
          </div>
        </article>`
          )
          .join("")
      : `<p class="lead">No projects in this category yet.</p>`;
    observeReveals();
  };

  /* filters */
  const filters = document.getElementById("filters");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    filters.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    activeFilter = b.dataset.f;
    renderGallery();
  });

  /* ---------- LIGHTBOX ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCat = document.getElementById("lbCat");
  const lbTitle = document.getElementById("lbTitle");
  const lbMeta = document.getElementById("lbMeta");
  let lbIndex = 0;

  const openLb = (i) => {
    lbIndex = i;
    const p = projects[i];
    if (!p) return;
    lbImg.src = p.img;
    lbImg.alt = p.name;
    lbCat.textContent = `${p.category} · ${p.year}`;
    lbTitle.textContent = p.name;
    lbMeta.textContent = `${p.location}${p.desc ? " — " + p.desc : ""}`;
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  const stepLb = (dir) => {
    let n = lbIndex;
    do { n = (n + dir + projects.length) % projects.length; } while (false);
    openLb(n);
  };

  gallery.addEventListener("click", (e) => {
    const card = e.target.closest(".pcard");
    if (card) openLb(+card.dataset.i);
  });
  gallery.addEventListener("keydown", (e) => {
    const card = e.target.closest(".pcard");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLb(+card.dataset.i); }
  });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", () => stepLb(-1));
  document.getElementById("lbNext").addEventListener("click", () => stepLb(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "ArrowRight") stepLb(1);
  });

  renderGallery();

  /* ---------- TESTIMONIALS SLIDER ---------- */
  const slides = [...document.querySelectorAll(".tslide")];
  const dotsWrap = document.getElementById("tdots");
  let ti = 0, timer;
  dotsWrap.innerHTML = slides.map((_, i) => `<button aria-label="Testimonial ${i + 1}"${i === 0 ? ' class="on"' : ""}></button>`).join("");
  const dots = [...dotsWrap.children];
  const go = (n) => {
    slides[ti].classList.remove("on");
    dots[ti].classList.remove("on");
    ti = (n + slides.length) % slides.length;
    slides[ti].classList.add("on");
    dots[ti].classList.add("on");
  };
  const auto = () => (timer = setInterval(() => go(ti + 1), 5000));
  dots.forEach((d, i) => d.addEventListener("click", () => { clearInterval(timer); go(i); auto(); }));
  auto();

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById("contactForm");
  const ok = document.getElementById("formOk");
  const setErr = (id, bad) =>
    document.getElementById(id).closest(".field").classList.toggle("invalid", bad);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    const eBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const pBad = !/^\d{10}$/.test(phone.replace(/\D/g, "").slice(-10)) || phone.replace(/\D/g, "").length < 10;

    setErr("name", !name);
    setErr("phone", pBad);
    setErr("email", eBad);
    setErr("message", !msg);

    if (!name || pBad || eBad || !msg) {
      form.querySelector(".invalid input, .invalid textarea")?.focus();
      return;
    }

    const subject = encodeURIComponent(`New enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nProject details:\n${msg}`
    );
    ok.classList.add("show");
    window.location.href = `mailto:kovairudra005@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
  ["name", "phone", "email", "message"].forEach((id) =>
    document.getElementById(id).addEventListener("input", function () {
      this.closest(".field").classList.remove("invalid");
      ok.classList.remove("show");
    })
  );

  /* ---------- helpers ---------- */
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function escapeAttr(s) { return escapeHtml(s); }

  /* initial reveal pass */
  observeReveals();
})();
