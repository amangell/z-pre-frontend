import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateAccount from './components/CreateAccount';
import VisitorPage from './components/VisitorPage';
import ItemDetails from './components/ItemDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/visitor" element={<VisitorPage />} />
                <Route path="/item/:id" element={<ItemDetails />} />
            </Routes>
        </Router>
    );
}

export default App;

