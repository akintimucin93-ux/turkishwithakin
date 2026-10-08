'use strict';
// All entries point to unchanged resources from main 7bc5e3b4a2342003242ba55d0f301520a77ada0d.
window.AcademyCatalog = {
  types: {
    lessons: {en:'Lessons',tr:'Konu Anlatımları'}, worksheets:{en:'Worksheets',tr:'Çalışma Kâğıtları'},
    games:{en:'Games',tr:'Oyunlar'}, reading:{en:'Reading',tr:'Okuma'}, listening:{en:'Listening',tr:'Dinleme'},
    quizzes:{en:'Quizzes',tr:'Testler'}, textbooks:{en:'Turkish Course Books',tr:'Türkçe Ders Kitapları'},
    books:{en:'Reading Books',tr:'Okuma Kitapları'}, guide:{en:'Everyday Turkish Guide',tr:'Günlük Türkçe Konuşma Rehberi'},
    vocabulary:{en:'Vocabulary',tr:'Kelimeler'}
  },
  levels:[{id:'a1',label:'A1',en:'Beginner',tr:'Başlangıç'},{id:'a2',label:'A2',en:'Elementary',tr:'Temel'},{id:'b1',label:'B1',en:'Intermediate',tr:'Orta'}],
  items:[
    {levels:['b1'],types:['lessons'],path:'dersler/zarf-fiiller/',en:'Converbs · -(y)ArAk, -A…-A, -(y)Ip, -(y)ken',tr:'Zarf-Fiiller · -(y)ArAk, -A…-A, -(y)Ip, -(y)ken',descEn:'Meaning, examples and common mistakes',descTr:'Anlam, örnekler ve sık yapılan hatalar'},
    {levels:['b1'],types:['lessons'],path:'dersler/simdiki-zamanin-hikayesi/',en:'Past Continuous · -(I)yordu',tr:'Şimdiki Zamanın Hikâyesi · -(I)yordu',descEn:'Past actions in progress and narrative background',descTr:'Geçmişte devam eden eylemler ve hikâye arka planı'},
    {levels:['b1'],types:['worksheets'],path:'dersler/zarf-fiiller/calisma-kagidi.pdf',en:'B1 Converbs Worksheet',tr:'B1 Zarf-Fiiller Çalışma Kâğıdı',descEn:'Printable PDF',descTr:'Yazdırılabilir PDF'},
    {levels:['b1'],types:['worksheets'],path:'dersler/iyordu/calisma-kagidi.pdf',en:'Time Machine · -(I)yordu Worksheet',tr:'Zaman Makinesi · -(I)yordu Çalışma Kâğıdı',descEn:'Printable PDF',descTr:'Yazdırılabilir PDF'},
    {levels:['b1'],types:['worksheets'],path:'okuma/kitabin-arasindaki-fotograf/calisma-kagidi.pdf',en:'The Photograph Inside the Book · Worksheet',tr:'Kitabın Arasındaki Fotoğraf · Çalışma Kâğıdı',descEn:'Reading activities · PDF',descTr:'Okuma etkinlikleri · PDF'},
    {levels:['b1'],types:['games'],path:'oyunlar/zarf-fiiller/',en:'Converb Challenge · Sentence Completion',tr:'Zarf-Fiil Oyunu · Cümle Tamamlama',descEn:'Choose the correct converb form',descTr:'Doğru zarf-fiil yapısını seç'},
    {levels:['b1'],types:['games'],path:'oyunlar/harf-halkasi/',en:'Letter Ring · Game 1',tr:'Harf Halkası · 1. Oyun',descEn:'B1 Turkish vocabulary',descTr:'B1 Türkçe kelimeler'},
    {levels:['b1'],types:['games'],path:'oyunlar/harf-halkasi/2/',en:'Letter Ring · Game 2',tr:'Harf Halkası · 2. Oyun',descEn:'A second set of B1 vocabulary',descTr:'İkinci B1 kelime seti'},
    {levels:['b1'],types:['games'],path:'oyunlar/kayip-dosya/',en:'The Missing File',tr:'Kayıp Dosya',descEn:'A converb investigation',descTr:'Zarf-fiil araştırması'},
    {levels:['b1'],types:['games'],path:'oyunlar/dil-dedektifi-olay-yeri-v2/',en:'Language Detective: Crime Scene',tr:'Dil Dedektifi: Olay Yeri',descEn:'Past Continuous · Evidence and witnesses',descTr:'Şimdiki zamanın hikâyesi · Kanıtlar ve tanıklar'},
    {levels:['b1'],types:['games'],path:'oyunlar/iyordu_GUNCELLENMIS_OYUN/',en:'Past Continuous · Visual Game',tr:'Şimdiki Zamanın Hikâyesi · Görsel Oyun',descEn:'Explore what was happening in the past',descTr:'Geçmişte neler olduğunu keşfet'},
    {levels:['b1'],types:['reading'],path:'okuma/istanbulda-yeni-bir-seruven/',en:'A New Adventure in Istanbul',tr:'İstanbul’da Yeni Bir Serüven',descEn:'Read and practise Turkish converbs',descTr:'Oku ve zarf-fiilleri pekiştir'},
    {levels:['b1'],types:['reading'],path:'okuma/kitabin-arasindaki-fotograf/',en:'The Photograph Inside the Book',tr:'Kitabın Arasındaki Fotoğraf',descEn:'Reading comprehension and true–false questions',descTr:'Okuma-anlama ve doğru-yanlış soruları'},
    {levels:['b1'],types:['quizzes'],path:'testler/zarf-fiiller/',en:'Converbs Mini Test',tr:'Zarf-Fiiller Mini Testi',descEn:'Test yourself with the existing interactive quiz',descTr:'Mevcut etkileşimli testle kendini değerlendir'},
    {levels:['a1','a2'],types:['books'],path:'kitaplar/ardanin-bir-gunu/',en:'Arda’nın Bir Günü',tr:'Arda’nın Bir Günü',descEn:'An illustrated Turkish story · Akın Timoçin',descTr:'Resimli Türkçe hikâye · Akın Timoçin'},
    ...[
      ['alfabe','Alphabet','Alfabe'],['sayilar','Numbers','Sayılar'],['renkler','Colors','Renkler'],
      ['meyveler','Fruit','Meyveler'],['hayvanlar','Animals','Hayvanlar'],['meslekler','Professions','Meslekler']
    ].map(([slug,en,tr])=>({levels:['a1'],types:slug==='alfabe'?['vocabulary','listening']:['vocabulary'],
      path:`seviyeler/a1/kelimeler/${slug}/`,en,tr,
      descEn:slug==='alfabe'?'Alphabet cards, pronunciation audio and practice':'Vocabulary cards and interactive practice',
      descTr:slug==='alfabe'?'Alfabe kartları, sesli telaffuz ve pekiştirme':'Kelime kartları ve etkileşimli pekiştirme'}))
  ]
};

