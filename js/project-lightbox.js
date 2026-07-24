document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.porto-golf-page');

  if (!page) return;

  const renderImages = page.querySelectorAll(`
    .project-aerial-story .aerial-card img,
    .project-chapter .chapter-image img,
    .project-lifestyle .lifestyle-frame img
  `);

  if (!renderImages.length) return;

  const lightbox = document.createElement('div');

  lightbox.className = 'project-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('aria-label', 'Full project image');

  lightbox.innerHTML = `
    <button
      class="project-lightbox-close"
      type="button"
      aria-label="Close full image"
    >
      &times;
    </button>

    <img
      class="project-lightbox-image"
      src=""
      alt=""
    >
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.project-lightbox-image');
  const closeButton = lightbox.querySelector('.project-lightbox-close');

  let lastFocusedElement = null;

  function openLightbox(sourceImage) {
    lastFocusedElement = document.activeElement;

    lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
    lightboxImage.alt = sourceImage.alt || 'Project render';

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');

    document.body.classList.add('project-lightbox-open');

    if (window.DS?.lenis?.stop) {
      window.DS.lenis.stop();
    }

    requestAnimationFrame(() => {
      closeButton.focus();
    });
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('is-open')) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('project-lightbox-open');

    if (window.DS?.lenis?.start) {
      window.DS.lenis.start();
    }

    window.setTimeout(() => {
      lightboxImage.src = '';
      lightboxImage.alt = '';
    }, 350);

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  renderImages.forEach((image) => {
    image.classList.add('project-lightbox-trigger');

    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute(
      'aria-label',
      `Open full image: ${image.alt || 'project render'}`
    );

    image.addEventListener('click', () => {
      openLightbox(image);
    });

    image.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      openLightbox(image);
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
});
