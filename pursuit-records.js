/* Pure record rules shared by the browser and checks. */
(function(root){
 const empty=()=>({score:0,distance:0,fastest:null,runs:0,escapes:0});
 function clean(value){const v=value&&typeof value==='object'?value:{};const n=k=>Number.isFinite(v[k])&&v[k]>=0?v[k]:0;return {score:n('score'),distance:Math.min(1600,n('distance')),fastest:Number.isFinite(v.fastest)&&v.fastest>0?v.fastest:null,runs:Math.floor(n('runs')),escapes:Math.floor(n('escapes'))}}
 function update(previous,run){const before=clean(previous),fast=run.won&&run.seconds>0&&(before.fastest===null||run.seconds<before.fastest);return {record:{score:Math.max(before.score,run.points),distance:Math.max(before.distance,run.distance),fastest:fast?run.seconds:before.fastest,runs:before.runs+1,escapes:before.escapes+(run.won?1:0)},newScore:run.points>before.score,newTime:!!fast}}
 function rank(run){return !run.won?'UNFINISHED BUSINESS':run.damageTaken===0?'S / UNTOUCHABLE':run.health>=2?'A / NIGHT STALKER':'B / LAST BREATH'}
 const api={empty,clean,update,rank};if(typeof module!=='undefined')module.exports=api;else root.DGPursuitRecords=api;
})(typeof window==='undefined'?{}:window);
