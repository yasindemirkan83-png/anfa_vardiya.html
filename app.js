let secilen = localStorage.getItem('secilenVardiya') || 1;
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const tatiller={
"1-1":"🎉 Yılbaşı",
"4-23":"🇹🇷 23 Nisan",
"5-1":"👷 1 Mayıs",
"5-19":"🇹🇷 19 Mayıs",
"7-15":"🇹🇷 15 Temmuz",
"8-30":"🇹🇷 30 Ağustos",
"10-29":"🇹🇷 29 Ekim"
}

function vardiya(t){
  const gunFarki = Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())-Date.UTC(2026,0,1))/86400000)%4;
  const duzen=[['gece','izin','izin','gunduz'],['izin','izin','gunduz','gece'],['izin','gunduz','gece','izin'],['gunduz','gece','izin','izin']];
  return duzen[(gunFarki+4)%4];
}

function todayInfo(){
  const today = new Date();
  const v = vardiya(today);
  let g=[], n=[];
  v.forEach((x,i)=>{if(x==='gunduz') g.push((i+1)+'. Vardiya'); if(x==='gece') n.push((i+1)+'. Vardiya');});
  todayShift.innerText=`Bugün → Gündüz: ${g.join(',')||'-'} | Gece: ${n.join(',')||'-'}`;
}

function draw(){
  calendar.innerHTML=''; holidayInfo.style.display='none'; holidayInfo.innerHTML='';
  let g=0,n=0,o=0;
  const today=new Date();
  const firstDay=(new Date(currentYear,currentMonth,1).getDay()+6)%7;
  const days=new Date(currentYear,currentMonth+1,0).getDate();
  monthTitle.innerText=new Date(currentYear,currentMonth).toLocaleDateString('tr-TR',{month:'long',year:'numeric'});

  for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));

  for(let i=1;i<=days;i++){
    const date=new Date(currentYear,currentMonth,i);
    const v=vardiya(date)[secilen-1];
    const d=document.createElement('div');
    let key=(currentMonth+1)+'-'+i;
    d.className='day '+(v==='gunduz'? 'work-day': v==='gece'? 'work-night': 'off');
    if(date.toDateString()===today.toDateString()) d.classList.add('today');
    if(tatiller[key]){d.classList.add('holiday'); holidayInfo.style.display='block'; holidayInfo.innerHTML+=tatiller[key]+'<br>';}
    d.innerText=i;
    calendar.appendChild(d);
    v==='gunduz'?g++:v==='gece'?n++:o++;
  }

  dayCount.innerText=g;
  nightCount.innerText=n;
  offCount.innerText=o;
}

document.querySelectorAll('.vardiya-btn').forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll('.vardiya-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    secilen=b.dataset.v;
    localStorage.setItem('secilenVardiya', secilen);
    draw();
  }
})

function nextMonth(){currentMonth++;if(currentMonth>11){currentMonth=0;currentYear++;}draw();}
function prevMonth(){currentMonth--;if(currentMonth<0){currentMonth=11;currentYear--;}draw();}

function tick(){
  const n=new Date();
  time.innerText=n.toLocaleTimeString('tr-TR');
  date.innerText=n.toLocaleDateString('tr-TR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}

function toggleSettings(){
  settings.style.display=settings.style.display==='block'?'none':'block';
}

setInterval(tick,1000);
tick();draw();todayInfo();