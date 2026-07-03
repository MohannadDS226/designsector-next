
window.DS = window.DS || {};
window.DS.initDisciplineSplit = function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  const section=document.querySelector('.disciplines-section');
  const left=document.querySelector('.split-title .word-left');
  const right=document.querySelector('.split-title .word-right');
  if(!section || !left || !right) return;
  gsap.timeline({
    scrollTrigger:{
      trigger:section,
      start:'top 75%',
      end:'top 25%',
      scrub:true,
      invalidateOnRefresh:true
    }
  })
  .to(left,{x:()=>{
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    return -Math.min(window.innerWidth * (mobile ? .12 : .28), mobile ? 54 : 520);
  },duration:1,ease:'none'},0)
  .to(right,{x:()=>{
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    return Math.min(window.innerWidth * (mobile ? .12 : .28), mobile ? 54 : 520);
  },duration:1,ease:'none'},0);
};

window.addEventListener('DOMContentLoaded',()=>{
  if(window.gsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }
  window.DS?.initSmoothScroll?.();
  window.DS?.initLoader?.();
  const introVideo=document.querySelector('[data-intro-video]'); if(introVideo){ introVideo.play?.().catch(()=>{}); }
  window.DS?.initNavigation?.();
  window.DS?.initManifesto?.();
  window.DS?.initVideoScrub?.();
  window.DS?.initDisciplineSplit?.();
  window.DS?.initDisciplinePreviews?.();
  window.DS?.initWorks?.();
  window.DS?.initOffices?.();
  if(window.gsap){ gsap.utils.toArray('.reveal,.reveal-media').forEach(el=>{ gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%'}}); }); }
  setTimeout(()=>window.ScrollTrigger && ScrollTrigger.refresh(),800);
});
