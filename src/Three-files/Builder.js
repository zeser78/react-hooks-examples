import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Builder = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Using Cursor
    const cursor = {
      x:0,
      y:0
    }
window.addEventListener("mousemove", (event) => {
cursor.x = event.clientX / window.innerWidth
cursor.y = event.clientY / window.innerHeight
})

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

    // cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffacac });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z= 5;
    console.log(cube.position.length());
    console.log(cube.position.distanceTo(new THREE.Vector3(0, 1, 2)));
    console.log(cube.position.distanceTo(camera.position));

    // Control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true

    // Axes Helper
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    //
    const geometry2 = new THREE.SphereGeometry(10, 10, 10);
    const cube2 = new THREE.BoxGeometry(5, 5, 5, 3, 4, 5);
    const wireframe = new THREE.WireframeGeometry(geometry2);
    const wireframeCube = new THREE.WireframeGeometry(cube2);

    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
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
      controls.update()
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
