const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const ctaHTML = `
    <div style="background-color: #f8fafc; border-left: 4px solid #1a365d; padding: 20px; margin-top: 30px; border-radius: 4px;">
      <h3 style="color: #1a365d; margin-top: 0;">Peşəkar Nevroloji Yardım Axtarırsınız?</h3>
      <p>Əgər yuxarıda sadalanan əlamətlərdən əziyyət çəkirsinizsə, vaxt itirmədən mütəxəssisə müraciət etməyiniz tövsiyə olunur. <strong>Dr. Könül Nəcəfli</strong> xəstəliyin kökünü taparaq düzgün diaqnostika və müasir müalicə üsulları ilə sağlamlığınıza qovuşmağınıza kömək edəcək.</p>
      <div style="display: flex; gap: 15px; margin-top: 15px;">
        <a href="https://wa.me/994555524605" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">WhatsApp ilə Yazın</a>
        <a href="/rezervasiya" style="background-color: #1a365d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Onlayn Rezervasiya</a>
      </div>
    </div>
  `;

  const blogs = [
    {
      slug: 'miqren-nedir-ve-nece-mualice-olunur',
      title: 'Miqren nədir və necə müalicə olunur? Ev şəraitində ağrını necə azaltmaq olar?',
      excerpt: 'Miqren sadəcə baş ağrısı deyil, ciddi nevroloji xəstəlikdir. Miqrenin yaranma səbəbləri, əlamətləri və ən müasir müalicə üsulları haqqında ətraflı məlumat.',
      coverImage: '/images/blog/migren.jpg',
      author: 'Dr. Könül Nəcəfli',
      readTime: 6,
      seoTitle: 'Miqrenin Müalicəsi və Əlamətləri | Bakıda Nevroloq',
      seoDescription: 'Miqren nədir? Miqren ağrıları necə yaranır və necə müalicə edilir? Baş ağrısı və miqren müalicəsi üzrə peşəkar nevroloq məsləhəti.',
      seoKeywords: 'miqren, miqrenin mualicesi, bas agrisi, miqren elametleri, bakida nevroloq',
      content: `
<h2>Miqren nədir?</h2>
<p>Miqren, adətən başın bir tərəfində şiddətli, zərbəli və ya döyüntülü ağrılara səbəb olan kompleks nevroloji xəstəlikdir. Bu ağrılar bir neçə saatdan bir neçə günə qədər davam edə bilər və xəstənin gündəlik həyat keyfiyyətini ciddi şəkildə aşağı salır. Təəssüf ki, bir çox insan miqreni sadəcə "baş ağrısı" kimi qəbul edir və ağrıkəsicilərlə müvəqqəti həll axtarır. Lakin miqren xüsusi nevroloji müalicə tələb edir.</p>

<h2>Miqrenin əlamətləri nələrdir?</h2>
<ul>
  <li>Başın bir (bəzən hər iki) tərəfində şiddətli, döyüntülü ağrı</li>
  <li>İşığa (fotofobiya) və səsə (fonofobiya) qarşı kəskin həssaslıq</li>
  <li>Ürəkbulanma və bəzən qusma</li>
  <li>Görmədə bulanıqlıq və ya işıq qığılcımlarının görünməsi (Aura)</li>
  <li>Hərəkət edərkən ağrının artması</li>
</ul>

<h2>Miqren ağrısını nə tətikləyir?</h2>
<p>Miqrenin dəqiq səbəbləri tam öyrənilməsə də, genetik faktorların və ətraf mühitin böyük rolu var. Ən çox rast gəlinən tətikləyicilər bunlardır:</p>
<ul>
  <li><strong>Stres və yorğunluq:</strong> Gündəlik həyatdakı gərginlik miqrenin ən böyük düşmənidir.</li>
  <li><strong>Yuxu rejimi:</strong> Yuxusuzluq və ya normadan artıq yatmaq.</li>
  <li><strong>Qidalanma:</strong> Şokolad, köhnə pendirlər, kofein, alkoqol və bəzi qida əlavələri.</li>
  <li><strong>Hormonal dəyişikliklər:</strong> Xüsusən qadınlarda menstruasiya, hamiləlik və menopauza dövrü.</li>
  <li><strong>Hava dəyişikliyi:</strong> Kəskin temperatur və təzyiq dəyişiklikləri.</li>
</ul>

<h2>Ev şəraitində miqren ağrısını necə azaltmaq olar?</h2>
<p>Əgər miqren tutması artıq başlayıbsa, bu sadə addımlar sizə kömək edə bilər:</p>
<ol>
  <li><strong>Sakit və qaranlıq bir otağa keçin:</strong> İşıq və səs miqreni şiddətləndirir. Mümkünsə bir az yatmağa çalışın.</li>
  <li><strong>Soyuq kompres tətbiq edin:</strong> Başınıza və ya boynunuzun arxasına soyuq dəsmal və ya buz torbası qoyun. Soyuq, qan damarlarını daraldaraq ağrını azaldır.</li>
  <li><strong>Bol su için:</strong> Susuzluq miqrenin əsas tətikləyicilərindəndir.</li>
  <li><strong>Kofein:</strong> Erkən mərhələdə az miqdarda qəhvə içmək bəzi insanlarda ağrının qarşısını ala bilər.</li>
</ol>

<h2>Miqren tam müalicə olunurmu?</h2>
<p>Miqren xroniki bir xəstəlik olduğu üçün onu "tamamilə yox edən" sehrli bir həb yoxdur. Lakin müasir nevrologiyada tətbiq edilən müalicə üsulları (dərman müalicəsi, botoks inyeksiyaları, həyat tərzinin dəyişdirilməsi) ilə miqren tutmalarının sayını və şiddətini <strong>90%-ə qədər azaltmaq</strong> mümkündür. Ağrıkəsicilərdən asılı qalmaq yerinə, mütləq profilaktik (qoruyucu) müalicəyə başlamaq lazımdır.</p>
${ctaHTML}
      `
    },
    {
      slug: 'basgicellenmenin-esas-sebebleri-nelerdir',
      title: 'Başgicəllənmənin (Vertiqo) əsas səbəbləri nələrdir? Nə vaxt həkimə müraciət etməli?',
      excerpt: 'Dünyanın ətrafınızda fırlandığını hiss edirsiniz? Vertiqo (başgicəllənmə) təzyiq problemi yoxsa ciddi nevroloji xəstəlikdir? Ətraflı məqaləmizdə oxuyun.',
      coverImage: '/images/blog/vertigo.jpg',
      author: 'Dr. Könül Nəcəfli',
      readTime: 5,
      seoTitle: 'Başgicəllənmə və Vertiqo Səbəbləri | Nevroloq Məsləhəti',
      seoDescription: 'Başgicəllənmə, vertiqo və göz qaralması niyə yaranır? Daxili qulaq problemləri və boyun ostexondrozunun vertiqoya təsiri.',
      seoKeywords: 'bas gicellenmesi, vertiqo nedir, goz qaralmasi, basgicellenmenin sebebleri, boyun ostexondrozu',
      content: `
<h2>Vertiqo (Başgicəllənmə) Nədir?</h2>
<p>Vertiqo, sadəcə göz qaralması və ya halsızlıq deyil. Bu, xəstənin özünün və ya ətrafındakı əşyaların fırlandığını hiss etdiyi <strong>illüziyadır</strong>. Bir çox pasiyentlər bu vəziyyəti təzyiqin düşməsi və ya qanazlığı ilə əlaqələndirirlər, lakin əsl səbəb adətən daxili qulaq və ya nevroloji sistemdə gizlənir.</p>

<h2>Başgicəllənmənin Əsas Səbəbləri</h2>
<ul>
  <li><strong>BPPV (Xoşxassəli Paroksizmal Mövqe Vertiqosu):</strong> Daxili qulaqdakı tarazlıq kristallarının yerindən oynaması. Ən çox rast gəlinən səbəbdir. Yataqda çevriləndə və ya başı yuxarı qaldıranda kəskin başgicəllənmə yaradır.</li>
  <li><strong>Vestibulyar Nevrit:</strong> Tarazlıq sinirinin infeksiyası (adətən virus). Qəfil başlayır və bir neçə gün davam edən şiddətli vertiqoya səbəb olur.</li>
  <li><strong>Meniere Xəstəliyi:</strong> Daxili qulaqda maye təzyiqinin artması. Başgicəllənmə ilə yanaşı qulaqda səs (tinnitus) və eşitmə itkisi də müşahidə edilir.</li>
  <li><strong>Boyun Ostexondrozu (Servikal Vertiqo):</strong> Boyun fəqərələrindəki problemlərin beyinə gedən qan axınına və sinirlərə təsir etməsi.</li>
  <li><strong>Miqren:</strong> Bəzi insanlarda baş ağrısı ilə yanaşı və ya ağrısız formada vertiqo (Vestibulyar miqren) müşahidə olunur.</li>
</ul>

<h2>Göz qaralması ilə Vertiqonun fərqi nədir?</h2>
<p>Qəfildən ayağa qalxanda gözünüz qaralırsa, bu adətən <em>Ortostatik Hipotenziya</em> (qan təzyiqinin anidən düşməsi) və ya qanazlığı ilə bağlıdır. Lakin yerinizdə oturduğunuz halda otaq ətrafınızda fırlanırsa, divarlar üstünüzə gəlirsə, bu <strong>Vertiqodur</strong> və nevroloji və ya KBB (Qulaq-Burun-Boğaz) müayinəsi tələb edir.</p>

<h2>Nə vaxt dərhal həkimə müraciət etməli?</h2>
<p>Başgicəllənmə aşağıdakı əlamətlərlə müşayiət olunarsa, təcili tibbi yardım lazımdır (bu, insult xəbərdarlığı ola bilər):</p>
<ul>
  <li>Qəfil başlayan və şiddətli, dözülməz baş ağrısı</li>
  <li>Qollarda və ya qıçlarda keyimə, gücsüzlük</li>
  <li>Danışmaqda çətinlik (nitqin dolaşması)</li>
  <li>İkigörmə və ya görmənin itməsi</li>
  <li>Sərbəst gəzə bilməmək, müvazinəti tam itirmək</li>
</ul>

<h2>Necə müalicə olunur?</h2>
<p>Müalicə tamamilə səbəbə bağlıdır. Əgər problem daxili qulaqdakı kristallarla bağlıdırsa, sadə <strong>manevr hərəkətləri</strong> (həkim tərəfindən tətbiq edilən Epley manevri kimi) ilə xəstə bir seansda tam sağala bilər. Digər səbəblərdə isə medikamentoz (dərman) müalicəsi və vestibulyar reabilitasiya tətbiq edilir.</p>
${ctaHTML}
      `
    },
    {
      slug: 'gece-yuxusuzlugunun-sebebleri',
      title: 'Gecə yuxusuzluğunun səbəbləri və sinir sistemi ilə əlaqəsi. Yuxunu necə bərpa etməli?',
      excerpt: 'Saatlarla yataqda çevrilir, ancaq yuxuya gedə bilmirsiniz? Yuxusuzluq sadəcə yorğunluq deyil, nevroz və stressin ən böyük göstəricisidir.',
      coverImage: '/images/blog/insomnia.jpg',
      author: 'Dr. Könül Nəcəfli',
      readTime: 4,
      seoTitle: 'Yuxusuzluq və Əsəb Pozuntusu | Bakıda Nevroloq',
      seoDescription: 'Gecə yuxuya gedə bilməmək, yuxusuzluq və nevroz. Stres və əsəb pozuntusunun müalicəsi üçün nevroloq tövsiyələri.',
      seoKeywords: 'yuxusuzluq, eseb pozuntusu, gece yuxuya gede bilmemek, nevroz, stres',
      content: `
<h2>Yuxusuzluq (İnsomniya) Nədir?</h2>
<p>Yuxusuzluq yuxuya getməkdə çətinlik çəkmək, gecə tez-tez oyanmaq və ya səhər çox erkən oyanıb bir daha yata bilməmək halıdır. Keyfiyyətli yuxu beynin "özünü təmizlədiyi" və yeniləndiyi yeganə zamandır. Xroniki yuxusuzluq həm fiziki, həm də psixoloji sağlamlığa ciddi zərbə vurur.</p>

<h2>Niyə yuxuya gedə bilmirik? (Nevroloji Səbəblər)</h2>
<p>Bəzən fiziki yorğun olsaq da, beynimiz "sönmür". Bunun ən çox rast gəlinən səbəbləri bunlardır:</p>
<ul>
  <li><strong>Stres və Həyəcan (Təşviş Pozuntusu):</strong> Gündəlik problemləri yatağa daşımaq, davamlı gələcək haqqında narahat olmaq beyni oyaq saxlayan kortizol və adrenalin hormonlarını artırır.</li>
  <li><strong>Depressiya və Nevroz:</strong> Emosional tükənmə yuxu strukturunu pozur.</li>
  <li><strong>Mavi İşıq Təsiri:</strong> Yatmazdan əvvəl telefon və televizor ekranlarına baxmaq, beynin yuxu hormonu olan <strong>melatonin</strong> ifrazını dayandırır.</li>
  <li><strong>Qeyri-düzgün qidalanma:</strong> Gec saatlarda kofein, tünd çay qəbulu və ya ağır yeməklər yemək.</li>
</ul>

<h2>Yuxusuzluğun fəsadları nələrdir?</h2>
<p>Əgər insan uzun müddət keyfiyyətli yuxu almırsa, gün ərzində diqqət dağınıqlığı, aqressiya, əsəbilik, yaddaş zəifliyi, immun sisteminin zəifləməsi və hətta xroniki ağrılar (baş və əzələ ağrıları) ortaya çıxır.</p>

<h2>Yuxunu necə bərpa etməli? (Uyqu Gigiyenası)</h2>
<ol>
  <li><strong>Rejim yaradın:</strong> Hər gün (həftəsonu daxil) eyni saatda yatıb eyni saatda oyanmağa çalışın. Beyninizin bioloji saatını tənzimləyin.</li>
  <li><strong>Ekranlardan uzaq durun:</strong> Yuxuya getmədən ən az 1 saat əvvəl telefonu və televizoru kənara qoyun. Kitab oxumaq və ya yüngül musiqi dinləmək daha faydalıdır.</li>
  <li><strong>Yataq otağınızı hazırlayın:</strong> Otaq qaranlıq, sakit və bir qədər sərin (18-20°C) olmalıdır.</li>
  <li><strong>Kofeini məhdudlaşdırın:</strong> Günorta saat 14:00-dan sonra qəhvə və ya tünd qara çay içməkdən çəkinin.</li>
</ol>

<h2>Dərman qəbul etmək olarmı?</h2>
<p>Qonşunun və ya aptekçinin məsləhəti ilə yuxu dərmanları (xüsusən də trankvilizatorlar) almaq çox <strong>təhlükəlidir</strong>. Bu dərmanlar asılılıq yarada və beynin təbii yuxu arxitekturasını tamamilə poza bilər. Yuxusuzluğun müalicəsi fərdi aparılmalıdır. Nevroloq yuxusuzluğun kökündə yatan səbəbi (stress, təşviş, depressiya) tapıb müalicə edərək təbii yuxunuzu bərpa edir.</p>
${ctaHTML}
      `
    },
    {
      slug: 'boyun-ve-bel-agrilari-ostexondroz',
      title: 'Boyun və bel ağrıları (Ostexondroz) niyə yaranır? Sinir sıxışması təhlükəlidirmi?',
      excerpt: 'Kompüter arxasında işləyənlərin ən böyük kabusu: Boyun ostexondrozu. Qolun keyiməsi və bel ağrılarının nevroloji səbəbləri.',
      coverImage: '/images/blog/back_pain.jpg',
      author: 'Dr. Könül Nəcəfli',
      readTime: 5,
      seoTitle: 'Boyun Ostexondrozu və Bel Ağrıları | Sinir Sıxışması',
      seoDescription: 'Boyun ağrısı, ostexondroz müalicəsi, bel ağrısı və sinir sıxışması. Qolun keyiməsi və onurğa xəstəlikləri barədə nevroloq məqaləsi.',
      seoKeywords: 'boyun agrisi, ostexondroz mualicesi, bel agrisi, sinir sixismasi, qolun keyimesi',
      content: `
<h2>Ostexondroz nədir?</h2>
<p>Osteoxondroz, onurğa sütununda olan qığırdaqların (fəqərələrarası disklərin) və sümüklərin degenerativ (dağıdıcı) dəyişikliyidir. İllər keçdikcə fəqərələr arasındakı elastik disklər öz suyunu itirir, quruyur və nazilir. Bu, əsasən yaşlanma prosesi olsa da, müasir dövrdə passiv həyat tərzi səbəbindən gənclərdə də çox rast gəlinir.</p>

<h2>Niyə boynumuz və belimiz ağrıyır?</h2>
<ul>
  <li><strong>Düzgün olmayan duruş:</strong> Telefon və ya kompüter qarşısında saatlarla başı aşağı əyərək oturmaq boyun fəqərələrinə dəhşətli yük salır (buna "Text Neck" sindromu da deyilir).</li>
  <li><strong>Hərəkətsizlik:</strong> Əzələlərin zəifləməsi onurğaya düşən yükü artırır.</li>
  <li><strong>Ağır yük qaldırmaq:</strong> Düzgün texnika olmadan edilən ani hərəkətlər fəqərələrarası yırtıqlara (qrija) səbəb ola bilər.</li>
</ul>

<h2>Sinir sıxışması nədir və əlamətləri nələrdir?</h2>
<p>Ostexondroz və ya yırtıq zamanı, fəqərələrin arasından çıxan sinir kökləri sıxıla bilər. Buna <em>radikulopatiya</em> deyilir. Əlamətləri bunlardır:</p>
<ul>
  <li><strong>Boyun nahiyəsində sıxışma olduqda:</strong> Ağrı boyundan qola, çiyinə və barmaqlara doğru yayılır. Qolda, əldə uyuşma, keyimə (iynəbatma hissi) və ya gücsüzlük yaranır. Bəzən başağrısı və başgicəllənmə verir.</li>
  <li><strong>Bel nahiyəsində sıxışma olduqda (İşias):</strong> Ağrı beldən başlayaraq sağrıdan ayağa qədər (topuğa kimi) uzanır. Ayaqlarda keyimə və yeriməkdə çətinlik müşahidə edilir.</li>
</ul>

<h2>Sinir sıxışması təhlükəlidirmi?</h2>
<p>Bəli. Əgər sinir uzun müddət sıxılmış vəziyyətdə qalarsa, qidalanması pozulur və <strong>geri dönməz zədələnmə</strong> yaranır. Xəstə qolunda və ya ayağında əzələ əriməsi və daimi gücsüzlük yaşaya bilər. Əgər ağrı ilə bərabər keyimə və güc itkisi varsa, dərhal nevroloqa müraciət etmək lazımdır.</p>

<h2>Necə müalicə olunur?</h2>
<p>Əksər hallarda (80-90%) əməliyyata ehtiyac qalmır. Nevroloji müalicə protokollarına aşağıdakılar daxildir:</p>
<ul>
  <li><strong>Dərman müalicəsi:</strong> İltihab əleyhinə və əzələ boşaldıcı dərmanlar, sinir qidalandırıcı vitaminlər.</li>
  <li><strong>Blokada:</strong> Kəskin dözülməz ağrılarda birbaşa sıxılan sinirin ətrafına dərman yeridilərək ağrı kəsilir.</li>
  <li><strong>Fizioterapiya və İdman:</strong> Ağrı kəsildikdən sonra əzələləri gücləndirmək üçün mütləqdir.</li>
</ul>
${ctaHTML}
      `
    },
    {
      slug: 'ellerde-ve-ayaqlarda-keyime-niye-olur',
      title: 'Əllərdə və ayaqlarda keyimə niyə olur? Şəkərli diabetin sinirlərə təsiri.',
      excerpt: 'Əlləriniz və ayaqlarınız həmişə üşüyür və ya iynə batırmış kimi keyiyir? Bunun səbəbi qan dövranı deyil, Polineyropatiya ola bilər.',
      coverImage: '/images/blog/neuropathy.jpg',
      author: 'Dr. Könül Nəcəfli',
      readTime: 4,
      seoTitle: 'Əllərdə və Ayaqlarda Keyimə | Polineyropatiya Müalicəsi',
      seoDescription: 'Əllərdə və ayaqlarda keyimə, üşümə, ağrıların nevroloji səbəbləri. Şəkərli diabet xəstələrində diabetik neyropatiya (sinir zədələnməsi).',
      seoKeywords: 'ellerde keyime, ayaqlarda usume, polineyropatiya, diabetik neyropatiya, ayaq agrilari',
      content: `
<h2>Keyimə (Uyuşma) Nədir?</h2>
<p>Əllərdə və ayaqlarda hissiyyatın azalması, qarışqa gəzməsi hissi, iynə batması, yanma və ya donma kimi əlamətlərin ümumi tibbi adı <strong>Neyropatiya</strong> (sinir zədələnməsi) adlanır. Bir çox insan bu əlamətləri görəndə "qanım yaxşı dövran etmir" deyərək kardiyoloqa müraciət edir, lakin əsl səbəb 90% hallarda periferik sinirlərin zədələnməsidir.</p>

<h2>Niyə sinirlər zədələnir? (Polineyropatiyanın səbəbləri)</h2>
<ul>
  <li><strong>Şəkərli Diabet (Diabetik Neyropatiya):</strong> Ən geniş yayılmış səbəbdir. Qanda şəkərin uzun müddət yüksək olması kiçik qan damarlarını zədələyir və sinirlər qidalana bilmədiyi üçün "ölməyə" başlayır. Əsasən ayaq barmaqlarından başlayır və getdikcə yuxarı qalxır ("corab-əlcək" tipli zədələnmə).</li>
  <li><strong>B12 Vitamini Çatışmazlığı:</strong> Sinirlərin qoruyucu qişasının (mielin) sağlamlığı üçün B12 vitamini kritikdir. Çatışmazlığı ağır nevroloji problemlərə səbəb olur.</li>
  <li><strong>Toksik Təsirlər:</strong> Alkoqoldan həddən artıq istifadə və bəzi kimyəvi preparatlar sinirləri zəhərləyir.</li>
  <li><strong>Onurğa Problemləri:</strong> Boyun və ya bel yırtıqları siniri kökündən sıxdıqda, yuxarıda qeyd etdiyimiz kimi, tək bir qolda və ya ayaqda keyimə yaradır. Lakin polineyropatiya adətən ikitərəfli (simmetrik) olur.</li>
</ul>

<h2>Diabet Xəstələri üçün Təhlükə</h2>
<p>Şəkər xəstələrində ayaqlarda hissiyyat azaldığı üçün onlar ayaqlarına nəsə batanda və ya isti su yandıranda bunu hiss etmirlər. Bu yaralar sonradan sağalmir və "Diabetik pəncə" adlanan ağır fəsadlara (hətta amputasiyaya) gətirib çıxarır. Buna görə də diabet xəstələri mütəmadi olaraq <strong>Nevroloq</strong> müayinəsindən keçməlidirlər.</p>

<h2>Gecə artan ağrılar</h2>
<p>Neyropatik ağrıların ən xarakterik xüsusiyyəti gecələr, insan dincəldiyi vaxt artmasıdır. Xəstələr ayaqlarında "yanma", "göynəmə" hissindən yata bilmirlər və tez-tez ayaqlarını soyuq suya salmaq ehtiyacı duyurlar.</p>

<h2>Diaqnoz və Müalicə</h2>
<p>Diaqnoz qoymaq üçün <strong>EMNQ (Elektromıoqrafiya)</strong> müayinəsi aparılır. Bu aparat vasitəsilə sinirlərin elektrik keçiriciliyi yoxlanılır və sinirin harada, nə dərəcədə zədələndiyi 100% dəqiqliklə tapılır.</p>
<p>Müalicə zamanı sadə ağrıkəsicilər fayda vermir. Neyropatik ağrılar üçün xüsusi nevroloji preparatlar təyin edilir. Paralel olaraq əsas xəstəlik (məsələn, şəkər) endokrinoloq tərəfindən nəzarətə alınmalıdır.</p>
${ctaHTML}
      `
    }
  ];

  console.log('Inserting blog posts...');

  for (const blog of blogs) {
    // Check if exists
    const existing = await prisma.blogPost.findUnique({
      where: {
        locale_slug: {
          locale: 'az',
          slug: blog.slug
        }
      }
    });

    if (existing) {
      await prisma.blogPost.update({
        where: { id: existing.id },
        data: {
          ...blog,
          isPublished: true,
          publishedAt: new Date()
        }
      });
      console.log('Updated ' + blog.slug);
    } else {
      await prisma.blogPost.create({
        data: {
          ...blog,
          locale: 'az',
          isPublished: true,
          publishedAt: new Date()
        }
      });
      console.log('Created ' + blog.slug);
    }
  }

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
