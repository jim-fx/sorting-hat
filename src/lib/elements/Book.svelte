<script lang="ts">
	import { lerp } from '$lib/animator/helpers';
	import loader from '$lib/loader';
	import pointerStore from '$lib/pointerStore';
	import { userData } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { Bone } from 'three';
	import { PerspectiveCamera, PointLight, Scene, WebGLRenderer } from 'three';

	let canvas: HTMLCanvasElement;

	const scene = new Scene();

	const light1 = new PointLight(0xc0a9ff, 0.8);
	light1.position.set(2.5, 2.5, 2);
	scene.add(light1);

	const light2 = new PointLight(0xffd1d1, 0.8);
	light2.position.set(-2.5, 2.5, 2);
	scene.add(light2);

	const light3 = new PointLight(0xffffff, 1);
	light3.position.set(1, 1, -1.5);
	scene.add(light3);

	const width = 500;
	const height = width;

	let x = 0;
	let y = 0;

	let state = 'loading';

	const camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
	camera.position.set(-0.2, 0.8, -0.1);

	const skeleton: { [key: string]: Bone } = {};

	async function loadModel() {
		const book = await loader.loadBook($userData);
		const bones = book.scene.children[0].children[1].skeleton.bones;
		bones.forEach((bone) => {
			skeleton[bone.userData.name] = bone;
		});

		skeleton['Left'].rotation.z = 0;
		skeleton['Left'].position.x = -0.02;
		skeleton['Right'].rotation.z = 0;
		skeleton['Right'].position.x = 0.02;
		skeleton['Root'].rotation.z = -1.5 - Math.PI * 2;

		scene.add(book.scene.children[0]);

		setTimeout(() => {
			state = 'rotating';
		}, 500);
		window.skeleton = skeleton;
	}

	function easeInOutQuint(x: number): number {
		return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
	}

	function easeOutQuint(x: number): number {
		return 1 - Math.pow(1 - x, 5);
	}

	let time = 0;

	onMount(() => {
		loadModel();

		const renderer = new WebGLRenderer({ canvas, alpha: true });
		renderer.setSize(width, height);

		function animate(f: number) {
			requestAnimationFrame(animate);

			x = lerp(pointerStore.x / -5, x, 0.1);
			y = lerp(pointerStore.y / -5, y, 0.1) + 0.03;

			camera.position.x = x;
			camera.position.z = y;
			camera.lookAt(0, 0, 0);

			switch (state) {
				case 'rotating':
					time++;
					const alpha = easeInOutQuint(time / 120);
					skeleton['Root'].rotation.z = lerp(-1.5 - Math.PI * 2, 0, 1 - alpha);
					if (time > 120) {
						time = 0;
						state = 'opening';
					}
					break;
				case 'opening':
					time++;
					const a2 = easeInOutQuint(time / 120);
					skeleton['Left'].rotation.z = lerp(1.67, 0, a2);
					skeleton['Left'].position.x = lerp(-0.05, -0.02, a2);
					skeleton['Right'].rotation.z = lerp(-1.67, 0, a2);
					skeleton['Right'].position.x = lerp(0.05, 0.02, a2);
					if (time > 120) {
						state = 'opened';
					}
					break;
			}

			render();
		}

		function render() {
			renderer.render(scene, camera);
		}

		animate(0);
	});
</script>

<canvas
	bind:this={canvas}
	class:loaded={state !== 'loading'}
	style={`visibility:${state !== 'loading' ? 'visible' : 'hidden'}`}
/>

<style>
	canvas {
		transform: scale(0);
		filter: drop-shadow(40px 49px 35px black);
		transition: transform 3s ease, opacity 0.3s ease;
		object-fit: contain;
		max-height: 60%;
		opacity: 0;
		max-width: 100vw;
	}

	canvas.loaded {
		opacity: 1;
		transform: scale(1);
	}
</style>
