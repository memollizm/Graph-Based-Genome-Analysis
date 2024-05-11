const data = {
  "nodes": [
    {"id": 83, "name": "İşitme Kaybı", "explanation": "İşitme kaybı, işitme organının veya işitme sinirinin hasar görmesi sonucu ortaya çıkan bir durumdur. Genetik faktörler, yaşlanma, yüksek ses seviyelerine maruz kalma, enfeksiyonlar, travma ve bazı ilaçlar işitme kaybına neden olabilir."},
    {"id": 84, "name": "Glokom", "explanation": "Glokom, göz içindeki optik siniri etkileyen ve genellikle göz içi basıncının artmasıyla ilişkilendirilen bir grup göz hastalığıdır. Göz içi sıvısının dolaşımında bozukluklar veya drenaj problemleri glokoma neden olabilir ve tedavi edilmezse kalıcı görme kaybına yol açabilir."},
    {"id": 85, "name": "Aft", "explanation": "Aft, ağız içindeki yumuşak dokularda (yanaklar, dudaklar, dil, diş etleri) meydana gelen küçük, ağrılı yaralardır. Aftların nedeni tam olarak bilinmemekle birlikte, bağışıklık sistemi bozuklukları, stres, yaralanma, hormonal değişiklikler ve beslenme alışkanlıkları aft oluşumunu etkileyebilir."},
    {"id": 86, "name": "Migren", "explanation": "Migren, genetik faktörler, hormonal değişiklikler, stres ve çevresel faktörler gibi birçok nedene bağlı olabilir."},
    {"id": 87, "name": "Sinüzit", "explanation": "Sinüzit, sinüslerin iltihaplanması sonucu oluşabilir ve genellikle enfeksiyonlardan veya alerjilerden kaynaklanır."},
    {"id": 88, "name": "Beyin Tümörü", "explanation": "Beyin tümörleri, hücrelerin kontrolsüz büyümesi sonucu oluşan kitlelerdir ve çeşitli faktörlere bağlı olabilir"},
    {"id": 89, "name": "Tenis Dirseği", "explanation": "Tenis dirseği, kolun dış kısmında bulunan tendonların iltihaplanması sonucu oluşan bir durumdur. Bu genellikle tekrarlayan el ve bilek hareketleri nedeniyle ortaya çıkar."},
    {"id": 90, "name": "Karpal Tünel Sendromu", "explanation": "Karpal tünel sendromu, bilek bölgesindeki karpal tünelin sıkışması sonucu ortaya çıkan bir durumdur. Bu durum, el ve bilek bölgesinde ağrı, uyuşma, karıncalanma veya güçsüzlük hissi ile karakterizedir ve sıklıkla tekrarlayan el hareketleri veya bilek bölgesindeki tümörler nedeniyle oluşur."},
    {"id": 91, "name": "De Quervain Tendiniti", "explanation": "De Quervain tendiniti, el bileğinin tabanında yer alan tendonların iltihaplanması sonucu ortaya çıkan bir durumdur. Bu durum, baş parmak hareketleri sırasında ağrı, şişlik ve hassasiyet ile karakterizedir ve genellikle tekrarlayan baş parmak hareketleri, hamilelik veya romatoid artrit gibi durumlarla ilişkilendirilir."},
    {"id": 92, "name": "Bursit", "explanation": "Bursit, eklemi çevreleyen sıvı dolu keseciklerin (bursa) iltihaplanması sonucu oluşan bir durumdur. Eklem hareketlerinde sürtünmeyi azaltarak eklemi koruyan bu keseciklerin iltihaplanmasıyla ağrı, şişlik ve hareket kısıtlılığı ortaya çıkabilir. Bursit genellikle tekrarlayan travma, aşırı kullanım veya enfeksiyonlar sonucu gelişebilir."},
    {"id": 93, "name": "Koroner Arter Hastalığı", "explanation": "Koroner arter hastalığı, kalp kasına kan taşıyan koroner arterlerin daralması veya tıkanması sonucu oluşan bir durumdur. Bu durum, kalp krizi veya anjina gibi ciddi kalp problemlerine yol açabilir."},
    {"id": 94, "name": "KOAH Hastalığı", "explanation": "KOAH (Kronik Obstrüktif Akciğer Hastalığı), akciğerlerde hava yollarının kronik olarak daralması ve iltihaplanması sonucu oluşan bir durumdur. Bu durum, nefes alma güçlüğü, öksürük ve balgam üretimi gibi semptomlarla karakterizedir ve sigara içme gibi risk faktörleri ile ilişkilidir."},
    {"id": 95, "name": "Hepatit Hastalığı", "explanation": "Hepatit, karaciğerin iltihaplanması sonucu ortaya çıkan bir durumdur. Hepatit A, B, C, D ve E gibi farklı virüslerin neden olduğu viral hepatitler, alkol kullanımı veya bazı ilaçların neden olduğu toksik hepatitler gibi çeşitli tipleri vardır."},
    {"id": 96, "name": "Helicobacter Pylori Hastalığı", "explanation": "Helicobacter pylori, mide ve onikiparmak bağırsağı mukozasında enfeksiyona neden olan bir bakteridir. Helicobacter pylori enfeksiyonu, mide ülseri, gastrit ve mide kanseri gibi sindirim sistemi hastalıklarına yol açabilir."},
    {"id": 97, "name": "Kolon ve Rektum Polipleri", "explanation": "Kolon ve rektum polipleri, kalın bağırsakta (kolon) veya rektumda oluşan küçük tümörlerdir. Polipler genellikle kanser öncüsü değildir, ancak bazı polipler zamanla kansere dönüşebilir."},
    {"id": 98, "name": "Frengi", "explanation": "Frengi, Treponema pallidum adlı bakterinin neden olduğu cinsel yolla bulaşan bir enfeksiyon hastalığıdır. Frengi, cilt lezyonları, ülserler, lenf düğümlerinde şişlikler ve sistemik belirtiler gibi çeşitli semptomlarla karakterizedir."},
    {"id": 99, "name": "Periferik Arter Hastalığı", "explanation": "Periferik arter hastalığı, vücudun dışındaki (periferik) arterlerdeki daralma veya tıkanma sonucu oluşan bir durumdur. Bu durum, bacaklarda ağrı, uyuşma, yürüme güçlüğü veya kangren gibi semptomlarla karakterizedir."},
    {"id": 100, "name": "Kireçlenme (Osteoartrit) Hastalığı", "explanation": "Kireçlenme, eklemlerdeki kıkırdak dokusunun zamanla aşınması ve yıpranması sonucu ortaya çıkan bir durumdur. Bu durum, dizlerde ağrı, şişlik ve hareket kısıtlılığına neden olabilir."},
    {"id": 101, "name": "Medikal Kollateral Ligament Yaralanmaları", "explanation": "Medikal kollateral ligament (MCL) yaralanmaları, dizin iç kısmındaki ligamentin yaralanması sonucu oluşan bir durumdur. Bu yaralanmalar genellikle dizin içe doğru bükülmesi veya dışa doğru zorlanması sonucu meydana gelir ve dizde ağrı, şişlik ve stabilite kaybına neden olabilir."},
    {"id": 102, "name": "Topuk Dikeni Hastalığı", "explanation": "Topuk dikeni, topuk kemiğinin altında, tabanı destekleyen lifli bir bağın kopmasına neden olan bir durumdur. Bu durum, topuk altında keskin ve şiddetli ağrı ile karakterizedir, özellikle ilk adımda veya uzun süre ayakta kaldıktan sonra artabilir."}
  ],
  "links": [
    {"source": 86, "target": 88, "type": "causes"},
    {"source": 88, "target": 84, "type": "causes"},
    {"source": 84, "target": 87, "type": "causes"},
    {"source": 84, "target": 83, "type": "causes"},
    {"source": 87, "target": 85, "type": "causes"},

    {"source": 85, "target": 92, "type": "causes"},
    {"source": 92, "target": 89, "type": "causes"},
    {"source": 89, "target": 90, "type": "causes"},
    {"source": 90, "target": 91, "type": "causes"},

    {"source": 92, "target": 93, "type": "causes"},
    {"source": 93, "target": 94, "type": "causes"},
    {"source": 94, "target": 95, "type": "causes"},
    {"source": 95, "target": 96, "type": "causes"},
    {"source": 96, "target": 97, "type": "causes"},
    {"source": 97, "target": 98, "type": "causes"},
    {"source": 98, "target": 99, "type": "causes"},
    {"source": 99, "target": 100, "type": "causes"},
    {"source": 100, "target": 101, "type": "causes"},
    {"source": 101, "target": 102, "type": "causes"}
  ]
};

