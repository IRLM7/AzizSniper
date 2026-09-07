/* ============================================================
   AZIZSNIPER — HOME PAGE SCRIPT (index.html)
   Hero text animation, home gallery preview, manifesto scroll
   effect, about-section counters, and services hover tracking.
   Relies on utils.js being loaded first.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---------- Shared behaviour ---------- */
initMobileMenu();
const lenis = initSmoothScroll();
initAnchorScroll(lenis);
initNavScrollToggle();
initRevealAnimations();

/* ---------- Home page preview gallery data (9 images) ---------- */
const homeImages = [
  { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop', title: 'The Decisive Moment', desc: 'Split-second intensity in championship action.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', title: 'Velocity', desc: 'Raw power captured at 1/4000th of a second.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1511091734515-e50d46c37240?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Full Focus', desc: 'Concentration at its purest.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop', title: 'Form & Function', desc: 'Product storytelling with cinematic depth.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop', title: 'Clean Lines', desc: 'Minimalism meets craftsmanship.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop', title: 'Object Study', desc: 'Every detail tells a story.', cat: 'products' },
  { src: 'https://github.com/IRLM7/AzizSniper/blob/main/images/mot1.jpg?raw=true', title: 'Built to Move', desc: 'Automotive elegance in motion.', cat: 'cars' },
  { src: 'https://github.com/IRLM7/AzizSniper/blob/main/images/mot2.jpg?raw=true', title: 'Metal & Light', desc: 'Sculpted shadows on polished steel.', cat: 'cars' },
  { src: 'https://github.com/IRLM7/AzizSniper/blob/main/images/mot3.jpg?raw=true', title: 'Road Story', desc: 'Journeys worth pausing.', cat: 'cars' },
];

const homeGrid = document.getElementById('masonryGrid');
const homeCounter = document.getElementById('counterVisible');
const homeLightbox = initLightbox(homeImages);

if (homeGrid) {
  renderMasonryGrid({
    gridEl: homeGrid,
    counterEl: homeCounter,
    images: homeImages,
    onImageClick: homeLightbox.open,
    staggerMs: 40,
  });
}

/* ---------- Hero title split-letter animation ---------- */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.char-line').forEach(line => {
    const text = line.textContent;
    line.innerHTML = text.split('').map(c => `<span class="char">${c}</span>`).join('');
  });
  gsap.set('.char', { yPercent: 120 });
  gsap.timeline({ delay: .2 })
    .to('#heroTag', { opacity: 1, duration: .6 })
    .to('.char', { yPercent: 0, duration: 1, stagger: .02, ease: 'power4.out' }, '-=.3')
    .from('#heroSub', { opacity: 0, y: 20, duration: .8 }, '-=.4')
    .from('#heroCta', { opacity: 0, y: 20, duration: .8 }, '-=.6');
});

/* ---------- Hero parallax / fade on scroll ---------- */
if (!REDUCED_MOTION && !IS_MOBILE) {
  gsap.to('#heroSticky', { scale: 1.18, filter: 'brightness(.85)', ease: 'none', scrollTrigger: { trigger: '#heroWrap', start: 'top top', end: 'bottom bottom', scrub: true } });
  gsap.to('#heroContent', { opacity: 0, y: -90, ease: 'none', scrollTrigger: { trigger: '#heroWrap', start: 'top top', end: '65% bottom', scrub: true } });
}

/* ---------- Manifesto line-by-line reveal ---------- */
const mLines = gsap.utils.toArray('.mline');
if (mLines.length && !IS_MOBILE) {
  const seg = 1 / mLines.length;
  mLines.forEach((line, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#manifestoWrap',
        start: `top+=${i * seg * 100}% top`,
        end: `top+=${(i + 1) * seg * 100}% top`,
        scrub: true,
      }
    });
    tl.to(line, { opacity: 1, duration: .4 }).to(line, { opacity: i === mLines.length - 1 ? 1 : .12, duration: .4 }, .6);
  });
}

/* ---------- About image reveal + parallax ---------- */
gsap.to('#aboutImg', { scale: 1, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: '#about', start: 'top 75%' } });
if (!IS_MOBILE && !REDUCED_MOTION) {
  gsap.to('#aboutText', { y: -40, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true } });
}

/* ---------- About stat counters ---------- */
gsap.utils.toArray('.stat-num').forEach(el => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      const counter = { val: 0 };
      gsap.to(counter, { val: target, duration: 1.6, ease: 'power2.out', onUpdate: () => el.textContent = Math.round(counter.val) + suffix });
    }
  });
});

/* ---------- Services card mouse-tracking glow ---------- */
document.querySelectorAll('[data-mouse-track]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

/* ---------- Contact form (demo submit handler) ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.reset();
    alert('Message sent — thank you!');
  });
}
