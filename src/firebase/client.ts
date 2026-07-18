import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { initializeFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCi8l8-VZzvMxxzoQ0rQ6micA7w-zJb3w4",
  authDomain: "oe-chess.firebaseapp.com",
  projectId: "oe-chess",
  storageBucket: "oe-chess.firebasestorage.app",
  messagingSenderId: "515596357247",
  appId: "1:515596357247:web:4319589eb4a916868db94a",
  measurementId: "G-4HRSMQD134"
};

export interface FirebaseClient {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  );
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to the environment.");
  }

  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseClient(): FirebaseClient {
  const app = getFirebaseApp();

  return {
    app,
    auth: getAuth(app),
    db: initializeFirestore(app, { experimentalAutoDetectLongPolling: true }),
    storage: getStorage(app),
  };
}
