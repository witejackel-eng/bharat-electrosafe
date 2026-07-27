// Lightweight EN/HI language store for Bharat Electrosafe.
//
// This is NOT a full i18n rewrite — it powers a curated set of UI strings
// (header nav, hero copy, primary CTAs, section eyebrows) for a visible
// language toggle. The dictionary is intentionally small and inlined.
//
// Reactive subscription uses the same cached-raw + cached-parsed pattern
// as CookieConsent (src/components/ui-custom/CookieConsent.tsx) so that
// `useSyncExternalStore` always returns a STABLE reference when the
// underlying data has not changed (avoids the React infinite-loop warning:
// "getSnapshot should be cached").

export type Locale = 'en' | 'hi';

export const STORAGE_KEY = 'be-locale';
export const DEFAULT_LOCALE: Locale = 'en';

// Module-level cached state. Both `cachedRaw` (last raw string read from
// localStorage) and `cachedLocale` (parsed Locale) are kept in sync so the
// snapshot returned to React is referentially stable between renders when
// the underlying localStorage value has not changed.
let cachedLocale: Locale = DEFAULT_LOCALE;
let cachedRaw: string | null = null;
const listeners = new Set<() => void>();

function read(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): Locale {
  if (raw === 'en' || raw === 'hi') return raw;
  return DEFAULT_LOCALE;
}

// Re-read localStorage; if the raw value has not changed since the last call,
// do nothing (this is what keeps `useSyncExternalStore` happy). If it has
// changed, update both caches and notify every subscriber.
function refresh(): void {
  const raw = read();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedLocale = parse(raw);
    listeners.forEach((l) => l());
  }
}

export function subscribeLocale(cb: () => void): () => void {
  listeners.add(cb);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
    // Cross-tab updates arrive as `storage` events; in-tab updates are
    // announced via a custom `be:locale-change` event dispatched by setLocale.
    window.addEventListener('be:locale-change', onCustom);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('be:locale-change', onCustom);
    }
  };
}

function onStorage(e: StorageEvent): void {
  if (e.key === STORAGE_KEY) refresh();
}
function onCustom(): void {
  refresh();
}

// Snapshot for client — returns the cached Locale. Because we never reassign
// `cachedLocale` unless the raw string actually changed, this returns the
// same primitive across renders when nothing has changed.
export function getLocaleSnapshot(): Locale {
  return cachedLocale;
}

// Snapshot for SSR — always the default. Combined with the cached-raw pattern
// this prevents hydration mismatches: the server renders EN strings, and the
// client also renders EN strings on the very first render, then flips to the
// saved locale via the useSyncExternalStore subscription.
export function getLocaleServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  // Update caches eagerly so the next snapshot read returns the new value
  // without waiting for the storage event round-trip.
  cachedRaw = locale;
  cachedLocale = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* no-op: storage unavailable */
  }
  // Notify in-tab subscribers DIRECTLY. (The storage event does NOT fire in
  // the same tab that wrote the value, and our `refresh()` guard would
  // otherwise no-op because cachedRaw is already updated above — so we must
  // invoke listeners explicitly here, then ALSO dispatch the custom event
  // so any subscribers whose `onCustom` handler may have other side-effects
  // still receive it.)
  listeners.forEach((l) => l());
  window.dispatchEvent(new CustomEvent('be:locale-change'));
  // Keep <html lang> in sync for accessibility / SEO.
  document.documentElement.lang = locale === 'hi' ? 'hi' : 'en';
}

// Translation dictionary — curated subset of UI strings (NOT full app
// translation). Keys are namespaced by component/section (nav., hero., cta.,
// footer.) so the intent stays clear as the dictionary grows.
type Dict = Record<string, string>;

