import type { CaseSuffix, PronunciationInfo } from './types';

/** All Turkish vowels */
export const VOWELS = new Set([
  'a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü',
  'A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü',
]);

/** Back vowels (kalın ünlüler) */
export const BACK_VOWELS = new Set(['a', 'ı', 'o', 'u']);

/** Front vowels (ince ünlüler) */
export const FRONT_VOWELS = new Set(['e', 'i', 'ö', 'ü']);

/** Rounded vowels (yuvarlak ünlüler) */
export const ROUNDED_VOWELS = new Set(['o', 'ö', 'u', 'ü']);

/**
 * Hard/voiceless consonants: f, s, t, k, ç, ş, h, p
 * Mnemonic: "FıSTıKÇı ŞaHaP"
 */
export const HARD_CONSONANTS = new Set([
  'f', 's', 't', 'k', 'ç', 'ş', 'h', 'p',
  'F', 'S', 'T', 'K', 'Ç', 'Ş', 'H', 'P',
]);

/** All valid apostrophe characters */
export const APOSTROPHE_CHARS = new Set(["'", '\u2019', '\u02BC']);

/** Regex matching any apostrophe variant */
export const APOSTROPHE_REGEX = /['\u2019\u02BC]/;

/** Map English case names to Turkish */
export const CASE_NAME_MAP: Record<string, CaseSuffix> = {
  accusative: 'belirtme',
  dative: 'yonelme',
  locative: 'bulunma',
  ablative: 'ayrilma',
  genitive: 'tamlayan',
  plural: 'cogul',
};

/**
 * Number pronunciation map (0-9).
 * Based on Turkish number names:
 * 0=sıfır, 1=bir, 2=iki, 3=üç, 4=dört, 5=beş, 6=altı, 7=yedi, 8=sekiz, 9=dokuz
 */
export const NUMBER_PRONUNCIATIONS: Record<string, PronunciationInfo> = {
  '0': { lastVowel: 'ı', endsWithVowel: false, endsWithHardConsonant: false },
  '1': { lastVowel: 'i', endsWithVowel: false, endsWithHardConsonant: false },
  '2': { lastVowel: 'i', endsWithVowel: true, endsWithHardConsonant: false },
  '3': { lastVowel: 'ü', endsWithVowel: false, endsWithHardConsonant: true },
  '4': { lastVowel: 'ö', endsWithVowel: false, endsWithHardConsonant: true },
  '5': { lastVowel: 'e', endsWithVowel: false, endsWithHardConsonant: true },
  '6': { lastVowel: 'ı', endsWithVowel: true, endsWithHardConsonant: false },
  '7': { lastVowel: 'i', endsWithVowel: true, endsWithHardConsonant: false },
  '8': { lastVowel: 'i', endsWithVowel: false, endsWithHardConsonant: false },
  '9': { lastVowel: 'u', endsWithVowel: false, endsWithHardConsonant: false },
};

/**
 * Magnitude pronunciation data.
 * 10=on, 20=yirmi, 30=otuz, 40=kırk, 50=elli, 60=altmış,
 * 70=yetmiş, 80=seksen, 90=doksan, 100=yüz, 1000=bin
 */
export const MAGNITUDE_PRONUNCIATIONS: Record<string, PronunciationInfo> = {
  '10': { lastVowel: 'o', endsWithVowel: false, endsWithHardConsonant: false },
  '20': { lastVowel: 'i', endsWithVowel: true, endsWithHardConsonant: false },
  '30': { lastVowel: 'u', endsWithVowel: false, endsWithHardConsonant: false },
  '40': { lastVowel: 'ı', endsWithVowel: false, endsWithHardConsonant: true },
  '50': { lastVowel: 'i', endsWithVowel: true, endsWithHardConsonant: false },
  '60': { lastVowel: 'ı', endsWithVowel: false, endsWithHardConsonant: true },
  '70': { lastVowel: 'i', endsWithVowel: false, endsWithHardConsonant: true },
  '80': { lastVowel: 'e', endsWithVowel: false, endsWithHardConsonant: false },
  '90': { lastVowel: 'a', endsWithVowel: false, endsWithHardConsonant: false },
  '100': { lastVowel: 'ü', endsWithVowel: false, endsWithHardConsonant: false },
  '1000': { lastVowel: 'i', endsWithVowel: false, endsWithHardConsonant: false },
  '1000000': { lastVowel: 'o', endsWithVowel: false, endsWithHardConsonant: false },
  '1000000000': { lastVowel: 'a', endsWithVowel: false, endsWithHardConsonant: false },
};

/**
 * Turkish letter pronunciation map for abbreviations read letter-by-letter.
 * Each letter is pronounced as a syllable (e.g., B → "be", K → "ka").
 */
export const LETTER_PRONUNCIATIONS: Record<string, PronunciationInfo> = {
  'A': { lastVowel: 'a', endsWithVowel: true, endsWithHardConsonant: false },
  'B': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'C': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'Ç': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'D': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'E': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'F': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'G': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'Ğ': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'H': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'I': { lastVowel: 'ı', endsWithVowel: true, endsWithHardConsonant: false },
  'İ': { lastVowel: 'i', endsWithVowel: true, endsWithHardConsonant: false },
  'J': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'K': { lastVowel: 'a', endsWithVowel: true, endsWithHardConsonant: false },
  'L': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'M': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'N': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'O': { lastVowel: 'o', endsWithVowel: true, endsWithHardConsonant: false },
  'Ö': { lastVowel: 'ö', endsWithVowel: true, endsWithHardConsonant: false },
  'P': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'R': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'S': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'Ş': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'T': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'U': { lastVowel: 'u', endsWithVowel: true, endsWithHardConsonant: false },
  'Ü': { lastVowel: 'ü', endsWithVowel: true, endsWithHardConsonant: false },
  'V': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'Y': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
  'Z': { lastVowel: 'e', endsWithVowel: true, endsWithHardConsonant: false },
};
