// Primary API
export { apostrofe, addSuffix } from './suffix';

// Validation
export { validate } from './validate';

// Detection
export { detect, detectAll } from './detect';

// Number suffixes
export { numberSuffix } from './number';

// Abbreviation suffixes
export { abbreviationSuffix } from './abbreviation';

// Normalization
export { normalizeApostrophe } from './normalize';

// Utilities
export {
  getLastVowel,
  isVowel,
  isHardConsonant,
  endsWithVowel,
  endsWithHardConsonant,
  getHarmoniousVowel,
} from './vowel-harmony';

// Types
export type {
  CaseSuffix,
  CaseSuffixEn,
  SuffixType,
  SuffixOptions,
  NumberSuffixOptions,
  AbbreviationOptions,
  AbbreviationReadingStyle,
  ApostropheChar,
  ValidationResult,
  ValidationError,
  ValidationErrorCode,
  DetectedApostrophe,
  HarmonyType,
  PronunciationInfo,
} from './types';
