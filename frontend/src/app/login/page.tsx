"use client";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [echo, setEcho] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Firebaseでログイン
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firebaseトークンを取得
      const token = await user.getIdToken();
      // sessionStorageにトークンを保存
      sessionStorage.setItem("token", token);
      // bearerToken()ヘッダーにトークンをセット
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // トークンを認証
      const res = await axios.get("http://localhost:8080/api/verify-token");
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEcho = async () => {
    try {
      // sesstionStorageからトークンを取得
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post("http://localhost:8080/api/echo", {
        question: echo,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <h2>ログイン</h2>
        <form>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleLogin}>
            ログイン
          </button>
        </form>
      </div>
      <div>
        <h2>エコー</h2>
        <input
          type="text"
          value={echo}
          onChange={(e) => setEcho(e.target.value)}
        />
        <button type="button" onClick={handleEcho}>
          エコー
        </button>
      </div>
    </>
  );
};

export default Login;
