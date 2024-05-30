// src/App.js
import React, { useState, useEffect } from 'react';
import GroupForm from './Components/GroupForm';
import InviteForm from './Components/InviteForm';
import SearchBar from './Components/SearchBar';
import GroupList from './Components/GroupList';
import axios from 'axios';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchGroups = async () => {
    const response = await axios.get('http://localhost:5000/api/groups');
    setGroups(response.data);
  };
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const createGroup = async (name, description) => {
    const response = await axios.post('http://localhost:5000/api/groups', { name, description });
    setGroups([...groups, response.data]);
  };

  const inviteMembers = async (groupId, members) => {
    const response = await axios.post(`http://localhost:5000/api/groups/${groupId}/invite`, {
      members: members.split(',')
    });
    const updatedGroups = groups.map(group =>
      group._id === groupId ? response.data : group
    );
    setGroups(updatedGroups);
  };

  const searchGroups = async (query) => {
    const response = await axios.get(`http://localhost:5000/api/groups/search?q=${query}`);
    setSearchResults(response.data);
  };

  return (
    <div>
      <h1>Group Feature</h1>
      <GroupForm onCreateGroup={createGroup} />
      <InviteForm onInviteMembers={inviteMembers} groups={groups} />
      <SearchBar onSearch={searchGroups} />
      <GroupList groups={searchResults} />
    </div>
  );
};

export default App;
