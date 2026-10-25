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

const characters=[
 {name:'Jason Voorhees',film:'FRIDAY THE 13TH',description:"THE MASK / ANONYMITY & ACCOUNTABILITY. In this interpretation, Jason's mask becomes a metaphor for the identities people hide behind online. The empty eyes ask what happens to empathy when a person becomes an anonymous profile. The character is the reference; online dehumanization is the subject."},
 {name:'Freddy Krueger',film:'A NIGHTMARE ON ELM STREET',description:'THE DREAM / AN ALWAYS-ON CULTURE. This interpretation connects the invaded dream to the pressure of notifications, work, and performance that follows us into rest. Freddy becomes a visual metaphor for anxiety that refuses to clock out. Where does a person go when even their quiet moments feel occupied?'},
 {name:'Michael Myers',film:'HALLOWEEN',description:'THE SHAPE / NORMALIZED INDIFFERENCE. An unreadable face becomes a metaphor for looking at suffering without responding. This study asks how repeated exposure to cruelty can turn shock into routine. The blank mask reflects the distance between seeing harm and choosing to act.'},
 {name:'The Creeper',film:'JEEPERS CREEPERS',description:'THE HUNGER / EXTRACTION WITHOUT END. The Creeper becomes a metaphor for systems that treat people and the planet as resources to consume. A familiar coat conceals something predatory: an image of exploitation made ordinary. What survives when taking becomes the only purpose?'}
];
document.querySelectorAll('.character').forEach(button=>button.addEventListener('click',()=>{
 const i=Number(button.dataset.character),c=characters[i];
 document.querySelectorAll('.character').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 $('#character-film').textContent=c.film+' / FAN ART INTERPRETATION';$('#character-name').textContent=c.name;$('#character-description').textContent=c.description;
 $('#icons-theater').style.setProperty('--character-position',`${12.5+i*25}%`);
 const slash=$('.slash-mark');slash.classList.remove('cut');void slash.offsetWidth;slash.classList.add('cut');
}));
