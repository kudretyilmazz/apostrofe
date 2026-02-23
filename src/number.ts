import type { NumberSuffixOptions, PronunciationInfo, SuffixType } from './types';
import { NUMBER_PRONUNCIATIONS, MAGNITUDE_PRONUNCIATIONS } from './constants';
import { getHarmoniousVowel } from './vowel-harmony';
import { apostrofe } from './suffix';

/**
 * Determines the pronunciation info for the last spoken unit of a number.
 *
 * Examples:
 * - 2024 → "dört" (last digit 4)
 * - 1923 → "üç" (last digit 3)
 * - 50 → "elli" (magnitude 50)
 * - 100 → "yüz" (magnitude 100)
 * - 1000 → "bin" (magnitude 1000)
 */
function getNumberPronunciation(num: number): PronunciationInfo {
  if (num === 0) return NUMBER_PRONUNCIATIONS['0'];

  const abs = Math.abs(num);
  const str = String(abs);

  // Check if the number ends with zeros (magnitude)
  // We need to find what the last spoken part is
  const lastDigit = abs % 10;

  // If last digit is non-zero, pronunciation is based on that digit
  if (lastDigit !== 0) {
    return NUMBER_PRONUNCIATIONS[String(lastDigit)];
  }

  // Last digit is 0 — find the magnitude
  // Count trailing zeros
  let trailingZeros = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === '0') trailingZeros++;
    else break;
  }

  // Check magnitudes from largest to smallest
  const magnitudes = [1000000000, 1000000, 1000, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  for (const mag of magnitudes) {
    if (abs % mag === 0 && MAGNITUDE_PRONUNCIATIONS[String(mag)]) {
      // Check that this magnitude actually applies
      // e.g., 200 → "yüz" (ends in 100s), not "on"
      const magStr = String(mag);
      const magZeros = magStr.length - 1;
      if (trailingZeros >= magZeros) {
        return MAGNITUDE_PRONUNCIATIONS[String(mag)];
      }
    }
  }

  // For tens (10, 20, ..., 90): remainder when divided by 100
  const lastTwoDigits = abs % 100;
  if (lastTwoDigits % 10 === 0 && lastTwoDigits > 0) {
    const tens = MAGNITUDE_PRONUNCIATIONS[String(lastTwoDigits)];
    if (tens) return tens;
  }

  // Fallback: use last non-zero digit
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== '0') {
      return NUMBER_PRONUNCIATIONS[str[i]] ?? NUMBER_PRONUNCIATIONS['0'];
    }
  }

  return NUMBER_PRONUNCIATIONS['0'];
}

/**
 * Creates a virtual "word" proxy that reports the right vowel/consonant properties
 * for suffix building, based on number pronunciation.
 */
function buildSuffixForPronunciation(
  info: PronunciationInfo,
  suffixType: SuffixType,
  numStr: string,
  options?: NumberSuffixOptions,
): string {
  // Build a fake word that has the right properties for vowel harmony
  // We use the lastVowel to create a word the vowel harmony engine understands
  const fakeWord = info.endsWithVowel
    ? `X${info.lastVowel}`
    : info.endsWithHardConsonant
      ? `X${info.lastVowel}t`
      : `X${info.lastVowel}n`;

  return apostrofe(
    numStr,
    suffixType,
    { ...options, useApostrophe: options?.useApostrophe ?? true },
  ).replace(numStr, fakeWord).replace(fakeWord, numStr);
}

/**
 * Builds an ordinal suffix (-ıncı/-inci/-uncu/-üncü / -nci variants).
 */
function buildOrdinal(info: PronunciationInfo): string {
  const v = (() => {
    const lv = info.lastVowel;
    if ('aı'.includes(lv)) return 'ı';
    if ('ei'.includes(lv)) return 'i';
    if ('ou'.includes(lv)) return 'u';
    return 'ü';
  })();

  // If ends with vowel, buffer 'n' is used: -nci
  if (info.endsWithVowel) {
    return `nc${v}`;
  }

  return `${v}nc${v}`;
}

/**
 * Attaches a Turkish suffix to a number with apostrophe.
 *
 * @param num - The number (as number or string)
 * @param suffixType - Case suffix to apply, or 'ordinal'
 * @param options - Optional configuration
 * @returns Number with suffix (e.g., "2024'te", "3'üncü")
 *
 * @example
 * numberSuffix(2024, "bulunma")    // "2024'te"
 * numberSuffix(3, "ordinal")       // "3'üncü"
 * numberSuffix(1923, "ayrilma")    // "1923'ten"
 */
export function numberSuffix(
  num: number | string,
  suffixType: SuffixType | 'ordinal',
  options?: NumberSuffixOptions,
): string {
  const numStr = String(num).replace(/[.\s]/g, '');
  const parsed = parseInt(numStr, 10);

  if (isNaN(parsed)) {
    throw new TypeError(`Geçersiz sayı: ${num}`);
  }

  const info = getNumberPronunciation(parsed);
  const apo = options?.apostrophe ?? "'";

  if (suffixType === 'ordinal') {
    const suffix = buildOrdinal(info);
    return `${numStr}${apo}${suffix}`;
  }

  // For case suffixes, we need to build the suffix based on pronunciation
  // Create a proxy word with matching phonetic properties
  const proxyWord = info.endsWithVowel
    ? `X${info.lastVowel}`
    : info.endsWithHardConsonant
      ? `X${info.lastVowel}t`
      : `X${info.lastVowel}n`;

  // Use apostrofe() on the proxy to get the correct suffix
  const proxyResult = apostrofe(proxyWord, suffixType, { useApostrophe: false });
  const suffix = proxyResult.slice(proxyWord.length);

  return `${numStr}${apo}${suffix}`;
}
