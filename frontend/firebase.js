// lib/firebase.js

// Firebase SDKの必要な関数をインポート
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 認証機能（必要に応じて追加）
import { getFirestore } from "firebase/firestore"; // Firestoreデータベース（必要に応じて追加）

// Firebaseの設定情報
const firebaseConfig = {
    apiKey: "AIzaSyDw-sAKJRWu2CjXrtkPZqI0UAdu0mhz--g",
    authDomain: "e3sys-product.firebaseapp.com",
    projectId: "e3sys-product",
    storageBucket: "e3sys-product.appspot.com", // 正しいURL: .appspot.com
    messagingSenderId: "565693280193",
    appId: "1:565693280193:web:e46ddaa5cbb46853f80940"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// 必要なFirebase機能をエクスポート
export const auth = getAuth(app); // 認証機能
export const db = getFirestore(app); // Firestore
export default app; // Firebaseアプリ本体
