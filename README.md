# Kovai Rudra Builders & Developers — Website

Premium black & gold construction website. Fully responsive, SEO-ready, with a
self-service admin panel for managing the projects gallery.

## Files
```
index.html              The website (all sections)
admin.html              Project manager (add / edit / delete gallery projects)
assets/css/styles.css   Styles
assets/js/main.js       Site interactions
assets/js/admin.js      Admin logic
assets/img/             Logo (white + black) and the construction photos
```

## How to view / publish
Open `index.html` in a browser to preview. To go live, upload the whole folder
to any static host — Netlify (drag & drop), Vercel, GitHub Pages, Hostinger,
cPanel, etc. Serve it over **http(s)** so the admin panel and live gallery share
the same storage. No build step or server code needed.

## The admin panel (`yoursite.com/admin.html`)
- Access code: **kovai2026** — change it at the top of `assets/js/admin.js`.
- Add a project with name, category, location, year, description and a photo
  (paste an image URL or upload a file). Edit and delete any project.
- Changes save to the browser and appear instantly on the website gallery.
- "Reset to samples" restores the original four projects.

> Storage note: the panel currently saves to the browser it's used in (no setup,
> works immediately). To make edits appear for **every** visitor on every device,
> connect a free Firebase or Supabase database — the exact code and steps are
> printed at the bottom of the admin panel, and the code is already structured
> for the swap.

## Things to update with real details
- **Stats** in the About section (currently qualitative placeholders).
- **Testimonials** — add the real client names in `index.html` (the quotes are
  the three you provided; "Valued Client" is a placeholder name).
- **Project details** — replace the sample locations/years via the admin panel
  with your actual completed projects.
- **Google Map** — the embed is centred on Coimbatore. To pin the exact office,
  open Google Maps → Share → Embed a map → paste the new `src` into the
  `<iframe>` in the Contact section of `index.html`.

## Already wired
- Phone `+91 88837 60606`, email `kovairudra005@gmail.com`, WhatsApp chat,
  floating WhatsApp button + mobile call button.
- Contact form with validation (opens the visitor's email app addressed to you).
- SEO meta tags, Open Graph, and GeneralContractor structured data.
- Sticky transparent navbar, smooth scroll reveals, reduced-motion support.

© 2026 Kovai Rudra Builders & Developers
