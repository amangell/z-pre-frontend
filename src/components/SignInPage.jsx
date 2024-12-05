import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './SignInPage.css';

function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const user = await response.json();
                login(user);
                navigate(`/personal/${user.Id}`);
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            setError('Error signing in. Please try again.');
        }
    };

    
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="signin-container">
            <h1>Sign In</h1>
            <form className="signin-form" onSubmit={handleSignIn}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <button className="home-button" onClick={handleGoHome}>Back to Home</button>
        </div>
    );
}

export default SignInPage;