const en: Dict = {
  'nav.products': 'Products',
  'nav.proof': 'Proof',
  'nav.company': 'Company',
  'nav.quote': 'Request a Quote',
  'hero.eyebrow': 'IS 15652 Certified · Made in India',
  'hero.title':
    'Electrical insulating mats that protect every panel, every substation, every shift.',
  'hero.subtitle':
    "Bharat Electrosafe manufactures rubber insulating mats, visible-safety variants, geomembranes and water-stop profiles for India's electrical, utility and infrastructure projects.",
  'hero.cta.primary': 'Request a technical quote',
  'hero.cta.secondary': 'Explore product systems',
  'cta.quote': 'Request a Quote',
  'cta.call': 'Call technical sales',
  'cta.whatsapp': 'WhatsApp us',
  'footer.rights': 'All rights reserved.',
  'voltage.eyebrow': 'Voltage selector tool',
  'voltage.title': 'Find your insulation class in seconds.',
  'voltage.description':
    "Enter your highest operating voltage and instantly see the recommended insulating mat class, minimum thickness, and typical application. IS 15652 requires the mat's rated voltage to exceed your installation voltage.",
  'voltage.inputLabel': 'What is your highest operating voltage?',
  'voltage.placeholder': 'e.g. 6.6',
  'voltage.safetyNote':
    "⚠ Never use a mat rated below your installation's highest operating voltage. IS 15652 requires the mat's rated voltage to exceed the actual operating voltage.",
  'voltage.placeholderText': 'Enter your operating voltage above',
  'voltage.getQuote': 'Get quote',
  'voltage.classA': 'Class A — 3.3 kV',
  'voltage.classB': 'Class B — 11 kV',
  'voltage.classC': 'Class C — 33 kV',
  'voltage.classCustom': 'Custom Class — Above 33 kV',
  'voltage.thicknessA': 'Thickness: ≥ 2.0 mm',
  'voltage.thicknessB': 'Thickness: ≥ 2.5 mm',
  'voltage.thicknessC': 'Thickness: ≥ 3.0 mm',
  'voltage.thicknessCustom': 'Contact technical sales for specifications',
  'voltage.descA': 'For low-voltage distribution panels',
  'voltage.descB': 'For medium-voltage substations',
  'voltage.descC': 'For high-voltage switchyards',
  'voltage.descCustom': 'For ultra-high-voltage installations',
  'voltage.contactSales': 'Contact technical sales',
  'thickness.eyebrow': 'Thickness comparison',
  'thickness.title': 'See the difference in millimetres.',
  'thickness.description':
    'Insulating mat thickness increases with rated voltage class. Class A mats are ≥ 2.0 mm, Class B ≥ 2.5 mm, and Class C ≥ 3.0 mm — each increment provides greater dielectric protection for higher operating voltages.',
  'thickness.safetyNote':
    'IS 15652 specifies minimum thickness for each rated voltage class. Bharat Electrosafe manufactures each class at or above the minimum.',
};

