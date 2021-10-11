import vite from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';

const config = vite.defineConfig({
	server: {
		port: 5000
	},
	build: {
		sourcemap: process.env.SOURCE_MAP === 'true',
	},
	plugins: [
		reactRefresh(),
		VitePWA({
			mode: 'development',
			srcDir: 'src',
			filename: 'sw.js',
			base: '/',
			strategies: 'injectManifest',
			manifest: {
				short_name: 'GVA',
				name: 'Golden Vine Awards',
				icons: [
					{
						src: '/assets/manifest/manifest-icon-192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: '/assets/manifest/manifest-icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable any',
					},
				],
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
			},
			injectManifest: {
				globDirectory: 'dist',
        globPatterns: [
					'**/*.{css, js, jpg, jpeg, svg, png, html, woff2, json}',
				],
			},
		}),
	],
});

export default config;
