import{S as T,i as P,s as U,e as h,k,t as j,c as b,n as y,a as w,g as I,d as o,b as _,f as r,N as d,G as L,O as v,H as N,P as O}from"../../chunks/vendor-4e2f73f3.js";import{l as S}from"../../chunks/index-21c51c30.js";function $(a){let n,u,t,l,i,f,p,m,c;return{c(){n=h("input"),u=k(),t=h("input"),l=k(),i=h("button"),f=j("login"),this.h()},l(e){n=b(e,"INPUT",{type:!0}),u=y(e),t=b(e,"INPUT",{type:!0,name:!0,id:!0}),l=y(e),i=b(e,"BUTTON",{});var s=w(i);f=I(s,"login"),s.forEach(o),this.h()},h(){_(n,"type","text"),_(t,"type","password"),_(t,"name",""),_(t,"id",""),i.disabled=p=!a[0]||!a[1]},m(e,s){r(e,n,s),d(n,a[0]),r(e,u,s),r(e,t,s),d(t,a[1]),r(e,l,s),r(e,i,s),L(i,f),m||(c=[v(n,"input",a[3]),v(t,"input",a[4]),v(i,"click",a[2])],m=!0)},p(e,[s]){s&1&&n.value!==e[0]&&d(n,e[0]),s&2&&t.value!==e[1]&&d(t,e[1]),s&3&&p!==(p=!e[0]||!e[1])&&(i.disabled=p)},i:N,o:N,d(e){e&&o(n),e&&o(u),e&&o(t),e&&o(l),e&&o(i),m=!1,O(c)}}}function q(a,n,u){let t,l;function i(){S(t,l)}function f(){t=this.value,u(0,t)}function p(){l=this.value,u(1,l)}return[t,l,i,f,p]}class E extends T{constructor(n){super();P(this,n,q,$,U,{})}}export{E as default};
