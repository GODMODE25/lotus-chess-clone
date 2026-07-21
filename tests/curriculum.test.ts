import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Chess } from 'chess.js';

const DATA_DIR = path.join(__dirname, '../data');
const SCHEMAS_DIR = path.join(__dirname, '../schemas');

describe('Curriculum Integrity Tests', () => {
  it('should load all schemas successfully', () => {
    const openingSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'opening.schema.json'), 'utf8'));
    const variationSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'variation.schema.json'), 'utf8'));
    const conceptSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'concept.schema.json'), 'utf8'));
    const trapSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'trap.schema.json'), 'utf8'));

    expect(openingSchema).toBeDefined();
    expect(variationSchema).toBeDefined();
    expect(conceptSchema).toBeDefined();
    expect(trapSchema).toBeDefined();
  });

  it('should validate concepts.json structure and uniqueness', () => {
    const conceptsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'concepts.json'), 'utf8'));
    expect(Array.isArray(conceptsData.concepts)).toBe(true);

    const ids = new Set();
    conceptsData.concepts.forEach((c: any) => {
      expect(c.id).toBeDefined();
      expect(c.name).toBeDefined();
      expect(c.category).toBeDefined();
      expect(c.description).toBeDefined();
      expect(ids.has(c.id)).toBe(false);
      ids.add(c.id);
    });
  });

  it('should validate traps.json and verify move legality and FENs', () => {
    const trapsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'traps.json'), 'utf8'));
    expect(Array.isArray(trapsData.traps)).toBe(true);

    trapsData.traps.forEach((t: any) => {
      expect(t.id).toBeDefined();
      expect(t.name).toBeDefined();
      
      const chess = new Chess();
      t.sanMoves.forEach((move: string) => {
        expect(() => chess.move(move)).not.toThrow();
      });

      const lastFen = chess.fen();
      if (t.resultingFen) {
        expect(t.resultingFen.split(' ')[0]).toBe(lastFen.split(' ')[0]);
      }
    });
  });

  it('should validate all curriculum openings and tier files dynamically', () => {
    const conceptData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'concepts.json'), 'utf8'));
    const conceptIds = new Set(conceptData.concepts.map((c: any) => c.id));

    const colors = ['white', 'black'];
    const lineIds = new Set();

    colors.forEach(color => {
      const colorDir = path.join(DATA_DIR, 'openings', color);
      if (!fs.existsSync(colorDir)) return;

      const openings = fs.readdirSync(colorDir);
      openings.forEach(openingSlug => {
        const openingDir = path.join(colorDir, openingSlug);
        if (!fs.statSync(openingDir).isDirectory()) return;

        const metadataPath = path.join(openingDir, 'metadata.json');
        expect(fs.existsSync(metadataPath)).toBe(true);

        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        expect(metadata.slug).toBeDefined();

        const tiers = ['beginner', 'novice', 'intermediate', 'advanced', 'expert', 'master', 'legend'];
        tiers.forEach(tier => {
          const filePath = path.join(openingDir, `${tier}.json`);
          expect(fs.existsSync(filePath)).toBe(true);

          const tierData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          expect(tierData.openingId).toBe(metadata.id);
          expect(tierData.tier.toLowerCase()).toBe(tier);

          tierData.lines.forEach((line: any) => {
            expect(lineIds.has(line.id)).toBe(false);
            lineIds.add(line.id);

            const chess = new Chess();
            line.sanMoves.forEach((move: string) => {
              expect(() => chess.move(move)).not.toThrow();
            });

            const finalFen = chess.fen();
            if (line.startingFen) {
              expect(line.startingFen.split(' ')[0]).toBe(finalFen.split(' ')[0]);
            }

            line.conceptIds.forEach((cid: string) => {
              expect(conceptIds.has(cid)).toBe(true);
            });
          });
        });
      });
    });
  });
});