// Presentation metadata only: the game files and existing cover images are unchanged.
window.AcademyGameArt = {
 'oyunlar/harf-halkasi/': {image:'assets/game-covers/harf-halkasi-final.webp',topicEn:'Vocabulary',topicTr:'Kelimeler'},
 'oyunlar/harf-halkasi/2/': {image:'assets/game-covers/harf-halkasi-final.webp',topicEn:'Vocabulary · Game 2',topicTr:'Kelimeler · 2. Oyun'},
 'oyunlar/kayip-dosya/': {image:'assets/game-covers/approved-dossiers.webp',sheet:true,topicEn:'Converbs · Detective',topicTr:'Zarf-Fiiller · Dedektif'},
 'oyunlar/zarf-fiiller/': {image:'assets/game-covers/zarf-fiiller-final.webp',topicEn:'Converbs',topicTr:'Zarf-Fiiller'},
 'oyunlar/dil-dedektifi-olay-yeri-v2/': {image:'assets/game-covers/dil-dedektifi-olay-yeri.webp',topicEn:'Past continuous · Detective',topicTr:'-(I)yordu · Dedektif'},
 'oyunlar/iyordu_GUNCELLENMIS_OYUN/': {image:'assets/game-covers/iyordu-visual-game.webp',topicEn:'Past continuous',topicTr:'-(I)yordu'}
};
