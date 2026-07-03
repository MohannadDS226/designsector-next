window.addEventListener('DOMContentLoaded',()=>{
  if(window.gsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }
  window.DS?.initSmoothScroll?.();
  window.DS?.initLoader?.();
  const introVideo=document.querySelector('[data-intro-video]'); if(introVideo){ introVideo.play?.().catch(()=>{}); }
  window.DS?.initNavigation?.();
  window.DS?.initManifesto?.();
  window.DS?.initVideoScrub?.();
  window.DS?.initDisciplinePreviews?.();
  window.DS?.initWorks?.();
  window.DS?.initOffices?.();
  if(window.gsap){ gsap.utils.toArray('.reveal,.reveal-media').forEach(el=>{ gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%'}}); }); }
  setTimeout(()=>window.ScrollTrigger && ScrollTrigger.refresh(),800);
});
