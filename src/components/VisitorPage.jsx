import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VisitorPage.css';

function VisitorPage() {
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemResponse = await fetch('http://localhost:5000/items');
                const itemData = await itemResponse.json();
                setItems(itemData);
                const userResponse = await fetch('http://localhost:5000/users');
                const userData = await userResponse.json();
                const userMap = userData.reduce((map, user) => {
                    map[user.Id] = `${user.FirstName} ${user.LastName}`;
                    return map;
                }, {});
                setUsers(userMap);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (id) => {
        navigate(`/item/${id}`);
    };

    const handleReturn = () => {
        navigate('/');
    };

    return (
        <div className="visitor-container">
            <h1 className="visitor-header">Available Items</h1>
            <button className="back-button" onClick={handleReturn}>
                Return to Home
            </button>
            <div className="items-list">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="item-card"
                        onClick={() => handleItemClick(item.id)}
                    >
                        <h3 className="item-title">{item['ItemName']}</h3>
                        <p>
                            <strong>Inventory Manager:</strong>{' '}
                            {users[item.UserId] || 'Loading...'}
                        </p>
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
                ))}
            </div>
        </div>
    );
}

export default VisitorPage;



