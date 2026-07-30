window.DS = window.DS || {};

DS.initYodezeenMotion = function () {
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const gsapRef = window.gsap;
  const triggerRef = window.ScrollTrigger;

  if (motionReduced || !gsapRef || !triggerRef) {
    document.body.classList.add('motion-static');
    return;
  }

  gsapRef.registerPlugin(triggerRef);
  document.body.classList.add('motion-ready');

  const splitElements = new Set();
  const initialSelectors = [
    '.hero-display > span',
    '.projects-hero h1',
    '.editorial-hero h1',
    '.project-hero-content h1',
    '.news-intro h1'
  ];
  const scrollSelectors = [
    '.studio-text h2',
    '.featured-content h2',
    '.works-section > h2',
    '.mena-text h2',
    '.offices-section > h2',
    '.contact-section h2',
    '.projects-cta h2',
    '.project-overview h2',
    '.project-section-heading h2',
    '.chapter-intro h2',
    '.lifestyle-copy h2',
    '.team-intro h2',
    '.editorial-section-heading h2',
    '.careers-statement h2',
    '.editorial-cta h2'
  ];

  const initialTitles = uniqueElements(initialSelectors);
  const scrollTitles = uniqueElements(scrollSelectors);

  [...initialTitles, ...scrollTitles].forEach((element) => {
    splitText(element);
    splitElements.add(element);
  });

  gsapRef.set(Array.from(splitElements), {
    opacity: 1,
    y: 0
  });

  prepareNavigationLabels();
  animateOpening(initialTitles);
  animateScrollTitles(scrollTitles);
  animateSectionLabels();
  animateImages();
  animateCards();
  animateHeroDrift();
  animateFeaturedStory();
  animateStudioStory();
  animateNewsStory();
  animateHeaderDirection();

  if (finePointer) {
    initMagneticControls();
    initCursorLabels();
  }

  const refresh = () => triggerRef.refresh();
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready?.then(refresh);
  window.setTimeout(refresh, 1200);

  function uniqueElements(selectors) {
    return [...new Set(selectors.flatMap((selector) => (
      Array.from(document.querySelectorAll(selector))
    )))];
  }

  function splitText(element) {
    if (!element || element.dataset.motionSplit === 'true') return;

    const label = element.innerText.trim().replace(/\s+/g, ' ');
    element.dataset.motionSplit = 'true';
    element.classList.add('motion-split-ready');
    if (label) element.setAttribute('aria-label', label);

    Array.from(element.childNodes).forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim()) return;

      const fragment = document.createDocumentFragment();
      const parts = node.nodeValue.split(/(\s+)/);

      parts.forEach((part) => {
        if (!part) return;

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const hyphenParts = part.split('-');

        hyphenParts.forEach((hyphenPart, index) => {
          const wordText = index < hyphenParts.length - 1
            ? `${hyphenPart}-`
            : hyphenPart;

          if (!wordText) return;

          const word = document.createElement('span');
          word.className = 'motion-word';
          word.setAttribute('aria-hidden', 'true');

          Array.from(wordText).forEach((character) => {
            const char = document.createElement('span');
            char.className = 'motion-char';
            char.textContent = character;
            word.appendChild(char);
          });

          fragment.appendChild(word);

          if (index < hyphenParts.length - 1) {
            fragment.appendChild(document.createElement('wbr'));
          }
        });
      });

      node.replaceWith(fragment);
    });
  }

  function animateOpening(titles) {
    const chars = titles.flatMap((title) => (
      Array.from(title.querySelectorAll('.motion-char'))
    ));
    const heroMedia = document.querySelector(
      '.hero-media, .editorial-hero-media img, .project-hero-media img, .news-feature.is-active img'
    );
    const supporting = document.querySelectorAll(
      '.hero-content .kicker, .hero-note, .project-kicker, .project-hero-note, .editorial-hero-note, .news-intro .editorial-kicker, .news-intro p:last-child'
    );
    const header = document.querySelector('.site-header .header-inner');

    gsapRef.set(chars, {
      opacity: 0,
      rotateY: -88,
      transformPerspective: 900,
      transformOrigin: '50% 58%'
    });

    if (supporting.length) {
      gsapRef.set(supporting, { opacity: 0, y: 28 });
    }

    const timeline = gsapRef.timeline({
      delay: 0.9,
      defaults: { ease: 'power3.out' }
    });

    if (header) {
      timeline.fromTo(
        header,
        { yPercent: -120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05 },
        0
      );
    }

    if (heroMedia) {
      timeline.fromTo(
        heroMedia,
        { scale: 1.14 },
        { scale: 1.035, duration: 1.9, ease: 'power2.out' },
        0
      );
    }

    timeline.to(
      chars,
      {
        opacity: 1,
        rotateY: 0,
        duration: 0.92,
        stagger: 0.018
      },
      0.2
    );

    if (supporting.length) {
      timeline.to(
        supporting,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08
        },
        0.45
      );
    }
  }

  function animateScrollTitles(titles) {
    titles.forEach((title) => {
      const chars = title.querySelectorAll('.motion-char');
      if (!chars.length) return;

      gsapRef.set(chars, {
        opacity: 0,
        rotateY: 88,
        transformPerspective: 900,
        transformOrigin: '50% 58%'
      });

      gsapRef.to(chars, {
        opacity: 1,
        rotateY: 0,
        duration: 0.9,
        stagger: 0.014,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 82%',
          once: true
        }
      });
    });
  }

  function animateSectionLabels() {
    document.querySelectorAll(
      '.section-label, .editorial-kicker, .project-kicker, .news-card-meta'
    ).forEach((label) => {
      gsapRef.fromTo(
        label,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 91%',
            once: true
          }
        }
      );
    });
  }

  function animateImages() {
    const figures = uniqueElements([
      '.studio-image',
      '.project-card figure',
      '.chapter-image',
      '.aerial-card',
      '.discipline-people-card',
      '.editorial-hero-media',
      '.news-card-image',
      '.lifestyle-frame',
      '.office-visual'
    ]);

    figures.forEach((figure) => {
      const image = figure.matches('img') ? figure : figure.querySelector('img');
      if (!image) return;

      figure.classList.add('motion-image-ready');
      gsapRef.set(figure, { opacity: 1, y: 0 });

      gsapRef.fromTo(
        figure,
        { clipPath: 'inset(10% 0 10% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 1.25,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: figure,
            start: 'top 88%',
            once: true
          }
        }
      );

      gsapRef.fromTo(
        image,
        { scale: 1.14, yPercent: -4 },
        {
          scale: 1.025,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: figure,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        }
      );
    });
  }

  function animateCards() {
    const cards = uniqueElements([
      '.project-card',
      '.discipline-people-card',
      '.team-method-card',
      '.careers-value',
      '.role-row',
      '.process-card',
      '.news-card',
      '.aerial-card',
      '.office-card'
    ]);

    cards.forEach((card, index) => {
      gsapRef.fromTo(
        card,
        { opacity: 0, y: 86 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          delay: (index % 3) * 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 91%',
            once: true
          }
        }
      );
    });
  }

  function animateHeroDrift() {
    document.querySelectorAll(
      '.projects-hero, .editorial-hero, .project-hero'
    ).forEach((hero) => {
      const words = hero.querySelectorAll('.motion-word');
      const image = hero.querySelector('img');
      if (!words.length) return;

      const timeline = gsapRef.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.85
        }
      });

      timeline
        .to(words[0], { xPercent: -18, opacity: 0.28, ease: 'none' }, 0)
        .to(words[words.length - 1], { xPercent: 18, opacity: 0.28, ease: 'none' }, 0);

      if (image) {
        timeline.to(image, { scale: 1.14, ease: 'none' }, 0);
      }
    });
  }

  function animateFeaturedStory() {
    const section = document.querySelector('.featured-project-section');
    if (!section) return;

    const media = section.querySelectorAll('video, .featured-fallback');
    const title = section.querySelector('.featured-content h2');
    const meta = section.querySelectorAll('.featured-content p, .featured-content a');

    const timeline = gsapRef.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.9
      }
    });

    if (media.length) {
      timeline.fromTo(
        media,
        { scale: 1.12 },
        { scale: 1.015, ease: 'none' },
        0
      );
    }

    if (title) {
      timeline.fromTo(
        title,
        { yPercent: 18 },
        { yPercent: -16, ease: 'none' },
        0
      );
    }

    if (meta.length) {
      timeline.fromTo(
        meta,
        { y: 28, opacity: 0.5 },
        { y: -16, opacity: 1, stagger: 0.04, ease: 'none' },
        0.1
      );
    }
  }

  function animateStudioStory() {
    const section = document.querySelector('.studio-section');
    if (!section) return;

    const image = section.querySelector('.studio-image');
    const text = section.querySelector('.studio-text');
    if (!image || !text) return;

    gsapRef.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85
      }
    })
    .fromTo(
      image,
      { xPercent: -8, scale: 0.94 },
      { xPercent: 0, scale: 1, ease: 'none' },
      0
    )
    .fromTo(
      text,
      { xPercent: 8 },
      { xPercent: -2, ease: 'none' },
      0
    );
  }

  function animateNewsStory() {
    const section = document.querySelector('.news-showcase');
    if (!section) return;

    const feature = section.querySelector('.news-feature-column');
    const info = section.querySelector('.news-info-column');

    gsapRef.timeline({
      delay: 0.75,
      defaults: { ease: 'power3.inOut' }
    })
    .fromTo(
      feature,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.25 },
      0
    )
    .fromTo(
      info,
      { xPercent: 12, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1.05 },
      0.18
    );
  }

  function animateHeaderDirection() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastY = window.scrollY;
    let hidden = false;

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      const shouldHide = currentY > lastY && currentY > 180;

      if (shouldHide !== hidden) {
        hidden = shouldHide;
        header.classList.toggle('motion-header-hidden', hidden);
      }

      if (currentY < 80) {
        hidden = false;
        header.classList.remove('motion-header-hidden');
      }

      lastY = currentY;
    }, { passive: true });
  }

  function prepareNavigationLabels() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      if (link.querySelector('.motion-nav-label')) return;
      const label = link.textContent.trim();
      if (!label) return;

      link.dataset.motionLabel = label;
      link.textContent = '';

      const current = document.createElement('span');
      current.className = 'motion-nav-label motion-nav-label-current';
      current.textContent = label;

      const hover = document.createElement('span');
      hover.className = 'motion-nav-label motion-nav-label-hover';
      hover.textContent = label;
      hover.setAttribute('aria-hidden', 'true');

      link.append(current, hover);
    });
  }

  function initMagneticControls() {
    document.querySelectorAll(
      '.nav-cta, .line-link, .editorial-link, .contact-cta, .back-to-projects'
    ).forEach((control) => {
      control.addEventListener('pointermove', (event) => {
        const rect = control.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.24;

        gsapRef.to(control, {
          x,
          y,
          duration: 0.35,
          ease: 'power3.out'
        });
      });

      control.addEventListener('pointerleave', () => {
        gsapRef.to(control, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'elastic.out(1, 0.42)'
        });
      });
    });
  }

  function initCursorLabels() {
    const cursor = document.querySelector('.experience-cursor');
    if (!cursor) return;

    const targets = [
      ['.project-card, .chapter-image, .aerial-card', 'VIEW'],
      ['.news-card, .news-card-image', 'OPEN'],
      ['.discipline-people-card, .office-card', 'EXPLORE']
    ];

    targets.forEach(([selector, label]) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.addEventListener('pointerenter', () => {
          cursor.dataset.label = label;
          cursor.classList.add('has-label');
        });

        element.addEventListener('pointerleave', () => {
          cursor.classList.remove('has-label');
          delete cursor.dataset.label;
        });
      });
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  DS.initYodezeenMotion?.();
});
