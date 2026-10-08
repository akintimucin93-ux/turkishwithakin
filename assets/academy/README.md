# Akın Academy — Ana sayfa ve seçici / Revizyon 4

Bu varlıklar yalnızca yeni ana sayfa ve materyal seçicisinde kullanılır. Eski içerik sayfaları değiştirilmez.

- academy.css: responsive ana sayfa ve katalog bileşenleri.
- academy.js: TR/EN, arama, menü, kaynak klasörleri, doğrudan oyun kataloğu ve yorum alanı.
- catalog.js: mevcut içerik envanteri. A1 kelime listeleri yalnızca Kelimeler kategorisinde; alfabe ayrıca Dinleme kategorisindedir. Oyunlar altında yalnızca oyunlar/ hedefleri bulunur: 6 B1 oyunu.
- fonts.css, inter-*.ttf ve Inter-LICENSE.txt: yerel yazı tipi ve lisans.

## Düzen

Kaynak kartları üç ayrı sütundur: %30 metin, %30 kitap görseli, %40 İstanbul sahnesi. Kitaplar tam görünür; görüntüler üst üste binmez. İstanbul sahnesinin alfa değeri .82 ve kenar geçişi vardır; gerçek tarayıcıda görsel kabul henüz doğrulanmamıştır.

Özel ders alanı tutor-wide.webp sahnesini doğal en-boy oranında gösterir. WhatsApp: https://wa.me/905319553895; e-posta: mailto:ak.timucin@windowslive.com. Bu bağlantılar kullanıcı tarafından verildi. Otomatik mesaj gönderimi yoktur. Takvim, takvim stilleri ve scheduler.js bu sürümden kaldırılmıştır. Eski v3 kopyasında scheduler.js kalırsa yeni HTML tarafından yüklenmez.

Öğretmen sahnesi temsili olarak üretilmiş görseldir; gerçek öğretmen kimliği iddiası yapılmaz. Yeni kitap kategori görselleri yerleşik görsel üretimiyle hazırlanmış bağımsız ürün görselleridir. course-books.webp 1536×1024, conversation-guide.webp 1122×1402; bu revizyonda görsel dosyaları aynı kalmıştır. Onaylı sayfa PNG’sinden kesit yoktur. Kitap içerikleri henüz yoksa seçici boş durumu gösterir. Arda’nın Bir Günü özgün kapağı korunur.

Üretim tarifleri: mavi/yeşil/turuncu A1/A2/B1 Türkçe ders kitapları, İstanbul kapakları ve açık mavi stüdyo zemini; krem kumaş ve lacivert/altın kapaklı Galata/vapur/kafe motifli Türkçe konuşma rehberi. Fotoğraflar tam görünür; kitaplarda uydurma yayınevi bilgisi yoktur.

## Koruma ve önizleme

B1 konu seçicisi özgün iki konu ve kaynak kontrollerini kullanır. Özgün B1 HTML ve topic-resources.css aynı kalır. HTTP önizleme korunmuş yerel sayfaları açar; file:// ile eski içeriğin kökten başlayan CSS/JS yollarını korumak için canlı adresler kullanılır. Tam yerel önizleme için Python HTTP sunucusu önerilir.

Yorum kartları açıkça yer tutucudur; gerçek olmayan kişi, puan ve öğrenci sayısı yoktur. Gerçek yorumlar geldiğinde index.html içindeki review-card öğeleri güncellenebilir.

Gerçek masaüstü/tablet/mobil tarayıcı testi bu ortamda yapılamadı. DOM, CSS ve dosya kontrolleri gerçek görüntü ve dokunma testinin yerine geçmez. Canlı yayın/push/deploy yapılmadı.
