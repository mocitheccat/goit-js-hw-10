import"./assets/styles-ff39268b.js";import{f as y,T as m}from"./assets/vendor-ffe00588.js";const i=document.querySelector("#datetime-picker"),n=document.querySelector("[data-start]");n.disabled=!0;let s;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(s=new Date(e[0]).getTime(),s<Date.now()){m({text:"Please choose a date in the future",duration:3e3,close:!0,style:{background:"linear-gradient(to right, #9c1a21, #fc030f)"}}).showToast(),n.disabled=!0;return}else n.disabled=!1}};y(i,b);n.addEventListener("click",()=>{n.disabled=!0,i.disabled=!0;const e=Date.now();let t=s-e;const o=setInterval(()=>{const r=Date.now();if(t=s-r,t<=0)clearInterval(o),m({text:"Time is up",duration:3e3,close:!0,style:{background:"linear-gradient(to right, #03fc7b, #036916)"}}).showToast(),i.disabled=!1,n.disabled=!1,f(0,0,0,0);else{const{days:l,hours:d,minutes:c,seconds:u}=S(t);f(l,d,c,u)}},1e3)});function a(e){return String(e).padStart(2,"0")}function S(e){const d=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),u=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:c,minutes:u,seconds:h}}function f(e,t,o,r){document.querySelector("[data-days]").textContent=a(e),document.querySelector("[data-hours]").textContent=a(t),document.querySelector("[data-minutes]").textContent=a(o),document.querySelector("[data-seconds]").textContent=a(r)}
//# sourceMappingURL=commonHelpers.js.map