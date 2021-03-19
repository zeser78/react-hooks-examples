import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import cubeTexture from "../assets/floor_diffuse.png";
import ringColor from "../assets/ring.jpg";

const BuilderMaterial = () => {
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
    camera.position.z = 4;
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
    const colorTexture = texture.load(cubeTexture);
    const ringTexture = texture.load(ringColor);
    // Material
    const material = new THREE.MeshBasicMaterial({ map: colorTexture });
    // material.map = colorTexture
    material.color = new THREE.Color(0x00ff00);
    // material.wireframe = true;
    material.transparent = true;
    material.opacity = 0.5;
    material.alphaMap = ringTexture;
    material.side = THREE.DoubleSide;

    const materialNormal = new THREE.MeshNormalMaterial();
    materialNormal.flatShading = true;

    const materialMeshMatcap = new THREE.MeshMatcapMaterial();
    materialMeshMatcap.matcap = ringTexture;

    const materialMeshDep = new THREE.MeshDepthMaterial();

    const materialLamber = new THREE.MeshLambertMaterial();

    const materialPhong = new THREE.MeshPhongMaterial();
    materialPhong.shininess = 100;

    const materialToon = new THREE.MeshToonMaterial();
    materialToon.gradientMap = ringTexture;

    const materialStandard = new THREE.MeshStandardMaterial();
    materialStandard.metalness = 0.45;
    materialStandard.roughness = 0.65;
    materialStandard.map = ringTexture;

    //Environment
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    const environment = new THREE.MeshStandardMaterial();
    material.metalness = 0.7;
    material.roughness = 0.2;

    // const environmentMapTexture = cubeTextureLoader.load();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    //DEBUG
    const gui = new dat.GUI();
    gui.add(materialStandard, "metalness").min(0).max(1).step(0.0001);
    gui.add(materialStandard, "roughness").min(0).max(1).step(0.0001);
    gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);

    // Geometry
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      materialStandard
    );

    sphere.position.x = -1.5;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      materialStandard
    );
    plane.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
    );

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 16, 32),
      materialLamber
    );
    torus.position.x = 1.5;

    scene.add(sphere, plane, torus);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      // update Objects
      sphere.rotation.y = 0.1 * elapsedTime;
      plane.rotation.y = 0.1 * elapsedTime;
      torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      plane.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;

      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <h1>BuilderMaterial</h1>
      <div id="renderCanvas" ref={canvasRef} />
    </>
  );
};

export default BuilderMaterial;
