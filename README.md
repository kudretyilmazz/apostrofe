# apostrofe

Lightweight, type-safe Turkish apostrophe (kesme isareti) rules engine.

[Turkce README](./README.tr.md)

## Features

- Zero dependencies, pure TypeScript
- ESM + CJS dual output
- Tree-shakeable (`sideEffects: false`)
- ~3KB minified + gzipped
- Full vowel harmony, consonant assimilation, buffer letters
- Number and abbreviation suffix support
- Validation and detection utilities
- Both Turkish and English API names

## Install

```bash
npm install apostrofe
```

## Usage

### Suffix Attachment

```ts
import { apostrofe } from 'apostrofe';

apostrofe('Istanbul', 'locative');    // "Istanbul'da"
apostrofe('Berat', 'locative');       // "Berat'ta"     (hard consonant)
apostrofe('Ayse', 'accusative');      // "Ayse'yi"      (buffer letter)
apostrofe('Ankara', 'genitive');      // "Ankara'nin"   (buffer letter)

// Turkish case names also work
apostrofe('Istanbul', 'bulunma');     // "Istanbul'da"
```

### Supported Cases

| Turkish | English | Suffix |
|---------|---------|--------|
| `belirtme` | `accusative` | -i / -yi |
| `yonelme` | `dative` | -a/-e / -ya/-ye |
| `bulunma` | `locative` | -da/-de / -ta/-te |
| `ayrilma` | `ablative` | -dan/-den / -tan/-ten |
| `tamlayan` | `genitive` | -in / -nin |
| `cogul` | `plural` | -lar/-ler |

### Number Suffixes

```ts
import { numberSuffix } from 'apostrofe';

numberSuffix(2024, 'locative');   // "2024'te"
numberSuffix(3, 'ordinal');       // "3'uncu"
numberSuffix(1923, 'ablative');   // "1923'ten"
```

### Abbreviation Suffixes

```ts
import { abbreviationSuffix } from 'apostrofe';

abbreviationSuffix('TDK', 'genitive');                       // "TDK'nin"
abbreviationSuffix('NATO', 'genitive', { readAs: 'word' });  // "NATO'nun"
abbreviationSuffix('AB', 'dative');                           // "AB'ye"
```

### Validation

```ts
import { validate } from 'apostrofe';

validate("Berat'da");
// { valid: false, errors: [{ code: 'HARD_CONSONANT_MISMATCH', ... }],
//   suggestion: "Berat'ta" }

validate("Istanbul'da");
// { valid: true, errors: [] }
```

### Detection

```ts
import { detectAll } from 'apostrofe';

detectAll("Istanbul'da yasayan Ayse'nin kedisi");
// [
//   { match: "Istanbul'da", stem: "Istanbul", suffix: "da", detectedCase: "bulunma" },
//   { match: "Ayse'nin", stem: "Ayse", suffix: "nin", detectedCase: "tamlayan" }
// ]
```

### Normalization

```ts
import { normalizeApostrophe } from 'apostrofe';

normalizeApostrophe("Istanbul\u2019da");  // "Istanbul'da"
```

### Utilities

```ts
import { getLastVowel, isHardConsonant, getHarmoniousVowel } from 'apostrofe';

getLastVowel('Istanbul');                    // 'u'
isHardConsonant('t');                        // true
getHarmoniousVowel('Istanbul', 'twoway');    // 'a'
getHarmoniousVowel('Istanbul', 'fourway');   // 'u'
```

## Options

```ts
// Custom apostrophe character
apostrofe('Istanbul', 'locative', { apostrophe: '\u2019' });  // "Istanbul\u2019da"

// Without apostrophe
apostrofe('Istanbul', 'locative', { useApostrophe: false });   // "Istanbulda"

// Abbreviation reading style
abbreviationSuffix('NATO', 'genitive', { readAs: 'word' });   // "NATO'nun"
abbreviationSuffix('TDK', 'genitive', { readAs: 'letter' });  // "TDK'nin"
```

## Key Rules Implemented

1. **No consonant softening** for proper nouns (Mehmet'e, NOT Mehmed'e)
2. **Hard consonant assimilation**: p, c, t, k, f, h, s, s -> -ta/-te (Berat'ta)
3. **Buffer letters**: y (Ayse'yi), n (Ayse'nin) for vowel-ending names
4. **Full vowel harmony**: 2-way (a/e) and 4-way (i/i/u/u) systems
5. **Number pronunciation**: suffix based on spoken form (2024 -> "dort" -> hard consonant)

## License

MIT
