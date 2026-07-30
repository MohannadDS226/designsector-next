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
  const groups = Array.from(section.querySelectorAll('.partner-group'));
  const cards = Array.from(section.querySelectorAll('.partner-card'));
  const surfaces = Array.from(section.querySelectorAll('.partner-portrait-surface'));
  const gsapRef = window.gsap;
  const triggerRef = window.ScrollTrigger;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    gsapRef.fromTo(
      cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: .8,
        stagger: .045,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          once: true
        }
      }
    );
  });

  const refresh = () => triggerRef.refresh();
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready?.then(refresh);
  window.setTimeout(refresh, 900);

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