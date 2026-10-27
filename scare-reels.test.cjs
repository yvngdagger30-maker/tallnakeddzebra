const fs=require('fs'),vm=require('vm'),assert=require('assert');
(async()=>{
 const timers=new Map(),frames=new Map();let seq=0,impacts=0,ends=0,fallbacks=0;const videos=[];
 class Node{constructor(){this.style={};this.events={};this.className='';this.classList={add(){}};this.currentTime=0;this.pauses=0;this.loads=0}append(n){this.child=n}replaceChildren(n){this.child=n}setAttribute(){}removeAttribute(){}addEventListener(n,fn){this.events[n]=fn}pause(){this.pauses++}load(){this.loads++}play(){return Promise.resolve()}fire(n){this.events[n]?.()}}
 const stage=new Node(),caption=new Node(),overlay={dataset:{},querySelector:s=>s==='.scare-stage'?stage:caption};const manifest={jason:null};
 const context={window:{DGScareReelManifest:manifest,DGScares:{start(){fallbacks++;return 1500}}},document:{querySelector:()=>overlay,createElement:tag=>{const n=new Node();if(tag==='video')videos.push(n);return n}},matchMedia:()=>({matches:false}),requestAnimationFrame:fn=>{frames.set(++seq,fn);return seq},cancelAnimationFrame:id=>frames.delete(id),setTimeout:fn=>{timers.set(++seq,fn);return seq},clearTimeout:id=>timers.delete(id),Promise};
 vm.runInNewContext(fs.readFileSync('scare-reels.js','utf8'),context);const reels=context.window.DGScareReels;
 const options={onImpact:()=>impacts++,onEnd:()=>ends++};assert.equal(reels.has(0),false);manifest.jason={src:'assets/jason-scare.mp4',durationMs:5000,impactMs:3000};assert.equal(reels.has(0),true);
 assert.equal(reels.start(0,options),7000);let video=videos.at(-1);assert(video.muted&&video.playsInline);video.fire('playing');assert.equal(timers.size,0);
 const tick=()=>{const entries=[...frames];frames.clear();for(const [,fn]of entries)fn()};video.currentTime=3.1;tick();tick();assert.equal(impacts,1);video.fire('ended');assert.equal(ends,1);reels.stop();assert.equal(video.pauses,1);video.fire('ended');assert.equal(ends,1);
 reels.start(0,options);video=videos.at(-1);video.fire('error');assert.equal(fallbacks,1);assert.equal(impacts,2);reels.stop();for(const fn of timers.values())fn();assert.equal(ends,1,'dismissal cancels delayed callbacks');
 reels.start(0,options);video=videos.at(-1);video.fire('error');video.fire('error');assert.equal(fallbacks,2,'fallback runs once');reels.stop();
 manifest.jason.durationMs=Infinity;assert.equal(reels.has(0),false);manifest.jason.durationMs=5000;manifest.jason.impactMs=5000;assert.equal(reels.has(0),false);
 console.log('PASS: manifest validation, muted inline video, media-time impact once, natural completion, dismissal cleanup, failed playback fallback and stale callback protection');
})().catch(e=>{console.error(e);process.exit(1)});
