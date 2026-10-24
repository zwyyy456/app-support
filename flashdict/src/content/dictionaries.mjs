// Dictionary families with sense-extraction adapters in the app.
// Source: zdict FlashDict/Resources/DictExtractors/simple-src/specs/registry.json
// (39 specs as of 2026-10-18). Adapters match a specific dictionary file by
// stable ID, so keep the wording on the page as "常见版本" / "common editions".
export const adaptedDictionaryCount = 39;

export const adaptedDictionaries = [
  { zh: '牛津高阶英汉双解（第 8、9、10 版）及 OALDPE', en: 'Oxford Advanced Learner’s (8th–10th editions, OALDPE)' },
  { zh: '朗文当代高级英语词典（第 6 版）、Longman Active Study', en: 'Longman Dictionary of Contemporary English (6th), Longman Active Study' },
  { zh: '柯林斯 COBUILD 英汉双解', en: 'Collins COBUILD (English–Chinese)' },
  { zh: '麦克米伦高阶英汉双解', en: 'Macmillan Advanced Learner’s' },
  { zh: '韦氏高阶英汉双解', en: 'Merriam-Webster’s Advanced Learner’s' },
  { zh: '剑桥英语词典（CDEPE）', en: 'Cambridge Dictionary (CDEPE)' },
  { zh: '美国传统词典（AHD）', en: 'American Heritage Dictionary' },
  { zh: '21 世纪英汉大词典', en: '21st Century English–Chinese' },
  { zh: 'WordNet 3.0 / 3.1', en: 'WordNet 3.0 / 3.1' },
];

// Bundled with the app: FlashDict/Resources/BundledDictionaries/manifest.json.
// Bundled dictionaries do not count toward the free-tier external dictionary limit.
export const bundledDictionaries = [
  { name: 'Webster’s 1913' },
  { name: 'WordNet 3.1' },
  { name: '英汉双解词典', en: 'an English–Chinese dictionary' },
];
