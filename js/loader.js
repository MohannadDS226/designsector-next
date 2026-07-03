window.DS = window.DS || {};
window.DS.initLoader = function(){
  const loader=document.querySelector('.site-loader'); if(!loader) return;
  const hide=()=>loader.classList.add('is-hidden');
  if(window.gsap){
    const tl=gsap.timeline({onComplete:()=>setTimeout(hide,180)});
    tl.to('.loader-mark',{opacity:1,y:0,duration:.7,ease:'power3.out'})
      .to('.loader-line',{height:90,duration:.65,ease:'power3.inOut'},'-=.15')
      .to('.loader-wordmark',{opacity:1,duration:.65,ease:'power2.out'},'-=.15')
      .to('.loader-inner',{opacity:0,y:-12,duration:.5,ease:'power2.in'},'+=.35');
  } else { setTimeout(hide,900); }
};
