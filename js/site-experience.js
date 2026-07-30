window.DS = window.DS || {};

DS.initSiteExperience = function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const body = document.body;
  const main = document.querySelector('main');
  const sections = main ? Array.from(main.querySelectorAll(':scope > section')) : [];

  if (window.gsap && window.ScrollTrigger) {
    body.classList.add('gsap-ready');
  }

  const transition = document.createElement('div');
  transition.className = 'experience-transition';
  transition.setAttribute('aria-hidden', 'true');
  body.appendChild(transition);

  if (!reducedMotion) {
    body.classList.add('is-entering');
    window.setTimeout(() => body.classList.remove('is-entering'), 850);
  }

  const progress = document.createElement('div');
  progress.className = 'experience-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  body.appendChild(progress);
  const progressBar = progress.firstElementChild;

  const rail = document.createElement('div');
  rail.className = 'experience-rail';
  rail.setAttribute('aria-hidden', 'true');
  rail.textContent = document.title.split('|')[0].trim() || 'Design Sector';
  body.appendChild(rail);

  sections.forEach((section, index) => {
    section.dataset.sectionIndex = String(index + 1).padStart(2, '0');
  });

  let ticking = false;

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();

  if (finePointer && !reducedMotion) {
    const cursor = document.createElement('div');
    cursor.className = 'experience-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    body.appendChild(cursor);

    window.addEventListener('pointermove', (event) => {
      cursor.classList.add('is-visible');
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });

    document.querySelectorAll('a, button, .project-card, .news-card-image').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });

    document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  }

  if (!reducedMotion) {
    document.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          link.target === '_blank' ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const destination = new URL(link.href, window.location.href);
        if (destination.origin !== window.location.origin) return;

        event.preventDefault();
        body.classList.add('is-leaving');
        window.setTimeout(() => {
          window.location.href = destination.href;
        }, 480);
      });
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  DS.initSiteExperience?.();
});
