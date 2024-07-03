// Kütüphanelerin içeri aktarılması
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// 3D sahnenin görsel çıktısının oluşturulması
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace; //Renk uzayı olarak sRGB kullandık
renderer.setSize(window.innerWidth, window.innerHeight); //Pencere ve renderer boyutunu ayarlar
renderer.setClearColor(0x808080);
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
controls.autoRotate = false; //Sürekli dönmesi için [true] yapılmalı
controls.target = new THREE.Vector3(0, 15, 0);
controls.update();

// Panorama fotoğrafın yolu
const panoramaTexture = new THREE.TextureLoader().load('images/3dDna.jpg');

// Panorama fotoğrafı düzlem olarak kullanarak 360 derecelik bir ortam oluşturma
const panoramaGeometry = new THREE.SphereGeometry(500, 60, 40);
panoramaGeometry.scale(-1, 1, 1); // Geometriyi ters çevirme (inside-out rendering için)
const panoramaMaterial = new THREE.MeshBasicMaterial({ map: panoramaTexture });
const panoramaMesh = new THREE.Mesh(panoramaGeometry, panoramaMaterial);
scene.add(panoramaMesh);

// Zemin oluşturma
const groundGeometry = new THREE.PlaneGeometry(15, 15, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshBasicMaterial({
  color: 0xAFEEEE, // Farklı bir renk
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

// Liste verileri
const bodyParts = {
  'Kafa': ['Ense', 'Burun', 'Kafatası', 'Kulak', 'Göz', 'Ağız'],
  'Kol-Bilek-Parmak': ['Kol', 'Bilek', 'Parmak'],
  'Vücut': ['Kalp', 'Akciğer', 'Karaciğer', 'Mide', 'Bağırsak', 'Üreme Organı', 'Bacak', 'Diz', 'Ön Ayak', 'Ayak']
};

// Menü butonu ve içeriği
const menuButton = document.getElementById('menu-button');
const menuContent = document.getElementById('menu-content');
const infoBox = document.getElementById('info-box');
const infoText = document.getElementById('info-text');

// Menü içeriğini oluştur
for (const category in bodyParts) {
  const categoryButton = document.createElement('button');
  categoryButton.textContent = category;
  categoryButton.classList.add('category-button');
  menuContent.appendChild(categoryButton);

  const sublist = document.createElement('div');
  sublist.classList.add('sublist');

  bodyParts[category].forEach(part => {
      const partButton = document.createElement('button');
      partButton.textContent = part;
      partButton.classList.add('part-button');
      partButton.style.display = 'none'; // İlk başta gizli olarak ayarla
      sublist.appendChild(partButton);

      // Part butonuna tıklandığında
      partButton.addEventListener('click', () => {
        const selectedPart = partButton.textContent;
        infoText.textContent = `Seçilen parça: ${selectedPart}`;
        infoBox.style.right = '10px'; // Kayan kutuyu ekrana getir
      });
  });

  // Kategori butonuna tıklandığında alt menüyü göster
  categoryButton.addEventListener('click', () => {
    // Tüm alt menüleri gizle
    const allSublists = document.querySelectorAll('.sublist');
    allSublists.forEach(sublist => {
      sublist.style.display = 'none';
    });
    // Seçilen kategori altındaki alt menüyü göster
    sublist.style.display = 'block';
  });

  menuContent.appendChild(sublist);
}

// Menü butonuna tıklandığında menü içeriğini göster/gizle
menuButton.addEventListener('click', () => {
  menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
});

// Dışarı tıklama ile menüyü gizle
document.addEventListener('click', (event) => {
  if (!event.target.closest('#side-menu')) {
      menuContent.style.display = 'none';
  }
});

// Sonsuz döngü içerisinde sahnenin sürekli olarak yenilenmesi
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();