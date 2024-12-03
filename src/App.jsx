import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import VisitorPage from './components/VisitorPage';
import ItemDetails from './components/ItemDetails';
import SignInPage from './components/SignInPage';
import PersonalInventoryPage from './components/PersonalInventoryPage';
import CreateAccount from './components/CreateAccount';
import CreateItemForm from './components/CreateItemForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/visitor" element={<VisitorPage />} />
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/personal/:id" element={<PersonalInventoryPage />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/create-item" element={<CreateItemForm />} />
            </Routes>
        </Router>
    );
}

export default App;

