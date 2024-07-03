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
controls.autoRotate = true; //Sürekli dönmesi için [true] yapılmalı
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

// Liste verileri ve metin içerikleri
const bodyParts = {
  'Kafa': {
    subparts: ['Ense', 'Burun', 'Kafatası', 'Kulak', 'Göz', 'Ağız'],
    content: 'Kafa bölgesi'
  },
  'Kol-Bilek-Parmak': {
    subparts: ['Kol', 'Omuz', 'Bilek', 'Parmak'],
    content: 'Kol-Bilek-Omuz-Parmak bölgesi'
  },
  'Vücut': {
    subparts: ['Kalp', 'Akciğer', 'Karaciğer', 'Mide', 'Bağırsak', 'Üreme Organı', 'Bacak', 'Diz', 'Ön Ayak', 'Ayak'],
    content: 'Vücut bölgesi'
  }
};

const partDescriptions = {
  'Ense': 'Migren, genetik faktörler, hormonal değişiklikler, stres ve çevresel faktörler gibi birçok nedene bağlı olabilir.',
  'Burun': 'Sinüzit, sinüslerin iltihaplanması sonucu oluşabilir ve genellikle enfeksiyonlardan veya alerjilerden kaynaklanır.',
  'Kafatası': 'Beyin tümörleri, hücrelerin kontrolsüz büyümesi sonucu oluşan kitlelerdir ve çeşitli faktörlere bağlı olabilir.',
  'Kulak': 'İşitme kaybı, işitme organının veya işitme sinirinin hasar görmesi sonucu ortaya çıkan bir durumdur. Genetik faktörler, yaşlanma, yüksek ses seviyelerine maruz kalma, enfeksiyonlar, travma ve bazı ilaçlar işitme kaybına neden olabilir',
  'Göz': 'Glokom, göz içindeki optik siniri etkileyen ve genellikle göz içi basıncının artmasıyla ilişkilendirilen bir grup göz hastalığıdır. Göz içi sıvısının dolaşımında bozukluklar veya drenaj problemleri glokoma neden olabilir ve tedavi edilmezse kalıcı görme kaybına yol açabilir.',
  'Ağız': 'Aft, ağız içindeki yumuşak dokularda (yanaklar, dudaklar, dil, diş etleri) meydana gelen küçük, ağrılı yaralardır. Aftların nedeni tam olarak bilinmemekle birlikte, bağışıklık sistemi bozuklukları, stres, yaralanma, hormonal değişiklikler ve beslenme alışkanlıkları aft oluşumunu etkileyebilir.',
  'Kol': 'Tenis dirseği, kolun dış kısmında bulunan tendonların iltihaplanması sonucu oluşan bir durumdur. Bu genellikle tekrarlayan el ve bilek hareketleri nedeniyle ortaya çıkar.',
  'Omuz': 'Bursit, eklemi çevreleyen sıvı dolu keseciklerin (bursa) iltihaplanması sonucu oluşan bir durumdur. Eklem hareketlerinde sürtünmeyi azaltarak eklemi koruyan bu keseciklerin iltihaplanmasıyla ağrı, şişlik ve hareket kısıtlılığı ortaya çıkabilir. Bursit genellikle tekrarlayan travma, aşırı kullanım veya enfeksiyonlar sonucu gelişebilir.',
  'Bilek': 'Karpal tünel sendromu, bilek bölgesindeki karpal tünelin sıkışması sonucu ortaya çıkan bir durumdur. Bu durum, el ve bilek bölgesinde ağrı, uyuşma, karıncalanma veya güçsüzlük hissi ile karakterizedir ve sıklıkla tekrarlayan el hareketleri veya bilek bölgesindeki tümörler nedeniyle oluşur.',
  'Parmak': 'De Quervain tendiniti, el bileğinin tabanında yer alan tendonların iltihaplanması sonucu ortaya çıkan bir durumdur. Bu durum, baş parmak hareketleri sırasında ağrı, şişlik ve hassasiyet ile karakterizedir ve genellikle tekrarlayan baş parmak hareketleri, hamilelik veya romatoid artrit gibi durumlarla ilişkilendirilir.',
  'Kalp': 'Koroner arter hastalığı, kalp kasına kan taşıyan koroner arterlerin daralması veya tıkanması sonucu oluşan bir durumdur. Bu durum, kalp krizi veya anjina gibi ciddi kalp problemlerine yol açabilir.',
  'Akciğer': 'KOAH (Kronik Obstrüktif Akciğer Hastalığı), akciğerlerde hava yollarının kronik olarak daralması ve iltihaplanması sonucu oluşan bir durumdur. Bu durum, nefes alma güçlüğü, öksürük ve balgam üretimi gibi semptomlarla karakterizedir ve sigara içme gibi risk faktörleri ile ilişkilidir.',
  'Karaciğer': 'Hepatit, karaciğerin iltihaplanması sonucu ortaya çıkan bir durumdur. Hepatit A, B, C, D ve E gibi farklı virüslerin neden olduğu viral hepatitler, alkol kullanımı veya bazı ilaçların neden olduğu toksik hepatitler gibi çeşitli tipleri vardır.',
  'Mide': 'Helicobacter pylori, mide ve onikiparmak bağırsağı mukozasında enfeksiyona neden olan bir bakteridir. Helicobacter pylori enfeksiyonu, mide ülseri, gastrit ve mide kanseri gibi sindirim sistemi hastalıklarına yol açabilir.',
  'Bağırsak': 'Kolon ve rektum polipleri, kalın bağırsakta (kolon) veya rektumda oluşan küçük tümörlerdir. Polipler genellikle kanser öncüsü değildir, ancak bazı polipler zamanla kansere dönüşebilir.',
  'Üreme Organı': 'Frengi, Treponema pallidum adlı bakterinin neden olduğu cinsel yolla bulaşan bir enfeksiyon hastalığıdır. Frengi, cilt lezyonları, ülserler, lenf düğümlerinde şişlikler ve sistemik belirtiler gibi çeşitli semptomlarla karakterizedir.',
  'Bacak': 'Periferik arter hastalığı, vücudun dışındaki (periferik) arterlerdeki daralma veya tıkanma sonucu oluşan bir durumdur. Bu durum, bacaklarda ağrı, uyuşma, yürüme güçlüğü veya kangren gibi semptomlarla karakterizedir.',
  'Diz': 'Kireçlenme, eklemlerdeki kıkırdak dokusunun zamanla aşınması ve yıpranması sonucu ortaya çıkan bir durumdur. Bu durum, dizlerde ağrı, şişlik ve hareket kısıtlılığına neden olabilir.',
  'Ön Ayak': 'Medikal kollateral ligament (MCL) yaralanmaları, dizin iç kısmındaki ligamentin yaralanması sonucu oluşan bir durumdur. Bu yaralanmalar genellikle dizin içe doğru bükülmesi veya dışa doğru zorlanması sonucu meydana gelir ve dizde ağrı, şişlik ve stabilite kaybına neden olabilir.',
  'Ayak': 'Topuk dikeni, topuk kemiğinin altında, tabanı destekleyen lifli bir bağın kopmasına neden olan bir durumdur. Bu durum, topuk altında keskin ve şiddetli ağrı ile karakterizedir, özellikle ilk adımda veya uzun süre ayakta kaldıktan sonra artabilir.'
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
  sublist.style.display = 'none'; // İlk başta gizli olarak ayarla

  bodyParts[category].subparts.forEach(part => {
      const partButton = document.createElement('button');
      partButton.textContent = part;
      partButton.classList.add('part-button');
      partButton.addEventListener('click', () => {
        const selectedPart = partButton.textContent;
        infoText.textContent = partDescriptions[selectedPart];
        infoBox.style.right = '10px'; // Kayan kutuyu ekrana getir
      });
      sublist.appendChild(partButton);
  });

  // Kategori butonuna tıklandığında alt menüyü göster/gizle
  categoryButton.addEventListener('click', () => {
    // Tüm alt menüleri gizle
    const allSublists = document.querySelectorAll('.sublist');
    allSublists.forEach(sublist => {
      sublist.style.display = 'none';
    });
    // Seçilen kategori altındaki alt menüyü göster
    sublist.style.display = 'block';
    infoText.textContent = bodyParts[category].content;
    infoBox.style.right = '10px'; // Kayan kutuyu ekrana getir
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