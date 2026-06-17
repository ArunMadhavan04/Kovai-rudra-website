/* =========================================================
   KOVAI RUDRA — admin.js  (project manager)
   Stores to localStorage key "krbd_projects" — same key main.js reads.
   ========================================================= */
(function () {
  "use strict";

  /* ⚠️ Change this access code. For real security, use Firebase Auth (see admin.html). */
  const ACCESS_CODE = "kovai2026";
  const STORE_KEY = "krbd_projects";
  const SESSION = "krbd_admin_ok";

  const DEFAULTS = [
    { name: "Modern Family Residence", category: "Residential", location: "Saravanampatti, Coimbatore", year: "2025", img: "assets/img/modern-residence.jpg", desc: "A contemporary two-storey home with clean lines, open living and a private balcony — designed for modern family life." },
    { name: "Luxury Multi-Storey Villa", category: "Development", location: "R.S. Puram, Coimbatore", year: "2024", img: "assets/img/luxury-villa.jpg", desc: "A premium multi-level residence featuring layered terraces, wood detailing and a striking rooftop structure." },
    { name: "Commercial Build Project", category: "Commercial", location: "Peelamedu, Coimbatore", year: "2024", img: "assets/img/site-team.jpg", desc: "A multi-storey commercial structure delivered on schedule with rigorous on-site safety and quality control." },
    { name: "Design & Planning Studio", category: "Development", location: "Coimbatore", year: "2025", img: "assets/img/blueprint.jpg", desc: "Detailed architectural planning and engineering — the blueprint stage where every successful project begins." },
  ];

  /* ---- storage helpers (swap these for Firebase, see admin.html) ---- */
  const store = {
    all() {
      try { const v = JSON.parse(localStorage.getItem(STORE_KEY)); return Array.isArray(v) ? v : null; }
      catch (_) { return null; }
    },
    save(list) { localStorage.setItem(STORE_KEY, JSON.stringify(list)); },
    reset() { localStorage.removeItem(STORE_KEY); },
  };

  let projects = store.all() || DEFAULTS.slice();

  /* ---------- gate ---------- */
  const $ = (id) => document.getElementById(id);
  const gate = $("gate"), panel = $("panel");
  const unlock = () => { gate.classList.add("hidden"); panel.classList.remove("hidden"); render(); };

  if (sessionStorage.getItem(SESSION) === "1") unlock();

  $("enter").addEventListener("click", tryEnter);
  $("pass").addEventListener("keydown", (e) => { if (e.key === "Enter") tryEnter(); });
  function tryEnter() {
    if ($("pass").value === ACCESS_CODE) { sessionStorage.setItem(SESSION, "1"); unlock(); }
    else { $("passErr").style.display = "block"; }
  }
  $("logout").addEventListener("click", (e) => { e.preventDefault(); sessionStorage.removeItem(SESSION); location.reload(); });

  /* ---------- toast ---------- */
  let tt;
  const toast = (msg) => {
    const t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200);
  };

  /* ---------- render list ---------- */
  const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function render() {
    $("alist").innerHTML = projects.length
      ? projects.map((p, i) => `
        <div class="arow">
          <img src="${esc(p.img)}" alt="${esc(p.name)}" onerror="this.style.opacity=.3">
          <div class="arow__b">
            <span class="cat">${esc(p.category)} · ${esc(p.year)}</span>
            <h3>${esc(p.name)}</h3>
            <span class="meta">${esc(p.location)}</span>
            <div class="arow__act">
              <button class="mini" data-edit="${i}">Edit</button>
              <button class="mini del" data-del="${i}">Delete</button>
            </div>
          </div>
        </div>`).join("")
      : `<p style="color:var(--ink-60)">No projects yet. Click “Add Project” to create your first one.</p>`;
  }

  /* ---------- editor ---------- */
  const editor = $("editor");
  const fields = { name: "edName", cat: "edCat", loc: "edLoc", year: "edYear", desc: "edDesc", url: "edUrl" };
  let uploadedData = "";

  const setPreview = (src) => {
    const el = $("edPreview");
    if (src) { el.style.backgroundImage = `url('${src}')`; el.textContent = ""; }
    else { el.style.backgroundImage = ""; el.textContent = "Image preview"; }
  };

  function clearEditor() {
    $("edIndex").value = "-1";
    $("edTitle").textContent = "Add a project";
    $("edName").value = ""; $("edCat").value = "Residential"; $("edLoc").value = "";
    $("edYear").value = ""; $("edDesc").value = ""; $("edUrl").value = "";
    $("edFile").value = ""; uploadedData = ""; setPreview("");
  }

  function loadEditor(i) {
    const p = projects[i];
    $("edIndex").value = i;
    $("edTitle").textContent = "Edit project";
    $("edName").value = p.name || ""; $("edCat").value = p.category || "Residential";
    $("edLoc").value = p.location || ""; $("edYear").value = p.year || "";
    $("edDesc").value = p.desc || ""; $("edUrl").value = (p.img || "").startsWith("data:") ? "" : (p.img || "");
    uploadedData = (p.img || "").startsWith("data:") ? p.img : "";
    setPreview(p.img); editor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("edUrl").addEventListener("input", function () { uploadedData = ""; setPreview(this.value.trim()); });
  $("edFile").addEventListener("change", function () {
    const f = this.files[0]; if (!f) return;
    if (f.size > 1.4 * 1024 * 1024) { toast("Image is large — under 1.4 MB works best for local storage."); }
    const r = new FileReader();
    r.onload = () => { uploadedData = r.result; setPreview(uploadedData); };
    r.readAsDataURL(f);
  });

  editor.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("edName").value.trim();
    if (!name) { toast("Please enter a project name."); $("edName").focus(); return; }
    const img = uploadedData || $("edUrl").value.trim() || "assets/img/modern-residence.jpg";
    const data = {
      name,
      category: $("edCat").value,
      location: $("edLoc").value.trim() || "Coimbatore",
      year: $("edYear").value.trim() || String(new Date().getFullYear()),
      desc: $("edDesc").value.trim(),
      img,
    };
    const idx = parseInt($("edIndex").value, 10);
    if (idx >= 0) { projects[idx] = data; toast("Project updated."); }
    else { projects.unshift(data); toast("Project added."); }
    store.save(projects);
    render(); clearEditor();
  });

  $("alist").addEventListener("click", (e) => {
    const ed = e.target.closest("[data-edit]");
    const del = e.target.closest("[data-del]");
    if (ed) loadEditor(+ed.dataset.edit);
    if (del) {
      const i = +del.dataset.del;
      if (confirm(`Delete “${projects[i].name}”?`)) {
        projects.splice(i, 1); store.save(projects); render();
        toast("Project deleted.");
      }
    }
  });

  $("newBtn").addEventListener("click", () => { clearEditor(); editor.scrollIntoView({ behavior: "smooth" }); $("edName").focus(); });
  $("cancelBtn").addEventListener("click", clearEditor);
  $("resetBtn").addEventListener("click", () => {
    if (confirm("Reset the gallery back to the original sample projects?")) {
      store.reset(); projects = DEFAULTS.slice(); store.save(projects); render(); clearEditor();
      toast("Gallery reset to samples.");
    }
  });
})();
