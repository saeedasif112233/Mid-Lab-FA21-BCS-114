import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyDMDDTeX2QUxrp61en1ertjN3vFNclwyTk",
  authDomain: "mid-lab-3fa54.firebaseapp.com",
  projectId: "mid-lab-3fa54",
  storageBucket: "mid-lab-3fa54.appspot.com",
  messagingSenderId: "660988249816",
  appId: "1:660988249816:web:630fd180feeb966229b9ad",
  measurementId: "G-6CQ7HS5ED5",
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
