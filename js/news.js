window.DS = window.DS || {};

DS.initNewsStory = function () {
  const cards = Array.from(document.querySelectorAll('[data-news-card]'));
  const features = Array.from(document.querySelectorAll('[data-news-feature]'));

  if (!cards.length || !features.length) return;

  function activate(index) {
    features.forEach((feature, featureIndex) => {
      const active = featureIndex === index;
      feature.classList.toggle('is-active', active);
      feature.setAttribute('aria-hidden', String(!active));
    });

    cards.forEach((card, cardIndex) => {
      card.classList.toggle('is-active', cardIndex === index);
    });
  }

  activate(0);

  if (!window.matchMedia('(min-width: 861px)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const index = Number(visible.target.dataset.newsCard);
    if (Number.isInteger(index)) activate(index);
  }, {
    root:null,
    threshold:[0.35,0.5,0.65],
    rootMargin:'-22% 0px -22% 0px'
  });

  cards.forEach((card) => observer.observe(card));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', DS.initNewsStory);
} else {
  DS.initNewsStory();
}
