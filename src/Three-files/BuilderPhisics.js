import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import CANNON from "cannon";

const BuilderPhisics = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    //
    const renderCanvas = canvasRef.current;

    // Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderCanvas.appendChild(renderer.domElement);

    //Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    //Texture
    const loadingManager = new THREE.LoadingManager(); // to manage textures

    loadingManager.onLoaded = () => console.log("onLoaded");

    const texture = new THREE.TextureLoader(loadingManager);

    const materialStandard = new THREE.MeshStandardMaterial();
    materialStandard.metalness = 0.45;
    // materialStandard.roughness = 0.65;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffc, 0.3);
    directionalLight.position.set(1, 0.25, 0);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
    scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(1, -0.5, 1);
    scene.add(pointLight);

    const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 1);
    rectAreaLight.position.set(-1.5, 0, 1.5);
    rectAreaLight.lookAt(new THREE.Vector3());
    scene.add(rectAreaLight);

    const spotLight = new THREE.SpotLight(
      0x78ff00,
      0.7,
      10,
      Math.PI * 0.1,
      0.25,
      1
    );
    spotLight.position.set(1, 2, 3);
    scene.add(spotLight);
    //DEBUG
    // const gui = new dat.GUI();
    // gui.add(materialStandard, "metalness").min(0).max(1).step(0.0001);
    // gui.add(materialStandard, "roughness").min(0).max(1).step(0.0001);
    // gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);

    // Geometry
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      materialStandard
    );

    sphere.position.x = -1.5;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      materialStandard
    );
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      materialStandard
    );

    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.8;

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 16, 32),
      materialStandard
    );
    torus.position.x = 1.5;

    scene.add(sphere, box, plane, torus);

    const clock = new THREE.Clock();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //Phisics

    const world = new CANNON.World();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      // update Objects
      //   sphere.rotation.y = 0.1 * elapsedTime;
      //   plane.rotation.y = 0.1 * elapsedTime;
      //   torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      box.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;
      onWindowResize();

      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <h1>BuilderPhisics</h1>
      <div id="renderCanvas" ref={canvasRef} />
    </>
  );
};

export default BuilderPhisics;
