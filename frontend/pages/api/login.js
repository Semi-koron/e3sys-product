import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Firebaseでログイン
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firebaseトークンを取得
            const token = await user.getIdToken();

            // トークンをバックエンドに送信
            const response = await axios.post('http://localhost:8000/api/verify-token', { token });

            // ユーザー情報が返ってきたら、ダッシュボードページへ遷移
            if (response.status === 200) {
                router.push('/dashboard'); // ユーザーダッシュボードにリダイレクト
            }
        } catch (err) {
            setError('ログインに失敗しました。再度確認してください。');
        }
    };

    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">ログイン</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
