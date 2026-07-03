window.DS = window.DS || {};
window.DS.initManifesto = function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  const section=document.querySelector('.manifesto-section'); if(!section) return;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'+=220%',scrub:true,pin:true,invalidateOnRefresh:true}})
    .from('.manifesto-line',{y:isMobile ? 44 : 80,opacity:0,stagger:.08,duration:.18})
    .to('.line-design',{y:()=>isMobile ? '-24vh' : '-34vh',duration:.55},.28)
    .to('.line-build',{scale:isMobile ? .86 : .78,opacity:.72,duration:.55},.28)
    .to('.line-give',{y:()=>isMobile ? '24vh' : '34vh',duration:.55},.28)
    .to('.manifesto-nav',{opacity:1,y:0,duration:.38},.52)
    .to('.manifesto-nav',{y:()=>isMobile ? '-28vh' : '-40vh',scale:isMobile ? .92 : .82,duration:.44},.78);
};
