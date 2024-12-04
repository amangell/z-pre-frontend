import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PersonalInventoryPage.css';

function PersonalInventoryPage() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:5000/users/${id}`);
                const userData = await userResponse.json();
                setUser(userData);
                
                const itemsResponse = await fetch(`http://localhost:5000/users/${id}/items`);
                const itemsData = await itemsResponse.json();
                setItems(itemsData);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const handleReturn = () => {
        navigate('/');
    };

    return (
        <div className="inventory-container">
            {user ? (
                <h1>Hello {user.FirstName}!</h1>
            ) : (
                <h1>Loading...</h1>
            )}
            <button className="back-button" onClick={handleReturn}>
                Return to Home
            </button>
            <div className="items-wrapper">
                <div className="items-header-container">
                    <h2 className="items-header">Your Items</h2>
                    <button 
                        className="add-item-button" 
                        onClick={() => navigate(`/create-item`, { state: { userId: id } })}
                    >
                        Add New Item
                    </button>
                </div>
                <div className="items-list">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="item-card">
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
        </div>
    );
}

export default PersonalInventoryPage;





