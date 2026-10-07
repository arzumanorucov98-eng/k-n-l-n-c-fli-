// Site-wide constants
export const SITE_NAME = 'Dr. Könül Nəcəfli';
export const SITE_TITLE = 'Dr. Könül Nəcəfli - Nevroloq';
export const SITE_DESCRIPTION = 'Sinir sistemi xəstəliklərinin müasir yanaşmalarla diaqnostikası və müalicəsi. Peşəkar nevroloji xidmətlər.';
export const DOCTOR_NAME = 'Könül Nəcəfli';
export const DOCTOR_TITLE = 'Nevroloq';
export const DEFAULT_LOCALE = 'az';
export const SUPPORTED_LOCALES = ['az', 'ru'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Timezone
export const TIMEZONE = 'Asia/Baku';

// Appointment statuses
export const APPOINTMENT_STATUSES = {
  new: { label: 'Yeni', labelRu: 'Новый', color: 'info' },
  confirmed: { label: 'Təsdiqləndi', labelRu: 'Подтверждено', color: 'success' },
  waiting: { label: 'Gözləmədə', labelRu: 'В ожидании', color: 'warning' },
  cancelled: { label: 'Ləğv edildi', labelRu: 'Отменено', color: 'error' },
  completed: { label: 'Tamamlandı', labelRu: 'Завершено', color: 'success' },
} as const;

export type AppointmentStatus = keyof typeof APPOINTMENT_STATUSES;

// Location appointment statuses
export const LOCATION_STATUSES = {
  active: { label: 'Aktiv', labelRu: 'Активный' },
  upcoming: { label: 'Tezliklə', labelRu: 'Скоро' },
  inactive: { label: 'Aktiv deyil', labelRu: 'Неактивный' },
} as const;

// Days of week
export const DAYS_OF_WEEK = [
  { value: 0, label: 'Bazar', labelRu: 'Воскресенье', short: 'Bz' },
  { value: 1, label: 'Bazar ertəsi', labelRu: 'Понедельник', short: 'Be' },
  { value: 2, label: 'Çərşənbə axşamı', labelRu: 'Вторник', short: 'Ça' },
  { value: 3, label: 'Çərşənbə', labelRu: 'Среда', short: 'Ç' },
  { value: 4, label: 'Cümə axşamı', labelRu: 'Четверг', short: 'Ca' },
  { value: 5, label: 'Cümə', labelRu: 'Пятница', short: 'C' },
  { value: 6, label: 'Şənbə', labelRu: 'Суббота', short: 'Ş' },
] as const;

// Navigation links
export const NAV_LINKS = [
  { href: '/', label: 'Ana səhifə', labelRu: 'Главная' },
  { href: '/hekim-haqqinda', label: 'Həkim haqqında', labelRu: 'О враче' },
  { href: '/xidmetler', label: 'Xidmətlər', labelRu: 'Услуги' },
  { href: '/rayonlar', label: 'Rayonlar', labelRu: 'Районы' },
  { href: '/blog', label: 'Blog', labelRu: 'Блог' },
  { href: '/elaqe', label: 'Əlaqə', labelRu: 'Контакты' },
] as const;

// Footer links
export const FOOTER_LINKS = {
  main: [
    { href: '/', label: 'Ana səhifə', labelRu: 'Главная' },
    { href: '/hekim-haqqinda', label: 'Həkim haqqında', labelRu: 'О враче' },
    { href: '/xidmetler', label: 'Xidmətlər', labelRu: 'Услуги' },
    { href: '/blog', label: 'Blog', labelRu: 'Блог' },
    { href: '/videolar', label: 'Videolar', labelRu: 'Видео' },
    { href: '/rayonlar', label: 'Rayonlar', labelRu: 'Районы' },
    { href: '/elaqe', label: 'Əlaqə', labelRu: 'Контакты' },
  ],
  legal: [
    { href: '/gizlilik-siyaseti', label: 'Gizlilik Siyasəti', labelRu: 'Политика конфиденциальности' },
    { href: '/cerez-siyaseti', label: 'Çərəz Siyasəti', labelRu: 'Политика cookies' },
    { href: '/istifade-sertleri', label: 'İstifadə Şərtləri', labelRu: 'Условия использования' },
  ],
} as const;

// Blog categories
export const DEFAULT_BLOG_CATEGORIES = [
  { slug: 'nevroloji-saglamliq', name: 'Nevroloji sağlamlıq', nameRu: 'Неврологическое здоровье' },
  { slug: 'bas-agrisi', name: 'Baş ağrısı', nameRu: 'Головная боль' },
  { slug: 'migren', name: 'Miqren', nameRu: 'Мигрень' },
  { slug: 'bas-gicellenmesi', name: 'Başgicəllənmə', nameRu: 'Головокружение' },
  { slug: 'yuxu', name: 'Yuxu', nameRu: 'Сон' },
  { slug: 'sinir-sistemi', name: 'Sinir sistemi', nameRu: 'Нервная система' },
  { slug: 'saglam-heyat', name: 'Sağlam həyat', nameRu: 'Здоровый образ жизни' },
  { slug: 'hekim-meslehetleri', name: 'Həkim məsləhətləri', nameRu: 'Советы врача' },
] as const;

// Default services
export const DEFAULT_SERVICES = [
  { slug: 'nevroloji-muayine', title: 'Nevroloji müayinə', titleRu: 'Неврологическое обследование' },
  { slug: 'bas-agrilarinin-mualicesi', title: 'Baş ağrılarının müalicəsi', titleRu: 'Лечение головных болей' },
  { slug: 'migren', title: 'Miqren', titleRu: 'Мигрень' },
  { slug: 'bas-gicellenmesi', title: 'Başgicəllənmə', titleRu: 'Головокружение' },
  { slug: 'boyun-bel-agrilari', title: 'Boyun və bel ağrıları', titleRu: 'Боли в шее и пояснице' },
  { slug: 'yuxu-pozuntulari', title: 'Yuxu pozuntuları', titleRu: 'Нарушения сна' },
  { slug: 'sinir-sistemi-xestelikleri', title: 'Sinir sistemi xəstəlikləri', titleRu: 'Заболевания нервной системы' },
  { slug: 'diger-nevroloji-xidmetler', title: 'Digər nevroloji xidmətlər', titleRu: 'Другие неврологические услуги' },
] as const;

// Conversion event names for analytics
export const ANALYTICS_EVENTS = {
  reservationStarted: 'reservation_started',
  reservationCompleted: 'reservation_completed',
  phoneClick: 'phone_click',
  whatsappClick: 'whatsapp_click',
  contactFormSubmit: 'contact_form_submit',
  socialClick: 'social_click',
} as const;
