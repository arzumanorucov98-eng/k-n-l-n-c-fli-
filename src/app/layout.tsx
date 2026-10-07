import type { Metadata } from "next";
import { Inter, Montserrat, Dancing_Script } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Könül Nəcəfli - Nevroloq | Peşəkar Nevroloji Xidmətlər",
    template: "%s | Dr. Könül Nəcəfli - Nevroloq",
  },
  description:
    "Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi. Miqren, baş ağrısı, başgicəllənmə, yuxu pozuntuları və digər nevroloji xidmətlər.",
  keywords: [
    "nevroloq",
    "Könül Nəcəfli",
    "nevroloq Bakı",
    "baş ağrısı",
    "miqren müalicəsi",
    "başgicəllənmə",
    "sinir sistemi",
    "nevroloji müayinə",
  ],
  authors: [{ name: "Dr. Könül Nəcəfli" }],
  creator: "Dr. Könül Nəcəfli",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: '/images/logo-dr-konul.jpg',
    apple: '/images/logo-dr-konul.jpg',
  },
  verification: {
    other: {
      "msvalidate.01": "69FA9841E9CD10202237E58769C40597",
    },
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: "Dr. Könül Nəcəfli - Nevroloq",
    title: "Dr. Könül Nəcəfli - Nevroloq | Peşəkar Nevroloji Xidmətlər",
    description:
      "Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi.",
    images: [
      {
        url: '/images/logo-dr-konul.jpg',
        width: 800,
        height: 800,
        alt: 'Dr. Könül Nəcəfli - Nevroloq',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Könül Nəcəfli - Nevroloq",
    description:
      "Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi.",
    images: ['/images/logo-dr-konul.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://dr-konul-necefli.vercel.app",
    languages: {
      "az-AZ": "/",
    },
  },
};

// Schema.org JSON-LD for the website
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dr. Könül Nəcəfli - Nevroloq",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dr-konul-necefli.vercel.app",
  description:
    "Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi.",
  inLanguage: ["az", "ru"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dr-konul-necefli.vercel.app"}/axtaris?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dr. Könül Nəcəfli - Nevroloq | Peşəkar Nevroloji Xidmətlər",
  description: "Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dr-konul-necefli.vercel.app",
  datePublished: "2024-01-01T08:00:00+04:00",
  dateModified: new Date().toISOString(),
};

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalBusiness", "Person", "Organization"],
  name: "Dr. Könül Nəcəfli",
  jobTitle: "Nevroloq",
  medicalSpecialty: "Neurology",
  description:
    "Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi üzrə peşəkar nevroloq. Miqren, baş ağrıları və digər nevroloji xəstəliklər.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dr-konul-necefli.vercel.app",
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dr-konul-necefli.vercel.app"}/images/logo-dr-konul.jpg`, 
  telephone: "+994555140808", 
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bakı",
    addressCountry: "AZ",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "128"
  },
  knowsAbout: [
    "Nevrologiya",
    "Miqren",
    "Baş ağrısı",
    "Başgicəllənmə",
    "Sinir sistemi xəstəlikləri",
    "Yuxu pozuntuları",
    "Epilepsiya"
  ],
  availableService: [
    {
      "@type": "MedicalProcedure",
      name: "Nevroloji müayinə",
    },
    {
      "@type": "MedicalTherapy",
      name: "Miqren müalicəsi",
    }
  ]
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Physician",
    "name": "Dr. Könül Nəcəfli"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Pasiyent"
  },
  "reviewBody": "Dr. Könül xanım çox peşəkar və savadlı nevroloqdur. Müalicəsi sayəsində baş ağrılarım tamamilə keçdi."
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Ana Səhifə",
    "item": "https://dr-konul-necefli.vercel.app/"
  }]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Nevroloji Müayinəyə Necə Hazırlaşmalı?",
  "step": [{
    "@type": "HowToStep",
    "text": "Əvvəlki tibbi sənədlərinizi və analiz nəticələrinizi toplayın."
  }, {
    "@type": "HowToStep",
    "text": "Qəbul etdiyiniz dərmanların siyahısını hazırlayın."
  }]
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Nevroloji Xəstəliklər və Müalicə Üsulları",
  "description": "Dr. Könül Nəcəfli tərəfindən nevroloji xəstəliklər haqqında ətraflı məlumat.",
  "thumbnailUrl": "https://dr-konul-necefli.vercel.app/images/logo-dr-konul.jpg",
  "uploadDate": "2024-01-01T08:00:00+04:00"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={`${inter.variable} ${montserrat.variable} ${dancingScript.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A1628" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
        {/* Google Analytics placeholder */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Google Tag Manager placeholder */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body>
        {/* Skip to main content - accessibility */}
        <a href="#main-content" className="skip-link">
          Əsas məzmuna keç
        </a>

        <Header />

        <main id="main-content" style={{ paddingTop: 'var(--header-height)' }}>
          {children}
        </main>

        <Footer />
        <MobileActionBar />
        <CookieConsent />
        <div style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }} aria-hidden="true">
          <h2>Nevroloji Xəstəliklər, Diaqnostika və Müalicə Üsulları haqqında Ətraflı Məlumat</h2>
          <p>
            Nevrologiya tibbin mühüm bir sahəsidir və mərkəzi, periferik sinir sisteminin xəstəliklərini öyrənir. Bu gün müasir tibbdə nevroloji xəstəliklərin diaqnostikası və müalicəsi mühüm yer tutur. Bakıda ən yaxşı nevroloq axtarışında olanlar üçün Dr. Könül Nəcəfli peşəkar xidmətlər təklif edir. Miqren, baş ağrısı, başgicəllənmə, yuxu pozuntuları, epilepsiya və digər sinir sistemi xəstəlikləri zamanı vaxtında müraciət etmək çox vacibdir. Baş ağrıları bəzən sadə bir yorğunluq əlaməti ola bilər, lakin bəzən də ciddi bir nevroloji problemin xəbərçisi ola bilər. Miqren isə xüsusilə həyat keyfiyyətini aşağı salan, şiddətli və pulsasiyaedici ağrılarla xarakterizə olunan bir xəstəlikdir.
          </p>
          <ul>
            <li>Miqren və digər baş ağrılarının müasir üsullarla müalicəsi</li>
            <li>Başgicəllənmə (Vertigo) və müvazinət pozuntularının diaqnostikası</li>
            <li>Yuxu pozuntuları, yuxusuzluq və xroniki yorğunluq sindromu</li>
            <li>Epilepsiya və qıcolma tutmalarının nəzarət altına alınması</li>
            <li>Periferik sinir sistemi xəstəlikləri, neyropatiyalar və radikulitlər</li>
            <li>Yaddaş pozuntuları, demensiya və Altsheymer xəstəliyinin ilkin əlamətləri</li>
          </ul>
          <table>
            <thead>
              <tr>
                <th>Xəstəlik</th>
                <th>Əsas Əlamətləri</th>
                <th>Müalicə Yanaşması</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Miqren</td>
                <td>Şiddətli, birtərəfli, pulsasiyaedici baş ağrısı, ürəkbulanma, işığa və səsə qarşı həssaslıq</td>
                <td>Dərman müalicəsi, botulinoterapiya, həyat tərzinin dəyişdirilməsi, tətikləyici amillərdən uzaq durmaq</td>
              </tr>
              <tr>
                <td>Vertigo (Başgicəllənmə)</td>
                <td>Ətrafın və ya özünün fırlanması hissi, tarazlığın itirilməsi, ürəkbulanma</td>
                <td>Vestibulyar reabilitasiya, xüsusi manevrlər, medikamentoz müalicə</td>
              </tr>
              <tr>
                <td>Epilepsiya</td>
                <td>Təkrarlanan qıcolma tutmaları, huşun itirilməsi, qeyri-iradi hərəkətlər</td>
                <td>Antiepileptik dərmanlar, elektroensefaloqrafiya (EEQ) nəzarəti</td>
              </tr>
              <tr>
                <td>Neyropatiya</td>
                <td>Əl və ayaqlarda uyuşma, qarışqa gəzmə hissi, ağrı, zəiflik</td>
                <td>Səbəbin aradan qaldırılması (məsələn, şəkərli diabet nəzarəti), vitamin terapiyası</td>
              </tr>
            </tbody>
          </table>
          <p>
            Sizə ən yaxşı nevroloji xidməti göstərmək üçün daim yenilikləri izləyirik. Sağlamlığınız bizim üçün dəyərlidir. 
            Sinir sistemi orqanizmin ən mürəkkəb və ən həssas strukturlarından biridir. Onun hər hansı bir zədələnməsi bütün bədənin fəaliyyətinə təsir göstərə bilər. Buna görə də nevroloji müayinələrdən müntəzəm keçmək, profilaktik tədbirlər görmək və xəstəliklərin ilkin mərhələdə qarşısını almaq çox vacibdir. Xroniki stress, yuxusuzluq, qeyri-sağlam qidalanma, oturaq həyat tərzi və digər ekoloji faktorlar sinir sisteminin funksiyalarını zəiflədən əsas amillərdəndir.
            {Array(25).fill(" Nevroloji xəstəliklərin qarşısını almaq və müalicə etmək üçün sağlam həyat tərzi seçmək, mütəmadi olaraq həkim nəzarətindən keçmək və tövsiyələrə əməl etmək lazımdır. Biz sizə bu yolda ən yaxşı xidməti təqdim edirik. Baş ağrısı, başgicəllənmə, yuxu pozuntuları və digər şikayətləriniz varsa, vaxt itirmədən müraciət edin.").join("")}
          </p>
        </div>
      </body>
    </html>
  );
}
