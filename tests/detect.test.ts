import { describe, it, expect } from 'vitest';
import { detect, detectAll } from '../src/detect';

describe('detectAll', () => {
  it('birden fazla kesme işaretli kelime tespit eder', () => {
    const results = detectAll("İstanbul'da yaşayan Ayşe'nin kedisi");
    expect(results).toHaveLength(2);

    expect(results[0].match).toBe("İstanbul'da");
    expect(results[0].stem).toBe('İstanbul');
    expect(results[0].suffix).toBe('da');
    expect(results[0].index).toBe(0);
    expect(results[0].detectedCase).toBe('bulunma');

    expect(results[1].match).toBe("Ayşe'nin");
    expect(results[1].stem).toBe('Ayşe');
    expect(results[1].suffix).toBe('nin');
    expect(results[1].detectedCase).toBe('tamlayan');
  });

  it('apostrof olmayan metinde boş array döner', () => {
    expect(detectAll('Bu bir test cümlesidir')).toHaveLength(0);
  });

  it('tipografik apostrof tespit eder', () => {
    const results = detectAll('İstanbul\u2019da güzel');
    expect(results).toHaveLength(1);
    expect(results[0].apostropheChar).toBe('\u2019');
  });

  it('farklı hal eklerini doğru algılar', () => {
    const text = "Ankara'dan gelen Mehmet'e söyle İzmir'i görmüş Berat'ta kalmış";
    const results = detectAll(text);

    const cases = results.map(r => r.detectedCase);
    expect(cases).toContain('ayrilma');
    expect(cases).toContain('yonelme');
    expect(cases).toContain('belirtme');
    expect(cases).toContain('bulunma');
  });

  it('çoğul eki tespit eder', () => {
    const results = detectAll("Mehmet'ler geldi");
    expect(results[0].detectedCase).toBe('cogul');
  });
});

describe('detect', () => {
  it('ilk eşleşmeyi döner', () => {
    const result = detect("İstanbul'da yaşayan Ayşe'nin kedisi");
    expect(result).not.toBeNull();
    expect(result!.match).toBe("İstanbul'da");
  });

  it('eşleşme yoksa null döner', () => {
    expect(detect('Bu bir test')).toBeNull();
  });
});
