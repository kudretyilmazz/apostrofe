import type { HarmonyType } from './types';
import { VOWELS, BACK_VOWELS, ROUNDED_VOWELS, HARD_CONSONANTS } from './constants';

/**
 * Returns the last vowel in a word (lowercase), or null if none found.
 */
export function getLastVowel(word: string): string | null {
  for (let i = word.length - 1; i >= 0; i--) {
    const ch = word[i];
    if (VOWELS.has(ch)) {
      // Handle Turkish I/İ distinction
      if (ch === 'I') return 'ı';
      if (ch === 'İ') return 'i';
      return ch.toLowerCase();
    }
  }
  return null;
}

/**
 * Check if a character is a Turkish vowel.
 */
export function isVowel(char: string): boolean {
  return VOWELS.has(char);
}

/**
 * Check if a character is a hard/voiceless consonant (FıSTıKÇı ŞaHaP).
 */
export function isHardConsonant(char: string): boolean {
  return HARD_CONSONANTS.has(char);
}

/**
 * Check if a word ends with a vowel.
 */
export function endsWithVowel(word: string): boolean {
  return VOWELS.has(word[word.length - 1]);
}

/**
 * Check if a word ends with a hard consonant.
 */
export function endsWithHardConsonant(word: string): boolean {
  return HARD_CONSONANTS.has(word[word.length - 1]);
}

/**
 * Returns the harmonious vowel for a suffix based on the word's last vowel.
 *
 * @param word - The base word to harmonize with
 * @param harmonyType - 'twoway' for a/e, 'fourway' for ı/i/u/ü
 */
export function getHarmoniousVowel(word: string, harmonyType: HarmonyType): string {
  const lastV = getLastVowel(word);
  if (!lastV) return harmonyType === 'twoway' ? 'a' : 'ı';

  if (harmonyType === 'twoway') {
    return BACK_VOWELS.has(lastV) ? 'a' : 'e';
  }

  // Four-way harmony: ı/i/u/ü
  const isBack = BACK_VOWELS.has(lastV);
  const isRounded = ROUNDED_VOWELS.has(lastV);

  if (isBack && !isRounded) return 'ı';  // a, ı → ı
  if (isBack && isRounded) return 'u';    // o, u → u
  if (!isBack && !isRounded) return 'i';  // e, i → i
  return 'ü';                              // ö, ü → ü
}
