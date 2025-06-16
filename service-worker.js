const CACHE = 'funhub-v3.1';
const ASSETS = [
  './', './index.html', './style.css', './script.js',
  './manifest.json', './beat1.mp3','./beat2.mp3','./beat3.mp3',
  './beat4.mp3','./beat5.mp3','./beat6.mp3','./beat7.mp3',
  './beat8.mp3','./beat9.mp3','./beat10.mp3',
  './lobster.png','./cheer.mp3','./icon-192.png','./icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});