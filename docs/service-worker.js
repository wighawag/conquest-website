const e=["/_app/start-f399d580.js","/_app/assets/start-a97448ed.css","/_app/pages/__layout.svelte-7d073520.js","/_app/assets/global-24ce9ba7.css","/_app/error.svelte-29375ae2.js","/_app/pages/index.svelte-69c85da3.js","/_app/assets/pages/index.svelte-1bf55ea0.css","/_app/pages/devlog/__layout.reset.svelte-6e1bc5b6.js","/_app/pages/devlog/index.svelte-33ea82e1.js","/_app/pages/devlog/june-2021-update.md-b71e721f.js","/_app/pages/devlog/first-alpha.md-873f36d9.js","/_app/chunks/vendor-8fe52820.js","/_app/chunks/paths-45dac81d.js","/_app/chunks/application-e914de77.js","/_app/chunks/url-92f7f1d2.js","/_app/chunks/stores-95dde8a7.js","/_app/chunks/blog-post-3dcd3cc5.js","/_app/assets/blog-post-9740ca27.css"].concat(["/devlog/first-alpha/","/devlog/","/devlog/june-2021-update/","/"]),s="cache-name1624096664176";let t=!0;function a(...e){t&&console.debug(...e)}self.addEventListener("message",(function(e){e.data&&"debug"===e.data.type&&(t=e.data.enabled&&e.data.level>=5)}));const n=self.location.pathname,r=n.substr(0,n.length-18),c=e.map((e=>r+e)),o=[];o.push("localhost");const l=[self.location.origin,"https://rsms.me/inter/","cdn",".*\\.png$",".*\\.svg$"];a(`[Service Worker] Origin: ${self.location.origin}`),self.addEventListener("install",(e=>{a("[Service Worker] Install"),e.waitUntil(caches.open(s).then((e=>(a(`[Service Worker] Creating cache: ${s}`),e.addAll(c)))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{a("[Service Worker] Activate"),e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(e!==s)return a(`[Service Worker] Deleting: ${e}`),caches.delete(e)}))).then((()=>self.clients.claim())))))}));const p=(e,t)=>fetch(e).then((t=>caches.open(s).then((s=>("GET"===e.method&&e.url.startsWith("http")&&s.put(e,t.clone()),t))))).catch((()=>t)),i={method:(e,s)=>{a(`[Service Worker] Cache first: ${e.url}`);const t=p(e,s);return s||t},regexes:l},d={method:(e,s)=>(a(`[Service Worker] Cache only: ${e.url}`),s||p(e,s)),regexes:[]},h={method:(e,s)=>(a(`[Service Worker] Online first: ${e.url}`),p(e,s)),regexes:o},g={method:e=>(a(`[Service Worker] Online only: ${e.url}`),fetch(e)),regexes:[]};self.addEventListener("fetch",(e=>{const s=e.request;e.respondWith(caches.match(s).then((e=>{const t=[h,g,i,d];for(const a of t)for(const t of a.regexes)if(RegExp(t).test(s.url))return a.method(s,e);return h.method(s,e)})))}));
