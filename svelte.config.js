import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import glsl from 'vite-plugin-glsl';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',

		vite: {
			plugins: [glsl.default()],
			ssr: {
				noExternal: ['three']
			}
		}
	}
};

export default config;
