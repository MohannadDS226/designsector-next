window.DS = window.DS || {};

DS.initManifesto = function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const section = document.querySelector('.manifesto-section');
  if (!section || isMobile) {
    gsap.set('.manifesto-line', { opacity: 1, y: 0 });
    gsap.set('.manifesto-menu', { opacity: 1, y: 0 });
    return;
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=220%',
      scrub: true,
      pin: true
    }
  })
    .from('.manifesto-line', { opacity: 0, y: 80, stagger: 0.08, duration: 0.2 })
    .to('.manifesto-design', { y: '-34vh', duration: 0.55 }, 0.32)
    .to('.manifesto-build', { opacity: 0.68, scale: 0.78, duration: 0.55 }, 0.32)
    .to('.manifesto-give', { y: '34vh', duration: 0.55 }, 0.32)
    .to('.manifesto-menu', { opacity: 1, y: 0, duration: 0.32 }, 0.58)
    .to('.manifesto-menu', { y: '-38vh', scale: 0.84, duration: 0.38 }, 0.82);
};

DS.initShapeTitle = function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const section = document.querySelector('.disciplines-section');
  if (!section || isMobile) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 45%',
      end: 'top top',
      scrub: true
    }
  })
    .fromTo('.shape-word-we', { x: 0 }, { x: '-18vw', ease: 'none' }, 0)
    .fromTo('.shape-word-shape', { x: 0 }, { x: '18vw', ease: 'none' }, 0);
};
