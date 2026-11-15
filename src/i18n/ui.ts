// Interface text for pages that exist in more than one language.
// Source names and links stay in English, because the sources themselves are in English.
export type Lang = 'en' | 'hi';

// Pages that have a Hindi version. Keys are English paths, values are Hindi paths.
export const HINDI_PAGES: Record<string, string> = {
  '/': '/hi/',
  '/celebrations/': '/hi/celebrations/',
  '/everyday/': '/hi/everyday/',
  '/problems/patriarchy/': '/hi/problems/patriarchy/',
};

export const NAV: Record<Lang, [string, string][]> = {
  en: [
    ['/', 'Home'],
    ['/problems/', 'Problems'],
    ['/solutions/', 'Solutions'],
    ['/celebrations/', 'Celebrations'],
    ['/everyday/', 'Living with less'],
    ['/resources/', 'Resources'],
    ['/search/', 'Search'],
    ['/about/', 'About'],
  ],
  hi: [
    ['/hi/', 'होम'],
    ['/problems/', 'समस्याएँ (English)'],
    ['/hi/celebrations/', 'उत्सव'],
    ['/hi/everyday/', 'कम में जीना'],
    ['/hi/problems/patriarchy/', 'पितृसत्ता'],
    ['/search/', 'खोज'],
  ],
};

export const HARMS_HI: Record<string, string> = {
  air: 'वायु प्रदूषण', noise: 'शोर', water: 'जल प्रदूषण', waste: 'कचरा', climate: 'जलवायु',
  animals: 'जानवर', gender: 'लैंगिक भेदभाव', caste: 'जाति', health: 'स्वास्थ्य',
};

export const AREAS_HI: Record<string, string> = {
  clothing: 'कपड़े', electronics: 'इलेक्ट्रॉनिक्स', food: 'भोजन', electricity: 'बिजली', transport: 'यातायात',
  water: 'पानी', beauty: 'सौंदर्य और ग्रूमिंग', accessories: 'गहने और एक्सेसरीज़', shopping: 'ख़रीदारी और पैकिंग',
};

export const IMPACTS_HI: Record<string, string> = {
  climate: 'जलवायु', water: 'पानी', land: 'ज़मीन', minerals: 'खनिज', pollution: 'प्रदूषण', waste: 'कचरा', air: 'वायु प्रदूषण', health: 'स्वास्थ्य',
};

// Units inside figure values, e.g. "60 kg" becomes "60 किलो".
export function hiValue(v: string): string {
  const fixed: Record<string, string> = { '80 billion': '8,000 करोड़', '120 Mt': '12 करोड़ टन' };
  if (fixed[v]) return fixed[v];
  return v.replace(/ kg$/, ' किलो').replace(/ g$/, ' ग्राम').replace(/ L$/, ' लीटर');
}

export const T = {
  en: {
    switchTo: 'हिंदी', switchLang: 'hi',
    guide: 'Guide', source: 'Source', all: 'All', share: 'Copy link to share', copied: 'Link copied',
    sourcesNote: '',
  },
  hi: {
    switchTo: 'English', switchLang: 'en',
    guide: 'गाइड', source: 'स्रोत', all: 'सभी', share: 'शेयर करने के लिए लिंक कॉपी करें', copied: 'लिंक कॉपी हो गया',
    sourcesNote: 'स्रोत अंग्रेज़ी में हैं, क्योंकि मूल अध्ययन और रिपोर्ट अंग्रेज़ी में हैं।',
  },
} as const;
