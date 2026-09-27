const banks = {
  1: [
    ['A','alışkanlık','Düzenli olarak tekrar edilen davranış veya rutin.','habit','Her sabah kitap okumak güzel bir alışkanlıktır.'],
    ['B','başarı','Çalışarak elde edilen olumlu sonuç.','success','Sınavdaki başarısını ailesiyle paylaştı.'],
    ['C','cesaret','Korkuya rağmen harekete geçme gücü.','courage','Sahneye çıkmak için cesaret topladı.'],
    ['Ç','çevre','Yaşadığımız yeri ve etrafımızdaki canlıları kapsayan ortam.','environment','Çevreyi temiz tutmak hepimizin görevidir.'],
    ['D','deneyim','Bir şeyi yaşayarak veya yaparak kazandığımız bilgi.','experience','Bu işte iki yıllık deneyimim var.'],
    ['E','etkinlik','Önceden düzenlenen bir faaliyet.','activity / event','Okuldaki etkinlik saat üçte başlayacak.'],
    ['F','fırsat','Bir iş için uygun zaman veya elverişli durum.','opportunity','Türkçe konuşmak için her fırsatı değerlendiriyor.'],
    ['G','gelenek','Bir toplumda kuşaktan kuşağa aktarılan uygulama.','tradition','Bayramda aileyi ziyaret etmek bir gelenektir.'],
    ['Ğ','eğitim','Bilgi ve beceri kazanma, öğrenme ve öğretme süreci.','education','Çocukların eğitimi için yeni bir program hazırlandı.'],
    ['H','hedef','Ulaşmak istediğin sonuç.','goal','Bu yılki hedefim daha çok Türkçe kitap okumak.'],
    ['I','ısrar','Bir isteği veya düşünceyi kararlılıkla sürdürme.','insistence','Gitmek istemedim ama arkadaşım ısrar etti.'],
    ['İ','iletişim','İnsanlar arasında bilgi, düşünce ve duygu paylaşımı.','communication','İyi iletişim için karşımızdakini dinlemeliyiz.'],
    ['J','jüri','Bir yarışmada değerlendirme yapan kurul veya insanlar.','jury','Jüri bütün projeleri inceledi.'],
    ['K','katkı','Ortak bir işe verdiğin destek.','contribution','Herkes bu projeye küçük bir katkı sağladı.'],
    ['L','lider','Bir gruba yol gösteren ve onu yönlendiren kişi.','leader','Takımın lideri görevleri paylaştırdı.'],
    ['M','merak','Bir konuyu öğrenme isteği.','curiosity','Merak ettiği için öğretmenine soru sordu.'],
    ['N','neden','Bir olayın niçin olduğunu açıklayan şey.','reason','Gecikmenin nedenini bize anlattı.'],
    ['O','olanak','Bir işi yapabilmek için sahip olunan uygun koşul veya kaynak.','possibility / means','Okul bize spor yapma olanağı sunuyor.'],
    ['Ö','öneri','Yapılabilecek bir şey hakkında sunulan fikir.','suggestion','Gezi için güzel bir önerim var.'],
    ['P','plan','Yapılacak işlerin önceden düzenlenmiş sırası.','plan','Hafta sonu için bir plan yaptık.'],
    ['R','rota','Bir yolculukta izlenecek yol.','route','Şehre gitmek için kısa bir rota seçtik.'],
    ['S','sorumluluk','Yerine getirmekle yükümlü olduğun görev.','responsibility','Sınıfı temiz tutmak hepimizin sorumluluğudur.'],
    ['Ş','şüphe','Bir şeyin doğru olduğundan emin olmama durumu.','doubt','Bu haberin doğruluğu hakkında şüphem var.'],
    ['T','tercih','Birkaç seçenekten birini daha çok isteyip seçme.','preference / choice','Benim tercihim otobüsle gitmek.'],
    ['U','ulaşım','Otobüs, metro veya vapur gibi araçlarla bir yerden başka bir yere gitme işi.','transportation','Bu mahallede ulaşım oldukça kolay.'],
    ['Ü','üye','Bir grup veya kuruluşa katılmış kişi.','member','Kütüphaneye üye oldum.'],
    ['V','vazgeçmek','Bir işi yapmaya karar vermişken kararından dönmek.','to give up / change one’s mind','Yağmur başlayınca pikniğe gitmekten vazgeçtik.'],
    ['Y','yöntem','Bir işi yapmak için izlenen yol.','method','Yeni bir öğrenme yöntemi denedim.'],
    ['Z','ziyaret','Birini veya bir yeri görmeye gitme.','visit','Hafta sonu müzeye bir ziyaret planladık.']
  ],
  2: [
    ['A','ayırmak','İki şeyi birbirinden uzaklaştırmak veya farklı yerlere koymak.','to separate','Beyaz ve renkli çamaşırları ayırdım.'],
    ['B','belirti','Ateş veya öksürük gibi, bir hastalığın varlığını gösteren işaret.','symptom','Ateş bu hastalığın bir belirtisi olabilir.'],
    ['C','civar','Bir yerin yakınındaki bölge.','vicinity / nearby area','Okulun civarında bir kafe var.'],
    ['Ç','çağırmak','Birinin yanına gelmesini istemek; ona seslenmek veya telefon etmek.','to call / invite over','Öğretmen öğrencileri sınıfa çağırdı.'],
    ['D','durum','Bir kişinin veya olayın içinde bulunduğu hâl.','situation / condition','Hastanın durumu bugün daha iyi.'],
    ['E','esnek','Kolayca eğilebilen veya değişen koşullara uyum sağlayabilen.','flexible','Çalışma saatleri oldukça esnek.'],
    ['F','fatura','Elektrik, su veya aldığın bir ürün için ödeyeceğin tutarı gösteren belge.','bill / invoice','Elektrik faturası bu ay geldi.'],
    ['G','güvenmek','Birinin doğru söylediğine veya sözünü tutacağına inanmak.','to trust','Arkadaşıma güveniyorum.'],
    ['Ğ','doğalgaz','Evleri ısıtmak ve yemek pişirmek için kullanılan gaz.','natural gas','Kışın doğalgaz kullanıyoruz.'],
    ['H','hazırlık','Bir işe başlamadan önce gerekenleri tamamlama.','preparation','Sınav hazırlığına erken başladım.'],
    ['I','ısınmak','Üşüdükten sonra vücudun yeniden sıcak hâle gelmesi.','to warm up','Eve girince biraz ısındım.'],
    ['İ','ihtiyaç','Yaşamak veya bir işi yapmak için gerekli olan şey.','need','Bugün biraz dinlenmeye ihtiyacım var.'],
    ['J','jandarma','Şehir dışındaki birçok bölgede güvenlikten sorumlu görevli.','gendarmerie officer','Köydeki olayı jandarmaya bildirdiler.'],
    ['K','kiralık','Para ödeyerek belirli bir süre kullanılabilen ev veya araba için söylenir.','for rent','Kiralık bir ev arıyoruz.'],
    ['L','lezzetli','Tadı güzel olan yemek için kullanılan sıfat.','delicious','Bu çorba çok lezzetli.'],
    ['M','memleket','Bir insanın doğduğu veya ailesinin geldiği yer.','hometown / home region','Bayramda memleketime gittim.'],
    ['N','nezle','Burun akıntısı ve hapşırma gibi belirtileri olan hafif hastalık.','common cold','Nezle olduğu için bugün okula gelmedi.'],
    ['O','organik','Yetiştirilirken yapay kimyasal ilaç kullanılmayan yiyecekler için kullanılan sıfat.','organic','Pazardan organik sebze aldık.'],
    ['Ö','ödünç vermek','Bir eşyayı daha sonra geri almak üzere birine geçici olarak vermek.','to lend','Arkadaşıma kitabımı ödünç verdim.'],
    ['P','pişmanlık','Yaptığın bir şeyden sonra “Keşke yapmasaydım” diye hissetme durumu.','regret','Ders çalışmadığı için pişmanlık duydu.'],
    ['R','reklam','Bir ürünü veya hizmeti insanlara tanıtmak için hazırlanan duyuru ya da video.','advertisement','Yeni filmin reklamını gördüm.'],
    ['S','sabır','Zor bir durumda sakin kalıp bekleyebilme gücü.','patience','Dil öğrenmek zaman ve sabır ister.'],
    ['Ş','şikâyet etmek','Bir sorundan memnun olmadığını ilgili kişiye bildirmek.','to complain','Komşusu gürültüden şikâyet etti.'],
    ['T','tasarruflu','Para, su veya elektriği gereksiz yere harcamayan kişi için kullanılan sıfat.','thrifty / economical','Tasarruflu olmak için ışıkları kapatıyoruz.'],
    ['U','ulaşmak','Bir yere varmak.','to reach / arrive','Okula otobüsle yarım saatte ulaştım.'],
    ['Ü','ürün','Fabrikada üretilen veya tarlada yetiştirilen, kullanılabilen ya da satılabilen şey.','product','Bu mağazada birçok yerel ürün var.'],
    ['V','vergi','Devletin hizmetlerini karşılamak için kişilerden veya şirketlerden topladığı para.','tax','Alışveriş yaparken vergi de ödüyoruz.'],
    ['Y','yorum','Bir konu veya olay hakkındaki kişisel düşünce.','comment / opinion','Film hakkında kısa bir yorum yazdım.'],
    ['Z','zorlanmak','Bir şeyi yaparken güçlük çekmek.','to have difficulty','Uzun metni okurken biraz zorlandım.']
  ]
};

