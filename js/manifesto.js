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
  if (!section || isMobile) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 48%',
      end: 'top 10%',
      scrub: true
    }
  })
    .fromTo('.shape-word-we', { x: 0 }, { x: '-15vw', ease: 'none' }, 0)
    .fromTo('.shape-word-shape', { x: 0 }, { x: '15vw', ease: 'none' }, 0);
};