// Verileri d3.js ile görselleştirme
const width = 928;
const height = 680;

// Renk ölçeği belirleme
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Linkleri ve düğümleri kopyalayarak kuvvet simülasyonu oluşturma
const links = data.links.map(d => ({...d}));
const nodes = data.nodes.map(d => ({...d}));

// Birkaç kuvvet içeren bir simülasyon oluşturma
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY());

// SVG düğümünü döndüren fonksiyonu tanımlama
function drawGraph() {
  // SVG konteyneri oluşturma
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Her bir link için bir çizgi ve her bir düğüm için bir daire ekleme
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", 5)
      .attr("fill", d => color(d.group));

  node.append("title")
      .text(d => d.id);

  // Sürükleme davranışı ekleme
  node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  // Her simülasyon tick'i sırasında linklerin ve düğümlerin pozisyon özelliklerini ayarlama
  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  // SVG düğümünü döndürme
  return svg.node();
}

// Sürükleme başladığında simülasyonu tekrar başlatma ve konumu sabitleme
function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

// Sürüklerken konumu güncelleme
function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

// Sürükleme bittiğinde hedef alfa değerini geri yükleme ve konumu sabitlenme
function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

// Bu hücre yeniden çalıştırıldığında önceki simülasyonu durdurma
simulation.stop();

// Grafik çizme fonksiyonunu çağırma
drawGraph();
