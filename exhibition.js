'use strict';
(()=>{
 const q=s=>document.querySelector(s),root=document.documentElement,media=matchMedia('(prefers-reduced-motion: reduce)');
 const calm=()=>media.matches||root.classList.contains('no-motion');
 const hero=q('.hero'),stage=q('.hero-reveal-stage'),split=q('#hero-split'),readout=q('#hero-split-value');
 function splitSignal(){stage.style.setProperty('--split',split.value+'%');readout.value=split.value+' / '+(100-Number(split.value));}
 split.addEventListener('input',splitSignal);splitSignal();
 let pointerFrame=0,pointer={x:.5,y:.5};
 hero.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||calm())return;const r=hero.getBoundingClientRect();pointer={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{stage.style.setProperty('--hero-x',((pointer.x-.5)*-14).toFixed(2)+'px');stage.style.setProperty('--hero-y',((pointer.y-.5)*-10).toFixed(2)+'px');stage.style.setProperty('--light-x',(pointer.x*100).toFixed(1)+'%');stage.style.setProperty('--light-y',(pointer.y*100).toFixed(1)+'%');pointerFrame=0})},{passive:true});
 hero.addEventListener('pointerleave',()=>{stage.style.setProperty('--hero-x','0px');stage.style.setProperty('--hero-y','0px')});
 let nightmare=false;try{nightmare=localStorage.getItem('dg-exhibition-perception')==='nightmare'}catch{}
 function perception(){root.dataset.perception=nightmare?'nightmare':'reality';q('#perception-toggle').setAttribute('aria-pressed',String(nightmare));q('#perception-label').textContent=nightmare?'Nightmare':'Reality';}
 q('#perception-toggle').addEventListener('click',()=>{nightmare=!nightmare;perception();try{localStorage.setItem('dg-exhibition-perception',root.dataset.perception)}catch{}});perception();
 const dock=q('.exhibition-controls');['scare-toggle','sound-toggle','motion-toggle'].forEach(id=>{const b=q('#'+id);if(b)dock.append(b)});
 const index=q('#chapter-index');let opener=null;
 q('#index-open').addEventListener('click',()=>{opener=document.activeElement;index.showModal();document.body.classList.add('modal-open');q('#index-close').focus()});
 q('#index-close').addEventListener('click',()=>index.close());
 index.addEventListener('close',()=>{if(!q('#case-file').open)document.body.classList.remove('modal-open');opener?.focus({preventScroll:true})});
 index.querySelectorAll('a').forEach(a=>{const preview=()=>{q('#index-preview-image').src='assets/'+a.dataset.preview+'.webp'};a.addEventListener('pointerenter',preview);a.addEventListener('focus',preview);a.addEventListener('click',()=>index.close())});
 const strip=q('#character-filmstrip');function moveFilm(dir){const card=strip.querySelector('.specimen');strip.scrollBy({left:dir*(card.getBoundingClientRect().width+30),behavior:calm()?'instant':'smooth'})}
 q('#filmstrip-prev').addEventListener('click',()=>moveFilm(-1));q('#filmstrip-next').addEventListener('click',()=>moveFilm(1));
 strip.addEventListener('keydown',e=>{if(e.target!==strip)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveFilm(e.key==='ArrowRight'?1:-1)}});
 const sections=[...document.querySelectorAll('main > section[id]')],rail=[...document.querySelectorAll('.chapter-rail a')];
 const labels={home:'THE OPENING',manifesto:'THE PROLOGUE',work:'THE EVIDENCE',icons:'THE NIGHTMARES',about:'THE ARTIST',projects:'THE ARCADE',lab:'THE INTERFERENCE',contact:'MAKE CONTACT'};
 let scrollFrame=0;
 function chapter(){const max=root.scrollHeight-innerHeight,progress=max>0?Math.min(1,Math.max(0,scrollY/max)):0;root.style.setProperty('--read-progress',String(progress));if(!calm()){document.querySelectorAll('.exhibition-cases .art-image').forEach(image=>{const r=image.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)image.style.setProperty('--image-drift',Math.max(-18,Math.min(18,(.5-(r.top+r.height*.5)/innerHeight)*24)).toFixed(2)+'px')})}let current=sections[0];const line=scrollY+innerHeight*.4;for(const s of sections){if(s.offsetTop<=line)current=s;else break}rail.forEach((a,i)=>{const on=a.hash==='#'+current.id;a.classList.toggle('active',on);if(on){a.setAttribute('aria-current','location');q('#chapter-readout').textContent=String(i).padStart(2,'0')+' / '+labels[current.id]}else a.removeAttribute('aria-current')});scrollFrame=0}
 addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(chapter)},{passive:true});addEventListener('resize',chapter,{passive:true});chapter();
 const reveals=[...document.querySelectorAll('.title-row,.about-copy h2,.contact h2,.manifesto h2')];reveals.forEach(el=>el.classList.add('reveal-block'));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-frame');observer.unobserve(e.target)}})},{threshold:.12});reveals.forEach(el=>observer.observe(el));root.classList.add('exhibition-ready')}else reveals.forEach(el=>el.classList.add('in-frame'));
})();
