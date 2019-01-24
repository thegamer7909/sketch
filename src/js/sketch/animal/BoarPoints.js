import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

export default class BoarPoints extends THREE.Points {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry();

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: require('./glsl/boarPoints.vs'),
      fragmentShader: require('./glsl/boarPoints.fs'),
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'BoarPoints';
  }
  render(time) {
    this.material.uniforms.time.value += time;
  }
}
