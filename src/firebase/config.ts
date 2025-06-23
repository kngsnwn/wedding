// src/firebase/config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app;
let database;
let analytics;

try {
  // Initialize Firebase
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  database = getDatabase(app);
  analytics = getAnalytics(app);
} catch (error) {
  console.error("Firebase 초기화 중 오류 발생:", error);
  app = null;
  database = null;
  analytics = null;
}

const hasFirebaseConfig = app !== null;

if (!hasFirebaseConfig) {
  console.warn('Firebase 초기화에 실패했습니다. 방명록 기능이 비활성화됩니다.');
}

export { app, database, analytics, hasFirebaseConfig };
