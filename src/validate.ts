import type { ValidationResult, ValidationError } from './types';
import { APOSTROPHE_CHARS, HARD_CONSONANTS, BACK_VOWELS, FRONT_VOWELS } from './constants';
import { getLastVowel, getHarmoniousVowel, endsWithVowel } from './vowel-harmony';

/**
 * Known suffix patterns and their expected case types.
 * These help detect what kind of suffix was attempted.
 */
const LOCATIVE_PATTERN = /^[dt][ae]$/;
const ABLATIVE_PATTERN = /^[dt][ae]n$/;
const ACCUSATIVE_PATTERN = /^y?[ıiuü]$/;
const DATIVE_PATTERN = /^y?[ae]$/;
const GENITIVE_PATTERN = /^n?[ıiuü]n$/;
const PLURAL_PATTERN = /^l[ae]r$/;

/**
 * Validates whether an apostrophe usage in a Turkish word is correct.
 *
 * @param input - A word with apostrophe (e.g., "Berat'da", "İstanbul'da")
 * @returns Detailed validation result with error codes and suggestions
 *
 * @example
 * validate("Berat'da")
 * // { valid: false, errors: [{ code: 'HARD_CONSONANT_MISMATCH', ... }], suggestion: "Berat'ta" }
 */
export function validate(input: string): ValidationResult {
  const errors: ValidationError[] = [];
  const trimmed = input.trim();

  // Find apostrophe
  let apoIndex = -1;
  let apoChar = '';
  for (let i = 0; i < trimmed.length; i++) {
    if (APOSTROPHE_CHARS.has(trimmed[i])) {
      apoIndex = i;
      apoChar = trimmed[i];
      break;
    }
  }

  // Check for backtick (common mistake)
  if (apoIndex === -1 && trimmed.includes('`')) {
    apoIndex = trimmed.indexOf('`');
    apoChar = '`';
    errors.push({
      code: 'INVALID_APOSTROPHE_CHAR',
      message: 'Backtick (`) yerine kesme işareti (\') kullanılmalı',
      messageEn: 'Use apostrophe (\') instead of backtick (`)',
    });
  }

  if (apoIndex === -1) {
    return { valid: true, input: trimmed, errors: [] };
  }

  const stem = trimmed.slice(0, apoIndex);
  const suffix = trimmed.slice(apoIndex + 1);

  if (!stem || !suffix) {
    return { valid: true, input: trimmed, errors: [] };
  }

  // Check if stem starts with uppercase (proper noun check)
  const firstChar = stem[0];
  if (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase()) {
    errors.push({
      code: 'NOT_PROPER_NOUN',
      message: 'Özel isimler büyük harfle başlamalı',
      messageEn: 'Proper nouns must start with an uppercase letter',
    });
  }

  const stemLastChar = stem[stem.length - 1];
  const stemIsHard = HARD_CONSONANTS.has(stemLastChar);
  const stemEndsVowel = endsWithVowel(stem);
  const stemLastVowel = getLastVowel(stem);

  // Check hard consonant assimilation for -da/-de patterns
  if (LOCATIVE_PATTERN.test(suffix) || ABLATIVE_PATTERN.test(suffix)) {
    const suffixStartsWithD = suffix[0] === 'd';
    const suffixStartsWithT = suffix[0] === 't';

    if (stemIsHard && suffixStartsWithD) {
      const corrected = 't' + suffix.slice(1);
      errors.push({
        code: 'HARD_CONSONANT_MISMATCH',
        message: `"${stem}" sert ünsüzle bitiyor, "${suffix}" yerine "${corrected}" olmalı`,
        messageEn: `"${stem}" ends with a hard consonant, use "${corrected}" instead of "${suffix}"`,
      });
    } else if (!stemIsHard && suffixStartsWithT && !stemEndsVowel) {
      const corrected = 'd' + suffix.slice(1);
      errors.push({
        code: 'HARD_CONSONANT_MISMATCH',
        message: `"${stem}" sert ünsüzle bitmiyor, "${suffix}" yerine "${corrected}" olmalı`,
        messageEn: `"${stem}" does not end with a hard consonant, use "${corrected}" instead of "${suffix}"`,
      });
    }
  }

  // Check vowel harmony
  if (stemLastVowel) {
    const isBack = BACK_VOWELS.has(stemLastVowel);
    const isFront = FRONT_VOWELS.has(stemLastVowel);

    // Check 2-way harmony for locative/ablative/dative/plural
    if (LOCATIVE_PATTERN.test(suffix) || ABLATIVE_PATTERN.test(suffix)) {
      const suffixVowel = suffix[1]; // d/t + vowel
      const expected = getHarmoniousVowel(stem, 'twoway');
      if (suffixVowel !== expected) {
        const corrected = suffix[0] + expected + suffix.slice(2);
        errors.push({
          code: 'VOWEL_HARMONY_VIOLATION',
          message: `Ünlü uyumu hatası: "${suffix}" yerine "${corrected}" olmalı`,
          messageEn: `Vowel harmony violation: use "${corrected}" instead of "${suffix}"`,
        });
      }
    }

    // Check buffer letter for vowel-ending stems
    if (stemEndsVowel) {
      // Accusative: should have y buffer (Ayşe'yi, not Ayşe'i)
      if (ACCUSATIVE_PATTERN.test(suffix) && !suffix.startsWith('y') && suffix.length === 1) {
        const expected = getHarmoniousVowel(stem, 'fourway');
        errors.push({
          code: 'BUFFER_LETTER_ERROR',
          message: `Ünlüyle biten isimde kaynaştırma harfi "y" eksik: "y${expected}" olmalı`,
          messageEn: `Buffer letter "y" missing for vowel-ending name: should be "y${expected}"`,
        });
      }

      // Dative: should have y buffer (Ayşe'ye, not Ayşe'e)
      if (DATIVE_PATTERN.test(suffix) && !suffix.startsWith('y') && suffix.length === 1) {
        const expected = getHarmoniousVowel(stem, 'twoway');
        errors.push({
          code: 'BUFFER_LETTER_ERROR',
          message: `Ünlüyle biten isimde kaynaştırma harfi "y" eksik: "y${expected}" olmalı`,
          messageEn: `Buffer letter "y" missing for vowel-ending name: should be "y${expected}"`,
        });
      }

      // Genitive: should have n buffer (Ayşe'nin, not Ayşe'in)
      if (GENITIVE_PATTERN.test(suffix) && !suffix.startsWith('n')) {
        const expected = getHarmoniousVowel(stem, 'fourway');
        errors.push({
          code: 'BUFFER_LETTER_ERROR',
          message: `Ünlüyle biten isimde kaynaştırma harfi "n" eksik: "n${expected}n" olmalı`,
          messageEn: `Buffer letter "n" missing for vowel-ending name: should be "n${expected}n"`,
        });
      }
    }
  }

  // Build suggestion if there are errors
  let suggestion: string | undefined;
  if (errors.length > 0 && errors[0].code !== 'NOT_PROPER_NOUN' && errors[0].code !== 'INVALID_APOSTROPHE_CHAR') {
    // Try to build the correct form
    const validApo = apoChar === '`' ? "'" : apoChar;

    if (LOCATIVE_PATTERN.test(suffix)) {
      const v = getHarmoniousVowel(stem, 'twoway');
      const d = stemIsHard ? 't' : 'd';
      suggestion = `${stem}${validApo}${d}${v}`;
    } else if (ABLATIVE_PATTERN.test(suffix)) {
      const v = getHarmoniousVowel(stem, 'twoway');
      const d = stemIsHard ? 't' : 'd';
      suggestion = `${stem}${validApo}${d}${v}n`;
    } else if (ACCUSATIVE_PATTERN.test(suffix)) {
      const v = getHarmoniousVowel(stem, 'fourway');
      const buf = stemEndsVowel ? 'y' : '';
      suggestion = `${stem}${validApo}${buf}${v}`;
    } else if (DATIVE_PATTERN.test(suffix)) {
      const v = getHarmoniousVowel(stem, 'twoway');
      const buf = stemEndsVowel ? 'y' : '';
      suggestion = `${stem}${validApo}${buf}${v}`;
    } else if (GENITIVE_PATTERN.test(suffix)) {
      const v = getHarmoniousVowel(stem, 'fourway');
      const buf = stemEndsVowel ? 'n' : '';
      suggestion = `${stem}${validApo}${buf}${v}n`;
    }
  }

  return {
    valid: errors.length === 0,
    input: trimmed,
    errors,
    suggestion,
  };
}
