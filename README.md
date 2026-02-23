<div align="center">

# apostrofe

**Turkce kesme isareti kural motoru**

Ozel isimlere dogru ek ekleme, dogrulama ve tespit.

[![npm version](https://img.shields.io/npm/v/apostrofe?color=%23cb3837&label=npm)](https://www.npmjs.com/package/apostrofe)
[![bundle size](https://img.shields.io/bundlephobia/minzip/apostrofe?color=%234c1&label=boyut)](https://bundlephobia.com/package/apostrofe)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/apostrofe?color=%23007ec6)](./LICENSE)
[![zero deps](https://img.shields.io/badge/bagimlilik-0-brightgreen)](#)

</div>

---

```ts
import { apostrofe } from 'apostrofe';

apostrofe('Istanbul', 'bulunma');   // "Istanbul'da"
apostrofe('Berat', 'bulunma');      // "Berat'ta"      sert unsuz
apostrofe('Ayse', 'belirtme');      // "Ayse'yi"       kaynastirma
apostrofe('Ankara', 'tamlayan');    // "Ankara'nin"    kaynastirma
apostrofe('Gul', 'belirtme');       // "Gul'u"         4'lu uyum
```

---

## Kurulum

```bash
npm install apostrofe
```

```bash
yarn add apostrofe
```

```bash
pnpm add apostrofe
```

---

## Hizli Referans Karti

```
ISIM + HAL EKLERI (Kesme Isareti ile)

Kudret   Kudret'i    Kudret'e    Kudret'te    Kudret'ten    Kudret'in    Kudret'ler
Irem     Irem'i      Irem'e      Irem'de      Irem'den      Irem'in      Irem'ler
Hasan    Hasan'i     Hasan'a     Hasan'da     Hasan'dan     Hasan'in     Hasan'lar
Berat    Berat'i     Berat'a     Berat'ta     Berat'tan     Berat'in     Berat'lar
Ayse     Ayse'yi     Ayse'ye     Ayse'de      Ayse'den      Ayse'nin     Ayse'ler
Omer     Omer'i      Omer'e      Omer'de      Omer'den      Omer'in      Omer'ler
Gul      Gul'u       Gul'e       Gul'de       Gul'den       Gul'un       Gul'ler
         belirtme    yonelme     bulunma      ayrilma       tamlayan     cogul
```

---

<details open>
<summary><h2>Turkce Dokumantasyon</h2></summary>

### Ek Ekleme

```ts
import { apostrofe } from 'apostrofe';

apostrofe('Istanbul', 'bulunma');     // "Istanbul'da"
apostrofe('Berat', 'bulunma');        // "Berat'ta"       sert unsuz benzesmesi
apostrofe('Ayse', 'belirtme');        // "Ayse'yi"        kaynastirma harfi y
apostrofe('Ankara', 'tamlayan');      // "Ankara'nin"     kaynastirma harfi n
apostrofe('Gul', 'belirtme');         // "Gul'u"          4'lu unlu uyumu

// Ingilizce isimler de calisir
apostrofe('Istanbul', 'locative');    // "Istanbul'da"
```

### Desteklenen Hal Ekleri

| Turkce | Ingilizce | Ek | Ornek |
|--------|-----------|-----|-------|
| `belirtme` | `accusative` | -i / -yi | Istanbul'u, Ayse'yi |
| `yonelme` | `dative` | -a/-e / -ya/-ye | Istanbul'a, Ayse'ye |
| `bulunma` | `locative` | -da/-de / -ta/-te | Istanbul'da, Berat'ta |
| `ayrilma` | `ablative` | -dan/-den / -tan/-ten | Istanbul'dan, Berat'tan |
| `tamlayan` | `genitive` | -in / -nin | Istanbul'un, Ayse'nin |
| `cogul` | `plural` | -lar/-ler | Istanbul'lar, Ayse'ler |

### Sayi Ekleri

```ts
import { numberSuffix } from 'apostrofe';

numberSuffix(2024, 'bulunma');    // "2024'te"     dort -> sert unsuz
numberSuffix(3, 'ordinal');       // "3'uncu"      sira sayisi
numberSuffix(1923, 'ayrilma');    // "1923'ten"    uc -> sert unsuz
numberSuffix(15, 'ordinal');      // "15'inci"     bes -> ince unlu
numberSuffix(1, 'ordinal');       // "1'inci"
```

### Kisaltma Ekleri

```ts
import { abbreviationSuffix } from 'apostrofe';

abbreviationSuffix('TDK', 'tamlayan');                       // "TDK'nin"
abbreviationSuffix('AB', 'yonelme');                          // "AB'ye"
abbreviationSuffix('NATO', 'tamlayan', { readAs: 'word' });  // "NATO'nun"
abbreviationSuffix('ODTU', 'belirtme', { readAs: 'word' });  // "ODTU'yu"
```

> Otomatik algilama: Hece olusturan kisaltmalar (NATO, ODTU) `word`, diger kisaltmalar (TDK, AB) `letter` olarak okunur. `readAs` ile override edilebilir.

### Dogrulama

```ts
import { validate } from 'apostrofe';

validate("Berat'da");
// {
//   valid: false,
//   errors: [{ code: 'HARD_CONSONANT_MISMATCH', message: '...', messageEn: '...' }],
//   suggestion: "Berat'ta"
// }

validate("Istanbul'da");
// { valid: true, errors: [] }
```

**Hata kodlari:**

| Kod | Aciklama |
|-----|----------|
| `HARD_CONSONANT_MISMATCH` | Sert unsuz benzesmesi hatasi (Berat'da -> Berat'ta) |
| `VOWEL_HARMONY_VIOLATION` | Unlu uyumu hatasi (Istanbul'de -> Istanbul'da) |
| `BUFFER_LETTER_ERROR` | Kaynastirma harfi eksik (Ankara'i -> Ankara'yi) |
| `INVALID_APOSTROPHE_CHAR` | Gecersiz apostrof karakteri (backtick) |
| `NOT_PROPER_NOUN` | Ozel isim buyuk harfle baslamali |

### Tespit

```ts
import { detect, detectAll } from 'apostrofe';

detectAll("Istanbul'da yasayan Ayse'nin kedisi");
// [
//   { match: "Istanbul'da", stem: "Istanbul", suffix: "da",
//     index: 0, detectedCase: "bulunma" },
//   { match: "Ayse'nin", stem: "Ayse", suffix: "nin",
//     index: 19, detectedCase: "tamlayan" }
// ]

detect("Istanbul'da guzel");
// Ilk eslesen: { match: "Istanbul'da", ... }
```

### Normalizasyon

```ts
import { normalizeApostrophe } from 'apostrofe';

// Farkli apostrof karakterlerini normalize et
normalizeApostrophe("Istanbul\u2019da");                                  // "Istanbul'da"
normalizeApostrophe("Istanbul`da", "'", { normalizeBacktick: true });  // "Istanbul'da"
```

> Desteklenen karakterler: `'` (U+0027), `\u2019` (U+2019), `\u02BC` (U+02BC)

### Secenekler

```ts
// Tipografik apostrof
apostrofe('Istanbul', 'bulunma', { apostrophe: '\u2019' });  // "Istanbul\u2019da"

// Apostrof olmadan
apostrofe('Istanbul', 'bulunma', { useApostrophe: false });   // "Istanbulda"
```

### Yardimci Fonksiyonlar

```ts
import {
  getLastVowel,
  isHardConsonant,
  endsWithVowel,
  getHarmoniousVowel
} from 'apostrofe';

getLastVowel('Istanbul');                    // 'u'
isHardConsonant('t');                        // true
endsWithVowel('Ayse');                       // true
getHarmoniousVowel('Istanbul', 'twoway');    // 'a'   (2'li uyum)
getHarmoniousVowel('Istanbul', 'fourway');   // 'u'   (4'lu uyum)
```

### Uygulanan Kurallar

| Kural | Aciklama | Ornek |
|-------|----------|-------|
| Unsuz yumusamasi **yapilmaz** | Ozel isimlerde harf degismez | Mehmet'e (Mehmed'e degil) |
| Sert unsuz benzesmesi | p, c, t, k, f, h, s, s -> -ta/-te | Berat'ta, Elif'te |
| Kaynastirma harfleri | Unlü + unlü -> y, n tamponu | Ayse'yi, Ayse'nin |
| 2'li unlu uyumu | a/e secimi | Istanbul'da, Izmir'de |
| 4'lu unlu uyumu | i/i/u/u secimi | Kudret'i, Gul'u |
| Sayi telaffuzu | Ek, okunusa gore | 2024'te (dort -> sert) |
| Iyelik -> kesme yok | TDK kurali | Kudretim (Kudret'im degil) |
| Yapim eki -> kesme yok | TDK kurali | Ankarali (Ankara'li degil) |

</details>

---

<details>
<summary><h2>English Documentation</h2></summary>

### Suffix Attachment

```ts
import { apostrofe } from 'apostrofe';

apostrofe('Istanbul', 'locative');    // "Istanbul'da"
apostrofe('Berat', 'locative');       // "Berat'ta"     hard consonant
apostrofe('Ayse', 'accusative');      // "Ayse'yi"      buffer letter
apostrofe('Ankara', 'genitive');      // "Ankara'nin"   buffer letter

// Turkish case names also work
apostrofe('Istanbul', 'bulunma');     // "Istanbul'da"
```

### Supported Cases

| Turkish | English | Suffix | Example |
|---------|---------|--------|---------|
| `belirtme` | `accusative` | -i / -yi | Istanbul'u, Ayse'yi |
| `yonelme` | `dative` | -a/-e / -ya/-ye | Istanbul'a, Ayse'ye |
| `bulunma` | `locative` | -da/-de / -ta/-te | Istanbul'da, Berat'ta |
| `ayrilma` | `ablative` | -dan/-den / -tan/-ten | Istanbul'dan, Berat'tan |
| `tamlayan` | `genitive` | -in / -nin | Istanbul'un, Ayse'nin |
| `cogul` | `plural` | -lar/-ler | Istanbul'lar, Ayse'ler |

### Number Suffixes

```ts
import { numberSuffix } from 'apostrofe';

numberSuffix(2024, 'locative');   // "2024'te"
numberSuffix(3, 'ordinal');       // "3'uncu"
numberSuffix(1923, 'ablative');   // "1923'ten"
numberSuffix(15, 'ordinal');      // "15'inci"
```

### Abbreviation Suffixes

```ts
import { abbreviationSuffix } from 'apostrofe';

abbreviationSuffix('TDK', 'genitive');                       // "TDK'nin"
abbreviationSuffix('NATO', 'genitive', { readAs: 'word' });  // "NATO'nun"
abbreviationSuffix('AB', 'dative');                           // "AB'ye"
```

> Auto-detection: Pronounceable abbreviations (NATO, ODTU) default to `word`, others (TDK, AB) to `letter`. Override with `readAs`.

### Validation

```ts
import { validate } from 'apostrofe';

validate("Berat'da");
// { valid: false, errors: [{ code: 'HARD_CONSONANT_MISMATCH', ... }],
//   suggestion: "Berat'ta" }

validate("Istanbul'da");
// { valid: true, errors: [] }
```

**Error codes:** `HARD_CONSONANT_MISMATCH`, `VOWEL_HARMONY_VIOLATION`, `BUFFER_LETTER_ERROR`, `INVALID_APOSTROPHE_CHAR`, `NOT_PROPER_NOUN`

### Detection

```ts
import { detect, detectAll } from 'apostrofe';

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

> Supported characters: `'` (U+0027), `\u2019` (U+2019), `\u02BC` (U+02BC)

### Options

```ts
// Typographic apostrophe
apostrofe('Istanbul', 'locative', { apostrophe: '\u2019' });  // "Istanbul\u2019da"

// Without apostrophe
apostrofe('Istanbul', 'locative', { useApostrophe: false });   // "Istanbulda"
```

### Utilities

```ts
import { getLastVowel, isHardConsonant, getHarmoniousVowel } from 'apostrofe';

getLastVowel('Istanbul');                    // 'u'
isHardConsonant('t');                        // true
getHarmoniousVowel('Istanbul', 'twoway');    // 'a'
getHarmoniousVowel('Istanbul', 'fourway');   // 'u'
```

### Rules Implemented

| Rule | Description | Example |
|------|-------------|---------|
| No consonant softening | Proper nouns keep original letters | Mehmet'e (NOT Mehmed'e) |
| Hard consonant assimilation | p, c, t, k, f, h, s, s -> -ta/-te | Berat'ta, Elif'te |
| Buffer letters | Vowel + vowel -> y, n buffer | Ayse'yi, Ayse'nin |
| 2-way vowel harmony | a/e selection | Istanbul'da, Izmir'de |
| 4-way vowel harmony | i/i/u/u selection | Kudret'i, Gul'u |
| Number pronunciation | Suffix based on spoken form | 2024'te (dort -> hard) |

</details>

---

<div align="center">

MIT License

</div>
