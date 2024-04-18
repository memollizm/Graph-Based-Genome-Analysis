// Kütüphanelerin içeri aktarılması
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 3D sahnenin görsel çıktısının oluşturulması
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace; //Renk uzayı olarak sRGB kullandık
renderer.setSize(window.innerWidth, window.innerHeight); //Pencere ve renderer boyutunu ayarlar
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio); //Piksel oranı cihazın piksel oranına eşitlenir

// Gölgelerin etkinleştirilmesi ve tipinin belirlenmesi
renderer.shadowMap.enabled = true; //Gölgeye izin verip vermeme durumunun ayarlanması (true, false)
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Render elemanının HTML belgesine eklenmesi
document.body.appendChild(renderer.domElement);

// Sahne, kamera ve contorls'un oluşturulması
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(19, 10, 30); // Kameranın konumunu (x, y, z) olacak şekilde ayarlar

// Kamera kontrolü sağlar
const controls = new OrbitControls(camera, renderer.domElement); 
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 15, 0);
controls.update();

// Zemin oluşturma
const groundGeometry = new THREE.PlaneGeometry(15, 15, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshToonMaterial({
  color: 0xcd7f32, // Farklı bir renk
  side: THREE.DoubleSide // Zeminin her iki tarafını da göstermek için
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

// Sahne ışığını oluşturma
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Yön ışığı oluşturma
directionalLight.position.set(1, 50, 0); // Yön ışığının pozisyonu ayarlama
scene.add(directionalLight); // Sahneye yön ışığı ekleme

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambiyans ışık oluşturma
scene.add(ambientLight); // Sahneye ambiyans ışığı ekleme

// 3D Modelin yüklenmesi
const scale = 0.5;
const loader = new GLTFLoader().setPath('public/human/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 22, 0);
  mesh.scale.set(scale, scale, scale);
  scene.add(mesh);

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Sonsuz döngü içerisinde sahnenin sürekli olarak yenilenmesi
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();


