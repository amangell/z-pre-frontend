import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateAccount from './components/CreateAccount';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
}

export default App;

