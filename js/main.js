window.DS = window.DS || {};


/* =========================
   REVEALS
========================= */

DS.initReveals = function () {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.utils.toArray('.reveal-up, .reveal-media').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 84%'
      }
    });
  });
};


/* =========================
   PORTO GOLF MASTERPLAN JOURNEY
========================= */

DS.initMasterplanJourney = function () {
  const section = document.querySelector('[data-masterplan-journey]');

  if (!section || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const image = section.querySelector('[data-masterplan-image]');
  const title = section.querySelector('[data-masterplan-title]');
  const text = section.querySelector('[data-masterplan-text]');
  const count = section.querySelector('[data-masterplan-count]');
  const progressBar = section.querySelector('[data-masterplan-progress-bar]');
  const zoneLabels = section.querySelectorAll('[data-zone-label]');

  if (!image) return;

  const steps = [
    {
      count: '01',
      zone: '',
      title: 'The landscape as a connected resort spine.',
      text: 'Scroll through the plan to move from the full resort layout into the main plazas, pool courts, and central spine.'
    },
    {
      count: '02',
      zone: 'plaza-201',
      title: 'Plaza 201 anchors the resort arrival.',
      text: 'A pool court shaped around arrival, water movement, shaded decks, and elevated residential views.'
    },
    {
      count: '03',
      zone: 'plaza-133',
      title: 'Plaza 133 becomes the social court.',
      text: 'A relaxed gathering zone built around seating islands, water, planting, and balcony overlook moments.'
    },
    {
      count: '04',
      zone: 'plaza-203',
      title: 'Plaza 203 frames family resort life.',
      text: 'A layered landscape experience with arrival, poolside life, balcony views, and waterfall atmosphere.'
    },
    {
      count: '05',
      zone: 'spine',
      title: 'The central spine connects the whole story.',
      text: 'Linear water, social islands, planting, and movement routes tie the resort experience together.'
    }
  ];

  let activeStep = -1;

  function setStep(index) {
    if (index === activeStep) return;

    activeStep = index;

    const step = steps[index];

    if (title) title.textContent = step.title;
    if (text) text.textContent = step.text;
    if (count) count.textContent = step.count;

    zoneLabels.forEach((label) => {
      label.classList.toggle(
        'is-active',
        label.dataset.zoneLabel === step.zone
      );
    });
  }

  setStep(0);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const progress = self.progress;

        const index = Math.min(
          steps.length - 1,
          Math.floor(progress * steps.length)
        );

        setStep(index);

        if (progressBar) {
          progressBar.style.width = `${progress * 100}%`;
        }
      }
    }
  });

  timeline
    .to(image, {
      scale: 1.08,
      xPercent: 0,
      yPercent: 0,
      ease: 'none',
      duration: 1
    })
    .to(image, {
      scale: 1.38,
      xPercent: -6,
      yPercent: 14,
      ease: 'none',
      duration: 1
    })
    .to(image, {
      scale: 1.42,
      xPercent: 0,
      yPercent: -15,
      ease: 'none',
      duration: 1
    })
    .to(image, {
      scale: 1.36,
      xPercent: 20,
      yPercent: 0,
      ease: 'none',
      duration: 1
    })
    .to(image, {
      scale: 1.32,
      xPercent: -4,
      yPercent: 0,
      ease: 'none',
      duration: 1
    })
    .to(image, {
      scale: 1.05,
      xPercent: 0,
      yPercent: 0,
      ease: 'none',
      duration: 1
    });
};


/* =========================
   SITE INIT
========================= */

window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  DS.initSmoothScroll?.();
  DS.initLoader?.();
  DS.initNavigation?.();
  DS.initManifesto?.();
  DS.initClipScrub?.();
  DS.initShapeTitle?.();
  DS.initDisciplinePreviews?.();
  DS.initWorks?.();
  DS.initOffices?.();
  DS.initReveals?.();
  DS.initMasterplanJourney?.();

  setTimeout(() => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }, 800);
});
