import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './VisitorPage.css';

function VisitorPage() {
    const [items, setItems] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/items');
                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error('Error fetching items:', err);
            }
        };

        fetchAllItems();
    }, []);

    const handleItemClick = (itemId) => {
        navigate(`/item/${itemId}`, { state: { fromVisitor: true } });
    };

    const handleBackClick = () => {
        if (user) {
            navigate(`/personal/${user.Id}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="visitor-container">
            <button className="visitor-back-button" onClick={handleBackClick}>
                Back
            </button>
            <h1>All Available Items</h1>
            <div className="visitor-items-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="visitor-item-card clickable"
                            onClick={() => handleItemClick(item.id)}
                        >
                            <h3 className="visitor-item-title">{item.ItemName}</h3>
                            <p>
                                <strong>Managed By:</strong> {item.FirstName} {item.LastName}
                            </p>
                            <p>
                                <strong>Quantity:</strong> {item.Quantity}
                            </p>
                            <p className="visitor-item-description">
                                <strong>Description:</strong>{' '}
                                {item.Description.length > 100
                                    ? `${item.Description.slice(0, 100)}...`
                                    : item.Description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
}

export default VisitorPage;









