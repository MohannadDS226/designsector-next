window.DS = window.DS || {};
window.DS.initSmoothScroll = function(){
  if(!window.Lenis) return null;
  const lenis = new Lenis({duration:1.12, smoothWheel:true, wheelMultiplier:0.88});
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  if(window.ScrollTrigger){ lenis.on('scroll', ScrollTrigger.update); }
  window.DS.lenis = lenis;
  return lenis;
};
