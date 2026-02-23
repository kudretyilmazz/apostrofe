import { describe, it, expect } from 'vitest';
import { normalizeApostrophe } from '../src/normalize';

describe('normalizeApostrophe', () => {
  it('tipografik apostrofü ASCII\'ye dönüştürür', () => {
    expect(normalizeApostrophe('İstanbul\u2019da')).toBe("İstanbul'da");
  });

  it('modifier letter apostrofü dönüştürür', () => {
    expect(normalizeApostrophe('İstanbul\u02BCda')).toBe("İstanbul'da");
  });

  it('birden fazla varyantı tek seferde dönüştürür', () => {
    const mixed = "İstanbul\u2019da ve Ankara\u02BCda ve Bolu'da";
    expect(normalizeApostrophe(mixed)).toBe("İstanbul'da ve Ankara'da ve Bolu'da");
  });

  it('hedef karakteri değiştirilebilir', () => {
    expect(normalizeApostrophe("İstanbul'da", '\u2019')).toBe('İstanbul\u2019da');
  });

  it('backtick normalizasyonu opsiyonel', () => {
    expect(normalizeApostrophe('İstanbul`da')).toBe('İstanbul`da'); // default: no
    expect(normalizeApostrophe('İstanbul`da', "'", { normalizeBacktick: true })).toBe("İstanbul'da");
  });

  it('apostrof olmayan metine dokunmaz', () => {
    expect(normalizeApostrophe('Merhaba dünya')).toBe('Merhaba dünya');
  });
});
