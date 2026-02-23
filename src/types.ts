/** Turkish grammatical cases (hal ekleri) */
export type CaseSuffix =
  | 'belirtme'
  | 'yonelme'
  | 'bulunma'
  | 'ayrilma'
  | 'tamlayan'
  | 'cogul';

/** English alias type for international developers */
export type CaseSuffixEn =
  | 'accusative'
  | 'dative'
  | 'locative'
  | 'ablative'
  | 'genitive'
  | 'plural';

/** Union of both naming systems */
export type SuffixType = CaseSuffix | CaseSuffixEn;

/** Apostrophe character preference */
export type ApostropheChar = "'" | '\u2019' | '\u02BC';

/** Configuration options for suffix attachment */
export interface SuffixOptions {
  /** Which apostrophe character to use (default: "'") */
  apostrophe?: ApostropheChar;
  /** Whether to use apostrophe (default: true) */
  useApostrophe?: boolean;
}

/** How the abbreviation is pronounced */
export type AbbreviationReadingStyle = 'letter' | 'word';

/** Options for abbreviation suffix */
export interface AbbreviationOptions extends SuffixOptions {
  /** How the abbreviation is read/pronounced */
  readAs?: AbbreviationReadingStyle;
}

/** Options for number suffix */
export interface NumberSuffixOptions extends SuffixOptions {
  /** Type of number suffix: 'case' for hal ekleri, 'ordinal' for sıra sayısı */
  type?: 'case' | 'ordinal';
}

/** Validation error codes */
export type ValidationErrorCode =
  | 'HARD_CONSONANT_MISMATCH'
  | 'MISSING_APOSTROPHE'
  | 'UNNECESSARY_APOSTROPHE'
  | 'VOWEL_HARMONY_VIOLATION'
  | 'BUFFER_LETTER_ERROR'
  | 'CONSONANT_SOFTENING'
  | 'INVALID_APOSTROPHE_CHAR'
  | 'NOT_PROPER_NOUN';

/** A single validation error */
export interface ValidationError {
  /** Error code for programmatic handling */
  code: ValidationErrorCode;
  /** Human-readable message (Turkish) */
  message: string;
  /** Human-readable message (English) */
  messageEn: string;
}

/** Validation result */
export interface ValidationResult {
  /** Whether the apostrophe usage is valid */
  valid: boolean;
  /** The input that was validated */
  input: string;
  /** Error details if invalid */
  errors: ValidationError[];
  /** Suggested correction if invalid */
  suggestion?: string;
}

/** Detected apostrophe usage in text */
export interface DetectedApostrophe {
  /** Full matched string */
  match: string;
  /** The stem/base word before apostrophe */
  stem: string;
  /** The suffix after apostrophe */
  suffix: string;
  /** Character index in original text */
  index: number;
  /** The apostrophe character used */
  apostropheChar: string;
  /** Detected case type, if recognizable */
  detectedCase?: CaseSuffix;
}

/** Vowel harmony type */
export type HarmonyType = 'twoway' | 'fourway';

/** Pronunciation info for numbers/letters */
export interface PronunciationInfo {
  lastVowel: string;
  endsWithVowel: boolean;
  endsWithHardConsonant: boolean;
}
