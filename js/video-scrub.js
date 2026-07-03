window.DS = window.DS || {};

DS.initClipScrub = function () {
  const container = document.querySelector('[data-clip-scrub]');
  if (!container) return;

  const videos = Array.from(container.querySelectorAll('video'));
  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  let usableVideos = [];

  videos.forEach((video, index) => {
    const src = isMobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    if (!src) return;
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.dataset.ready = 'false';

    video.addEventListener('loadedmetadata', () => {
      video.dataset.ready = 'true';
      usableVideos = videos.filter((v) => v.dataset.ready === 'true' && Number.isFinite(v.duration) && v.duration > 0);
      if (usableVideos.length && !container.classList.contains('is-ready')) {
        container.classList.add('is-ready');
        videos[0].classList.add('is-active');
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });

    video.addEventListener('error', () => {
      video.dataset.ready = 'error';
      usableVideos = videos.filter((v) => v.dataset.ready === 'true' && Number.isFinite(v.duration) && v.duration > 0);
      if (!usableVideos.length) container.classList.add('no-video');
    });
  });

  if (isMobile) {
    const first = videos[0];
    if (first) {
      first.classList.add('is-active');
      first.addEventListener('loadedmetadata', () => first.play().catch(() => {}), { once: true });
      first.loop = true;
    }
    return;
  }

  if (!window.gsap || !window.ScrollTrigger) return;

  ScrollTrigger.create({
    trigger: '.featured-project-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => scrubTo(self.progress)
  });

  function scrubTo(progress) {
    const ready = videos.filter((v) => v.dataset.ready === 'true' && Number.isFinite(v.duration) && v.duration > 0);
    if (!ready.length) return;

    const count = ready.length;
    const raw = Math.min(progress * count, count - 0.0001);
    const index = Math.floor(raw);
    const segmentProgress = raw - index;
    const active = ready[index];

    ready.forEach((video, i) => video.classList.toggle('is-active', i === index));

    const targetTime = Math.max(0, Math.min(active.duration - 0.04, segmentProgress * active.duration));
    try {
      if (Math.abs(active.currentTime - targetTime) > 0.08) active.currentTime = targetTime;
    } catch (error) {}
  }
};

DS.initDisciplinePreviews = function () {
  const preview = document.querySelector('[data-discipline-preview]');
  const buttons = document.querySelectorAll('[data-discipline-list] button');
  if (!preview || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => activate(button));
    button.addEventListener('focus', () => activate(button));
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