const gameNumber = Number(document.body.dataset.game) === 2 ? 2 : 1;
const words = banks[gameNumber].map(([letter, answer, clue, english, example]) => ({letter,answer,clue,english,example}));
const $ = id => document.getElementById(id);
const TOTAL = 300;
let states, current, firstRound, timeLeft, clock, endAt, soundOn=true, ended=false, transitioning=false, runId=0, selectedReview=-1;
let revisited = new Set();
function norm(s){return s.trim().replace(/\s+/g,' ').normalize('NFC').toLocaleLowerCase('tr-TR')}
function say(message,type=''){const e=$('feedback');e.textContent=message;e.className='feedback '+type}
function sound(kind){if(!soundOn)return;const player=$('sound'+kind[0].toUpperCase()+kind.slice(1));
  player.pause();player.currentTime=0;player.volume=.48;player.play().catch(()=>{})
}
function music(){const track=$('musicTrack');track.volume=.36;
  if(soundOn)track.play().catch(()=>{$('audioStatus').textContent='Ses başlamadı. Müzik düğmesine dokunarak yeniden deneyebilirsin.'})
}
function stopMusic(){const track=$('musicTrack');track.pause();track.currentTime=0}
function updateClock(){
  $('totalClock').textContent=`${Math.floor(timeLeft/60)}:${String(timeLeft%60).padStart(2,'0')}`;
  $('timeProgress').value=TOTAL-timeLeft;
}
function drawRing(){const box=$('ring');box.querySelectorAll('.letter').forEach(x=>x.remove());words.forEach((w,i)=>{
  const b=document.createElement('button');b.type='button';b.className=`letter ${states[i]} ${!ended&&i===current?'current':''} ${ended&&i===selectedReview?'selected':''}`;
  const angle=-Math.PI/2+2*Math.PI*i/words.length;
  b.style.left=(50+43*Math.cos(angle))+'%';b.style.top=(50+43*Math.sin(angle))+'%';
  b.textContent=w.letter;b.setAttribute('aria-label',`${w.letter}: ${states[i]==='correct'?'doğru':states[i]==='wrong'?'yanlış':states[i]==='passed'?'pas':'bekliyor'}`);
  b.disabled=!ended||states[i]==='correct';
  b.onclick=()=>openReview(i);
  box.appendChild(b)
});$('rightCount').textContent=states.filter(s=>s==='correct').length;
  $('wrongCount').textContent=states.filter(s=>s==='wrong').length;
  $('passCount').textContent=states.filter(s=>s==='passed').length
}
function render(){if(ended)return;const w=words[current];$('centerLetter').textContent=w.letter;$('ringProgress').textContent=`${current+1} / 29`;
  $('progress').textContent=`${firstRound?'PAS TURU · ':'İLK TUR · '}${w.letter}`;
  $('questionHeading').textContent=w.letter==='Ğ'?'İçinde Ğ bulunan kelime':`${w.letter} ile başlayan kelime`;
  $('clue').textContent=w.clue;$('special').hidden=w.letter!=='Ğ';$('answer').value='';$('answer').disabled=false;
  $('check').disabled=false;$('pass').disabled=false;updateClock();drawRing();
  say('Kelimeyi yazıp kontrol et veya pas geç.');$('answer').focus()
}
function finish(){if(ended)return;ended=true;clearInterval(clock);stopMusic();states=states.map(s=>s==='pending'?'passed':s);$('questionPanel').hidden=true;$('startPanel').hidden=true;
  $('ringPanel').hidden=false;$('end').hidden=false;$('sound').hidden=true;
  const right=states.filter(s=>s==='correct').length,wrong=states.filter(s=>s==='wrong').length,passed=states.filter(s=>s==='passed').length;
  $('summary').textContent=`${right} doğru · ${wrong} yanlış · ${passed} pas`;
  $('endMessage').textContent=right===words.length?'Bütün harfleri doğru bildin! İstersen yeniden yarış.':'Halkadaki kırmızı veya sarı harfe dokun. Soru ve doğru cevap burada görünecek.';
  selectedReview=-1;$('resultPrompt').hidden=false;$('resultDetail').hidden=true;
  $('centerLetter').textContent='✓';$('ringProgress').textContent='Sonuçlar';drawRing();$('end').scrollIntoView({behavior:'smooth',block:'nearest'})
}
function openReview(i){if(!ended||states[i]==='correct')return;const w=words[i];selectedReview=i;
  $('resultPrompt').hidden=true;$('resultDetail').hidden=false;
  $('reviewLetter').textContent=w.letter;$('reviewStatus').textContent=states[i]==='wrong'?'Yanlış cevap':'Pas geçildi';
  $('reviewClue').textContent=w.clue;$('reviewAnswer').textContent=w.answer;
  $('reviewEnglish').textContent=`(${w.english})`;$('reviewExample').textContent=w.example;
  $('centerLetter').textContent=w.letter;$('ringProgress').textContent='İnceleme';drawRing();
  $('end').scrollIntoView({behavior:'smooth',block:'nearest'})
}
function advance(){if(ended)return;
  if(!firstRound){const next=states.findIndex((s,i)=>i>current&&s==='pending');if(next>=0){current=next;render();return}firstRound=true;revisited.clear()}
  const passed=states.map((s,i)=>s==='passed'&& !revisited.has(i)?i:-1).filter(i=>i>=0);
  if(!passed.length){if(states.includes('passed')&&timeLeft>0){revisited.clear();advance();return}finish();return}
  current=passed[0];revisited.add(current);render()
}
function choose(result){if(ended||transitioning)return;transitioning=true;const thisRun=runId;
  states[current]=result;sound(result==='correct'?'correct':result==='wrong'?'wrong':'pass');
  $('check').disabled=true;$('pass').disabled=true;$('answer').disabled=true;
  say(result==='correct'?'Doğru!':result==='wrong'?'Yanlış. Cevabı oyun sonunda inceleyebilirsin.':'Pas. Süre kalırsa bu harfe döneceğiz.',result);
  drawRing();setTimeout(()=>{if(!ended&&runId===thisRun){transitioning=false;advance()}},560)
}
function tick(){if(ended)return;timeLeft=Math.max(0,Math.ceil((endAt-performance.now())/1000));updateClock();if(timeLeft<=0)finish()}
function start(){
  runId++;states=words.map(()=>'pending');current=0;firstRound=false;revisited=new Set();timeLeft=TOTAL;ended=false;transitioning=false;selectedReview=-1;
  $('startPanel').hidden=true;$('end').hidden=true;$('ringPanel').hidden=false;$('questionPanel').hidden=false;$('sound').hidden=false;
  $('audioStatus').textContent='';$('sound').textContent=soundOn?'♫ Müzik açık · Kapat':'♫ Ses kapalı · Aç';render();music();clearInterval(clock);endAt=performance.now()+TOTAL*1000;clock=setInterval(tick,250)
}
$('start').onclick=start;$('replay').onclick=start;
$('check').onclick=()=>{const input=norm($('answer').value);if(!input){say('Önce bir kelime yaz veya pas geç.','wrong');return}const w=words[current];const correct=input===norm(w.answer)||(w.letter==='Ğ'&&gameNumber===2&&input==='doğal gaz');choose(correct?'correct':'wrong')};
$('pass').onclick=()=>choose('passed');$('answer').onkeydown=e=>{if(e.key==='Enter'){$('check').click()}};
$('sound').onclick=()=>{soundOn=!soundOn;$('sound').textContent=soundOn?'♫ Müzik açık · Kapat':'♫ Ses kapalı · Aç';if(soundOn)music();else stopMusic()};
$('finishNow').onclick=finish;
$('gameNumber').textContent=gameNumber;$('nextGame').href=gameNumber===1?'/oyunlar/harf-halkasi/2/':'/oyunlar/harf-halkasi/';
$('nextGame').textContent=gameNumber===1?'2. oyuna geç →':'1. oyuna geç →';
states=words.map(()=>'pending');current=0;drawRing();$('ringPanel').hidden=false;
