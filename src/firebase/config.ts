// src/firebase/config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA0UlTqYYT3sKI3LFehxEjeS2mh3ok5qJs",
  authDomain: "wedding-f8487.firebaseapp.com",
  projectId: "wedding-f8487",
  storageBucket: "wedding-f8487.firebasestorage.app",
  messagingSenderId: "991693774575",
  appId: "1:991693774575:web:893a302c14131e9d32851a",
  measurementId: "G-898LXP31TN"
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