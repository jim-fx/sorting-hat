var it=Object.defineProperty,st=Object.defineProperties;var rt=Object.getOwnPropertyDescriptors;var De=Object.getOwnPropertySymbols;var at=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable;var Ie=(s,e,t)=>e in s?it(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,we=(s,e)=>{for(var t in e||(e={}))at.call(e,t)&&Ie(s,t,e[t]);if(De)for(var t of De(e))lt.call(e,t)&&Ie(s,t,e[t]);return s},He=(s,e)=>st(s,rt(e));import{S as G,i as j,s as W,e as v,c as w,a as k,d as u,b as m,f as x,I as z,t as R,k as D,g as L,n as I,H as g,J as Ne,K as C,L as ye,h as be,M as ot,l as P,N as ct,x as A,u as H,A as ke,O as te,P as ue,Q as Ve,R as he,T as Ee,U as xe,V as ut,W as de,X as ze,j as J,m as X,Y as Z,o as K,Z as Re,v as Y,C as Ae,_ as ht,$ as dt,a0 as ft,a1 as _t,a2 as pt,a3 as mt,a4 as gt,a5 as vt,a6 as wt,a7 as fe,a8 as _e,a9 as yt,w as pe,aa as bt,ab as Le,ac as kt,ad as Et,ae as $e,af as xt,ag as zt,ah as At,r as me,ai as $t,aj as Mt}from"../chunks/vendor-dd92b9bc.js";function Tt(s){let e,t,n,i,r,a,o,l,c,f,p;return{c(){e=v("p"),t=R("Ganzen Namen eingeben:"),n=D(),i=v("input"),r=D(),a=v("br"),o=D(),l=v("button"),c=R("fertig"),this.h()},l(d){e=w(d,"P",{});var _=k(e);t=L(_,"Ganzen Namen eingeben:"),_.forEach(u),n=I(d),i=w(d,"INPUT",{placeholder:!0,type:!0}),r=I(d),a=w(d,"BR",{}),o=I(d),l=w(d,"BUTTON",{});var E=k(l);c=L(E,"fertig"),E.forEach(u),this.h()},h(){m(i,"placeholder","Namen..."),m(i,"type","text")},m(d,_){x(d,e,_),g(e,t),x(d,n,_),x(d,i,_),Ne(i,s[1]),x(d,r,_),x(d,a,_),x(d,o,_),x(d,l,_),g(l,c),f||(p=[C(i,"input",s[6]),C(i,"keydown",s[3]),C(l,"click",s[7])],f=!0)},p(d,_){_&2&&i.value!==d[1]&&Ne(i,d[1])},d(d){d&&u(e),d&&u(n),d&&u(i),d&&u(r),d&&u(a),d&&u(o),d&&u(l),f=!1,ye(p)}}}function St(s){let e,t,n,i,r,a,o,l,c,f,p,d,_,E,h,y;return{c(){e=v("p"),t=R("Alles klar, "),n=v("b"),i=R(s[1]),r=R(", ist dass der richtige Name?"),a=D(),o=v("br"),l=D(),c=v("div"),f=v("button"),p=R("Ja"),d=D(),_=v("button"),E=R("Nein")},l(b){e=w(b,"P",{});var M=k(e);t=L(M,"Alles klar, "),n=w(M,"B",{});var q=k(n);i=L(q,s[1]),q.forEach(u),r=L(M,", ist dass der richtige Name?"),M.forEach(u),a=I(b),o=w(b,"BR",{}),l=I(b),c=w(b,"DIV",{});var V=k(c);f=w(V,"BUTTON",{});var U=k(f);p=L(U,"Ja"),U.forEach(u),d=I(V),_=w(V,"BUTTON",{});var F=k(_);E=L(F,"Nein"),F.forEach(u),V.forEach(u)},m(b,M){x(b,e,M),g(e,t),g(e,n),g(n,i),g(e,r),x(b,a,M),x(b,o,M),x(b,l,M),x(b,c,M),g(c,f),g(f,p),g(c,d),g(c,_),g(_,E),h||(y=[C(f,"click",s[4]),C(_,"click",s[5])],h=!0)},p(b,M){M&2&&be(i,b[1])},d(b){b&&u(e),b&&u(a),b&&u(o),b&&u(l),b&&u(c),h=!1,ye(y)}}}function Dt(s){let e;function t(r,a){return r[2]?St:Tt}let n=t(s),i=n(s);return{c(){e=v("div"),i.c(),this.h()},l(r){e=w(r,"DIV",{class:!0});var a=k(e);i.l(a),a.forEach(u),this.h()},h(){m(e,"class","wrapper svelte-1terpu9")},m(r,a){x(r,e,a),i.m(e,null)},p(r,[a]){n===(n=t(r))&&i?i.p(r,a):(i.d(1),i=n(r),i&&(i.c(),i.m(e,null)))},i:z,o:z,d(r){r&&u(e),i.d()}}}function It(s,e,t){let{callback:n}=e,i,r=!1;function a({key:p}){p==="Enter"&&t(2,r=!0)}const o=()=>n(i),l=()=>{t(2,r=!1)};function c(){i=this.value,t(1,i)}const f=()=>{t(2,r=!0)};return s.$$set=p=>{"callback"in p&&t(0,n=p.callback)},[n,i,r,a,o,l,c,f]}class Ht extends G{constructor(e){super();j(this,e,It,Dt,W,{callback:0})}}function Nt(s){return{c:z,l:z,m:z,p:z,i:z,o:z,d:z}}function Vt(s){let e,t=s[5]+"",n,i,r,a,o,l,c,f,p,d,_;function E(){return s[3](s[5])}return{c(){e=v("h1"),n=R(t),i=D(),r=v("img"),l=D(),c=v("button"),f=R("Okay"),this.h()},l(h){e=w(h,"H1",{class:!0});var y=k(e);n=L(y,t),y.forEach(u),i=I(h),r=w(h,"IMG",{src:!0,alt:!0,class:!0}),l=I(h),c=w(h,"BUTTON",{});var b=k(c);f=L(b,"Okay"),b.forEach(u),this.h()},h(){m(e,"class","svelte-16th1rs"),te(r.src,a="icons/"+s[5]+".svg")||m(r,"src",a),m(r,"alt","crest of house "+s[1]),m(r,"class","svelte-16th1rs")},m(h,y){x(h,e,y),g(e,n),x(h,i,y),x(h,r,y),x(h,l,y),x(h,c,y),g(c,f),p=!0,d||(_=C(c,"click",E),d=!0)},p(h,y){s=h},i(h){p||(ue(()=>{o||(o=Ve(r,he,{},!0)),o.run(1)}),p=!0)},o(h){o||(o=Ve(r,he,{},!1)),o.run(0),p=!1},d(h){h&&u(e),h&&u(i),h&&u(r),h&&o&&o.end(),h&&u(l),h&&u(c),d=!1,_()}}}function Rt(s){return{c:z,l:z,m:z,p:z,i:z,o:z,d:z}}function Lt(s){let e,t,n={ctx:s,current:null,token:null,hasCatch:!1,pending:Rt,then:Vt,catch:Nt,value:5,blocks:[,,,]};return ot(s[1],n),{c(){e=P(),n.block.c()},l(i){e=P(),n.block.l(i)},m(i,r){x(i,e,r),n.block.m(i,n.anchor=r),n.mount=()=>e.parentNode,n.anchor=e,t=!0},p(i,[r]){s=i,ct(n,s,r)},i(i){t||(A(n.block),t=!0)},o(i){for(let r=0;r<3;r+=1){const a=n.blocks[r];H(a)}t=!1},d(i){i&&u(e),n.block.d(i),n.token=null,n=null}}}async function Ct(){return await(await fetch("api/houses")).text()}function Bt(s,e,t){const n=!1;let i=Ct(),{callback:r}=e;ke(async()=>{const o=await i,l=new Audio("audio/"+o+".mp3");l.play();const c=new Audio("audio/cheers.mp3"),f=setInterval(()=>{l.currentTime/l.duration>.2&&c.paused&&(c.play(),clearInterval(f))},50);l.addEventListener("progress",()=>{})});const a=o=>r(o);return s.$$set=o=>{"callback"in o&&t(0,r=o.callback)},[r,i,n,a]}class Ot extends G{constructor(e){super();j(this,e,Bt,Lt,W,{showText:2,callback:0})}get showText(){return this.$$.ctx[2]}}function Ce(s,e,t){const n=s.slice();return n[4]=e[t],n[6]=t,n}function Be(s){let e,t,n,i,r,a;function o(){return s[3](s[4])}return{c(){e=v("img"),this.h()},l(l){e=w(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){te(e.src,t="icons/"+s[4]+".svg")||m(e,"src",t),m(e,"alt",n="crest of house "+s[4]),m(e,"class","svelte-c29sve")},m(l,c){x(l,e,c),r||(a=C(e,"click",o),r=!0)},p(l,c){s=l},i(l){i||ue(()=>{i=Ee(e,he,{delay:s[6]*200,duration:1200}),i.start()})},o:z,d(l){l&&u(e),r=!1,a()}}}function Ft(s){let e,t=s[0],n=[];for(let i=0;i<t.length;i+=1)n[i]=Be(Ce(s,t,i));return{c(){e=v("div");for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=w(i,"DIV",{class:!0});var r=k(e);for(let a=0;a<n.length;a+=1)n[a].l(r);r.forEach(u),this.h()},h(){m(e,"class","wrapper svelte-c29sve")},m(i,r){x(i,e,r);for(let a=0;a<n.length;a+=1)n[a].m(e,null)},p(i,[r]){if(r&3){t=i[0];let a;for(a=0;a<t.length;a+=1){const o=Ce(i,t,a);n[a]?(n[a].p(o,r),A(n[a],1)):(n[a]=Be(o),n[a].c(),A(n[a],1),n[a].m(e,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=t.length}},i(i){for(let r=0;r<t.length;r+=1)A(n[r])},o:z,d(i){i&&u(e),xe(n,i)}}}function qt(s,e,t){let{callback:n}=e;const i=["ravenclaw","gryffindor","slytherin","hufflepuff"];function r(o){const l=new Audio("audio/"+o+".mp3");l.play(),l.addEventListener("ended",()=>{setTimeout(()=>{n(o)},200)})}const a=o=>r(o);return s.$$set=o=>{"callback"in o&&t(2,n=o.callback)},[i,r,n,a]}class Ut extends G{constructor(e){super();j(this,e,qt,Ft,W,{callback:2})}}function Pt(s){let e,t,n,i,r,a,o,l,c,f,p;function d(E){s[3](E)}let _={max:10,pips:!0,id:"range-slider",all:"label"};return s[1]!==void 0&&(_.values=s[1]),n=new ut({props:_}),de.push(()=>ze(n,"values",d)),{c(){e=v("div"),t=v("div"),i=v("div"),J(n.$$.fragment),a=D(),o=v("button"),l=R("Okay"),this.h()},l(E){e=w(E,"DIV",{class:!0});var h=k(e);t=w(h,"DIV",{class:!0});var y=k(t);i=w(y,"DIV",{style:!0});var b=k(i);X(n.$$.fragment,b),y.forEach(u),a=I(h),o=w(h,"BUTTON",{});var M=k(o);l=L(M,"Okay"),M.forEach(u),h.forEach(u),this.h()},h(){Z(i,"display","contents"),Z(i,"--handle-focus","white"),Z(i,"--range-slider","black"),Z(i,"--range-handle","black"),Z(i,"--range-float-text","white"),m(t,"class","range-wrapper svelte-1ni4obk"),m(e,"class","wrapper svelte-1ni4obk")},m(E,h){x(E,e,h),g(e,t),g(t,i),K(n,i,null),g(e,a),g(e,o),g(o,l),c=!0,f||(p=C(o,"click",s[4]),f=!0)},p(E,[h]){const y={};!r&&h&2&&(r=!0,y.values=E[1],Re(()=>r=!1)),n.$set(y)},i(E){c||(A(n.$$.fragment,E),c=!0)},o(E){H(n.$$.fragment,E),c=!1},d(E){E&&u(e),Y(n),f=!1,p()}}}function Gt(s,e,t){let{callback:n}=e;const i=!0;let r=[5];function a(l){r=l,t(1,r)}const o=()=>n(r[0]);return s.$$set=l=>{"callback"in l&&t(0,n=l.callback)},[n,r,i,a,o]}class jt extends G{constructor(e){super();j(this,e,Gt,Pt,W,{callback:0,showText:2})}get showText(){return this.$$.ctx[2]}}function Wt(s){let e,t,n,i,r,a;return{c(){e=v("video"),t=v("source"),i=v("source"),a=v("track"),this.h()},l(o){e=w(o,"VIDEO",{width:!0,height:!0,class:!0});var l=k(e);t=w(l,"SOURCE",{src:!0,type:!0}),i=w(l,"SOURCE",{src:!0,type:!0}),a=w(l,"TRACK",{kind:!0}),l.forEach(u),this.h()},h(){te(t.src,n=""+(s[0]+"video/video.webm"))||m(t,"src",n),m(t,"type","video/webm"),te(i.src,r=""+(s[0]+"video/video.mp4"))||m(i,"src",r),m(i,"type","video/mp4"),m(a,"kind","captions"),m(e,"width","500"),m(e,"height","281"),e.controls=!0,e.autoplay=!0,m(e,"class","svelte-k2j555")},m(o,l){x(o,e,l),g(e,t),g(e,i),g(e,a)},p(o,[l]){l&1&&!te(t.src,n=""+(o[0]+"video/video.webm"))&&m(t,"src",n),l&1&&!te(i.src,r=""+(o[0]+"video/video.mp4"))&&m(i,"src",r)},i:z,o:z,d(o){o&&u(e)}}}function Jt(s,e,t){const n=!1;let i="";return ke(()=>{t(0,i=window.location.pathname)}),[i,n]}class Kt extends G{constructor(e){super();j(this,e,Jt,Wt,W,{showText:1})}get showText(){return this.$$.ctx[1]}}const Oe=Ae();class B{constructor({audioFile:e,element:t,text:n}){this.duration=5,this.state=Ae("suspended"),this.nextActions=[],this.events={},this.text=n,this.element=t,e&&(this.audio=new Audio("audio/"+e))}async start(){if(this.setActive(),await ht(),this.emit("start"),this.audio){this.duration=this.audio.duration,this.state.set("running"),this.audio.play(),B.anim.params.wiggleMouth=1;const e=setInterval(()=>{this.emit("progress",this.audio.currentTime/this.audio.duration)},200);this.audio.addEventListener("ended",()=>{clearInterval(e),setTimeout(()=>{this.speechEnded()},500)},{once:!0})}else this.duration=5,this.text&&(this.duration=Math.max(this.text.split(" ").length*.08,2),console.log(this.duration)),this.state.set("running"),setTimeout(()=>{this.speechEnded()},this.duration*1e3)}speechEnded(){this.emit("speech-ended"),B.anim.params.wiggleMouth=0,this.element?this.state.set("input"):this.finish()}handleElementCallback(e){console.log("Got Data: ",e),this.data=e,this.emit("data",e),this.finish()}finish(){this.state.set("finished"),this.emit("end"),console.log("Finished",this.nextActions),this.nextActions.length===1&&!("name"in this.nextActions[0])&&this.nextActions[0].action.start()}emit(e,t){e in this.events&&this.events[e].forEach(n=>n(t))}addEventListener(e,t){return this.events[e]=e in this.events?[...this.events[e],t]:[t],()=>{this.events[e]=this.events[e].filter(n=>n!==t)}}setActive(){Oe.set(this)}addAction(e,t){typeof e!="string"?this.nextActions.push({action:e}):this.nextActions.push({name:e,action:t})}}var Yt=(s,e)=>{s="local-store-"+s;{let t=e;if(s in localStorage)try{t=JSON.parse(localStorage.getItem(s))}catch(i){console.log(i)}const n=Ae(t);return n.subscribe(i=>{localStorage.setItem(s,JSON.stringify(i))}),n}};const re=Yt("user-data",{name:"",confidence:"",house:""});function Qt(s){B.anim=s;const e=new B({audioFile:"teilnehmen.mp3",text:"So so, du willst also an der Silvesterparty im Dungeon teilnehmen?"});e.addEventListener("start",()=>{s.params.wiggleMouth=1}),e.addEventListener("end",()=>{s.params.wiggleMouth=0,s.params.wiggleEyes=1});const t=new B({audioFile:"namen.mp3",text:"Sehr sch\xF6n, verstanden, jetzt br\xE4uchte ich noch deinen Namen?",element:Ht});t.addEventListener("data",f=>{console.log("Got Name",f),re.update(p=>(p.name=f,p))});const n=new B({audioFile:"unterhaltung.mp3",text:"Das ist nat\xFCrlich auch in Ordnung, damit du aber trotzdem nicht leer ausgehst habe ich hier etwas Unterhaltung f\xFCr dich:",element:Kt}),i=new B({audioFile:"exzellenter_gast.mp3",text:"Naja, okay, wenn das sooo ist? Dann werden wir mal schauen... Verstanden, du siehst wie ein exzellenter Gast aus."}),r=new B({audioFile:"welches_haus.mp3",text:"Weisst du den schon zu welchem der vier H\xE4user du geh\xF6rst?"});r.addEventListener("data",f=>{re.update(p=>(p.house=f,p))});const a=new B({audioFile:"random_haus.mp3",text:"Okay, um dass herauszufinden bin ich ja hier. Dann werde ich mal  schauen, hmm, ich sehe Mut, aber auch Intelligenz, oh, und hier ist auch noch Empathie. Schwierige Entscheidung, aber ich denke:",element:Ot});a.addEventListener("start",()=>{s.params.wiggleMouth=1}),a.addEventListener("progress",f=>{f>.34&&(s.params.wiggleRim=2,s.params.wiggleHat=2,s.params.wiggleEyes=1)}),a.addEventListener("speech-ended",()=>{s.params.wiggleMouth=0,s.params.wiggleHat=.2,s.params.wiggleEyes=0,s.params.wiggleRim=.2}),a.addEventListener("data",f=>{re.update(p=>(p.house=f,p))});const o=new B({text:"W\xE4hle nun dein Haus aus:",element:Ut});o.addEventListener("data",f=>{re.update(p=>(p.house=f,p))});const l=new B({audioFile:"sicherheit.mp3",text:"Nun zu letzten Frage, auf einer Skala von 0 bis 10, wie sicher k\xF6nnen wir mit deinem Erscheinen rechnen?",element:jt});l.addEventListener("data",f=>{re.update(p=>(p.confidence=f/10,fetch("api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}),p))});const c=new B({audioFile:"final.mp3",text:"So, das war auch schon alles, wir freuen uns dich am 31.12 willkommen zu hei\xDFen, und w\xFCnschen dir bis dahin eine sch\xF6ne Weihnachtszeit."});return e.addAction("Auf jeden Fall!",t),e.addAction("Ne, eher nicht",n),t.addAction(i),i.addAction(r),r.addAction("Aber nat\xFCrlich!",o),r.addAction("Nein, dass wei\xDF ich noch nicht...",a),a.addAction(l),o.addAction(l),l.addAction(c),e}function Fe(s,e=[]){return s.type==="Bone"&&!e.includes(s)&&e.push(s),s.children.forEach(t=>{t.type==="Bone"&&!e.includes(t)&&e.push(t),t.children.length&&Fe(t,e)}),e}function O(s,e,t){return s*t+e*(1-t)}function Xt(s){const e={};return s.forEach(t=>{const{userData:{name:n}={}}=t;if(n){e[n]=t;const[i,r]=n.toLowerCase().split("_");r&&(e[i]=i in e?He(we({},e[i]),{[r]:t}):{[r]:t},e[i+"Array"]=i+"Array"in e?[...e[i+"Array"],t]:[t])}}),e}function Zt(s){let e=!1;return{name:s.name,get dirty(){return e},clear:()=>{e=!1},rotation:{_x:0,ox:s.rotation.x,get x(){return this.ox+this._x},set x(t){t!==this._x&&(this._x=t,e=!0)},_y:0,oy:s.rotation.y,get y(){return this.oy+this._y},set y(t){t!==this._y&&(this._y=t,this._dirty=!0)},_z:0,oz:s.rotation.z,get z(){return this.oz+this._z},set z(t){t!==this._z&&(this._z=t,e=!0)}},position:{ox:s.position.x,_x:0,get x(){return this.ox+this._x},set x(t){t!==this._x&&(this._x=t,e=!0)},oy:s.position.y,_y:0,get y(){return this.oy+this._y},set y(t){t!==this._y&&(this._y=t,e=!0)},oz:s.position.z,_z:0,get z(){return this.oz+this._z},set z(t){t!==this._z&&(this._z=t,e=!0)}},scale:{ox:s.scale.x,_x:0,get x(){return this.ox+this._x},set x(t){t!==this._x&&(this._x=t,e=!0)},oy:s.scale.y,_y:0,get y(){return this.oy+this._y},set y(t){t!==this._y&&(this._y=t,e=!0)},oz:s.scale.z,_z:0,get z(){return this.oz+this._z},set z(t){t!==this._z&&(this._z=t,e=!0)}},id:s.uuid}}function Me(s,e={bones:{}},t=0){if(s instanceof dt){if(s.uuid in e)return e[s.uuid];e.bones[s.uuid]=s;const r=Zt(s);return e[s.uuid]=r,r}if(Array.isArray(s))return s.map(r=>Me(r,e,t+1));const n={},i=Object.keys(s);return i.length&&i.forEach(r=>{n[r]=Me(s[r],e,t+1)}),t===0?{obj:n,cache:e}:n}function en(s){const{obj:e,cache:t}=Me(s);return e._bones=t.bones,delete t.bones,e._all=Object.values(t),e}function tn({_all:s,_bones:e}){s.forEach(t=>{if(!t.dirty)return;const n=e[t.id];!n||(n.rotation.x=O(t.rotation.x,n.rotation.x,.9),n.rotation.y=O(t.rotation.y,n.rotation.y,.9),n.rotation.z=O(t.rotation.z,n.rotation.z,.9),n.position.x=O(t.position.x,n.position.x,.9),n.position.y=O(t.position.y,n.position.y,.9),n.position.z=O(t.position.z,n.position.z,.9),n.scale.x=O(t.scale.x,n.scale.x,.9),n.scale.y=O(t.scale.y,n.scale.y,.9),n.scale.z=O(t.scale.z,n.scale.z,.9),t.clear())})}class nn{constructor({scene:e,camera:t,renderer:n}){this.boneArray=[],this._bones={circleArray:[],spineArray:[],mouthArray:[]},this.bones={},this.loaded=!1,this.conf={wiggleRim:.05,wiggleHat:.05,wiggleMouth:.05,wiggleEyes:.05},this.confKeys=[],this.controls=new ft(t,n.domElement),e.add(this.controls),this.params=we({},this.conf),this.confKeys=Object.keys(this.conf),window.c=this.controls,this.setActiveBone=this.setActiveBone.bind(this)}setActiveBone(e){const t=this.boneArray.find(n=>n.userData.name===e);this.controls.attach(t)}setSkeleton(e){!e||(this.boneArray=Fe(e),this._bones=Xt(this.boneArray),this.bones=en(this._bones),this.loaded=!!this.boneArray.length,console.log(this),window.anim=this)}update(e){if(!this.loaded)return;const{bones:t,conf:n,confKeys:i,params:r}=this;if(i.forEach(a=>{r[a]!==n[a]&&(n[a]=O(r[a],n[a],.05))}),n.wiggleRim&&t.circleArray.forEach((a,o)=>{a.position.y=Math.sin(e/300+o*2)/100*n.wiggleRim}),n.wiggleHat&&t.spineArray.forEach((a,o)=>{a.rotation.x=Math.sin(e/300+o*2)/100*n.wiggleHat,a.rotation.y=Math.sin(e/300+o*1)/100*n.wiggleHat,a.rotation.z=Math.sin(e/300+o*0)/100*n.wiggleHat}),n.wiggleMouth&&(t.mouth.r1.scale.x=Math.sin(e/100+10)/10*n.wiggleMouth,t.mouth.l2.scale.x=Math.sin(e/100+5)/10*n.wiggleMouth,t.mouth.l1.scale.x=Math.sin(e/100+1)/4*n.wiggleMouth-.2,t.mouth.r2.scale.x=Math.sin(e/100+2)/4*n.wiggleMouth-.2,t.mouth.l1.position.y=Math.sin(e/100)/300*n.wiggleMouth-.01,t.mouth.r1.position.y=Math.sin(e/100)/300*n.wiggleMouth-.01),n.wiggleEyes){const a=e/400;t.eyes.l1.scale.x=Math.sin(a+1)/4*n.wiggleEyes-.2,t.eyes.r2.scale.x=Math.sin(a+2)/4*n.wiggleEyes-.2,t.eyes.l1.position.y=Math.sin(a)/300*n.wiggleEyes+.01,t.eyes.r1.position.y=Math.sin(e/200)/300*n.wiggleEyes+.01}tn(this.bones)}}const qe=new _t,Ue=new pt;Ue.setDecoderPath("draco/");qe.setDRACOLoader(Ue);async function sn(){const s=new mt,e=s.load("SortingHat_col.png"),t=s.load("SortingHat_normal.png"),n=s.load("SortingHat_rough.png"),i=s.load("env_map.jpg");i.mapping=gt,e.flipY=!1,t.flipY=!1,n.flipY=!1;const r=new vt({map:e,normalMap:t,envMapIntensity:1,normalScale:new wt(1,1),roughnessMap:n}),a=await qe.loadAsync("sorting_hat.glb",l=>{console.log(l.loaded/l.total*100+"% loaded")}),o=a.scene.children[0].children[1];return o.material=r,a}function rn(s){let e,t,n,i;return{c(){e=fe("svg"),t=fe("path"),n=fe("path"),i=fe("path"),this.h()},l(r){e=_e(r,"svg",{viewBox:!0,style:!0,fill:!0,xmlns:!0});var a=k(e);t=_e(a,"path",{d:!0,stroke:!0,"stroke-width":!0}),k(t).forEach(u),n=_e(a,"path",{d:!0,stroke:!0,"stroke-width":!0}),k(n).forEach(u),i=_e(a,"path",{d:!0,stroke:!0,"stroke-width":!0}),k(i).forEach(u),a.forEach(u),this.h()},h(){m(t,"d","M68.8424 -13.5778V5.30176H27.4473C27.4473 18.0806 27.4473 24.2029 27.4473 35.5006C21.9253 42.4032 19.5381 59.3721 19.0348 66.9937V5.30176H7.17095V16.7342C32.6243 16.7342 80.1659 16.7342 66.7059 16.7342C53.2458 16.7342 41.684 22.6302 37.5855 25.5781H7.17095V66.9937H-15.0309"),m(t,"stroke","black"),m(t,"stroke-width","1"),m(n,"d","M55.6489 17.8342C55.6489 36.7637 40.3035 52.1091 21.374 52.1091"),m(n,"stroke","black"),m(n,"stroke-width","1"),m(i,"d","M41.8151 23.0153V39.6404H25.19"),m(i,"stroke","black"),m(i,"stroke-width","1"),m(e,"viewBox","0 0 70 68"),Z(e,"transform","rotate("+s[0]+")"),m(e,"fill","none"),m(e,"xmlns","http://www.w3.org/2000/svg")},m(r,a){x(r,e,a),g(e,t),g(e,n),g(e,i)},p(r,[a]){a&1&&Z(e,"transform","rotate("+r[0]+")")},i:z,o:z,d(r){r&&u(e)}}}function an(s,e,t){let{rotate:n="0deg"}=e;return s.$$set=i=>{"rotate"in i&&t(0,n=i.rotate)},[n]}class ge extends G{constructor(e){super();j(this,e,an,rn,W,{rotate:0})}}function ln(s){let e,t,n,i,r,a,o,l,c,f,p,d,_,E,h,y,b,M,q,V,U,F,N;return n=new ge({}),a=new ge({props:{rotate:"90deg"}}),c=new ge({props:{rotate:"180deg"}}),d=new ge({props:{rotate:"-90deg"}}),{c(){e=v("div"),t=v("div"),J(n.$$.fragment),i=D(),r=v("div"),J(a.$$.fragment),o=D(),l=v("div"),J(c.$$.fragment),f=D(),p=v("div"),J(d.$$.fragment),_=D(),E=v("div"),h=D(),y=v("div"),b=D(),M=v("div"),q=D(),V=v("div"),U=D(),F=v("div"),this.h()},l($){e=w($,"DIV",{class:!0});var T=k(e);t=w(T,"DIV",{class:!0});var ae=k(t);X(n.$$.fragment,ae),ae.forEach(u),i=I(T),r=w(T,"DIV",{class:!0});var le=k(r);X(a.$$.fragment,le),le.forEach(u),o=I(T),l=w(T,"DIV",{class:!0});var oe=k(l);X(c.$$.fragment,oe),oe.forEach(u),f=I(T),p=w(T,"DIV",{class:!0});var ce=k(p);X(d.$$.fragment,ce),ce.forEach(u),_=I(T),E=w(T,"DIV",{class:!0}),k(E).forEach(u),h=I(T),y=w(T,"DIV",{class:!0}),k(y).forEach(u),b=I(T),M=w(T,"DIV",{class:!0}),k(M).forEach(u),q=I(T),V=w(T,"DIV",{class:!0}),k(V).forEach(u),U=I(T),F=w(T,"DIV",{class:!0}),k(F).forEach(u),T.forEach(u),this.h()},h(){m(t,"class","pattern-wrapper svelte-1qzm7t1"),m(r,"class","pattern-wrapper p-tr svelte-1qzm7t1"),m(l,"class","pattern-wrapper p-br svelte-1qzm7t1"),m(p,"class","pattern-wrapper p-bl svelte-1qzm7t1"),m(E,"class","bar b-t svelte-1qzm7t1"),m(y,"class","bar b-r svelte-1qzm7t1"),m(M,"class","bar b-l svelte-1qzm7t1"),m(V,"class","bar b-b svelte-1qzm7t1"),m(F,"class","overlay svelte-1qzm7t1"),m(e,"class","wrapper svelte-1qzm7t1")},m($,T){x($,e,T),g(e,t),K(n,t,null),g(e,i),g(e,r),K(a,r,null),g(e,o),g(e,l),K(c,l,null),g(e,f),g(e,p),K(d,p,null),g(e,_),g(e,E),g(e,h),g(e,y),g(e,b),g(e,M),g(e,q),g(e,V),g(e,U),g(e,F),N=!0},p:z,i($){N||(A(n.$$.fragment,$),A(a.$$.fragment,$),A(c.$$.fragment,$),A(d.$$.fragment,$),N=!0)},o($){H(n.$$.fragment,$),H(a.$$.fragment,$),H(c.$$.fragment,$),H(d.$$.fragment,$),N=!1},d($){$&&u(e),Y(n),Y(a),Y(c),Y(d)}}}class on extends G{constructor(e){super();j(this,e,null,ln,W,{})}}function Pe(s,e,t){const n=s.slice();return n[5]=e[t],n[7]=t,n}function Ge(s){let e,t=s[0],n=[];for(let i=0;i<t.length;i+=1)n[i]=je(Pe(s,t,i));return{c(){for(let i=0;i<n.length;i+=1)n[i].c();e=P()},l(i){for(let r=0;r<n.length;r+=1)n[r].l(i);e=P()},m(i,r){for(let a=0;a<n.length;a+=1)n[a].m(i,r);x(i,e,r)},p(i,r){if(r&1){t=i[0];let a;for(a=0;a<t.length;a+=1){const o=Pe(i,t,a);n[a]?(n[a].p(o,r),A(n[a],1)):(n[a]=je(o),n[a].c(),A(n[a],1),n[a].m(e.parentNode,e))}for(;a<n.length;a+=1)n[a].d(1);n.length=t.length}},i(i){for(let r=0;r<t.length;r+=1)A(n[r])},o:z,d(i){xe(n,i),i&&u(e)}}}function je(s){let e,t=s[5]+"",n,i;return{c(){e=v("span"),n=R(t)},l(r){e=w(r,"SPAN",{});var a=k(e);n=L(a,t),a.forEach(u)},m(r,a){x(r,e,a),g(e,n)},p(r,a){s=r,a&1&&t!==(t=s[5]+"")&&be(n,t)},i(r){i||ue(()=>{i=Ee(e,yt,{duration:s[2],delay:s[7]*s[2]}),i.start()})},o:z,d(r){r&&u(e)}}}function cn(s){let e,t=s[1]&&Ge(s);return{c(){e=v("div"),t&&t.c(),this.h()},l(n){e=w(n,"DIV",{class:!0});var i=k(e);t&&t.l(i),i.forEach(u),this.h()},h(){m(e,"class","wrapper svelte-zdezep")},m(n,i){x(n,e,i),t&&t.m(e,null)},p(n,[i]){n[1]?t?(t.p(n,i),i&2&&A(t,1)):(t=Ge(n),t.c(),A(t,1),t.m(e,null)):t&&(t.d(1),t=null)},i(n){A(t)},o:z,d(n){n&&u(e),t&&t.d()}}}function un(s,e,t){let n,i,r,{text:a}=e,{duration:o}=e;return s.$$set=l=>{"text"in l&&t(3,a=l.text),"duration"in l&&t(4,o=l.duration)},s.$$.update=()=>{s.$$.dirty&8&&t(0,n=a.split(" ").map(l=>" "+l)),s.$$.dirty&17&&t(2,i=(o-.5)/n.length*1e3),s.$$.dirty&1&&t(1,r=!(n==null?void 0:n.length)),s.$$.dirty&1&&n.length&&setTimeout(()=>{t(1,r=!0)},200)},[n,r,i,a,o]}class hn extends G{constructor(e){super();j(this,e,un,cn,W,{text:3,duration:4})}}function dn(s){window.DeviceOrientationEvent?window.addEventListener("deviceorientation",function(){s([event.beta,event.gamma])},!0):window.DeviceMotionEvent?window.addEventListener("devicemotion",function(){s([event.acceleration.x*2,event.acceleration.y*2])},!0):window.addEventListener("MozOrientation",function(){s([orientation.x*50,orientation.y*50])},!0)}const{window:We}=At;function Je(s,e,t){const n=s.slice();return n[29]=e[t],n[31]=t,n}function Ke(s){let e,t;return e=new hn({props:{text:s[1].text,duration:s[1].duration}}),{c(){J(e.$$.fragment)},l(n){X(e.$$.fragment,n)},m(n,i){K(e,n,i),t=!0},p(n,i){const r={};i[0]&2&&(r.text=n[1].text),i[0]&2&&(r.duration=n[1].duration),e.$set(r)},i(n){t||(A(e.$$.fragment,n),t=!0)},o(n){H(e.$$.fragment,n),t=!1},d(n){Y(e,n)}}}function Ye(s){let e,t,n,i;const r=[pn,_n,fn],a=[];function o(l,c){return l[7]==="suspended"?0:l[7]==="finished"?1:l[7]==="input"?2:-1}return~(e=o(s))&&(t=a[e]=r[e](s)),{c(){t&&t.c(),n=P()},l(l){t&&t.l(l),n=P()},m(l,c){~e&&a[e].m(l,c),x(l,n,c),i=!0},p(l,c){let f=e;e=o(l),e===f?~e&&a[e].p(l,c):(t&&(me(),H(a[f],1,1,()=>{a[f]=null}),pe()),~e?(t=a[e],t?t.p(l,c):(t=a[e]=r[e](l),t.c()),A(t,1),t.m(n.parentNode,n)):t=null)},i(l){i||(A(t),i=!0)},o(l){H(t),i=!1},d(l){~e&&a[e].d(l),l&&u(n)}}}function fn(s){let e,t,n,i;function r(l){s[15](l)}var a=s[1].element;function o(l){let c={callback:l[14]};return l[0]!==void 0&&(c.showText=l[0]),{props:c}}return a&&(e=new a(o(s)),de.push(()=>ze(e,"showText",r))),{c(){e&&J(e.$$.fragment),n=P()},l(l){e&&X(e.$$.fragment,l),n=P()},m(l,c){e&&K(e,l,c),x(l,n,c),i=!0},p(l,c){const f={};if(c[0]&2&&(f.callback=l[14]),!t&&c[0]&1&&(t=!0,f.showText=l[0],Re(()=>t=!1)),a!==(a=l[1].element)){if(e){me();const p=e;H(p.$$.fragment,1,0,()=>{Y(p,1)}),pe()}a?(e=new a(o(l)),de.push(()=>ze(e,"showText",r)),J(e.$$.fragment),A(e.$$.fragment,1),K(e,n.parentNode,n)):e=null}else a&&e.$set(f)},i(l){i||(e&&A(e.$$.fragment,l),i=!0)},o(l){e&&H(e.$$.fragment,l),i=!1},d(l){l&&u(n),e&&Y(e,l)}}}function _n(s){var n,i;let e,t=((i=(n=s[1])==null?void 0:n.nextActions)==null?void 0:i.length)&&Qe(s);return{c(){t&&t.c(),e=P()},l(r){t&&t.l(r),e=P()},m(r,a){t&&t.m(r,a),x(r,e,a)},p(r,a){var o,l;((l=(o=r[1])==null?void 0:o.nextActions)==null?void 0:l.length)?t?(t.p(r,a),a[0]&2&&A(t,1)):(t=Qe(r),t.c(),A(t,1),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i(r){A(t)},o:z,d(r){t&&t.d(r),r&&u(e)}}}function pn(s){let e,t,n,i;return{c(){e=v("button"),t=R("Starten")},l(r){e=w(r,"BUTTON",{});var a=k(e);t=L(a,"Starten"),a.forEach(u)},m(r,a){x(r,e,a),g(e,t),n||(i=C(e,"click",s[12]),n=!0)},p:z,i:z,o:z,d(r){r&&u(e),n=!1,i()}}}function Qe(s){let e,t=s[1].nextActions,n=[];for(let i=0;i<t.length;i+=1)n[i]=Xe(Je(s,t,i));return{c(){e=v("div");for(let i=0;i<n.length;i+=1)n[i].c()},l(i){e=w(i,"DIV",{});var r=k(e);for(let a=0;a<n.length;a+=1)n[a].l(r);r.forEach(u)},m(i,r){x(i,e,r);for(let a=0;a<n.length;a+=1)n[a].m(e,null)},p(i,r){if(r[0]&2){t=i[1].nextActions;let a;for(a=0;a<t.length;a+=1){const o=Je(i,t,a);n[a]?(n[a].p(o,r),A(n[a],1)):(n[a]=Xe(o),n[a].c(),A(n[a],1),n[a].m(e,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=t.length}},i(i){for(let r=0;r<t.length;r+=1)A(n[r])},o:z,d(i){i&&u(e),xe(n,i)}}}function Xe(s){let e,t=s[29].name+"",n,i,r,a;function o(){return s[13](s[29])}return{c(){e=v("button"),n=R(t)},l(l){e=w(l,"BUTTON",{});var c=k(e);n=L(c,t),c.forEach(u)},m(l,c){x(l,e,c),g(e,n),r||(a=C(e,"click",o),r=!0)},p(l,c){s=l,c[0]&2&&t!==(t=s[29].name+"")&&be(n,t)},i(l){i||ue(()=>{i=Ee(e,he,{duration:200,delay:200*s[31]}),i.start()})},o:z,d(l){l&&u(e),r=!1,a()}}}function mn(s){var E;let e,t,n,i,r,a,o,l,c,f,p;t=new on({});let d=((E=s[1])==null?void 0:E.text)&&(s[7]==="running"||s[7]==="finished"||s[7]==="input")&&s[6]&&Ke(s),_=s[7]&&Ye(s);return{c(){e=D(),J(t.$$.fragment),n=D(),i=v("main"),r=v("canvas"),a=D(),o=v("div"),d&&d.c(),l=D(),_&&_.c(),this.h()},l(h){bt('[data-svelte="svelte-tqpvny"]',document.head).forEach(u),e=I(h),X(t.$$.fragment,h),n=I(h),i=w(h,"MAIN",{class:!0});var b=k(i);r=w(b,"CANVAS",{class:!0}),k(r).forEach(u),a=I(b),o=w(b,"DIV",{class:!0});var M=k(o);d&&d.l(M),l=I(M),_&&_.l(M),M.forEach(u),b.forEach(u),this.h()},h(){document.title="Dungeon Entry",m(r,"class","svelte-in2d0c"),Le(r,"loaded",s[3]),m(o,"class","content svelte-in2d0c"),m(i,"class","svelte-in2d0c")},m(h,y){x(h,e,y),K(t,h,y),x(h,n,y),x(h,i,y),g(i,r),s[10](r),g(i,a),g(i,o),d&&d.m(o,null),g(o,l),_&&_.m(o,null),c=!0,f||(p=[C(We,"mousemove",s[8]),C(We,"resize",s[9]),C(r,"click",s[11])],f=!0)},p(h,y){var b;y[0]&8&&Le(r,"loaded",h[3]),((b=h[1])==null?void 0:b.text)&&(h[7]==="running"||h[7]==="finished"||h[7]==="input")&&h[6]?d?(d.p(h,y),y[0]&194&&A(d,1)):(d=Ke(h),d.c(),A(d,1),d.m(o,l)):d&&(me(),H(d,1,1,()=>{d=null}),pe()),h[7]?_?(_.p(h,y),y[0]&128&&A(_,1)):(_=Ye(h),_.c(),A(_,1),_.m(o,null)):_&&(me(),H(_,1,1,()=>{_=null}),pe())},i(h){c||(A(t.$$.fragment,h),A(d),A(_),c=!0)},o(h){H(t.$$.fragment,h),H(d),H(_),c=!1},d(h){h&&u(e),Y(t,h),h&&u(n),h&&u(i),s[10](null),d&&d.d(),_&&_.d(),f=!1,ye(p)}}}const ve=500;function gn(s,e,t){let n,i,r,a,o=z,l=()=>(o(),o=zt(i,S=>t(7,a=S)),i);kt(s,Oe,S=>t(1,r=S)),s.$$.on_destroy.push(()=>o());let c;const f=new Et,p=new $e(12626431,.8);p.position.set(2.5,2.5,2),f.add(p);const d=new $e(16765393,.8);d.position.set(-2.5,2.5,2),f.add(d);const _=new $e(16777215,1);_.position.set(1,1,-1.5),f.add(_);let E=!0;const h=ve;let y=ve,b=h,M=0,q=0,V=0,U=0,F=!1;const N=new xt(50,ve/h,.1,1e3);N.position.set(0,0,1);let $;function T({clientX:S,clientY:Q}){V=2-S/b*2-1,U=Q/y*2-1}async function ae(){const S=await sn(),Q=S.scene.children[0].children[1],ne=S.scene.children[0].children[0];$.setSkeleton(ne),Q.geometry.computeBoundingBox();const ie=new Mt,se=Q.geometry.boundingBox;se.getCenter(ie),N.position.x=ie.x,N.position.y=ie.y;const ee=(se.max.y-ie.y)*4/2/Math.tan(Math.PI*N.fov/360);N.position.z=ee,f.add(S.scene),t(3,F=!0)}function le(){y=window.innerHeight,b=window.innerWidth}ke(()=>{y=window.innerHeight,b=window.innerWidth;let S,Q;dn(([ee,Se,vn])=>{S||(S=ee),Q||(Q=Se),V=(Q-Se)/180,U=(S-ee)/180}),ae();const ne=new $t({canvas:c,alpha:!0});ne.setSize(ve,h),t(4,$=new nn({scene:f,renderer:ne,camera:N})),Qt($).setActive();function se(ee){requestAnimationFrame(se),$==null||$.update(ee),M=O(V,M,.1),q=O(U,q,.1),N.position.x=M*.8,N.position.y=q*.3+.1,N.lookAt(0,.2,0),Te()}function Te(){ne.render(f,N)}se(0)});function oe(S){de[S?"unshift":"push"](()=>{c=S,t(2,c)})}const ce=()=>{$.params.wiggleRim<1&&(t(4,$.params.wiggleRim=5,$),t(4,$.params.wiggleEyes=1,$),setTimeout(()=>{t(4,$.params.wiggleRim=0,$),t(4,$.params.wiggleEyes=0,$)},1e3))},Ze=()=>r.start(),et=S=>S.action.start(),tt=S=>{r.handleElementCallback(S)};function nt(S){E=S,t(0,E)}return s.$$.update=()=>{s.$$.dirty[0]&1&&t(6,n=E===!0||E===void 0),s.$$.dirty[0]&2&&l(t(5,i=r&&r.state))},[E,r,c,F,$,i,n,a,T,le,oe,ce,Ze,et,tt,nt]}class bn extends G{constructor(e){super();j(this,e,gn,mn,W,{},null,[-1,-1])}}export{bn as default};