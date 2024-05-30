// src/components/GroupForm.js
import React, { useState } from 'react';

const GroupForm = ({ onCreateGroup }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        onCreateGroup(name, description);
        setName('');
        setDescription('');
    };

    return (
        <div>
            <h2>Create Group</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Group Name"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Group Description"
            />
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default GroupForm;
