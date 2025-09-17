import React, { useState, useEffect } from 'react';

interface AuthProps {
    onLogin: (credentials: {email: string, password: string}) => void;
    onRegister: (credentials: {email: string, password: string, username: string}) => void;
    authError: string | null;
    setAuthError: (error: string | null) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, authError, setAuthError }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        // Clear form errors and state when switching between login/register
        setFormError(null);
        setAuthError(null);
        setEmail('');
        setPassword('');
        setUsername('');
    }, [isLogin, setAuthError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setAuthError(null);

        if (!email.trim() || !password.trim() || (!isLogin && !username.trim())) {
            setFormError('Please fill in all fields.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setFormError('Please enter a valid email address.');
            return;
        }

        if (isLogin) {
            onLogin({ email, password });
        } else {
             if (username.trim().length < 3) {
                setFormError('Username must be at least 3 characters.');
                return;
            }
            onRegister({ email, password, username: username.trim() });
        }
    };

    return (
        <section id="auth" className="bg-bf-gray-primary p-6 rounded-lg shadow-xl max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-bf-blue">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g., BigRon"
                            className="w-full bg-bf-gray-secondary border border-gray-600 rounded-md p-3 focus:ring-bf-blue focus:border-bf-blue"
                            required={!isLogin}
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-bf-gray-secondary border border-gray-600 rounded-md p-3 focus:ring-bf-blue focus:border-bf-blue"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-bf-gray-secondary border border-gray-600 rounded-md p-3 focus:ring-bf-blue focus:border-bf-blue"
                        required
                    />
                </div>

                {formError && <p className="text-sm text-red-400 text-center">{formError}</p>}
                {authError && <p className="text-sm text-red-400 text-center">{authError}</p>}

                <div className="text-center pt-2">
                    <button
                        type="submit"
                        className="w-full bg-bf-blue text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-400 hover:text-bf-blue transition-colors duration-200"
                >
                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                </button>
            </div>
        </section>
    );
};