window.DS = window.DS || {};

window.DS.initVideoScrub = function () {
  const stack = document.querySelector('[data-clip-scrub]');
  const videos = stack ? Array.from(stack.querySelectorAll('.clip-video')) : [];

  if (!videos.length) return;

  const isMobile = window.matchMedia('(max-width: 760px)').matches;

  videos.forEach((video, index) => {
    const src = isMobile ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    if (!src) return;

    video.src = src;
    video.load();
    video.dataset.index = String(index);

    video.addEventListener('loadedmetadata', () => {
      video.classList.add('has-source');
      if (index === 0) video.classList.add('is-active');
    });

    video.addEventListener('error', () => {
      video.classList.remove('has-source');
    });
  });

  function activateVideo(activeIndex) {
    videos.forEach((video, index) => {
      video.classList.toggle('is-active', index === activeIndex);
      if (index !== activeIndex) video.pause();
    });
  }

  function setClipProgress(video, localProgress) {
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const safeProgress = Math.min(Math.max(localProgress, 0), 1);
    const targetTime = safeProgress * video.duration;

    try {
      video.currentTime = targetTime;
    } catch (error) {
      // Some browsers refuse currentTime before metadata is ready.
    }
  }

  if (!window.gsap || !window.ScrollTrigger) return;

  ScrollTrigger.create({
    trigger: '.featured-project-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const totalClips = videos.length;
      const rawIndex = Math.floor(self.progress * totalClips);
      const activeIndex = Math.min(rawIndex, totalClips - 1);
      const segmentSize = 1 / totalClips;
      const segmentStart = activeIndex * segmentSize;
      const localProgress = (self.progress - segmentStart) / segmentSize;
      const activeVideo = videos[activeIndex];

      activateVideo(activeIndex);
      setClipProgress(activeVideo, localProgress);
    },
  });
};

window.DS.initDisciplinePreviews = function () {
  const preview = document.querySelector('[data-discipline-preview]');
  const buttons = document.querySelectorAll('.discipline-list [data-image]');

  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (preview) preview.style.backgroundImage = `url('${btn.dataset.image}')`;
    });
  });
};

window.DS.initWorks = function () {
  const preview = document.querySelector('[data-works-preview]');
  const meta = document.querySelector('[data-works-meta]');
  const buttons = document.querySelectorAll('[data-works-list] button');

  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      if (preview) {
        preview.style.opacity = 0.2;
        setTimeout(() => {
          preview.src = btn.dataset.image;
          preview.style.opacity = 1;
        }, 120);
      }

      if (meta) {
        meta.innerHTML = `<h3>${btn.dataset.title}</h3><p>${btn.dataset.location}</p><p>${btn.dataset.type}</p>`;
      }
    });
  });
};
