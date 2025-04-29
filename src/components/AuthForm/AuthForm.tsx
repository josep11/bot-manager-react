import React, { useState } from 'react';
import { authenticate } from '../apiWrapper';
import './AuthForm.css';

interface AuthFormProps {
    onSuccess: () => void;
    onError: (error: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, onError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await authenticate(username, password);
            // localStorage.setItem('authToken', response.token);
            onSuccess();
        } catch (error) {
            onError(error instanceof Error ? error.message : 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;