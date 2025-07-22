// BIOS CV Utility - Vanilla JavaScript Version

// Global state
let currentLanguage = 'TR';
let selectedTab = 'Main';
let selectedItem = '';
let showLanguageDropdown = false;

let konamiSequence = [];
let matrixMode = false;

// Data structure
const translations = {
    TR: {
        header: "Tunay Kınıcı - System Utility",
        tabHelp: "Sistem Bilgileri",
        defaultHelp: "Bir öğe seçin ve bu bölüm hakkında sistem bilgilerini görüntüleyin.",
        functionKeys: {
            help: "Yardım",
            navigate: "Gezin",
            tabs: "Sekmeler",
            details: "Detaylar",
            print: "Yazdır",
            email: "E-posta",
            contact: "İletişim",
            language: "Dil Değiştir",
        },

    },
    EN: {
        header: "Tunay Kınıcı - System Utility",
        tabHelp: "System Information",
        defaultHelp: "Select an item to view system information and professional details.",
        functionKeys: {
            help: "Help",
            navigate: "Navigate",
            tabs: "Tabs",
            details: "Details",
            print: "Print",
            email: "Email",
            contact: "Contact",
            language: "Change Lang",
        },

    },
    DE: {
        header: "Tunay Kınıcı - System Utility",
        tabHelp: "Systeminformationen",
        defaultHelp: "Wählen Sie ein Element aus, um Systeminformationen und berufliche Details anzuzeigen.",
        functionKeys: {
            help: "Hilfe",
            navigate: "Navigation",
            tabs: "Tabs",
            details: "Details",
            print: "Drucken",
            email: "E-Mail",
            contact: "Kontakt",
            language: "Sprache ändern",
        },

    },
};

