import { describe, it, expect } from 'vitest';
import { apostrofe, addSuffix } from '../src/suffix';

describe('apostrofe', () => {
  describe('Kişi Adları — Referans Kartı', () => {
    // Kudret (ünsüz, sert ünsüz t)
    it('Kudret — tüm haller', () => {
      expect(apostrofe('Kudret', 'belirtme')).toBe("Kudret'i");
      expect(apostrofe('Kudret', 'yonelme')).toBe("Kudret'e");
      expect(apostrofe('Kudret', 'bulunma')).toBe("Kudret'te");
      expect(apostrofe('Kudret', 'ayrilma')).toBe("Kudret'ten");
      expect(apostrofe('Kudret', 'tamlayan')).toBe("Kudret'in");
      expect(apostrofe('Kudret', 'cogul')).toBe("Kudret'ler");
    });

    // İrem (ünsüz, yumuşak)
    it('İrem — tüm haller', () => {
      expect(apostrofe('İrem', 'belirtme')).toBe("İrem'i");
      expect(apostrofe('İrem', 'yonelme')).toBe("İrem'e");
      expect(apostrofe('İrem', 'bulunma')).toBe("İrem'de");
      expect(apostrofe('İrem', 'ayrilma')).toBe("İrem'den");
      expect(apostrofe('İrem', 'tamlayan')).toBe("İrem'in");
      expect(apostrofe('İrem', 'cogul')).toBe("İrem'ler");
    });

    // Hasan (ünsüz, yumuşak)
    it('Hasan — tüm haller', () => {
      expect(apostrofe('Hasan', 'belirtme')).toBe("Hasan'ı");
      expect(apostrofe('Hasan', 'yonelme')).toBe("Hasan'a");
      expect(apostrofe('Hasan', 'bulunma')).toBe("Hasan'da");
      expect(apostrofe('Hasan', 'ayrilma')).toBe("Hasan'dan");
      expect(apostrofe('Hasan', 'tamlayan')).toBe("Hasan'ın");
      expect(apostrofe('Hasan', 'cogul')).toBe("Hasan'lar");
    });

    // Berat (ünsüz, sert t)
    it('Berat — tüm haller', () => {
      expect(apostrofe('Berat', 'belirtme')).toBe("Berat'ı");
      expect(apostrofe('Berat', 'yonelme')).toBe("Berat'a");
      expect(apostrofe('Berat', 'bulunma')).toBe("Berat'ta");
      expect(apostrofe('Berat', 'ayrilma')).toBe("Berat'tan");
      expect(apostrofe('Berat', 'tamlayan')).toBe("Berat'ın");
      expect(apostrofe('Berat', 'cogul')).toBe("Berat'lar");
    });

    // Ayşe (ünlü ile biten)
    it('Ayşe — tüm haller', () => {
      expect(apostrofe('Ayşe', 'belirtme')).toBe("Ayşe'yi");
      expect(apostrofe('Ayşe', 'yonelme')).toBe("Ayşe'ye");
      expect(apostrofe('Ayşe', 'bulunma')).toBe("Ayşe'de");
      expect(apostrofe('Ayşe', 'ayrilma')).toBe("Ayşe'den");
      expect(apostrofe('Ayşe', 'tamlayan')).toBe("Ayşe'nin");
      expect(apostrofe('Ayşe', 'cogul')).toBe("Ayşe'ler");
    });

    // Ömer (ünsüz, yumuşak)
    it('Ömer — tüm haller', () => {
      expect(apostrofe('Ömer', 'belirtme')).toBe("Ömer'i");
      expect(apostrofe('Ömer', 'yonelme')).toBe("Ömer'e");
      expect(apostrofe('Ömer', 'bulunma')).toBe("Ömer'de");
      expect(apostrofe('Ömer', 'ayrilma')).toBe("Ömer'den");
      expect(apostrofe('Ömer', 'tamlayan')).toBe("Ömer'in");
      expect(apostrofe('Ömer', 'cogul')).toBe("Ömer'ler");
    });

    // Gül (ünsüz, yumuşak)
    it('Gül — tüm haller', () => {
      expect(apostrofe('Gül', 'belirtme')).toBe("Gül'ü");
      expect(apostrofe('Gül', 'yonelme')).toBe("Gül'e");
      expect(apostrofe('Gül', 'bulunma')).toBe("Gül'de");
      expect(apostrofe('Gül', 'ayrilma')).toBe("Gül'den");
      expect(apostrofe('Gül', 'tamlayan')).toBe("Gül'ün");
      expect(apostrofe('Gül', 'cogul')).toBe("Gül'ler");
    });
  });

  describe('Şehir Adları', () => {
    it('İstanbul — tüm haller', () => {
      expect(apostrofe('İstanbul', 'belirtme')).toBe("İstanbul'u");
      expect(apostrofe('İstanbul', 'yonelme')).toBe("İstanbul'a");
      expect(apostrofe('İstanbul', 'bulunma')).toBe("İstanbul'da");
      expect(apostrofe('İstanbul', 'ayrilma')).toBe("İstanbul'dan");
      expect(apostrofe('İstanbul', 'tamlayan')).toBe("İstanbul'un");
      expect(apostrofe('İstanbul', 'cogul')).toBe("İstanbul'lar");
    });

    it('Ankara — tüm haller (ünlü ile biten)', () => {
      expect(apostrofe('Ankara', 'belirtme')).toBe("Ankara'yı");
      expect(apostrofe('Ankara', 'yonelme')).toBe("Ankara'ya");
      expect(apostrofe('Ankara', 'bulunma')).toBe("Ankara'da");
      expect(apostrofe('Ankara', 'ayrilma')).toBe("Ankara'dan");
      expect(apostrofe('Ankara', 'tamlayan')).toBe("Ankara'nın");
      expect(apostrofe('Ankara', 'cogul')).toBe("Ankara'lar");
    });

    it('İzmir — tüm haller', () => {
      expect(apostrofe('İzmir', 'belirtme')).toBe("İzmir'i");
      expect(apostrofe('İzmir', 'yonelme')).toBe("İzmir'e");
      expect(apostrofe('İzmir', 'bulunma')).toBe("İzmir'de");
      expect(apostrofe('İzmir', 'ayrilma')).toBe("İzmir'den");
      expect(apostrofe('İzmir', 'tamlayan')).toBe("İzmir'in");
      expect(apostrofe('İzmir', 'cogul')).toBe("İzmir'ler");
    });

    it('Bolu — tüm haller', () => {
      expect(apostrofe('Bolu', 'belirtme')).toBe("Bolu'yu");
      expect(apostrofe('Bolu', 'yonelme')).toBe("Bolu'ya");
      expect(apostrofe('Bolu', 'bulunma')).toBe("Bolu'da");
      expect(apostrofe('Bolu', 'ayrilma')).toBe("Bolu'dan");
      expect(apostrofe('Bolu', 'tamlayan')).toBe("Bolu'nun");
      expect(apostrofe('Bolu', 'cogul')).toBe("Bolu'lar");
    });

    it('Tokat — tüm haller (sert ünsüz)', () => {
      expect(apostrofe('Tokat', 'belirtme')).toBe("Tokat'ı");
      expect(apostrofe('Tokat', 'yonelme')).toBe("Tokat'a");
      expect(apostrofe('Tokat', 'bulunma')).toBe("Tokat'ta");
      expect(apostrofe('Tokat', 'ayrilma')).toBe("Tokat'tan");
      expect(apostrofe('Tokat', 'tamlayan')).toBe("Tokat'ın");
      expect(apostrofe('Tokat', 'cogul')).toBe("Tokat'lar");
    });

    it('Muş — tüm haller', () => {
      expect(apostrofe('Muş', 'belirtme')).toBe("Muş'u");
      expect(apostrofe('Muş', 'yonelme')).toBe("Muş'a");
      expect(apostrofe('Muş', 'bulunma')).toBe("Muş'ta");
      expect(apostrofe('Muş', 'ayrilma')).toBe("Muş'tan");
      expect(apostrofe('Muş', 'tamlayan')).toBe("Muş'un");
      expect(apostrofe('Muş', 'cogul')).toBe("Muş'lar");
    });
  });

  describe('Sert Ünsüz Benzeşmesi', () => {
    it('Elif — sert ünsüz f', () => {
      expect(apostrofe('Elif', 'bulunma')).toBe("Elif'te");
      expect(apostrofe('Elif', 'ayrilma')).toBe("Elif'ten");
    });

    it('Irak — sert ünsüz k', () => {
      expect(apostrofe('Irak', 'bulunma')).toBe("Irak'ta");
      expect(apostrofe('Irak', 'ayrilma')).toBe("Irak'tan");
    });
  });

  describe('İngilizce Alias Desteği', () => {
    it('accusative = belirtme', () => {
      expect(apostrofe('İstanbul', 'accusative')).toBe("İstanbul'u");
    });

    it('dative = yonelme', () => {
      expect(apostrofe('İstanbul', 'dative')).toBe("İstanbul'a");
    });

    it('locative = bulunma', () => {
      expect(apostrofe('İstanbul', 'locative')).toBe("İstanbul'da");
    });

    it('ablative = ayrilma', () => {
      expect(apostrofe('İstanbul', 'ablative')).toBe("İstanbul'dan");
    });

    it('genitive = tamlayan', () => {
      expect(apostrofe('İstanbul', 'genitive')).toBe("İstanbul'un");
    });

    it('plural = cogul', () => {
      expect(apostrofe('İstanbul', 'plural')).toBe("İstanbul'lar");
    });
  });

  describe('Options', () => {
    it('tipografik apostrof kullanır', () => {
      expect(apostrofe('İstanbul', 'bulunma', { apostrophe: '\u2019' })).toBe('İstanbul\u2019da');
    });

    it('apostrof olmadan yazar', () => {
      expect(apostrofe('İstanbul', 'bulunma', { useApostrophe: false })).toBe('İstanbulda');
    });
  });

  describe('Kurum ve Marka Adları', () => {
    it('Microsoft — tamlayan', () => {
      expect(apostrofe('Microsoft', 'tamlayan')).toBe("Microsoft'un");
    });

    it('Apple — tamlayan (son ünlü e → nin)', () => {
      expect(apostrofe('Apple', 'tamlayan')).toBe("Apple'nin");
    });
  });

  describe('Edge Cases', () => {
    it('boş isim hata verir', () => {
      expect(() => apostrofe('', 'belirtme')).toThrow('İsim boş olamaz');
    });

    it('whitespace trim edilir', () => {
      expect(apostrofe('  İstanbul  ', 'bulunma')).toBe("İstanbul'da");
    });
  });

  describe('addSuffix alias', () => {
    it('apostrofe ile aynı sonucu verir', () => {
      expect(addSuffix('İstanbul', 'bulunma')).toBe(apostrofe('İstanbul', 'bulunma'));
    });
  });
});
