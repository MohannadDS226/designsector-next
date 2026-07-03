window.DS = window.DS || {};
window.DS.initNavigation = function(){
  const header=document.querySelector('[data-header]');
  const toggle=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('[data-nav]');
  if(toggle && nav){ toggle.addEventListener('click',()=>nav.classList.toggle('is-open')); nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('is-open'))); }
  const update=()=>{ if(!header) return; header.classList.toggle('is-scrolled', window.scrollY>70); };
  window.addEventListener('scroll',update,{passive:true}); update();
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{ const id=a.getAttribute('href'); if(id.length<2) return; const el=document.querySelector(id); if(!el) return; e.preventDefault(); if(window.DS.lenis){ window.DS.lenis.scrollTo(el,{offset:0}); } else { el.scrollIntoView({behavior:'smooth'}); } });
  });
};