const cvData = {
    TR: {
        Main: {
            items: [
                { label: "Ad Soyad:", value: "[Tunay Kınıcı]", editable: false, highlighted: true },
                { label: "Doğum Tarihi:", value: "[09.11.1995]", editable: false },
                { label: "Konum:", value: "[İstanbul, Türkiye]", editable: false },
                { label: "Uyruk:", value: "[Türkiye Cumhuriyeti]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Lise:", value: "[Silivri Anadolu Teknik Lisesi]", expandable: true, editable: false },
                { label: "Alan:", value: "[Bilişim Teknolojileri]", expandable: true, editable: false },
                { label: "Dal:", value: "[Veritabanı Programcılığı]", expandable: true, editable: false },
                { label: "", value: "", spacer: true },
                { label: "Üniversite:", value: "[Sakarya Üniversitesi]", expandable: true, editable: false },
                { label: "Bölüm:", value: "[Bilgisayar Mühendisliği]", expandable: true, editable: false },
                { label: "Derece:", value: "[Lisans]", expandable: true, editable: false },
                { label: "", value: "", spacer: true },
                { label: "Diller:", value: "", expandable: true, editable: false },
                { label: "İngilizce:", value: "[B2]", editable: false },
                { label: "Almanca:", value: "[A1]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Deneyim:", value: "6+ Yıl", editable: false },
                { label: "Durum:", value: "[Müsait]", editable: false },
                { label: "Pozisyon:", value: "[Full Stack Developer]", editable: false },
            ],
            help: {
                "Ad Soyad": "Tunay Kınıcı - Deneyimli Full Stack Developer. E-ticaret, ödeme sistemleri ve lojistik yazılım mimarisi konularında uzman.",
                "Doğum Tarihi": "09 Kasım 1995",
                "Lise": "Silivri Yusuf Sarıbekir Mesleki ve Teknik Anadolu Lisesi - Bilişim Teknolojileri alanında veritabanı programcılığı dalından mezun.",
                "Üniversite": "Sakarya Üniversitesi Bilgisayar Mühendisliği bölümü lisans mezunu. Güçlü teknik altyapı ve teorik bilgi.",
                "İngilizce": "B2 seviye İngilizce - Teknik dokümantasyon okuma, uluslararası projeler ve ekip çalışması için yeterli seviye.",
                "Almanca": "A1 seviye Almanca - Temel seviye, öğrenmeye devam ediyor. Almanya'daki fırsatlar için geliştirilmekte.",
                "Deneyim": "2018'den beri aktif yazılım geliştirme. Stajyer seviyesinden başlayarak yazılım uzmanı seviyesine kadar ilerleme.",
            },
        },
        Advanced: {
            items: [
                { label: "Backend Teknolojileri:", value: "", expandable: true, editable: false, highlighted: true },
                { label: "PHP (Laravel):", value: "[Uzman - MVC, ORM, API]", editable: false },
                { label: "Node.js:", value: "[İleri - Express, WebSocket]", editable: false },
                { label: "Python:", value: "[Orta - Django, Flask]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Frontend Teknolojileri:", value: "", expandable: true, editable: false },
                { label: "React.js:", value: "[İleri - Hooks, Context, Redux]", editable: false },
                { label: "Next.js:", value: "[İleri - SSR, SSG, App Router]", editable: false },
                { label: "Vue.js:", value: "[İleri - Router, Vuex]", editable: false },
                { label: "Nuxt.js:", value: "[İleri - SSR, Static]", editable: false },
                { label: "JavaScript ES6+:", value: "[Uzman - Async, DOM]", editable: false },
                { label: "HTML5/CSS3:", value: "[Uzman - Responsive]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Veritabanı Yönetimi:", value: "", expandable: true, editable: false },
                { label: "PostgreSQL:", value: "[Uzman - Modelleme, Optimizasyon]", editable: false },
                { label: "MySQL:", value: "[İleri - Sorgu, Yedekleme]", editable: false },
                { label: "MongoDB:", value: "[Orta - NoSQL]", editable: false },
                { label: "Redis:", value: "[Orta - Önbellekleme]", editable: false },
            ],
            help: {
                "Backend Teknolojileri": "Güçlü backend geliştirme deneyimi. PHP Laravel ile kurumsal projelerde çalışma, API geliştirme ve veritabanı entegrasyonu.",
                "PHP (Laravel)": "Laravel framework'ü ile MVC mimari, Eloquent ORM, middleware kullanımı, API geliştirme ve PHPUnit ile test yazma konularında uzman.",
                "Node.js": "Express.js framework ile RESTful API geliştirme, WebSocket ile real-time uygulamalar ve event-driven programming deneyimi.",
                "Python": "Django ve Flask framework'leri ile web uygulamaları geliştirme. Data science ve automation script'leri yazma deneyimi.",
                "Frontend Teknolojileri": "Modern frontend teknolojileri ile kullanıcı dostu arayüzler geliştirme. Component-based architecture ve state management deneyimi.",
                "React.js": "React Hooks, Context API ve Redux ile modern web uygulamaları geliştirme. Component tabanlı mimari ve state management deneyimi.",
                "Next.js": "Next.js ile server-side rendering, static site generation ve App Router kullanarak performanslı web uygulamaları geliştirme.",
                "Vue.js": "Vue Router ve Vuex ile büyük ölçekli single page application geliştirme. Component tabanlı mimari ve reactive programming.",
                "Nuxt.js": "Vue.js tabanlı SSR framework ile universal web uygulamaları geliştirme. SEO optimizasyonu ve static site generation.",
                "JavaScript ES6+": "Modern JavaScript özellikleri ile async/await, destructuring, modules ve DOM manipulation. ES6+ syntax ve best practices.",
                "HTML5/CSS3": "Semantic HTML5 yapısı, responsive design, CSS Grid, Flexbox ve modern CSS özellikleri ile kullanıcı dostu arayüzler.",
                "Veritabanı Yönetimi": "İlişkisel ve NoSQL veritabanları ile çalışma deneyimi. Büyük veri işlemleri, optimizasyon ve performans tuning.",
                "PostgreSQL": "İleri düzey veri modelleme, indeksleme, sorgu optimizasyonu ve veritabanı performans ayarlaması konularında deneyimli.",
                "MySQL": "İlişkisel veritabanı yönetimi, sorgu optimizasyonu, yedekleme stratejileri ve performans ayarlaması konularında deneyimli.",
                "MongoDB": "NoSQL veritabanı deneyimi. Doküman tabanlı veri modelleme, aggregation pipeline'ları ve ölçeklenebilir veri yapıları.",
                "Redis": "In-memory veritabanı ve önbellekleme çözümleri. Session yönetimi, cache stratejileri ve performans optimizasyonu.",
            },
        },
        Security: {
            items: [
                { label: "Liderlik Deneyimi:", value: "", expandable: true, editable: false, highlighted: true },
                { label: "Topluluk Başkanı:", value: "[Özgür Yazılım Topluluğu]", editable: false },
                { label: "Süre:", value: "[2017-2018]", editable: false },
                { label: "Rol:", value: "[Başkan - Liderlik]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Güvenlik & Kalite:", value: "", expandable: true, editable: false },
                { label: "Web Güvenliği:", value: "[XSS, CSRF, SQL Injection]", editable: false },
                { label: "Kimlik Doğrulama:", value: "[OAuth, JWT]", editable: false },
                { label: "Veri Şifreleme:", value: "[SSL/TLS, AES]", editable: false },
                { label: "Test:", value: "[PHPUnit, Jest, PyTest]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "DevOps & Bulut:", value: "", expandable: true, editable: false },
                { label: "Docker:", value: "[Container, Compose, CI/CD]", editable: false },
                { label: "Kubernetes:", value: "[Orchestration, Scaling]", editable: false },
                { label: "AWS:", value: "[EC2, S3, Lambda, RDS]", editable: false },
                { label: "CI/CD Araçları:", value: "[Jenkins, GitLab CI]", editable: false },
            ],
            help: {
                "Liderlik Deneyimi": "Üniversite döneminde Özgür Yazılım Topluluğu başkanlığı. Ekip yönetimi, proje koordinasyonu ve teknik mentorluk deneyimi.",
                "Topluluk Başkanı": "2017-2018 yılları arasında topluluk başkanı olarak yazılım geliştirme projelerini yönetti ve ekip çalışması becerilerini geliştirdi.",
                "Süre": "2017-2018 yılları arasında topluluk başkanlığı. Ekip yönetimi ve proje koordinasyonu deneyimi kazanma dönemi.",
                "Rol": "Topluluk başkanı olarak liderlik ve yönetim deneyimi. Ekip çalışması ve proje koordinasyonu becerileri geliştirme.",
                "Güvenlik & Kalite": "Web uygulamalarında güvenlik açıklarına karşı önlem alma, güvenli kodlama pratikleri ve test driven development yaklaşımı.",
                "Web Güvenliği": "XSS, CSRF, SQL Injection gibi yaygın güvenlik açıklarına karşı koruma yöntemleri ve güvenli API geliştirme pratikleri.",
                "Kimlik Doğrulama": "OAuth 2.0, JWT token yönetimi, SSO entegrasyonları ve güvenli kullanıcı kimlik doğrulama sistemleri.",
                "Veri Şifreleme": "SSL/TLS protokolleri, AES şifreleme, hash fonksiyonları ve güvenli veri saklama yöntemleri.",
                "Test": "PHPUnit, Jest, PyTest ile unit test, integration test ve automated testing. Test driven development yaklaşımı.",
                "DevOps & Bulut": "Modern deployment stratejileri, container teknolojileri ve bulut platformları ile ölçeklenebilir uygulamalar geliştirme.",
                "Docker": "Konteyner oluşturma, Docker Compose ile multi-service uygulamalar ve CI/CD pipeline'larında Docker entegrasyonu.",
                "Kubernetes": "Container orchestration, auto-scaling, service mesh ve cloud-native uygulama deployment stratejileri.",
                "AWS": "EC2, S3, Lambda, RDS gibi AWS servisleri ile bulut tabanlı çözümler ve serverless mimari deneyimi.",
                "CI/CD Araçları": "Jenkins, GitLab CI ile sürekli entegrasyon ve sürekli deployment pipeline'ları kurulumu ve yönetimi.",
            },
        },
        Boot: {
            items: [
                { label: "Mevcut Pozisyon:", value: "[T-Soft - Yazılım Uzmanı]", editable: false, highlighted: true },
                { label: "Mevcut Dönem:", value: "[Ekim 2025 - Halen]", editable: false },
                { label: "Önceki Dönem:", value: "[Şubat 2021 - Şubat 2025]", editable: false },
                { label: "Mevcut Proje:", value: "[Cargong - Lojistik Platform]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Önemli Projeler:", value: "", expandable: true, editable: false },
                { label: "Tahsildar B2B:", value: "[B2B & Sanal POS Sistemi - Full Stack]", editable: false },
                { label: "Cargong Platform:", value: "[Lojistik Yönetim - Full Stack]", editable: false },
                { label: "Teknoloji Yığını:", value: "[Laravel, Vue.js, PostgreSQL]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "İş Geçmişi:", value: "", expandable: true, editable: false },
                { label: "T-Soft:", value: "[Yazılım Uzmanı - 4+ yıl]", editable: false },
                { label: "Yelkenci Group:", value: "[Yazılım Geliştirici - 1.5 yıl]", editable: false },
                { label: "Portakal Teknoloji:", value: "[Stajyer - 1 ay]", editable: false },
                { label: "Sakarya Üniversitesi:", value: "[Yarı zamanlı - 1 yıl]", editable: false },
            ],
            help: {
                "Mevcut Pozisyon": "T-Soft'ta Yazılım Uzmanı olarak çalışmaktadır. Askerlik görevini tamamladıktan sonra şirkete geri dönüş yaparak aktif projelerde yer almaya devam etmektedir.",
                "Mevcut Proje": "Cargong lojistik ve kargo yönetim platformunda full stack geliştirici olarak aktif çalışma. Vue.js ve Laravel teknolojileri kullanılıyor.",
                "Mevcut Dönem": "Ekim 2025'ten itibaren T-Soft'ta aktif çalışma. Askerlik görevini tamamladıktan sonra şirkete geri dönüş yaparak kariyerine devam etmektedir.",
                "Önceki Dönem": "Şubat 2021 - Şubat 2025 arası T-Soft'ta yazılım uzmanı olarak çalışma. Askerlik nedeniyle geçici ayrılık.",
                "Tahsildar B2B": "B2B e-ticaret platformu ve çoklu sanal POS entegrasyonu. Türkiye'nin önde gelen POS sağlayıcıları ile entegre, yurtdışı firmasına satılan başarılı proje.",
                "Cargong Platform": "Lojistik süreçlerini dijitalleştiren platform. Gerçek zamanlı takip, optimizasyon ve yönetim özellikleri. Full stack development.",
                "Teknoloji Yığını": "Laravel, Vue.js, PostgreSQL teknoloji stack'i ile modern web uygulamaları geliştirme. Full stack development deneyimi.",
                "İş Geçmişi": "2018'den beri sürekli kariyer gelişimi. Stajyer seviyesinden başlayarak yazılım uzmanı pozisyonuna kadar ilerleme kaydetmiş.",
                "T-Soft": "E-ticaret, ödeme sistemleri ve lojistik alanlarında uzmanlaşma. Proje yönetimi ve teknik liderlik deneyimi kazandı.",
                "Yelkenci Group": "Yazılım geliştirici olarak 1.5 yıl çalışma. Web uygulamaları ve e-ticaret sistemleri geliştirme deneyimi.",
                "Portakal Teknoloji": "Stajyer olarak 1 ay çalışma. İlk profesyonel deneyim ve yazılım geliştirme süreçlerini öğrenme.",
                "Sakarya Üniversitesi": "Üniversite döneminde yarı zamanlı çalışma. Akademik projeler ve araştırma deneyimi kazanma.",
            },
        },
        Exit: {
            items: [
                { label: "E-posta Adresi:", value: "[tunaykinici@gmail.com]", editable: false, highlighted: true },
                { label: "Konum:", value: "[İstanbul, Türkiye]", editable: false },
                { label: "LinkedIn:", value: "[linkedin.com/in/tunaykinici]", editable: false },
                { label: "GitHub:", value: "[github.com/tunaykinici]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Profesyonel Linkler:", value: "", expandable: true, editable: false },
                { label: "Portföy Sitesi:", value: "[tnyknc.github.io]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Müsaitlik:", value: "", expandable: true, editable: false },
                { label: "Mevcut Durum:", value: "[Aktif Çalışan]", editable: false },
                { label: "Tekliflere Açık:", value: "[Değerlendiririm]", editable: false },
                { label: "Tercih Edilen Rol:", value: "[Full Stack Developer]", editable: false },
                { label: "Uzaktan Çalışma:", value: "[Ofis/Hibrit/Uzaktan OK]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Uzmanlık Alanları:", value: "", expandable: true, editable: false },
                { label: "E-ticaret Sistemleri:", value: "[Uzman]", editable: false },
                { label: "Ödeme Entegrasyonu:", value: "[Uzman - POS Sistemleri]", editable: false },
                { label: "Lojistik Platformları:", value: "[İleri]", editable: false },
            ],
            help: {
                "E-posta Adresi": "Birincil iletişim kanalı. Profesyonel fırsatlar ve iş teklifleri için 7/24 aktif olarak kontrol ediliyor.",
                "LinkedIn": "Profesyonel network ve detaylı kariyer geçmişi. Önceki iş arkadaşları ve referanslarla bağlantı kurulabilir.",
                "Konum": "İstanbul, Türkiye'de ikamet. Türkiye genelinde uzaktan çalışma ve yurtdışı fırsatları değerlendirilebilir.",
                "GitHub": "Kod repository'leri ve açık kaynak katkıları. Teknik yetkinlik ve kod kalitesini değerlendirmek için ideal kaynak.",
                "Profesyonel Linkler": "Portföy sitesi ve profesyonel online varlık. Teknik yetkinlik ve proje örneklerini sergileme platformu.",
                "Portföy Sitesi": "Kişisel portföy sitesi. Proje örnekleri, teknik blog ve profesyonel deneyimlerin sergilendiği platform.",
                "Müsaitlik": "Şu anda aktif olarak çalışıyor ancak yeni fırsatları değerlendirmeye açık. Özellikle teknik liderlik rolleri ilgi alanında.",
                "Mevcut Durum": "T-Soft'ta aktif olarak çalışan. Yeni fırsatları değerlendirmeye açık ve kariyer gelişimi için hazır.",
                "Tekliflere Açık": "Yeni iş fırsatlarını değerlendirmeye açık. Özellikle teknik liderlik ve senior pozisyonlar ilgi alanında.",
                "Tercih Edilen Rol": "Full Stack Developer pozisyonları. Backend ve frontend teknolojilerinde deneyimli, proje yönetimi becerileri mevcut.",
                "Uzaktan Çalışma": "Ofis, hibrit ve uzaktan çalışma modellerine açık. Esnek çalışma saatleri ve modern iş ortamları tercih edilir.",
                "Uzmanlık Alanları": "E-ticaret sistemleri, ödeme entegrasyonları ve lojistik platformları konularında derin uzmanlık. B2B sistemlerde deneyimli.",
                "E-ticaret Sistemleri": "Büyük ölçekli e-ticaret platformları geliştirme. Magento, WooCommerce ve custom e-ticaret çözümleri deneyimi.",
                "Ödeme Entegrasyonu": "Sanal POS sistemleri, ödeme gateway'leri ve güvenli ödeme işlemleri. Türkiye'nin önde gelen POS sağlayıcıları ile entegrasyon.",
                "Lojistik Platformları": "Kargo takip sistemleri, depo yönetimi ve lojistik optimizasyon platformları. Gerçek zamanlı takip ve raporlama sistemleri.",
            },
        },
    },
    EN: {
        Main: {
            items: [
                { label: "Full Name:", value: "[Tunay Kınıcı]", editable: false, highlighted: true },
                { label: "Birth Date:", value: "[09.11.1995]", editable: false },
                { label: "Location:", value: "[Istanbul, Turkey]", editable: false },
                { label: "Nationality:", value: "[Republic of Turkey]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "High School:", value: "[Silivri YSM Technical High School]", expandable: true, editable: false },
                { label: "Field:", value: "[Information Technologies]", expandable: true, editable: false },
                { label: "Branch:", value: "[Database Programming]", expandable: true, editable: false },
                { label: "", value: "", spacer: true },
                { label: "University:", value: "[Sakarya University]", expandable: true, editable: false },
                { label: "Department:", value: "[Computer Engineering]", expandable: true, editable: false },
                { label: "Degree:", value: "[Bachelor's]", expandable: true, editable: false },
                { label: "", value: "", spacer: true },
                { label: "Languages:", value: "", expandable: true, editable: false },
                { label: "English:", value: "[B2]", editable: false },
                { label: "German:", value: "[A1]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Experience:", value: "6+ Years", editable: false },
                { label: "Status:", value: "[Available]", editable: false },
                { label: "Position:", value: "[Full Stack Developer]", editable: false },
            ],
            help: {
                "Full Name": "Tunay Kınıcı - Experienced Full Stack Developer. Expert in e-commerce, payment systems and logistics software architecture.",
                "Birth Date": "Born November 9, 1995 in Zonguldak. 29 years old, 6+ years experience in software industry.",
                "High School": "Graduated from Silivri Yusuf Sarıbekir Vocational and Technical Anatolian High School - Database Programming branch in Information Technologies field.",
                "University": "Bachelor's degree graduate from Sakarya University Computer Engineering department. Strong technical foundation and theoretical knowledge.",
                "English": "B2 level English - Sufficient level for technical documentation reading, international projects and team collaboration.",
                "German": "A1 level German - Basic level, continuing to learn. Being developed for opportunities in Germany.",
                "Experience": "Active software development since 2018. Progressed from intern level to software specialist level.",
            },
        },
        Advanced: {
            items: [
                { label: "Backend Technologies:", value: "", expandable: true, editable: false, highlighted: true },
                { label: "PHP (Laravel):", value: "[Expert - MVC, ORM, API]", editable: false },
                { label: "Node.js:", value: "[Advanced - Express, WebSocket]", editable: false },
                { label: "Python:", value: "[Intermediate - Django, Flask]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Frontend Technologies:", value: "", expandable: true, editable: false },
                { label: "React.js:", value: "[Advanced - Hooks, Context, Redux]", editable: false },
                { label: "Next.js:", value: "[Advanced - SSR, SSG, App Router]", editable: false },
                { label: "Vue.js:", value: "[Advanced - Router, Vuex]", editable: false },
                { label: "Nuxt.js:", value: "[Advanced - SSR, Static]", editable: false },
                { label: "JavaScript ES6+:", value: "[Expert - Async, DOM]", editable: false },
                { label: "HTML5/CSS3:", value: "[Expert - Responsive]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Database Management:", value: "", expandable: true, editable: false },
                { label: "PostgreSQL:", value: "[Expert - Modeling, Optimization]", editable: false },
                { label: "MySQL:", value: "[Advanced - Queries, Backup]", editable: false },
                { label: "MongoDB:", value: "[Intermediate - NoSQL]", editable: false },
                { label: "Redis:", value: "[Intermediate - Caching]", editable: false },
            ],
            help: {
                "Backend Technologies": "Strong backend development experience. Working with Laravel for enterprise projects, API development, and database integration.",
                "PHP (Laravel)": "Expertise in MVC architecture, Eloquent ORM, middleware usage, API development, and writing tests with PHPUnit.",
                "Node.js": "RESTful API development with Express.js framework, real-time applications with WebSocket, and event-driven programming experience.",
                "Python": "Web application development with Django and Flask frameworks. Data science and automation script writing experience.",
                "Frontend Technologies": "Developing user-friendly interfaces with modern frontend technologies. Experience with component-based architecture and state management.",
                "React.js": "Developing modern web applications with React Hooks, Context API, and Redux. Component-based architecture and state management experience.",
                "Next.js": "Building performant web applications with Next.js using server-side rendering, static site generation, and App Router.",
                "Vue.js": "Developing large-scale single page applications with Vue Router and Vuex. Component-based architecture and reactive programming.",
                "Nuxt.js": "Universal web application development with Vue.js-based SSR framework. SEO optimization and static site generation.",
                "JavaScript ES6+": "Modern JavaScript features with async/await, destructuring, modules, and DOM manipulation. ES6+ syntax and best practices.",
                "HTML5/CSS3": "Semantic HTML5 structure, responsive design, CSS Grid, Flexbox, and modern CSS features for user-friendly interfaces.",
                "Database Management": "Experience working with relational and NoSQL databases. Experience with large data operations, optimization, and performance tuning.",
                "PostgreSQL": "Experienced in advanced data modeling, indexing, query optimization, and database performance tuning.",
                "MySQL": "Relational database management, query optimization, backup strategies, and performance tuning experience.",
                "MongoDB": "NoSQL database experience. Document-based data modeling, aggregation pipelines, and scalable data structures.",
                "Redis": "In-memory database and caching solutions. Session management, cache strategies, and performance optimization.",
            },
        },
        Security: {
            items: [
                { label: "Leadership Experience:", value: "", expandable: true, editable: false, highlighted: true },
                { label: "Community President:", value: "[Open Source Community]", editable: false },
                { label: "Duration:", value: "[2017-2018]", editable: false },
                { label: "Role:", value: "[President - Leadership]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Security & Quality:", value: "", expandable: true, editable: false },
                { label: "Web Security:", value: "[XSS, CSRF, SQL Injection]", editable: false },
                { label: "Authentication:", value: "[OAuth, JWT]", editable: false },
                { label: "Data Encryption:", value: "[SSL/TLS, AES]", editable: false },
                { label: "Testing:", value: "[PHPUnit, Jest, PyTest]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "DevOps & Cloud:", value: "", expandable: true, editable: false },
                { label: "Docker:", value: "[Container, Compose, CI/CD]", editable: false },
                { label: "Kubernetes:", value: "[Orchestration, Scaling]", editable: false },
                { label: "AWS:", value: "[EC2, S3, Lambda, RDS]", editable: false },
                { label: "CI/CD Tools:", value: "[Jenkins, GitLab CI]", editable: false },
            ],
            help: {
                "Leadership Experience": "Community president during university years. Experience in team management, project coordination, and technical mentoring.",
                "Community President": "Managed software development projects and developed teamwork skills as community president between 2017-2018.",
                "Duration": "Community presidency between 2017-2018. Period of gaining team management and project coordination experience.",
                "Role": "Leadership and management experience as community president. Developing teamwork and project coordination skills.",
                "Security & Quality": "Preventing security vulnerabilities, secure coding practices, and test-driven development approach.",
                "Web Security": "Protection against common security vulnerabilities like XSS, CSRF, and SQL Injection. Secure API development practices.",
                "Authentication": "OAuth 2.0, JWT token management, SSO integrations, and secure user authentication systems.",
                "Data Encryption": "SSL/TLS protocols, AES encryption, hash functions, and secure data storage methods.",
                "Testing": "Unit testing, integration testing, and automated testing with PHPUnit, Jest, PyTest. Test-driven development approach.",
                "DevOps & Cloud": "Developing scalable applications with modern deployment strategies, container technologies, and cloud platforms.",
                "Docker": "Creating containers, multi-service applications with Docker Compose, and Docker integration in CI/CD pipelines.",
                "Kubernetes": "Container orchestration, auto-scaling, service mesh, and cloud-native application deployment strategies.",
                "AWS": "Cloud-based solutions and serverless architecture experience with AWS services like EC2, S3, Lambda, RDS.",
                "CI/CD Tools": "Setting up and managing continuous integration and continuous deployment pipelines with Jenkins, GitLab CI.",
            },
        },
        Boot: {
            items: [
                { label: "Current Position:", value: "[T-Soft - Software Specialist]", editable: false, highlighted: true },
                { label: "Current Period:", value: "[October 2025 - Present]", editable: false },
                { label: "Previous Period:", value: "[February 2021 - February 2025]", editable: false },
                { label: "Current Project:", value: "[Cargong - Logistics Platform]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Important Projects:", value: "", expandable: true, editable: false },
                { label: "Tahsildar B2B:", value: "[B2B & Virtual POS System - Full Stack]", editable: false },
                { label: "Cargong Platform:", value: "[Logistics Management - Full Stack]", editable: false },
                { label: "Technology Stack:", value: "[Laravel, Vue.js, PostgreSQL]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Work History:", value: "", expandable: true, editable: false },
                { label: "T-Soft:", value: "[Software Specialist - 4+ years]", editable: false },
                { label: "Yelkenci Group:", value: "[Software Developer - 1.5 years]", editable: false },
                { label: "Portakal Teknoloji:", value: "[Intern - 1 month]", editable: false },
                { label: "Sakarya University:", value: "[Part-time - 1 year]", editable: false },
            ],
            help: {
                "Current Position": "Working as a Software Specialist at T-Soft. Returned to the company after completing military service to continue active participation in projects.",
                "Current Project": "Active full stack development on the Cargong logistics and cargo management platform. Vue.js and Laravel technologies are used.",
                "Current Period": "Active work at T-Soft since October 2025. Returned to the company after completing military service to continue career development.",
                "Previous Period": "Worked as a software specialist at T-Soft between February 2021 - February 2025. Temporary leave due to military service.",
                "Tahsildar B2B": "B2B e-commerce platform with multiple virtual POS integration. Integrated with Turkey's leading POS providers, successfully sold to a foreign company.",
                "Cargong Platform": "Platform digitizing logistics processes. Real-time tracking, optimization, and management features. Full stack development.",
                "Technology Stack": "Modern web application development with Laravel, Vue.js, PostgreSQL technology stack. Full stack development experience.",
                "Work History": "Continuous career development since 2018. Progressed from intern level to software specialist position.",
                "T-Soft": "Specialization in e-commerce, payment systems, and logistics. Project management and technical leadership experience gained.",
                "Yelkenci Group": "Worked as a software developer for 1.5 years. Web application and e-commerce system development experience.",
                "Portakal Teknoloji": "Worked as an intern for 1 month. First professional experience and learning software development processes.",
                "Sakarya University": "Part-time work during university years. Gaining academic project and research experience.",
            },
        },
        Exit: {
            items: [
                { label: "Email Address:", value: "[tunaykinici@gmail.com]", editable: false, highlighted: true },
                { label: "Location:", value: "[Istanbul, Turkey]", editable: false },
                { label: "LinkedIn:", value: "[linkedin.com/in/tunaykinici]", editable: false },
                { label: "GitHub:", value: "[github.com/tunaykinici]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Professional Links:", value: "", expandable: true, editable: false },
                { label: "Portfolio Website:", value: "[In Progress]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Availability:", value: "", expandable: true, editable: false },
                { label: "Current Status:", value: "[Active Employee]", editable: false },
                { label: "Open to Offers:", value: "[Considering]", editable: false },
                { label: "Preferred Role:", value: "[Full Stack Developer]", editable: false },
                { label: "Remote Work:", value: "[Office/Hybrid/Remote OK]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Areas of Expertise:", value: "", expandable: true, editable: false },
                { label: "E-commerce Systems:", value: "[Expert]", editable: false },
                { label: "Payment Integration:", value: "[Expert - POS Systems]", editable: false },
                { label: "Logistics Platforms:", value: "[Advanced]", editable: false },
            ],
            help: {
                "Email Address": "Primary contact channel. Actively monitored for professional opportunities and job offers 24/7.",
                "LinkedIn": "Professional network and detailed career history. Connections can be made with previous colleagues and references.",
                "GitHub": "Code repositories and open source contributions. Ideal source for evaluating technical skills and code quality.",
                "Availability": "Currently active but open to new opportunities. Particularly interested in technical leadership roles.",
                "Areas of Expertise": "Deep specialization in e-commerce systems, payment integrations, and logistics platforms. Experienced in B2B systems.",
            },
        },
    },
    DE: {
        Main: {
            items: [
                { label: "Vollständiger Name:", value: "[Tunay Kınıcı]", editable: false, highlighted: true },
                { label: "Geburtsdatum:", value: "[09.11.1995]", editable: false },
                { label: "Standort:", value: "[Istanbul, Türkei]", editable: false },
                { label: "Staatsangehörigkeit:", value: "[Republik Türkei]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Gymnasium:", value: "[Silivri YSM Technisches Gymnasium]", expandable: true, editable: false },
                { label: "Bereich:", value: "[Informationstechnologien]", expandable: true, editable: false },
                { label: "Zweig:", value: "[Datenbankprogrammierung]", expandable: true, editable: false },
                { label: "", value: "", spacer: true },
                { label: "Universität:", value: "[Sakarya Universität]", expandable: true, editable: false },
                { label: "Abteilung:", value: "[Informatik]", expandable: true, editable: false },
                { label: "Abschluss:", value: "[Bachelor]", expandable: true, editable: false },
                { label: "", value: "", spacer: true },
                { label: "Sprachen:", value: "", expandable: true, editable: false },
                { label: "Englisch:", value: "[B2]", editable: false },
                { label: "Deutsch:", value: "[A1]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Erfahrung:", value: "6+ Jahre", editable: false },
                { label: "Status:", value: "[Verfügbar]", editable: false },
                { label: "Position:", value: "[Full Stack Entwickler]", editable: false },
            ],
            help: {
                "Vollständiger Name": "Tunay Kınıcı - Erfahrener Full Stack Entwickler. Experte für E-Commerce, Zahlungssysteme und Logistiksoftware-Architektur.",
                "Geburtsdatum": "Geboren am 9. November 1995 in Zonguldak. 29 Jahre alt, 6+ Jahre Erfahrung in der Softwarebranche.",
                "Gymnasium": "Abschluss an der Silivri Yusuf Sarıbekir Berufs- und Technischen Anatolischen Hochschule - Datenbankprogrammierung im Bereich Informationstechnologien.",
                "Universität": "Bachelor-Abschluss an der Sakarya Universität, Abteilung Informatik. Starke technische Grundlage und theoretisches Wissen.",
                "Englisch": "B2-Level Englisch - Ausreichendes Niveau für technische Dokumentation, internationale Projekte und Teamarbeit.",
                "Deutsch": "A1-Level Deutsch - Grundniveau, lerne weiter. Wird für Möglichkeiten in Deutschland entwickelt.",
                "Erfahrung": "Aktive Softwareentwicklung seit 2018. Fortschritt vom Praktikanten-Level zum Software-Spezialisten-Level.",
            },
        },
        Advanced: {
            items: [
                { label: "Backend Technologien:", value: "", expandable: true, editable: false, highlighted: true },
                { label: "PHP (Laravel):", value: "[Experte - MVC, ORM, API]", editable: false },
                { label: "Node.js:", value: "[Fortgeschritten - Express, WebSocket]", editable: false },
                { label: "Python:", value: "[Mittel - Django, Flask]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Frontend Technologien:", value: "", expandable: true, editable: false },
                { label: "React.js:", value: "[Fortgeschritten - Hooks, Context, Redux]", editable: false },
                { label: "Next.js:", value: "[Fortgeschritten - SSR, SSG, App Router]", editable: false },
                { label: "Vue.js:", value: "[Fortgeschritten - Router, Vuex]", editable: false },
                { label: "Nuxt.js:", value: "[Fortgeschritten - SSR, Static]", editable: false },
                { label: "JavaScript ES6+:", value: "[Experte - Async, DOM]", editable: false },
                { label: "HTML5/CSS3:", value: "[Experte - Responsive]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Datenbankverwaltung:", value: "", expandable: true, editable: false },
                { label: "PostgreSQL:", value: "[Experte - Modellierung, Optimierung]", editable: false },
                { label: "MySQL:", value: "[Fortgeschritten - Abfragen, Sicherung]", editable: false },
                { label: "MongoDB:", value: "[Mittel - NoSQL]", editable: false },
                { label: "Redis:", value: "[Mittel - Cache]", editable: false },
            ],
            help: {
                "Backend Technologien": "Starke Erfahrung im Backend-Entwickeln. Arbeit mit Laravel für Unternehmensprojekte, API-Entwicklung und Datenbankintegration.",
                "PHP (Laravel)": "Erfahrung mit MVC-Architektur, Eloquent ORM, Middleware-Verwendung, API-Entwicklung und Testentwicklung mit PHPUnit.",
                "Node.js": "RESTful API-Entwicklung mit Express.js-Framework, Echtzeit-Anwendungen mit WebSocket und Event-Driven Programming-Erfahrung.",
                "Python": "Webanwendungsentwicklung mit Django und Flask-Frameworks. Data Science und Automatisierungsskript-Erfahrung.",
                "Frontend Technologien": "Entwicklung benutzerfreundlicher Oberflächen mit modernen Frontend-Technologien. Erfahrung mit Komponentenbasierten Architekturen und State-Management.",
                "React.js": "Entwicklung moderner Webanwendungen mit React Hooks, Context API und Redux. Komponentenbasierte Architektur und State-Management-Erfahrung.",
                "Next.js": "Entwicklung performanter Webanwendungen mit Next.js unter Verwendung von Server-Side Rendering, Static Site Generation und App Router.",
                "Vue.js": "Entwicklung großer Single-Page-Anwendungen mit Vue Router und Vuex. Komponentenbasierte Architektur und Reaktives Programmieren.",
                "Nuxt.js": "Universelle Webanwendungsentwicklung mit Vue.js-basiertem SSR-Framework. SEO-Optimierung und Static Site Generation.",
                "JavaScript ES6+": "Moderne JavaScript-Funktionen mit async/await, Destructuring, Modulen und DOM-Manipulation. ES6+ Syntax und Best Practices.",
                "HTML5/CSS3": "Semantische HTML5-Struktur, responsives Design, CSS Grid, Flexbox und moderne CSS-Funktionen für benutzerfreundliche Oberflächen.",
                "Datenbankverwaltung": "Erfahrung mit relationalen und NoSQL-Datenbanken. Erfahrung mit großen Datenoperationen, Optimierung und Leistungsoptimierung.",
                "PostgreSQL": "Experiencierte in fortgeschrittener Datenmodellierung, Indizierung, Abfrageoptimierung und Datenbankleistungsoptimierung.",
                "MySQL": "Relationale Datenbankverwaltung, Abfrageoptimierung, Sicherungsstrategien und Leistungsoptimierungserfahrung.",
                "MongoDB": "NoSQL-Datenbankerfahrung. Dokumentenbasierte Datenmodellierung, Aggregations-Pipelines und skalierbare Datenstrukturen.",
                "Redis": "In-Memory-Datenbank und Caching-Lösungen. Session-Management, Cache-Strategien und Leistungsoptimierung.",
            },
        },
        Security: {
            items: [
                { label: "Führungserfahrung:", value: "", expandable: true, editable: false, highlighted: true },
                { label: "Gemeinschafts-Präsident:", value: "[Open Source Community]", editable: false },
                { label: "Dauer:", value: "[2017-2018]", editable: false },
                { label: "Rolle:", value: "[Präsident - Führung]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Sicherheit & Qualität:", value: "", expandable: true, editable: false },
                { label: "Web-Sicherheit:", value: "[XSS, CSRF, SQL Injection]", editable: false },
                { label: "Authentifizierung:", value: "[OAuth, JWT]", editable: false },
                { label: "Datenverschlüsselung:", value: "[SSL/TLS, AES]", editable: false },
                { label: "Tests:", value: "[PHPUnit, Jest, PyTest]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "DevOps & Cloud:", value: "", expandable: true, editable: false },
                { label: "Docker:", value: "[Container, Compose, CI/CD]", editable: false },
                { label: "Kubernetes:", value: "[Orchestration, Skalierung]", editable: false },
                { label: "AWS:", value: "[EC2, S3, Lambda, RDS]", editable: false },
                { label: "CI/CD-Tools:", value: "[Jenkins, GitLab CI]", editable: false },
            ],
            help: {
                "Führungserfahrung": "Gemeinschafts-Präsident während des Studiums. Erfahrung in Teamführung, Projektkoordination und technischem Mentoring.",
                "Gemeinschafts-Präsident": "Verwaltete Softwareentwicklungsprojekte und entwickelte Teamarbeit und Führungsfähigkeiten als Gemeinschafts-Präsident zwischen 2017-2018.",
                "Dauer": "Gemeinschafts-Präsidentschaft zwischen 2017-2018. Zeitraum des Erwerbs von Teamführung und Projektkoordinationserfahrung.",
                "Rolle": "Führungs- und Managementerfahrung als Gemeinschafts-Präsident. Entwicklung von Teamarbeit und Projektkoordinationsfähigkeiten.",
                "Sicherheit & Qualität": "Vorbeugung von Sicherheitslücken, sicheres Codieren und Test-getriebenes Entwickeln.",
                "Web-Sicherheit": "Schutz gegen häufige Sicherheitslücken wie XSS, CSRF und SQL Injection. Sichere API-Entwicklungspraktiken.",
                "Authentifizierung": "OAuth 2.0, JWT-Token-Management, SSO-Integrationen und sichere Benutzerauthentifizierungssysteme.",
                "Datenverschlüsselung": "SSL/TLS-Protokolle, AES-Verschlüsselung, Hash-Funktionen und sichere Datenspeichermethoden.",
                "Tests": "Unit-Tests, Integrationstests und automatisierte Tests mit PHPUnit, Jest, PyTest. Test-getriebene Entwicklungsansatz.",
                "DevOps & Cloud": "Entwicklung skalierbarer Anwendungen mit modernen Deployment-Strategien, Container-Technologien und Cloud-Plattformen.",
                "Docker": "Erstellung von Containern, Multi-Service-Anwendungen mit Docker Compose und Docker-Integration in CI/CD-Pipelines.",
                "Kubernetes": "Container-Orchestrierung, Auto-Scaling, Service Mesh und Cloud-Native-Anwendungs-Deployment-Strategien.",
                "AWS": "Cloud-basierte Lösungen und Serverless-Architektur-Erfahrung mit AWS-Services wie EC2, S3, Lambda, RDS.",
                "CI/CD-Tools": "Einrichtung und Verwaltung von Continuous Integration und Continuous Deployment-Pipelines mit Jenkins, GitLab CI.",
            },
        },
        Boot: {
            items: [
                { label: "Aktuelle Position:", value: "[T-Soft - Software-Spezialist]", editable: false, highlighted: true },
                { label: "Aktuelle Periode:", value: "[Oktober 2025 - Gegenwart]", editable: false },
                { label: "Vorherige Periode:", value: "[Februar 2021 - Februar 2025]", editable: false },
                { label: "Aktuelles Projekt:", value: "[Cargong - Logistikplattform]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Wichtige Projekte:", value: "", expandable: true, editable: false },
                { label: "Tahsildar B2B:", value: "[B2B & Virtuelles POS-System - Vollständiger Stapel]", editable: false },
                { label: "Cargong-Plattform:", value: "[Logistikverwaltung - Vollständiger Stapel]", editable: false },
                { label: "Technologiestapel:", value: "[Laravel, Vue.js, PostgreSQL]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Berufsgeschichte:", value: "", expandable: true, editable: false },
                { label: "T-Soft:", value: "[Software-Spezialist - 4+ Jahre]", editable: false },
                { label: "Yelkenci Group:", value: "[Software-Entwickler - 1.5 Jahre]", editable: false },
                { label: "Portakal Teknoloji:", value: "[Praktikant - 1 Monat]", editable: false },
                { label: "Sakarya Universität:", value: "[Teilzeit - 1 Jahr]", editable: false },
            ],
            help: {
                "Aktuelle Position": "Arbeite als Software-Spezialist bei T-Soft. Rückkehr zum Unternehmen nach Abschluss der Militärzeit zur Fortsetzung der aktiven Projektbeteiligung.",
                "Aktuelle Periode": "Aktive Arbeit bei T-Soft seit Oktober 2025. Rückkehr zum Unternehmen nach Abschluss der Militärzeit zur Fortsetzung der Karriereentwicklung.",
                "Vorherige Periode": "Arbeit als Software-Spezialist bei T-Soft zwischen Februar 2021 - Februar 2025. Vorübergehende Abwesenheit aufgrund der Militärzeit.",
                "Aktuelles Projekt": "Aktive vollständige Stack-Entwicklung auf der Cargong-Logistik- und Lagerverwaltungsplattform. Vue.js und Laravel-Technologien werden verwendet.",
                "Tahsildar B2B": "B2B E-Commerce-Plattform mit mehrfacher virtueller POS-Integration. Integriert mit führenden türkischen POS-Anbietern, erfolgreich an eine ausländische Firma verkauft.",
                "Cargong-Plattform": "Plattform, die Lagerprozesse digitalisiert. Real-time-Tracking, Optimierung und Verwaltungsfunktionen. Vollständige Stack-Entwicklung.",
                "Technologiestapel": "Moderne Webanwendungsentwicklung mit Laravel, Vue.js, PostgreSQL-Technologiestapel. Vollständige Stack-Entwicklungserfahrung.",
                "Berufsgeschichte": "Fortlaufende Karriereentwicklung seit 2018. Fortschritt vom Praktikanten-Level zum Software-Spezialisten-Level.",
                "T-Soft": "Spezialisierung in E-Commerce, Zahlungssystemen und Logistik. Projektmanagement und technische Führungserfahrung erworben.",
                "Yelkenci Group": "Arbeit als Software-Entwickler für 1.5 Jahre. Webanwendungs- und E-Commerce-Systementwicklungserfahrung.",
                "Portakal Teknoloji": "Arbeit als Praktikant für 1 Monat. Erste professionelle Erfahrung und Lernen von Softwareentwicklungsprozessen.",
                "Sakarya Universität": "Teilzeitarbeit während der Universitätsjahre. Erwerb von akademischen Projekt- und Forschungserfahrungen.",
            },
        },
        Exit: {
            items: [
                { label: "E-Mail-Adresse:", value: "[tunaykinici@gmail.com]", editable: false, highlighted: true },
                { label: "Standort:", value: "[Istanbul, Türkei]", editable: false },
                { label: "LinkedIn:", value: "[linkedin.com/in/tunaykinici]", editable: false },
                { label: "GitHub:", value: "[github.com/tunaykinici]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Berufliche Links:", value: "", expandable: true, editable: false },
                { label: "Portfolio-Website:", value: "[In Bearbeitung]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Verfügbarkeit:", value: "", expandable: true, editable: false },
                { label: "Aktueller Status:", value: "[Aktiver Mitarbeiter]", editable: false },
                { label: "Offen für Angebote:", value: "[Betrachte]", editable: false },
                { label: "Vorgezogene Rolle:", value: "[Full Stack Entwickler]", editable: false },
                { label: "Remote-Arbeit:", value: "[Büro/Hybrid/Remote OK]", editable: false },
                { label: "", value: "", spacer: true },
                { label: "Spezialgebiete:", value: "", expandable: true, editable: false },
                { label: "E-Commerce-Systeme:", value: "[Experte]", editable: false },
                { label: "Zahlungsentwicklung:", value: "[Experte - POS-Systeme]", editable: false },
                { label: "Logistikplattformen:", value: "[Fortgeschritten]", editable: false },
            ],
            help: {
                "E-Mail-Adresse": "Primäres Kontaktmittel. Aktiv überwacht für professionelle Möglichkeiten und Jobangebote 24/7.",
                "Standort": "Wohnsitz in Istanbul, Türkei. Remote-Arbeit in der gesamten Türkei und Auslandsmöglichkeiten können bewertet werden.",
                "LinkedIn": "Professionelles Netzwerk und detaillierte Karrieregeschichte. Verbindungen können mit früheren Kollegen und Referenzen hergestellt werden.",
                "Berufliche Links": "Portfolio-Website und professionelle Online-Präsenz. Plattform zur Ausstellung technischer Fähigkeiten und Projektbeispiele.",
                "Portfolio-Website": "Persönliche Portfolio-Website. Plattform zur Ausstellung von Projektbeispielen, technischem Blog und professionellen Erfahrungen.",
                "Verfügbarkeit": "Aktuell aktiv, aber offen für neue Möglichkeiten. Besonders interessiert an technischen Führungsrollen.",
                "Aktueller Status": "Aktiver Mitarbeiter bei T-Soft. Offen für neue Möglichkeiten und bereit für Karriereentwicklung.",
                "Offen für Angebote": "Offen für neue Jobmöglichkeiten. Besonders interessiert an technischen Führungs- und Senior-Positionen.",
                "Vorgezogene Rolle": "Full Stack Developer-Positionen. Erfahrung in Backend- und Frontend-Technologien, Projektmanagement-Fähigkeiten vorhanden.",
                "Remote-Arbeit": "Offen für Büro-, Hybrid- und Remote-Arbeitsmodelle. Flexible Arbeitszeiten und moderne Arbeitsumgebungen bevorzugt.",
                "Spezialgebiete": "Tiefes Spezialisierung in E-Commerce-Systemen, Zahlungsentwicklungen und Logistikplattformen. Erfahrung in B2B-Systemen.",
                "E-Commerce-Systeme": "Entwicklung groß angelegter E-Commerce-Plattformen. Erfahrung mit Magento, WooCommerce und benutzerdefinierten E-Commerce-Lösungen.",
                "Zahlungsentwicklung": "Virtuelle POS-Systeme, Zahlungs-Gateways und sichere Zahlungsverarbeitung. Integration mit führenden türkischen POS-Anbietern.",
                "Logistikplattformen": "Kargo-Tracking-Systeme, Lagerverwaltung und Logistik-Optimierungsplattformen. Echtzeit-Tracking und Berichtssysteme.",
            },
        },
    },
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set initial selected item
    const currentData = cvData[currentLanguage][selectedTab];
    const firstItem = currentData.items.find(item => !item.spacer);
    selectedItem = firstItem ? firstItem.label : '';
    
    // Render initial state
    renderCV();
    updateTranslations();
    
    // Add event listeners
    addEventListeners();
}

function addEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            selectTab(tab);
        });
    });
    
    // Language dropdown
    document.getElementById('language-btn').addEventListener('click', toggleLanguageDropdown);
    
    // Language options
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.dataset.lang;
            selectLanguage(lang);
        });
    });
    

    
    // Click outside to close dropdown
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-dropdown')) {
            showLanguageDropdown = false;
            updateLanguageDropdown();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
    // Check for Konami code
    checkKonamiCode(e.key);
    
    // Prevent default for function keys and navigation keys
    if (e.key.startsWith('F') && e.key !== 'F5') {
        e.preventDefault();
    }
    
    // Prevent default for arrow keys to avoid browser navigation
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
    }
    
    switch (e.key) {
        case "F1":
            e.preventDefault();
            showHelp();
            break;
        case "F2":
            e.preventDefault();
            nextLanguage();
            break;

        case "F4":
            e.preventDefault();
            toggleMatrixMode();
            break;
        case "F9":
            e.preventDefault();
            window.print();
            break;
        case "F10":
            e.preventDefault();
            window.open("mailto:tunaykinici@gmail.com", "_blank");
            break;
        case "ArrowUp":
            e.preventDefault();
            navigateItems(-1);
            break;
        case "ArrowDown":
            e.preventDefault();
            navigateItems(1);
            break;
        case "ArrowLeft":
            e.preventDefault();
            navigateTabs(-1);
            break;
        case "ArrowRight":
            e.preventDefault();
            navigateTabs(1);
            break;
        case "Enter":
            e.preventDefault();
            showItemDetails();
            break;
        case "Escape":
            e.preventDefault();
            hideLanguageDropdown();
            if (matrixMode) {
                toggleMatrixMode();
            }
            break;
        case "Tab":
            e.preventDefault();
            navigateItems(1);
            break;
        case "m":
        case "M":
            if (e.ctrlKey && e.altKey) {
                e.preventDefault();
                toggleMatrixMode();
            }
            break;
    }
}

