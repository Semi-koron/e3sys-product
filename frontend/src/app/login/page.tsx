"use client";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { searchUserExist } from "../lib/server-action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const uuid = await axios.get("http://localhost:8080/api/verify-token");
      // uuidが取得できない場合はエラー
      if (!uuid.data.uid) {
        throw new Error("uuidが取得できませんでした");
      }
      // ユーザーが存在するか確認
      const res = await searchUserExist(uuid.data.uid);
      // res.dataが存在しない場合は、ユーザー登録を行う
      if (!res) {
        alert("ユーザー登録を行ってください");
        router.push("/user-setting");
        return;
      }
      alert("ログインしました");
      router.push("/");
    } catch (err) {
      alert("ログインに失敗しました");
      console.error(err);
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-orange-400 p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            ようこそ
          </h2>
          <form>
            <div className="mb-6">
              <Input
                type="email"
                id="email"
                title="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@example.com"
              />
            </div>
            <div className="mb-6">
              <Input
                type={showPassword ? "text" : "password"}
                title="パスワード"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="show-password"
                  className="mr-2"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label
                  htmlFor="show-password"
                  className="text-sm text-gray-600"
                >
                  パスワードを表示
                </label>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={handleLogin}
                disabled={!isFormValid}
                className={`py-2 px-4 rounded-lg font-bold text-white transition duration-300 ${
                  isFormValid
                    ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div>
        <h2>エコー</h2>
        <input
          type="text"
          value={echo}
          onChange={(e) => setEcho(e.target.value)}
        />
        <button type="button" onClick={handleEcho}>
          エコー
        </button>
      </div> */}
    </>
  );
};

export default Login;
