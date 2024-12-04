import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './PersonalInventoryPage.css';

function PersonalInventoryPage() {
    const [items, setItems] = useState([]);
    const { user, logout } = useUser();
    const navigate = useNavigate();

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

        if (user) {
            fetchUserItems();
        } else {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleItemClick = (itemId) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="inventory-container">
            {user && (
                <>
                    <h1>Hello {user.FirstName}!</h1>
                    <button className="logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                    <div className="items-wrapper">
                        <div className="items-header-container">
                            <h2 className="items-header">Your Items</h2>
                            <div className="button-group">
                                <button
                                    className="add-item-button"
                                    onClick={() => navigate('/create-item')}
                                >
                                    Add New Item
                                </button>
                                <button
                                    className="view-all-items-button"
                                    onClick={() => navigate('/visitor')}
                                >
                                    View All Items
                                </button>
                            </div>
                        </div>
                        <div className="items-list">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="item-card clickable"
                                        onClick={() => handleItemClick(item.id)}
                                    >
                                        <h3 className="item-title">{item.ItemName}</h3>
                                        <p>
                                            <strong>Quantity:</strong> {item.Quantity}
                                        </p>
                                        <p className="item-description">
                                            <strong>Description:</strong>{' '}
                                            {item.Description.length > 100
                                                ? `${item.Description.slice(0, 100)}...`
                                                : item.Description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No items found for this user.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PersonalInventoryPage;








