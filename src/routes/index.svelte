<script lang="ts">
	import createActions from '$lib/actions';
	import { activeAction } from '$lib/actions/ActionClass';
	import Animator from '$lib/animator';
	import { lerp } from '$lib/animator/helpers';
	import createHat from '$lib/createHat';
	import Overlay from '$lib/elements/Overlay.svelte';
	import Typewriter from '$lib/elements/Typewriter.svelte';
	import gyro from '$lib/gyro';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import type { SkinnedMesh } from 'three';
	import { PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer } from 'three';

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

	let _showText: boolean = true;
	$: showText = _showText === true || _showText === undefined;

	const width = 500;
	const height = width;

	let wHeight = width;
	let wWidth = height;

	let x = 0;
	let y = 0;

	let mx = 0;
	let my = 0;

	let loaded = false;

	const camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
	camera.position.set(0, 0, 1);

	let animator: Animator;
	function handleMouseMove({ clientX, clientY }) {
		mx = 2 - (clientX / wWidth) * 2 - 1;
		my = (clientY / wHeight) * 2 - 1;
	}

	async function loadModel() {
		const gltf = await createHat();

		const obj = gltf.scene.children[0].children[1] as SkinnedMesh;
		const skeleton = gltf.scene.children[0].children[0] as SkinnedMesh;
		animator.setSkeleton(skeleton);

		obj.geometry.computeBoundingBox();
		const center = new Vector3();
		const bbox = obj.geometry.boundingBox;
		bbox.getCenter(center);
		camera.position.x = center.x;
		camera.position.y = center.y;
		const boundingHeight = (bbox.max.y - center.y) * 4;
		const camDistance = boundingHeight / 2 / Math.tan((Math.PI * camera.fov) / 360);
		camera.position.z = camDistance;

		scene.add(gltf.scene);

		loaded = true;
	}

	$: activeState = $activeAction && $activeAction.state;

	function handleResize() {
		wHeight = window.innerHeight;
		wWidth = window.innerWidth;
	}

	onMount(() => {
		wHeight = window.innerHeight;
		wWidth = window.innerWidth;

		let oAlpha, oBeta;
		gyro(([alpha, beta, gamma]) => {
			if (!oAlpha) oAlpha = alpha;
			if (!oBeta) oBeta = beta;
			mx = (oBeta - beta) / 180;
			my = (oAlpha - alpha) / 180;
		});

		loadModel();

		const renderer = new WebGLRenderer({ canvas, alpha: true });
		renderer.setSize(width, height);

		animator = new Animator({ scene, renderer, camera });
		const action = createActions(animator);
		action.setActive();

		/* const controls = new OrbitControls(camera, renderer.domElement); */
		/* controls.enableDamping = true; */
		/* controls.target.set(0, 0.2, 0); */

		function animate(time) {
			requestAnimationFrame(animate);

			/* controls.update(); */

			animator?.update(time);

			x = lerp(mx, x, 0.1);
			y = lerp(my, y, 0.1);

			camera.position.x = x * 0.8;
			camera.position.y = y * 0.3 + 0.1;
			camera.lookAt(0, 0.2, 0);

			render();
		}

		function render() {
			renderer.render(scene, camera);
		}

		animate(0);
	});
</script>

<svelte:head>
	<title>Dungeon Entry</title>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} on:resize={handleResize} />

<Overlay />

<main>
	<canvas
		bind:this={canvas}
		class:loaded
		on:click={() => {
			if (animator.params.wiggleRim < 1) {
				animator.params.wiggleRim = 5;
				animator.params.wiggleEyes = 1;
				setTimeout(() => {
					animator.params.wiggleRim = 0;
					animator.params.wiggleEyes = 0;
				}, 1000);
			}
		}}
	/>

	<div class="content">
		{#if $activeAction?.text && ($activeState === 'running' || $activeState === 'finished' || $activeState === 'input') && showText}
			<Typewriter text={$activeAction.text} duration={$activeAction.duration} />
		{/if}

		{#if $activeState}
			{#if $activeState === 'suspended'}
				<button on:click={() => $activeAction.start()}>Starten</button>
			{:else if $activeState === 'finished'}
				{#if $activeAction?.nextActions?.length}
					<div>
						{#each $activeAction.nextActions as next, i}
							<button
								in:scale={{ duration: 200, delay: 200 * i }}
								on:click={() => next.action.start()}>{next.name}</button
							>
						{/each}
					</div>
				{/if}
			{:else if $activeState === 'input'}
				<svelte:component
					this={$activeAction.element}
					bind:showText={_showText}
					callback={(v) => {
						$activeAction.handleElementCallback(v);
					}}
				/>
			{/if}
		{/if}
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		max-height: 100vh;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.content {
		max-width: 90%;
		max-width: 700px;
		height: 60%;
		display: grid;
		place-items: center;
		align-content: center;
	}

	canvas {
		transform: scale(0);
		filter: drop-shadow(40px 49px 35px black);
		transition: transform 3s ease;
		object-fit: contain;
		max-height: 60%;
		max-width: 100vw;
	}

	canvas.loaded {
		transform: scale(1);
	}
</style>
