import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('User created successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setSuccessMessage('Failed to create user. Please try again.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setSuccessMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="create-account-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} className="create-account-form">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default CreateAccount;
