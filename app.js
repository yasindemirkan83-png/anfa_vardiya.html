// Service Worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').catch(()=>{});
}

// Saat
function tick(){
  const n=new Date();
  document.getElementById("time").innerText=n.toLocaleTimeString('tr-TR');
  document.getElementById("date").innerText=n.toLocaleDateString('tr-TR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}
setInterval(tick,1000); tick();

// Vardiya
let secilen = localStorage.getItem('secilenVardiya') || 1;
const BASLANGIC = new Date(Date.UTC(2026,0,1));
let currentYear=new Date().getFullYear(),
    currentMonth=new Date().getMonth();

const tatiller={
"1-1":"🎉 Yılbaşı",
"4-23":"🇹🇷 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
"5-1":"👷 1 Mayıs Emek ve Dayanışma Günü",
"5-19":"🇹🇷 19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı",
"7-15":"🇹🇷 15 Temmuz Demokrasi ve Milli Birlik Günü",
"8-30":"🇹🇷 30 Ağustos Zafer Bayramı",
"10-29":"🇹🇷 29 Ekim Cumhuriyet Bayramı",
"3-19":"🕌 Ramazan Bayramı Arefe",
"3-20":"🕌 Ramazan Bayramı (1.Gün)",
"3-21":"🕌 Ramazan Bayramı (2.Gün)",
"3-22":"🕌 Ramazan Bayramı (3.Gün)",
"5-26":"🐑 Kurban Bayramı Arefe",
"5-27":"🐑 Kurban Bayramı (1.Gün)",
"5-28":"🐑 Kurban Bayramı (2.Gün)",
"5-29":"🐑 Kurban Bayramı (3.Gün)",
"5-30":"🐑 Kurban Bayramı (4.Gün)",
"1-13":"🌙 Regaip Kandili",
"2-2":"🌙 Miraç Kandili",
"2-12":"🌙 Berat Kandili",
"3-9":"🌙 Kadir Gecesi",
"9-26":"🌙 Mevlid Kandili"
};

function vardiya(t){
  const gunFarki=Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())-BASLANGIC)/86400000)%4;
  const duzen=[
    ['gece','izin','izin','gunduz'],
    ['izin','izin','gunduz','gece'],
    ['izin','gunduz','gece','izin'],
    ['gunduz','gece','izin','izin']
  ];
  return duzen[(gunFarki+4)%4];
}

function todayInfo(){
  const today=new Date();
  const v=vardiya(today);
  let g=[],n=[];
  v.forEach((x,i)=>{
    if(x==='gunduz') g.push((i+1)+'. Vardiya');
    if(x==='gece') n.push((i+1)+'. Vardiya');
  });
  document.getElementById('todayShift').innerText=`Bugün → Gündüz: ${g.join(', ')||'-'} | Gece: ${n.join(', ')||'-'}`;
}

// Takvim
function draw(){
  const calendar=document.getElementById('calendar');
  const holidayInfo=document.getElementById('holidayInfo');
  calendar.innerHTML='';
  holidayInfo.innerHTML='';
  holidayInfo.style.display='none';

  let g=0,n=0,o=0;
  const today=new Date();
  const firstDay=(new Date(currentYear,currentMonth,1).getDay()+6)%7;
  const days=new Date(currentYear,currentMonth+1,0).getDate();
  document.getElementById('monthTitle').innerText=new Date(currentYear,currentMonth).toLocaleDateString('tr-TR',{month:'long',year:'numeric'});

  for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));

  for(let i=1;i<=days;i++){
    const date=new Date(currentYear,currentMonth,i);
    const v=vardiya(date)[secilen-1];
    const d=document.createElement('div');
    let key=(currentMonth+1)+'-'+i;

    d.className='day '+(v==='gunduz'? 'work-day': v==='gece'? 'work-night':'off');
    if(date.toDateString()===today.toDateString()) d.classList.add('today');
    if(tatiller[key]){
      d.classList.add('holiday');
      holidayInfo.style.display='block';
      holidayInfo.innerHTML+=tatiller[key]+'<br>';
    }
    d.innerText=i;
    calendar.appendChild(d);
    v==='gunduz'?g++:v==='gece'?n++:o++;
  }

  document.getElementById('dayCount').innerText=g;
  document.getElementById('nightCount').innerText=n;
  document.getElementById('offCount').innerText=o;
}

document.querySelectorAll('.vardiya-btn').forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll('.vardiya-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    secilen=b.dataset.v;
    localStorage.setItem('secilenVardiya', secilen);
    draw();
  }
});

function nextMonth(){currentMonth++; if(currentMonth>11){currentMonth=0; currentYear++;} draw();}
function prevMonth(){currentMonth--; if(currentMonth<0){currentMonth=11; currentYear--;} draw();}

todayInfo();
draw();

// Bildirim
async function checkNotification(){
  try{
    const res=await fetch('https://<kendi-github-url>/bildirim.json');
    const data=await res.json();
    const last=localStorage.getItem('lastNotification')||'';
    if(data.timestamp!==last && Notification.permission==='granted'){
      new Notification(data.title,{body:data.message});
      localStorage.setItem('lastNotification', data.timestamp);
    }
  }catch(e){console.log('bildirim kontrol hatası',e);}
}
Notification.requestPermission();
setInterval(checkNotification,5*60*1000);
checkNotification();

// Ayarlar paneli
function toggleSettings(){
  settings.style.display=(settings.style.display==='block')?'none':'block';
}}
