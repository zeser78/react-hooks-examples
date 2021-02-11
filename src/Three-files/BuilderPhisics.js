import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import CANNON from "cannon";
import cubeTexture from "../assets/floor_diffuse.png";
import ringColor from "../assets/ring.jpg";

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
    const gui = new dat.GUI();
    const debugObject = {};

    debugObject.createSphere = () => {
      createSphere(Math.random() * 0.5, { x: 0, y: 3, z: 0 });
    };
    gui.add(debugObject, "createSphere");
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

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //PHYSICS

    // World
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    world.allowSleep = true;
    // Material
    const concreteMaterial = new CANNON.Material("concrete");
    const plasticMaterial = new CANNON.Material("plastic");

    const concretePlasticContactMaterial = new CANNON.ContactMaterial(
      concreteMaterial,
      plasticMaterial,
      {
        friction: 0.1,
        restitution: 0.9,
      }
    );

    world.addContactMaterial(concretePlasticContactMaterial);
    // simple way is creating one defaultMaterial

    // Sphere
    const sphereShape = new CANNON.Sphere(0.5);
    const sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: sphereShape,
      material: plasticMaterial,
    });
    // apply force
    sphereBody.applyLocalForce(
      new CANNON.Vec3(150, 0, 0),
      new CANNON.Vec3(0, 0, 0)
    );
    world.addBody(sphereBody);

    // Floor
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body();
    floorBody.material = concreteMaterial;
    floorBody.mass = 0;
    floorBody.addShape(floorShape);
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );
    world.addBody(floorBody);

    // Utils - create sphere

    const objectToUpdate = [];

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMapTexture = cubeTextureLoader.load(ringColor);

    const createSphere = (radius, position) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 20, 20),
        new THREE.MeshStandardMaterial({
          metalness: 0.3,
          roughness: 0.4,
          envMap: environmentMapTexture,
        })
      );

      mesh.castShadow = true;
      mesh.position.copy(position);
      scene.add(mesh);
      // Cannon.js body
      const shape = new CANNON.Sphere(radius);
      const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: plasticMaterial,
      });
      body.position.copy(position);
      world.addBody(body);
      // Save in objects to update
      objectToUpdate.push({
        mesh: mesh,
        body: body,
      });
    };

    createSphere(0.5, { x: 1, y: 3, z: 0 });
    createSphere(0.5, { x: 0, y: 2, z: 0 });
    createSphere(0.5, { x: 0, y: 2, z: 1 });
    // Clock
    const clock = new THREE.Clock();
    let oldElapsedTime = 0;

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - oldElapsedTime;
      // update Objects
      //   sphere.rotation.y = 0.1 * elapsedTime;
      //   plane.rotation.y = 0.1 * elapsedTime;
      //   torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      box.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;
      onWindowResize();
      // Update physics world
      for (const object of objectToUpdate) {
        object.mesh.position.copy(object.body.position);
      }
      // applying force
      sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);
      world.step(1 / 60, deltaTime, 3);
      sphere.position.copy(sphereBody.position);
      //
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
