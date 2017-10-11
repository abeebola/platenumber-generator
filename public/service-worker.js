"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","2a46d94fd929ef58a8b42936beb560d9"],["service-worker.js","36808f2740d03c174d5fc04bff875d24"],["static/css/app.7190912547b85acef9d647916cbb2691.css","1b41dea248b19ff911d30bfef41f1c73"],["static/css/bootstrap.min.css","3ce8c46266a572488f1aff4293c66df2"],["static/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["static/css/print-id.css","4d2485412718e641eee747d489981445"],["static/css/print.css","0fc67e3a203fb68a4c8721f84f911374"],["static/js/app.c7a46422603b042132e9.js","9963f953fd566bac422da4d8452d21a1"],["static/js/manifest.320058d158aa0ea95a9e.js","393bbc0f941d7ee156aa32ac87b6a704"],["static/js/pikaday/css/pikaday.css","f5114c6561620e3dc536fec947dc001b"],["static/js/pikaday/css/site.css","9c2c7d8207ba912003bacba6ef2baa6c"],["static/js/pikaday/css/theme.css","cc907317527e2b046e7ffb69e1906cd1"],["static/js/pikaday/css/triangle.css","7efc0179499af8b4f6588c142ae0cdca"],["static/js/pikaday/pikaday.js","f893cb2b505868c24c1426c0140f7246"],["static/js/pikaday/plugins/pikaday.jquery.js","64665444c2e65c4d13e6ca8a5cf1fb11"],["static/js/vendor.35480b78d63b0220bb46.js","b0113fb7ec6ea531fd515e6020c9a354"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var s=new URL(e);return n&&s.pathname.match(n)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),s=createCacheKey(n,hashParamName,a,!1);return[n.toString(),s]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});