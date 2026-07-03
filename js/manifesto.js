window.DS = window.DS || {};
window.DS.initManifesto = function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  const section=document.querySelector('.manifesto-section'); if(!section) return;
  gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'+=220%',scrub:true,pin:true}})
    .from('.manifesto-line',{y:80,opacity:0,stagger:.08,duration:.18})
    .to('.line-design',{y:'-34vh',duration:.55},.28)
    .to('.line-build',{scale:.78,opacity:.72,duration:.55},.28)
    .to('.line-give',{y:'34vh',duration:.55},.28)
    .to('.manifesto-nav',{opacity:1,y:0,duration:.38},.52)
    .to('.manifesto-nav',{y:'-40vh',scale:.82,duration:.44},.78);
};