function selectTab(tab) {
    selectedTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update selected item to first non-spacer item
    const currentData = cvData[currentLanguage][tab];
    const firstItem = currentData.items.find(item => !item.spacer);
    selectedItem = firstItem ? firstItem.label : '';
    
    renderCV();
    updateHelp();
}



function updateSelection() {
    // Remove previous selection
    document.querySelectorAll('.cv-item').forEach(item => {
        item.classList.remove('highlighted');
    });
    
    // Add selection to current item
    document.querySelectorAll('.cv-item').forEach(item => {
        const label = item.querySelector('.cv-item-content span:last-child');
        if (label && label.textContent === selectedItem) {
            item.classList.add('highlighted');
        }
    });
}

function updateHelp() {
    const currentData = cvData[currentLanguage][selectedTab];
    const trans = translations[currentLanguage];
    // Remove colon from selectedItem for help lookup
    const cleanItem = selectedItem.replace(':', '');
    const helpContent = currentData.help[cleanItem] || trans.defaultHelp;
    
    const helpTitle = document.getElementById('help-title');
    const helpContentElement = document.getElementById('help-content');
    
    // Reset to normal state
    helpTitle.textContent = trans.tabHelp;
    helpTitle.style.color = ''; // Reset to default color
    helpContentElement.textContent = helpContent;
    helpContentElement.style.fontWeight = '';
}

