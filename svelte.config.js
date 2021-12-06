import adapter from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import glsl from 'vite-plugin-glsl';

const { KIT_ADAPTER = 'node', BASE_PATH = '/' } = process.env;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: KIT_ADAPTER === 'node' ? adapter() : adapterStatic(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',

		paths: {
			base: BASE_PATH
		},

		vite: {
			plugins: [glsl.default()],
			ssr: {
				noExternal: ['three']
			}
		}
	}
};

export default config;
