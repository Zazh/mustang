import{l as Ae,t as u,a as n,c as pe,s as L,e as Be}from"../chunks/CpxY5Rrp.js";import{i as Ve}from"../chunks/u4JkCm5p.js";import{e as he,R as qe,aa as je,ab as Ee,V as E,X as $,W as t,x as e,Y as Oe,T as i,Z as O,_ as D,ac as Ue,a1 as a,$ as ze,y as ce}from"../chunks/YHQOgMhm.js";import{i as k}from"../chunks/0OGjwK8R.js";import{e as X,i as Y}from"../chunks/DTnfZw7V.js";import{s as ve}from"../chunks/DIGlqOSf.js";import{i as Ie}from"../chunks/DEw31Z6n.js";import{o as Te}from"../chunks/BsZgwH4R.js";import{g as Fe}from"../chunks/B0P_-fv9.js";import{M as Re}from"../chunks/0rc6yopu.js";import{p as De}from"../chunks/Cg1wIEJz.js";function be(s,m,c){if(s.multiple)return We(s,m);for(var _ of s.options){var r=K(_);if(Ie(r,m)){_.selected=!0;return}}(!c||m!==void 0)&&(s.selectedIndex=-1)}function Ke(s,m){he(()=>{var c=new MutationObserver(()=>{var _=s.__value;be(s,_)});return c.observe(s,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),()=>{c.disconnect()}})}function Ne(s,m,c=m){var _=!0;Ae(s,"change",r=>{var g=r?"[selected]":":checked",b;if(s.multiple)b=[].map.call(s.querySelectorAll(g),K);else{var A=s.querySelector(g)??s.querySelector("option:not([disabled])");b=A&&K(A)}c(b)}),he(()=>{var r=m();if(be(s,r,_),_&&r===void 0){var g=s.querySelector(":checked");g!==null&&(r=K(g),c(r))}s.__value=r,_=!1}),Ke(s)}function We(s,m){for(var c of s.options)c.selected=~m.indexOf(K(c))}function K(s){return"__value"in s?s.__value:s.value}const Xe=async({fetch:s,params:m})=>{const c="https://mustang-farbe.kz/api",{id:_}=m,r=await s(`${c}/pointsales/`);if(!r.ok)throw new Error("Failed to fetch product");console.log("VITE_BACKEND_API_URL:","https://mustang-farbe.kz/api"),console.log("Fetch URL:",`${c}/pointsales/`);const g=await r.json();return console.log("Ответ от сервера:",g),{pointsales:g}},ya=Object.freeze(Object.defineProperty({__proto__:null,load:Xe},Symbol.toStringTag,{value:"Module"}));var Ye=u("<option> </option>"),Ge=u('<span class="[ px-3 py-1 ] rounded text-sm font-medium text-lime-600 bg-lime-100 tracking-wide">Фирменный салон</span>'),Je=u('<span class="[ px-3 py-1 ] rounded text-sm font-medium text-blue-700 bg-blue-100 tracking-wide">Партнер</span>'),Qe=u('<li class="[ border-b-1 border-b-gray-400 ] [ relative z-0 ] py-5 sm:pb-4"><div class="flex items-center space-x-4 rtl:space-x-reverse"><div class="flex-1 min-w-0"><p class="flex item-center gap-2 flex-wrap"><span class="text-lg font-medium text-gray-900 truncate uppercase tracking-wide"> </span> <!></p> <p class="[ flex items-center gap-3 pt-3 pb-3 ]"><span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.1242 1.70833C13.0233 0.606667 11.5583 0 10 0C8.44167 0 6.9775 0.606667 5.875 1.70833C3.60083 3.9825 3.60083 7.68333 5.88167 9.96417L10 13.9917L14.1242 9.9575C15.2258 8.85583 15.8333 7.39083 15.8333 5.8325C15.8333 4.27417 15.2258 2.81083 14.1242 1.70833ZM10 8.325C8.61917 8.325 7.5 7.20583 7.5 5.825C7.5 4.44417 8.61917 3.325 10 3.325C11.3808 3.325 12.5 4.44417 12.5 5.825C12.5 7.20583 11.3808 8.325 10 8.325ZM0.639167 15.0008L5.93167 15.0092L5.30583 20H0L0.0125 18.6075L0.639167 15.0008ZM6.22917 12.6358L6.14083 13.3425L0.929167 13.3342L1.79917 8.3325H2.92917C3.29833 9.38 3.9025 10.3417 4.71667 11.1558L6.22917 12.6358ZM20 18.7492V19.9992H14.6942L14.07 15.0217L19.3575 15.03L20 18.7492ZM12.39 15.0192L13.015 19.9992H6.98583L7.61167 15.0117L8.66083 15.0133L10.0008 16.3233L11.3358 15.0175L12.39 15.0192ZM19.07 13.3633L13.8608 13.355L13.7708 12.635L15.3033 11.1358C16.1083 10.3308 16.7075 9.375 17.075 8.3325H18.2008L19.07 13.3633Z" fill="#0052BA"></path></svg></span> <span class="[ hidden md:block ] text-base text-gray-300 leading-tight h-4"> </span> <span class="[ md:hidden ] text-base text-gray-300 leading-tight h-4"> </span></p> <button class="absolute inset-0 cursor-pointer" aria-label="Точка продаж"></button></div> <div><svg class="rtl:rotate-180 w-3 h-3 text-gray-300 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"></path></svg></div></div></li>'),ea=u('<span class="[ px-3 py-1 ] rounded text-sm font-medium text-lime-600 bg-lime-100 tracking-wide">Фирменный салон</span>'),aa=u('<span class="[ px-3 py-1 ] rounded text-sm font-medium text-blue-700 bg-blue-100 tracking-wide">Партнеры</span>'),ta=u('<li class="text-sm text-blue-700 [ flex pe-5 pb-1 ]"><span class="w-[1.5rem] md:w-[1.5rem]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="var(--color-blue-700)" d="M0,12c0,6.617,5.383,12,12,12s12-5.383,12-12C24,5.383,18.617,0,12,0S0,5.383,0,12Zm5-3.11c0-.826,.298-1.654,.928-2.283l1.607-1.607,3.164,3.164-2.071,2.071c1.029,2.561,2.772,4.234,5.137,5.137l2.071-2.071,3.164,3.164-1.607,1.607c-.629,.63-1.457,.928-2.283,.928-4.24,0-10.11-5.544-10.11-10.11Z"></path></svg></span> <a class="font-medium"> </a></li>'),ra=u('<li class="flex flex-col gap-1 pt-3 pb-2"><h5 class="text-black text-sm uppercase tracking-wider font-medium">Телефон</h5> <ul class="flex flex-wrap"></ul></li>'),sa=u('<li class="flex flex-col gap-1 pt-3 pb-2"><h5 class="text-black text-sm uppercase tracking-wider font-medium">E-mail</h5> <ul><li class="text-sm text-blue-600 pb-1 [ flex gap-2 ]"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="var(--color-blue-700)" d="M1.225,8.467C1.331,8.344,8.48,1.449,8.48,1.449a5.026,5.026,0,0,1,7.055.015s7.134,6.88,7.239,7l-8.653,8.654a3.074,3.074,0,0,1-4.242,0Zm14.31,10.069a5.024,5.024,0,0,1-7.07,0L.229,10.3A4.962,4.962,0,0,0,0,11.708V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V11.708a4.962,4.962,0,0,0-.229-1.408Z"></path></svg></span> <a class="font-medium" aria-label="E-mail"> </a></li></ul></li>'),ia=u('<li class="flex flex-col gap-1 pt-3 pb-2"><h5 class="text-black text-sm uppercase tracking-wider font-medium">Instagram</h5> <ul><li class="text-sm text-blue-600 pb-1 flex pe-5 "><span class="w-[1.5rem]"><svg xml:space="preserve" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs id="defs49"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath59"><path d="M 0,24 H 24 V 0 H 0 Z" id="path57"></path></clipPath></defs><g id="g51" transform="matrix(1.3333333,0,0,-1.3333333,0,32)"><g id="g53"><g id="g55" clip-path="url(#clipPath59)"><g id="g61" transform="translate(16.5,12)"><path d="M 0,0 C 0,-2.485 -2.015,-4.5 -4.5,-4.5 -6.985,-4.5 -9,-2.485 -9,0 -9,2.485 -6.985,4.5 -4.5,4.5 -2.015,4.5 0,2.485 0,0 Z" style="fill:none;stroke:var(--color-blue-700);stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" id="path63"></path></g><g id="g65" transform="translate(18.2046,3.5283)"><path d="m 0,0 c -1.738,-1.275 -3.883,-2.028 -6.205,-2.028 -5.798,0 -10.5,4.701 -10.5,10.5 0,5.799 4.702,10.5 10.5,10.5 5.799,0 10.5,-4.701 10.5,-10.5 v -1.5 c 0,-1.657 -1.343,-3 -3,-3 -1.656,0 -3,1.343 -3,3 v 1.5" style="fill:none;stroke:var(--color-blue-700);stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" id="path67"></path></g></g></g></g></svg></span> <a target="_blank" rel="noopener noreferrer" class="font-medium"> </a></li></ul></li>'),la=u('<li class="text-sm font-medium flex text-gray-300 bg-gray-50 px-3 py-2 border-1 rounded-full border-gray-500"><span class="w-[1.5rem]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="var(--color-gray-300)" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm1,11.879a1,1,0,0,1-.469.848l-3.84,2.4a1,1,0,1,1-1.062-1.7L11,11.325V7a1,1,0,0,1,2,0Z"></path></svg></span> <span> </span></li>'),oa=u('<li class="flex flex-col gap-1 pt-3 pb-2"><h5 class="text-black text-sm tracking-wider uppercase font-medium">График работы</h5> <ul class="flex flex-wrap gap-1"></ul></li>'),na=u("<!> <!> <!> <!>",1),pa=u('<h2 class="flex flex-wrap item-center gap-3"><span class="text-xl font-bold text-gray-900 truncate uppercase tracking-wide"> </span> <!></h2> <div><ol><li class="flex flex-col gap-1 pt-3 pb-2"><h5 class="text-black text-sm uppercase tracking-wider font-medium">Адрес</h5> <ul><li class="text-sm text-gray-300 [ flex ]"><span class="w-[2rem] md:w-[1.5rem]"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="var(--color-blue-700)" d="M14.1242 1.70833C13.0233 0.606667 11.5583 0 10 0C8.44167 0 6.9775 0.606667 5.875 1.70833C3.60083 3.9825 3.60083 7.68333 5.88167 9.96417L10 13.9917L14.1242 9.9575C15.2258 8.85583 15.8333 7.39083 15.8333 5.8325C15.8333 4.27417 15.2258 2.81083 14.1242 1.70833ZM10 8.325C8.61917 8.325 7.5 7.20583 7.5 5.825C7.5 4.44417 8.61917 3.325 10 3.325C11.3808 3.325 12.5 4.44417 12.5 5.825C12.5 7.20583 11.3808 8.325 10 8.325ZM0.639167 15.0008L5.93167 15.0092L5.30583 20H0L0.0125 18.6075L0.639167 15.0008ZM6.22917 12.6358L6.14083 13.3425L0.929167 13.3342L1.79917 8.3325H2.92917C3.29833 9.38 3.9025 10.3417 4.71667 11.1558L6.22917 12.6358ZM20 18.7492V19.9992H14.6942L14.07 15.0217L19.3575 15.03L20 18.7492ZM12.39 15.0192L13.015 19.9992H6.98583L7.61167 15.0117L8.66083 15.0133L10.0008 16.3233L11.3358 15.0175L12.39 15.0192ZM19.07 13.3633L13.8608 13.355L13.7708 12.635L15.3033 11.1358C16.1083 10.3308 16.7075 9.375 17.075 8.3325H18.2008L19.07 13.3633Z"></path></svg></span> <span class="tracking-wide"> </span></li></ul></li> <!></ol></div>',1),ca=u('<div class="container mx-auto max-w-[1292px] px-4"><div class="mt-[3.5rem] "><h1 class="md:text-7xl [ uppercase text-center font-display ] [ text-5xl ]">Точки продаж</h1></div> <div class="mt-[2rem] "><div class="max-w-2xl mx-auto "><div class="pb-4"><label for="category" class="block mb-2 text-sm font-medium text-gray-900">Выберите город:</label> <select id="city-select" class="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/1 p-2.5 "><option selected>Все города</option><!></select></div> <ul></ul></div></div></div> <!>',1);function La(s,m){qe(m,!1);const c=D();let _=D(!1),r=D(null),g=Fe(De).data.pointsales,b=D(""),A=D([]);Te(()=>{const l=new Set,o=[];g.forEach(p=>{const w=`${p.city}|${p.country}`;l.has(w)||(l.add(w),o.push({city:p.city,country:p.country}))}),O(A,o)});function we(l){O(r,l),O(_,!0)}function G(l,o){return l.length>o?l.slice(0,o).trim()+"...":l}je(()=>e(b),()=>{O(c,(e(b)?g.filter(l=>l.city===e(b)):g).slice().sort((l,o)=>l.is_points===o.is_points?l.id-o.id:l.is_points?-1:1))}),Ee(),Ve();var de=ca(),J=E(de),ue=i(t(J),2),fe=t(ue),Q=t(fe),ee=i(t(Q),2);$(()=>{e(b),Ue(()=>{e(A)})});var ae=t(ee);ae.value=((ae.__value="")==null,"");var ye=i(ae);X(ye,1,()=>e(A),Y,(l,o)=>{var p=Ye(),w={},B=t(p);a(p),$(()=>{w!==(w=e(o).city)&&(p.value=(p.__value=e(o).city)==null?"":e(o).city),L(B,`${e(o).city??""} / ${e(o).country??""}`)}),n(l,p)}),a(ee),a(Q);var me=i(Q,2);X(me,5,()=>e(c),Y,(l,o)=>{var p=Qe(),w=t(p),B=t(w),H=t(B),V=t(H),U=t(V,!0);a(V);var z=i(V,2);{var te=x=>{var Z=Ge();n(x,Z)},re=x=>{var Z=Je();n(x,Z)};k(z,x=>{e(o).is_points?x(te):x(re,!1)})}a(H);var I=i(H,2),T=i(t(I),2),N=t(T);a(T);var F=i(T,2),R=t(F);a(F),a(I);var W=i(I,2);a(B),ze(2),a(w),a(p),$((x,Z,se)=>{L(U,x),L(N,`${e(o).city??""}, ${Z??""}`),L(R,`${e(o).city??""}, ${se??""}`)},[()=>G(e(o).name,20),()=>G(e(o).address,50),()=>G(e(o).address,25)],ce),Be("click",W,()=>we(e(o))),n(l,p)}),a(me),a(fe),a(ue),a(J);var Le=i(J,2);Re(Le,{dismissable:!0,get open(){return e(_)},set open(l){O(_,l)},children:(l,o)=>{var p=pe(),w=E(p);{var B=H=>{var V=pa(),U=E(V),z=t(U),te=t(z,!0);a(z);var re=i(z,2);{var I=y=>{var q=ea();n(y,q)},T=y=>{var q=aa();n(y,q)};k(re,y=>{e(r).is_points?y(I):y(T,!1)})}a(U);var N=i(U,2),F=t(N),R=t(F),W=i(t(R),2),x=t(W),Z=i(t(x),2),se=t(Z,!0);a(Z),a(x),a(W),a(R);var ke=i(R,2);{var Ce=y=>{var q=na(),_e=E(q);{var Me=v=>{var d=ra(),h=i(t(d),2);X(h,5,()=>e(r).info.phones,Y,(C,f)=>{var M=pe(),ie=E(M);{var le=P=>{var S=ta(),j=i(t(S),2),oe=t(j,!0);a(j),a(S),$((ne,Se)=>{ve(j,"href",`tel:${ne??""}`),L(oe,Se)},[()=>e(f).trim(),()=>e(f).trim()],ce),n(P,S)};k(ie,P=>{e(f).trim()&&P(le)})}n(C,M)}),a(h),a(d),n(v,d)};k(_e,v=>{e(r).info.phones&&v(Me)})}var ge=i(_e,2);{var Ze=v=>{var d=sa(),h=i(t(d),2),C=t(h),f=i(t(C),2),M=t(f,!0);a(f),a(C),a(h),a(d),$(()=>{ve(f,"href",`mailto:${e(r).info.email??""}`),L(M,e(r).info.email)}),n(v,d)};k(ge,v=>{e(r).info.email&&v(Ze)})}var xe=i(ge,2);{var $e=v=>{var d=ia(),h=i(t(d),2),C=t(h),f=i(t(C),2),M=t(f,!0);a(f),a(C),a(h),a(d),$(()=>{ve(f,"href",`https://instagram.com/${e(r).info.socialAcc??""}`),L(M,e(r).info.socialAcc)}),n(v,d)};k(xe,v=>{e(r).info.socialAcc&&v($e)})}var He=i(xe,2);{var Pe=v=>{var d=oa(),h=i(t(d),2);X(h,5,()=>e(r).info.working_hours.split(`
`),Y,(C,f)=>{var M=pe(),ie=E(M);{var le=P=>{var S=la(),j=i(t(S),2),oe=t(j,!0);a(j),a(S),$(ne=>L(oe,ne),[()=>e(f).trim()],ce),n(P,S)};k(ie,P=>{e(f).trim()&&P(le)})}n(C,M)}),a(h),a(d),n(v,d)};k(He,v=>{e(r).info.working_hours&&v(Pe)})}n(y,q)};k(ke,y=>{e(r).info&&y(Ce)})}a(F),a(N),$(()=>{L(te,e(r).name),L(se,e(r).address)}),n(H,V)};k(w,H=>{e(r)&&H(B)})}n(l,p)},$$slots:{default:!0},$$legacy:!0}),Ne(ee,()=>e(b),l=>O(b,l)),n(s,de),Oe()}export{La as component,ya as universal};
