/* Directional horror transitions driven by native scrolling; no wheel/touch interception. */
'use strict';
(()=>{
 const root=document.documentElement,main=document.querySelector('main');
 if(!main)return;
 const sections=[...main.querySelectorAll(':scope > section[id]')];
 const veil=document.createElement('div');veil.className='scroll-veil';veil.setAttribute('aria-hidden','true');veil.innerHTML='<div class="scroll-smear"></div><div class="scroll-tear"></div>';document.body.append(veil);
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let lastY=Math.max(0,scrollY),direction=1,velocity=0,drag=0,frame=0,lastInput=0,active=null,lastReveal=0,animations=[],veilRun=0;
 const disabled=()=>media.matches||root.classList.contains('no-motion');
 function sectionAt(y){const line=y+innerHeight*.54;let found=sections[0];for(const s of sections){if(s.offsetTop<=line)found=s;else break}return found}
 active=sectionAt(lastY);
 function cancel(){for(const a of animations)a.cancel();animations=[];cancelAnimationFrame(frame);frame=0;velocity=drag=0;main.style.removeProperty('--scroll-drag');main.style.removeProperty('--scroll-lean');main.classList.remove('scroll-moving');veil.classList.remove('scroll-running');}
 function reveal(section,dir){
  if(disabled()||performance.now()-lastReveal<500||!section)return;
  // Do not pull focus or displace the game while somebody is playing it.
  if(section.contains(document.activeElement)&&document.activeElement.closest('.game-shell'))return;
  lastReveal=performance.now();for(const a of animations)a.cancel();animations=[];
  veil.dataset.direction=dir>0?'down':'up';veil.classList.add('scroll-running');
  const serial=++veilRun;
  const sweep=veil.animate([
   {transform:`translateY(${dir>0?-115:115}%)`,opacity:0},
   {transform:`translateY(${dir>0?-35:35}%)`,opacity:.62,offset:.27},
   {transform:`translateY(${dir>0?45:-45}%)`,opacity:.42,offset:.63},
   {transform:`translateY(${dir>0?115:-115}%)`,opacity:0}
  ],{duration:720,easing:'cubic-bezier(.18,.65,.25,1)'});
  const entrance=section.animate([
   {transform:`translateY(${dir*34}px) skewY(${dir*-.3}deg)`,filter:'brightness(.72)'},
   {transform:'translateY(0) skewY(0)',filter:'brightness(1)'}
  ],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
  animations.push(sweep,entrance);
  sweep.finished.then(()=>{if(serial===veilRun)veil.classList.remove('scroll-running')}).catch(()=>{});
 }
 function tick(now){
  if(disabled()){cancel();return}
  const idle=now-lastInput>75;velocity*=idle?.7:.86;
  const target=idle?0:Math.max(-13,Math.min(13,velocity*.24));drag+=(target-drag)*.18;
  main.style.setProperty('--scroll-drag',drag.toFixed(2)+'px');main.style.setProperty('--scroll-lean',(drag*.009).toFixed(3)+'deg');
  if(Math.abs(drag)>.05||Math.abs(velocity)>.1||!idle){frame=requestAnimationFrame(tick)}else{main.style.removeProperty('--scroll-drag');main.style.removeProperty('--scroll-lean');main.classList.remove('scroll-moving');frame=0}
 }
 function onScroll(){
  const y=Math.max(0,scrollY),delta=y-lastY;lastY=y;
  if(disabled()){active=sectionAt(y);return}
  if(Math.abs(delta)<.5)return;
  direction=delta>0?1:-1;velocity=Math.max(-60,Math.min(60,delta));lastInput=performance.now();
  const next=sectionAt(y);if(next!==active){active=next;reveal(next,direction)}
  main.classList.add('scroll-moving');if(!frame)frame=requestAnimationFrame(tick);
 }
 addEventListener('scroll',onScroll,{passive:true});
 addEventListener('resize',()=>{active=sectionAt(Math.max(0,scrollY))},{passive:true});
 media.addEventListener('change',()=>{if(disabled())cancel()});
 new MutationObserver(()=>{if(disabled())cancel()}).observe(root,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel()});
})();
