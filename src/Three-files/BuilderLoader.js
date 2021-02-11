import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CubeReflectionMapping, CubeTexture, MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import cubeTexture from "../assets/floor_diffuse.png";
import ringColor from "../assets/ring.jpg";
import ringModel from "./sample-3-3.glb";

const BuilderLoader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Using Cursor
    const cursor = {
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / window.innerWidth;
      cursor.y = event.clientY / window.innerHeight;
    });

    //
    const renderCanvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderCanvas.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Models
    const gltfLoader = new GLTFLoader();

    const material = new THREE.MeshStandardMaterial({
      color: "#ffc900",
      metalness: 0.5,
      roughness: 0.5,
    });
    const diamond = new THREE.MeshStandardMaterial({
      color: "pink",
      metalness: 0.5,
      roughness: 0.5,
      opacity: 0.8,
    });

    gltfLoader.load(ringModel, (gltf) => {
      console.log(gltf.scene.traverse);
      let models = gltf.parser.json.meshes;
      let Model = gltf.scene;
      Model.traverse((child, i) => {
        console.log("child", child);
        if (child.isMesh) {
          if (child.name.includes("stone")) {
            child.material = diamond;
          } else {
            child.material = material;
          }
          child.material.side = THREE.DoubleSide;
        }
      });
      scene.add(Model);

      for (let model of models) {
        console.log(model.primitives[0].material);
        model.primitives[0].material = material;
      }
      //   gltf.scene.children[0].scale.set(50, 50, 50);
      //   scene.add(gltf.scene);
      for (const child of gltf.scene.children) {
        child.scale.set(100, 100, 100);
        console.log(child.material);
        scene.add(child);
      }
    });

    //Geometry
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#444444",
        metalness: 0,
        roughness: 0.5,
      })
    );

    floor.rotation.x = -Math.PI * 0.25;

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshStandardMaterial({
        color: "#44c444",
        metalness: 0,
        roughness: 0.5,
      })
    );

    // sphere.position.x = -1.5;

    scene.add(floor);

    // Using Clock to do rotation
    const clock = new THREE.Clock();

    //DEBUG
    const gui = new dat.GUI();
    // gui.add(group.position, "x").min(-3).max(3).step(0.01).name("group X");
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
      requestAnimationFrame(animate);

      /// rotate using Time
      const elapsedTime = clock.getElapsedTime();
      // cube.rotation.x += 0.01;
      onWindowResize();
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <h1>BuilderLoader</h1>
      <div id="renderCanvas" ref={canvasRef} />
    </>
  );
};

export default BuilderLoader;
