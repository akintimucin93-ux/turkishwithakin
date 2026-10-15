> 16 Ekim 2026 toplu güncellemesi: taban artık GitHub main 4158c7d. Ana sayfanın yeni tasarımı korunur. SQL tablolarını tekrar kurma. Bu metindeki gerçek bağlantı/SMTP/yönetici testleri henüz bekliyor.

# Akın Academy · Üyelik bağlantısı ve ortak kontrol

Sürüm: 14 Ekim 2026. Site tabanı: GitHub main 0dcdbae.

## Şu an tamamlananlar

Kullanıcı Supabase'de akin-academy projesini oluşturdu, Confirm email'i kapattı, Site URL ve /hesabim/ redirect adresini kaydetti. SQL kurulumundan sonra sekiz tabloyu gördüğünü doğruladı. Cloudflare üç Secret alanını doldurdu ama Deploy'a basmadı; secrets kaydedilmiş sayılmaz. Bu paket canlıya gönderilmedi.

**database/001_membership.sql dosyasını tekrar çalıştırma.** Bu dosya yeni/boş bir proje için saklanan kurulum kaynağıdır. Mevcut Supabase tablolarıyla uyumlu kod kullanılır; bu güncellemede ikinci SQL kurulumuna ihtiyaç yok.

## Bu sürüm

- Koyu mod öğrenci/yönetici paneli. TR/EN.
- Kayıt ad, soyad, erişilebilir e-posta, şifre ve seviye ister. Telefon yalnızca ders talebinde.
- Kayıt yanıtında oturum alınırsa direkt öğrenci paneli açılır. E-posta onayı kapalıdır. E-postanın sahibini doğruladığımızı iddia etmeyiz.
- 18+ kayıt engeli kaldırıldı. Veri kullanımını okuma ve veli/öğretmen rehberliği açıklaması var; bu, bağımsız doğrulanmış veli onayı sistemi değildir. Çocukların kullanımı için işletmenin uygun veli/okul süreci ayrıca belirlenmelidir.
- Onaysız örnek testler ve soru bankası kaldırıldı. Yeni soru/test eklenmez.
- B1'de 17 zorunlu mevcut materyal ve 4 puanlı etkinlik var. A1/A2 içerikleri sınırlı; bu seviyelerde tamamlamaya göre başarı uydurulmaz.
- Dört bağlı etkinlik: Zarf-Fiil Cümle Tamamlama (10), Harf Halkası 1 (29), Harf Halkası 2 (29), Zarf-Fiiller Mini Test (10).
- Başarı: her etkinliğin son kaydedilen denemesindeki doğru toplamı / toplam soru. Tekrar sayısı başarıyı şişirmez. Harf Halkası pas ve cevapsız harfler toplam 29 içinde kalır.
- Puanlar değiştirilmeyen oyunların tarayıcıdaki sonuç ekranından alınır. Sunucu kimliği, içerik ID'sini, soru toplamını ve sayı sınırlarını doğrular. Ancak istemci puanlarının doğruluğunu bağımsız hesaplamaz; alıştırma takibidir, hileye dayanıklı resmi sınav sistemi değildir.
- İki dedektif oyununun tamamlama puanı başarıya katılmaz; yazı/anlam/dil bilgisi otomatik değerlendirildiği iddia edilmez. Görsel -(I)yordu oyununda beş uygulama bitince yalnızca tamamlama kaydolur.
- PDF/ders gibi içeriklerde öğrenci "Tamamladım" seçer. PDF açmak ya da okumak başarı puanı üretmez.
- Tüm güncel zorunlu materyaller ve dört etkinlik tamamlanınca öneri açılır. %60 altı tekrar önerisi; %60 ve üzeri isteğe bağlı konuşma dersi. Konuşma/telaffuz ve ölçülmeyen belirli kelimeler hakkında eksik uydurulmaz.
- AI bağlı değilse gerçek kurallı öneri vardır, açıkça etiketlenir. Gerçek AI çalışması bu teslimde test edilmedi.

## Bağlantı bilgileri

Cloudflare turkish → Settings → Variables and Secrets:

| Name | Type | Value |
|---|---|---|
| SUPABASE_URL | Secret | Supabase Project URL |
| SUPABASE_ANON_KEY | Secret | Legacy anon/public anahtarı |
| SUPABASE_SERVICE_ROLE_KEY | Secret | Legacy service_role/secret anahtarı |

Anahtarları sohbete, ZIP'e veya GitHub'a koyma. /api/config yalnızca public anon anahtarını tarayıcıya verir; service_role dönmez. Frontend veya kayıt metadata'sı admin rolü veremez.

Bu alanları kaydetmek için Cloudflare Deploy gerektiriyorsa bunu kullanıcıyla bir sonraki ortak adımda yap. Şu an otomatik deploy onayı verilmiş değildir. Kod hazırlandı diye git push yapma.

