import { describe, it, expect } from 'vitest';
import { numberSuffix } from '../src/number';

describe('numberSuffix', () => {
  describe('Rehberdeki örnekler', () => {
    it("2024'te — bulunma", () => {
      expect(numberSuffix(2024, 'bulunma')).toBe("2024'te");
    });

    it("2024'ten — ayrilma", () => {
      expect(numberSuffix(2024, 'ayrilma')).toBe("2024'ten");
    });

    it("1923'ten — ayrilma", () => {
      expect(numberSuffix(1923, 'ayrilma')).toBe("1923'ten");
    });

    it("3'üncü — ordinal", () => {
      expect(numberSuffix(3, 'ordinal')).toBe("3'üncü");
    });

    it("15'inci — ordinal", () => {
      expect(numberSuffix(15, 'ordinal')).toBe("15'inci");
    });
  });

  describe('Sıra sayıları (ordinal)', () => {
    it("1'inci", () => {
      expect(numberSuffix(1, 'ordinal')).toBe("1'inci");
    });

    it("2'nci", () => {
      expect(numberSuffix(2, 'ordinal')).toBe("2'nci");
    });

    it("4'üncü", () => {
      expect(numberSuffix(4, 'ordinal')).toBe("4'üncü");
    });

    it("5'inci", () => {
      expect(numberSuffix(5, 'ordinal')).toBe("5'inci");
    });

    it("6'ncı", () => {
      expect(numberSuffix(6, 'ordinal')).toBe("6'ncı");
    });

    it("7'nci", () => {
      expect(numberSuffix(7, 'ordinal')).toBe("7'nci");
    });

    it("8'inci", () => {
      expect(numberSuffix(8, 'ordinal')).toBe("8'inci");
    });

    it("9'uncu", () => {
      expect(numberSuffix(9, 'ordinal')).toBe("9'uncu");
    });

    it("10'uncu", () => {
      expect(numberSuffix(10, 'ordinal')).toBe("10'uncu");
    });
  });

  describe('Hal ekleri — tekli rakamlar', () => {
    it("0'da (sıfır)", () => {
      expect(numberSuffix(0, 'bulunma')).toBe("0'da");
    });

    it("1'de (bir)", () => {
      expect(numberSuffix(1, 'bulunma')).toBe("1'de");
    });

    it("3'te (üç — sert ünsüz)", () => {
      expect(numberSuffix(3, 'bulunma')).toBe("3'te");
    });

    it("4'te (dört — sert ünsüz)", () => {
      expect(numberSuffix(4, 'bulunma')).toBe("4'te");
    });

    it("5'te (beş — sert ünsüz)", () => {
      expect(numberSuffix(5, 'bulunma')).toBe("5'te");
    });
  });

  describe('Onluklar', () => {
    it("10'da (on)", () => {
      expect(numberSuffix(10, 'bulunma')).toBe("10'da");
    });

    it("40'ta (kırk — sert ünsüz)", () => {
      expect(numberSuffix(40, 'bulunma')).toBe("40'ta");
    });

    it("100'de (yüz)", () => {
      expect(numberSuffix(100, 'bulunma')).toBe("100'de");
    });

    it("1000'de (bin)", () => {
      expect(numberSuffix(1000, 'bulunma')).toBe("1000'de");
    });
  });

  describe('İngilizce alias', () => {
    it("2024 + locative", () => {
      expect(numberSuffix(2024, 'locative')).toBe("2024'te");
    });
  });

  describe('String input', () => {
    it('string olarak da kabul eder', () => {
      expect(numberSuffix('2024', 'bulunma')).toBe("2024'te");
    });
  });

  describe('Hata durumları', () => {
    it('geçersiz sayıda hata verir', () => {
      expect(() => numberSuffix('abc', 'bulunma')).toThrow('Geçersiz sayı');
    });
  });
});
