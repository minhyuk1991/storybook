(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function $(){}function Be(e,t){for(const n in t)e[n]=t[n];return e}function De(e){return e()}function ke(){return Object.create(null)}function q(e){e.forEach(De)}function fe(e){return typeof e=="function"}function B(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let ne;function ve(e,t){return ne||(ne=document.createElement("a")),ne.href=t,e===ne.href}function gt(e){return Object.keys(e).length===0}function $e(e,...t){if(e==null)return $;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function J(e){let t;return $e(e,n=>t=n)(),t}function U(e,t,n){e.$$.on_destroy.push($e(t,n))}function yt(e,t,n,o){if(e){const r=He(e,t,n,o);return e[0](r)}}function He(e,t,n,o){return e[1]&&o?Be(n.ctx.slice(),e[1](o(t))):n.ctx}function wt(e,t,n,o){if(e[2]&&o){const r=e[2](o(n));if(t.dirty===void 0)return r;if(typeof r=="object"){const s=[],i=Math.max(t.dirty.length,r.length);for(let c=0;c<i;c+=1)s[c]=t.dirty[c]|r[c];return s}return t.dirty|r}return t.dirty}function bt(e,t,n,o,r,s){if(r){const i=He(t,n,o,s);e.p(i,r)}}function $t(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let o=0;o<n;o++)t[o]=-1;return t}return-1}function qn(e){const t={};for(const n in e)n[0]!=="$"&&(t[n]=e[n]);return t}function Bn(e,t){const n={};t=new Set(t);for(const o in e)!t.has(o)&&o[0]!=="$"&&(n[o]=e[o]);return n}function Dn(e){return e??""}function Pt(e,t,n){return e.set(n),t}function kt(e){return e&&fe(e.destroy)?e.destroy:$}function vt(e,t){e.appendChild(t)}function E(e,t,n){e.insertBefore(t,n||null)}function P(e){e.parentNode&&e.parentNode.removeChild(e)}function Hn(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function de(e){return document.createElement(e)}function Kn(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function Ke(e){return document.createTextNode(e)}function Pe(){return Ke(" ")}function Q(){return Ke("")}function xe(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function Wn(e){return function(t){return t.stopPropagation(),e.call(this,t)}}function A(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function zn(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const o in t)t[o]==null?e.removeAttribute(o):o==="style"?e.style.cssText=t[o]:o==="__value"?e.value=e[o]=t[o]:n[o]&&n[o].set?e[o]=t[o]:A(e,o,t[o])}function Vn(e,t,n){t in e?e[t]=typeof e[t]=="boolean"&&n===""?!0:n:A(e,t,n)}function Jn(e){return e===""?null:+e}function xt(e){return Array.from(e.childNodes)}function Qn(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function Gn(e,t){e.value=t??""}function We(e,t,n,o){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function Xn(e,t){for(let n=0;n<e.options.length;n+=1){const o=e.options[n];if(o.__value===t){o.selected=!0;return}}e.selectedIndex=-1}function Yn(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let oe;function Et(){if(oe===void 0){oe=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{oe=!0}}return oe}function Zn(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const o=de("iframe");o.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),o.setAttribute("aria-hidden","true"),o.tabIndex=-1;const r=Et();let s;return r?(o.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",s=xe(window,"message",i=>{i.source===o.contentWindow&&t()})):(o.src="about:blank",o.onload=()=>{s=xe(o.contentWindow,"resize",t)}),vt(e,o),()=>{(r||s&&o.contentWindow)&&s(),P(o)}}function eo(e,t,n){e.classList[n?"add":"remove"](t)}function Rt(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,o,t),r}function le(e,t){return new e(t)}let G;function V(e){G=e}function X(){if(!G)throw new Error("Function called outside component initialization");return G}function to(e){X().$$.on_mount.push(e)}function Lt(e){X().$$.on_destroy.push(e)}function no(){const e=X();return(t,n,{cancelable:o=!1}={})=>{const r=e.$$.callbacks[t];if(r){const s=Rt(t,n,{cancelable:o});return r.slice().forEach(i=>{i.call(e,s)}),!s.defaultPrevented}return!0}}function ze(e,t){return X().$$.context.set(e,t),t}function Ve(e){return X().$$.context.get(e)}function oo(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(o=>o.call(this,t))}const z=[],Ee=[],se=[],me=[],Je=Promise.resolve();let _e=!1;function Qe(){_e||(_e=!0,Je.then(Ge))}function Ot(){return Qe(),Je}function ge(e){se.push(e)}function ro(e){me.push(e)}const he=new Set;let re=0;function Ge(){const e=G;do{for(;re<z.length;){const t=z[re];re++,V(t),St(t.$$)}for(V(null),z.length=0,re=0;Ee.length;)Ee.pop()();for(let t=0;t<se.length;t+=1){const n=se[t];he.has(n)||(he.add(n),n())}se.length=0}while(z.length);for(;me.length;)me.pop()();_e=!1,he.clear(),V(e)}function St(e){if(e.fragment!==null){e.update(),q(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ge)}}const ie=new Set;let N;function D(){N={r:0,c:[],p:N}}function H(){N.r||q(N.c),N=N.p}function m(e,t){e&&e.i&&(ie.delete(e),e.i(t))}function w(e,t,n,o){if(e&&e.o){if(ie.has(e))return;ie.add(e),N.c.push(()=>{ie.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}const so=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Ct(e,t){e.d(1),t.delete(e.key)}function Tt(e,t){w(e,1,1,()=>{t.delete(e.key)})}function Xe(e,t,n,o,r,s,i,c,a,l,u,f){let h=e.length,p=s.length,_=h;const x={};for(;_--;)x[e[_].key]=_;const R=[],I=new Map,K=new Map;for(_=p;_--;){const g=f(r,s,_),k=n(g);let d=i.get(k);d?o&&d.p(g,t):(d=l(k,g),d.c()),I.set(k,R[_]=d),k in x&&K.set(k,Math.abs(_-x[k]))}const j=new Set,te=new Set;function M(g){m(g,1),g.m(c,u),i.set(g.key,g),u=g.first,p--}for(;h&&p;){const g=R[p-1],k=e[h-1],d=g.key,b=k.key;g===k?(u=g.first,h--,p--):I.has(b)?!i.has(d)||j.has(d)?M(g):te.has(b)?h--:K.get(d)>K.get(b)?(te.add(d),M(g)):(j.add(b),h--):(a(k,i),h--)}for(;h--;){const g=e[h];I.has(g.key)||a(g,i)}for(;p;)M(R[p-1]);return R}function It(e,t){const n={},o={},r={$$scope:1};let s=e.length;for(;s--;){const i=e[s],c=t[s];if(c){for(const a in i)a in c||(o[a]=1);for(const a in c)r[a]||(n[a]=c[a],r[a]=1);e[s]=c}else for(const a in i)r[a]=1}for(const i in o)i in n||(n[i]=void 0);return n}function At(e){return typeof e=="object"&&e!==null?e:{}}function io(e,t,n,o){const r=e.$$.props[t];r!==void 0&&(e.$$.bound[r]=n,o===void 0&&n(e.$$.ctx[r]))}function C(e){e&&e.c()}function O(e,t,n,o){const{fragment:r,after_update:s}=e.$$;r&&r.m(t,n),o||ge(()=>{const i=e.$$.on_mount.map(De).filter(fe);e.$$.on_destroy?e.$$.on_destroy.push(...i):q(i),e.$$.on_mount=[]}),s.forEach(ge)}function S(e,t){const n=e.$$;n.fragment!==null&&(q(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Nt(e,t){e.$$.dirty[0]===-1&&(z.push(e),Qe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Y(e,t,n,o,r,s,i,c=[-1]){const a=G;V(e);const l=e.$$={fragment:null,ctx:[],props:s,update:$,not_equal:r,bound:ke(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:ke(),dirty:c,skip_bound:!1,root:t.target||a.$$.root};i&&i(l.root);let u=!1;if(l.ctx=n?n(e,t.props||{},(f,h,...p)=>{const _=p.length?p[0]:h;return l.ctx&&r(l.ctx[f],l.ctx[f]=_)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](_),u&&Nt(e,f)),h}):[],l.update(),u=!0,q(l.before_update),l.fragment=o?o(l.ctx):!1,t.target){if(t.hydrate){const f=xt(t.target);l.fragment&&l.fragment.l(f),f.forEach(P)}else l.fragment&&l.fragment.c();t.intro&&m(e.$$.fragment),O(e,t.target,t.anchor,t.customElement),Ge()}V(a)}class Z{$destroy(){S(this,1),this.$destroy=$}$on(t,n){if(!fe(n))return $;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!gt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const L={queryHandler:{parse:e=>jt(new URLSearchParams(e)),stringify:e=>"?"+new URLSearchParams(e).toString()},urlTransform:{apply:e=>e,remove:e=>e},useHash:!1};function jt(e){return[...e].reduce((t,[n,o])=>(t[n]=o,t),{})}const Ye=RegExp(/\:([^/()]+)/g);function Mt(e,t){if(navigator.userAgent.includes("jsdom"))return!1;t&&Ze(e),Ft()}function Ft(){if(navigator.userAgent.includes("jsdom"))return!1;const{hash:e}=window.location;if(e){const t=document.getElementById(e.substring(1));t&&t.scrollIntoView()}}function Ze(e){e&&e.scrollTo&&e.dataset.routify!=="scroll-lock"&&e.dataset["routify-scroll"]!=="lock"&&(e.style["scroll-behavior"]="auto",e.scrollTo({top:0,behavior:"auto"}),e.style["scroll-behavior"]="",Ze(e.parentElement))}const Ut=(e,t)=>{const n=t?"":"/?$";return e=e.replace(/\/_fallback?$/,"(/|$)"),e=e.replace(/\/index$/,"(/index)?"),e=e.replace(Ye,"([^/]+)")+n,e=`^${e}`,e},et=e=>{const t=[];let n;for(;n=Ye.exec(e);)t.push(n[1]);return t},qt=({path:e})=>e.split("/").filter(Boolean).map(t=>t==="_fallback"?"A":t.startsWith(":")?"B":"C").join("");function ce(e,t){ce._console=ce._console||{log:console.log,warn:console.warn};const{_console:n}=ce,o=e.componentFile.name.replace(/Proxy<_?(.+)>/,"$1").replace(/^Index$/,e.component.shortPath.split("/").pop()).replace(/^./,s=>s.toUpperCase()).replace(/\:(.+)/,"U5B$1u5D"),r=[`<${o}> received an unexpected slot "default".`,`<${o}> was created with unknown prop 'scoped'`,`<${o}> was created with unknown prop 'scopedSync'`];for(const s of["log","warn"])console[s]=(...i)=>{r.includes(i[0])||n[s](...i)},t().then(()=>{console[s]=n[s]})}function ue(){let e=window.location.pathname+window.location.search+window.location.hash;const{url:t,options:n}=Bt(e);return{...ye(t),options:n}}function Bt(e){const[t,n]=e.split("__[[routify_url_options]]__"),o=JSON.parse(decodeURIComponent(n||"")||"{}");return window.routify=window.routify||{},window.routify.prefetched=o.prefetch,{url:t,options:o}}function ye(e){L.useHash&&(e=e.replace(/.*#(.+)/,"$1"));const t=e.startsWith("/")?window.location.origin:void 0,n=new URL(e,t),o=n.pathname+n.search+n.hash;return{url:n,fullpath:o}}function Re(e,t,n){const o=L.useHash?"#":"";let r;return r=Dt(e,t,n),r=L.urlTransform.apply(r),r=o+r,r}function Dt(e,t,n){const o=Object.assign({},n,t),r=Ht(e,t);for(const[s,i]of Object.entries(o))e=e.replace(new RegExp(`:${s}(/|$)`),i+"$1");return`${e}${r}`}function Ht(e,t){if(!L.queryHandler)return"";const n=et(e),o={};return t&&Object.entries(t).forEach(([r,s])=>{n.includes(r)||(o[r]=s)}),L.queryHandler.stringify(o).replace(/\?$/,"")}function Kt(e){let t;const n=e[2].default,o=yt(n,e,e[1],null);return{c(){o&&o.c()},m(r,s){o&&o.m(r,s),t=!0},p(r,[s]){o&&o.p&&(!t||s&2)&&bt(o,n,r,r[1],t?wt(n,r[1],s,null):$t(r[1]),null)},i(r){t||(m(o,r),t=!0)},o(r){w(o,r),t=!1},d(r){o&&o.d(r)}}}function Wt(e,t,n){let{$$slots:o={},$$scope:r}=t,{scoped:s={}}=t;return e.$$set=i=>{"scoped"in i&&n(0,s=i.scoped),"$$scope"in i&&n(1,r=i.$$scope)},[s,r,o]}class zt extends Z{constructor(t){super(),Y(this,t,Wt,Kt,B,{scoped:0})}}const F=[];function Vt(e,t){return{subscribe:T(e,t).subscribe}}function T(e,t=$){let n;const o=new Set;function r(c){if(B(e,c)&&(e=c,n)){const a=!F.length;for(const l of o)l[1](),F.push(l,e);if(a){for(let l=0;l<F.length;l+=2)F[l][0](F[l+1]);F.length=0}}}function s(c){r(c(e))}function i(c,a=$){const l=[c,a];return o.add(l),o.size===1&&(n=t(r)||$),c(e),()=>{o.delete(l),o.size===0&&(n(),n=null)}}return{set:r,update:s,subscribe:i}}function tt(e,t,n){const o=!Array.isArray(e),r=o?[e]:e,s=t.length<2;return Vt(n,i=>{let c=!1;const a=[];let l=0,u=$;const f=()=>{if(l)return;u();const p=t(o?a[0]:a,i);s?i(p):u=fe(p)?p:$},h=r.map((p,_)=>$e(p,x=>{a[_]=x,l&=~(1<<_),c&&f()},()=>{l|=1<<_}));return c=!0,f(),function(){q(h),u()}})}window.routify=window.routify||{};const ee=T(null),pe=T([]);pe.subscribe(e=>window.routify.routes=e);let nt=T({component:{params:{}}});const Jt=T(null),ot=T(!0);async function Qt({page:e,metatags:t,afterPageLoad:n,parentNode:o}){const r=e.last!==e;setTimeout(()=>Mt(o,r));const{path:s}=e,{options:i}=ue(),c=i.prefetch;for(const a of n._hooks)a&&await a(e.api);t.update(),dispatchEvent(new CustomEvent("app-loaded")),parent.postMessage({msg:"app-loaded",prefetched:window.routify.prefetched,path:s,prefetchId:c},"*"),window.routify.appLoaded=!0,window.routify.stopAutoReady=!1}function we(e,t=!1){e=L.urlTransform.remove(e);let{pathname:n,search:o}=ye(e).url;const r=J(pe),s=r.find(u=>n===u.meta.name)||r.find(u=>n.match(u.regex));if(!s)throw new Error(`Route could not be found for "${n}".`);const i=t?Object.create(s):s,{route:c,redirectPath:a,rewritePath:l}=rt(i,r);return l&&({pathname:n,search:o}=ye(Re(l,c.params)).url,a&&(c.redirectTo=Re(a,c.params||{}))),L.queryHandler&&(c.params=Object.assign({},L.queryHandler.parse(o))),Gt(c,n),c.leftover=e.replace(new RegExp(c.regex),""),c}function Gt(e,t){if(e.paramKeys){const n=Xt(e.layouts),o=t.split("/").filter(Boolean);Yt(e.path).forEach((s,i)=>{s&&(e.params[s]=o[i],n[i]?n[i].param={[s]:o[i]}:e.param={[s]:o[i]})})}}function rt(e,t,n,o){const{redirect:r,rewrite:s}=e.meta;if(r||s){n=r?r.path||r:n,o=s?s.path||s:n;const i=r&&r.params,c=s&&s.params,a=t.find(l=>l.path.replace(/\/index$/,"")===o);return a===e&&console.error(`${o} is redirecting to itself`),a||console.error(`${e.path} is redirecting to non-existent path: ${o}`),(i||c)&&(a.params=Object.assign({},a.params,i,c)),rt(a,t,n,o)}return{route:e,redirectPath:n,rewritePath:o}}function Xt(e){const t=[];return e.forEach(n=>{t[n.path.split("/").filter(Boolean).length-1]=n}),t}function Yt(e){return e.split("/").filter(Boolean).map(t=>t.match(/\:(.+)/)).map(t=>t&&t[1])}function Le(e,t,n){const o=e.slice();return o[1]=t[n],o}function Oe(e,t){let n,o;return{key:e,first:null,c(){n=de("iframe"),ve(n.src,o=t[1].url)||A(n,"src",o),A(n,"frameborder","0"),A(n,"title","routify prefetcher"),this.first=n},m(r,s){E(r,n,s)},p(r,s){t=r,s&1&&!ve(n.src,o=t[1].url)&&A(n,"src",o)},d(r){r&&P(n)}}}function Zt(e){let t,n=[],o=new Map,r=e[0];const s=i=>i[1].options.prefetch;for(let i=0;i<r.length;i+=1){let c=Le(e,r,i),a=s(c);o.set(a,n[i]=Oe(a,c))}return{c(){t=de("div");for(let i=0;i<n.length;i+=1)n[i].c();A(t,"id","__routify_iframes"),We(t,"display","none")},m(i,c){E(i,t,c);for(let a=0;a<n.length;a+=1)n[a].m(t,null)},p(i,[c]){c&1&&(r=i[0],n=Xe(n,c,s,1,i,r,o,t,Ct,Oe,null,Le))},i:$,o:$,d(i){i&&P(t);for(let c=0;c<n.length;c+=1)n[c].d()}}}const en=2,be=T([]),st=tt(be,e=>e.slice(0,en));st.subscribe(e=>e.forEach(({options:t})=>{setTimeout(()=>it(t.prefetch),t.timeout)}));function it(e){const t=e.data?e.data.prefetchId:e;if(!t)return null;const n=J(be).find(o=>o&&o.options.prefetch==t);if(n){const{gracePeriod:o}=n.options,r=new Promise(i=>setTimeout(i,o)),s=new Promise(i=>{window.requestIdleCallback?window.requestIdleCallback(i):setTimeout(i,o+1e3)});Promise.all([r,s]).then(()=>{be.update(i=>i.filter(c=>c.options.prefetch!=t))})}}addEventListener("message",it,!1);function tn(e,t,n){let o;return U(e,st,r=>n(0,o=r)),[o]}class nn extends Z{constructor(t){super(),Y(this,t,tn,Zt,B,{})}}function ct(){return Ve("routify")||nt}const on={_hooks:[e=>ot.set(!1)],subscribe:at},rn={_hooks:[],subscribe:at};function at(e){const t=this._hooks,n=t.length;return e(o=>{t[n]=o}),(...o)=>{delete t[n],e(...o)}}const co={subscribe(e){const t=ct();return tt(t,n=>n.route.params).subscribe(e)}},y={subscribe(e){return this._origin=this.getOrigin(),e(ae)},props:{},templates:{},services:{plain:{propField:"name",valueField:"content"},twitter:{propField:"name",valueField:"content"},og:{propField:"property",valueField:"content"}},plugins:[{name:"applyTemplate",condition:()=>!0,action:(e,t)=>{const n=y.getLongest(y.templates,e)||(o=>o);return[e,n(t)]}},{name:"createMeta",condition:()=>!0,action(e,t){y.writeMeta(e,t)}},{name:"createOG",condition:e=>!e.match(":"),action(e,t){y.writeMeta(`og:${e}`,t)}},{name:"createTitle",condition:e=>e==="title",action(e,t){document.title=t}}],getLongest(e,t){const n=e[t];if(n){const o=J(ee).path,i=Object.keys(e[t]).filter(c=>o.includes(c)).sort((c,a)=>a.length-c.length)[0];return n[i]}},writeMeta(e,t){const n=document.getElementsByTagName("head")[0],o=e.match(/(.+)\:/),r=o&&o[1]||"plain",{propField:s,valueField:i}=ae.services[r]||ae.services.plain,c=document.querySelector(`meta[${s}='${e}']`);c&&c.remove();const a=document.createElement("meta");a.setAttribute(s,e),a.setAttribute(i,t),a.setAttribute("data-origin","routify"),n.appendChild(a)},set(e,t){typeof e=="string"&&y.plugins.forEach(n=>{n.condition(e,t)&&([e,t]=n.action(e,t)||[e,t])})},clear(){const e=document.querySelector("meta");e&&e.remove()},template(e,t){const n=y.getOrigin;y.templates[e]=y.templates[e]||{},y.templates[e][n]=t},update(){Object.keys(y.props).forEach(e=>{let t=y.getLongest(y.props,e);y.plugins.forEach(n=>{n.condition(e,t)&&([e,t]=n.action(e,t)||[e,t])})})},batchedUpdate(){y._pendingUpdate||(y._pendingUpdate=!0,setTimeout(()=>{y._pendingUpdate=!1,this.update()}))},_updateQueued:!1,_origin:!1,getOrigin(){if(this._origin)return this._origin;const e=ct();return e&&J(e).path||"/"},_pendingUpdate:!1},ae=new Proxy(y,{set(e,t,n,o){const{props:r}=e;return Reflect.has(e,t)?Reflect.set(e,t,n,o):(r[t]=r[t]||{},r[t][e.getOrigin()]=n),window.routify.appLoaded&&e.batchedUpdate(),!0}});function Se(e,t,n){const o=e.slice();return o[21]=t[n].component,o[22]=t[n].componentFile,o[2]=t[n].decorator,o[1]=t[n].nodes,o}function Ce(e){let t=[],n=new Map,o,r,s=[e[4]];const i=c=>c[7];for(let c=0;c<1;c+=1){let a=Se(e,s,c),l=i(a);n.set(l,t[c]=Ie(l,a))}return{c(){for(let c=0;c<1;c+=1)t[c].c();o=Q()},m(c,a){for(let l=0;l<1;l+=1)t[l].m(c,a);E(c,o,a),r=!0},p(c,a){a&33554621&&(s=[c[4]],D(),t=Xe(t,a,i,1,c,s,n,o.parentNode,Tt,Ie,o,Se),H())},i(c){if(!r){for(let a=0;a<1;a+=1)m(t[a]);r=!0}},o(c){for(let a=0;a<1;a+=1)w(t[a]);r=!1},d(c){for(let a=0;a<1;a+=1)t[a].d(c);c&&P(o)}}}function Te(e){let t,n;return t=new lt({props:{decorator:e[2],nodes:e[1],scoped:{...e[0],...e[25]}}}),{c(){C(t.$$.fragment)},m(o,r){O(t,o,r),n=!0},p(o,r){const s={};r&4&&(s.decorator=o[2]),r&16&&(s.nodes=o[1]),r&33554433&&(s.scoped={...o[0],...o[25]}),t.$set(s)},i(o){n||(m(t.$$.fragment,o),n=!0)},o(o){w(t.$$.fragment,o),n=!1},d(o){S(t,o)}}}function sn(e){let t,n,o=e[21]&&e[1].length&&Te(e);return{c(){o&&o.c(),t=Q()},m(r,s){o&&o.m(r,s),E(r,t,s),n=!0},p(r,s){r[21]&&r[1].length?o?(o.p(r,s),s&16&&m(o,1)):(o=Te(r),o.c(),m(o,1),o.m(t.parentNode,t)):o&&(D(),w(o,1,1,()=>{o=null}),H())},i(r){n||(m(o),n=!0)},o(r){w(o),n=!1},d(r){o&&o.d(r),r&&P(t)}}}function cn(e){let t,n,o;const r=[{scoped:e[0]},{scopedSync:e[5]},e[3].param||{}];var s=e[22];function i(c){let a={$$slots:{default:[sn,({scoped:l,decorator:u})=>({25:l,2:u}),({scoped:l,decorator:u})=>(l?33554432:0)|(u?4:0)]},$$scope:{ctx:c}};for(let l=0;l<r.length;l+=1)a=Be(a,r[l]);return{props:a}}return s&&(t=le(s,i(e))),{c(){t&&C(t.$$.fragment),n=Pe()},m(c,a){t&&O(t,c,a),E(c,n,a),o=!0},p(c,a){const l=a&41?It(r,[a&1&&{scoped:c[0]},a&32&&{scopedSync:c[5]},a&8&&At(c[3].param||{})]):{};if(a&100663317&&(l.$$scope={dirty:a,ctx:c}),s!==(s=c[22])){if(t){D();const u=t;w(u.$$.fragment,1,0,()=>{S(u,1)}),H()}s?(t=le(s,i(c)),C(t.$$.fragment),m(t.$$.fragment,1),O(t,n.parentNode,n)):t=null}else s&&t.$set(l)},i(c){o||(t&&m(t.$$.fragment,c),o=!0)},o(c){t&&w(t.$$.fragment,c),o=!1},d(c){t&&S(t,c),c&&P(n)}}}function Ie(e,t){let n,o,r,s;var i=t[2];function c(a){return{props:{scoped:a[0],$$slots:{default:[cn]},$$scope:{ctx:a}}}}return i&&(o=le(i,c(t))),{key:e,first:null,c(){n=Q(),o&&C(o.$$.fragment),r=Q(),this.first=n},m(a,l){E(a,n,l),o&&O(o,a,l),E(a,r,l),s=!0},p(a,l){t=a;const u={};if(l&1&&(u.scoped=t[0]),l&67108925&&(u.$$scope={dirty:l,ctx:t}),i!==(i=t[2])){if(o){D();const f=o;w(f.$$.fragment,1,0,()=>{S(f,1)}),H()}i?(o=le(i,c(t)),C(o.$$.fragment),m(o.$$.fragment,1),O(o,r.parentNode,r)):o=null}else i&&o.$set(u)},i(a){s||(o&&m(o.$$.fragment,a),s=!0)},o(a){o&&w(o.$$.fragment,a),s=!1},d(a){a&&P(n),a&&P(r),o&&S(o,a)}}}function Ae(e){let t,n,o;return{c(){t=de("div"),We(t,"display","contents")},m(r,s){E(r,t,s),n||(o=kt(e[10].call(null,t)),n=!0)},d(r){r&&P(t),n=!1,o()}}}function an(e){let t,n,o,r=e[4]&&Ce(e),s=!e[6]&&Ae(e);return{c(){r&&r.c(),t=Pe(),s&&s.c(),n=Q()},m(i,c){r&&r.m(i,c),E(i,t,c),s&&s.m(i,c),E(i,n,c),o=!0},p(i,[c]){i[4]?r?(r.p(i,c),c&16&&m(r,1)):(r=Ce(i),r.c(),m(r,1),r.m(t.parentNode,t)):r&&(D(),w(r,1,1,()=>{r=null}),H()),i[6]?s&&(s.d(1),s=null):s||(s=Ae(i),s.c(),s.m(n.parentNode,n))},i(i){o||(m(r),o=!0)},o(i){w(r),o=!1},d(i){r&&r.d(i),i&&P(t),s&&s.d(i),i&&P(n)}}}function ln(e,t,n){let o,r,s,i,c;U(e,ee,d=>n(14,s=d)),U(e,pe,d=>n(16,c=d));let{nodes:a=[]}=t,{scoped:l={}}=t,{decorator:u=void 0}=t,f=null,h=null,p={},_,x=1;const R=T(null);U(e,R,d=>n(4,r=d));const I=Ve("routify")||nt;U(e,I,d=>n(15,i=d));const K=d=>n(6,_=d.parentNode);ze("routify",R);let j=[];function te(d){let b=d.component();b instanceof Promise?b.then(M):M(b)}function M(d){n(5,p={...l});const b={...r,nodes:h,decorator:u||zt,layout:f.isLayout?f:i.layout,component:f,route:s,routes:c,componentFile:d,parentNode:_||i.parentNode};R.set(b),Pt(I,i.child=f,i),h.length===0&&g()}async function g(){await new Promise(b=>setTimeout(b));const d=r.component.path===s.path;!window.routify.stopAutoReady&&d&&Qt({page:r.component,metatags:ae,afterPageLoad:on,parentNode:_})}function k({meta:d,path:b,param:mt,params:_t}){return JSON.stringify({path:b,invalidate:x,param:(d["param-is-page"]||d["slug-is-page"])&&mt,queryParams:d["query-params-is-page"]&&_t})}return e.$$set=d=>{"nodes"in d&&n(1,a=d.nodes),"scoped"in d&&n(0,l=d.scoped),"decorator"in d&&n(2,u=d.decorator)},e.$$.update=()=>{e.$$.dirty&6146&&j!==a&&(n(12,j=a),n(3,[f,...h]=[...a],f),n(3,f.api.reset=()=>n(11,x++,x),f)),e.$$.dirty&8&&te(f),e.$$.dirty&2064&&n(7,o=r&&x&&k(r.component)),e.$$.dirty&16&&r&&ce(r,Ot)},[l,a,u,f,r,p,_,o,R,I,K,x,j]}class lt extends Z{constructor(t){super(),Y(this,t,ln,an,B,{nodes:1,scoped:0,decorator:2})}}function un(e,t){let n=!1;function o(s,i){const c=s||ue().fullpath,a=we(c);a.redirectTo&&(history.replaceStateNative({},null,a.redirectTo),delete a.redirectTo);const f=[...(i&&we(ue().fullpath,e)||a).layouts,a];n&&delete n.last,a.last=n,n=a,s||Jt.set(a),ee.set(a),a.api.preload().then(()=>{ot.set(!0),t(f)})}const r=fn(o);return{updatePage:o,destroy:r}}function fn(e){["pushState","replaceState"].forEach(r=>{history[r+"Native"]||(history[r+"Native"]=history[r]),history[r]=async function(s={},i,c){const a=location.pathname+location.search+location.hash;if(c===a)return!1;const{id:l,path:u,params:f}=J(ee);s={id:l,path:u,params:f,...s};const h=new Event(r.toLowerCase());if(Object.assign(h,{state:s,title:i,url:c}),await Ne(h,c))return history[r+"Native"].apply(this,[s,i,c]),dispatchEvent(h)}});let t=!1;const n={click:dn,pushstate:()=>e(),replacestate:()=>e(),popstate:async r=>{t?t=!1:await Ne(r,ue().fullpath)?e():(t=!0,r.preventDefault(),history.go(1))}};return Object.entries(n).forEach(r=>addEventListener(...r)),()=>{Object.entries(n).forEach(r=>removeEventListener(...r))}}function dn(e){const t=e.target.closest("a")||e.composedPath().find(s=>s.tagName==="A"),n=t&&t.href;if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button||e.defaultPrevented||!n||t.target||t.host!==location.host)return;const o=new URL(n),r=o.pathname+o.search+o.hash;e.preventDefault(),history.pushState({},"",r)}async function Ne(e,t){const n=we(t).api;for(const o of rn._hooks.filter(Boolean))if(!await o(e,n,{url:t}))return!1;return!0}function je(e){let t,n;return t=new lt({props:{nodes:e[0]}}),{c(){C(t.$$.fragment)},m(o,r){O(t,o,r),n=!0},p(o,r){const s={};r&1&&(s.nodes=o[0]),t.$set(s)},i(o){n||(m(t.$$.fragment,o),n=!0)},o(o){w(t.$$.fragment,o),n=!1},d(o){S(t,o)}}}function pn(e){let t,n,o,r=e[0]&&e[1]!==null&&je(e);return n=new nn({}),{c(){r&&r.c(),t=Pe(),C(n.$$.fragment)},m(s,i){r&&r.m(s,i),E(s,t,i),O(n,s,i),o=!0},p(s,[i]){s[0]&&s[1]!==null?r?(r.p(s,i),i&3&&m(r,1)):(r=je(s),r.c(),m(r,1),r.m(t.parentNode,t)):r&&(D(),w(r,1,1,()=>{r=null}),H())},i(s){o||(m(r),m(n.$$.fragment,s),o=!0)},o(s){w(r),w(n.$$.fragment,s),o=!1},d(s){r&&r.d(s),s&&P(t),S(n,s)}}}function hn(e,t,n){let o;U(e,ee,p=>n(1,o=p));let{routes:r}=t,{config:s={}}=t,i,c;window.routify=window.routify||{},window.routify.inBrowser=!window.navigator.userAgent.match("jsdom"),Object.assign(L,s),ze("routifyupdatepage",(...p)=>c&&c.updatePage(...p));const l=p=>n(0,i=p),u=()=>{c&&(c.destroy(),c=null)};let f=null;const h=()=>{clearTimeout(f),f=setTimeout(()=>{u(),c=un(r,l),pe.set(r),c.updatePage()})};return Lt(u),e.$$set=p=>{"routes"in p&&n(2,r=p.routes),"config"in p&&n(3,s=p.config)},e.$$.update=()=>{e.$$.dirty&4&&r&&h()},[i,o,r,s]}class mn extends Z{constructor(t){super(),Y(this,t,hn,pn,B,{routes:2,config:3})}}function v(e){const t=async function(o){return await ut(e,{file:o.tree,state:{treePayload:o},scope:{}})};return t.sync=function(o){return ft(e,{file:o.tree,state:{treePayload:o},scope:{}})},t}async function ut(e,t){const n=await e(t);if(n===!1)return!1;const o=n||t.file;if(o.children){const r=await Promise.all(o.children.map(async s=>ut(e,{state:t.state,scope:dt(t.scope||{}),parent:t.file,file:await s})));o.children=r.filter(Boolean)}return o}function ft(e,t){const n=e(t);if(n===!1)return!1;const o=n||t.file;if(o.children){const r=o.children.map(s=>ft(e,{state:t.state,scope:dt(t.scope||{}),parent:t.file,file:s}));o.children=r.filter(Boolean)}return o}function dt(e){return JSON.parse(JSON.stringify(e))}const _n=v(({file:e})=>{(e.isPage||e.isFallback)&&(e.regex=Ut(e.path,e.isFallback))}),gn=v(({file:e})=>{e.paramKeys=et(e.path)}),yn=v(({file:e})=>{e.isFallback||e.isIndex?e.shortPath=e.path.replace(/\/[^/]+$/,""):e.shortPath=e.path}),wn=v(({file:e})=>{e.ranking=qt(e)}),bn=v(({file:e})=>{const t=e,n=e.meta&&e.meta.children||[];n.length&&(t.children=t.children||[],t.children.push(...n.map(o=>({isMeta:!0,...o,meta:o}))))}),$n=v(e=>{const{file:t}=e,{isFallback:n,meta:o}=t,r=t.path.split("/").pop().startsWith(":"),s=t.path.endsWith("/index"),i=o.index||o.index===0,c=o.index===!1;t.isIndexable=i||!n&&!r&&!s&&!c,t.isNonIndexable=!t.isIndexable}),Pn=v(({file:e,parent:t})=>{Object.defineProperty(e,"parent",{get:()=>t}),Object.defineProperty(e,"nextSibling",{get:()=>Me(e,1)}),Object.defineProperty(e,"prevSibling",{get:()=>Me(e,-1)}),Object.defineProperty(e,"lineage",{get:()=>pt(t)})});function pt(e,t=[]){return e&&(t.unshift(e),pt(e.parent,t)),t}function Me(e,t){if(!e.root){const n=e.parent.children.filter(r=>r.isIndexable),o=n.indexOf(e);return n[o+t]}}const kn=v(({file:e,parent:t})=>{e.isIndex&&Object.defineProperty(t,"index",{get:()=>e})}),vn=v(({file:e,scope:t})=>{Object.defineProperty(e,"layouts",{get:()=>n(e)});function n(o){if(!o.isLayout&&o.meta.reset)return[];const{parent:r}=o,s=r&&r.component&&r,i=s&&(s.isReset||s.meta.reset),c=r&&!i&&n(r)||[];return s&&c.push(s),c}}),xn=e=>{v(t=>{(t.file.isPage||t.file.isFallback)&&t.state.treePayload.routes.push(t.file)}).sync(e),e.routes.sort((t,n)=>t.ranking>=n.ranking?-1:1)},En=v(({file:e})=>{const t=e.root?a:e.children?e.isPage?i:o:e.isReset?c:e.isLayout?n:e.isFallback?r:s;Object.setPrototypeOf(e,t.prototype);function n(){}function o(){}function r(){}function s(){}function i(){}function c(){}function a(){}}),Rn=Object.freeze(Object.defineProperty({__proto__:null,setRegex:_n,setParamKeys:gn,setShortPath:yn,setRank:wn,addMetaChildren:bn,setIsIndexable:$n,assignRelations:Pn,assignIndex:kn,assignLayout:vn,createFlatList:xn,setPrototype:En},Symbol.toStringTag,{value:"Module"})),Ln={isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!1,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},id:"__fallback"};function ht(e){return Object.entries(Ln).forEach(([t,n])=>{typeof e[t]>"u"&&(e[t]=n)}),e.children&&(e.children=e.children.map(ht)),e}const On=v(({file:e})=>{e.api=new Sn(e)});class Sn{constructor(t){this.__file=t,Object.defineProperty(this,"__file",{enumerable:!1}),this.isMeta=!!t.isMeta,this.path=t.path,this.title=Cn(t),this.meta=t.meta}get parent(){return!this.__file.root&&this.__file.parent.api}get children(){return(this.__file.children||this.__file.isLayout&&this.__file.parent.children||[]).filter(t=>!t.isNonIndexable).sort((t,n)=>t.isMeta&&n.isMeta?0:(t=(t.meta.index||t.meta.title||t.path).toString(),n=(n.meta.index||n.meta.title||n.path).toString(),t.localeCompare(n,void 0,{numeric:!0,sensitivity:"base"}))).map(({api:t})=>t)}get next(){return Fe(this,1)}get prev(){return Fe(this,-1)}async preload(){const t=[...this.__file.layouts,this.__file,this.index&&this.index.__file].filter(Boolean).map(n=>n.component());await Promise.all(t)}get component(){return this.__file.component?this.__file.component():this.__file.index?this.__file.index.component():!1}get componentWithIndex(){return new Promise(t=>Promise.all([this.component,this.index&&this.index.component]).then(n=>t(n)))}get index(){const t=this.__file.children&&this.__file.children.find(n=>n.isIndex);return t&&t.api}}function Fe(e,t){if(!e.__file.root){const o=e.parent.children.indexOf(e);return e.parent.children[o+t]}}function Cn(e){return typeof e.meta.title<"u"?e.meta.title:(e.shortPath||e.path).split("/").pop().replace(/-/g," ")}const Ue={...Rn,restoreDefaults:({tree:e})=>ht(e),assignAPI:On};function Tn(e){const t=["restoreDefaults","setParamKeys","setRegex","setShortPath","setRank","assignLayout","setPrototype","addMetaChildren","assignRelations","setIsIndexable","assignIndex","assignAPI","createFlatList"],n={tree:e,routes:[]};for(let o of t)(Ue[o].sync||Ue[o])(n);return n}const In="modulepreload",An=function(e,t){return new URL(e,t).href},qe={},W=function(t,n,o){if(!n||n.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=An(s,o),s in qe)return;qe[s]=!0;const i=s.endsWith(".css"),c=i?'[rel="stylesheet"]':"";if(!!o)for(let u=r.length-1;u>=0;u--){const f=r[u];if(f.href===s&&(!i||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${c}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":In,i||(l.as="script",l.crossOrigin=""),l.href=s,document.head.appendChild(l),i)return new Promise((u,f)=>{l.addEventListener("load",u),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t())},Nn={root:!0,children:[{isIndex:!0,isPage:!0,path:"/index",id:"_index",component:()=>W(()=>import("./index-a9b74580.js"),["./index-a9b74580.js","./Layout-81378871.js","./mockData-2ff34739.js","./index-8ef09444.css"],import.meta.url).then(e=>e.default)},{isDir:!0,ext:"",children:[{isPage:!0,path:"/test/:slug",id:"_test__slug",component:()=>W(()=>import("./_slug_-6326f118.js"),["./_slug_-6326f118.js","./Layout-81378871.js"],import.meta.url).then(e=>e.default)}],path:"/test"},{isPage:!0,path:"/test1",id:"_test1",component:()=>W(()=>import("./test1-a58b5851.js"),["./test1-a58b5851.js","./Layout-81378871.js","./mockData-2ff34739.js","./test1-6e546fcc.css"],import.meta.url).then(e=>e.default)},{isPage:!0,path:"/test2",id:"_test2",component:()=>W(()=>import("./test2-42d73136.js"),["./test2-42d73136.js","./Layout-81378871.js","./createTable-e4f16c60.js","./mockData-2ff34739.js","./test2-e761a581.css"],import.meta.url).then(e=>e.default)},{isPage:!0,path:"/test3",id:"_test3",component:()=>W(()=>import("./test3-a7d5d4ce.js"),["./test3-a7d5d4ce.js","./Layout-81378871.js","./createTable-e4f16c60.js","./mockData-2ff34739.js","./test3-b7b6ac75.css"],import.meta.url).then(e=>e.default)}],path:"/"},{tree:ao,routes:jn}=Tn(Nn);function Mn(e){let t,n;return t=new mn({props:{routes:jn}}),{c(){C(t.$$.fragment)},m(o,r){O(t,o,r),n=!0},p:$,i(o){n||(m(t.$$.fragment,o),n=!0)},o(o){w(t.$$.fragment,o),n=!1},d(o){S(t,o)}}}class Fn extends Z{constructor(t){super(),Y(this,t,null,Mn,B,{})}}function Un(e,t={target:document.body},n="hmr",o="app-loaded"){const r=document.getElementById(n),s=document.createElement("div");s.style.visibility="hidden",t.target.appendChild(s),r?addEventListener(o,i):i();function i(){removeEventListener(o,i),r&&r.remove(),s.style.visibility=null,s.setAttribute("id",n)}return new e({...t,target:s})}Un(Fn,{target:document.body},"app");export{zn as $,io as A,C as B,A as C,O as D,ro as E,S as F,Q as G,Hn as H,Qn as I,$ as J,q as K,T as L,U as M,Pt as N,Be as O,It as P,At as Q,fe as R,Z as S,co as T,Dn as U,no as V,Lt as W,so as X,kt as Y,le as Z,Kn as _,We as a,Vt as a0,tt as a1,Bn as a2,qn as a3,J as a4,Gn as a5,Wn as a6,$e as a7,oo as a8,Jn as a9,Xn as aa,Yn as ab,eo as ac,Vn as b,ge as c,E as d,de as e,vt as f,Zn as g,D as h,Y as i,H as j,w as k,xe as l,P as m,to as n,Tt as o,yt as p,Pe as q,bt as r,B as s,m as t,Xe as u,$t as v,wt as w,Ot as x,Ee as y,Ke as z};