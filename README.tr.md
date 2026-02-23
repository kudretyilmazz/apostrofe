# apostrofe

Hafif, tip-guvenli Turkce kesme isareti kural motoru.

[English README](./README.md)

## Ozellikler

- Sifir bagimlilik, saf TypeScript
- ESM + CJS cift cikti
- Tree-shakeable (`sideEffects: false`)
- ~3KB minified + gzipped
- Tam unlu uyumu, unsuz benzesmesi, kaynastirma harfleri
- Sayi ve kisaltma ek destegi
- Dogrulama ve tespit yardimcilari
- Turkce ve Ingilizce API isimleri

## Kurulum

```bash
npm install apostrofe
```

## Kullanim

### Ek Ekleme

```ts
import { apostrofe } from 'apostrofe';

apostrofe('Istanbul', 'bulunma');     // "Istanbul'da"
apostrofe('Berat', 'bulunma');        // "Berat'ta"     (sert unsuz)
apostrofe('Ayse', 'belirtme');        // "Ayse'yi"      (kaynastirma y)
apostrofe('Ankara', 'tamlayan');      // "Ankara'nin"   (kaynastirma n)
apostrofe('Gul', 'belirtme');         // "Gul'u"        (4'lu uyum)

// Ingilizce isimler de calisir
apostrofe('Istanbul', 'locative');    // "Istanbul'da"
```

### Desteklenen Hal Ekleri

| Turkce | Ingilizce | Ek |
|--------|-----------|-----|
| `belirtme` | `accusative` | -i/-i/-u/-u / -yi/-yi/-yu/-yu |
| `yonelme` | `dative` | -a/-e / -ya/-ye |
| `bulunma` | `locative` | -da/-de / -ta/-te |
| `ayrilma` | `ablative` | -dan/-den / -tan/-ten |
| `tamlayan` | `genitive` | -in/-in/-un/-un / -nin/-nin/-nun/-nun |
| `cogul` | `plural` | -lar/-ler |

### Sayi Ekleri

```ts
import { numberSuffix } from 'apostrofe';

numberSuffix(2024, 'bulunma');    // "2024'te"
numberSuffix(3, 'ordinal');       // "3'uncu"
numberSuffix(1923, 'ayrilma');    // "1923'ten"
numberSuffix(15, 'ordinal');      // "15'inci"
```

### Kisaltma Ekleri

```ts
import { abbreviationSuffix } from 'apostrofe';

abbreviationSuffix('TDK', 'tamlayan');                       // "TDK'nin"
abbreviationSuffix('AB', 'yonelme');                          // "AB'ye"
abbreviationSuffix('NATO', 'tamlayan', { readAs: 'word' });  // "NATO'nun"
abbreviationSuffix('ODTU', 'belirtme', { readAs: 'word' });  // "ODTU'yu"
```

### Dogrulama

```ts
import { validate } from 'apostrofe';

validate("Berat'da");
// { valid: false, errors: [{ code: 'HARD_CONSONANT_MISMATCH', ... }],
//   suggestion: "Berat'ta" }

validate("Istanbul'da");
// { valid: true, errors: [] }
```

Hata kodlari: `HARD_CONSONANT_MISMATCH`, `VOWEL_HARMONY_VIOLATION`, `BUFFER_LETTER_ERROR`, `CONSONANT_SOFTENING`, `INVALID_APOSTROPHE_CHAR`, `NOT_PROPER_NOUN`

### Tespit

```ts
import { detectAll } from 'apostrofe';

detectAll("Istanbul'da yasayan Ayse'nin kedisi");
// [
//   { match: "Istanbul'da", stem: "Istanbul", suffix: "da", detectedCase: "bulunma" },
//   { match: "Ayse'nin", stem: "Ayse", suffix: "nin", detectedCase: "tamlayan" }
// ]
```

### Normalizasyon

```ts
import { normalizeApostrophe } from 'apostrofe';

// Tipografik apostrof -> ASCII
normalizeApostrophe("Istanbul\u2019da");  // "Istanbul'da"
```

### Yardimci Fonksiyonlar

```ts
import { getLastVowel, isHardConsonant, getHarmoniousVowel } from 'apostrofe';

getLastVowel('Istanbul');                    // 'u'
isHardConsonant('t');                        // true
getHarmoniousVowel('Istanbul', 'twoway');    // 'a'
getHarmoniousVowel('Istanbul', 'fourway');   // 'u'
```

## Uygulanan Kurallar

1. **Unsuz yumusamasi YAPILMAZ**: Mehmet'e (Mehmed'e DEGIL)
2. **Sert unsuz benzesmesi**: p, c, t, k, f, h, s, s -> -ta/-te (Berat'ta)
3. **Kaynastirma harfleri**: y (Ayse'yi), n (Ayse'nin)
4. **Tam unlu uyumu**: 2'li (a/e) ve 4'lu (i/i/u/u) sistemler
5. **Sayi telaffuzu**: Ek, okunusa gore belirlenir (2024 -> "dort" -> sert unsuz)
6. **Iyelik eki -> kesme YOK** (TDK kurali): Kudretim, Ankaramiz
7. **Yapim ekleri -> kesme YOK**: Ankarali, Istanbullu

## Lisans

MIT
