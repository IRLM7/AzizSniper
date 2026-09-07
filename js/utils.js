/* ============================================================
   AZIZSNIPER — SHARED UTILITIES
   Reusable helpers used by both main.js (home) and gallery.js.
   Depends on GSAP + ScrollTrigger (and Lenis, on the home page)
   being loaded before this file.
   ============================================================ */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;
if (REDUCED_MOTION) document.body.classList.add('reduced-motion');

/**
 * Wires up the hamburger button + full-screen mobile menu.
 * Works on any page that includes the standard mobile-menu markup.
 */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburgerBtn || !mobileMenu) return;

  let menuOpen = false;

  function openMobileMenu() {
    menuOpen = true;
    hamburgerBtn.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    gsap.timeline()
      .to(mobileMenu, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to('.mobile-menu-link', { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.2')
      .to('.mobile-menu-hire', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.mobile-menu-footer', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
  }

  function closeMobileMenu() {
    menuOpen = false;
    hamburgerBtn.classList.remove('active');
    gsap.timeline({
      onComplete: () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        gsap.set('.mobile-menu-link', { opacity: 0, y: 30 });
        gsap.set('.mobile-menu-hire', { opacity: 0, y: 20 });
        gsap.set('.mobile-menu-footer', { opacity: 0, y: 20 });
      }
    })
      .to('.mobile-menu-footer', { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' })
      .to('.mobile-menu-hire', { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' }, '-=0.2')
      .to('.mobile-menu-link', { opacity: 0, y: -20, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, '-=0.2')
      .to(mobileMenu, { opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.2');
  }

  hamburgerBtn.addEventListener('click', () => { menuOpen ? closeMobileMenu() : openMobileMenu(); });
  document.querySelectorAll('.mobile-menu-link, .mobile-menu-hire-btn').forEach(link => {
    link.addEventListener('click', () => { setTimeout(closeMobileMenu, 150); });
  });
}

/**
 * Sets up Lenis smooth scrolling (desktop + motion allowed only)
 * and hooks it into GSAP's ticker/ScrollTrigger.
 * Returns the Lenis instance, or null if smooth scroll is skipped.
 */
function initSmoothScroll() {
  if (REDUCED_MOTION || IS_MOBILE || typeof Lenis === 'undefined') return null;
  const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/**
 * Intercepts in-page anchor links (nav-link / href="#...") and
 * scrolls to them via Lenis when available, or native smooth scroll otherwise.
 */
function initAnchorScroll(lenis) {
  document.querySelectorAll('.nav-link, a[href="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = href === '#' ? 0 : document.querySelector(href);
      if (lenis) lenis.scrollTo(target || 0, { offset: 0, duration: 1.3 });
      else if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/**
 * Toggles the `.scrolled` class on #nav once the page scrolls past 80px.
 * Skip this on pages where the nav is always in its "scrolled" state
 * (e.g. gallery.html sets that visually via CSS instead).
 */
function initNavScrollToggle() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: self => nav.classList.toggle('scrolled', self.scroll() > 80)
  });
}

/** Fades + slides in any `.reveal` element as it scrolls into view. */
function initRevealAnimations() {
  gsap.utils.toArray('.reveal').forEach(el =>
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  );
}

/**
 * Renders a masonry grid of images, wires up filter buttons, and
 * calls `onImageClick(originalIndex)` when an image is opened.
 *
 * @param {Object} opts
 * @param {HTMLElement} opts.gridEl - container to render items into
 * @param {HTMLElement} opts.counterEl - element to show the visible count in
 * @param {Array}  opts.images - [{ src, title, desc, cat, feature? }]
 * @param {Function} opts.onImageClick - called with the index in `images`
 * @param {number} [opts.staggerMs=40] - stagger delay between item reveal animations
 */
function renderMasonryGrid({ gridEl, counterEl, images, onImageClick, staggerMs = 40 }) {
  images.forEach((img, i) => {
    const el = document.createElement('div');
    el.className = 'masonry-item' + (img.feature ? ' feature' : '');
    el.dataset.cat = img.cat;
    el.dataset.index = i;
    el.innerHTML = `
      <img class="masonry-img" src="${img.src}" alt="${img.title}" loading="lazy">
      <span class="masonry-tag">${img.cat}</span>
      <div class="masonry-caption">
        <div class="masonry-caption-text"><h3>${img.title}</h3><p>${img.desc}</p></div>
        <div class="masonry-view"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M17 7H9M17 7v8"/></svg></div>
      </div>
    `;
    el.addEventListener('click', () => onImageClick(i));
    gridEl.appendChild(el);
    setTimeout(() => el.classList.add('visible'), staggerMs * i);
  });

  if (counterEl) counterEl.textContent = String(images.length).padStart(2, '0');

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const cards = gridEl.querySelectorAll('.masonry-item');
    cards.forEach(card => { card.classList.remove('visible'); card.style.opacity = 0; });
    setTimeout(() => {
      let visibleCount = 0;
      let delay = 0;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden-filter', !match);
        card.style.opacity = '';
        if (match) { visibleCount++; setTimeout(() => card.classList.add('visible'), delay); delay += staggerMs; }
      });
      if (counterEl) counterEl.textContent = String(visibleCount).padStart(2, '0');
    }, 300);
  }));
}

/**
 * Sets up the full-screen lightbox: open/close, prev/next (buttons,
 * keyboard arrows, swipe), and only cycles through currently
 * filter-visible images.
 *
 * @param {Array} images - the full images array used by the grid
 * @returns {{ open: Function }} call `open(index)` to show an image
 */
function initLightbox(images) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCat = document.getElementById('lightboxCat');
  if (!lightbox) return { open: () => {} };

  let currentIdx = 0;

  function getVisibleImages() {
    return images
      .map((_, i) => i)
      .filter(i => {
        const card = document.querySelector(`.masonry-item[data-index="${i}"]`);
        return card && !card.classList.contains('hidden-filter');
      });
  }

  function updateLightbox() {
    const img = images[currentIdx];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    lightboxTitle.textContent = img.title;
    lightboxCat.textContent = img.cat;
  }

  function open(i) {
    currentIdx = i;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function next() {
    const visible = getVisibleImages();
    const pos = visible.indexOf(currentIdx);
    currentIdx = visible[(pos + 1) % visible.length];
    updateLightbox();
  }

  function prev() {
    const visible = getVisibleImages();
    const pos = visible.indexOf(currentIdx);
    currentIdx = visible[(pos - 1 + visible.length) % visible.length];
    updateLightbox();
  }

  document.getElementById('lightboxClose')?.addEventListener('click', close);
  document.getElementById('lightboxNext')?.addEventListener('click', next);
  document.getElementById('lightboxPrev')?.addEventListener('click', prev);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
  lightbox.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff > 0 ? prev() : next(); }
  });

  return { open };
}
