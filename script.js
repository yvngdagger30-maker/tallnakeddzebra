'use strict';
const $ = (s) => document.querySelector(s);
$('#year').textContent = new Date().getFullYear();
const menu = $('.menu');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#mobile-nav').hidden = !open; menu.textContent = open ? 'Close −' : 'Menu +'; });
$('#mobile-nav').querySelectorAll('a').forEach(a => a.addEventListener('click', () => { $('#mobile-nav').hidden = true; menu.setAttribute('aria-expanded','false'); menu.textContent='Menu +'; }));
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b===button); b.setAttribute('aria-pressed',String(b===button)); });
 let count=0; document.querySelectorAll('.art-card').forEach(card => { card.hidden=button.dataset.filter!=='all' && card.dataset.category!==button.dataset.filter; if(!card.hidden) count++; });
 $('#filter-status').textContent=`Showing ${count} ${button.dataset.filter==='all'?'':button.dataset.filter+' '}artwork${count===1?'':'s'}.`;
}));
const works=[
 {title:'The Signal',image:'assets/signal.webp',alt:'Cracked porcelain head entangled in surveillance cables',subtitle:'When being connected means being watched.',meaning:'Convenience asks us to trade pieces of ourselves for access. This study turns that exchange into a physical form: a fragile human likeness quietly occupied by the devices built to connect it.',process:'Cracked porcelain suggests vulnerability. Black cables interrupt the face like invasive roots. A single green lens replaces a human gaze, making the viewer wonder who is really doing the looking.'},
 {title:'Someone Else',image:'assets/identity.webp',alt:'Faceless figure with a fragmented mirror face in a concrete corridor',subtitle:'A thousand versions of you. None of them whole.',meaning:'Online identity can become a performance assembled for everyone except ourselves. This portrait imagines the moment the reflection stops feeling like a person and starts feeling like an audience.',process:'A mirror face fractures one identity into competing reflections. The empty corridor amplifies isolation; the red thread becomes a fragile connection to a self that still exists beneath the surface.'},
 {title:'After Us',image:'assets/aftermath.webp',alt:'Ribcage-like industrial structure above dark polluted water',subtitle:"The world doesn't end. It remembers.",meaning:'Environmental damage is often described in distant numbers. This world makes it bodily: architecture becomes a skeleton, and the landscape carries the residue of what people chose to consume.',process:'Industrial concrete takes on an anatomical silhouette. Still water holds the evidence. The small figure restores human scale, while a faint green glow leaves the possibility of an uneasy future.'}
];
let current=0,lastTrigger=null;
const dialog=$('#case-file');
function renderCase(index){ current=index;const w=works[index];$('#case-image').src=w.image;$('#case-image').alt=w.alt;$('#case-number').textContent=`CASE FILE / 00${index+1}`;$('#case-title').textContent=w.title;$('#case-subtitle').textContent=w.subtitle;$('#case-meaning').textContent=w.meaning;$('#case-process').textContent=w.process;dialog.scrollTop=0; }
document.querySelectorAll('.art-open').forEach(b=>b.addEventListener('click',()=>{lastTrigger=b;renderCase(Number(b.dataset.art));dialog.showModal();document.body.classList.add('modal-open');$('.dialog-close').focus();}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus();});
$('#next-art').addEventListener('click',()=>renderCase((current+1)%works.length));
const distortion=$('#distortion'),exposure=$('#exposure'),stage=$('#signal-stage');
function updateSignal(){stage.style.setProperty('--corruption',distortion.value);stage.style.setProperty('--exposure',Number(exposure.value)/100);$('#distortion-value').value=distortion.value+'%';$('#exposure-value').value=exposure.value+'%';$('#signal-readout').textContent='CORRUPTION: '+distortion.value.padStart(3,'0');}
[distortion,exposure].forEach(input=>input.addEventListener('input',updateSignal));
$('#randomize').addEventListener('click',()=>{distortion.value=String(20+Math.floor(Math.random()*81));exposure.value=String(60+Math.floor(Math.random()*71));updateSignal();});
$('#reset').addEventListener('click',()=>{distortion.value='35';exposure.value='100';updateSignal();});
updateSignal();
$('#copy-handle').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('topheadhunta');$('#copy-status').textContent='Handle copied: @topheadhunta';}catch{$('#copy-status').textContent='Your handle: @topheadhunta — select and copy this text.';}});
const media=window.matchMedia('(prefers-reduced-motion: reduce)');
let reduce=media.matches;
try{const saved=localStorage.getItem('dg-reduce-motion');if(saved!==null)reduce=saved==='true';}catch{}
function updateMotion(){document.documentElement.classList.toggle('no-motion',reduce);$('#motion-toggle').textContent='Motion: '+(reduce?'off':'on');$('#motion-toggle').setAttribute('aria-pressed',String(reduce));}
$('#motion-toggle').addEventListener('click',()=>{reduce=!reduce;try{localStorage.setItem('dg-reduce-motion',String(reduce));}catch{}updateMotion();});
updateMotion();

const specimenButtons=[...document.querySelectorAll('.specimen-flip')];
function setSpecimen(button,open){
 button.setAttribute('aria-expanded',String(open));
 button.querySelector('.specimen-back').setAttribute('aria-hidden',String(!open));
 button.querySelector('.specimen-front').setAttribute('aria-hidden',String(open));
 button.setAttribute('aria-label',(open?'Show portrait of ':'Reveal the meaning of ')+button.querySelector('.specimen-front strong').textContent);
}
function syncReveal(){const allOpen=specimenButtons.every(b=>b.getAttribute('aria-expanded')==='true');$('#reveal-all').setAttribute('aria-pressed',String(allOpen));$('#reveal-all').textContent=allOpen?'Return to portraits ↶':'Reveal every meaning +';}
specimenButtons.forEach(button=>button.addEventListener('click',()=>{setSpecimen(button,button.getAttribute('aria-expanded')!=='true');syncReveal();}));
$('#reveal-all').addEventListener('click',()=>{const open=$('#reveal-all').getAttribute('aria-pressed')!=='true';specimenButtons.forEach(b=>setSpecimen(b,open));syncReveal();});
$('#uv-toggle').addEventListener('click',()=>{const on=$('#uv-toggle').getAttribute('aria-pressed')!=='true';$('#uv-toggle').setAttribute('aria-pressed',String(on));$('#uv-toggle').textContent='Ultraviolet: '+(on?'on':'off')+' ◉';$('#icons').classList.toggle('ultraviolet',on);});
