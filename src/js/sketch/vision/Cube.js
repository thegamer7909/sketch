import * as THREE from 'three';

import vs from './glsl/Cube.vs';
import fs from './glsl/Cube.fs';

export default class Cube extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BoxBufferGeometry(10, 10, 10);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Cube';
  }
  start() {
  }
  update(time) {
    this.material.uniforms.time.value += time;
  }
}
