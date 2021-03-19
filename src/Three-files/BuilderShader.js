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
    camera.position.z = 1;
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

    //
    // Geometry
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

    const count = geometry.attributes.position.count;
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random();
    }

    // Texture
    const textureLoader = new THREE.TextureLoader();
    const flagTexture = textureLoader.load(ringColor);
    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      transparent: true,
      // wireframe: true,
      uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("orange") },
        uTexture: { value: flagTexture },
      },
    });
    // const material = new THREE.RawShaderMaterial({
    //   vertexShader: testVertexShader,
    //   fragmentShader: testFragmentShader,
    //   transparent: true,
    //   // wireframe: true,
    //   uniforms: {
    //     uFrequency: { value: new THREE.Vector2(10, 5) },
    //     uTime: { value: 0 },
    //     uColor: { value: new THREE.Color("orange") },
    //     uTexture: { value: flagTexture },
    //   },
    // });

    //DEBUG
    const gui = new dat.GUI();
    gui
      .add(material.uniforms.uFrequency.value, "x")
      .min(0)
      .max(20)
      .step(0.01)
      .name("frequency x");
    gui
      .add(material.uniforms.uFrequency.value, "y")
      .min(0)
      .max(20)
      .step(0.01)
      .name("frequency y");

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.y = 2 / 3;
    scene.add(mesh);
    // Using Clock to do rotation
    const clock = new THREE.Clock();

    // gui.add(group.position, "x").min(-3).max(3).step(0.01).name("group X");

    function animate() {
      requestAnimationFrame(animate);

      /// rotate using Time
      const elapsedTime = clock.getElapsedTime();

      // Update Material
      material.uniforms.uTime.value = elapsedTime;
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
