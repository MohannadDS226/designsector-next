window.DS = window.DS || {};

DS.initSmoothScroll = function () {
  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isMobile || reducedMotion || !window.Lenis) return;

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    wheelMultiplier: 0.86
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  window.DS.lenis = lenis;
};
