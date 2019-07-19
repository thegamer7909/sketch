import * as THREE from 'three';

import vs from './glsl/Plane.vs';
import fs from './glsl/Plane.fs';

const R = new THREE.Vector2();

const getViewSize = (camera) => {
  const fovInRadians = (camera.fov * Math.PI) / 180;
  const height = Math.abs(
    camera.position.z * Math.tan(fovInRadians / 2) * 2
  );
  R.set(height * camera.aspect, height);
}

export default class Plane extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        texture: {
          type: 't',
          value: null
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Plane';
  }
  start() {
  }
  update(time) {
    this.material.uniforms.time.value += time;
  }
  resize(camera) {
    getViewSize(camera);
    this.geometry.scale(R.x / 2, R.y / 2, 1);
  }
}
