import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  //console.log(event.clientX, event.clientY);
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);

const positionAttribute = geometry.getAttribute("position");

const colors = [];
const color = new THREE.Color();

for (let i = 0; i < positionAttribute.count; i++) {
  color.set(Math.random() * 0xffffff);

  // define the same color for each vertex of a triangle

  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
}

const material = new THREE.MeshBasicMaterial({ vertexColors: true });

//define attribute
geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Handle resize
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Double click to full screen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  const canvas = document.querySelector("canvas");

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitFullscreenElement();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitscreenElement) {
      document.webkitExitscreenElement();
    }
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Controls
const controls = new OrbitControls(
  camera,
  document.querySelector("canvas.webgl")
);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Animations

const clock = new THREE.Clock();
//Adding gsap.to() to create a tween.
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2, y: 2 });
//Creating the same ever spinning cube using gsap
//gsap.to(mesh.rotation, {
//duration: 10,
//x: Math.cos(clock.getElapsedTime()),
//y: Math.cos(clock.getElapsedTime()),
//});

const tick = () => {
  //To view the backside of the cube
  // camera.position.x = Math.sin(cursor.x * 10) * 3;
  // camera.position.z = Math.cos(cursor.x * 10) * 3;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  //Update controls
  controls.update();

  //Render
  renderer.render(scene, camera);

  //Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
