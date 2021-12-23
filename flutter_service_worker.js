'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "47e817f96adaeba3a0b810e229c49f37",
"assets/assets/2.0x/app-logo.png": "a60ca170ecb7d056a7f46b593c3f5556",
"assets/assets/2.0x/hamburger-menu.png": "64da79b966ffb7106f9177494cab3222",
"assets/assets/2.0x/search.png": "b9bd4c9de348f15e07148958875cd0a1",
"assets/assets/2.0x/toggle-day.png": "8fc2841a56915a1b77b5df712bac2e31",
"assets/assets/andrea-avatar.webp": "12734e80b3129e3f1bc1869dbd889bab",
"assets/assets/app-logo.png": "431ac169bffae2da69e86f731c5b9091",
"assets/assets/dart-course-banner-small.webp": "5a1a9e21d5d597559f81398793a54fe4",
"assets/assets/flutter-animations-course-banner-small.webp": "37a662428d1bc733e9dfaceec91c8576",
"assets/assets/flutter-firebase-course-banner-small.webp": "dc4d542801540c767ac291d036de28a4",
"assets/assets/flutter-rest-api-course-banner-small.webp": "6017c1b0d1575786dcd53275eacb50a1",
"assets/assets/fonts/Lato-Black.ttf": "e631d2735799aa943d93d301abf423d2",
"assets/assets/fonts/Lato-Bold.ttf": "85d339d916479f729938d2911b85bf1f",
"assets/assets/fonts/Lato-Italic.ttf": "7582e823ef0d702969ea0cce9afb326d",
"assets/assets/fonts/Lato-Regular.ttf": "2d36b1a925432bae7f3c53a340868c6e",
"assets/assets/hamburger-menu.png": "ca288bd20ac0fcc5e7e36c8a91ae6ee8",
"assets/assets/how-to-parse-json.webp": "031d68c110798f31151ef5fb8ef91ec6",
"assets/assets/icon-dart.svg": "f8b414cdf33ccd1a1f95de153922e50c",
"assets/assets/icon-firebase.svg": "ae68ff389ebdb38f8ba7f37006e7e592",
"assets/assets/icon-flutter.svg": "6b816afb687ec1c185750d46104c7900",
"assets/assets/icon-star.svg": "5df60072f735647b0e6311510bed4f63",
"assets/assets/learn-flutter-animations.webp": "6d1a721b8124882cea893fa20ed9f6eb",
"assets/assets/nipuna-cooray.jpg": "1cad7e7ec23d5354ff9363c0f8106a05",
"assets/assets/niven-shah.jpg": "9274080cadf1c2feb2c93e3c5a5db05b",
"assets/assets/parker-stevens.jpg": "d10ff9bf94917791ff5942bbf2058dce",
"assets/assets/search.png": "1fb67e44364efff37b9184a92c09191a",
"assets/assets/side-effects.webp": "3b347aba8d9a5a440d97ebc12cb18d47",
"assets/assets/split-view.webp": "5630c638a489fb4aab0adabc0fda772a",
"assets/assets/tadas-petra.jpg": "b878817bebd586cb4795d098fb4879c5",
"assets/assets/toggle-day.png": "249b10e5f122f6b051366038a0c8347e",
"assets/FontManifest.json": "d751713988987e9331980363e24189ce",
"assets/NOTICES": "ad282a5aa3cf728fc2b6b0ad8c4d67a1",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "2325228e11b2859dffb22c427ee0fbb7",
"/": "2325228e11b2859dffb22c427ee0fbb7",
"main.dart.js": "71d15f10746b53e66fd6dc44d8d8f539",
"manifest.json": "bb5e44ee9f1ee50cd2ee77c4a8c6ba45",
"version.json": "d9eecfaaf2d74bbc25e27efec2bf436a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
