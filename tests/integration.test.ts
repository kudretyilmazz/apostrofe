import { describe, it, expect } from 'vitest';
import {
  apostrofe,
  validate,
  detectAll,
  numberSuffix,
  abbreviationSuffix,
  normalizeApostrophe,
} from '../src/index';

describe('Integration Tests', () => {
  it('apostrofe ile üretilen çıktıyı validate doğrular', () => {
    const names = ['Kudret', 'İrem', 'Hasan', 'Berat', 'Ayşe', 'Ömer', 'Gül'];
    const cases = ['belirtme', 'yonelme', 'bulunma', 'ayrilma', 'tamlayan', 'cogul'] as const;

    for (const name of names) {
      for (const cas of cases) {
        const result = apostrofe(name, cas);
        const validation = validate(result);
        expect(validation.valid, `${result} geçersiz olmamalı`).toBe(true);
      }
    }
  });

  it('apostrofe ile üretilen çıktıyı detect bulur', () => {
    const result = apostrofe('İstanbul', 'bulunma');
    const detected = detectAll(`Yarın ${result} olacağım`);
    expect(detected).toHaveLength(1);
    expect(detected[0].stem).toBe('İstanbul');
    expect(detected[0].detectedCase).toBe('bulunma');
  });

  it('sayı + detect entegrasyonu', () => {
    const num = numberSuffix(2024, 'bulunma');
    expect(num).toBe("2024'te");
  });

  it('kısaltma + validate entegrasyonu', () => {
    const abbr = abbreviationSuffix('TDK', 'tamlayan');
    expect(abbr).toBe("TDK'nın");
  });

  it('normalize → detect zinciri', () => {
    const text = 'İstanbul\u2019da yaşıyorum';
    const normalized = normalizeApostrophe(text);
    const detected = detectAll(normalized);
    expect(detected).toHaveLength(1);
    expect(detected[0].stem).toBe('İstanbul');
  });

  it('tüm exportlar mevcut', () => {
    expect(typeof apostrofe).toBe('function');
    expect(typeof validate).toBe('function');
    expect(typeof detectAll).toBe('function');
    expect(typeof numberSuffix).toBe('function');
    expect(typeof abbreviationSuffix).toBe('function');
    expect(typeof normalizeApostrophe).toBe('function');
  });
});
