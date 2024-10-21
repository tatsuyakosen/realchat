import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        axios.post('/api/login', { email, password })
            .then(response => {
                onLogin(response.data.user); // ユーザー情報を親に渡す
                setError(''); // エラーメッセージをクリア
            })
            .catch(error => {
                setError('ログインに失敗しました。'); // エラーメッセージの設定
                console.error('Login error:', error);
            });
    };

    return (
        <div className="login-form">
            {error && <p className="error">{error}</p>}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
