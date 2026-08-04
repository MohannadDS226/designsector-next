window.DS = window.DS || {};

DS.initTeamRoster = function () {
  const section = document.querySelector('[data-partners-section]');
  if (!section || section.dataset.rosterReady === 'true') return;

  section.dataset.rosterReady = 'true';

  const pin = section.querySelector('[data-partners-pin]');
  const viewport = section.querySelector('[data-partners-viewport]');
  const track = section.querySelector('[data-partners-track]');
  const progress = section.querySelector('[data-partners-progress]');
  const heading = section.querySelector('h2');
  const copy = section.querySelector('.partners-success-copy');
  const groups = Array.from(section.querySelectorAll('.partner-group'));
  const cards = Array.from(section.querySelectorAll('.partner-card'));
  const cardStages = cards.map((card) => {
    const existingStage = Array.from(card.children).find((child) =>
      child.classList.contains('partner-card-stage')
    );

    if (existingStage) return existingStage;

    const stage = document.createElement('div');
    stage.className = 'partner-card-stage';

    while (card.firstChild) {
      stage.appendChild(card.firstChild);
    }

    card.appendChild(stage);
    return stage;
  });
  const surfaces = Array.from(section.querySelectorAll('.partner-portrait-surface'));
  const gsapRef = window.gsap;
  const triggerRef = window.ScrollTrigger;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  applyLayoutPolish();

  if (copy) {
    copy.textContent = 'A growing roster of the people shaping the studio.';
  }

  if (!pin || !viewport || !track) return;

  if (!gsapRef || !triggerRef || reducedMotion) {
    document.body.classList.add('motion-static');
    return;
  }

  gsapRef.registerPlugin(triggerRef);
  splitHeading(heading);
  animateIntroduction();

  const media = gsapRef.matchMedia();

  media.add('(min-width: 861px)', () => {
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const horizontalTween = gsapRef.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 1.35, distance() + window.innerHeight * .7)}`,
        pin,
        scrub: .85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress) gsapRef.set(progress, { scaleX: self.progress });
        }
      }
    });

    groups.forEach((group) => {
      gsapRef.fromTo(
        group,
        { opacity: .28, y: 54 },
        {
          opacity: 1,
          y: 0,
          duration: .9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            containerAnimation: horizontalTween,
            start: 'left 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    surfaces.forEach((surface, index) => {
      gsapRef.fromTo(
        surface,
        {
          xPercent: index % 2 === 0 ? -5 : 5,
          yPercent: index % 3 === 0 ? -2 : 2
        },
        {
          xPercent: index % 2 === 0 ? 5 : -5,
          yPercent: index % 3 === 0 ? 2 : -2,
          ease: 'none',
          scrollTrigger: {
            trigger: surface,
            containerAnimation: horizontalTween,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        }
      );
    });

    return () => {
      gsapRef.set(track, { clearProps: 'transform' });
      gsapRef.set(groups, { clearProps: 'opacity,transform' });
      gsapRef.set(surfaces, { clearProps: 'transform' });
      if (progress) gsapRef.set(progress, { clearProps: 'transform' });
    };
  });

  media.add('(max-width: 860px)', () => {
    gsapRef.set(track, { clearProps: 'transform' });
    gsapRef.set(groups, { opacity: 1, y: 0 });
    gsapRef.set(surfaces, { clearProps: 'transform' });
    gsapRef.set(cards, { clearProps: 'opacity,transform' });
    gsapRef.set(cardStages, { clearProps: 'opacity,transform' });

    section.classList.add('mobile-arc-ready');

    const mobileHeading = document.createElement('div');
    const mobileHeadingIndex = document.createElement('span');
    const mobileHeadingTitle = document.createElement('h3');

    mobileHeading.className = 'partners-mobile-group-heading';
    mobileHeading.setAttribute('aria-live', 'polite');
    mobileHeading.append(mobileHeadingIndex, mobileHeadingTitle);
    viewport.before(mobileHeading);

    let frameId = 0;
    let activeIndex = 0;
    let arcActive = true;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const updateMobileHeading = (card) => {
      const source = card?.closest('.partner-group')?.querySelector('.partner-group-heading');
      if (!source) return;

      mobileHeadingIndex.textContent = source.querySelector('span')?.textContent?.trim() || '';
      mobileHeadingTitle.textContent = source.querySelector('h3')?.textContent?.trim() || '';
    };

    const updateArc = () => {
      frameId = 0;

      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;
      let nearestDistance = Number.POSITIVE_INFINITY;
      let nearestIndex = activeIndex;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const centerDistance = cardCenter - viewportCenter;
        const normalized = centerDistance / Math.max(cardRect.width * 1.04, 1);
        const signedDistance = clamp(normalized, -1.35, 1.35);
        const distance = Math.min(Math.abs(signedDistance), 1);
        const arc = Math.pow(distance, 1.3);
        const absoluteDistance = Math.abs(centerDistance);

        if (absoluteDistance < nearestDistance) {
          nearestDistance = absoluteDistance;
          nearestIndex = index;
        }

        const stage = cardStages[index];
        stage?.style.setProperty('--partner-arc-y', `${(arc * 42).toFixed(2)}px`);
        stage?.style.setProperty('--partner-arc-z', `${(-arc * 150).toFixed(2)}px`);
        stage?.style.setProperty('--partner-arc-rotate-y', `${(-signedDistance * 13).toFixed(2)}deg`);
        stage?.style.setProperty('--partner-arc-rotate-z', `${(signedDistance * 3.2).toFixed(2)}deg`);
        stage?.style.setProperty('--partner-arc-scale', (1 - arc * .13).toFixed(3));
        stage?.style.setProperty('--partner-arc-opacity', (1 - arc * .38).toFixed(3));
        card.style.setProperty('--partner-arc-layer', String(20 - Math.round(distance * 10)));
      });

      if (nearestIndex !== activeIndex || !cards[nearestIndex]?.hasAttribute('aria-current')) {
        cards[activeIndex]?.removeAttribute('aria-current');
        activeIndex = nearestIndex;
        cards[activeIndex]?.setAttribute('aria-current', 'true');
        updateMobileHeading(cards[activeIndex]);
      }
    };

    const requestArcUpdate = () => {
      if (!arcActive) return;
      if (!frameId) frameId = window.requestAnimationFrame(updateArc);
    };

    const moveToCard = (index) => {
      const target = cards[clamp(index, 0, cards.length - 1)];
      if (!target) return;

      const viewportRect = viewport.getBoundingClientRect();
      const cardRect = target.getBoundingClientRect();
      const offset = cardRect.left + cardRect.width / 2 - (viewportRect.left + viewportRect.width / 2);

      viewport.scrollTo({
        left: viewport.scrollLeft + offset,
        behavior: 'smooth'
      });
    };

    const handleKeydown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      moveToCard(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    };

    viewport.addEventListener('scroll', requestArcUpdate, { passive: true });
    viewport.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', requestArcUpdate, { passive: true });
    document.fonts?.ready?.then(requestArcUpdate);
    window.requestAnimationFrame(updateArc);

    return () => {
      arcActive = false;
      if (frameId) window.cancelAnimationFrame(frameId);
      viewport.removeEventListener('scroll', requestArcUpdate);
      viewport.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', requestArcUpdate);
      section.classList.remove('mobile-arc-ready');
      mobileHeading.remove();
      cards.forEach((card, index) => {
        const stage = cardStages[index];
        card.removeAttribute('aria-current');
        card.style.removeProperty('--partner-arc-layer');
        stage?.style.removeProperty('--partner-arc-y');
        stage?.style.removeProperty('--partner-arc-z');
        stage?.style.removeProperty('--partner-arc-rotate-y');
        stage?.style.removeProperty('--partner-arc-rotate-z');
        stage?.style.removeProperty('--partner-arc-scale');
        stage?.style.removeProperty('--partner-arc-opacity');
      });
    };
  });

  const refresh = () => triggerRef.refresh();
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready?.then(refresh);
  window.setTimeout(refresh, 900);

  function applyLayoutPolish() {
    const styleId = 'partners-success-layout-polish';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @media (min-width: 861px) {
        .partners-success-pin {
          grid-template-columns: minmax(360px, 36vw) minmax(0, 1fr);
        }

        .partners-success-intro {
          overflow: hidden;
          padding-right: clamp(34px, 3vw, 58px);
        }

        .partners-success-intro h2 {
          width: 100%;
          max-width: 100%;
          font-size: clamp(50px, 4.9vw, 92px);
          line-height: .86;
          overflow-wrap: normal;
          word-break: normal;
        }

        .partners-viewport {
          padding-top: clamp(42px, 5.5vh, 62px);
          padding-bottom: clamp(92px, 12vh, 126px);
        }

        .partner-group {
          flex-basis: min(
            clamp(620px, 54vw, 860px),
            calc((100svh - 184px) * 1.28)
          );
        }
      }
    `;

    document.head.appendChild(style);
  }

  function splitHeading(element) {
    if (!element || element.dataset.rosterSplit === 'true') return;

    const label = element.innerText.trim().replace(/\s+/g, ' ');
    element.dataset.rosterSplit = 'true';
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

        const word = document.createElement('span');
        word.className = 'motion-word';
        word.setAttribute('aria-hidden', 'true');

        Array.from(part).forEach((character) => {
          const char = document.createElement('span');
          char.className = 'motion-char';
          char.textContent = character;
          word.appendChild(char);
        });

        fragment.appendChild(word);
      });

      node.replaceWith(fragment);
    });
  }

  function animateIntroduction() {
    const chars = heading ? heading.querySelectorAll('.motion-char') : [];
    const supporting = section.querySelectorAll(
      '.partners-success-intro .editorial-kicker, .partners-success-copy, .partners-success-progress'
    );

    if (chars.length) {
      gsapRef.fromTo(
        chars,
        {
          opacity: 0,
          rotateY: 88,
          transformPerspective: 900,
          transformOrigin: '50% 58%'
        },
        {
          opacity: 1,
          rotateY: 0,
          duration: .9,
          stagger: .014,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 82%',
            once: true
          }
        }
      );
    }

    if (supporting.length) {
      gsapRef.fromTo(
        supporting,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: .78,
          stagger: .08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true
          }
        }
      );
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  DS.initTeamRoster?.();
});
