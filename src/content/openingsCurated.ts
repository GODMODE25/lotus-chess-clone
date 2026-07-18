import beginnerData from "@/data/openings/white/italian/beginner.json";
import noviceData from "@/data/openings/white/italian/novice.json";
import intermediateData from "@/data/openings/white/italian/intermediate.json";
import advancedData from "@/data/openings/white/italian/advanced.json";
import expertData from "@/data/openings/white/italian/expert.json";
import masterData from "@/data/openings/white/italian/master.json";
import legendData from "@/data/openings/white/italian/legend.json";
import metadata from "@/data/openings/white/italian/metadata.json";

export interface CuratedLine {
  id: string;
  parentVariation: string;
  openingFamily: string;
  variationName: string;
  aliases: string[];
  eco: string;
  pgn: string;
  sanMoves: string[];
  uciMoves: string[];
  startingFen: string;
  moveDepth: number;
  difficulty: number;
  popularity: number;
  prerequisites: string[];
  continuationIds: string[];
  conceptIds: string[];
  strategicIdeas: string[];
  tacticalMotifs: string[];
  commonMistakes: string[];
  explanation: string;
  reviewPriority: number;
  estimatedStudyMinutes: number;
  masteryXp: number;
  masteryLevel: string; // "Beginner" | "Novice" | ... | "Legend"
  tierIndex: number; // 0–6 matching metadata.masteryLevels[].level - 1
}

export interface MasteryLevelMetadata {
  level: number;
  tier: string;
  objectives: string[];
  expectedKnowledge: string;
  averageMoveDepth: number;
  averageLineCount: number;
  xpReward: number;
  graduationRequirements: string;
}

export interface OpeningCuratedMetadata {
  id: string;
  name: string;
  slug: string;
  ecoRange: string;
  family: string;
  colour: "white" | "black";
  popularity: number;
  difficulty: number;
  description: string;
  strategicOverview: string;
  typicalPawnStructures: string[];
  commonTacticalThemes: string[];
  modelPlayers: string[];
  recommendedStudyOrder: string[];
  baseMoves: string[];
  masteryLevels: MasteryLevelMetadata[];
}

export interface CuratedOpening {
  metadata: OpeningCuratedMetadata;
  lines: CuratedLine[];
}

export const curatedOpenings: Record<string, CuratedOpening> = {
  "italian-game": {
    metadata: metadata as OpeningCuratedMetadata,
    lines: [
      ...beginnerData.lines.map((l: any) => ({ ...l, masteryLevel: "Beginner", tierIndex: 0 })),
      ...noviceData.lines.map((l: any) => ({ ...l, masteryLevel: "Novice", tierIndex: 1 })),
      ...intermediateData.lines.map((l: any) => ({ ...l, masteryLevel: "Intermediate", tierIndex: 2 })),
      ...advancedData.lines.map((l: any) => ({ ...l, masteryLevel: "Advanced", tierIndex: 3 })),
      ...expertData.lines.map((l: any) => ({ ...l, masteryLevel: "Expert", tierIndex: 4 })),
      ...masterData.lines.map((l: any) => ({ ...l, masteryLevel: "Master", tierIndex: 5 })),
      ...legendData.lines.map((l: any) => ({ ...l, masteryLevel: "Legend", tierIndex: 6 })),
    ],
  },
};
