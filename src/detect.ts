import type { CaseSuffix, DetectedApostrophe } from './types';

/**
 * Regex to match a proper noun with apostrophe + Turkish suffix.
 * Captures: (Stem)(apostrophe)(suffix)
 * Handles all three apostrophe variants.
 */
const DETECT_REGEX = /([A-ZÇĞİÖŞÜ][a-zçğıöşüA-ZÇĞİÖŞÜ0-9]*)(['\u2019\u02BC])([a-zçğıöşü]+)/g;

/**
 * Suffix pattern to case type mapping.
 */
const SUFFIX_CASE_MAP: Array<{ pattern: RegExp; caseSuffix: CaseSuffix }> = [
  { pattern: /^[dt][ae]n$/, caseSuffix: 'ayrilma' },
  { pattern: /^[dt][ae]$/, caseSuffix: 'bulunma' },
  { pattern: /^n?[ıiuü]n$/, caseSuffix: 'tamlayan' },
  { pattern: /^y?[ıiuü]$/, caseSuffix: 'belirtme' },
  { pattern: /^y?[ae]$/, caseSuffix: 'yonelme' },
  { pattern: /^l[ae]r$/, caseSuffix: 'cogul' },
];

/**
 * Tries to detect the case type from a suffix string.
 */
function detectCaseFromSuffix(suffix: string): CaseSuffix | undefined {
  for (const { pattern, caseSuffix } of SUFFIX_CASE_MAP) {
    if (pattern.test(suffix)) {
      return caseSuffix;
    }
  }
  return undefined;
}

/**
 * Detects all apostrophe usages in a text string.
 *
 * @param text - Text to search
 * @returns Array of all detected apostrophe usages
 *
 * @example
 * detectAll("İstanbul'da yaşayan Ayşe'nin kedisi")
 * // [
 * //   { match: "İstanbul'da", stem: "İstanbul", suffix: "da", ... },
 * //   { match: "Ayşe'nin", stem: "Ayşe", suffix: "nin", ... }
 * // ]
 */
export function detectAll(text: string): DetectedApostrophe[] {
  const results: DetectedApostrophe[] = [];
  const regex = new RegExp(DETECT_REGEX.source, DETECT_REGEX.flags);
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [full, stem, apoChar, suffix] = match;
    results.push({
      match: full,
      stem,
      suffix,
      index: match.index,
      apostropheChar: apoChar,
      detectedCase: detectCaseFromSuffix(suffix),
    });
  }

  return results;
}

/**
 * Detects the first apostrophe usage in a text string.
 *
 * @param text - Text to search
 * @returns First detected apostrophe usage, or null
 */
export function detect(text: string): DetectedApostrophe | null {
  const results = detectAll(text);
  return results[0] ?? null;
}
