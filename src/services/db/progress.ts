import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { getFirebaseClient } from "@/firebase/client";
import type { ProgressRecord, OpeningVariation } from "@/types/lotus";

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
