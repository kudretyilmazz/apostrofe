import { describe, it, expect } from 'vitest';
import { abbreviationSuffix } from '../src/abbreviation';

describe('abbreviationSuffix', () => {
  describe('Rehberdeki örnekler', () => {
    it("TDK'nın — harf harf okunur, son harf K (ka)", () => {
      expect(abbreviationSuffix('TDK', 'tamlayan')).toBe("TDK'nın");
    });

    it("AB'ye — harf harf okunur, son harf B (be)", () => {
      expect(abbreviationSuffix('AB', 'yonelme')).toBe("AB'ye");
    });

    it("ABD'de — harf harf okunur, son harf D (de)", () => {
      expect(abbreviationSuffix('ABD', 'bulunma')).toBe("ABD'de");
    });

    it("NATO'nun — kelime olarak okunur", () => {
      expect(abbreviationSuffix('NATO', 'tamlayan', { readAs: 'word' })).toBe("NATO'nun");
    });

    it("ODTÜ'yü — kelime olarak okunur", () => {
      expect(abbreviationSuffix('ODTÜ', 'belirtme', { readAs: 'word' })).toBe("ODTÜ'yü");
    });
  });

  describe('Harf harf okunan kısaltmalar', () => {
    it("TÜBİTAK'ın — harf: K (ka)", () => {
      // TÜBİTAK son harf K, ka okunur → ünlü ile biter
      expect(abbreviationSuffix('TÜBİTAK', 'tamlayan', { readAs: 'letter' })).toBe("TÜBİTAK'nın");
    });
  });

  describe('Kelime olarak okunan kısaltmalar', () => {
    it("NATO'da — kelime: son ünlü o", () => {
      expect(abbreviationSuffix('NATO', 'bulunma', { readAs: 'word' })).toBe("NATO'da");
    });

    it("NATO'dan — ayrılma", () => {
      expect(abbreviationSuffix('NATO', 'ayrilma', { readAs: 'word' })).toBe("NATO'dan");
    });
  });

  describe('Otomatik algılama', () => {
    it('NATO otomatik olarak word algılanır', () => {
      expect(abbreviationSuffix('NATO', 'tamlayan')).toBe("NATO'nun");
    });

    it('TDK otomatik olarak letter algılanır', () => {
      expect(abbreviationSuffix('TDK', 'tamlayan')).toBe("TDK'nın");
    });
  });

  describe('İngilizce alias', () => {
    it('genitive = tamlayan', () => {
      expect(abbreviationSuffix('TDK', 'genitive')).toBe("TDK'nın");
    });
  });

  describe('Hata durumları', () => {
    it('boş kısaltma hata verir', () => {
      expect(() => abbreviationSuffix('', 'tamlayan')).toThrow('Kısaltma boş olamaz');
    });
  });
});
