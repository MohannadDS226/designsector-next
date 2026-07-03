window.DS = window.DS || {};

window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

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

  setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 800);
});

DS.initReveals = function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.utils.toArray('.reveal-up, .reveal-media').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 84%' }
    });
  });
};
