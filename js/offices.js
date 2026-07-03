window.DS = window.DS || {};

DS.initOffices = function () {
  const cards = document.querySelectorAll('.office-card');
  const visual = document.querySelector('[data-office-visual]');
  if (!cards.length) return;

  updateTimes();
  setInterval(updateTimes, 60000);

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => activate(card));
    card.addEventListener('focusin', () => activate(card));
  });

  function updateTimes() {
    cards.forEach((card) => {
      const zone = card.dataset.timezone;
      const timeEl = card.querySelector('.office-time');
      if (!zone || !timeEl) return;
      timeEl.textContent = new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date());
    });
  }

  function activate(card) {
    cards.forEach((item) => item.classList.remove('is-active'));
    card.classList.add('is-active');
    if (!visual) return;
    visual.style.opacity = '0.2';
    setTimeout(() => {
      visual.src = card.dataset.image;
      visual.alt = `${card.dataset.office} office visual`;
      visual.style.opacity = '1';
    }, 110);
  }
};
