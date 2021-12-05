import { MeshStandardMaterial, Scene, SkinnedMesh, TextureLoader, Vector2 } from "three";
import { EquirectangularReflectionMapping } from "three";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
loader.setDRACOLoader(dracoLoader);

export default async function(): Promise<GLTF> {

  const tLoader = new TextureLoader();
  const colMap = tLoader.load('SortingHat_col.png');
  const normalMap = tLoader.load('SortingHat_normal.png');
  const roughMap = tLoader.load('SortingHat_rough.png');
  const envMap = tLoader.load('env_map.jpg');
  envMap.mapping = EquirectangularReflectionMapping;

  colMap.flipY = false;
  normalMap.flipY = false;
  roughMap.flipY = false;

  const mat = new MeshStandardMaterial({
    map: colMap,
    normalMap,
    envMapIntensity: 1,
    normalScale: new Vector2(1, 1),
    roughnessMap: roughMap
  });


  const gltf = await loader.loadAsync(
    'sorting_hat.glb',
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    }
  );

  const obj = gltf.scene.children[0].children[1] as SkinnedMesh;
  obj.material = mat;

  return gltf;

}
