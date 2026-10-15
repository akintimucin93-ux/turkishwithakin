'use strict';
(()=>{
 const section=document.getElementById('testimonials');
 const grid=section?.querySelector('.aa-review-grid');
 if(!grid)return;
 const cards=[...grid.children];
 const previous=section.querySelector('[data-aa-action="previous"]');
 const next=section.querySelector('[data-aa-action="next"]');
 const play=section.querySelector('[data-aa-action="play"]');
 const counter=section.querySelector('.aa-review-counter');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let start=0,visible=2,timer=null,hovered=false,focused=false;
 const isTR=()=>document.documentElement.lang==='tr';
 function draw(){
   visible=window.matchMedia('(max-width:620px)').matches?1:2;
   for(let i=0;i<cards.length;i++){const card=cards[(start+i)%cards.length];card.hidden=i>=visible;grid.append(card);}
   counter.textContent=isTR()?`${cards.length} öğrenci yorumu`:`${cards.length} student comments`;
   play.textContent=isTR()?(timer?'Duraklat':'Oynat'):(timer?'Pause':'Play');
   play.setAttribute('aria-pressed',String(!!timer));
 }
 function stop(){if(timer)clearInterval(timer);timer=null;draw();}
 function move(step){start=(start+step+cards.length)%cards.length;draw();}
 previous.addEventListener('click',()=>{stop();move(-1);});
 next.addEventListener('click',()=>{stop();move(1);});
 play.addEventListener('click',()=>{if(timer){stop();return;}move(1);timer=setInterval(()=>{if(!hovered&&!focused&&!document.hidden)move(1);},6500);draw();});
 grid.addEventListener('mouseenter',()=>hovered=true);
 grid.addEventListener('mouseleave',()=>hovered=false);
 grid.addEventListener('focusin',()=>focused=true);
 grid.addEventListener('focusout',()=>focused=false);
 grid.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();stop();move(e.key==='ArrowRight'?1:-1);}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 window.addEventListener('resize',draw);
 window.addEventListener('site-language-changed',draw);
 reduced.addEventListener?.('change',()=>{if(reduced.matches)stop();});
 draw();
})();
