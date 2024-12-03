import React from 'react';
import './HomePage.css';

function HomePage() {
    const handleSignIn = () => {
        console.log('Redirect to Sign In page');
        // Add navigation logic here
    };

    const handleCreateAccount = () => {
        console.log('Redirect to Create Account page');
        // Add navigation logic here
    };

    const handleContinueAsVisitor = () => {
        console.log('Continue as a visitor');
        // Add navigation logic here
    };

    return (
        <div className="homepage-container">
            <h1 className="homepage-header">Inventory Management App</h1>
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
