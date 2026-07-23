window.DS = window.DS || {};

DS.initNavigation = function () {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('.mobile-nav[data-nav]');

  const megaMenu = document.querySelector('[data-mega-menu]');
  const megaTriggers = document.querySelectorAll('[data-mega-trigger]');
  const megaPanels = document.querySelectorAll('[data-mega-panel]');

  let megaCloseTimer = null;

  function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY > 70;
    header.classList.toggle('is-scrolled', scrolled);
  }

  function closeMobileMenu() {
    if (!toggle || !mobileNav) return;

    mobileNav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMegaMenu(name) {
    if (!header || !megaMenu) return;

    clearTimeout(megaCloseTimer);

    header.classList.add('has-mega-open');
    megaMenu.classList.add('is-open');

    megaTriggers.forEach((trigger) => {
      const active = trigger.dataset.megaTrigger === name;
      trigger.classList.toggle('is-active', active);
      trigger.setAttribute('aria-expanded', String(active));
    });

    megaPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.megaPanel === name);
    });
  }

  function closeMegaMenu() {
    if (!header || !megaMenu) return;

    header.classList.remove('has-mega-open');
    megaMenu.classList.remove('is-open');

    megaTriggers.forEach((trigger) => {
      trigger.classList.remove('is-active');
      trigger.setAttribute('aria-expanded', 'false');
    });

    megaPanels.forEach((panel) => {
      panel.classList.remove('is-active');
    });
  }

  function scheduleMegaClose() {
    clearTimeout(megaCloseTimer);
    megaCloseTimer = setTimeout(closeMegaMenu, 140);
  }

  function cancelMegaClose() {
    clearTimeout(megaCloseTimer);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* Mobile menu */
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');

      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);

      closeMegaMenu();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* Desktop mega menu */
  megaTriggers.forEach((trigger) => {
    const name = trigger.dataset.megaTrigger;

    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 860) return;
      openMegaMenu(name);
    });

    trigger.addEventListener('focus', () => {
      if (window.innerWidth <= 860) return;
      openMegaMenu(name);
    });

    trigger.addEventListener('click', () => {
      if (window.innerWidth <= 860) return;

      const isActive = trigger.classList.contains('is-active');

      if (isActive && megaMenu && megaMenu.classList.contains('is-open')) {
        closeMegaMenu();
      } else {
        openMegaMenu(name);
      }
    });
  });

  if (header) {
    header.addEventListener('mouseenter', cancelMegaClose);
    header.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 860) return;
      scheduleMegaClose();
    });
  }

  if (megaMenu) {
    megaMenu.addEventListener('mouseenter', cancelMegaClose);
    megaMenu.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 860) return;
      scheduleMegaClose();
    });

    megaMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMegaMenu);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    closeMegaMenu();
    closeMobileMenu();
  });

  document.addEventListener('click', (event) => {
    if (!header || !megaMenu) return;

    const clickedInsideHeader = header.contains(event.target);
    const clickedInsideMega = megaMenu.contains(event.target);

    if (!clickedInsideHeader && !clickedInsideMega) {
      closeMegaMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      closeMobileMenu();
    } else {
      closeMegaMenu();
    }
  });

  /* Smooth anchor scrolling */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      closeMegaMenu();
      closeMobileMenu();

      if (window.DS.lenis) {
        window.DS.lenis.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};
