/* ============================================================
   AZIZSNIPER — GALLERY PAGE SCRIPT (gallery.html)
   Full 18-image archive: masonry render, filters, lightbox.
   Relies on utils.js being loaded first.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---------- Shared behaviour ---------- */
initMobileMenu();
initRevealAnimations();

/* ---------- Full gallery data (18 images) ---------- */
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop', title: 'The Decisive Moment', desc: 'Split-second intensity in championship action.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop', title: 'Velocity', desc: 'Raw power captured at 1/4000th of a second.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1511091734515-e50d46c37240?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Full Focus', desc: 'Concentration at its purest.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1600&auto=format&fit=crop', title: 'Airborne', desc: 'Suspended above the hardwood.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600&auto=format&fit=crop', title: 'The Pitch', desc: 'Wide open space before the sprint.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop', title: 'Lane One', desc: 'Discipline, measured in stripes.', cat: 'sports' },
  { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1800&auto=format&fit=crop', title: 'Form & Function', desc: 'Product storytelling with cinematic depth.', cat: 'products', feature: true },
  { src: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1600&auto=format&fit=crop', title: 'Clean Lines', desc: 'Minimalism meets craftsmanship.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1600&auto=format&fit=crop', title: 'Object Study', desc: 'Every detail tells a story.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop', title: 'Precision Cut', desc: 'Studio light on brushed metal.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop', title: 'Still Life', desc: 'Composition built around a single form.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop', title: 'Sound Study', desc: 'Texture and negative space.', cat: 'products' },
  { src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1600&auto=format&fit=crop', title: 'Built to Move', desc: 'Automotive elegance in motion.', cat: 'cars' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop', title: 'Metal & Light', desc: 'Sculpted shadows on polished steel.', cat: 'cars' },
  { src: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1600&auto=format&fit=crop', title: 'Road Story', desc: 'Journeys worth pausing.', cat: 'cars' },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop', title: 'Front Line', desc: 'Stance, grille, and presence.', cat: 'cars', feature: true },
  { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop', title: 'Chrome & Shadow', desc: 'Where the bodywork catches the light.', cat: 'cars' },
  { src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop', title: 'Cockpit', desc: 'Detail work inside the cabin.', cat: 'cars' },
];

const galleryGrid = document.getElementById('masonryGrid');
const galleryCounter = document.getElementById('counterVisible');
const galleryLightbox = initLightbox(galleryImages);

if (galleryGrid) {
  renderMasonryGrid({
    gridEl: galleryGrid,
    counterEl: galleryCounter,
    images: galleryImages,
    onImageClick: galleryLightbox.open,
    staggerMs: 30,
  });
}
