// src/components/JoinGroupPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JoinGroupPage = ({ groups }) => {
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/groups/${groups._id}`);
                setGroup(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch group');
                setLoading(false);
            }
        };

        fetchGroup();
    }, []);

    const handleJoinGroup = async () => {
        try {
            // Implement the logic for joining the group here, e.g., sending a request to the backend
            console.log('Joining group:', group.name);
            // Once the user has joined the group, you can redirect them to another page or display a success message
        } catch (err) {
            setError('Failed to join group');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!group) return <p>Group not found</p>;

    return (
        <div>
            <h2>Join {group.name}</h2>
            <p>{group.description}</p>
            <button onClick={handleJoinGroup}>Join Group</button>
        </div>
    );
};

export default JoinGroupPage;
