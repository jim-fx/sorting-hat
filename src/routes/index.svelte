<script lang="ts">
	import { onMount } from 'svelte';
	import type { Bone, SkinnedMesh } from 'three';

	import Pattern from './pattern.svelte';

	import * as THREE from 'three';
	import { MeshStandardMaterial } from 'three';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let canvas: HTMLCanvasElement;

	const scene = new THREE.Scene();

	const light1 = new THREE.PointLight(0xc0a9ff, 0.8);
	light1.position.set(2.5, 2.5, 2);
	scene.add(light1);

	const light2 = new THREE.PointLight(0xffd1d1, 0.8);
	light2.position.set(-2.5, 2.5, 2);
	scene.add(light2);

	const light3 = new THREE.PointLight(0xffffff, 1);
	light3.position.set(1, 1, -1.5);
	scene.add(light3);

	const loader = new GLTFLoader();

	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('draco/');
	loader.setDRACOLoader(dracoLoader);

	let skeleton: THREE.SkinnedMesh;

	let boneArray: THREE.Bone[] = [];
	let bones: {
		circle: THREE.Bone[];
		spine: THREE.Bone[];
		[key: string]: THREE.Bone | THREE.Bone[];
	} = { circle: [], spine: [] };

	const width = 500;
	const height = width;

	let wHeight = width;
	let wWidth = height;

	let x = 0;
	let y = 0;

	let mx = 0;
	let my = 0;

	let loaded = false;
	let wiggleFlaps = false;
	const rotations = {};

	function lerp(a, b, alpha) {
		return a * alpha + b * (1 - alpha);
	}

	function handleMouseMove({ clientX, clientY }) {
		mx = 2 - (clientX / wWidth) * 2 - 1;
		my = (clientY / wHeight) * 2 - 1;
	}

	const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
	camera.position.set(0, 0, 1);

	function flattenBones(bone, arr = []) {
		if (bone.type === 'Bone' && !arr.includes(bone)) arr.push(bone);
		bone.children.forEach((b) => {
			if (b.type === 'Bone' && !arr.includes(b)) arr.push(b);
			if (b.children.length) flattenBones(b, arr);
		});
		return arr;
	}

	onMount(() => {
		wHeight = window.innerHeight;
		wWidth = window.innerWidth;

		if ('Gyroscope' in window) {
			let gyroscope = new Gyroscope({ frequency: 30 });

			gyroscope.addEventListener('reading', (e) => {
				console.log('Angular velocity along the X-axis ' + gyroscope.x);
				console.log('Angular velocity along the Y-axis ' + gyroscope.y);
				console.log('Angular velocity along the Z-axis ' + gyroscope.z);
			});
			gyroscope.start();
		}

		const tLoader = new THREE.TextureLoader();
		const colMap = tLoader.load('SortingHat_col.png');
		const normalMap = tLoader.load('SortingHat_normal.png');
		const roughMap = tLoader.load('SortingHat_rough.png');
		const envMap = tLoader.load('env_map.jpg');
		envMap.mapping = THREE.EquirectangularReflectionMapping;

		colMap.flipY = false;
		normalMap.flipY = false;
		roughMap.flipY = false;

		const mat = new MeshStandardMaterial({
			map: colMap,
			normalMap,
			envMapIntensity: 1,
			normalScale: new THREE.Vector2(1, 1),
			roughnessMap: roughMap
		});

		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
		renderer.setSize(width, height);

		/* const controls = new OrbitControls(camera, renderer.domElement); */
		/* controls.enableDamping = true; */
		/* controls.target.set(0, 0.2, 0); */

		loader.load(
			'sorting_hat.glb',
			(gltf) => {
				/* gltf.scene.scale.set(0.01, 0.01, 0.01); */

				const obj = gltf.scene.children[0].children[1] as SkinnedMesh;
				skeleton = gltf.scene.children[0].children[0] as SkinnedMesh;
				boneArray = flattenBones(skeleton) as Bone[];
				obj.material = mat;

				/* const helper = new THREE.SkeletonHelper(skeleton); */
				/* scene.add(helper); */

				obj.geometry.computeBoundingBox();
				const center = new THREE.Vector3();
				const bbox = obj.geometry.boundingBox;
				bbox.getCenter(center);
				camera.position.x = center.x;
				camera.position.y = center.y;
				const boundingHeight = (bbox.max.y - center.y) * 4;
				const camDistance = boundingHeight / 2 / Math.tan((Math.PI * camera.fov) / 360);
				camera.position.z = camDistance;

				boneArray.forEach((bone) => {
					if (bone.userData.name.toLowerCase().includes('circle')) bones.circle.push(bone);
					if (bone.userData.name.toLowerCase().startsWith('bone')) bones.spine.push(bone);

					bones[bone.userData.name] = bone;
				});

				console.log(bones);
				scene.add(gltf.scene);

				loaded = true;
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			},
			(error) => {
				console.log(error);
			}
		);

		function animate(f) {
			requestAnimationFrame(animate);

			/* controls.update(); */

			const i = Date.now();

			x = lerp(mx, x, 0.1);
			y = lerp(my, y, 0.1);

			camera.position.x = x * 0.8;
			camera.position.y = y * 0.3 + 0.1;
			camera.lookAt(0, 0.2, 0);

			if (boneArray.length) {
				//Wiggle Spine;

				/* boneArray.forEach(bone => bone.rotation.x = Math.sin(i/500)/4) */

				bones.spine.forEach((bone, j) => {
					bone.rotation.y = Math.sin(i / 500 + j * 2) / 10;
					bone.rotation.x = Math.sin(i / 500 + j * 1) / 20;
					bone.rotation.z = Math.sin(i / 500) / 20;
				});

				// Wiggle outer circle
				bones.circle.forEach((bone, j) => {
					bone.position.y = Math.sin(i / 300 + j * 2) / 100;
				});
			}

			render();
		}

		function render() {
			renderer.render(scene, camera);
		}

		animate();
	});
