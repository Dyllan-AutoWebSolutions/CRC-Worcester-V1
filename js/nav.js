/* ============================================================
   CRC WORCESTER — nav.js
   Hamburger · Scroll behaviour · Active link
   ============================================================ */

export function initNav() {
  const nav        = document.getElementById('nav');
  const navCta     = document.getElementById('nav-cta');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!nav) return;

  /* ── Scroll: glassy nav + show CTA ── */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background     = 'rgba(1,0,39,0.97)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.webkitBackdropFilter = 'blur(12px)';
      if (navCta) navCta.style.display = 'inline-flex';
    } else {
      nav.style.background     = 'var(--navy)';
      nav.style.backdropFilter = 'none';
      nav.style.webkitBackdropFilter = 'none';
      if (navCta) navCta.style.display = 'none';
    }
  }, { passive: true });

  /* ── Hamburger toggle ── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close on outside click */
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    /* Close on ESC */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ── Active link highlighting ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (
      href === currentPath ||
      (currentPath === '' && href === 'index.html') ||
      (currentPath === 'index.html' && href === 'index.html')
    )) {
      link.classList.add('active');
    }
  });
}

/* ── Exported helper so mobile links can call it ── */
export function closeMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  if (hamburger) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

/* Make closeMobileMenu available on window for inline onclick usage */
window.closeMobileMenu = closeMobileMenu;
