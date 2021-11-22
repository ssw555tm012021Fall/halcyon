if (typeof importScripts === 'function') {
	// eslint-disable-next-line no-undef
	importScripts(
		'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
	);
	/* global workbox */
	if (workbox) {
		console.log('Workbox is loaded');
		workbox.core.skipWaiting();

		/* injection point for manifest files.  */
		workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

		// Cache Image File
		workbox.routing.registerRoute(
			/.*\.(?:png|jpg|jpeg|gif)/,
			new workbox.strategies.CacheFirst({
				cacheName: 'images',
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						purgeOnQuotaError: true,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
					}),
				],
			})
		);

		// Caching Audio file
		workbox.routing.registerRoute(
			/.*\.(?:mp3)/,
			new workbox.strategies.CacheFirst({
				cacheName: 'audio',
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						purgeOnQuotaError: true,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
					}),
				],
			})
		);

		// Web assets
		workbox.routing.registerRoute(
			/.*\.(?:css|html|js|json)/,
			new workbox.strategies.CacheFirst({
				cacheName: 'web-assets',
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						purgeOnQuotaError: true,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
					}),
				],
			})
		);

		/* custom cache rules */
		workbox.routing.registerRoute(
			new workbox.routing.NavigationRoute(
				new workbox.strategies.NetworkFirst({
					cacheName: 'halcyon',
				})
			)
		);
	} else {
		console.log('Workbox could not be loaded. No Offline support');
	}
}

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('halcyon').then((cache) => {
			return cache.addAll(['/']).then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
