import type { CaseSuffix, SuffixOptions, SuffixType } from './types';
import { CASE_NAME_MAP } from './constants';
import { endsWithVowel, endsWithHardConsonant, getHarmoniousVowel } from './vowel-harmony';

/**
 * Resolves an English or Turkish suffix name to the canonical Turkish name.
 */
function resolveSuffixType(suffixType: SuffixType): CaseSuffix {
  if (suffixType in CASE_NAME_MAP) {
    return CASE_NAME_MAP[suffixType]!;
  }
  return suffixType as CaseSuffix;
}

/**
 * Builds the suffix string for a given case and word properties.
 */
function buildSuffix(
  name: string,
  caseSuffix: CaseSuffix,
): string {
  const vowelEnding = endsWithVowel(name);
  const hardEnding = endsWithHardConsonant(name);

  switch (caseSuffix) {
    case 'belirtme': {
      // -ı/-i/-u/-ü or -yı/-yi/-yu/-yü
      const v = getHarmoniousVowel(name, 'fourway');
      return vowelEnding ? `y${v}` : v;
    }

    case 'yonelme': {
      // -a/-e or -ya/-ye
      const v = getHarmoniousVowel(name, 'twoway');
      return vowelEnding ? `y${v}` : v;
    }

    case 'bulunma': {
      // -da/-de or -ta/-te
      const v = getHarmoniousVowel(name, 'twoway');
      const d = hardEnding ? 't' : 'd';
      return `${d}${v}`;
    }

    case 'ayrilma': {
      // -dan/-den or -tan/-ten
      const v = getHarmoniousVowel(name, 'twoway');
      const d = hardEnding ? 't' : 'd';
      return `${d}${v}n`;
    }

    case 'tamlayan': {
      // -ın/-in/-un/-ün or -nın/-nin/-nun/-nün
      const v = getHarmoniousVowel(name, 'fourway');
      return vowelEnding ? `n${v}n` : `${v}n`;
    }

    case 'cogul': {
      // -lar/-ler
      const v = getHarmoniousVowel(name, 'twoway');
      return v === 'a' ? 'lar' : 'ler';
    }

    default: {
      throw new TypeError(`Bilinmeyen hal eki: ${caseSuffix as string}`);
    }
  }
}

/**
 * Attaches a Turkish case suffix to a proper noun with correct apostrophe,
 * vowel harmony, consonant assimilation, and buffer letters.
 *
 * @param name - The proper noun (e.g., "İstanbul", "Kudret", "Ayşe")
 * @param suffixType - The case suffix to apply (Turkish or English name)
 * @param options - Optional configuration
 * @returns The name with suffix attached (e.g., "İstanbul'da")
 *
 * @example
 * apostrofe("İstanbul", "bulunma")     // "İstanbul'da"
 * apostrofe("Berat", "bulunma")        // "Berat'ta"
 * apostrofe("Ayşe", "belirtme")        // "Ayşe'yi"
 * apostrofe("Ankara", "tamlayan")      // "Ankara'nın"
 * apostrofe("İstanbul", "locative")    // "İstanbul'da"
 */
export function apostrofe(
  name: string,
  suffixType: SuffixType,
  options?: SuffixOptions,
): string {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new TypeError('İsim boş olamaz');
  }

  const caseSuffix = resolveSuffixType(suffixType);
  const apo = options?.apostrophe ?? "'";
  const useApo = options?.useApostrophe ?? true;
  const suffix = buildSuffix(trimmed, caseSuffix);
  const separator = useApo ? apo : '';

  return `${trimmed}${separator}${suffix}`;
}

/** Alias for apostrofe */
export const addSuffix = apostrofe;
