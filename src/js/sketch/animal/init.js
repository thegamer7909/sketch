import * as THREE from 'three';
import debounce from 'js-util/debounce';
import sleep from 'js-util/sleep';

import PromiseOBJLoader from '../../common/PromiseOBJLoader';
import Boar from './Boar';

export default async function() {
  // ==========
  // Define common variables
  //
  const resolution = new THREE.Vector2();
  const canvas = document.getElementById('canvas-webgl');
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const clock = new THREE.Clock({
    autoStart: false
  });

  // ==========
  // Define unique variables
  //
  let boar;

  // For the preloader.
  const preloader = document.querySelector('.p-preloader');

  // ==========
  // Define functions
  //
  const render = () => {
    const time = clock.getDelta();
    renderer.render(scene, camera);
  };
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  };
  const resizeCamera = () => {
    camera.setFocalLength(Math.min(resolution.x / 1200, 1) * 35 + 15);
    camera.setViewOffset(
      1200,
      800,
      (resolution.x - 1200) / -2,
      (resolution.y - 800) / -2,
      resolution.x,
      resolution.y
    );
    camera.updateProjectionMatrix();
  };
  const resizeWindow = () => {
    resolution.set(document.body.clientWidth, window.innerHeight);
    canvas.width = resolution.x;
    canvas.height = resolution.y;
    resizeCamera();
    renderer.setSize(resolution.x, resolution.y);
  };
  const on = () => {
    window.addEventListener('blur', () => {
      // this window is inactive.
      clock.stop();
    });
    window.addEventListener('focus', () => {
      // this window is inactive.
      clock.start();
    });
    window.addEventListener('resize', debounce(resizeWindow, 1000));
  };

  // ==========
  // Initialize
  //
  renderer.setClearColor(0x111111, 0.0);

  camera.aspect = 3 / 2;
  camera.far = 1000;
  camera.position.set(0, 0, 50);
  camera.lookAt(new THREE.Vector3());

  const obj = await PromiseOBJLoader('/sketch-threejs/model/wild_animals/boar.obj');
  const boarGeometry = obj.children[0].geometry;

  boar = new Boar(boarGeometry);

  scene.add(boar)

  on();
  resizeWindow();

  preloader.classList.add('is-hidden');
  await sleep(200);

  clock.start();
  renderLoop();
}
