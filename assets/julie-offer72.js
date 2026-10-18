/* masterclass-72hours: fixed offer strip with a 72-hour countdown per visitor (localStorage). Appearance only. No tracking, no network, no checkout code. */
(function(){
  'use strict';
  /* ONE universal deadline for every visitor: campaign starts Sun 18 Oct 2026 16:00 Israel time (13:00 UTC), ends exactly 72 hours later, Wed 21 Oct 2026 16:00 Israel time. Before the start it holds at 72:00:00. */
  var WINDOW=72*3600*1000, START=Date.UTC(2026,9,18,13,0,0), end=START+WINDOW;
  try{ localStorage.removeItem('lla_offer72_end_v1'); }catch(e){}

  var strip=document.createElement('aside');
  strip.className='o72-strip'; strip.id='o72'; strip.setAttribute('role','status'); strip.setAttribute('aria-label','72-hour community offer');
  strip.innerHTML=
    '<div class="o72-head"><span class="o72-dot" aria-hidden="true"></span>'+
      '<span class="o72-title"><b>36% off</b> community discount</span>'+
      '<span class="o72-sub">For students, alumni &amp; friends of eTeacher Group schools</span>'+
    '</div>'+
    '<span class="o72-sep" aria-hidden="true"></span>'+
    '<div class="o72-cd"><span class="o72-cd-label">Ends in</span>'+
      '<span class="o72-time" id="o72Time"><span><span id="o72h">72</span><small>HRS</small></span><i>:</i><span><span id="o72m">00</span><small>MIN</small></span><i>:</i><span><span id="o72s">00</span><small>SEC</small></span></span>'+
    '</div>'+
    '<a class="o72-cta" href="#packages"><span class="o72-cta-label">Claim my<span class="o72-cta-long"> community</span> seat</span><span class="arr">&rarr;</span></a>';
  document.body.insertBefore(strip, document.body.firstChild);

  var h=document.getElementById('o72h'), m=document.getElementById('o72m'), s=document.getElementById('o72s');
  function pad(n){ return (n<10?'0':'')+n; }
  function tick(){
    var now=Date.now(), d=now<START?WINDOW:Math.max(0,end-now);
    h.textContent=pad(Math.floor(d/3600000));
    m.textContent=pad(Math.floor(d%3600000/60000));
    s.textContent=pad(Math.floor(d%60000/1000));
  }
  tick(); setInterval(tick,1000);

  /* strip CTA scrolls to the pricing cards (same anchor as the existing nav/floater links) */
  function go(ev){
    var t=document.getElementById('packages'); if(!t) return;
    ev.preventDefault();
    if(window.__lenis&&window.__lenis.scrollTo){ window.__lenis.scrollTo(t,{offset:-(100+strip.offsetHeight)}); }
    else { t.scrollIntoView({behavior:'smooth',block:'start'}); }
  }
  strip.querySelector('.o72-cta').addEventListener('click',go);
  /* phones: the CTA pill is hidden, the whole strip is the tap target */
  strip.addEventListener('click',function(ev){ if(window.matchMedia&&matchMedia('(max-width:760px)').matches) go(ev); });
})();
