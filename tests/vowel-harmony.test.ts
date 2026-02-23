import { describe, it, expect } from 'vitest';
import {
  getLastVowel,
  isVowel,
  isHardConsonant,
  endsWithVowel,
  endsWithHardConsonant,
  getHarmoniousVowel,
} from '../src/vowel-harmony';

describe('getLastVowel', () => {
  it('finds last vowel in words with back vowels', () => {
    expect(getLastVowel('Hasan')).toBe('a');
    expect(getLastVowel('Bolu')).toBe('u');
    expect(getLastVowel('Tokat')).toBe('a');
  });

  it('finds last vowel in words with front vowels', () => {
    expect(getLastVowel('İrem')).toBe('e');
    expect(getLastVowel('Gül')).toBe('ü');
    expect(getLastVowel('Ömer')).toBe('e');
  });

  it('handles Turkish I/İ distinction', () => {
    expect(getLastVowel('IRAK')).toBe('a'); // I (dotless) is back vowel
    expect(getLastVowel('İZMİR')).toBe('i'); // İ (dotted) is front vowel
  });

  it('returns null for words with no vowels', () => {
    expect(getLastVowel('xyz')).toBeNull();
  });

  it('handles single character', () => {
    expect(getLastVowel('a')).toBe('a');
    expect(getLastVowel('t')).toBeNull();
  });
});

describe('isVowel', () => {
  it('identifies Turkish vowels', () => {
    expect(isVowel('a')).toBe(true);
    expect(isVowel('e')).toBe(true);
    expect(isVowel('ı')).toBe(true);
    expect(isVowel('i')).toBe(true);
    expect(isVowel('ö')).toBe(true);
    expect(isVowel('ü')).toBe(true);
    expect(isVowel('İ')).toBe(true);
  });

  it('rejects consonants', () => {
    expect(isVowel('b')).toBe(false);
    expect(isVowel('t')).toBe(false);
    expect(isVowel('ş')).toBe(false);
  });
});

describe('isHardConsonant', () => {
  it('identifies hard consonants (FıSTıKÇı ŞaHaP)', () => {
    expect(isHardConsonant('f')).toBe(true);
    expect(isHardConsonant('s')).toBe(true);
    expect(isHardConsonant('t')).toBe(true);
    expect(isHardConsonant('k')).toBe(true);
    expect(isHardConsonant('ç')).toBe(true);
    expect(isHardConsonant('ş')).toBe(true);
    expect(isHardConsonant('h')).toBe(true);
    expect(isHardConsonant('p')).toBe(true);
  });

  it('rejects soft consonants', () => {
    expect(isHardConsonant('b')).toBe(false);
    expect(isHardConsonant('d')).toBe(false);
    expect(isHardConsonant('g')).toBe(false);
    expect(isHardConsonant('l')).toBe(false);
    expect(isHardConsonant('n')).toBe(false);
  });
});

describe('endsWithVowel', () => {
  it('detects vowel endings', () => {
    expect(endsWithVowel('Ayşe')).toBe(true);
    expect(endsWithVowel('Ankara')).toBe(true);
  });

  it('detects consonant endings', () => {
    expect(endsWithVowel('İstanbul')).toBe(false);
    expect(endsWithVowel('Kudret')).toBe(false);
  });
});

describe('endsWithHardConsonant', () => {
  it('detects hard consonant endings', () => {
    expect(endsWithHardConsonant('Berat')).toBe(true);
    expect(endsWithHardConsonant('Elif')).toBe(true);
    expect(endsWithHardConsonant('Tokat')).toBe(true);
    expect(endsWithHardConsonant('Irak')).toBe(true);
  });

  it('detects non-hard consonant endings', () => {
    expect(endsWithHardConsonant('İstanbul')).toBe(false);
    expect(endsWithHardConsonant('İrem')).toBe(false);
  });
});

describe('getHarmoniousVowel', () => {
  describe('twoway (a/e)', () => {
    it('returns a for back vowels (a, ı, o, u)', () => {
      expect(getHarmoniousVowel('Hasan', 'twoway')).toBe('a');  // a
      expect(getHarmoniousVowel('kız', 'twoway')).toBe('a');     // ı
      expect(getHarmoniousVowel('Bolu', 'twoway')).toBe('a');    // u
      expect(getHarmoniousVowel('Muş', 'twoway')).toBe('a');     // u
    });

    it('returns e for front vowels (e, i, ö, ü)', () => {
      expect(getHarmoniousVowel('İrem', 'twoway')).toBe('e');    // e
      expect(getHarmoniousVowel('İzmir', 'twoway')).toBe('e');   // i
      expect(getHarmoniousVowel('Gül', 'twoway')).toBe('e');     // ü
      expect(getHarmoniousVowel('Ömer', 'twoway')).toBe('e');    // e
    });
  });

  describe('fourway (ı/i/u/ü)', () => {
    it('returns ı for a, ı', () => {
      expect(getHarmoniousVowel('Hasan', 'fourway')).toBe('ı');
      expect(getHarmoniousVowel('Ankara', 'fourway')).toBe('ı');
    });

    it('returns i for e, i', () => {
      expect(getHarmoniousVowel('İrem', 'fourway')).toBe('i');
      expect(getHarmoniousVowel('İzmir', 'fourway')).toBe('i');
    });

    it('returns u for o, u', () => {
      expect(getHarmoniousVowel('Bolu', 'fourway')).toBe('u');
    });

    it('returns ü for ö, ü', () => {
      expect(getHarmoniousVowel('Gül', 'fourway')).toBe('ü');
      expect(getHarmoniousVowel('Göl', 'fourway')).toBe('ü');
    });

    it('Ömer son ünlüsü e → i döner', () => {
      // Ömer'in son ünlüsü 'e' (ö değil), dolayısıyla 4'lü uyumda 'i'
      expect(getHarmoniousVowel('Ömer', 'fourway')).toBe('i');
    });
  });

  it('defaults to a/ı for words with no vowels', () => {
    expect(getHarmoniousVowel('xyz', 'twoway')).toBe('a');
    expect(getHarmoniousVowel('xyz', 'fourway')).toBe('ı');
  });
});
