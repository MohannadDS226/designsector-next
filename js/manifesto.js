window.DS = window.DS || {};

DS.initManifesto = function () {
  if (!window.gsap || !window.ScrollTrigger) return;

  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const section = document.querySelector('.manifesto-section');

  gsap.set('.manifesto-line', { opacity: 1 });

  if (!section || isMobile) {
    gsap.set('.manifesto-line', { y: 0, scale: 1 });
    return;
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=170%',
      scrub: true,
      pin: true
    }
  })
    .from('.manifesto-line', { opacity: 0, y: 64, stagger: 0.08, duration: 0.24 })
    .to('.manifesto-design', { y: '-22vh', duration: 0.58 }, 0.34)
    .to('.manifesto-build', { scale: 0.82, opacity: 0.72, duration: 0.58 }, 0.34)
    .to('.manifesto-give', { y: '22vh', duration: 0.58 }, 0.34);
};

DS.initShapeTitle = function () {
  if (!window.gsap || !window.ScrollTrigger) return;

  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const section = document.querySelector('.disciplines-section');
  const layout = document.querySelector('.disciplines-layout');
  const buttons = document.querySelectorAll('.discipline-list button');

  if (!section || !layout || !buttons.length) return;

  if (isMobile) {
    gsap.set(layout, { opacity: 1, y: 0 });
    gsap.set(buttons, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(layout, { opacity: 0, y: 140 });
  gsap.set(buttons, { opacity: 0, y: 60 });

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=160%',
      scrub: true,
      pin: true
    }
  })
    .fromTo(
      '.shape-word-we',
      { x: 0, opacity: 1 },
      { x: '-24vw', opacity: 0, ease: 'none' },
      0.05
    )
    .fromTo(
      '.shape-word-shape',
      { x: 0, opacity: 1 },
      { x: '24vw', opacity: 0, ease: 'none' },
      0.05
    )
    .to(
      layout,
      { opacity: 1, y: 0, ease: 'none' },
      0.25
    )
    .to(
      buttons,
      { opacity: 1, y: 0, stagger: 0.04, ease: 'none' },
      0.32
    );
};
