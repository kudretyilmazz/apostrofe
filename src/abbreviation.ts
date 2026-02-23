import type { AbbreviationOptions, AbbreviationReadingStyle, PronunciationInfo, SuffixType } from './types';
import { LETTER_PRONUNCIATIONS, VOWELS } from './constants';
import { getLastVowel, endsWithVowel as wordEndsWithVowel, endsWithHardConsonant as wordEndsWithHardConsonant } from './vowel-harmony';
import { apostrofe } from './suffix';

/**
 * Heuristic to determine if an abbreviation is read as a word or letter-by-letter.
 *
 * If it contains vowels forming pronounceable syllables (like NATO, BOTAŞ),
 * it's likely read as a word. Otherwise (TDK, AB), letter-by-letter.
 */
function detectReadingStyle(abbr: string): AbbreviationReadingStyle {
  const upper = abbr.toUpperCase();
  let vowelCount = 0;
  let consonantCount = 0;
  let consecutiveConsonants = 0;
  let maxConsecutiveConsonants = 0;
  let endsWithConsonantCluster = false;

  for (let i = 0; i < upper.length; i++) {
    if (VOWELS.has(upper[i])) {
      vowelCount++;
      consecutiveConsonants = 0;
    } else {
      consonantCount++;
      consecutiveConsonants++;
      maxConsecutiveConsonants = Math.max(maxConsecutiveConsonants, consecutiveConsonants);
    }
  }

  // Track if it ends with 2+ consonants (unpronounceable ending)
  endsWithConsonantCluster = consecutiveConsonants >= 2;

  // If no vowels, definitely letter-by-letter
  if (vowelCount === 0) return 'letter';

  // Short abbreviations (1-3 chars) are typically letter-by-letter
  if (upper.length <= 3) return 'letter';

  // If 3+ consecutive consonants, unpronounceable
  if (maxConsecutiveConsonants >= 3) return 'letter';

  // If ends with 2+ consonants (like ABD, TBMM), likely letter-by-letter
  if (endsWithConsonantCluster) return 'letter';

  // If vowel ratio is too low (< 1/3), likely letter-by-letter
  if (vowelCount / upper.length < 0.3) return 'letter';

  // If it has vowels forming pronounceable syllables, read as word
  return 'word';
}

/**
 * Gets pronunciation info for an abbreviation.
 */
function getAbbreviationPronunciation(
  abbr: string,
  readAs: AbbreviationReadingStyle,
): PronunciationInfo {
  if (readAs === 'letter') {
    // Use the last letter's pronunciation
    const lastChar = abbr[abbr.length - 1].toUpperCase();
    const info = LETTER_PRONUNCIATIONS[lastChar];
    if (info) return info;

    // Fallback for unknown characters
    return { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false };
  }

  // Read as word — analyze the abbreviation itself
  const lastV = getLastVowel(abbr);
  return {
    lastVowel: lastV ?? 'e',
    endsWithVowel: wordEndsWithVowel(abbr),
    endsWithHardConsonant: wordEndsWithHardConsonant(abbr),
  };
}

/**
 * Attaches a Turkish suffix to an abbreviation with apostrophe.
 *
 * @param abbr - The abbreviation (e.g., "TDK", "NATO", "AB")
 * @param suffixType - Case suffix to apply
 * @param options - Optional: specify reading style
 * @returns Abbreviation with suffix (e.g., "TDK'nın", "NATO'nun")
 *
 * @example
 * abbreviationSuffix("TDK", "tamlayan")                      // "TDK'nın"
 * abbreviationSuffix("AB", "yonelme")                         // "AB'ye"
 * abbreviationSuffix("NATO", "tamlayan", { readAs: 'word' })  // "NATO'nun"
 * abbreviationSuffix("ODTÜ", "belirtme", { readAs: 'word' }) // "ODTÜ'yü"
 */
export function abbreviationSuffix(
  abbr: string,
  suffixType: SuffixType,
  options?: AbbreviationOptions,
): string {
  const trimmed = abbr.trim();
  if (!trimmed) {
    throw new TypeError('Kısaltma boş olamaz');
  }

  const readAs = options?.readAs ?? detectReadingStyle(trimmed);
  const info = getAbbreviationPronunciation(trimmed, readAs);

  // Build a proxy word that mimics the pronunciation
  const proxyWord = info.endsWithVowel
    ? `X${info.lastVowel}`
    : info.endsWithHardConsonant
      ? `X${info.lastVowel}t`
      : `X${info.lastVowel}n`;

  // Use apostrofe() on the proxy to get the correct suffix
  const proxyResult = apostrofe(proxyWord, suffixType, { useApostrophe: false });
  const suffix = proxyResult.slice(proxyWord.length);

  const apo = options?.apostrophe ?? "'";
  return `${trimmed}${apo}${suffix}`;
}
