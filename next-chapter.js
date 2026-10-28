'use strict';
(()=>{
 const $=id=>document.getElementById(id),rules=window.DGPursuitRecords,key='dg-pursuit-records-v1';let all={},latest=null,persisted=true;
 try{const value=JSON.parse(localStorage.getItem(key)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))all=value}catch{persisted=false}
 const time=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
 function records(){const r=rules.clean(all[$('runner-character').value]);$('pursuit-records').textContent=`YOUR RECORDS / ${r.score} PTS · ${r.distance} m · FASTEST ESCAPE ${r.fastest===null?'—':time(r.fastest)} · ${r.escapes} ESCAPES${persisted?'':' · SAVING UNAVAILABLE'}`}
 $('runner-character').addEventListener('change',records);records();
 window.addEventListener('pursuit:start',()=>{$('run-report').hidden=true;$('report-feedback').textContent='';$('report-copy-wrap').hidden=true});
 window.addEventListener('pursuit:finish',event=>{
  const run=event.detail,result=rules.update(all[run.character],run);all[run.character]=result.record;
  try{localStorage.setItem(key,JSON.stringify(all));persisted=true}catch{persisted=false}
  latest={...run,rank:rules.rank(run)};
  $('run-report-title').textContent=run.won?'You escaped the city.':'The night isn’t finished with you.';
  $('report-rank').textContent=latest.rank;$('report-character').textContent=run.name;
  const stats=[['Score',`${run.points} PTS`],['Distance',`${run.distance} / 1600 m`],['Run time',time(run.seconds)],['Health left',`${run.health} / 3`],['Takedowns',String(run.takedowns)],['Strike accuracy',run.attacks?`${Math.round(run.successfulAttacks/run.attacks*100)}%`:'—']];
  $('report-stats').replaceChildren(...stats.map(([label,value])=>{const pair=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;pair.append(dt,dd);return pair}));
  $('report-record').textContent=[result.newScore?'NEW PERSONAL SCORE':null,result.newTime?'NEW FASTEST ESCAPE':null,!result.newScore&&!result.newTime?'Another case added to your record.':null,!persisted?'This result could not be saved in this browser.':null].filter(Boolean).join(' / ');
  $('run-report').hidden=false;records();
 });
 $('report-retry').addEventListener('click',()=>{$('runner-start').click()});
 const shareText=()=>`MIDNIGHT PURSUIT — ${latest.rank}\n${latest.name}: ${latest.points} points · ${latest.distance} m · ${latest.health}/3 health · ${time(latest.seconds)}\nCan you escape? https://tallnakeddzebra.uk/#projects`;
 $('report-share').addEventListener('click',async()=>{
  if(!latest)return;const text=shareText();
  try{if(navigator.share){await navigator.share({title:'My Midnight Pursuit result',text});$('report-feedback').textContent='Result shared.'}else{await navigator.clipboard.writeText(text);$('report-feedback').textContent='Result copied. Paste it into your post or message.'}}
  catch(error){if(error.name==='AbortError')return;$('report-copy-wrap').hidden=false;$('report-copy').value=text;$('report-copy').focus();$('report-copy').select();$('report-feedback').textContent='Select and copy your result below.'}
 });
 $('report-download').addEventListener('click',()=>{
  if(!latest)return;const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;const c=canvas.getContext('2d');
  c.fillStyle='#100e0e';c.fillRect(0,0,1200,630);c.fillStyle='#ed5148';c.fillRect(0,0,16,630);c.strokeStyle='#413332';c.strokeRect(48,48,1104,534);
  c.fillStyle='#b9aaa0';c.font='20px monospace';c.fillText('DON GRAY / AN INTERACTIVE HORROR EXPERIMENT',80,100);
  c.fillStyle='#eee9df';c.font='bold 66px sans-serif';c.fillText('MIDNIGHT PURSUIT',80,195);c.fillStyle='#ed5148';c.font='bold 30px sans-serif';c.fillText(latest.rank,80,253);
  c.fillStyle='#eee9df';c.font='26px monospace';c.fillText(latest.name,80,315);c.font='bold 48px monospace';c.fillText(`${latest.points} PTS   ${latest.health}/3 HEALTH`,80,397);
  c.fillStyle='#b9aaa0';c.font='24px monospace';c.fillText(`${latest.distance} m / 1600 m     ${time(latest.seconds)}     ${latest.takedowns} TAKEDOWNS`,80,456);
  c.fillStyle='#eee9df';c.font='22px monospace';c.fillText('CAN YOU ESCAPE? / tallnakeddzebra.uk',80,544);
  canvas.toBlob(blob=>{if(!blob){$('report-feedback').textContent='Image could not be saved. Use Share result instead.';return}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='midnight-pursuit-result.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('report-feedback').textContent='Your result image is ready to save.'},'image/png');
 });
})();