</script>

<svelte:head>
	<title>Dungeon Entry</title>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} />


<div class="pattern-wrapper">
	<Pattern />
</div>
<div class="pattern-wrapper p-tr">
	<Pattern rotate="90deg" />
</div>
<div class="pattern-wrapper p-br">
	<Pattern rotate="180deg" />
</div>
<div class="pattern-wrapper p-bl">
	<Pattern rotate="-90deg" />
</div>

<div class="bar b-t" />
<div class="bar b-r" />
<div class="bar b-l" />
<div class="bar b-b" />

<div class="overlay" />
<main>
	<canvas bind:this={canvas} class:loaded />
	<div class="content" />
</main>

<style>
	.overlay {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-blend-mode: multiply;
		background: radial-gradient(transparent, rgba(0, 0, 0, 0.8));
	}

	.bar {
		border: 2px solid black;
		border-radius: 2px;
		position: fixed;
	}

	.bar::after {
		content: '';
		position: absolute;
		width: 100%;
		border-radius: 5px;
		height: 2px;
		background-color: black;
	}

	.b-t {
		top: -2px;
		width: calc(100vw - 240px);
		height: 8px;
		left: 120px;
	}

	.b-t::after {
		top: 23px;
	}
	.b-b {
		bottom: -2px;
		width: calc(100vw - 240px);
		height: 8px;
		left: 120px;
	}

	.b-b::after {
		bottom: 23px;
	}
	.b-r {
		right: -2px;
		height: calc(100vh - 240px);
		width: 8px;
		top: 120px;
	}

	.b-r::after {
		right: 23px;
		height: 100%;
		width: 2px;
	}

	.b-l {
		left: -2px;
		height: calc(100vh - 240px);
		width: 8px;
		top: 120px;
	}

	.b-l::after {
		left: 23px;
		height: 100%;
		width: 2px;
	}
	.pattern-wrapper {
		width: 100px;
		height: 100px;
		position: fixed;
		z-index: 2;
	}

	.p-tr {
		right: 0;
	}

	.p-br {
		right: 0;
		bottom: 0;
	}

	.p-bl {
		bottom: 0;
		left: 0;
	}

	main {
		height: 100%;
		width: 100%;
		display: grid;
		justify-content: center;
	}

	:global(body) {
		width: 100vw;
		background-image: url('background.jpg');
		background-size: cover;
		background-position: center center;
		height: 100vh;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	canvas {
		transform: scale(0);
		filter: drop-shadow(40px 49px 35px black);
		transition: transform 3s ease;
	}

	canvas.loaded {
		transform: scale(1);
	}
</style>
