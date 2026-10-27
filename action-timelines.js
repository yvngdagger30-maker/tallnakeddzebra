'use strict';
(()=>{
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),ease=v=>{v=clamp(v);return v*v*(3-2*v)};
 const plans=[
 {id:'jason',title:'THE LAKE ISN’T EMPTY.',duration:4200,impact:2050,keys:[[0,0],[650,1],[1120,2],[1530,3],[1870,4],[2050,5],[2250,6],[2650,7]],travel:[[0,.66,.02,0],[400,.70,0,1],[1500,.88,0,1],[2150,1.25,.025,1],[3100,1.32,0,1]]},
 {id:'freddy',title:'YOUR DREAMS HAVE TEETH.',duration:4100,impact:1900,keys:[[0,0],[430,1],[860,2],[1280,3],[1690,4],[1900,5],[2120,6],[2510,7]],travel:[[0,.78,.04,0],[400,.83,0,1],[1400,.95,0,1],[1950,1.22,.01,1],[2750,1.16,0,1]]},
 {id:'myers',title:'HE WAS ALREADY INSIDE.',duration:4500,impact:2660,keys:[[0,0],[1050,1],[1650,2],[2140,3],[2480,4],[2660,5],[2850,6],[3240,7]],travel:[[0,.61,0,0],[700,.61,0,0],[1400,.68,0,.85],[2200,.80,0,1],[2730,1.19,.025,1],[3400,1.23,.015,1]]},
 {id:'creeper',title:'LOOK UP. TOO LATE.',duration:4100,impact:2110,keys:[[0,0],[330,1],[650,2],[930,3],[1190,2],[1440,3],[1710,4],[2110,5],[2550,6],[3080,7]],travel:[[0,.28,-.24,0],[330,.32,-.20,1],[1000,.48,-.17,1],[1700,.72,-.12,1],[2200,1.08,0,1],[2800,1.30,.02,1]]}
 ];
 function sample(index,ms){const p=plans[index];if(!p)return null;ms=clamp(ms,0,p.duration);let k=0;while(k+1<p.keys.length&&ms>=p.keys[k+1][0])k++;const next=p.keys[k+1],blend=next?clamp((ms-next[0]+38)/38):0;let a=0;while(a+1<p.travel.length&&ms>=p.travel[a+1][0])a++;const from=p.travel[a],to=p.travel[a+1]||from,mix=to===from?0:ease((ms-from[0])/(to[0]-from[0]));return {frame:p.keys[k][1],next:next?.[1]??p.keys[k][1],blend,scale:from[1]+(to[1]-from[1])*mix,y:from[2]+(to[2]-from[2])*mix,alpha:from[3]+(to[3]-from[3])*mix,impact:ms>=p.impact,phase:ms<p.impact-350?'approach':ms<p.impact?'windup':ms<p.impact+450?'strike':'aftermath',black:clamp((ms-(p.duration-620))/620),done:ms>=p.duration}}
 window.DGActionTimeline={plans,sample,clamp,ease};
})();
