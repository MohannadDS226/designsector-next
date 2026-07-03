window.DS = window.DS || {};

DS.initLoader = function () {
  const loader = document.querySelector('[data-loader]');
  if (!loader) return;

  const hide = () => loader.classList.add('is-hidden');

  if (!window.gsap) {
    setTimeout(hide, 900);
    return;
  }

  gsap.timeline({ onComplete: () => setTimeout(hide, 130) })
    .to('.loader-logo', { opacity: 1, y: 0, duration: 0.62, ease: 'power3.out' })
    .to('.loader-rule', { width: '100%', duration: 0.58, ease: 'power3.inOut' }, '-=0.2')
    .to('.loader-box', { opacity: 0, y: -10, duration: 0.42, ease: 'power2.in' }, '+=0.25');
};
