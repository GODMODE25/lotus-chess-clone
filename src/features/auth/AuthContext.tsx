"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirebaseClient, isFirebaseConfigured } from "@/firebase/client";

export interface UserSession {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInAsGuest: (displayName: string) => void;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Auth State
  useEffect(() => {
    let unsubscribe = () => {};

    if (isFirebaseConfigured()) {
      try {
        const { auth } = getFirebaseClient();
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Chess Scholar",
              photoURL: firebaseUser.photoURL || "",
              isGuest: false
            });
          } else {
            // Check if there is a guest session stored locally
            const savedGuest = localStorage.getItem("oe_guest_user");
            if (savedGuest) {
              setUser(JSON.parse(savedGuest));
            } else {
              setUser(null);
            }
          }
          setLoading(false);
        });
      } catch (err) {
        console.error("Firebase auth initialization failed, falling back to local session:", err);
        loadLocalGuestSession();
      }
    } else {
      loadLocalGuestSession();
    }

    function loadLocalGuestSession() {
      const savedGuest = localStorage.getItem("oe_guest_user");
      if (savedGuest) {
        setUser(JSON.parse(savedGuest));
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const { auth } = getFirebaseClient();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Remove any guest user from localStorage
      localStorage.removeItem("oe_guest_user");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      setLoading(false);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      const { auth } = getFirebaseClient();
      await signInWithEmailAndPassword(auth, email, pass);
      localStorage.removeItem("oe_guest_user");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Email");
      setLoading(false);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      const { auth } = getFirebaseClient();
      await createUserWithEmailAndPassword(auth, email, pass);
      localStorage.removeItem("oe_guest_user");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
      setLoading(false);
      throw err;
    }
  };

  const signInAsGuest = (displayName: string) => {
    setError(null);
    setLoading(true);
    const guestUser: UserSession = {
      uid: `guest_${Date.now()}`,
      email: null,
      displayName: displayName.trim() || "Guest Player",
      photoURL: "",
      isGuest: true
    };
    localStorage.setItem("oe_guest_user", JSON.stringify(guestUser));
    setUser(guestUser);
    setLoading(false);
  };

  const signOutUser = async () => {
    setError(null);
    setLoading(true);
    try {
      if (user && !user.isGuest && isFirebaseConfigured()) {
        const { auth } = getFirebaseClient();
        await firebaseSignOut(auth);
      }
    } catch (err: any) {
      console.error("Firebase logout failed:", err);
    } finally {
      localStorage.removeItem("oe_guest_user");
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        signOutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
