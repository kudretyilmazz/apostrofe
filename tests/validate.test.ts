import { describe, it, expect } from 'vitest';
import { validate } from '../src/validate';

describe('validate', () => {
  describe('Doğru kullanımlar', () => {
    it("İstanbul'da — geçerli", () => {
      const result = validate("İstanbul'da");
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("Berat'ta — geçerli (sert ünsüz)", () => {
      const result = validate("Berat'ta");
      expect(result.valid).toBe(true);
    });

    it("İrem'e — geçerli", () => {
      const result = validate("İrem'e");
      expect(result.valid).toBe(true);
    });

    it("Ayşe'yi — geçerli (kaynaştırma y)", () => {
      const result = validate("Ayşe'yi");
      expect(result.valid).toBe(true);
    });

    it("Ankara'nın — geçerli (kaynaştırma n)", () => {
      const result = validate("Ankara'nın");
      expect(result.valid).toBe(true);
    });

    it("Kudret'in — geçerli", () => {
      const result = validate("Kudret'in");
      expect(result.valid).toBe(true);
    });
  });

  describe('Sert ünsüz benzeşmesi hataları', () => {
    it("Berat'da → Berat'ta önerir", () => {
      const result = validate("Berat'da");
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('HARD_CONSONANT_MISMATCH');
      expect(result.suggestion).toBe("Berat'ta");
    });

    it("Tokat'da → Tokat'ta önerir", () => {
      const result = validate("Tokat'da");
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('HARD_CONSONANT_MISMATCH');
      expect(result.suggestion).toBe("Tokat'ta");
    });

    it("Elif'de → Elif'te önerir", () => {
      const result = validate("Elif'de");
      expect(result.valid).toBe(false);
      expect(result.suggestion).toBe("Elif'te");
    });

    it("Berat'dan → Berat'tan önerir", () => {
      const result = validate("Berat'dan");
      expect(result.valid).toBe(false);
      expect(result.suggestion).toBe("Berat'tan");
    });
  });

  describe('Ünlü uyumu hataları', () => {
    it("İstanbul'de → İstanbul'da önerir", () => {
      const result = validate("İstanbul'de");
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'VOWEL_HARMONY_VIOLATION')).toBe(true);
      expect(result.suggestion).toBe("İstanbul'da");
    });
  });

  describe('Özel isim kontrolü', () => {
    it("istanbul'da — küçük harfle başlıyor", () => {
      const result = validate("istanbul'da");
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('NOT_PROPER_NOUN');
    });
  });

  describe('Geçersiz apostrof karakteri', () => {
    it("backtick kullanımı uyarı verir", () => {
      const result = validate("İstanbul`da");
      expect(result.valid).toBe(false);
      expect(result.errors[0].code).toBe('INVALID_APOSTROPHE_CHAR');
    });
  });

  describe('Tipografik apostrof', () => {
    it("İstanbul\u2019da — geçerli", () => {
      const result = validate("İstanbul\u2019da");
      expect(result.valid).toBe(true);
    });
  });

  describe('Apostrof olmayan kelimeler', () => {
    it("normal kelime — geçerli (apostrof yok)", () => {
      const result = validate("merhaba");
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
