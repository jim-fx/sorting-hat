import{S as se,i as oe,s as ne,e as k,t as D,k as y,l as R,c as E,a as T,g as N,d as h,n as U,f as z,G as b,P,h as B,H as O,N as K,A as ie,b as H,Z as V}from"../../chunks/vendor-ed08ca3a.js";import{g as re,p as X}from"../../chunks/index-0f7edb9d.js";import{u as ce,q as F}from"../../chunks/stores-f3c3934b.js";import{e as ae,o as fe}from"../../chunks/ws-9a419573.js";function I(c,e,l){const o=c.slice();return o[15]=e[l],o}function J(c,e,l){const o=c.slice();return o[18]=e[l],o}function W(c,e,l){const o=c.slice();return o[21]=e[l],o}function Y(c,e,l){const o=c.slice();return o[12]=e[l],o}function ue(c){let e,l;return{c(){e=k("p"),l=D("results")},l(o){e=E(o,"P",{});var n=T(e);l=N(n,"results"),n.forEach(h)},m(o,n){z(o,e,n),b(e,l)},p:O,d(o){o&&h(e)}}}function _e(c){var g,v;let e,l,o,n,a=((g=c[0])==null?void 0:g.description)+"",_,p,r,u,i=((v=c[0])==null?void 0:v.answers)&&$(c);function t(d,w){if(d[2]==="open")return be;if(d[2]==="voting-open")return pe;if(d[2]==="closed")return de}let f=t(c),s=f&&f(c);return{c(){e=k("h3"),l=D("Active Question:"),o=y(),n=k("p"),_=D(a),p=y(),i&&i.c(),r=y(),s&&s.c(),u=R()},l(d){e=E(d,"H3",{});var w=T(e);l=N(w,"Active Question:"),w.forEach(h),o=U(d),n=E(d,"P",{});var j=T(n);_=N(j,a),j.forEach(h),p=U(d),i&&i.l(d),r=U(d),s&&s.l(d),u=R()},m(d,w){z(d,e,w),b(e,l),z(d,o,w),z(d,n,w),b(n,_),z(d,p,w),i&&i.m(d,w),z(d,r,w),s&&s.m(d,w),z(d,u,w)},p(d,w){var j,S;w&1&&a!==(a=((j=d[0])==null?void 0:j.description)+"")&&B(_,a),((S=d[0])==null?void 0:S.answers)?i?i.p(d,w):(i=$(d),i.c(),i.m(r.parentNode,r)):i&&(i.d(1),i=null),f===(f=t(d))&&s?s.p(d,w):(s&&s.d(1),s=f&&f(d),s&&(s.c(),s.m(u.parentNode,u)))},d(d){d&&h(e),d&&h(o),d&&h(n),d&&h(p),i&&i.d(d),d&&h(r),s&&s.d(d),d&&h(u)}}}function he(c){let e,l,o,n,a,_=c[4].users.length+"",p,r,u,i,t,f,s,g,v,d,w,j,S=c[1],Q=[];for(let m=0;m<S.length;m+=1)Q[m]=le(Y(c,S,m));return{c(){e=k("button"),l=D("Start Quiz"),o=y(),n=k("p"),a=D("Users "),p=D(_),r=y(),u=k("table"),i=k("thead"),t=k("td"),f=D("Name"),s=y(),g=k("td"),v=D("House"),d=y();for(let m=0;m<Q.length;m+=1)Q[m].c();this.h()},l(m){e=E(m,"BUTTON",{});var A=T(e);l=N(A,"Start Quiz"),A.forEach(h),o=U(m),n=E(m,"P",{});var q=T(n);a=N(q,"Users "),p=N(q,_),q.forEach(h),r=U(m),u=E(m,"TABLE",{class:!0});var C=T(u);i=E(C,"THEAD",{});var L=T(i);t=E(L,"TD",{class:!0});var M=T(t);f=N(M,"Name"),M.forEach(h),s=U(L),g=E(L,"TD",{class:!0});var Z=T(g);v=N(Z,"House"),Z.forEach(h),L.forEach(h),d=U(C);for(let G=0;G<Q.length;G+=1)Q[G].l(C);C.forEach(h),this.h()},h(){H(t,"class","svelte-kozcbt"),H(g,"class","svelte-kozcbt"),H(u,"class","svelte-kozcbt")},m(m,A){z(m,e,A),b(e,l),z(m,o,A),z(m,n,A),b(n,a),b(n,p),z(m,r,A),z(m,u,A),b(u,i),b(i,t),b(t,f),b(i,s),b(i,g),b(g,v),b(u,d);for(let q=0;q<Q.length;q+=1)Q[q].m(u,null);w||(j=P(e,"click",c[7]),w=!0)},p(m,A){if(A&16&&_!==(_=m[4].users.length+"")&&B(p,_),A&2){S=m[1];let q;for(q=0;q<S.length;q+=1){const C=Y(m,S,q);Q[q]?Q[q].p(C,A):(Q[q]=le(C),Q[q].c(),Q[q].m(u,null))}for(;q<Q.length;q+=1)Q[q].d(1);Q.length=S.length}},d(m){m&&h(e),m&&h(o),m&&h(n),m&&h(r),m&&h(u),V(Q,m),w=!1,j()}}}function $(c){let e,l,o,n,a,_,p=c[0].answers,r=[];for(let t=0;t<p.length;t+=1)r[t]=x(W(c,p,t));let u=c[1],i=[];for(let t=0;t<u.length;t+=1)i[t]=te(I(c,u,t));return{c(){e=k("table"),l=k("thead"),o=k("td"),n=D("User"),a=y();for(let t=0;t<r.length;t+=1)r[t].c();_=y();for(let t=0;t<i.length;t+=1)i[t].c();this.h()},l(t){e=E(t,"TABLE",{class:!0});var f=T(e);l=E(f,"THEAD",{});var s=T(l);o=E(s,"TD",{class:!0});var g=T(o);n=N(g,"User"),g.forEach(h),a=U(s);for(let v=0;v<r.length;v+=1)r[v].l(s);s.forEach(h),_=U(f);for(let v=0;v<i.length;v+=1)i[v].l(f);f.forEach(h),this.h()},h(){H(o,"class","svelte-kozcbt"),H(e,"class","svelte-kozcbt")},m(t,f){z(t,e,f),b(e,l),b(l,o),b(o,n),b(l,a);for(let s=0;s<r.length;s+=1)r[s].m(l,null);b(e,_);for(let s=0;s<i.length;s+=1)i[s].m(e,null)},p(t,f){if(f&1){p=t[0].answers;let s;for(s=0;s<p.length;s+=1){const g=W(t,p,s);r[s]?r[s].p(g,f):(r[s]=x(g),r[s].c(),r[s].m(l,null))}for(;s<r.length;s+=1)r[s].d(1);r.length=p.length}if(f&3){u=t[1];let s;for(s=0;s<u.length;s+=1){const g=I(t,u,s);i[s]?i[s].p(g,f):(i[s]=te(g),i[s].c(),i[s].m(e,null))}for(;s<i.length;s+=1)i[s].d(1);i.length=u.length}},d(t){t&&h(e),V(r,t),V(i,t)}}}function x(c){let e,l=c[21].value+"",o;return{c(){e=k("td"),o=D(l),this.h()},l(n){e=E(n,"TD",{class:!0});var a=T(e);o=N(a,l),a.forEach(h),this.h()},h(){H(e,"class","svelte-kozcbt")},m(n,a){z(n,e,a),b(e,o)},p(n,a){a&1&&l!==(l=n[21].value+"")&&B(o,l)},d(n){n&&h(e)}}}function ee(c){let e,l=(c[18].votes.includes(c[15].id)?"X":" ")+"",o;return{c(){e=k("td"),o=D(l),this.h()},l(n){e=E(n,"TD",{class:!0});var a=T(e);o=N(a,l),a.forEach(h),this.h()},h(){H(e,"class","svelte-kozcbt")},m(n,a){z(n,e,a),b(e,o)},p(n,a){a&3&&l!==(l=(n[18].votes.includes(n[15].id)?"X":" ")+"")&&B(o,l)},d(n){n&&h(e)}}}function te(c){let e,l,o=c[15].name+"",n,a,_,p=c[0].answers,r=[];for(let u=0;u<p.length;u+=1)r[u]=ee(J(c,p,u));return{c(){e=k("tr"),l=k("td"),n=D(o),a=y();for(let u=0;u<r.length;u+=1)r[u].c();_=y(),this.h()},l(u){e=E(u,"TR",{class:!0});var i=T(e);l=E(i,"TD",{class:!0});var t=T(l);n=N(t,o),t.forEach(h),a=U(i);for(let f=0;f<r.length;f+=1)r[f].l(i);_=U(i),i.forEach(h),this.h()},h(){H(l,"class","svelte-kozcbt"),H(e,"class","svelte-kozcbt")},m(u,i){z(u,e,i),b(e,l),b(l,n),b(e,a);for(let t=0;t<r.length;t+=1)r[t].m(e,null);b(e,_)},p(u,i){if(i&2&&o!==(o=u[15].name+"")&&B(n,o),i&3){p=u[0].answers;let t;for(t=0;t<p.length;t+=1){const f=J(u,p,t);r[t]?r[t].p(f,i):(r[t]=ee(f),r[t].c(),r[t].m(e,_))}for(;t<r.length;t+=1)r[t].d(1);r.length=p.length}},d(u){u&&h(e),V(r,u)}}}function de(c){let e,l,o,n;return{c(){e=k("button"),l=D("End Question")},l(a){e=E(a,"BUTTON",{});var _=T(e);l=N(_,"End Question"),_.forEach(h)},m(a,_){z(a,e,_),b(e,l),o||(n=P(e,"click",c[10]),o=!0)},p:O,d(a){a&&h(e),o=!1,n()}}}function pe(c){let e,l,o,n;return{c(){e=k("button"),l=D("Close Voting")},l(a){e=E(a,"BUTTON",{});var _=T(e);l=N(_,"Close Voting"),_.forEach(h)},m(a,_){z(a,e,_),b(e,l),o||(n=P(e,"click",c[9]),o=!0)},p:O,d(a){a&&h(e),o=!1,n()}}}function be(c){let e,l,o,n;return{c(){e=k("button"),l=D("Close Question")},l(a){e=E(a,"BUTTON",{});var _=T(e);l=N(_,"Close Question"),_.forEach(h)},m(a,_){z(a,e,_),b(e,l),o||(n=P(e,"click",c[8]),o=!0)},p:O,d(a){a&&h(e),o=!1,n()}}}function le(c){let e,l,o=c[12].name+"",n,a,_,p=c[12].house+"",r,u;return{c(){e=k("tr"),l=k("td"),n=D(o),a=y(),_=k("td"),r=D(p),u=y(),this.h()},l(i){e=E(i,"TR",{class:!0});var t=T(e);l=E(t,"TD",{class:!0});var f=T(l);n=N(f,o),f.forEach(h),a=U(t),_=E(t,"TD",{class:!0});var s=T(_);r=N(s,p),s.forEach(h),u=U(t),t.forEach(h),this.h()},h(){H(l,"class","svelte-kozcbt"),H(_,"class","svelte-kozcbt"),H(e,"class","svelte-kozcbt")},m(i,t){z(i,e,t),b(e,l),b(l,n),b(e,a),b(e,_),b(_,r),b(e,u)},p(i,t){t&2&&o!==(o=i[12].name+"")&&B(n,o),t&2&&p!==(p=i[12].house+"")&&B(r,p)},d(i){i&&h(e)}}}function me(c){let e,l,o,n,a,_,p,r;function u(f,s){if(f[3]==="registration")return he;if(f[3]==="running")return _e;if(f[3]==="results")return ue}let i=u(c),t=i&&i(c);return{c(){e=k("h1"),l=D(c[3]),o=D("."),n=D(c[2]),a=y(),t&&t.c(),_=R()},l(f){e=E(f,"H1",{});var s=T(e);l=N(s,c[3]),o=N(s,"."),n=N(s,c[2]),s.forEach(h),a=U(f),t&&t.l(f),_=R()},m(f,s){z(f,e,s),b(e,l),b(e,o),b(e,n),z(f,a,s),t&&t.m(f,s),z(f,_,s),p||(r=P(window,"keydown",c[5]),p=!0)},p(f,[s]){s&8&&B(l,f[3]),s&4&&B(n,f[2]),i===(i=u(f))&&t?t.p(f,s):(t&&t.d(1),t=i&&i(f),t&&(t.c(),t.m(_.parentNode,_)))},i:O,o:O,d(f){f&&h(e),f&&h(a),t&&t.d(f),f&&h(_),p=!1,r()}}}function ve(c,e,l){let o,n,a,_,p,r,u;K(c,ce,v=>l(11,p=v)),K(c,F,v=>l(6,r=v)),K(c,F,v=>l(4,u=v));async function i({key:v}){if(v==="L"){const d=await re("api/quiz");console.log(await d.json())}}ie(()=>{ae("quiz.admin",p),fe("question.answers",v=>{l(0,n.answers=v.answers,n)})});const t=()=>{X("api/quiz",{action:"start-quiz"})},f=()=>{X("api/quiz",{action:"close-question"})},s=()=>{X("api/quiz",{action:"close-voting"})},g=()=>{X("api/quiz",{action:"end-question"})};return c.$$.update=()=>{c.$$.dirty&64&&l(3,o=r==null?void 0:r.state),c.$$.dirty&64&&l(0,n=r==null?void 0:r.activeQuestion),c.$$.dirty&1&&l(2,a=(n==null?void 0:n.state)||""),c.$$.dirty&64&&l(1,_=r==null?void 0:r.users),c.$$.dirty&64&&r&&console.log(r)},[n,_,a,o,u,i,r,t,f,s,g]}class ge extends se{constructor(e){super();oe(this,e,ve,me,ne,{})}}export{ge as default};
