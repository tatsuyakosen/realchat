import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Group from './components/Group';
import Profile from './components/Profile';

const App = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(''); // エラーメッセージの状態を管理
    const [loading, setLoading] = useState(false); // ローディングの状態を管理

    const handleLogin = (userData) => {
        setUser(userData);
        setLoading(false); // ログイン処理が完了したらローディングをオフ
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setLoading(false); // エラーが発生したらローディングをオフ
    };

    return (
        <Router>
            <div className="app-container">
                <h1>Real-time Chat Application</h1>
                {loading && <p>Loading...</p>} {/* ローディング中のメッセージ */}
                {error && <p className="error">{error}</p>} {/* エラーメッセージの表示 */}
                <Switch>
                    <Route path="/loginpage">
                        {!user ? (
                            <Login onLogin={handleLogin} onError={handleError} />
                        ) : (
                            <Profile user={user} />
                        )}
                    </Route>
                    <Route path="/chat">
                        {user ? <Chat /> : <Login onLogin={handleLogin} onError={handleError} />}
                    </Route>
                    <Route path="/group">
                        {user ? <Group /> : <Login onLogin={handleLogin} onError={handleError} />}
                    </Route>
                    <Route path="/">
                        {user ? <Profile user={user} /> : <Login onLogin={handleLogin} onError={handleError} />}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
