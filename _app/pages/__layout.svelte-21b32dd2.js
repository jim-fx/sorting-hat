import{S as K,i as L,s as P,D as O,E as Q,a as _,d as o,b as i,F as Y,f as I,G as u,H as R,e as g,j as M,k as w,c as $,m as A,n as E,o as N,x as z,u as C,v as S,I as re,J as ae,l as Z,K as ne,L as le,M as ie,t as oe,g as fe,N as ee,A as ue}from"../chunks/vendor-1794dca4.js";import{g as ce}from"../chunks/index-e98830f3.js";import{q as te}from"../chunks/stores-7a7e5634.js";/* empty css                                                      */function pe(n){let e,r,s,a;return{c(){e=O("svg"),r=O("path"),s=O("path"),a=O("path"),this.h()},l(c){e=Q(c,"svg",{viewBox:!0,style:!0,fill:!0,xmlns:!0});var l=_(e);r=Q(l,"path",{d:!0,stroke:!0,"stroke-width":!0}),_(r).forEach(o),s=Q(l,"path",{d:!0,stroke:!0,"stroke-width":!0}),_(s).forEach(o),a=Q(l,"path",{d:!0,stroke:!0,"stroke-width":!0}),_(a).forEach(o),l.forEach(o),this.h()},h(){i(r,"d","M68.8424 -13.5778V5.30176H27.4473C27.4473 18.0806 27.4473 24.2029 27.4473 35.5006C21.9253 42.4032 19.5381 59.3721 19.0348 66.9937V5.30176H7.17095V16.7342C32.6243 16.7342 80.1659 16.7342 66.7059 16.7342C53.2458 16.7342 41.684 22.6302 37.5855 25.5781H7.17095V66.9937H-15.0309"),i(r,"stroke","black"),i(r,"stroke-width","1"),i(s,"d","M55.6489 17.8342C55.6489 36.7637 40.3035 52.1091 21.374 52.1091"),i(s,"stroke","black"),i(s,"stroke-width","1"),i(a,"d","M41.8151 23.0153V39.6404H25.19"),i(a,"stroke","black"),i(a,"stroke-width","1"),i(e,"viewBox","0 0 70 68"),Y(e,"transform","rotate("+n[0]+")"),i(e,"fill","none"),i(e,"xmlns","http://www.w3.org/2000/svg")},m(c,l){I(c,e,l),u(e,r),u(e,s),u(e,a)},p(c,[l]){l&1&&Y(e,"transform","rotate("+c[0]+")")},i:R,o:R,d(c){c&&o(e)}}}function de(n,e,r){let{rotate:s="0deg"}=e;return n.$$set=a=>{"rotate"in a&&r(0,s=a.rotate)},[s]}class F extends K{constructor(e){super();L(this,e,de,pe,P,{rotate:0})}}function ve(n){let e,r,s,a,c,l,d,b,f,v,y,k,D,t,m,V,q,x,G,j,J,H,B;return s=new F({}),l=new F({props:{rotate:"90deg"}}),f=new F({props:{rotate:"180deg"}}),k=new F({props:{rotate:"-90deg"}}),{c(){e=g("div"),r=g("div"),M(s.$$.fragment),a=w(),c=g("div"),M(l.$$.fragment),d=w(),b=g("div"),M(f.$$.fragment),v=w(),y=g("div"),M(k.$$.fragment),D=w(),t=g("div"),m=w(),V=g("div"),q=w(),x=g("div"),G=w(),j=g("div"),J=w(),H=g("div"),this.h()},l(h){e=$(h,"DIV",{class:!0});var p=_(e);r=$(p,"DIV",{class:!0});var T=_(r);A(s.$$.fragment,T),T.forEach(o),a=E(p),c=$(p,"DIV",{class:!0});var U=_(c);A(l.$$.fragment,U),U.forEach(o),d=E(p),b=$(p,"DIV",{class:!0});var W=_(b);A(f.$$.fragment,W),W.forEach(o),v=E(p),y=$(p,"DIV",{class:!0});var X=_(y);A(k.$$.fragment,X),X.forEach(o),D=E(p),t=$(p,"DIV",{class:!0}),_(t).forEach(o),m=E(p),V=$(p,"DIV",{class:!0}),_(V).forEach(o),q=E(p),x=$(p,"DIV",{class:!0}),_(x).forEach(o),G=E(p),j=$(p,"DIV",{class:!0}),_(j).forEach(o),J=E(p),H=$(p,"DIV",{class:!0}),_(H).forEach(o),p.forEach(o),this.h()},h(){i(r,"class","pattern-wrapper svelte-exe4ff"),i(c,"class","pattern-wrapper p-tr svelte-exe4ff"),i(b,"class","pattern-wrapper p-br svelte-exe4ff"),i(y,"class","pattern-wrapper p-bl svelte-exe4ff"),i(t,"class","bar b-t svelte-exe4ff"),i(V,"class","bar b-r svelte-exe4ff"),i(x,"class","bar b-l svelte-exe4ff"),i(j,"class","bar b-b svelte-exe4ff"),i(H,"class","overlay svelte-exe4ff"),i(e,"class","wrapper svelte-exe4ff")},m(h,p){I(h,e,p),u(e,r),N(s,r,null),u(e,a),u(e,c),N(l,c,null),u(e,d),u(e,b),N(f,b,null),u(e,v),u(e,y),N(k,y,null),u(e,D),u(e,t),u(e,m),u(e,V),u(e,q),u(e,x),u(e,G),u(e,j),u(e,J),u(e,H),B=!0},p:R,i(h){B||(z(s.$$.fragment,h),z(l.$$.fragment,h),z(f.$$.fragment,h),z(k.$$.fragment,h),B=!0)},o(h){C(s.$$.fragment,h),C(l.$$.fragment,h),C(f.$$.fragment,h),C(k.$$.fragment,h),B=!1},d(h){h&&o(e),S(s),S(l),S(f),S(k)}}}class me extends K{constructor(e){super();L(this,e,null,ve,P,{})}}const _e=()=>{const n=re("__svelte__");return{page:{subscribe:n.page.subscribe},navigating:{subscribe:n.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:n.navigating.subscribe}},session:n.session}},he={subscribe(n){return _e().page.subscribe(n)}};function se(n){let e,r;return{c(){e=g("a"),r=oe("Enter Quiz"),this.h()},l(s){e=$(s,"A",{href:!0,class:!0});var a=_(e);r=fe(a,"Enter Quiz"),a.forEach(o),this.h()},h(){i(e,"href","/quiz"),i(e,"class","svelte-18kvkca")},m(s,a){I(s,e,a),u(e,r)},d(s){s&&o(e)}}}function ge(n){var y,k,D;let e,r,s,a,c=((y=n[0])==null?void 0:y.state)==="registration"&&!((k=n[1])==null?void 0:k.path.includes("quiz"))&&!((D=n[1])==null?void 0:D.path.includes("admin")),l,d;e=new me({});const b=n[3].default,f=ae(b,n,n[2],null);let v=c&&se();return{c(){M(e.$$.fragment),r=w(),s=g("main"),f&&f.c(),a=w(),v&&v.c(),l=Z(),this.h()},l(t){A(e.$$.fragment,t),r=E(t),s=$(t,"MAIN",{class:!0});var m=_(s);f&&f.l(m),m.forEach(o),a=E(t),v&&v.l(t),l=Z(),this.h()},h(){i(s,"class","svelte-18kvkca")},m(t,m){N(e,t,m),I(t,r,m),I(t,s,m),f&&f.m(s,null),I(t,a,m),v&&v.m(t,m),I(t,l,m),d=!0},p(t,[m]){var V,q,x;f&&f.p&&(!d||m&4)&&ne(f,b,t,t[2],d?ie(b,t[2],m,null):le(t[2]),null),m&3&&(c=((V=t[0])==null?void 0:V.state)==="registration"&&!((q=t[1])==null?void 0:q.path.includes("quiz"))&&!((x=t[1])==null?void 0:x.path.includes("admin"))),c?v||(v=se(),v.c(),v.m(l.parentNode,l)):v&&(v.d(1),v=null)},i(t){d||(z(e.$$.fragment,t),z(f,t),d=!0)},o(t){C(e.$$.fragment,t),C(f,t),d=!1},d(t){S(e,t),t&&o(r),t&&o(s),f&&f.d(t),t&&o(a),v&&v.d(t),t&&o(l)}}}function $e(n,e,r){let s,a;ee(n,te,d=>r(0,s=d)),ee(n,he,d=>r(1,a=d));let{$$slots:c={},$$scope:l}=e;return ue(async()=>{const d=await ce("api/quiz");te.set(await d.json())}),n.$$set=d=>{"$$scope"in d&&r(2,l=d.$$scope)},[s,a,l,c]}class ye extends K{constructor(e){super();L(this,e,$e,ge,P,{})}}export{ye as default};