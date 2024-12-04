import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreateItemForm.css';

function CreateItemForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserId: userId,
                    ItemName: itemName,
                    Description: description,
                    Quantity: quantity,
                }),
            });
            navigate(`/personal/${userId}`);
        } catch (err) {
            console.error('Error creating item:', err);
        }
    };
    

    return (
        <div className="create-item-container">
            <h1>Create a New Item</h1>
            <form className="create-item-form" onSubmit={handleSubmit}>
                <label>
                    Item Name:
                    <input 
                        type="text" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Description:
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Quantity:
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        min="1" 
                        required 
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateItemForm;