function navigateItems(direction) {
    const currentData = cvData[currentLanguage][selectedTab];
    const nonSpacerItems = currentData.items.filter(item => !item.spacer);
    const currentIndex = nonSpacerItems.findIndex(item => item.label === selectedItem);
    
    if (currentIndex !== -1) {
        const newIndex = (currentIndex + direction + nonSpacerItems.length) % nonSpacerItems.length;
        selectedItem = nonSpacerItems[newIndex].label;
        updateSelection();
        updateHelp();
    }
}

function nextLanguage() {
    const languages = ['TR', 'EN', 'DE'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    selectLanguage(languages[nextIndex]);
}

function selectLanguage(lang) {
    currentLanguage = lang;
    showLanguageDropdown = false;
    
    // Update selected item to first non-spacer item in new language
    const currentData = cvData[lang][selectedTab];
    const firstItem = currentData.items.find(item => !item.spacer);
    selectedItem = firstItem ? firstItem.label : '';
    
    renderCV();
    updateTranslations();
    updateLanguageDropdown();
}

function toggleLanguageDropdown() {
    showLanguageDropdown = !showLanguageDropdown;
    updateLanguageDropdown();
}

function updateLanguageDropdown() {
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('hidden', !showLanguageDropdown);
}

function updateTranslations() {
    const trans = translations[currentLanguage];
    
    // Update header
    document.getElementById('header-text').textContent = trans.header;
    
    // Update help title
    document.getElementById('help-title').textContent = trans.tabHelp;
    
    // Update footer texts
    document.getElementById('help-text').textContent = trans.functionKeys.help;
    document.getElementById('navigate-text').textContent = trans.functionKeys.navigate;
    document.getElementById('tab-navigate-text').textContent = trans.functionKeys.tabs;
    document.getElementById('details-text').textContent = trans.functionKeys.details;
    document.getElementById('print-text').textContent = trans.functionKeys.print;
    document.getElementById('language-text').textContent = trans.functionKeys.language;
    document.getElementById('contact-text').textContent = trans.functionKeys.contact;
    
    // Update current language display
    document.getElementById('current-language').textContent = currentLanguage;
    

    
    // Update help content
    updateHelp();
}

// New keyboard shortcut functions
function navigateTabs(direction) {
    const tabs = ['Main', 'Advanced', 'Security', 'Boot', 'Exit'];
    const currentIndex = tabs.indexOf(selectedTab);
    const newIndex = (currentIndex + direction + tabs.length) % tabs.length;
    selectTab(tabs[newIndex]);
}

function showHelp() {
    const helpText = `
BIOS Utility - Enhanced Keyboard Shortcuts:

Navigation:
• ↑↓ Arrow Keys: Navigate between items
• ←→ Arrow Keys: Switch between tabs
• Tab: Next item
• Enter: Show item details

Function Keys:
• F1: Show this help
• F2: Toggle language dropdown
• F3: Focus search bar
• F4: Toggle Matrix Mode
• F9: Print
• F10: Send email



Easter Eggs:
• Konami Code: ↑↑↓↓←→←→BA
• Matrix Mode: Ctrl+Alt+M or F4



Current Language: ${currentLanguage}
Current Tab: ${selectedTab}
Selected Item: ${selectedItem}
Matrix Mode: ${matrixMode ? 'ON' : 'OFF'}
    `;
    
    alert(helpText);
}

function showItemDetails() {
    const currentData = cvData[currentLanguage][selectedTab];
    const trans = translations[currentLanguage];
    // Remove colon from selectedItem for help lookup
    const cleanItem = selectedItem.replace(':', '');
    const helpContent = currentData.help[cleanItem];
    
    if (helpContent) {
        // Show detailed information in the right panel
        const helpTitle = document.getElementById('help-title');
        const helpContentElement = document.getElementById('help-content');
        
        // Set title based on language
        let titleText = '';
        switch(currentLanguage) {
            case 'TR':
                titleText = `Sistem Bilgileri - ${selectedItem}`;
                break;
            case 'EN':
                titleText = `System Information - ${selectedItem}`;
                break;
            case 'DE':
                titleText = `Systeminformationen - ${selectedItem}`;
                break;
        }
        
        helpTitle.textContent = titleText;
        helpContentElement.textContent = helpContent;
        
        // Add visual feedback that detailed view is active
        helpTitle.style.color = '#00ff00'; // Green color to indicate active detail view
        helpContentElement.style.fontWeight = 'normal';
    } else {
        // Show default message if no detailed information available
        updateHelp();
    }
}

function hideLanguageDropdown() {
    showLanguageDropdown = false;
    updateLanguageDropdown();
}





// Notification System
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// Easter Eggs
function checkKonamiCode(key) {
    konamiSequence.push(key);
    if (konamiSequence.length > 10) {
        konamiSequence.shift();
    }
    
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    if (konamiSequence.join(',') === konamiCode.join(',')) {
        showKonamiEasterEgg();
        konamiSequence = [];
    }
}

function showKonamiEasterEgg() {
    const easterEgg = document.getElementById('konami-easter-egg');
    easterEgg.style.display = 'block';
    easterEgg.classList.add('bios-beep');
    
    setTimeout(() => {
        easterEgg.style.display = 'none';
        easterEgg.classList.remove('bios-beep');
    }, 3000);
}

function toggleMatrixMode() {
    matrixMode = !matrixMode;
    const container = document.getElementById('app');
    
    if (matrixMode) {
        container.classList.add('matrix-mode');
        document.getElementById('matrix-easter-egg').style.display = 'block';
        showNotification('🌌 Matrix Mode Aktif!');
    } else {
        container.classList.remove('matrix-mode');
        document.getElementById('matrix-easter-egg').style.display = 'none';
        showNotification('🌌 Matrix Mode Deaktif!');
    }
}



// Enhanced renderCV function
function renderCV() {
    const currentData = cvData[currentLanguage][selectedTab];
    const cvItemsContainer = document.getElementById('cv-items');
    cvItemsContainer.innerHTML = '';
    
    currentData.items.forEach(item => {
        if (item.spacer) {
            const spacerDiv = document.createElement('div');
            spacerDiv.className = 'cv-item spacer';
            cvItemsContainer.appendChild(spacerDiv);
            return;
        }
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cv-item';
        if (item.highlighted) itemDiv.classList.add('highlighted');
        if (item.editable) itemDiv.classList.add('editable');
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'cv-item-content';
        
        if (item.expandable) {
            const icon = document.createElement('span');
            icon.className = 'expandable-icon';
            icon.textContent = '▶';
            contentDiv.appendChild(icon);
        }
        
        const labelSpan = document.createElement('span');
        labelSpan.textContent = item.label;
        contentDiv.appendChild(labelSpan);
        
        const valueSpan = document.createElement('span');
        valueSpan.textContent = item.value;
        valueSpan.style.marginLeft = 'auto';
        valueSpan.style.marginRight = '1vw';
        
        itemDiv.appendChild(contentDiv);
        itemDiv.appendChild(valueSpan);
        
        itemDiv.addEventListener('click', () => {
            selectedItem = item.label;
            updateSelection();
            updateHelp();
        });
        
        cvItemsContainer.appendChild(itemDiv);
    });
    
    updateSelection();
} 