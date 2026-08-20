window.DS = window.DS || {};

DS.initMenaMap = function () {
  const map = document.querySelector('[data-mena-map]');
  if (!map) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsapRef = window.gsap;
  const triggerRef = window.ScrollTrigger;

  if (reducedMotion || !gsapRef) {
    map.classList.add('is-static');
    return;
  }

  const egypt = map.querySelector('[data-mena-country="egypt"]');
  const saudi = map.querySelector('[data-mena-country="saudi"]');
  const egyptLabel = map.querySelector('[data-mena-label="egypt"]');
  const saudiLabel = map.querySelector('[data-mena-label="saudi"]');
  const route = map.querySelector('[data-mena-route]');
  const markers = map.querySelectorAll('[data-mena-marker]');
  const grid = map.querySelector('.mena-map__grid');

  if (!egypt || !saudi || !egyptLabel || !saudiLabel || !route) return;

  if (triggerRef) gsapRef.registerPlugin(triggerRef);
  map.classList.add('is-animated');

  [egypt, saudi].forEach((country) => {
    const countryLength = country.getTotalLength();
    gsapRef.set(country, {
      strokeDasharray: `${countryLength} ${countryLength}`,
      strokeDashoffset: countryLength
    });
  });
  const routeLength = route.getTotalLength();
  gsapRef.set(route, {
    strokeDasharray: `${routeLength} ${routeLength}`,
    strokeDashoffset: routeLength
  });
  gsapRef.set([egyptLabel, saudiLabel], { autoAlpha: 0, y: 12 });
  gsapRef.set(markers, { autoAlpha: 0, scale: 0, transformOrigin: 'center center' });
  gsapRef.set(grid, { autoAlpha: .15 });

  const timeline = gsapRef.timeline({
    paused: true,
    defaults: { ease: 'power2.out' }
  });

  timeline
    .to(grid, { autoAlpha: 1, duration: .65 })
    .to(egypt, { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' }, .12)
    .to(egyptLabel, { autoAlpha: 1, y: 0, duration: .42 }, '>-0.08')
    .to(saudi, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }, '+=.08')
    .to(saudiLabel, { autoAlpha: 1, y: 0, duration: .42 }, '>-0.08')
    .to(route, { strokeDashoffset: 0, duration: .8, ease: 'power1.inOut' }, '+=.08')
    .set(route, { clearProps: 'strokeDasharray,strokeDashoffset' })
    .to(markers, {
      autoAlpha: 1,
      scale: 1,
      duration: .48,
      stagger: .12,
      ease: 'back.out(1.8)'
    }, '>-0.24');

  if (triggerRef) {
    triggerRef.create({
      trigger: map,
      start: 'top 78%',
      once: true,
      onEnter: () => timeline.play()
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    timeline.play();
    observer.disconnect();
  }, { threshold: .28 });

  observer.observe(map);
};

window.addEventListener('DOMContentLoaded', () => {
  DS.initMenaMap?.();
});
