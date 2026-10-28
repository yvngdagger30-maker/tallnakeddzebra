const assert=require('node:assert/strict'),r=require('./pursuit-records.js');
const lost={won:false,points:300,distance:800,seconds:30,health:0,damageTaken:3};
let a=r.update(null,lost);assert.equal(a.record.score,300);assert.equal(a.record.fastest,null);assert.equal(a.record.runs,1);assert.equal(r.rank(lost),'UNFINISHED BUSINESS');
const win={...lost,won:true,distance:1600,health:3,damageTaken:0,seconds:60};a=r.update(a.record,win);assert.equal(a.record.fastest,60);assert.equal(a.record.escapes,1);assert.equal(r.rank(win),'S / UNTOUCHABLE');
let b=r.update(a.record,{...win,points:200,seconds:70});assert.equal(b.record.score,300);assert.equal(b.record.fastest,60);assert.equal(b.newTime,false);assert.equal(b.newScore,false);
b=r.update(b.record,{...win,points:500,seconds:55});assert.equal(b.record.score,500);assert.equal(b.record.fastest,55);assert(b.newTime&&b.newScore);
assert.deepEqual(r.clean({score:'bad',distance:Infinity,fastest:-1,runs:NaN}),r.empty());assert.equal(r.rank({...win,health:2,damageTaken:1}),'A / NIGHT STALKER');assert.equal(r.rank({...win,health:1,damageTaken:2}),'B / LAST BREATH');
console.log('PASS: loss/escape records, fastest completed run, score preservation, rank rules, corrupt storage recovery');
