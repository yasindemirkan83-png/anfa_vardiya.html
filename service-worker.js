// ------------------
// CUSTOM NOTIFICATION FONKSIYONLARI
// ------------------
function showNotification(msg){
  const notif = document.getElementById('customNotification');
  document.getElementById('notifText').innerText = msg;
  notif.style.display='block';
}

function closeNotification(){
  document.getElementById('customNotification').style.display='none';
}

// ------------------
// BILDIRIM KONTROLÜ (JSON'dan)
// ------------------
async function checkNotification(){
  try{
    const res = await fetch('https://kendi-github.github.io/bildirim.json'); // kendi URL’in
    const data = await res.json();
    const last = localStorage.getItem('lastNotification')||'';
    if(data.timestamp !== last){
      showNotification(`${data.title} - ${data.message}`);
      localStorage.setItem('lastNotification', data.timestamp);
    }
  }catch(e){
    console.error('Bildirim kontrol hatası', e);
  }
}

// İlk açılışta kontrol et
checkNotification();

// 5 dakikada bir kontrol et
setInterval(checkNotification, 1000*60*5);
