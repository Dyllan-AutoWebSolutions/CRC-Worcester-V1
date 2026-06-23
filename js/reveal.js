/* ============================================================
   CRC WORCESTER — reveal.js
   Scroll-reveal using IntersectionObserver
   ============================================================ */

export function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  /* Respect reduced-motion preference */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}
