// src/components/InviteForm.js
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const InviteForm = ({ onInviteMembers, groups }) => {
    
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [members, setMembers] = useState('');

    const handleInvite = () => {
        if (selectedGroup) {
            onInviteMembers(selectedGroup.value, members);
            setSelectedGroup(null);
            setMembers('');
        }
    };

    const groupOptions = groups.map(group => ({
        value: group._id,
        label: group.name
    }));

    return (
        <div>
            <h2>Invite Members</h2>
            <Select
                value={selectedGroup}
                onChange={setSelectedGroup}
                options={groupOptions}
                placeholder="Select Group"
            />
            <input
                type="text"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="Member Emails (comma separated)"
            />
            <button onClick={handleInvite}>Invite</button>
        </div>
    );
};

export default InviteForm;
