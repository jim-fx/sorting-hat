import {
	EquirectangularReflectionMapping,
	MeshStandardMaterial,
	SkinnedMesh,
	TextureLoader,
	Vector2
} from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
loader.setDRACOLoader(dracoLoader);

export default async function (): Promise<GLTF> {
	const tLoader = new TextureLoader();
	const colMap = tLoader.load('textures/SortingHat_col.jpg');
	// const normalMap = tLoader.load('textures/SortingHat_normal.jpg');
	// const roughMap = tLoader.load('textures/SortingHat_rough.jpg');
	const envMap = tLoader.load('textures/env_map.jpg');
	envMap.mapping = EquirectangularReflectionMapping;

	colMap.flipY = false;
	// normalMap.flipY = false;
	// roughMap.flipY = false;

	const mat = new MeshStandardMaterial({
		map: colMap,
		// normalMap,
		envMapIntensity: 1,
		normalScale: new Vector2(1, 1)
		// roughnessMap: roughMap
	});

	const gltf = await loader.loadAsync('sorting_hat.glb', (xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	});

	const obj = gltf.scene.children[0].children[1] as SkinnedMesh;
	obj.material = mat;

	return gltf;
}
