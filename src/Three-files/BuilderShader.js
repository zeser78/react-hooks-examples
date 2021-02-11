import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CubeReflectionMapping, CubeTexture, MeshBasicMaterial } from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import cubeTexture from "../assets/floor_diffuse.png";
import ringColor from "../assets/ring.jpg";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";

const BuilderShader = () => {
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

    // Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );

    renderCanvas.appendChild(renderer.domElement);
    // Texture

    // Control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Axes Helper
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // Sphere
    const geometrySphere = new THREE.SphereGeometry(1, 16, 16);
    const materialSphere = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      // map: texture,
    });

    const sphere = new THREE.Mesh(geometrySphere, materialSphere);

    scene.add(sphere);
    //

    // const wireframe = new THREE.WireframeGeometry(sphere);

    //Material
    console.log(testVertexShader);
    const material = new THREE.RawShaderMaterial({
      vertextShader: `

`,
      fragmentShader: `

  `,
    });

    //
    const planeGeometry = new THREE.PlaneGeometry(3, 3);

    const plane = new THREE.Mesh(planeGeometry, material);
    scene.add(plane);
    // Using Clock to do rotation
    const clock = new THREE.Clock();

    //DEBUG
    const gui = new dat.GUI();
    // gui.add(group.position, "x").min(-3).max(3).step(0.01).name("group X");

    function animate() {
      requestAnimationFrame(animate);

      /// rotate using Time
      const elapsedTime = clock.getElapsedTime();
      // cube.rotation.x += 0.01;

      // damping, smooth control
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <h1>Builder Shader</h1>
      <div id="renderCanvas" ref={canvasRef} />
    </>
  );
};

export default BuilderShader;