const hi: Dict = {
  'nav.products': 'उत्पाद',
  'nav.proof': 'प्रमाण',
  'nav.company': 'कंपनी',
  'nav.quote': 'कोटेशन अनुरोध',
  'hero.eyebrow': 'IS 15652 प्रमाणित · भारत में निर्मित',
  'hero.title':
    'इलेक्ट्रिकल इंसुलेटिंग मैट्स जो हर पैनल, हर सबस्टेशन, हर शिफ्ट की रक्षा करते हैं।',
  'hero.subtitle':
    'भारत इलेक्ट्रोसेफ भारत की विद्युत, उपयोगिता और बुनियादी ढांचा परियोजनाओं के लिए रबर इंसुलेटिंग मैट, विजिबल-सेफ्टी वेरिएंट, जियोमेम्ब्रेन और वाटर-स्टॉप प्रोफाइल का निर्माण करता है।',
  'hero.cta.primary': 'तकनीकी कोटेशन अनुरोध',
  'hero.cta.secondary': 'उत्पाद सिस्टम देखें',
  'cta.quote': 'कोटेशन अनुरोध',
  'cta.call': 'तकनीकी बिक्री पर कॉल करें',
  'cta.whatsapp': 'हमें व्हाट्सएप करें',
  'footer.rights': 'सर्वाधिकार सुरक्षित।',
  'voltage.eyebrow': 'वोल्टेज चयन उपकरण',
  'voltage.title': 'सेकंड में अपना इंसुलेशन क्लास खोजें।',
  'voltage.description':
    'अपना उच्चतम चालू वोल्टेज दर्ज करें और तुरंत अनुशंसित इंसुलेटिंग मैट क्लास, न्यूनतम मोटाई और विशिष्ट अनुप्रयोग देखें। IS 15652 मैट की दर्ज वोल्टेज को आपके इंसुलेशन वोल्टेज से अधिक होने की आवश्यकता है।',
  'voltage.inputLabel': 'आपका उच्चतम चालू वोल्टेज क्या है?',
  'voltage.placeholder': 'उदा. 6.6',
  'voltage.safetyNote':
    '⚠ अपने इंसुलेशन के उच्चतम चालू वोल्टेज से नीचे दर्ज मैट का उपयोग कभी न करें। IS 15652 मैट की दर्ज वोल्टेज को वास्तविक चालू वोल्टेज से अधिक होने की आवश्यकता है।',
  'voltage.placeholderText': 'ऊपर अपना चालू वोल्टेज दर्ज करें',
  'voltage.getQuote': 'कोट प्राप्त करें',
  'voltage.classA': 'क्लास A — 3.3 kV',
  'voltage.classB': 'क्लास B — 11 kV',
  'voltage.classC': 'क्लास C — 33 kV',
  'voltage.classCustom': 'कस्टम क्लास — 33 kV से अधिक',
  'voltage.thicknessA': 'मोटाई: ≥ 2.0 mm',
  'voltage.thicknessB': 'मोटाई: ≥ 2.5 mm',
  'voltage.thicknessC': 'मोटाई: ≥ 3.0 mm',
  'voltage.thicknessCustom': 'विशिष्टताओं के लिए तकनीकी बिक्री से संपर्क करें',
  'voltage.descA': 'कम-वोल्टेज वितरण पैनल के लिए',
  'voltage.descB': 'मध्यम-वोल्टेज सबस्टेशन के लिए',
  'voltage.descC': 'उच्च-वोल्टेज स्विचयार्ड के लिए',
  'voltage.descCustom': 'अति-उच्च-वोल्टेज इंसुलेशन के लिए',
  'voltage.contactSales': 'तकनीकी बिक्री से संपर्क करें',
  'thickness.eyebrow': 'मोटाई तुलना',
  'thickness.title': 'मिलीमीटर में अंतर देखें।',
  'thickness.description':
    'इंसुलेटिंग मैट मोटाई दर्ज वोल्टेज क्लास के साथ बढ़ती है। क्लास A मैट ≥ 2.0 mm, क्लास B ≥ 2.5 mm, और क्लास C ≥ 3.0 mm — प्रत्येक वृद्धि उच्च चालू वोल्टेज के लिए अधिक डीलेक्ट्रिक सुरक्षा प्रदान करती है।',
  'thickness.safetyNote':
    'IS 15652 प्रत्येक दर्ज वोल्टेज क्लास के लिए न्यूनतम मोटाई निर्धारित करता है। भारत एलेक्ट्रोसेफ प्रत्येक क्लास न्यूनतम से अधिक या उसके बराबर निर्माण करता है।',
};

const DICTS: Record<Locale, Dict> = { en, hi };

// Translate a single key for the given locale (defaults to the current
// cached locale). Missing keys fall back to the key itself so missing
// translations are visible during development instead of crashing silently.
export function t(key: string, locale: Locale = cachedLocale): string {
  return DICTS[locale]?.[key] ?? key;
}
