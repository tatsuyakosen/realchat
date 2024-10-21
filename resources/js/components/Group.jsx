import React, { useState } from 'react';
import axios from 'axios';

const Group = () => {
    const [groupName, setGroupName] = useState('');

    const createGroup = () => {
        axios.post('/api/groups', { name: groupName })
            .then(response => {
                console.log('Group created:', response.data);
                setGroupName('');
            })
            .catch(error => {
                console.error('Error creating group:', error);
            });
    };

    return (
        <div className="group-creation">
            <input
                type="text"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Group Name"
            />
            <button onClick={createGroup}>Create Group</button>
        </div>
    );
};

export default Group;
