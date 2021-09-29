const IMAGE_CACHE = 'images';

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
			({ request }) => request.destination === 'image',
			new workbox.strategies.CacheFirst({
				cacheName: IMAGE_CACHE,
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						purgeOnQuotaError: true,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
					}),
				],
			})
		);

		// Cache Fonts file
		workbox.routing.registerRoute(
			({ request }) => request.destination === 'font',
			new workbox.strategies.CacheFirst({
				cacheName: 'fonts',
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
		workbox.routing.registerRoute(
			({ request }) =>
				request.destination === 'script' ||
				request.destination === 'style',
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
					cacheName: 'gva',
				})
			)
		);
	} else {
		console.log('Workbox could not be loaded. No Offline support');
	}
}

addEventListener('message', (evt) => {
	const { type, payload } = evt.data;

	switch (type) {
		case 'DOWNLOAD_IMAGES':
			onDownloadImages(payload, evt);
			break;
		default:
			return;
	}
});

function onDownloadImages(payload, event) {
	const { images, IssueID } = payload;
	console.info(`Download images in the service worker`);
	setTimeout(async () => {
		try {
			const clients = await self.clients.matchAll({ type: 'window' });
			console.info(`I start downloading the ${images.length} images`);
			await downloadImages(images);
			console.info(
				`I finish processing all the images for the issue ${IssueID}`
			);
			event.ports[0].postMessage({
				type: 'DOWNLOAD_IMAGES',
				payload,
			});
			for (const client of clients) {
				client.postMessage({
					type: 'DOWNLOAD_IMAGES',
					payload,
				});
			}
		} catch (e) {
			event.ports[0].postMessage({
				type: 'ERROR',
				payload: {
					error: e,
				},
			});
		}
	}, 2000);
}

async function downloadImages(images) {
	const clients = await self.clients.matchAll({ type: 'window' });

	for (let image of images) {
		await downloadImage(image);
		for (const client of clients) {
			client.postMessage({
				type: 'DOWNLOAD_IMAGE',
				payload: {
					image,
					cacheName: IMAGE_CACHE,
				},
			});
		}
	}
}

/*async function timeout(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}*/

async function downloadImage(image) {
	try {
		if (caches) {
			console.debug(`Download image`);
			console.debug(image);
			const cache = await caches.open(IMAGE_CACHE);
			await cache.addAll([image]);
		} else {
			await fetch(image);
		}
	} catch (e) {
		console.error(e);
	}
}

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('canvasflow').then((cache) => {
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
