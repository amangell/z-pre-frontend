import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../UserContext';
import './ItemDetails.css';

function ItemDetails() {
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const [item, setItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedItem, setEditedItem] = useState({ ItemName: '', Description: '', Quantity: '' });

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/items/${id}`);
                const data = await response.json();
                setItem(data);
                setEditedItem({
                    ItemName: data.ItemName,
                    Description: data.Description,
                    Quantity: data.Quantity,
                });
            } catch (err) {
                console.error('Error fetching item details:', err);
            }
        };

        fetchItemDetails();
    }, [id]);

    const handleBackClick = () => {
        if (location.state?.fromVisitor) {
            navigate('/visitor'); // Back to VisitorPage
        } else {
            navigate(`/personal/${id}`); // Back to PersonalInventoryPage
        }
    };

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            await fetch(`http://localhost:5000/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedItem),
            });
            setItem(editedItem);
            setIsEditMode(false);
        } catch (err) {
            console.error('Error saving item changes:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/items/${id}`, {
                method: 'DELETE',
            });
            navigate(`/personal/${id}`);
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    if (!item) {
        return <p>Loading item details...</p>;
    }

    const isOwner = user && item.UserId === user.Id;

    return (
        <div className="item-details-container">
            <button className="back-button" onClick={handleBackClick}>
                Back
            </button>
            <h1>{isEditMode ? 'Edit Item' : item.ItemName}</h1>
            {isEditMode ? (
                <div className="edit-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="ItemName"
                            value={editedItem.ItemName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="Description"
                            value={editedItem.Description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="Quantity"
                            value={editedItem.Quantity}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="button-group">
                        <button className="save-button" onClick={handleSaveChanges}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={handleEditToggle}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <p><strong>Description:</strong> {item.Description}</p>
                    <p><strong>Quantity:</strong> {item.Quantity}</p>
                    {isOwner && (
                        <>
                            <p><strong>You are the manager of this item.</strong></p>
                            <div className="button-group">
                                <button className="edit-button" onClick={handleEditToggle}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default ItemDetails;





