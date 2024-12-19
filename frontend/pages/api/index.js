// frontend/pages/index.js

import { useState } from 'react';
import { signIn, getUserToken } from '../../firebase';

const IndexPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signIn(email, password);
            setUser(userCredential);
            const token = await getUserToken();
            // トークンをバックエンドAPIに送信する処理を書く
            const response = await fetch('/api/verifyToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Sign-in failed', error);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            {user && <p>Signed in as: {user.email}</p>}
        </div>
    );
};

export default IndexPage;
