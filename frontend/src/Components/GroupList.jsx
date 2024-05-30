// src/components/GroupList.js
import React from 'react';

const GroupList = ({ groups }) => {
    return (
        <div>
            <h2>Group List</h2>
            <ul>
                {groups.map(group => (
                    <li key={group._id}>
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                        <h4>Members:</h4>
                        <ul>
                            {group.members.map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
