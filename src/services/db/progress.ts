import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { getFirebaseClient } from "@/firebase/client";
import type { ProgressRecord, OpeningVariation } from "@/types/lotus";
import {
  userDocPath,
  userSubcollectionPath,
  userSubdocPath,
  progressSubcollectionFor,
  type UserDocument,
  type OpeningProgressDocument,
  type EndgameProgressDocument,
} from "./schema";

const getLocalKey = (userId: string) => `oe_progress_${userId}`;

export async function saveProgressRecord(
  userId: string,
  isGuest: boolean,
  record: ProgressRecord
): Promise<void> {
  if (isGuest) {
    const key = getLocalKey(userId);
    const existingStr = localStorage.getItem(key);
    const existing: Record<string, ProgressRecord> = existingStr ? JSON.parse(existingStr) : {};

    existing[record.lessonId] = record;
    localStorage.setItem(key, JSON.stringify(existing));
    return;
  }

  const { db } = getFirebaseClient();
  // Firestore path: users/{userId}/progress/{lessonId}
  const docRef = doc(db, "users", userId, "progress", record.lessonId);
  await setDoc(docRef, record, { merge: true });
}

export async function getProgressRecords(
  userId: string,
  isGuest: boolean
): Promise<ProgressRecord[]> {
  if (isGuest) {
    const key = getLocalKey(userId);
    const existingStr = localStorage.getItem(key);
    if (!existingStr) return [];
    const existing: Record<string, ProgressRecord> = JSON.parse(existingStr);
    return Object.values(existing);
  }

  const { db } = getFirebaseClient();
  const progressRef = collection(db, "users", userId, "progress");
  const snapshot = await getDocs(progressRef);

  const records: ProgressRecord[] = [];
  snapshot.forEach((docSnap) => {
    records.push(docSnap.data() as ProgressRecord);
  });

  return records;
}

export async function getProgressRecord(
  userId: string,
  isGuest: boolean,
  lessonId: string
): Promise<ProgressRecord | null> {
  if (isGuest) {
    const key = getLocalKey(userId);
    const existingStr = localStorage.getItem(key);
    if (!existingStr) return null;
    const existing: Record<string, ProgressRecord> = JSON.parse(existingStr);
    return existing[lessonId] || null;
  }

  const { db } = getFirebaseClient();
  const docRef = doc(db, "users", userId, "progress", lessonId);
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as ProgressRecord) : null;
}

const getCustomVariationsKey = (userId: string) => `oe_custom_variations_${userId}`;

export async function saveCustomVariation(
  userId: string,
  isGuest: boolean,
  variation: OpeningVariation
): Promise<void> {
  if (isGuest) {
    const key = getCustomVariationsKey(userId);
    const existingStr = localStorage.getItem(key);
    const existing: Record<string, OpeningVariation> = existingStr ? JSON.parse(existingStr) : {};
    existing[variation.id] = variation;
    localStorage.setItem(key, JSON.stringify(existing));
    return;
  }

  const { db } = getFirebaseClient();
  const docRef = doc(db, "users", userId, "customVariations", variation.id);
  await setDoc(docRef, variation);
}

export async function getCustomVariations(
  userId: string,
  isGuest: boolean
): Promise<OpeningVariation[]> {
  if (isGuest) {
    const key = getCustomVariationsKey(userId);
    const existingStr = localStorage.getItem(key);
    if (!existingStr) return [];
    const existing: Record<string, OpeningVariation> = JSON.parse(existingStr);
    return Object.values(existing);
  }

  const { db } = getFirebaseClient();
  const collRef = collection(db, "users", userId, "customVariations");
  const snapshot = await getDocs(collRef);
  const list: OpeningVariation[] = [];
  snapshot.forEach((d) => {
    list.push(d.data() as OpeningVariation);
  });
  return list;
}

/**
 * Ensure the user's root document exists. Call this once after sign-in so that
 * security rules and subcollection writes have a parent document to anchor to.
 */
export async function ensureUserDocument(
  userId: string,
  isGuest: boolean,
  profile: { displayName: string; email: string; photoURL?: string }
): Promise<void> {
  if (isGuest) return;

  const { db } = getFirebaseClient();
  const ref = doc(db, userDocPath(userId));
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await setDoc(ref, { lastActiveAt: new Date().toISOString() }, { merge: true });
    return;
  }

  const userDoc: UserDocument = {
    uid: userId,
    displayName: profile.displayName,
    email: profile.email,
    photoURL: profile.photoURL,
    isGuest: false,
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
  await setDoc(ref, userDoc);
}

export async function saveOpeningProgress(
  userId: string,
  isGuest: boolean,
  progressDoc: OpeningProgressDocument
): Promise<void> {
  if (isGuest) return;
  const { db } = getFirebaseClient();
  const ref = doc(
    db,
    userSubdocPath(userId, progressSubcollectionFor("opening"), progressDoc.variationId)
  );
  await setDoc(ref, progressDoc, { merge: true });
}

export async function getOpeningProgress(
  userId: string,
  isGuest: boolean
): Promise<OpeningProgressDocument[]> {
  if (isGuest) return [];
  const { db } = getFirebaseClient();
  const ref = collection(db, userSubcollectionPath(userId, progressSubcollectionFor("opening")));
  const snap = await getDocs(ref);
  return snap.docs.map((d) => d.data() as OpeningProgressDocument);
}

export async function saveEndgameProgress(
  userId: string,
  isGuest: boolean,
  progressDoc: EndgameProgressDocument
): Promise<void> {
  if (isGuest) return;
  const { db } = getFirebaseClient();
  const ref = doc(
    db,
    userSubdocPath(userId, progressSubcollectionFor("endgame"), progressDoc.lessonId)
  );
  await setDoc(ref, progressDoc, { merge: true });
}

export async function getEndgameProgress(
  userId: string,
  isGuest: boolean
): Promise<EndgameProgressDocument[]> {
  if (isGuest) return [];
  const { db } = getFirebaseClient();
  const ref = collection(db, userSubcollectionPath(userId, progressSubcollectionFor("endgame")));
  const snap = await getDocs(ref);
  return snap.docs.map((d) => d.data() as EndgameProgressDocument);
}
