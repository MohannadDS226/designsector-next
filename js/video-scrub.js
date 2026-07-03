window.DS = window.DS || {};
window.DS.initVideoScrub = function(){
  const video=document.querySelector('[data-scrub-video]'); if(!video) return;
  const desktop=video.dataset.desktopSrc, mobile=video.dataset.mobileSrc;
  const src = window.matchMedia('(max-width: 760px)').matches ? mobile : desktop;
  if(src){ video.src=src; video.load(); }
  video.addEventListener('loadedmetadata',()=>{ video.classList.add('has-source'); setup(); },{once:true});
  video.addEventListener('error',()=>{ video.classList.remove('has-source'); });
  function setup(){
    if(!window.gsap || !window.ScrollTrigger || !video.duration) return;
    ScrollTrigger.create({trigger:'.featured-project-section',start:'top top',end:'bottom bottom',scrub:true,onUpdate:self=>{ try{ video.currentTime = self.progress * video.duration; }catch(e){} }});
  }
};
window.DS.initDisciplinePreviews = function(){
  const preview=document.querySelector('[data-discipline-preview]');
  const buttons=document.querySelectorAll('.discipline-list [data-image]');
  buttons.forEach(btn=>btn.addEventListener('mouseenter',()=>{ buttons.forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); if(preview) preview.style.backgroundImage=`url('${btn.dataset.image}')`; }));
};
window.DS.initWorks = function(){
  const preview=document.querySelector('[data-works-preview]'); const meta=document.querySelector('[data-works-meta]'); const buttons=document.querySelectorAll('[data-works-list] button');
  buttons.forEach(btn=>btn.addEventListener('mouseenter',()=>{ buttons.forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); if(preview){ preview.style.opacity=.2; setTimeout(()=>{ preview.src=btn.dataset.image; preview.style.opacity=1; },120); } if(meta){ meta.innerHTML=`<h3>${btn.dataset.title}</h3><p>${btn.dataset.location}</p><p>${btn.dataset.type}</p>`; } }));
};
