// frontend/pages/api/verifyToken.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            // バックエンドにトークンを送信
            const response = await fetch('http://localhost:8000/api/verifyToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            res.status(200).json(data); // ユーザー情報を返す
        } catch (error) {
            res.status(500).json({ error: 'Token verification failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
