// Firebase SDKの必要な関数をインポート
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 認証機能（必要に応じて追加）

// Firebaseの設定情報
const firebaseConfig = {
  apiKey: "AIzaSyAKVyIhwOasuw4eoWrdxTgJGO_iDwle6M8",
  authDomain: "e3sys-product-445108.firebaseapp.com",
  projectId: "e3sys-product-445108",
  storageBucket: "e3sys-product-445108.firebasestorage.app",
  messagingSenderId: "401867910738",
  appId: "1:401867910738:web:5a773203a4043c3710398b",
  measurementId: "G-6S08F73M6L",
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// 必要なFirebase機能をエクスポート
export const auth = getAuth(app); // 認証機能
export default app; // Firebaseアプリ本体
