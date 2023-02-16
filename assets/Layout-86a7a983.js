import{w as Y,S as L,i as j,s as D,e as g,j as C,a as x,k as u,l as T,o as z,n as H,d as v,p as Z,q as ee,r as E,h as p,g as M,u as V,v as A,t as b,x as q,b as w,y as F,z as te,c as I,m as S,f as y,A as W,B as le,C as ne,D as ae,E as re,F as se,G as ie,H as oe,I as ce}from"./index-9e837c2e.js";const B=Y(!1);function fe(r){let e,s,l=r[0]?"DarkMode":"LightMode",n,a,t;return{c(){e=g("button"),s=C("current Mode : "),n=C(l)},m(i,o){x(i,e,o),u(e,s),u(e,n),a||(t=T(e,"click",r[1]),a=!0)},p(i,[o]){o&1&&l!==(l=i[0]?"DarkMode":"LightMode")&&z(n,l)},i:H,o:H,d(i){i&&v(e),a=!1,t()}}}function de(r,e,s){let l;Z(r,B,a=>s(0,l=a)),ee(()=>{localStorage.theme==="dark"||!("theme"in localStorage)&&window.matchMedia&&window?.matchMedia("(prefers-color-scheme: dark)")?.matches?E(B,l=!0,l):E(B,l=!1,l),localStorage.theme="light",localStorage.theme="dark",localStorage.removeItem("theme")});const n=()=>{E(B,l=!l,l)};return r.$$.update=()=>{r.$$.dirty&1&&(l?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"))},[l,n]}class ue extends L{constructor(e){super(),j(this,e,de,fe,D,{})}}function me(r){let e,s,l=r[0]?"-":"+",n;return{c(){e=g("div"),s=g("span"),n=C(l),p(s,"class","translate-y-[-2px]"),p(e,"class","border-light-100 relative mr-2 flex h-[12px] w-[12px] items-center justify-center border-[1px] border-solid")},m(a,t){x(a,e,t),u(e,s),u(s,n)},p(a,[t]){t&1&&l!==(l=a[0]?"-":"+")&&z(n,l)},i:H,o:H,d(a){a&&v(e)}}}function he(r,e,s){let{open:l=!1}=e;return r.$$set=n=>{"open"in n&&s(0,l=n.open)},[l]}class pe extends L{constructor(e){super(),j(this,e,he,me,D,{open:0})}}function P(r,e,s){const l=r.slice();return l[5]=e[s],l}function R(r){let e,s,l=r[3]?"(open)":"(closed)",n,a;return e=new pe({props:{open:r[3]}}),{c(){I(e.$$.fragment),s=M(),n=C(l)},m(t,i){S(e,t,i),x(t,s,i),x(t,n,i),a=!0},p(t,i){const o={};i&8&&(o.open=t[3]),e.$set(o),(!a||i&8)&&l!==(l=t[3]?"(open)":"(closed)")&&z(n,l)},i(t){a||(b(e.$$.fragment,t),a=!0)},o(t){w(e.$$.fragment,t),a=!1},d(t){y(e,t),t&&v(s),t&&v(n)}}}function J(r){let e,s,l=r[1],n=[];for(let t=0;t<l.length;t+=1)n[t]=K(P(r,l,t));const a=t=>w(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=V()},m(t,i){for(let o=0;o<n.length;o+=1)n[o].m(t,i);x(t,e,i),s=!0},p(t,i){if(i&6){l=t[1];let o;for(o=0;o<l.length;o+=1){const c=P(t,l,o);n[o]?(n[o].p(c,i),b(n[o],1)):(n[o]=K(c),n[o].c(),b(n[o],1),n[o].m(e.parentNode,e))}for(q(),o=l.length;o<n.length;o+=1)a(o);F()}},i(t){if(!s){for(let i=0;i<l.length;i+=1)b(n[i]);s=!0}},o(t){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)w(n[i]);s=!1},d(t){W(n,t),t&&v(e)}}}function K(r){let e,s;const l=[r[5],{indent:r[2]+24}];let n={};for(let a=0;a<l.length;a+=1)n=le(n,l[a]);return e=new X({props:n}),{c(){I(e.$$.fragment)},m(a,t){S(e,a,t),s=!0},p(a,t){const i=t&6?ne(l,[t&2&&ae(a[5]),t&4&&{indent:a[2]+24}]):{};e.$set(i)},i(a){s||(b(e.$$.fragment,a),s=!0)},o(a){w(e.$$.fragment,a),s=!1},d(a){y(e,a)}}}function _e(r){let e,s,l,n,a,t,i,o,c=r[1].length>0&&R(r),f=r[3]&&J(r);return{c(){e=g("li"),c&&c.c(),s=M(),l=C(r[0]),n=M(),f&&f.c(),a=V(),A(e,"padding-left",r[2]+"px"),p(e,"class","flex items-center text-white")},m(d,m){x(d,e,m),c&&c.m(e,null),u(e,s),u(e,l),x(d,n,m),f&&f.m(d,m),x(d,a,m),t=!0,i||(o=[T(e,"click",r[4]),T(e,"keypress",r[4])],i=!0)},p(d,[m]){d[1].length>0?c?(c.p(d,m),m&2&&b(c,1)):(c=R(d),c.c(),b(c,1),c.m(e,s)):c&&(q(),w(c,1,1,()=>{c=null}),F()),(!t||m&1)&&z(l,d[0]),(!t||m&4)&&A(e,"padding-left",d[2]+"px"),d[3]?f?(f.p(d,m),m&8&&b(f,1)):(f=J(d),f.c(),b(f,1),f.m(a.parentNode,a)):f&&(q(),w(f,1,1,()=>{f=null}),F())},i(d){t||(b(c),b(f),t=!0)},o(d){w(c),w(f),t=!1},d(d){d&&v(e),c&&c.d(),d&&v(n),f&&f.d(d),d&&v(a),i=!1,te(o)}}}function ge(r,e,s){let{name:l=""}=e,{children:n=[]}=e,{indent:a=0}=e,t=!0;function i(){s(3,t=!t)}return r.$$set=o=>{"name"in o&&s(0,l=o.name),"children"in o&&s(1,n=o.children),"indent"in o&&s(2,a=o.indent)},[l,n,a,t,i]}class X extends L{constructor(e){super(),j(this,e,ge,_e,D,{name:0,children:1,indent:2})}}function Q(r,e,s){const l=r.slice();return l[4]=e[s],l}function U(r){let e,s=r[4].name+"",l,n,a,t,i;function o(){return r[3](r[4])}return{c(){e=g("li"),l=C(s),n=M(),p(e,"class",a=`flex flex-1 cursor-pointer items-center justify-center border-t-[8px] border-solid bg-white text-black dark:bg-black dark:text-white ${r[1].name===r[4].name?"border-yellow-900 dark:border-yellow-400":" border-transparent"}`)},m(c,f){x(c,e,f),u(e,l),u(e,n),t||(i=T(e,"click",o),t=!0)},p(c,f){r=c,f&1&&s!==(s=r[4].name+"")&&z(l,s),f&3&&a!==(a=`flex flex-1 cursor-pointer items-center justify-center border-t-[8px] border-solid bg-white text-black dark:bg-black dark:text-white ${r[1].name===r[4].name?"border-yellow-900 dark:border-yellow-400":" border-transparent"}`)&&p(e,"class",a)},d(c){c&&v(e),t=!1,i()}}}function be(r){let e,s=r[0],l=[];for(let n=0;n<s.length;n+=1)l[n]=U(Q(r,s,n));return{c(){e=g("ul");for(let n=0;n<l.length;n+=1)l[n].c();p(e,"class","flex w-full gap-[2px]")},m(n,a){x(n,e,a);for(let t=0;t<l.length;t+=1)l[t].m(e,null)},p(n,[a]){if(a&7){s=n[0];let t;for(t=0;t<s.length;t+=1){const i=Q(n,s,t);l[t]?l[t].p(i,a):(l[t]=U(i),l[t].c(),l[t].m(e,null))}for(;t<l.length;t+=1)l[t].d(1);l.length=s.length}},i:H,o:H,d(n){n&&v(e),W(l,n)}}}function ke(r,e,s){let{tabItems:l}=e,n=l[0];const a=i=>{s(1,n=i)},t=i=>{a(i)};return r.$$set=i=>{"tabItems"in i&&s(0,l=i.tabItems)},[l,n,a,t]}class we extends L{constructor(e){super(),j(this,e,ke,be,D,{tabItems:0})}}function xe(r){let e,s,l=r[0]?"<":">",n,a,t,i,o,c,f,d,m,O,$;return i=new we({props:{tabItems:r[2]}}),f=new X({props:{children:r[3].children}}),{c(){e=g("header"),s=g("button"),n=C(l),a=M(),t=g("div"),I(i.$$.fragment),o=M(),c=g("div"),I(f.$$.fragment),p(s,"class","absolute right-0 z-10 translate-x-[100%] transform bg-black px-2 py-4 text-white dark:bg-white dark:text-black"),p(t,"class","w-full"),p(c,"class","flex flex-grow flex-col justify-items-start"),p(e,"class",d=`fixed left-0 top-0 z-10  flex h-[100vh] w-[300px] flex-col flex-wrap items-start bg-[#333333] transition-all duration-1000 dark:bg-gray-600 ${r[0]?" ":"translate-x-[-100%] transform"}`)},m(k,_){x(k,e,_),u(e,s),u(s,n),u(e,a),u(e,t),S(i,t,null),u(e,o),u(e,c),S(f,c,null),m=!0,O||($=T(s,"click",function(){re(r[1])&&r[1].apply(this,arguments)}),O=!0)},p(k,[_]){r=k,(!m||_&1)&&l!==(l=r[0]?"<":">")&&z(n,l),(!m||_&1&&d!==(d=`fixed left-0 top-0 z-10  flex h-[100vh] w-[300px] flex-col flex-wrap items-start bg-[#333333] transition-all duration-1000 dark:bg-gray-600 ${r[0]?" ":"translate-x-[-100%] transform"}`))&&p(e,"class",d)},i(k){m||(b(i.$$.fragment,k),b(f.$$.fragment,k),m=!0)},o(k){w(i.$$.fragment,k),w(f.$$.fragment,k),m=!1},d(k){k&&v(e),y(i),y(f),O=!1,$()}}}function ve(r,e,s){let{isOpen:l=void 0}=e,{clickHandler:n=void 0}=e;const a=[{name:"a1",isChecked:!1},{name:"a2",isChecked:!1},{name:"a3",isChecked:!1},{name:"a4",isChecked:!1}];let t={name:"Root",children:[{name:"Child 1",children:[{name:"Grandchild 1",children:[]},{name:"Grandchild 2",children:[]},{name:"Grandchild 3",children:[]}]},{name:"Child 2",children:[{name:"Grandchild 1",children:[]},{name:"Grandchild 2",children:[]},{name:"Grandchild 3",children:[]}]},{name:"Child 3",children:[{name:"Grandchild 1",children:[]},{name:"Grandchild 2",children:[]},{name:"Grandchild 3",children:[]}]}]};return r.$$set=i=>{"isOpen"in i&&s(0,l=i.isOpen),"clickHandler"in i&&s(1,n=i.clickHandler)},[l,n,a,t]}class $e extends L{constructor(e){super(),j(this,e,ve,xe,D,{isOpen:0,clickHandler:1})}}function Me(r){let e,s,l,n,a,t,i,o,c,f,d,m,O,$;s=new $e({props:{clickHandler:r[1],isOpen:r[0]}}),i=new ue({});const k=r[3].default,_=se(k,r,r[2],null);return{c(){e=g("div"),I(s.$$.fragment),l=M(),n=g("div"),a=g("main"),t=g("div"),I(i.$$.fragment),o=M(),c=g("dvi"),c.innerHTML='<a href="/test1">test1</a>',f=M(),d=g("div"),d.textContent="Main contents",m=M(),_&&_.c(),p(t,"class","w-full bg-white pl-[40px] text-center font-bold text-black dark:bg-black dark:text-white"),p(d,"class","bg-dark-800 w-full flex-1 pl-[40px] text-center font-bold text-black dark:text-white"),p(a,"data-testid","main"),p(a,"id","main"),p(a,"class",O=`main flex min-h-[calc(100vh-200px-200px)] flex-1 transform flex-col items-stretch  transition-transform duration-1000 ${r[0]?"open translate-x-[300px]":"close"}`),p(n,"class","flex flex-1 overflow-hidden "),p(e,"class","flex min-h-[100vh] w-full items-stretch")},m(h,G){x(h,e,G),S(s,e,null),u(e,l),u(e,n),u(n,a),u(a,t),S(i,t,null),u(t,o),u(t,c),u(a,f),u(a,d),u(a,m),_&&_.m(a,null),$=!0},p(h,[G]){const N={};G&1&&(N.isOpen=h[0]),s.$set(N),_&&_.p&&(!$||G&4)&&ie(_,k,h,h[2],$?ce(k,h[2],G,null):oe(h[2]),null),(!$||G&1&&O!==(O=`main flex min-h-[calc(100vh-200px-200px)] flex-1 transform flex-col items-stretch  transition-transform duration-1000 ${h[0]?"open translate-x-[300px]":"close"}`))&&p(a,"class",O)},i(h){$||(b(s.$$.fragment,h),b(i.$$.fragment,h),b(_,h),$=!0)},o(h){w(s.$$.fragment,h),w(i.$$.fragment,h),w(_,h),$=!1},d(h){h&&v(e),y(s),y(i),_&&_.d(h)}}}function Oe(r,e,s){let{$$slots:l={},$$scope:n}=e,{isOpen:a=!1}=e;const t=()=>s(0,a=!a);return r.$$set=i=>{"isOpen"in i&&s(0,a=i.isOpen),"$$scope"in i&&s(2,n=i.$$scope)},[a,t,n,l]}class Ge extends L{constructor(e){super(),j(this,e,Oe,Me,D,{isOpen:0})}}export{Ge as L};