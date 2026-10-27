'use strict';
/* Video-only motion: the footage performs the attack, never a transformed still. */
(()=>{
 const overlay=document.querySelector('#scare-overlay'),stage=overlay?.querySelector('.scare-stage');
 if(!stage)return;
 const ids=['jason','freddy','myers','creeper'];
 let session=0,active=null,frame=0,watchdog=0,fallbackTimer=0;
 const valid=entry=>entry&&typeof entry.src==='string'&&entry.src.length>0&&Number.isFinite(entry.durationMs)&&entry.durationMs>=1000&&entry.durationMs<=8000&&Number.isFinite(entry.impactMs)&&entry.impactMs>=0&&entry.impactMs<entry.durationMs;
 function entry(i){return window.DGScareReelManifest?.[ids[i]]}
 function stop(){session++;cancelAnimationFrame(frame);clearTimeout(watchdog);clearTimeout(fallbackTimer);if(active){active.pause();active.removeAttribute('src');active.load();active=null}delete overlay.dataset.reel;stage.replaceChildren()}
 function start(i,{onImpact=()=>{},onEnd=()=>{}}={}){
  stop();const config=entry(i);if(!valid(config))return 0;
  const token=session;let failed=false,impacted=false,finished=false;
  const impact=()=>{if(!impacted&&token===session){impacted=true;onImpact()}};
  const finish=()=>{if(finished||token!==session)return;finished=true;onEnd()};
  const fallback=()=>{if(failed||finished||token!==session)return;failed=true;cancelAnimationFrame(frame);clearTimeout(watchdog);if(active){active.pause();active.removeAttribute('src');active.load();active=null}delete overlay.dataset.reel;const duration=window.DGScares?.start(i)||1500;impact();fallbackTimer=setTimeout(finish,duration)};
  const wrap=document.createElement('div');wrap.className='scare-reel';
  const video=document.createElement('video');video.className='scare-reel-video';video.muted=true;video.defaultMuted=true;video.playsInline=true;video.preload='auto';video.controls=false;video.disablePictureInPicture=true;video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');video.poster=config.poster||`assets/${ids[i]}-encounter.webp`;video.style.objectPosition=config.focalPoint||'50% 50%';video.src=matchMedia('(max-width:700px)').matches&&config.portraitSrc?config.portraitSrc:config.src;
  wrap.append(video);stage.replaceChildren(wrap);active=video;overlay.dataset.reel=ids[i];overlay.querySelector('strong').textContent='';
  video.addEventListener('error',fallback,{once:true});video.addEventListener('ended',finish,{once:true});
  video.addEventListener('playing',()=>{if(token!==session||failed)return;clearTimeout(watchdog);wrap.classList.add('is-playing')});
  const tick=()=>{if(token!==session||failed||finished)return;if(video.currentTime*1000>=config.impactMs)impact();if(video.currentTime*1000>=config.durationMs){finish();return}frame=requestAnimationFrame(tick)};
  frame=requestAnimationFrame(tick);watchdog=setTimeout(fallback,1800);
  try{Promise.resolve(video.play()).catch(fallback)}catch{fallback()}
  return config.durationMs+2000;
 }
 window.DGScareReels={has:i=>Boolean(valid(entry(i))),start,stop};
})();
