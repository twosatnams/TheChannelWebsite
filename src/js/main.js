// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isOpen);
    siteNav.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close menu when a link is clicked
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Header background on scroll
const header = document.querySelector('.site-header');

if (header) {
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 10) {
      header.style.borderBottomColor = 'var(--color-border)';
    } else {
      header.style.borderBottomColor = 'var(--color-border-light)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
}
