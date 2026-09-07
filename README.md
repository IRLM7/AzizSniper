# Azizsniper — Photography Portfolio

A two-page, animation-rich photography portfolio site for Azizsniper Studio
(sports, product, and automotive photography based in Abu Dhabi, UAE).

- **`index.html`** — Home page: hero, curated gallery preview, manifesto,
  about, services, and contact.
- **`gallery.html`** — Full 18-image archive with category filters.

Built with plain HTML/CSS/JS + [Tailwind CSS](https://tailwindcss.com/)
(via CDN), [GSAP](https://gsap.com/) + ScrollTrigger for animation, and
[Lenis](https://lenis.darkroom.engineering/) for smooth scrolling on the
home page. No build step, no bundler, no dependencies to install — it's
static files you can open locally or deploy anywhere that serves static
sites, including GitHub Pages.

---

## Folder structure

```
azizsniper/
├── index.html            # Home page
├── gallery.html           # Full gallery / archive page
├── css/
│   ├── style.css           # Shared base styles: variables, nav, mobile
│   │                        # menu, filters, masonry, lightbox, forms
│   ├── home.css            # Home-page-only styles (hero, manifesto,
│   │                        # about, services)
│   ├── gallery.css          # Gallery-page-only styles
│   └── responsive.css      # All @media breakpoints for both pages
├── js/
│   ├── utils.js             # Shared helpers: mobile menu, smooth scroll,
│   │                        # nav scroll state, reveal animations,
│   │                        # masonry grid renderer, lightbox
│   ├── main.js              # Home-page script (hero text animation,
│   │                        # about counters, manifesto scroll effect,
│   │                        # services hover glow, home gallery data)
│   └── gallery.js           # Gallery-page script (full gallery data +
│                              # init)
├── images/
│   ├── README.md            # How to swap in your own photos/logo
│   └── gallery/              # Drop your own gallery images here
└── README.md                # This file
```

`utils.js` must load **before** `main.js` / `gallery.js` on every page —
this is already wired up correctly in both HTML files.

### About the images

The site currently pulls photos from external URLs (Unsplash demo images)
plus a logo and hero shot hosted on Discord's CDN, so it works immediately
without any setup. Discord's link is signed and **will expire** — see
[`images/README.md`](images/README.md) for how to swap everything over to
your own locally hosted photography.

---

## Deploying to GitHub Pages

1. **Create a repository** on GitHub (or use an existing one) — e.g.
   `azizsniper-portfolio`.

2. **Push this project** to that repository:
   ```bash
   cd azizsniper
   git init
   git add .
   git commit -m "Initial commit — restructured portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - On GitHub, go to your repository → **Settings** → **Pages**
     (in the left sidebar under "Code and automation").
   - Under **Build and deployment → Source**, choose **Deploy from a
     branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then **Save**.

4. **Wait a minute or two.** GitHub will build and publish the site. The
   Pages panel will show a URL that looks like:
   ```
   https://<your-username>.github.io/<your-repo>/
   ```
   Refresh the Pages settings page if the URL doesn't appear right away.

5. **Verify it works:** open the URL, confirm the home page loads with
   images and animations, then click into **Gallery** and back to make
   sure both pages and all relative links (`css/`, `js/`, nav links)
   resolve correctly. Because every path in this project is relative
   (`css/style.css`, `js/main.js`, `gallery.html`, etc.), it will work
   whether the site is served from the domain root or from a
   `/<repo-name>/` subpath — no path changes needed either way.

6. **Using a custom domain (optional):** in the same Pages settings
   panel, add your domain under **Custom domain**, then create a `CNAME`
   record with your DNS provider pointing to `<your-username>.github.io`.
   GitHub will add a `CNAME` file to your repo automatically.

Any time you push new commits to `main`, GitHub Pages redeploys
automatically — no extra steps required.

---

## Running locally

Because the pages use `fetch`-adjacent browser APIs (and to keep relative
paths behaving the same as they will in production), it's best to serve
the folder rather than double-click `index.html` directly. From the
project root:

```bash
# Python 3
python3 -m http.server 8000

# or Node (if you have it)
npx serve .
```

Then visit `http://localhost:8000`.

---

## Notes on the restructuring

- All inline `<style>` blocks were extracted into `css/style.css`
  (shared), `css/home.css`, `css/gallery.css`, and `css/responsive.css`.
- All inline `<script>` blocks were extracted into `js/utils.js`,
  `js/main.js`, and `js/gallery.js`. Shared logic (mobile menu, lightbox,
  masonry rendering, reveal animations, smooth scroll) lives in
  `utils.js` so it isn't duplicated between pages.
- Page-specific responsive rules in `responsive.css` are scoped with
  `body.page-home` / `body.page-gallery` classes (already set on each
  page's `<body>` tag) so the two pages' breakpoint rules can't collide
  even though they share one file.
- The contact form's submit handler moved from an inline `onsubmit`
  attribute to a proper event listener in `js/main.js` (`#contactForm`).
EOF
