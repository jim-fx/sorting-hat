var ct=Object.defineProperty,ut=Object.defineProperties;var ft=Object.getOwnPropertyDescriptors;var xe=Object.getOwnPropertySymbols;var ht=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable;var pe=(s,e,t)=>e in s?ct(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,ge=(s,e)=>{for(var t in e||(e={}))ht.call(e,t)&&pe(s,t,e[t]);if(xe)for(var t of xe(e))dt.call(e,t)&&pe(s,t,e[t]);return s},Ae=(s,e)=>ut(s,ft(e));var S=(s,e,t)=>(pe(s,typeof e!="symbol"?e+"":e,t),t);import{N as _t,S as q,i as U,s as P,e as w,c as y,a as M,d as p,b as x,f as b,H as k,t as D,k as B,g as C,n as $,G as T,O as ze,P as j,Q as Te,h as me,R as pt,l as O,T as gt,x as A,u as F,A as re,U as K,V as ce,W as Me,X as J,Y as be,Z as ve,_ as mt,$ as X,a0 as we,j as Z,m as ue,F as ee,o as te,a1 as Re,v as ne,C as Se,a2 as bt,a3 as vt,a4 as wt,a5 as yt,a6 as kt,a7 as Et,a8 as xt,a9 as Ne,aa as At,ab as fe,M as ie,ac as Ie,ad as Y,ae as Le,af as De,ag as zt,ah as Tt,w as se,ai as Mt,r as oe,aj as Rt,ak as St}from"../chunks/vendor-3db4c2b7.js";import{g as Nt,p as It}from"../chunks/index-21c51c30.js";import{f as Ce,u as G,q as Lt}from"../chunks/stores-f6a5ebba.js";import{p as he}from"../chunks/pointerStore-4d3bf170.js";/* empty css                                                      */const Dt=()=>{const s=_t("__svelte__");return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},session:s.session}},Ct={subscribe(s){return Dt().page.subscribe(s)}};function Ft(s){let e,t,n,i,o,a,r,l,c,u,_;return{c(){e=w("p"),t=D("Ganzen Namen eingeben:"),n=B(),i=w("input"),o=B(),a=w("br"),r=B(),l=w("button"),c=D("fertig"),this.h()},l(h){e=y(h,"P",{});var d=M(e);t=C(d,"Ganzen Namen eingeben:"),d.forEach(p),n=$(h),i=y(h,"INPUT",{placeholder:!0,type:!0}),o=$(h),a=y(h,"BR",{}),r=$(h),l=y(h,"BUTTON",{});var g=M(l);c=C(g,"fertig"),g.forEach(p),this.h()},h(){x(i,"placeholder","Namen..."),x(i,"type","text")},m(h,d){b(h,e,d),T(e,t),b(h,n,d),b(h,i,d),ze(i,s[1]),b(h,o,d),b(h,a,d),b(h,r,d),b(h,l,d),T(l,c),u||(_=[j(i,"input",s[6]),j(i,"keydown",s[3]),j(l,"click",s[7])],u=!0)},p(h,d){d&2&&i.value!==h[1]&&ze(i,h[1])},d(h){h&&p(e),h&&p(n),h&&p(i),h&&p(o),h&&p(a),h&&p(r),h&&p(l),u=!1,Te(_)}}}function Ht(s){let e,t,n,i,o,a,r,l,c,u,_,h,d,g,f,m;return{c(){e=w("p"),t=D("Alles klar, "),n=w("b"),i=D(s[1]),o=D(", ist das der richtige Name?"),a=B(),r=w("br"),l=B(),c=w("div"),u=w("button"),_=D("Ja"),h=B(),d=w("button"),g=D("Nein")},l(v){e=y(v,"P",{});var E=M(e);t=C(E,"Alles klar, "),n=y(E,"B",{});var H=M(n);i=C(H,s[1]),H.forEach(p),o=C(E,", ist das der richtige Name?"),E.forEach(p),a=$(v),r=y(v,"BR",{}),l=$(v),c=y(v,"DIV",{});var I=M(c);u=y(I,"BUTTON",{});var W=M(u);_=C(W,"Ja"),W.forEach(p),h=$(I),d=y(I,"BUTTON",{});var L=M(d);g=C(L,"Nein"),L.forEach(p),I.forEach(p)},m(v,E){b(v,e,E),T(e,t),T(e,n),T(n,i),T(e,o),b(v,a,E),b(v,r,E),b(v,l,E),b(v,c,E),T(c,u),T(u,_),T(c,h),T(c,d),T(d,g),f||(m=[j(u,"click",s[4]),j(d,"click",s[5])],f=!0)},p(v,E){E&2&&me(i,v[1])},d(v){v&&p(e),v&&p(a),v&&p(r),v&&p(l),v&&p(c),f=!1,Te(m)}}}function Bt(s){let e;function t(o,a){return o[2]?Ht:Ft}let n=t(s),i=n(s);return{c(){e=w("div"),i.c(),this.h()},l(o){e=y(o,"DIV",{class:!0});var a=M(e);i.l(a),a.forEach(p),this.h()},h(){x(e,"class","wrapper svelte-1terpu9")},m(o,a){b(o,e,a),i.m(e,null)},p(o,[a]){n===(n=t(o))&&i?i.p(o,a):(i.d(1),i=n(o),i&&(i.c(),i.m(e,null)))},i:k,o:k,d(o){o&&p(e),i.d()}}}function $t(s,e,t){let{callback:n}=e,i,o=!1;function a({key:_}){_==="Enter"&&t(2,o=!0)}const r=()=>n(i),l=()=>{t(2,o=!1)};function c(){i=this.value,t(1,i)}const u=()=>{t(2,o=!0)};return s.$$set=_=>{"callback"in _&&t(0,n=_.callback)},[n,i,o,a,r,l,c,u]}class Ot extends q{constructor(e){super();U(this,e,$t,Bt,P,{callback:0})}}function Vt(s){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function jt(s){let e,t=s[6]+"",n,i,o,a,r,l,c,u,_,h,d;function g(){return s[3](s[6])}return{c(){e=w("h1"),n=D(t),i=B(),o=w("img"),l=B(),c=w("button"),u=D("Okay"),this.h()},l(f){e=y(f,"H1",{class:!0});var m=M(e);n=C(m,t),m.forEach(p),i=$(f),o=y(f,"IMG",{src:!0,alt:!0,class:!0}),l=$(f),c=y(f,"BUTTON",{});var v=M(c);u=C(v,"Okay"),v.forEach(p),this.h()},h(){x(e,"class","svelte-16th1rs"),K(o.src,a="icons/"+s[6]+".svg")||x(o,"src",a),x(o,"alt","crest of house "+s[1]),x(o,"class","svelte-16th1rs")},m(f,m){b(f,e,m),T(e,n),b(f,i,m),b(f,o,m),b(f,l,m),b(f,c,m),T(c,u),_=!0,h||(d=j(c,"click",g),h=!0)},p(f,m){s=f},i(f){_||(ce(()=>{r||(r=Me(o,J,{},!0)),r.run(1)}),_=!0)},o(f){r||(r=Me(o,J,{},!1)),r.run(0),_=!1},d(f){f&&p(e),f&&p(i),f&&p(o),f&&r&&r.end(),f&&p(l),f&&p(c),h=!1,d()}}}function qt(s){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function Ut(s){let e,t,n={ctx:s,current:null,token:null,hasCatch:!1,pending:qt,then:jt,catch:Vt,value:6,blocks:[,,,]};return pt(s[1],n),{c(){e=O(),n.block.c()},l(i){e=O(),n.block.l(i)},m(i,o){b(i,e,o),n.block.m(i,n.anchor=o),n.mount=()=>e.parentNode,n.anchor=e,t=!0},p(i,[o]){s=i,gt(n,s,o)},i(i){t||(A(n.block),t=!0)},o(i){for(let o=0;o<3;o+=1){const a=n.blocks[o];F(a)}t=!1},d(i){i&&p(e),n.block.d(i),n.token=null,n=null}}}function Pt(s,e,t){const n=!1,i=["ravenclaw","gryffindor","slytherin","hufflepuff"];async function o(){const c=await(await Nt("api/houses")).text();return c.length>20?i[Math.floor(Math.random()*i.length)]:c}let a=o(),{callback:r}=e;re(async()=>{const c=await a,u=new Audio("audio/"+c+".mp3");u.play();const _=new Audio("audio/cheers.mp3"),h=setInterval(()=>{u.currentTime/u.duration>.2&&_.paused&&(_.play(),clearInterval(h))},50);u.addEventListener("progress",()=>{})});const l=c=>r(c);return s.$$set=c=>{"callback"in c&&t(0,r=c.callback)},[r,a,n,l]}class Gt extends q{constructor(e){super();U(this,e,Pt,Ut,P,{showText:2,callback:0})}get showText(){return this.$$.ctx[2]}}function Fe(s,e,t){const n=s.slice();return n[4]=e[t],n[6]=t,n}function He(s){let e,t,n,i,o,a;function r(){return s[3](s[4])}return{c(){e=w("img"),this.h()},l(l){e=y(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){K(e.src,t="icons/"+s[4]+".svg")||x(e,"src",t),x(e,"alt",n="crest of house "+s[4]),x(e,"class","svelte-16fuc7d")},m(l,c){b(l,e,c),o||(a=j(e,"click",r),o=!0)},p(l,c){s=l},i(l){i||ce(()=>{i=be(e,J,{delay:s[6]*200,duration:1200}),i.start()})},o:k,d(l){l&&p(e),o=!1,a()}}}function Wt(s){let e,t=s[0],n=[];for(let i=0;i<t.length;i+=1)n[i]=He(Fe(s,t,i));return{c(){e=w("div");for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=y(i,"DIV",{class:!0});var o=M(e);for(let a=0;a<n.length;a+=1)n[a].l(o);o.forEach(p),this.h()},h(){x(e,"class","wrapper svelte-16fuc7d")},m(i,o){b(i,e,o);for(let a=0;a<n.length;a+=1)n[a].m(e,null)},p(i,[o]){if(o&3){t=i[0];let a;for(a=0;a<t.length;a+=1){const r=Fe(i,t,a);n[a]?(n[a].p(r,o),A(n[a],1)):(n[a]=He(r),n[a].c(),A(n[a],1),n[a].m(e,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=t.length}},i(i){for(let o=0;o<t.length;o+=1)A(n[o])},o:k,d(i){i&&p(e),ve(n,i)}}}function Qt(s,e,t){let{callback:n}=e;const i=["ravenclaw","gryffindor","slytherin","hufflepuff"];function o(r){const l=new Audio("audio/"+r+".mp3");l.play(),l.addEventListener("ended",()=>{setTimeout(()=>{n(r)},200)})}const a=r=>o(r);return s.$$set=r=>{"callback"in r&&t(2,n=r.callback)},[i,o,n,a]}class Kt extends q{constructor(e){super();U(this,e,Qt,Wt,P,{callback:2})}}function Yt(s){let e,t,n,i,o,a,r,l,c,u,_;function h(g){s[3](g)}let d={max:10,pips:!0,id:"range-slider",all:"label"};return s[1]!==void 0&&(d.values=s[1]),n=new mt({props:d}),X.push(()=>we(n,"values",h)),{c(){e=w("div"),t=w("div"),i=w("div"),Z(n.$$.fragment),a=B(),r=w("button"),l=D("Okay"),this.h()},l(g){e=y(g,"DIV",{class:!0});var f=M(e);t=y(f,"DIV",{class:!0});var m=M(t);i=y(m,"DIV",{style:!0});var v=M(i);ue(n.$$.fragment,v),m.forEach(p),a=$(f),r=y(f,"BUTTON",{});var E=M(r);l=C(E,"Okay"),E.forEach(p),f.forEach(p),this.h()},h(){ee(i,"display","contents"),ee(i,"--handle-focus","white"),ee(i,"--range-slider","black"),ee(i,"--range-handle","black"),ee(i,"--range-float-text","white"),x(t,"class","range-wrapper svelte-1ni4obk"),x(e,"class","wrapper svelte-1ni4obk")},m(g,f){b(g,e,f),T(e,t),T(t,i),te(n,i,null),T(e,a),T(e,r),T(r,l),c=!0,u||(_=j(r,"click",s[4]),u=!0)},p(g,[f]){const m={};!o&&f&2&&(o=!0,m.values=g[1],Re(()=>o=!1)),n.$set(m)},i(g){c||(A(n.$$.fragment,g),c=!0)},o(g){F(n.$$.fragment,g),c=!1},d(g){g&&p(e),ne(n),u=!1,_()}}}function Jt(s,e,t){let{callback:n}=e;const i=!0;let o=[5];function a(l){o=l,t(1,o)}const r=()=>n(o[0]);return s.$$set=l=>{"callback"in l&&t(0,n=l.callback)},[n,o,i,a,r]}class Xt extends q{constructor(e){super();U(this,e,Jt,Yt,P,{callback:0,showText:2})}get showText(){return this.$$.ctx[2]}}function Zt(s){let e,t,n,i,o,a;return{c(){e=w("video"),t=w("source"),i=w("source"),a=w("track"),this.h()},l(r){e=y(r,"VIDEO",{width:!0,height:!0,class:!0});var l=M(e);t=y(l,"SOURCE",{src:!0,type:!0}),i=y(l,"SOURCE",{src:!0,type:!0}),a=y(l,"TRACK",{kind:!0}),l.forEach(p),this.h()},h(){K(t.src,n=""+(s[0]+"video/video.webm"))||x(t,"src",n),x(t,"type","video/webm"),K(i.src,o=""+(s[0]+"video/video.mp4"))||x(i,"src",o),x(i,"type","video/mp4"),x(a,"kind","captions"),x(e,"width","500"),x(e,"height","281"),e.controls=!0,e.autoplay=!0,x(e,"class","svelte-k2j555")},m(r,l){b(r,e,l),T(e,t),T(e,i),T(e,a)},p(r,[l]){l&1&&!K(t.src,n=""+(r[0]+"video/video.webm"))&&x(t,"src",n),l&1&&!K(i.src,o=""+(r[0]+"video/video.mp4"))&&x(i,"src",o)},i:k,o:k,d(r){r&&p(e)}}}function en(s,e,t){const n=!1;let i="";return re(()=>{t(0,i=window.location.pathname)}),[i,n]}class tn extends q{constructor(e){super();U(this,e,en,Zt,P,{showText:1})}get showText(){return this.$$.ctx[1]}}const Be=Se(),de=class{constructor({audioFile:e,element:t,text:n}){S(this,"audio");S(this,"text");S(this,"duration",5);S(this,"isLast",!0);S(this,"state",Se("suspended"));S(this,"nextActions",[]);S(this,"data");S(this,"element");S(this,"events",{});this.text=n,this.element=t,e&&(this.audio=new Audio("audio/"+e))}async start(){if(this.setActive(),await bt(),this.emit("start"),this.audio){this.duration=this.audio.duration,this.state.set("running"),this.audio.play(),de.anim.params.wiggleMouth=1;const e=setInterval(()=>{this.emit("progress",this.audio.currentTime/this.audio.duration)},200);this.audio.addEventListener("ended",()=>{clearInterval(e),setTimeout(()=>{this.speechEnded()},500)},{once:!0})}else this.duration=5,this.text&&(this.duration=Math.max(this.text.split(" ").length*.08,2),console.log(this.duration)),this.state.set("running"),setTimeout(()=>{this.speechEnded()},this.duration*1e3)}speechEnded(){this.emit("speech-ended"),de.anim.params.wiggleMouth=0,this.element?this.state.set("input"):this.finish()}handleElementCallback(e){console.log("Got Data: ",e),this.data=e,this.emit("data",e),this.finish()}finish(){this.state.set("finished"),this.emit("end"),console.log("Finished",this.nextActions),this.nextActions.length===1&&!("name"in this.nextActions[0])&&this.nextActions[0].action.start(),this.nextActions.length||Ce.set(!0)}emit(e,t){e in this.events&&this.events[e].forEach(n=>n(t))}addEventListener(e,t){return this.events[e]=e in this.events?[...this.events[e],t]:[t],()=>{this.events[e]=this.events[e].filter(n=>n!==t)}}setActive(){Be.set(this)}addAction(e,t){this.isLast=!1,typeof e!="string"?this.nextActions.push({action:e}):this.nextActions.push({name:e,action:t})}};let V=de;S(V,"anim");function nn(s){V.anim=s;const e=new V({audioFile:"teilnehmen.mp3",text:"So so, du willst also an der Silvesterparty im Dungeon teilnehmen?"});e.addEventListener("start",()=>{s.params.wiggleMouth=1}),e.addEventListener("end",()=>{s.params.wiggleMouth=0,s.params.wiggleEyes=1});const t=new V({audioFile:"namen.mp3",text:"Sehr sch\xF6n, verstanden, jetzt br\xE4uchte ich noch deinen Namen?",element:Ot});t.addEventListener("data",_=>{console.log("Got Name",_),G.update(h=>(h.name=_,h))});const n=new V({audioFile:"unterhaltung.mp3",text:"Das ist nat\xFCrlich auch in Ordnung, damit du aber trotzdem nicht leer ausgehst habe ich hier etwas Unterhaltung f\xFCr dich:",element:tn}),i=new V({audioFile:"exzellenter_gast.mp3",text:"Naja, okay, wenn das sooo ist? Dann werden wir mal schauen... Verstanden, du siehst wie ein exzellenter Gast aus."}),o=new V({audioFile:"welches_haus.mp3",text:"Weisst du den schon zu welchem der vier H\xE4user du geh\xF6rst?"});o.addEventListener("data",_=>{G.update(h=>(h.house=_,h))});const a=new V({audioFile:"random_haus.mp3",text:"Okay, um das herauszufinden bin ich ja hier. Dann werde ich mal  schauen, hmm, ich sehe Mut, aber auch Intelligenz, oh, und hier ist auch noch Empathie. Schwierige Entscheidung, aber ich denke:",element:Gt});a.addEventListener("start",()=>{s.params.wiggleMouth=1}),a.addEventListener("progress",_=>{_>.34&&(s.params.wiggleRim=2,s.params.wiggleHat=2,s.params.wiggleEyes=1)}),a.addEventListener("speech-ended",()=>{s.params.wiggleMouth=0,s.params.wiggleHat=.2,s.params.wiggleEyes=0,s.params.wiggleRim=.2}),a.addEventListener("data",_=>{G.update(h=>(h.house=_,h))});const r=new V({text:"W\xE4hle nun dein Haus aus:",element:Kt});r.addEventListener("data",_=>{G.update(h=>(h.house=_,h))});const l=new V({audioFile:"sicherheit.mp3",text:"Nun zu letzten Frage, auf einer Skala von 0 bis 10, wie sicher k\xF6nnen wir mit deinem Erscheinen rechnen?",element:Xt});l.addEventListener("data",_=>{G.update(h=>(h.confidence=_/10,It("api",h),h))});const c=new V({audioFile:"final.mp3",text:"So, das war auch schon alles. Wir freuen uns, dich am 31.12 willkommen zu hei\xDFen, und w\xFCnschen dir bis dahin eine sch\xF6ne Weihnachtszeit."});e.addAction("Auf jeden Fall!",t),e.addAction("Ne, eher nicht",n),t.addAction(i),i.addAction(o),o.addAction("Aber nat\xFCrlich!",r),o.addAction("Nein, dass wei\xDF ich noch nicht...",a),a.addAction(l),r.addAction(l),l.addAction(c);const u=vt(G);return u.name&&u.house&&"confidence"in u?c:e}function $e(s,e=[]){return s.type==="Bone"&&!e.includes(s)&&e.push(s),s.children.forEach(t=>{t.type==="Bone"&&!e.includes(t)&&e.push(t),t.children.length&&$e(t,e)}),e}function N(s,e,t){return s*t+e*(1-t)}function sn(s){const e={};return s.forEach(t=>{const{userData:{name:n}={}}=t;if(n){e[n]=t;const[i,o]=n.toLowerCase().split("_");o&&(e[i]=i in e?Ae(ge({},e[i]),{[o]:t}):{[o]:t},e[i+"Array"]=i+"Array"in e?[...e[i+"Array"],t]:[t])}}),e}function on(s){let e=!1;return{name:s.name,get dirty(){return e},clear:()=>{e=!1},rotation:{_x:0,ox:s.rotation.x,get x(){return this.ox+this._x},set x(t){t!==this._x&&(this._x=t,e=!0)},_y:0,oy:s.rotation.y,get y(){return this.oy+this._y},set y(t){t!==this._y&&(this._y=t,this._dirty=!0)},_z:0,oz:s.rotation.z,get z(){return this.oz+this._z},set z(t){t!==this._z&&(this._z=t,e=!0)}},position:{ox:s.position.x,_x:0,get x(){return this.ox+this._x},set x(t){t!==this._x&&(this._x=t,e=!0)},oy:s.position.y,_y:0,get y(){return this.oy+this._y},set y(t){t!==this._y&&(this._y=t,e=!0)},oz:s.position.z,_z:0,get z(){return this.oz+this._z},set z(t){t!==this._z&&(this._z=t,e=!0)}},scale:{ox:s.scale.x,_x:0,get x(){return this.ox+this._x},set x(t){t!==this._x&&(this._x=t,e=!0)},oy:s.scale.y,_y:0,get y(){return this.oy+this._y},set y(t){t!==this._y&&(this._y=t,e=!0)},oz:s.scale.z,_z:0,get z(){return this.oz+this._z},set z(t){t!==this._z&&(this._z=t,e=!0)}},id:s.uuid}}function ye(s,e={bones:{}},t=0){if(s instanceof wt){if(s.uuid in e)return e[s.uuid];e.bones[s.uuid]=s;const o=on(s);return e[s.uuid]=o,o}if(Array.isArray(s))return s.map(o=>ye(o,e,t+1));const n={},i=Object.keys(s);return i.length&&i.forEach(o=>{n[o]=ye(s[o],e,t+1)}),t===0?{obj:n,cache:e}:n}function an(s){const{obj:e,cache:t}=ye(s);return e._bones=t.bones,delete t.bones,e._all=Object.values(t),e}function ln({_all:s,_bones:e}){s.forEach(t=>{if(!t.dirty)return;const n=e[t.id];!n||(n.rotation.x=N(t.rotation.x,n.rotation.x,.9),n.rotation.y=N(t.rotation.y,n.rotation.y,.9),n.rotation.z=N(t.rotation.z,n.rotation.z,.9),n.position.x=N(t.position.x,n.position.x,.9),n.position.y=N(t.position.y,n.position.y,.9),n.position.z=N(t.position.z,n.position.z,.9),n.scale.x=N(t.scale.x,n.scale.x,.9),n.scale.y=N(t.scale.y,n.scale.y,.9),n.scale.z=N(t.scale.z,n.scale.z,.9),t.clear())})}class rn{constructor({scene:e,camera:t,renderer:n}){S(this,"boneArray",[]);S(this,"_bones",{circleArray:[],spineArray:[],mouthArray:[]});S(this,"bones",{});S(this,"loaded",!1);S(this,"controls");S(this,"conf",{wiggleRim:.05,wiggleHat:.05,wiggleMouth:.05,wiggleEyes:.05});S(this,"confKeys",[]);S(this,"params");this.controls=new yt(t,n.domElement),e.add(this.controls),this.params=ge({},this.conf),this.confKeys=Object.keys(this.conf),window.c=this.controls,this.setActiveBone=this.setActiveBone.bind(this)}setActiveBone(e){const t=this.boneArray.find(n=>n.userData.name===e);this.controls.attach(t)}setSkeleton(e){!e||(this.boneArray=$e(e),this._bones=sn(this.boneArray),this.bones=an(this._bones),this.loaded=!!this.boneArray.length)}update(e){if(!this.loaded)return;const{bones:t,conf:n,confKeys:i,params:o}=this;if(i.forEach(a=>{o[a]!==n[a]&&(n[a]=N(o[a],n[a],.05))}),n.wiggleRim&&t.circleArray.forEach((a,r)=>{a.position.y=Math.sin(e/300+r*2)/100*n.wiggleRim}),n.wiggleHat&&t.spineArray.forEach((a,r)=>{a.rotation.x=Math.sin(e/300+r*2)/100*n.wiggleHat,a.rotation.y=Math.sin(e/300+r*1)/100*n.wiggleHat,a.rotation.z=Math.sin(e/300+r*0)/100*n.wiggleHat}),n.wiggleMouth&&(t.mouth.r1.scale.x=Math.sin(e/100+10)/10*n.wiggleMouth,t.mouth.l2.scale.x=Math.sin(e/100+5)/10*n.wiggleMouth,t.mouth.l1.scale.x=Math.sin(e/100+1)/4*n.wiggleMouth-.2,t.mouth.r2.scale.x=Math.sin(e/100+2)/4*n.wiggleMouth-.2,t.mouth.l1.position.y=Math.sin(e/100)/300*n.wiggleMouth-.01,t.mouth.r1.position.y=Math.sin(e/100)/300*n.wiggleMouth-.01),n.wiggleEyes){const a=e/400;t.eyes.l1.scale.x=Math.sin(a+1)/4*n.wiggleEyes-.2,t.eyes.r2.scale.x=Math.sin(a+2)/4*n.wiggleEyes-.2,t.eyes.l1.position.y=Math.sin(a)/300*n.wiggleEyes+.01,t.eyes.r1.position.y=Math.sin(e/200)/300*n.wiggleEyes+.01}ln(this.bones)}}const Oe=new kt,cn=new Et,Ve=new xt;Ve.setDecoderPath("draco/");Oe.setDRACOLoader(Ve);function un(s){return cn.load(s)}function je(s,e){return Oe.loadAsync(s,e)}async function fn(){const s=un("textures/SortingHat_col.jpg");s.flipY=!1;const e=new Ne({map:s}),t=await je("sorting_hat.glb",i=>{console.log(i.loaded/i.total*100+"% loaded")}),n=t.scene.children[0].children[1];return n.material=e,t}function qe(s){return new Promise((e,t)=>{const n=new Image;n.src=s,n.onerror=i=>t(i),n.onload=()=>e(n)})}async function hn(s,e){const t=new FontFace(s,`url(${e})`);return await t.loaded,t}async function dn({name:s="",house:e=""}={}){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d"),i=new At(t);i.flipY=!1;function o(){n.textAlign="center",n.font="10px Chantelli",n.fillText("Herzlich Willkommen",325,390),n.font="15px Chantelli bold",n.fillText(s,325,420),i.needsUpdate=!0}hn("Chantelli","fonts/Chantelli_Antiqua-webfont.woff").then(()=>o()),qe("textures/book_col.jpg").then(async c=>{n.drawImage(c,0,0,512,512),o();const u=await qe(`icons/${e}.svg`);n.drawImage(u,270,240,120,120),o()});const a=new Ne({map:i}),r=await je("book.glb",c=>{console.log(c.loaded/c.total*100+"% loaded")}),l=r.scene.children[0].children[1];return l.material=a,r}var Ue={loadHat:fn,loadBook:dn};function _n(s){let e,t;return{c(){e=w("canvas"),this.h()},l(n){e=y(n,"CANVAS",{style:!0,class:!0}),M(e).forEach(p),this.h()},h(){x(e,"style",t=`visibility:${s[1]!=="loading"?"visible":"hidden"}`),x(e,"class","svelte-rl5rk3"),fe(e,"loaded",s[1]!=="loading")},m(n,i){b(n,e,i),s[2](e)},p(n,[i]){i&2&&t!==(t=`visibility:${n[1]!=="loading"?"visible":"hidden"}`)&&x(e,"style",t),i&2&&fe(e,"loaded",n[1]!=="loading")},i:k,o:k,d(n){n&&p(e),s[2](null)}}}const ke=500;function Pe(s){return s<.5?16*s*s*s*s*s:1-Math.pow(-2*s+2,5)/2}function pn(s,e,t){let n;ie(s,G,E=>t(8,n=E));let i;const o=new Ie,a=new Y(12626431,.8);a.position.set(2.5,2.5,2),o.add(a);const r=new Y(16765393,.8);r.position.set(-2.5,2.5,2),o.add(r);const l=new Y(16777215,1);l.position.set(1,1,-1.5),o.add(l);const c=ke;let u=0,_=0,h="loading";const d=new Le(50,ke/c,.1,1e3);d.position.set(-.2,.8,-.1);const g={};async function f(){const E=await Ue.loadBook(n);E.scene.children[0].children[1].skeleton.bones.forEach(I=>{g[I.userData.name]=I}),g.Left.rotation.z=0,g.Left.position.x=-.02,g.Right.rotation.z=0,g.Right.position.x=.02,g.Root.rotation.z=-1.5-Math.PI*2,o.add(E.scene.children[0]),setTimeout(()=>{t(1,h="rotating")},500),window.skeleton=g}let m=0;re(()=>{f();const E=new De({canvas:i,alpha:!0});E.setSize(ke,c);function H(W){switch(requestAnimationFrame(H),u=N(he.x/-5,u,.1),_=N(he.y/-5,_,.1)+.03,d.position.x=u,d.position.z=_,d.lookAt(0,0,0),h){case"rotating":m++;const L=Pe(m/120);g.Root.rotation.z=N(-1.5-Math.PI*2,0,1-L),m>120&&(m=0,t(1,h="opening"));break;case"opening":m++;const R=Pe(m/120);g.Left.rotation.z=N(1.67,0,R),g.Left.position.x=N(-.05,-.02,R),g.Right.rotation.z=N(-1.67,0,R),g.Right.position.x=N(.05,.02,R),m>120&&t(1,h="opened");break}I()}function I(){E.render(o,d)}H()});function v(E){X[E?"unshift":"push"](()=>{i=E,t(0,i)})}return[i,h,v]}class gn extends q{constructor(e){super();U(this,e,pn,_n,P,{})}}function Ge(s,e,t){const n=s.slice();return n[5]=e[t],n[7]=t,n}function We(s){let e,t=s[0],n=[];for(let i=0;i<t.length;i+=1)n[i]=Qe(Ge(s,t,i));return{c(){for(let i=0;i<n.length;i+=1)n[i].c();e=O()},l(i){for(let o=0;o<n.length;o+=1)n[o].l(i);e=O()},m(i,o){for(let a=0;a<n.length;a+=1)n[a].m(i,o);b(i,e,o)},p(i,o){if(o&1){t=i[0];let a;for(a=0;a<t.length;a+=1){const r=Ge(i,t,a);n[a]?(n[a].p(r,o),A(n[a],1)):(n[a]=Qe(r),n[a].c(),A(n[a],1),n[a].m(e.parentNode,e))}for(;a<n.length;a+=1)n[a].d(1);n.length=t.length}},i(i){for(let o=0;o<t.length;o+=1)A(n[o])},o:k,d(i){ve(n,i),i&&p(e)}}}function Qe(s){let e,t=s[5]+"",n,i;return{c(){e=w("span"),n=D(t)},l(o){e=y(o,"SPAN",{});var a=M(e);n=C(a,t),a.forEach(p)},m(o,a){b(o,e,a),T(e,n)},p(o,a){s=o,a&1&&t!==(t=s[5]+"")&&me(n,t)},i(o){i||ce(()=>{i=be(e,zt,{duration:s[2],delay:s[7]*s[2]}),i.start()})},o:k,d(o){o&&p(e)}}}function mn(s){let e,t=s[1]&&We(s);return{c(){e=w("div"),t&&t.c(),this.h()},l(n){e=y(n,"DIV",{class:!0});var i=M(e);t&&t.l(i),i.forEach(p),this.h()},h(){x(e,"class","wrapper svelte-zdezep")},m(n,i){b(n,e,i),t&&t.m(e,null)},p(n,[i]){n[1]?t?(t.p(n,i),i&2&&A(t,1)):(t=We(n),t.c(),A(t,1),t.m(e,null)):t&&(t.d(1),t=null)},i(n){A(t)},o:k,d(n){n&&p(e),t&&t.d()}}}function bn(s,e,t){let n,i,o,{text:a}=e,{duration:r}=e;return s.$$set=l=>{"text"in l&&t(3,a=l.text),"duration"in l&&t(4,r=l.duration)},s.$$.update=()=>{s.$$.dirty&8&&t(0,n=a.split(" ").map(l=>" "+l)),s.$$.dirty&17&&t(2,i=(r-.5)/n.length*1e3),s.$$.dirty&1&&t(1,o=!(n==null?void 0:n.length)),s.$$.dirty&1&&n.length&&setTimeout(()=>{t(1,o=!0)},200)},[n,o,i,a,r]}class vn extends q{constructor(e){super();U(this,e,bn,mn,P,{text:3,duration:4})}}function Ke(s,e,t){const n=s.slice();return n[26]=e[t],n[28]=t,n}function Ye(s){let e,t;return{c(){e=w("a"),t=D("Enter Quiz"),this.h()},l(n){e=y(n,"A",{href:!0});var i=M(e);t=C(i,"Enter Quiz"),i.forEach(p),this.h()},h(){x(e,"href","/quiz")},m(n,i){b(n,e,i),T(e,t)},d(n){n&&p(e)}}}function wn(s){var h;let e,t,n,i,o,a,r,l,c,u=((h=s[1])==null?void 0:h.text)&&(s[10]==="running"||s[10]==="finished"||s[10]==="input")&&s[6]&&Je(s),_=s[10]&&Xe(s);return{c(){e=w("canvas"),i=B(),o=w("div"),u&&u.c(),a=B(),_&&_.c(),this.h()},l(d){e=y(d,"CANVAS",{style:!0,class:!0}),M(e).forEach(p),i=$(d),o=y(d,"DIV",{class:!0});var g=M(o);u&&u.l(g),a=$(g),_&&_.l(g),g.forEach(p),this.h()},h(){x(e,"style",t=`visibility:${s[3]?"visible":"hidden"}`),x(e,"class","svelte-1gtioab"),fe(e,"loaded",s[3]),x(o,"class","content svelte-1gtioab")},m(d,g){b(d,e,g),s[11](e),b(d,i,g),b(d,o,g),u&&u.m(o,null),T(o,a),_&&_.m(o,null),r=!0,l||(c=j(e,"click",s[12]),l=!0)},p(d,g){var f;(!r||g&8&&t!==(t=`visibility:${d[3]?"visible":"hidden"}`))&&x(e,"style",t),g&8&&fe(e,"loaded",d[3]),((f=d[1])==null?void 0:f.text)&&(d[10]==="running"||d[10]==="finished"||d[10]==="input")&&d[6]?u?(u.p(d,g),g&1090&&A(u,1)):(u=Je(d),u.c(),A(u,1),u.m(o,a)):u&&(oe(),F(u,1,1,()=>{u=null}),se()),d[10]?_?(_.p(d,g),g&1024&&A(_,1)):(_=Xe(d),_.c(),A(_,1),_.m(o,null)):_&&(oe(),F(_,1,1,()=>{_=null}),se())},i(d){r||(n&&n.end(1),A(u),A(_),r=!0)},o(d){n=Rt(e,J,{}),F(u),F(_),r=!1},d(d){d&&p(e),s[11](null),d&&n&&n.end(),d&&p(i),d&&p(o),u&&u.d(),_&&_.d(),l=!1,c()}}}function yn(s){let e,t;return e=new gn({}),{c(){Z(e.$$.fragment)},l(n){ue(e.$$.fragment,n)},m(n,i){te(e,n,i),t=!0},p:k,i(n){t||(A(e.$$.fragment,n),t=!0)},o(n){F(e.$$.fragment,n),t=!1},d(n){ne(e,n)}}}function Je(s){let e,t;return e=new vn({props:{text:s[1].text,duration:s[1].duration}}),{c(){Z(e.$$.fragment)},l(n){ue(e.$$.fragment,n)},m(n,i){te(e,n,i),t=!0},p(n,i){const o={};i&2&&(o.text=n[1].text),i&2&&(o.duration=n[1].duration),e.$set(o)},i(n){t||(A(e.$$.fragment,n),t=!0)},o(n){F(e.$$.fragment,n),t=!1},d(n){ne(e,n)}}}function Xe(s){let e,t,n,i;const o=[xn,En,kn],a=[];function r(l,c){return l[10]==="suspended"?0:l[10]==="finished"?1:l[10]==="input"?2:-1}return~(e=r(s))&&(t=a[e]=o[e](s)),{c(){t&&t.c(),n=O()},l(l){t&&t.l(l),n=O()},m(l,c){~e&&a[e].m(l,c),b(l,n,c),i=!0},p(l,c){let u=e;e=r(l),e===u?~e&&a[e].p(l,c):(t&&(oe(),F(a[u],1,1,()=>{a[u]=null}),se()),~e?(t=a[e],t?t.p(l,c):(t=a[e]=o[e](l),t.c()),A(t,1),t.m(n.parentNode,n)):t=null)},i(l){i||(A(t),i=!0)},o(l){F(t),i=!1},d(l){~e&&a[e].d(l),l&&p(n)}}}function kn(s){let e,t,n,i;function o(l){s[16](l)}var a=s[1].element;function r(l){let c={callback:l[15]};return l[0]!==void 0&&(c.showText=l[0]),{props:c}}return a&&(e=new a(r(s)),X.push(()=>we(e,"showText",o))),{c(){e&&Z(e.$$.fragment),n=O()},l(l){e&&ue(e.$$.fragment,l),n=O()},m(l,c){e&&te(e,l,c),b(l,n,c),i=!0},p(l,c){const u={};if(c&2&&(u.callback=l[15]),!t&&c&1&&(t=!0,u.showText=l[0],Re(()=>t=!1)),a!==(a=l[1].element)){if(e){oe();const _=e;F(_.$$.fragment,1,0,()=>{ne(_,1)}),se()}a?(e=new a(r(l)),X.push(()=>we(e,"showText",o)),Z(e.$$.fragment),A(e.$$.fragment,1),te(e,n.parentNode,n)):e=null}else a&&e.$set(u)},i(l){i||(e&&A(e.$$.fragment,l),i=!0)},o(l){e&&F(e.$$.fragment,l),i=!1},d(l){l&&p(n),e&&ne(e,l)}}}function En(s){var n,i;let e,t=((i=(n=s[1])==null?void 0:n.nextActions)==null?void 0:i.length)&&Ze(s);return{c(){t&&t.c(),e=O()},l(o){t&&t.l(o),e=O()},m(o,a){t&&t.m(o,a),b(o,e,a)},p(o,a){var r,l;((l=(r=o[1])==null?void 0:r.nextActions)==null?void 0:l.length)?t?(t.p(o,a),a&2&&A(t,1)):(t=Ze(o),t.c(),A(t,1),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i(o){A(t)},o:k,d(o){t&&t.d(o),o&&p(e)}}}function xn(s){let e,t,n,i;return{c(){e=w("button"),t=D("Starten")},l(o){e=y(o,"BUTTON",{});var a=M(e);t=C(a,"Starten"),a.forEach(p)},m(o,a){b(o,e,a),T(e,t),n||(i=j(e,"click",s[13]),n=!0)},p:k,i:k,o:k,d(o){o&&p(e),n=!1,i()}}}function Ze(s){let e,t=s[1].nextActions,n=[];for(let i=0;i<t.length;i+=1)n[i]=et(Ke(s,t,i));return{c(){e=w("div");for(let i=0;i<n.length;i+=1)n[i].c()},l(i){e=y(i,"DIV",{});var o=M(e);for(let a=0;a<n.length;a+=1)n[a].l(o);o.forEach(p)},m(i,o){b(i,e,o);for(let a=0;a<n.length;a+=1)n[a].m(e,null)},p(i,o){if(o&2){t=i[1].nextActions;let a;for(a=0;a<t.length;a+=1){const r=Ke(i,t,a);n[a]?(n[a].p(r,o),A(n[a],1)):(n[a]=et(r),n[a].c(),A(n[a],1),n[a].m(e,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=t.length}},i(i){for(let o=0;o<t.length;o+=1)A(n[o])},o:k,d(i){i&&p(e),ve(n,i)}}}function et(s){let e,t=s[26].name+"",n,i,o,a;function r(){return s[14](s[26])}return{c(){e=w("button"),n=D(t)},l(l){e=y(l,"BUTTON",{});var c=M(e);n=C(c,t),c.forEach(p)},m(l,c){b(l,e,c),T(e,n),o||(a=j(e,"click",r),o=!0)},p(l,c){s=l,c&2&&t!==(t=s[26].name+"")&&me(n,t)},i(l){i||ce(()=>{i=be(e,J,{duration:200,delay:200*s[28]}),i.start()})},o:k,d(l){l&&p(e),o=!1,a()}}}function An(s){var h,d,g;let e,t=((h=s[7])==null?void 0:h.state)==="registration"&&!((d=s[8])==null?void 0:d.path.includes("quiz"))&&!((g=s[8])==null?void 0:g.path.includes("admin")),n,i,o,a,r,l=t&&Ye();const c=[yn,wn],u=[];function _(f,m){return f[9]?0:1}return i=_(s),o=u[i]=c[i](s),{c(){e=B(),l&&l.c(),n=B(),o.c(),a=O(),this.h()},l(f){Tt('[data-svelte="svelte-tqpvny"]',document.head).forEach(p),e=$(f),l&&l.l(f),n=$(f),o.l(f),a=O(),this.h()},h(){document.title="Dungeon Entry"},m(f,m){b(f,e,m),l&&l.m(f,m),b(f,n,m),u[i].m(f,m),b(f,a,m),r=!0},p(f,[m]){var E,H,I;m&384&&(t=((E=f[7])==null?void 0:E.state)==="registration"&&!((H=f[8])==null?void 0:H.path.includes("quiz"))&&!((I=f[8])==null?void 0:I.path.includes("admin"))),t?l||(l=Ye(),l.c(),l.m(n.parentNode,n)):l&&(l.d(1),l=null);let v=i;i=_(f),i===v?u[i].p(f,m):(oe(),F(u[v],1,1,()=>{u[v]=null}),se(),o=u[i],o?o.p(f,m):(o=u[i]=c[i](f),o.c()),A(o,1),o.m(a.parentNode,a))},i(f){r||(A(o),r=!0)},o(f){F(o),r=!1},d(f){f&&p(e),l&&l.d(f),f&&p(n),u[i].d(f),f&&p(a)}}}const Ee=500;function zn(s,e,t){let n,i,o,a,r,l,c,u=k,_=()=>(u(),u=Mt(i,z=>t(10,c=z)),i);ie(s,Be,z=>t(1,o=z)),ie(s,Lt,z=>t(7,a=z)),ie(s,Ct,z=>t(8,r=z)),ie(s,Ce,z=>t(9,l=z)),s.$$.on_destroy.push(()=>u());let h;const d=new Ie,g=new Y(12626431,.8);g.position.set(2.5,2.5,2),d.add(g);const f=new Y(16765393,.8);f.position.set(-2.5,2.5,2),d.add(f);const m=new Y(16777215,1);m.position.set(1,1,-1.5),d.add(m);let v=!0;const E=Ee;let H=0,I=0,W=!1;const L=new Le(50,Ee/E,.1,1e3);L.position.set(0,0,1);let R;async function tt(){const z=await Ue.loadHat(),_e=z.scene.children[0].children[1],ae=z.scene.children[0].children[0];R.setSkeleton(ae),_e.geometry.computeBoundingBox();const Q=new St,le=_e.geometry.boundingBox;le.getCenter(Q),L.position.x=Q.x,L.position.y=Q.y;const rt=(le.max.y-Q.y)*4/2/Math.tan(Math.PI*L.fov/360);L.position.z=rt,d.add(z.scene),t(3,W=!0)}re(()=>{tt();const z=new De({canvas:h,alpha:!0});z.setSize(Ee,E),t(4,R=new rn({scene:d,renderer:z,camera:L})),nn(R).setActive();function ae(le){requestAnimationFrame(ae),R==null||R.update(le),H=N(he.x,H,.1),I=N(he.y,I,.1),L.position.x=H*-.8,L.position.y=I*.3+.1,L.lookAt(0,.2,0),Q()}function Q(){z.render(d,L)}ae(0)});function nt(z){X[z?"unshift":"push"](()=>{h=z,t(2,h)})}const it=()=>{R.params.wiggleRim<1&&(t(4,R.params.wiggleRim=5,R),t(4,R.params.wiggleEyes=1,R),setTimeout(()=>{t(4,R.params.wiggleRim=0,R),t(4,R.params.wiggleEyes=0,R)},1e3))},st=()=>o.start(),ot=z=>z.action.start(),at=z=>{o.handleElementCallback(z)};function lt(z){v=z,t(0,v)}return s.$$.update=()=>{s.$$.dirty&1&&t(6,n=v===!0||v===void 0),s.$$.dirty&2&&_(t(5,i=o&&o.state))},[v,o,h,W,R,i,n,a,r,l,c,nt,it,st,ot,at,lt]}class Dn extends q{constructor(e){super();U(this,e,zn,An,P,{})}}export{Dn as default};
