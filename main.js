// PT Nails & Beauty — interactions
(function(){
  var nav=document.getElementById('nav'),navLinks=document.getElementById('navLinks'),navToggle=document.getElementById('navToggle');
  var onScroll=function(){ if(window.scrollY>40)nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  navToggle&&navToggle.addEventListener('click',function(){navLinks.classList.toggle('open');});
  navLinks&&navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){navLinks.classList.remove('open');});});

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.14,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // subtle parallax on hero decorative glows
  var d1=document.querySelector('.hero .d1'),d2=document.querySelector('.hero .d2');
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(y<900){ if(d1)d1.style.transform='translateY('+(y*0.18)+'px)'; if(d2)d2.style.transform='translateY('+(y*-0.12)+'px)'; }
  },{passive:true});
})();


/* Hero video — force muted autoplay. Safari (macOS + iOS) ignores the `autoplay` attribute
   and shows a paused frame + play button. WebKit blocks play() during page load but allows
   it once the load event fires, so we kick it off then and retry; a first-interaction
   fallback covers iOS Low Power Mode / "Auto-Play: Never". */
(function () {
  var v = document.querySelector('.hero-media video, .hero video, video[autoplay], video');
  if (!v) return;
  v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
  v.playsInline = true; v.setAttribute('playsinline', '');
  var play = function () { try { var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} };
  var tries = 0;
  var pump = function () { play(); if (v.paused && ++tries < 10) setTimeout(pump, 300); };
  if (document.readyState === 'complete') pump();
  else window.addEventListener('load', pump, { once: true });
  ['touchstart', 'pointerdown', 'click', 'scroll', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, play, { passive: true, once: true });
  });
})();
