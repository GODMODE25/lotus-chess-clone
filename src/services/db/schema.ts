import type { LessonKind } from "@/types/lotus";

/**
 * Firestore schema definition for OE Chess.
 *
 * All user-owned data lives under the `users/{userId}` document as subcollections.
 * Global catalog data (openings, endgames) is stored at the root level and is
 * readable by any authenticated user but only writable by admins.
 */

export const ROOT_COLLECTIONS = {
  users: "users",
  openings: "openings",
  endgames: "endgames",
} as const;

export const USER_SUBCOLLECTIONS = {
  progress: "progress",
  openingProgress: "openingProgress",
  endgameProgress: "endgameProgress",
  customVariations: "customVariations",
} as const;

type UserSubcollection = (typeof USER_SUBCOLLECTIONS)[keyof typeof USER_SUBCOLLECTIONS];

/** Build a typed Firestore document path for a user-owned resource. */
export function userDocPath(userId: string): string {
  return `${ROOT_COLLECTIONS.users}/${userId}`;
}

export function userSubcollectionPath(userId: string, subcollection: UserSubcollection): string {
  return `${ROOT_COLLECTIONS.users}/${userId}/${subcollection}`;
}

export function userSubdocPath(
  userId: string,
  subcollection: UserSubcollection,
  docId: string,
): string {
  return `${ROOT_COLLECTIONS.users}/${userId}/${subcollection}/${docId}`;
}

/** Map a lesson kind to its dedicated progress subcollection. */
export function progressSubcollectionFor(kind: LessonKind): UserSubcollection {
  return kind === "opening"
    ? USER_SUBCOLLECTIONS.openingProgress
    : USER_SUBCOLLECTIONS.endgameProgress;
}

export interface UserDocument {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  isGuest: boolean;
  createdAt: string;
  lastActiveAt: string;
}

export interface OpeningProgressDocument {
  variationId: string;
  completedRepetitions: number;
  mistakeCount: number;
  accuracy: number;
  mastery: number;
  rank: string;
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface EndgameProgressDocument {
  lessonId: string;
  completedRepetitions: number;
  mistakeCount: number;
  accuracy: number;
  mastery: number;
  rank: string;
  lastReviewedAt: string;
  nextReviewAt: string;
}
