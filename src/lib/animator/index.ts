import type { Bone, Camera, Renderer, Scene, SkinnedMesh } from "three";
import { applyRotationToBones, boneObjectToRotations, bonesToObject, flattenBones, lerp } from "./helpers";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
export default class Animator {

  private boneArray: Bone[] = [];
  private _bones: { [key: string]: Bone[] | Bone | { [key: string]: Bone }, circleArray: Bone[], spineArray: Bone[], mouthArray: Bone[] } = { circleArray: [], spineArray: [], mouthArray: [] };
  private bones = {} as typeof this._bones;
  private loaded = false;
  private controls: TransformControls;

  private conf = {
    wiggleRim: 0.05,
    wiggleHat: 0.05,
    wiggleMouth: 0.05,
    wiggleEyes: 0.05,
  }

  private confKeys: string[] = [];
  params: typeof this.conf

  constructor({ scene, camera, renderer }: { scene: Scene, camera: Camera, renderer: Renderer }) {
    this.controls = new TransformControls(camera, renderer.domElement);
    scene.add(this.controls)

    this.params = { ...this.conf };
    this.confKeys = Object.keys(this.conf);

    window.c = this.controls;
    this.setActiveBone = this.setActiveBone.bind(this);

  }

  setActiveBone(name: string): void {
    const b = this.boneArray.find(b => b.userData.name === name);
    this.controls.attach(b);
  }

  setSkeleton(skelly: SkinnedMesh): void {
    if (!skelly) return;
    this.boneArray = flattenBones(skelly as unknown as Bone)
    this._bones = bonesToObject(this.boneArray) as typeof this._bones;
    this.bones = boneObjectToRotations(this._bones);
    this.loaded = !!this.boneArray.length;
  }

  update(time: number): void {
    if (!this.loaded) return;

    const { bones, conf, confKeys, params } = this;

    confKeys.forEach(key => {
      if (params[key] !== conf[key]) {
        conf[key] = lerp(params[key], conf[key], 0.05);
      }
    })

    // Wiggle outer circle
    if (conf.wiggleRim) {
      bones.circleArray.forEach((bone, j) => {
        bone.position.y = (Math.sin(time / 300 + j * 2) / 100) * conf.wiggleRim;
      });
    }

    if (conf.wiggleHat) {
      bones.spineArray.forEach((bone, j) => {
        bone.rotation.x = (Math.sin(time / 300 + j * 2) / 100) * conf.wiggleHat;
        bone.rotation.y = (Math.sin(time / 300 + j * 1) / 100) * conf.wiggleHat;
        bone.rotation.z = (Math.sin(time / 300 + j * 0) / 100) * conf.wiggleHat;
      })
    }

    if (conf.wiggleMouth) {
      bones.mouth.r1.scale.x = Math.sin(time / 100 + 10) / 10 * conf.wiggleMouth
      bones.mouth.l2.scale.x = Math.sin(time / 100 + 5) / 10 * conf.wiggleMouth

      bones.mouth.l1.scale.x = Math.sin(time / 100 + 1) / 4 * conf.wiggleMouth - 0.2
      bones.mouth.r2.scale.x = Math.sin(time / 100 + 2) / 4 * conf.wiggleMouth - 0.2

      bones.mouth.l1.position.y = Math.sin(time / 100) / 300 * conf.wiggleMouth - 0.01;
      bones.mouth.r1.position.y = Math.sin(time / 100) / 300 * conf.wiggleMouth - 0.01;
    }

    if (conf.wiggleEyes) {

      const t = time / 400;

      bones.eyes.l1.scale.x = Math.sin(t + 1) / 4 * conf.wiggleEyes - 0.2
      bones.eyes.r2.scale.x = Math.sin(t + 2) / 4 * conf.wiggleEyes - 0.2

      bones.eyes.l1.position.y = Math.sin(t) / 300 * conf.wiggleEyes + 0.01;
      bones.eyes.r1.position.y = Math.sin(time / 200) / 300 * conf.wiggleEyes + 0.01;

    }

    applyRotationToBones(this.bones);


  }

}
