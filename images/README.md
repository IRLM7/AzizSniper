# /images

This project currently loads all photos from external URLs (Unsplash demo
photos, plus a logo and hero image hosted on Discord's CDN) so the site
works immediately, right out of the box.

**To use your own photography instead:**

1. Drop your files in here. Suggested layout:
   ```
   images/
     logo.png
     hero-main.jpg
     about-portrait.jpg
     gallery/
       sports-01.jpg
       sports-02.jpg
       products-01.jpg
       cars-01.jpg
       ... etc.
   ```
2. Update the references:
   - Logo & hero image: `css/home.css` (`#heroSticky` background) and the
     `<img id="navLogo">` tag in `index.html` / `gallery.html`.
   - About portrait: the `#aboutImg` tag in `index.html`.
   - Gallery photos: the `homeImages` array in `js/main.js` and the
     `galleryImages` array in `js/gallery.js` — just swap each `src` value
     for a local path, e.g. `images/gallery/sports-01.jpg`.
3. Keep image sizes reasonable (compress/resize before uploading) so the
   site stays fast — 1200–1800px on the long edge is plenty for the
   masonry grid and lightbox.

⚠️ The Discord-hosted logo/hero URL currently in the code contains a
signed, expiring link and **will eventually stop working**. Replace it
with a locally hosted file before you consider the site "done."
