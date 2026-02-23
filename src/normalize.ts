import type { ApostropheChar } from './types';

/**
 * Normalizes all apostrophe-like characters in a text to a single form.
 *
 * Handles: U+0027 ('), U+2019 ('), U+02BC (ʼ)
 * Optionally normalizes backtick (U+0060) which is a common mistake.
 *
 * @param text - Text to normalize
 * @param target - Target apostrophe character (default: "'")
 * @param options - Additional options
 * @returns Normalized text
 *
 * @example
 * normalizeApostrophe("İstanbul\u2019da")  // "İstanbul'da"
 */
export function normalizeApostrophe(
  text: string,
  target: ApostropheChar = "'",
  options?: { normalizeBacktick?: boolean },
): string {
  const pattern = options?.normalizeBacktick
    ? /['\u2019\u02BC`]/g
    : /['\u2019\u02BC]/g;

  return text.replace(pattern, target);
}
