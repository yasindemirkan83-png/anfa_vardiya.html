// app.js

document.addEventListener('DOMContentLoaded', () => { // Elementler const acilisEkran = document.getElementById('acilis-ekran'); const anaMenu = document.getElementById('ana-menu'); const kayitEkle = document.getElementById('kayit-ekle'); const ayarlar = document.getElementById('ayarlar'); const kayitListesi = document.getElementById('kayit-listesi');

const menuKayit = document.getElementById('menu-kayit'); const menuAyarlar = document.getElementById('menu-ayarlar');

const resim1Input = document.getElementById('resim1'); const resim2Input = document.getElementById('resim2'); const tarihInput = document.getElementById('tarih'); const aciklamaInput = document.getElementById('aciklama'); const kaydetBtn = document.getElementById('kaydet');

const sonGuncellemeSpan = document.getElementById('son-guncelleme'); const disarayaAktarBtn = document.getElementById('disaraya-aktar');

let kayitlar = JSON.parse(localStorage.getItem('kayitlar')) || [];

// Açılış videosu sonrası göster setTimeout(() => { acilisEkran.classList.add('hidden'); anaMenu.style.display = 'flex'; kayitListele(); }, 3000); // 3 saniye video örnek

// Menü butonları menuKayit.addEventListener('click', () => { kayitEkle.classList.remove('hidden'); ayarlar.classList.add('hidden'); });

menuAyarlar.addEventListener('click', () => { kayitEkle.classList.add('hidden'); ayarlar.classList.remove('hidden'); sonGuncellemeSpan.textContent = localStorage.getItem('sonGuncelleme') || 'Hiç güncelleme yok'; });

// Kayıt kaydet kaydetBtn.addEventListener('click', () => { const tarih = tarihInput.value || new Date().toISOString().split('T')[0]; const aciklama = aciklamaInput.value;

const resimler = [];
if(resim1Input.files[0]) resimler.push(URL.createObjectURL(resim1Input.files[0]));
if(resim2Input.files[0]) resimler.push(URL.createObjectURL(resim2Input.files[0]));

const yeniKayit = { tarih, aciklama, resimler };
kayitlar.push(yeniKayit);

localStorage.setItem('kayitlar', JSON.stringify(kayitlar));
localStorage.setItem('sonGuncelleme', new Date().toLocaleString());

tarihInput.value = '';
aciklamaInput.value = '';
resim1Input.value = '';
resim2Input.value = '';

kayitListele();
kayitEkle.classList.add('hidden');

});

// Kayıtları listele function kayitListele(){ kayitListesi.innerHTML = ''; kayitlar.forEach((kayit, index) => { const kart = document.createElement('div'); kart.className = 'kayit-kart';

kayit.resimler.forEach(resimSrc => {
    const img = document.createElement('img');
    img.src = resimSrc;
    kart.appendChild(img);
  });

  const info = document.createElement('div');
  info.className = 'kayit-bilgi';
  info.innerHTML = `<span>Tarih: ${kayit.tarih}</span><span>Açıklama: ${kayit.aciklama}</span>`;
  kart.appendChild(info);

  // Silme butonu
  const silBtn = document.createElement('button');
  silBtn.textContent = 'Sil';
  silBtn.addEventListener('click', () => {
    kayitlar.splice(index,1);
    localStorage.setItem('kayitlar', JSON.stringify(kayitlar));
    kayitListele();
  });
  kart.appendChild(silBtn);

  kayitListesi.appendChild(kart);
});

}

// Dışa aktar (zip mantığı örnek) disarayaAktarBtn.addEventListener('click', () => { alert('Dışa aktar butonu çalıştı, buraya zip oluşturma mantığını ekleyebilirsin.'); });

});
