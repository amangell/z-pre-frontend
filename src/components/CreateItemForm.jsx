import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './CreateItemForm.css';

function CreateItemForm() {
    const navigate = useNavigate();
    const { user } = useUser();

    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User is not logged in.');
            return;
        }

        try {
            await fetch('http://localhost:5000/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserId: user.Id,
                    ItemName: itemName,
                    Description: description,
                    Quantity: quantity,
                }),
            });
            navigate(`/personal/${user.Id}`);
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


