import { Bone } from "three";

export function flattenBones(bone: Bone, arr = []): Bone[] {
  if (bone.type === 'Bone' && !arr.includes(bone)) arr.push(bone);
  bone.children.forEach((b: Bone) => {
    if (b.type === 'Bone' && !arr.includes(b)) arr.push(b);
    if (b.children.length) flattenBones(b, arr);
  });
  return arr;
}

export function lerp(a: number, b: number, alpha: number): number {
  return a * alpha + b * (1 - alpha);
}


export function bonesToObject(boneArray: Bone[]): { [key: string]: THREE.Bone | THREE.Bone[] } {

  const bones = {};

  boneArray.forEach((bone) => {

    const { userData: { name } = {} } = bone;

    if (name) {
      bones[name] = bone;
      const [groupName, memberName] = name.toLowerCase().split("_")
      if (memberName) {
        bones[groupName] = groupName in bones ? { ...bones[groupName], ...{ [memberName]: bone } } : { [memberName]: bone };
        bones[groupName + "Array"] = (groupName + "Array") in bones ? [...bones[groupName + "Array"], bone] : [bone];
      }
    }

  });

  return bones;

}

function boneToRotation(bone: Bone) {
  let dirty = false;
  return {
    name: bone.name,
    get dirty() { return dirty },
    clear: () => { dirty = false },
    rotation: {
      _x: 0,
      ox: bone.rotation.x,
      get x() { return this.ox + this._x },
      set x(v) {
        if (v === this._x) return;
        this._x = v;
        dirty = true;
      },
      _y: 0,
      oy: bone.rotation.y,
      get y() { return this.oy + this._y },
      set y(v) {
        if (v === this._y) return;
        this._y = v;
        this._dirty = true;
      },
      _z: 0,
      oz: bone.rotation.z,
      get z() { return this.oz + this._z },
      set z(v) {
        if (v === this._z) return;
        this._z = v;
        dirty = true;
      },
    },
    position: {
      ox: bone.position.x,
      _x: 0,
      get x() { return this.ox + this._x },
      set x(v) {
        if (v === this._x) return;
        this._x = v;
        dirty = true;
      },
      oy: bone.position.y,
      _y: 0,
      get y() { return this.oy + this._y },
      set y(v) {
        if (v === this._y) return;
        this._y = v;
        dirty = true;
      },
      oz: bone.position.z,
      _z: 0,
      get z() { return this.oz + this._z },
      set z(v) {
        if (v === this._z) return;
        this._z = v;
        dirty = true;
      },
    },
    scale: {
      ox: bone.scale.x,
      _x: 0,
      get x() { return this.ox + this._x },
      set x(v) {
        if (v === this._x) return;
        this._x = v;
        dirty = true;
      },
      oy: bone.scale.y,
      _y: 0,
      get y() { return this.oy + this._y },
      set y(v) {
        if (v === this._y) return;
        this._y = v;
        dirty = true;
      },
      oz: bone.scale.z,
      _z: 0,
      get z() { return this.oz + this._z },
      set z(v) {
        if (v === this._z) return;
        this._z = v;
        dirty = true;
      },
    },

    id: bone.uuid
  }
}

type BoneRotation = ReturnType<typeof boneToRotation>;

function _boneObjectToRotations(boneObject: { [key: string]: Bone | Bone[] } | Bone | Bone[], cache = { bones: {} }, depth = 0) {

  if (boneObject instanceof Bone) {
    if (boneObject.uuid in cache) return cache[boneObject.uuid];
    cache.bones[boneObject.uuid] = boneObject;
    const o = boneToRotation(boneObject);
    cache[boneObject.uuid] = o;
    return o;
  }

  if (Array.isArray(boneObject)) {
    return boneObject.map(bone => _boneObjectToRotations(bone, cache, depth + 1))
  }

  const obj = {};
  const keys = Object.keys(boneObject)
  if (keys.length) {
    keys.forEach(key => {
      obj[key] = _boneObjectToRotations(boneObject[key], cache, depth + 1);
    })
  }

  if (depth === 0) {
    return { obj, cache };
  }

  return obj;

}

export function boneObjectToRotations(boneObject: { [key: string]: Bone | Bone[] }) {
  const { obj, cache } = _boneObjectToRotations(boneObject);
  obj._bones = cache.bones;
  delete cache.bones;
  obj._all = Object.values(cache);
  return obj;
}

export function applyRotationToBones({ _all, _bones }: { _all: BoneRotation[], _bones: { [key: string]: Bone } }): void {

  _all.forEach(b => {
    if (!b.dirty) return;
    const bone = _bones[b.id];
    if (!bone) return;

    bone.rotation.x = lerp(b.rotation.x, bone.rotation.x, 0.9);
    bone.rotation.y = lerp(b.rotation.y, bone.rotation.y, 0.9);
    bone.rotation.z = lerp(b.rotation.z, bone.rotation.z, 0.9);

    bone.position.x = lerp(b.position.x, bone.position.x, 0.9);
    bone.position.y = lerp(b.position.y, bone.position.y, 0.9);
    bone.position.z = lerp(b.position.z, bone.position.z, 0.9);

    bone.scale.x = lerp(b.scale.x, bone.scale.x, 0.9);
    bone.scale.y = lerp(b.scale.y, bone.scale.y, 0.9);
    bone.scale.z = lerp(b.scale.z, bone.scale.z, 0.9);

    b.clear();

  })


}