Supabase Email provider şifre ayarında minimum yeni şifre uzunluğunu en az 10 olarak ayarla; ön yüzdeki 10 karakter kontrolü tek başına sunucu kuralı değildir.

## Şifre yenileme e-postası

Confirm email kapalı olması şifre yenileme e-postasını kaldırmaz. Supabase Authentication → Emails/SMTP bölümünde gerçek SMTP sağlayıcısı bağlanmalı. Varsayılan deneme gönderimi gerçek öğrenciler için yeterli değildir. Gönderici alan adı ve ücretsiz kota seçilen sağlayıcıya bağlıdır.

Reset password şablonuna setup/reset-password.html içeriğini koy. Site URL: https://turkish.akinacademy.workers.dev . Redirect: https://turkish.akinacademy.workers.dev/hesabim/ . Şablon SiteURL/hesabim/?token_hash=...&type=recovery yolunu kullanır. Token doğrulanmadan şifre değiştirilmez. Gerçek teslim, süre dolması ve ikinci kullanım testi bekliyor.

## Yönetici hesabı

Site servisleri bağlandıktan sonra kullanıcı kendi gerçek e-postasıyla normal kayıt formundan hesabını oluşturur. Önce Supabase Authentication → Users içinde bu hesabın doğru ID ve e-postasını doğrula. Kayıt formu admin rolü istemez.

SQL editoründe yalnızca kendi oluşturduğun hesabın ID'siyle aşağıdaki komut çalıştırılır (şimdilik çalıştırma):

```sql
update public.user_roles
set role = 'admin'
where user_id = 'KENDI_HESABININ_UUID_DEGERI'
returning user_id, role;
```

Bir kayıt güncellenmeli. Sonra çıkış/giriş yapıp /yonetim/ panelini kontrol et. Normal öğrenci başka bir URL yazarak admin API'sine erişemez; taklit servis testleri geçti, gerçek iki hesap testi henüz yapılmadı.

## Ders talepleri

Gerçek takvim, yönetici saat ekleyene kadar boştur; önizlemedeki saatler örnektir. Telefon yalnızca talepte alınır. Kontenjan SQL kilidiyle rezerve edilir; talep öğretmen onayını bekler ve iptal edilebilir.

Öğretmene e-posta bildirimi için RESEND_API_KEY ve doğrulanmış MAIL_FROM gerekir. OWNER_EMAIL = ak.timucin@windowslive.com. windowslive.com adresini gönderici olarak taklit etme. Mail servisi bağlı değilse talep kaydolur, yönetici panelinde e-posta durumu başarısız görünür. Öğrenciye otomatik öğretmen onay e-postası ve toplu kampanya gönderimi bu sürümde yoktur. Duyuru izinleri ve CSV listesi vardır.

## Yeni içerik ekleme

assets/learning/catalog.json ortak listedir. Mevcut içerik ID'lerini değiştirme. Yeni dosyayı ekledikten sonra items listesine kalıcı ID, yol, tür, seviye, topic ve başlık ekle. Yeni topic etiketi varsa topics içine TR/EN adını ekle. Eklenen içerik öğrenci panelinde ve ana sayfa materyal seçicisinde görünür. Panel açılışta, odak geri gelince ve beş dakikada bir kontrol eder. Yeni içerik toplamı değiştirir; eski tamamlama kayıtları silinmez.

Yeni oyun için sonuç bağlantısı ayrıca geliştirilmelidir; klasöre dosya koymak herhangi bir oyun puanını otomatik anlamaz. Puanı olmayan yeni içerik yine ilerleme listesinde gösterilebilir.

## Yayın öncesi gerçek kontrol

1. Bağlı test ortamında gerçek öğrenci kaydı: doğrulama e-postası beklemeden giriş.
2. İkinci öğrenciyle ilk hesabın kayıtlarına erişilemediğini doğrula; gerçek RLS testi yap.
3. Dört etkinliği bitir, panelde doğru/total aynı mı kontrol et; tekrar oynayınca son deneme güncellensin, aynı isteğin tekrarı yeni kayıt üretmesin.
4. PDF manuel tamamlama, yeni konu ekleme, başka cihazdan tekrar giriş sonrası kayıtlar.
5. Yönetici, öğrenci filtreleri, CSV, takvim saatleri, kapasite ve son kontenjana eşzamanlı talep.
6. SMTP gerçek e-posta teslimi; şifre reseti, süresi dolmuş/ikinci kez kullanılan link.
7. Masaüstü, tablet ve mobil gerçek tarayıcı/klavye/dokunma kontrolleri.
8. Bunlardan sonra kullanıcı onayıyla GitHub → Cloudflare yayını. Mevcut sitedeki içerikleri silme.

Bu paket testleri taklit servis/DOM/paketleme düzeyindedir; üretim bağlantılarının çalıştığı veya bağımsız güvenlik denetimi yapıldığı iddia edilmez.
