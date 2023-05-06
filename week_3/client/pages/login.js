import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/userService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Gọi API đăng nhập
        try {
            const response = await login({ username, password });
            const { token } = response.data;

            localStorage.setItem('token', token);

            router.push('/dashboard');
        } catch (error) {
            setError(error.response.data.message);
            setUsername("");
            setPassword("");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h3>SOIOT SYSTEM</h3>
                {error && <div className="alert">{error}</div>}
                <div className="input-group">
                    <input
                        type="text"
                        id="username"
                        placeholder="user name"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="login-form-footer">
                    <button type="submit" className="btn-login">Login</button>
                    <a href="#">or create new account</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
