import { CanvasTexture, MeshStandardMaterial, SkinnedMesh, TextureLoader } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

const tLoader = new TextureLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
loader.setDRACOLoader(dracoLoader);

function loadTexture(url: string): any {
	return tLoader.load(url);
}

function loadModel(url: string, xhrCallback: (xhr: any) => void): Promise<GLTF> {
	return loader.loadAsync(url, xhrCallback);
}

async function loadHat(): Promise<GLTF> {
	const colMap = loadTexture('textures/SortingHat_col.jpg');
	colMap.flipY = false;

	const mat = new MeshStandardMaterial({
		map: colMap
	});

	const gltf = await loadModel('sorting_hat.glb', (xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	});

	const obj = gltf.scene.children[0].children[1] as SkinnedMesh;
	obj.material = mat;

	return gltf;
}

function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise((res, rej) => {
		const img = new Image();
		img.src = url;
		img.onerror = (err) => rej(err);
		img.onload = () => res(img);
	});
}

async function loadFont(name: string, url: string) {
	const f = new FontFace(name, `url(${url})`);
	await f.loaded;
	return f;
}

async function loadBook({
	name = '',
	house = ''
}: { name?: string; house?: string } = {}): Promise<GLTF> {
	const canvas = document.createElement('canvas');
	canvas.width = 512;
	canvas.height = 512;
	const ctx = canvas.getContext('2d');
	const colMap = new CanvasTexture(canvas);
	colMap.flipY = false;

	function drawText() {
		ctx.textAlign = 'center';
		ctx.font = '10px Chantelli';
		ctx.fillText('Herzlich Willkommen', 325, 390);
		ctx.font = '15px Chantelli bold';
		ctx.fillText(name, 325, 420);
		colMap.needsUpdate = true;
	}

	loadFont('Chantelli', 'fonts/Chantelli_Antiqua-webfont.woff').then(() => drawText());

	loadImage('textures/book_col.jpg').then(async (bg) => {
		ctx.drawImage(bg, 0, 0, 512, 512);
		drawText();
		const img = await loadImage(`icons/${house}.svg`);
		ctx.drawImage(img, 270, 240, 120, 120);
		drawText();
	});

	const mat = new MeshStandardMaterial({
		map: colMap
	});

	const gltf = await loadModel('book.glb', (xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	});

	const obj = gltf.scene.children[0].children[1] as SkinnedMesh;
	obj.material = mat;

	return gltf;
}

export default {
	loadHat,
	loadBook
};
