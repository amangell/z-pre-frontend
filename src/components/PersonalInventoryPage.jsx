import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PersonalInventoryPage.css';

function PersonalInventoryPage() {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state;

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${user.Id}/items`);
                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error('Error fetching user items:', err);
            }
        };

        fetchUserItems();
    }, [user.Id]);

    const handleReturn = () => {
        navigate('/');
    };

    return (
        <div className="inventory-container">
            <h1>Hello {user.FirstName}!</h1>
            <button className="back-button" onClick={handleReturn}>
                Return to Home
            </button>
            <div className="items-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="item-card">
                            <h3 className="item-title">{item.ItemName}</h3>
                            <p>
                                <strong>Quantity:</strong> {item.Quantity}
                            </p>
                            <p className="item-description">
                                <strong>Description:</strong> {item.Description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No items found for this user.</p>
                )}
            </div>
        </div>
    );
}

export default PersonalInventoryPage;
