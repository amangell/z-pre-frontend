import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        console.log('Redirect to Sign In page');
        // Add navigation logic here
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    const handleContinueAsVisitor = () => {
        navigate('/visitor');
    };
    

    return (
        <div className="homepage-container">
            <h1 className="homepage-header">Welcome to Our App</h1>
            <div className="button-container">
                <button className="homepage-button" onClick={handleSignIn}>
                    Sign In
                </button>
                <button className="homepage-button" onClick={handleCreateAccount}>
                    Create Account
                </button>
                <button className="homepage-button" onClick={handleContinueAsVisitor}>
                    Continue as Visitor
                </button>
            </div>
        </div>
    );
}

export default HomePage;

