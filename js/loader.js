window.DS = window.DS || {};
window.DS.initLoader = function(){
  const loader=document.querySelector('.site-loader'); if(!loader) return;
  const hide=()=>loader.classList.add('is-hidden');
  if(window.gsap){
    const tl=gsap.timeline({onComplete:()=>setTimeout(hide,140)});
    tl.to('.loader-wordmark',{opacity:1,y:0,duration:.75,ease:'power3.out'})
      .to('.loader-wordmark',{opacity:0,y:-10,duration:.45,ease:'power2.in'},'+=.45');
  } else { setTimeout(hide,900); }
};
