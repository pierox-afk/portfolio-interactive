const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager();
const loadingBar = document.getElementById("loading-bar");

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progress = (itemsLoaded / itemsTotal) * 100;
  if (loadingBar) {
    loadingBar.style.width = progress + "%";
  }
};

loadingManager.onLoad = function () {
  window.dispatchEvent(new CustomEvent("allAssetsLoaded"));
};
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(0x000000, 0);
camera.position.set(0, 5, 25);
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(15, 20, 10);
scene.add(directionalLight);
const textureLoader = new THREE.TextureLoader(loadingManager);
function loadPixelatedTexture(path) {
  const texture = textureLoader.load(path);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}
const textures = {
  grassTop: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/grass_block_top.png"
  ),
  grassSide: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/grass_block_side.png"
  ),
  dirt: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/dirt.png"
  ),
  stone: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/stone_inf.png"
  ),
  diamond: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/diamond_block.png"
  ),
  oakPlanks: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/oak_planks.png"
  ),
  diamondOre: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/diamond_ore.png"
  ),
  glowstone: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/glowstone.png"
  ),
  netherBricks: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/nether_bricks.png"
  ),
  netherrack: loadPixelatedTexture(
    "assets/textures/assets/minecraft/textures/block/netherrack.png"
  ),
};
const BLOCK_SIZE = 5;

const boxGeometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

const grassMaterials = [
  new THREE.MeshLambertMaterial({ map: textures.grassSide }),
  new THREE.MeshLambertMaterial({ map: textures.grassSide }),
  new THREE.MeshLambertMaterial({ map: textures.grassTop }),
  new THREE.MeshLambertMaterial({ map: textures.dirt }),
  new THREE.MeshLambertMaterial({ map: textures.grassSide }),
  new THREE.MeshLambertMaterial({ map: textures.grassSide }),
];

const netherrackMaterial = new THREE.MeshLambertMaterial({
  map: textures.netherrack,
});
const groundGeometries = [];
for (let i = -5; i < 6; i++) {
  for (let j = -5; j < 6; j++) {
    const newBox = boxGeometry.clone();
    newBox.translate(i * BLOCK_SIZE, -BLOCK_SIZE, j * BLOCK_SIZE);
    groundGeometries.push(newBox);
  }
}
const mergedGroundGeometry = THREE.BufferGeometryUtils.mergeGeometries(
  groundGeometries,
  true
);
const groundMesh = new THREE.Mesh(mergedGroundGeometry, netherrackMaterial);
scene.add(groundMesh);

const interactiveBlocks = [];
function createCube(x, y, z, material) {
  const cube = new THREE.Mesh(boxGeometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
  return cube;
}

let ashParticles;
function createAshParticles() {
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const geometry = new THREE.BufferGeometry();

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 100;
    positions[i3 + 1] = Math.random() * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 100;
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

let aboutMeBlock, projectBlock, chestBlock, oreBlock;

async function init() {
  const response = await fetch("data.json");
  const data = await response.json();

  aboutMeBlock = createCube(
    -10,
    BLOCK_SIZE / 2,
    0,
    new THREE.MeshLambertMaterial({ map: textures.netherBricks })
  );
  aboutMeBlock.userData = data.interactiveBlocks.aboutMe;
  interactiveBlocks.push(aboutMeBlock);

  projectBlock = createCube(
    0,
    BLOCK_SIZE / 2,
    -15,
    new THREE.MeshLambertMaterial({
      map: textures.glowstone,
      emissive: 0xffffaa,
      emissiveMap: textures.glowstone,
      emissiveIntensity: 1,
    })
  );
  projectBlock.userData = data.interactiveBlocks.project;
  interactiveBlocks.push(projectBlock);

  const glowstoneLight = new THREE.PointLight(0xffd878, 1.5, 25);
  projectBlock.add(glowstoneLight);

  chestBlock = createCube(
    12,
    BLOCK_SIZE / 2,
    6,
    new THREE.MeshLambertMaterial({ map: textures.oakPlanks })
  );
  chestBlock.userData = data.interactiveBlocks.chest;
  interactiveBlocks.push(chestBlock);

  oreBlock = createCube(
    -6,
    BLOCK_SIZE / 2,
    -18,
    new THREE.MeshLambertMaterial({ map: textures.diamondOre })
  );
  oreBlock.userData = data.interactiveBlocks.ore;
  interactiveBlocks.push(oreBlock);

  createAshParticles();

  animate();
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  const projectDetailModal = document.getElementById("project-detail-modal");
  const chestModal = document.getElementById("chest-modal");
  if (
    (projectDetailModal && !projectDetailModal.classList.contains("hidden")) ||
    (chestModal && !chestModal.classList.contains("hidden"))
  )
    return;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveBlocks);
  if (intersects.length > 0) {
    const obj = intersects[0].object;
    const data = obj.userData || {};
    if (data.type === "chest") {
      obj.rotation.y += 0.8;
      return;
    }
  }
}

function openOre(data, obj) {
  if (obj) {
    try {
      scene.remove(obj);
    } catch (e) {}
    const idx = interactiveBlocks.indexOf(obj);
    if (idx >= 0) interactiveBlocks.splice(idx, 1);
  }
  const modal = document.getElementById("project-detail-modal");
  document.getElementById("modal-title").innerText = data.title || "Ore";
  let desc = data.description || "";
  if (data.reward) {
    desc += "\n\nReward: " + (data.reward.name || "Unknown");
  }
  document.getElementById("modal-description").innerText = desc;
  const a = document.getElementById("modal-link");
  a.href = data.link || "#";
  if (data.link && data.link !== "#") a.style.display = "inline-block";
  else a.style.display = "none";
  modal.classList.remove("hidden");
}

window.addEventListener("click", onMouseClick);

const keysPressed = {};
document.addEventListener("keydown", (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});
function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.001;
  aboutMeBlock.rotation.y = time * 0.2;
  projectBlock.rotation.y = time * 0.2;
  projectBlock.position.y = BLOCK_SIZE / 2 + Math.sin(time * 1.5) * 0.5;
  if (ashParticles) {
    const positions = ashParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.02;
      if (positions[i + 1] < -10) {
        positions[i + 1] = 50;
      }
    }
    ashParticles.geometry.attributes.position.needsUpdate = true;
  }

  updateWorldLabels();
  renderer.render(scene, camera);
}
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
init();

function updateWorldLabels() {
  const labelChest = document.getElementById("label-chest");
  const labelOre = document.getElementById("label-ore");
  if (!labelChest || !labelOre) return;

  const vec = new THREE.Vector3();
  const proj = (worldPos, el) => {
    vec.copy(worldPos);
    vec.project(camera);
    const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vec.y * 0.5 + 0.5) * window.innerHeight;
    if (vec.z > 1 || vec.z < -1) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
      el.style.left = x + "px";
      el.style.top = y + "px";
    }
  };
  try {
    proj(
      chestBlock.position
        .clone()
        .add(new THREE.Vector3(0, BLOCK_SIZE / 1.5, 0)),
      labelChest
    );
    proj(
      oreBlock.position.clone().add(new THREE.Vector3(0, BLOCK_SIZE / 1.5, 0)),
      labelOre
    );
  } catch (e) {}
}
