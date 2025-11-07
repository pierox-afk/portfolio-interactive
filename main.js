const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer;

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
    alpha: true, // allow transparent background so page background shows through
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // make renderer transparent so CSS background is visible
  renderer.setClearColor(0x000000, 0); // Fondo transparente
}
camera.position.set(0, 0, 10); // Posición de cámara simple
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

let ashParticles;
function createAshParticles() {
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const geometry = new THREE.BufferGeometry();

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 100; // x
    positions[i3 + 1] = Math.random() * 50; // y
    positions[i3 + 2] = (Math.random() - 0.5) * 100; // z
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.15,
    transparent: true,
    opacity: 0.7,
  });

  ashParticles = new THREE.Points(geometry, material);
  scene.add(ashParticles);
}

function init() {
  createAshParticles();
  animate();
}
function animate() {
  requestAnimationFrame(animate);

  // Animar partículas de ceniza
  if (ashParticles) {
    const positions = ashParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.02; // Caída lenta
      if (positions[i + 1] < -10) {
        positions[i + 1] = 50; // Reiniciar arriba
      }
    }
    ashParticles.geometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setupRenderer();
init();
