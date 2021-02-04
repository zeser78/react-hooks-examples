import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CubeReflectionMapping, CubeTexture, MeshBasicMaterial } from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import cubeTexture from "../assets/floor_diffuse.png";
import ringColor from "../assets/ring.jpg";

const Builder = () => {
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
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );

    renderCanvas.appendChild(renderer.domElement);
    // Texture
    const loadingManager = new THREE.LoadingManager(); // to manage textures

    loadingManager.onLoaded = () => console.log("onLoaded");

    const texture = new THREE.TextureLoader(loadingManager);
    const colorTexture = texture.load(cubeTexture);

    colorTexture.minFilter = THREE.NearestFilter;
    colorTexture.magFilter = THREE.NearestFilter;

    colorTexture.repeat.x = 2;
    colorTexture.repeat.y = 2;

    colorTexture.wrapS = THREE.MirroredRepeatWrapping;
    colorTexture.wrapT = THREE.MirroredRepeatWrapping;

    colorTexture.rotation = Math.PI / 4;
    colorTexture.center.x = 0.5;

    const ringTexture = texture.load(ringColor);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffacac,
      map: colorTexture,
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    console.log(cube.position.length());
    console.log(cube.position.distanceTo(new THREE.Vector3(0, 1, 2)));
    console.log(cube.position.distanceTo(camera.position));

    // Control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Axes Helper
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // Sphere
    const geometrySphere = new THREE.SphereGeometry(3, 16, 16);
    const materialSphere = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      // map: texture,
    });

    const sphere = new THREE.Mesh(geometrySphere, materialSphere);

    scene.add(sphere);
    //
    const cube2 = new THREE.BoxGeometry(5, 5, 5, 3, 4, 5);
    // const wireframe = new THREE.WireframeGeometry(sphere);
    const wireframeCube = new THREE.WireframeGeometry(cube2);

    // const line = new THREE.LineSegments(wireframe);
    // line.material.depthTest = false;
    // line.material.opacity = 0.25;
    // line.material.transparent = true;
    const line2 = new THREE.LineSegments(wireframeCube);
    line2.material.depthTest = false;
    line2.material.opacity = 0.25;
    line2.material.transparent = true;
    // scene.add( line );
    scene.add(line2);
    line2.rotation.x = Math.PI * 0.25;

    // camera.lookAt(line2.position)
    // Objects
    const group = new THREE.Group();
    scene.add(group);

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xff0000 })
    );

    group.add(cube3);
    const cube4 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x0000ff })
    );
    cube4.position.y = 2;

    group.add(cube4);
    // move the whole group
    group.rotateX(Math.PI / 2);
    //
    // Using Clock to do rotation
    const clock = new THREE.Clock();

    //DEBUG
    const gui = new dat.GUI();
    gui.add(group.position, "x").min(-3).max(3).step(0.01).name("group X");

    function animate() {
      requestAnimationFrame(animate);

      /// rotate using Time
      const elapsedTime = clock.getElapsedTime();
      // cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      //   group.rotation.x += 0.01;
      group.rotation.x = elapsedTime * Math.PI * 2;
      //   elapsedTime * Math.PI * 2 // one revolution per second
      cube.position.y = Math.sin(elapsedTime);
      // using cursor
      // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
      // damping, smooth control
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <h1>Builder</h1>
      <div id="renderCanvas" ref={canvasRef} />
    </>
  );
};

export default Builder;
