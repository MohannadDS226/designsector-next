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

  const section = document.querySelector('.disciplines-section');
  const title = document.querySelector('.shape-title');
  const wordWe = document.querySelector('.shape-word-we');
  const wordShape = document.querySelector('.shape-word-shape');
  const layout = document.querySelector('.disciplines-layout');
  const buttons = document.querySelectorAll('.discipline-list button');
  const preview = document.querySelector('.discipline-preview');

  if (!section || !title || !wordWe || !wordShape || !layout || !buttons.length) return;

  const isTablet = window.matchMedia('(max-width:1100px)').matches;
  const isPhone = window.matchMedia('(max-width:520px)').matches;

  const moveAmount = isPhone ? '42vw' : isTablet ? '34vw' : '24vw';
  const startY = isTablet ? '26vh' : 140;
  const endDistance = isTablet ? '+=190%' : '+=160%';

  gsap.set(title, { opacity: 1 });
  gsap.set(wordWe, { x: 0, opacity: 1 });
  gsap.set(wordShape, { x: 0, opacity: 1 });

  gsap.set(layout, {
    opacity: 0,
    y: startY
  });

  gsap.set(buttons, {
    opacity: 0,
    y: isTablet ? 44 : 60
  });

  if (preview) {
    gsap.set(preview, {
      opacity: isTablet ? 0 : 1,
      y: isTablet ? 36 : 0
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: endDistance,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  tl.fromTo(
    wordWe,
    { x: 0, opacity: 1 },
    { x: `-${moveAmount}`, opacity: 0, ease: 'none' },
    0.04
  )
  .fromTo(
    wordShape,
    { x: 0, opacity: 1 },
    { x: moveAmount, opacity: 0, ease: 'none' },
    0.04
  )
  .to(
  layout,
  { opacity: 1, y: isPhone ? '-12vh' : '-28vh', ease: 'none' },
  0.18
)
  .to(
    buttons,
    { opacity: 1, y: 0, stagger: 0.035, ease: 'none' },
    0.22
  );

  if (preview) {
    tl.to(
      preview,
      { opacity: 1, y: 0, ease: 'none' },
      0.58
    );
  }
};
