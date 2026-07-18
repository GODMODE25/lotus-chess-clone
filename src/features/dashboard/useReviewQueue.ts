import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { getProgressRecords, getCustomVariations } from "@/services/db/progress";
import { whiteRepertoiresRaw, blackRepertoiresRaw } from "@/content/openingsData";
import { curatedOpenings } from "@/content/openingsCurated";
import { getLineDisplayName } from "@/services/learning/progression";
import { getEndgameLessonById } from "@/content/endgamesData";
import type { ReviewItem, ProgressRecord, OpeningVariation } from "@/types/lotus";

export function useReviewQueue() {
  const { user, loading } = useAuth();
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQueue = useCallback(async () => {
    if (loading) return;
    
    if (!user) {
      setQueue([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const [records, customVars] = await Promise.all([
        getProgressRecords(user.uid, user.isGuest ?? false),
        getCustomVariations(user.uid, user.isGuest ?? false),
      ]);
      
      const now = new Date();
      const dueRecords = records.filter(record => {
        if (!record.nextReviewDate) return true; // Due if not set
        return new Date(record.nextReviewDate) <= now;
      });

      // Sort by due date, older first
      dueRecords.sort((a, b) => {
        const dateA = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
        const dateB = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
        return dateA - dateB;
      });

      const items = dueRecords
        .map(record => mapToReviewItem(record, customVars))
        .filter(Boolean) as ReviewItem[];
      setQueue(items);
    } catch (error) {
      console.error("Failed to fetch review queue:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  return { queue, isLoading, refresh: fetchQueue };
}

function mapToReviewItem(record: ProgressRecord, customVars: OpeningVariation[]): ReviewItem | null {
  if (record.lessonKind === "opening") {
    // 1. Check if custom
    if (record.lessonId.startsWith("custom_")) {
      const customVar = customVars.find(c => c.id === record.lessonId);
      return {
        id: record.lessonId,
        title: customVar?.opening || "Custom Opening",
        subtitle: customVar?.variation || "Custom Line",
        lessonKind: "opening",
        rank: record.rank,
        confidence: record.confidence,
        dueLabel: getDueLabel(record.nextReviewDate),
      };
    }

    // 2. Curated variation: italian-beginner-giuoco-pianissimo-main
    for (const curated of Object.values(curatedOpenings)) {
      const line = curated.lines.find((l) => l.id === record.lessonId);
      if (line) {
        return {
          id: record.lessonId,
          title: curated.metadata.name,
          subtitle: getLineDisplayName(line),
          lessonKind: "opening",
          rank: record.rank,
          confidence: record.confidence,
          dueLabel: getDueLabel(record.nextReviewDate),
        };
      }
    }

    // 3. Standard synthetic variation: ruy-lopez-line-15
    const match = record.lessonId.match(/^([a-z-]+)-line-(\d+)$/);
    if (match) {
      const repId = match[1];
      const lineIndex = parseInt(match[2], 10) - 1;
      const rawRep = [...whiteRepertoiresRaw, ...blackRepertoiresRaw].find(r => r.id === repId);
      if (rawRep) {
        const tierNames = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert", "Master", "Legend"];
        const tierIndex = Math.min(6, Math.floor(lineIndex / 25));
        const levelName = `${rawRep.name} ${tierNames[tierIndex]} Variation ${(lineIndex % 25) + 1}`;

        return {
          id: record.lessonId,
          title: rawRep.name,
          subtitle: levelName,
          lessonKind: "opening",
          rank: record.rank,
          confidence: record.confidence,
          dueLabel: getDueLabel(record.nextReviewDate),
        };
      }
    }
  } else if (record.lessonKind === "endgame") {
    const endgame = getEndgameLessonById(record.lessonId);
    if (endgame) {
      return {
        id: record.lessonId,
        title: "Endgame",
        subtitle: endgame.name,
        lessonKind: "endgame",
        rank: record.rank,
        confidence: record.confidence,
        dueLabel: getDueLabel(record.nextReviewDate),
      };
    }
  }
  return null;
}

function getDueLabel(nextReviewDate?: string): string {
  if (!nextReviewDate) return "Due now";
  
  const due = new Date(nextReviewDate);
  const now = new Date();
  
  if (due <= now) return "Due now";
  
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 3600 * 24));
  return `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
}
