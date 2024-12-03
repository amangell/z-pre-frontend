import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetails.css';

function ItemDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [inventoryManager, setInventoryManager] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/items/${id}`);
                const itemData = await response.json();
                setItem(itemData);
                const userResponse = await fetch(`http://localhost:5000/users/${itemData.UserId}`);
                const userData = await userResponse.json();
                setInventoryManager(`${userData['FirstName']} ${userData['LastName']}`);
            } catch (error) {
                console.error('Error fetching item or user details:', error);
            }
        };

        fetchItemDetails();
    }, [id]);

    const handleReturn = () => {
        navigate('/visitor');
    };

    return (
        <div className="item-details-container">
            {item ? (
                <>
                    <h1 className="item-title">{item['ItemName']}</h1>
                    <p>
                        <strong>Inventory Manager:</strong> {inventoryManager || 'Loading...'}
                    </p>
                    <p>
                        <strong>Quantity:</strong> {item.Quantity}
                    </p>
                    <p>
                        <strong>Description:</strong> {item.Description}
                    </p>
                    <button className="back-button" onClick={handleReturn}>
                        Back to Items
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ItemDetails;
