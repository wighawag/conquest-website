import{b as o}from"./paths-45dac81d.js";function n(o){if(!o)return{};const n={},e=o.lastIndexOf("#");let t=o;-1!==e&&(t=t.slice(0,e));const d=t.indexOf("?");return-1!==d&&t.slice(d+1).split("&").forEach((o=>{const[e,t=""]=o.split("=");n[decodeURIComponent(e)]=decodeURIComponent(t)})),n}!function(o){if("undefined"==typeof window)return{};const n=o||window.location.hash,e={},t=n.lastIndexOf("#");-1!==t&&n.slice(t+1).split("&").forEach((o=>{const[n,t=""]=o.split("=");e[decodeURIComponent(n)]=decodeURIComponent(t)}))}();const e="undefined"==typeof window?{}:n(window.location.href),t=["debug","log","subgraph","ethnode","_d_eruda"];function d(d){const c=n(d);for(const o of t)void 0!==e[o]&&void 0===c[o]&&(c[o]=e[o]);return`${o}/${d}${function(o){let n="";for(const e of Object.keys(o))n+=`${""===n?"?":"&"}${e}=${o[e]}`;return n}(c)}`}export{d as u};