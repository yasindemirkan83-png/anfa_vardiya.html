const jsonDosya = "kayitlar.json";

// Kayıt ekleme
function kayitEkle() {
  const tarih = document.getElementById("tarihInput").value;
  const konu = document.getElementById("konuInput").value;
  const resimInput = document.getElementById("resimInput");

  if(!tarih || !konu) return alert("Tarih ve konu gerekli!");

  let resimler = [];
  for(let i=0; i<resimInput.files.length; i++){
    const file = resimInput.files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      resimler.push(e.target.result);
      if(resimler.length === resimInput.files.length){
        kayitlariKaydet(tarih, konu, resimler);
      }
    };
    reader.readAsDataURL(file);
  }

  if(resimInput.files.length === 0){
    kayitlariKaydet(tarih, konu, resimler);
  }
}

function kayitlariKaydet(tarih, konu, resimler){
  let kayitlar = JSON.parse(localStorage.getItem("kayitlar")||"[]");
  kayitlar.push({
    tarih,
    konu,
    resimler,
    timestamp: new Date().toLocaleString()
  });
  localStorage.setItem("kayitlar", JSON.stringify(kayitlar));
  alert("Kayıt başarıyla eklendi!");
  document.getElementById("kayitForm").reset();
}

// Kart oluşturma ve filtreleme
function filitrele(){
  const arama = document.getElementById("aramaInput").value.toLowerCase();
  const container = document.getElementById("kartContainer");
  container.innerHTML = "";
  let kayitlar = JSON.parse(localStorage.getItem("kayitlar")||"[]");

  if(arama){
    kayitlar = kayitlar.filter(k => 
      k.tarih.toLowerCase().includes(arama) || 
      k.konu.toLowerCase().includes(arama)
    );
  }

  kayitlar.forEach(k => {
    const kart = document.createElement("div");
    kart.className = "kart";

    if(k.resimler.length === 1){
      const img = document.createElement("img");
      img.src = k.resimler[0];
      kart.appendChild(img);
    } else if(k.resimler.length === 2){
      const img1 = document.createElement("img");
      img1.src = k.resimler[0];
      const img2 = document.createElement("img");
      img2.src = k.resimler[1];
      img1.style.display = img2.style.display = "inline-block";
      img1.style.width = img2.style.width = "245px";
      img1.style.marginRight = "10px";
      kart.appendChild(img1);
      kart.appendChild(img2);
    }

    const info = document.createElement("div");
    info.className = "kartInfo";
    info.innerHTML = `<p><strong>Tarih:</strong> ${k.tarih}</p>
                      <p><strong>Konu:</strong> ${k.konu}</p>`;
    kart.appendChild(info);

    container.appendChild(kart);
  });
}

// Ayarlar ekranı fonksiyonları
function sonGuncellemeGoster(){
  let kayitlar = JSON.parse(localStorage.getItem("kayitlar")||"[]");
  const son = kayitlar.length ? kayitlar[kayitlar.length-1].timestamp : "-";
  document.getElementById("sonGuncelleme").innerText = "Son güncelleme: " + son;
}

function disarAktar(){
  alert("JSON ve resimler klasörünü kopyalayarak PC'ye aktarabilirsiniz.");
}

function iceriAl(){
  alert("Telefon veya başka cihazdan JSON ve img/ klasörünü buraya kopyalayabilirsiniz.");
  sonGuncellemeGoster();
}