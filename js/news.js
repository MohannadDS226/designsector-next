window.DS = window.DS || {};

DS.initNewsStory = function () {
  const cards = Array.from(document.querySelectorAll('[data-news-card]'));
  const features = Array.from(document.querySelectorAll('[data-news-feature]'));
  const autoplay = document.querySelector('[data-news-autoplay]');
  const timerLabel = autoplay?.querySelector('[data-news-timer-label]');
  const timerSeconds = autoplay?.querySelector('[data-news-timer-seconds]');
  const desktopQuery = window.matchMedia('(min-width: 861px)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!cards.length || !features.length) return;

  const duration = Number(autoplay?.dataset.autoplayDuration) || 8000;
  let activeIndex = 0;
  let timerStartedAt = 0;
  let timerElapsed = 0;
  let timerFrame = 0;
  let timerPaused = false;
  let observer;

  function activate(index) {
    if (!Number.isInteger(index) || index < 0 || index >= features.length) return;

    const changed = activeIndex !== index;
    activeIndex = index;

    features.forEach((feature, featureIndex) => {
      const active = featureIndex === index;
      feature.classList.toggle('is-active', active);
      feature.setAttribute('aria-hidden', String(!active));
    });

    cards.forEach((card, cardIndex) => {
      card.classList.toggle('is-active', cardIndex === index);
    });

    if (changed || !timerStartedAt) resetTimer();
  }

  function setTimerVisual(progress) {
    const clamped = Math.min(1, Math.max(0, progress));
    const remaining = Math.max(0, Math.ceil((duration * (1 - clamped)) / 1000));

    autoplay?.style.setProperty('--news-progress', String(clamped));
    if (timerSeconds) timerSeconds.textContent = String(remaining).padStart(2, '0');
  }

  function showFinalState() {
    autoplay?.classList.add('is-complete');
    if (timerLabel) timerLabel.textContent = 'Latest story';
    if (timerSeconds) timerSeconds.textContent = '—';
    autoplay?.style.setProperty('--news-progress', '1');
  }

  function resetTimer() {
    window.cancelAnimationFrame(timerFrame);
    timerStartedAt = 0;
    timerElapsed = 0;
    autoplay?.classList.remove('is-complete');
    if (timerLabel) timerLabel.textContent = 'Next story';
    setTimerVisual(0);

    if (activeIndex === cards.length - 1) {
      showFinalState();
      return;
    }

    if (desktopQuery.matches && !reducedMotionQuery.matches) {
      timerFrame = window.requestAnimationFrame(updateTimer);
    }
  }

  function scrollToStory(index) {
    const card = cards[index];
    if (!card) return;

    const cardTop = card.getBoundingClientRect().top + window.scrollY;
    const top = cardTop - Math.max(24, (window.innerHeight - card.offsetHeight) / 2);

    if (window.DS?.lenis) {
      window.DS.lenis.scrollTo(top, { duration:1.15 });
    } else {
      window.scrollTo({ top, behavior:'smooth' });
    }
  }

  function updateTimer(now) {
    if (!desktopQuery.matches || reducedMotionQuery.matches || document.hidden) {
      timerStartedAt = 0;
      timerFrame = window.requestAnimationFrame(updateTimer);
      return;
    }

    if (timerPaused || document.body.classList.contains('menu-open')) {
      timerStartedAt = 0;
      timerFrame = window.requestAnimationFrame(updateTimer);
      return;
    }

    if (!timerStartedAt) timerStartedAt = now;
    timerElapsed += now - timerStartedAt;
    timerStartedAt = now;

    const progress = timerElapsed / duration;
    setTimerVisual(progress);

    if (progress >= 1) {
      const nextIndex = activeIndex + 1;
      if (nextIndex < cards.length) {
        timerStartedAt = 0;
        timerElapsed = 0;
        scrollToStory(nextIndex);
      } else {
        showFinalState();
        return;
      }
    }

    timerFrame = window.requestAnimationFrame(updateTimer);
  }

  function pauseTimer() {
    timerPaused = true;
  }

  function resumeTimer() {
    timerPaused = false;
    timerStartedAt = 0;
  }

  activate(0);

  observer = new IntersectionObserver((entries) => {
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

  const resetFromManualInput = () => {
    if (!desktopQuery.matches || reducedMotionQuery.matches) return;
    resetTimer();
  };

  window.addEventListener('wheel', resetFromManualInput, { passive:true });
  window.addEventListener('touchstart', resetFromManualInput, { passive:true });
  window.addEventListener('keydown', (event) => {
    if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)) {
      resetFromManualInput();
    }
  });

  document.querySelectorAll('.news-feature a, .news-card a').forEach((link) => {
    link.addEventListener('mouseenter', pauseTimer);
    link.addEventListener('mouseleave', resumeTimer);
    link.addEventListener('focus', pauseTimer);
    link.addEventListener('blur', resumeTimer);
  });

  document.addEventListener('visibilitychange', () => {
    timerStartedAt = 0;
  });

  desktopQuery.addEventListener?.('change', resetTimer);
  reducedMotionQuery.addEventListener?.('change', resetTimer);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', DS.initNewsStory);
} else {
  DS.initNewsStory();
}
