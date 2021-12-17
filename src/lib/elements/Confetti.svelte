<script lang="ts">
	import { orientation } from '$lib/stores';

	import { onMount } from 'svelte';

	export let width = 200;
	export let height = 400;
	export let amount = 200;
	export let repeat = false;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const stride = 9;

	$: particles = new Array(amount * stride).fill(null);

	function write(i, values) {
		particles.splice(i, values.length, ...values);
	}

	function read(i) {
		return particles.slice(i, i + stride);
	}

	const cubicRandom = () => {
		return Math.random();
	};

	function initParticles() {
		for (let i = 0; i < particles.length - stride; i += stride) {
			const x = width / 2;
			const y = height - 10;
			const vy = 5 + Math.random() * 7;
			const a = vy / 12;
			const vx = (cubicRandom() - 0.5) * (a * a) * 5;

			const w = 1 + Math.random() * 5;
			const h = 1 + Math.random() * 5;
			const r = Math.random();
			const vr = Math.random() * 0.1;
			const l = 0.1 + Math.random() * 0.4;
			write(i, [x, y, vx, vy, w, h, r, vr, l]);
		}

		if (!needsUpdate) {
			needsUpdate = true;
			render();
		}
	}

	let needsUpdate = false;

	export function show() {
		initParticles();
	}

	function render() {
		if (needsUpdate) {
			requestAnimationFrame(render);
		} else {
			ctx.clearRect(0, 0, width, height);
			return;
		}
		ctx.clearRect(0, 0, width, height);

		const mx = $orientation.x;
		const my = $orientation.y;

		let updates = 0;

		for (let i = 0; i < amount; i++) {
			let [x, y, vx, vy, w, h, r, vr, l] = read(i * stride);

			if (x === 0) {
				continue;
			}
			updates++;

			const lightness = l + ((r / 10) % 0.5);

			ctx.fillStyle = `hsl(34, 100%, ${lightness * 100}%, 1)`;
			ctx.save();
			ctx.translate(x + w / 2, y + h / 2);
			ctx.rotate(r);

			ctx.fillRect(-w / 2, -h / 2, w, h);
			ctx.restore();

			x -= vx - mx;
			y -= vy - 0.2;

			if (vy > -2) {
				vy -= 0.2;
			}

			r += vr;

			if (y > height) {
				if (repeat) {
					x = width / 2;
					y = height - 10;
					vy = 5 + Math.random() * 7;
					const a = vy / 12;
					vx = (cubicRandom() - 0.5) * (a * a) * 5;
				} else {
					x = 0;
				}
			}

			write(i * stride, [x, y, vx, vy, w, h, r, vr]);
		}

		needsUpdate = updates > 1;
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
	});
</script>

<canvas {width} {height} bind:this={canvas} style={`transform: translateZ(var(--z))`} />

<style>
	canvas {
		opacity: var(--opacity, 1);
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 99;
		transform: translateZ(10px);
	}
</style>
