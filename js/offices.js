window.DS = window.DS || {};
window.DS.initOffices = function(){
  const offices=document.querySelectorAll('.office-item'); const visual=document.querySelector('[data-office-visual]');
  function updateTimes(){ offices.forEach(office=>{ const tz=office.dataset.timezone; const el=office.querySelector('.office-time'); if(!tz||!el) return; el.textContent=new Intl.DateTimeFormat('en-US',{timeZone:tz,hour:'2-digit',minute:'2-digit',hour12:true}).format(new Date()); }); }
  updateTimes(); setInterval(updateTimes,60000);
  offices.forEach(office=>{ office.addEventListener('mouseenter',()=>{ offices.forEach(o=>o.classList.remove('is-active')); office.classList.add('is-active'); if(visual){ visual.style.opacity=.2; setTimeout(()=>{ visual.src=office.dataset.image; visual.alt=office.dataset.office+' office visual'; visual.style.opacity=1; },120); } }); });
};
