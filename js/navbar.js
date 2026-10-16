/* ============================================================
   SYLREG & KIDS INVESTMENT LIMITED — navbar.js
   Handles: sticky scroll, hamburger toggle, active links
   ============================================================ */

(function () {
  'use strict';

  const navbar    = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  /* ── Sticky on scroll ── */
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  /* ── Hamburger toggle ── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active page highlight ── */
  function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  setActiveNav();

})();
