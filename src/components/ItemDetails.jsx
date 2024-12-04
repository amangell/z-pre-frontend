import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './ItemDetails.css';

function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [item, setItem] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedItem, setUpdatedItem] = useState({ ItemName: '', Description: '', Quantity: '' });

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/items/${id}`);
                const data = await response.json();
                setItem(data);
                setUpdatedItem({ ItemName: data.ItemName, Description: data.Description, Quantity: data.Quantity });
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItemDetails();
    }, [id]);

    const handleSave = async () => {
        try {
            await fetch(`http://localhost:5000/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });
            setItem(updatedItem);
            setEditMode(false);
            alert('Item updated successfully!');
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save the item. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await fetch(`http://localhost:5000/items/${id}`, {
                    method: 'DELETE',
                });
                alert('Item deleted successfully!');
                navigate(`/personal/${user.Id}`);
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete the item. Please try again.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleReturn = () => {
        navigate(user ? `/personal/${user.Id}` : '/visitor');
    };

    return (
        <div className="item-details-container">
            {item ? (
                <>
                    <h1 className="item-title">{editMode ? 'Edit Item' : item.ItemName}</h1>
                    {editMode ? (
                        <form className="edit-form">
                            <label>
                                Item Name:
                                <input
                                    type="text"
                                    name="ItemName"
                                    value={updatedItem.ItemName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    name="Description"
                                    value={updatedItem.Description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    name="Quantity"
                                    value={updatedItem.Quantity}
                                    onChange={handleInputChange}
                                    min="1"
                                />
                            </label>
                        </form>
                    ) : (
                        <>
                            <p>
                                <strong>Quantity:</strong> {item.Quantity}
                            </p>
                            <p>
                                <strong>Description:</strong> {item.Description}
                            </p>
                        </>
                    )}
                    <div className="button-group">
                        {editMode ? (
                            <>
                                <button className="save-button" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="cancel-button" onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            user &&
                            user.Id === item.UserId && (
                                <>
                                    <button className="edit-button" onClick={() => setEditMode(true)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            )
                        )}
                    </div>
                    <button className="back-button" onClick={handleReturn}>
                        Back
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ItemDetails;



