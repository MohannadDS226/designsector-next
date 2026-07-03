window.DS = window.DS || {};

DS.initClipScrub = function () {
  const container = document.querySelector('[data-clip-scrub]');
  if (!container) return;

  const videos = Array.from(container.querySelectorAll('video'));
  if (!videos.length) return;

  const useMobileClips = window.matchMedia('(max-width: 860px)').matches;
  let loadedCount = 0;
  let activeIndex = 0;

  videos.forEach((video, index) => {
    const src = useMobileClips ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    if (!src) return;

    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = index <= 1 ? 'auto' : 'metadata';

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    video.addEventListener('loadedmetadata', () => {
      video.classList.add('has-loaded');
      loadedCount += 1;

      container.classList.remove('no-video');
      container.classList.add('is-ready');

      if (index === 0) {
        setActiveVideo(0);
        try { video.currentTime = 0.01; } catch (error) {}
      }

      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });

    video.addEventListener('error', () => {
      video.classList.add('has-error');

      const anyLoaded = videos.some((v) => v.classList.contains('has-loaded'));

      if (!anyLoaded && loadedCount === 0) {
        container.classList.add('no-video');
      }
    });

    try {
      video.load();
    } catch (error) {}
  });

  setActiveVideo(0);

  if (!window.gsap || !window.ScrollTrigger) return;

  ScrollTrigger.create({
    trigger: '.featured-project-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => scrubTo(self.progress)
  });

  function scrubTo(progress) {
    const count = videos.length;
    const raw = Math.min(progress * count, count - 0.0001);
    const index = Math.max(0, Math.floor(raw));
    const segmentProgress = raw - index;
    const active = videos[index];

    setActiveVideo(index);

    if (
      !active ||
      !active.classList.contains('has-loaded') ||
      !Number.isFinite(active.duration) ||
      active.duration <= 0
    ) {
      return;
    }

    const safeEnd = Math.max(0, active.duration - 0.05);
    const targetTime = Math.max(0, Math.min(safeEnd, segmentProgress * active.duration));

    try {
      if (Math.abs(active.currentTime - targetTime) > 0.06) {
        active.currentTime = targetTime;
      }
    } catch (error) {}
  }

  function setActiveVideo(index) {
    activeIndex = index;

    videos.forEach((video, i) => {
      const active = i === activeIndex;

      video.classList.toggle('is-active', active);

      if (!active) {
        try {
          video.pause();
        } catch (error) {}
      }
    });
  }
};

DS.initDisciplinePreviews = function () {
  const preview = document.querySelector('[data-discipline-preview]');
  const buttons = document.querySelectorAll('[data-discipline-list] button');
  if (!preview || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => activate(button));
    button.addEventListener('focus', () => activate(button));
    button.addEventListener('click', () => activate(button));
  });

  function activate(button) {
    buttons.forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');
    preview.style.backgroundImage = `url('${button.dataset.image}')`;
  }
};

DS.initWorks = function () {
  const preview = document.querySelector('[data-works-preview]');
  const meta = document.querySelector('[data-works-meta]');
  const buttons = document.querySelectorAll('[data-works-list] button');
  if (!preview || !meta || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => activate(button));
    button.addEventListener('focus', () => activate(button));
    button.addEventListener('click', () => activate(button));
  });

  function activate(button) {
    buttons.forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');

    preview.style.opacity = '0.18';

    setTimeout(() => {
      preview.src = button.dataset.image;
      preview.alt = button.dataset.title;
      preview.style.opacity = '1';
    }, 110);

    meta.innerHTML = `<h3>${button.dataset.title}</h3><p>${button.dataset.location}</p><p>${button.dataset.type}</p>`;
  }
};
