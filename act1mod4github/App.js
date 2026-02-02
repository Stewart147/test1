
import React, { useState } from 'react';

const DynamicBotManager = () => {
  // Bot list state
  const [bots, setBots] = useState([
    { id: '1', name: 'Email Bot', status: 'Active' },
    { id: '2', name: 'Data Bot', status: 'Inactive' }
  ]);

  // New bot input state
  const [newBot, setNewBot] = useState({
    id: '',
    name: '',
    status: ''
  });

  // Error state for validation
  const [error, setError] = useState('');
  // Search query input state
  const [searchQuery, setSearchQuery] = useState('');
  // Edit input state
   const [edit, setEdit] = useState('');

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBot({ ...newBot, [name]: value });
  };

  // Add bot with validation
  const addBotToList = () => {
    const { id, name, status } = newBot;

    // Validation: ensure all fields are filled trim() clears whitespace
    if (!id.trim() || !name.trim() || !status.trim()) {
      setError('All fields are required');
      return;
    }

    // Clear error and add bot ...prev from previuos state
    setError('');
    setBots(prevBots => [...prevBots, newBot]);

    // Reset input fields
    setNewBot({ id: '', name: '', status: '' });
  };

  // Delete bot
  const deleteBot = (id) => {
    setBots(prevBots => prevBots.filter(bot => bot.id !== id));
  };

   // Filter bots based on search query (id, name, or status)
  const filteredBots = bots.filter(bot => {
    const query = searchQuery.toLowerCase();
    return (
      /*includes() method determines whether a string or array contains a certain 
        value, returning true or false as appropriate */
      bot.id.toLowerCase().includes(query) ||
      bot.name.toLowerCase().includes(query) ||
      bot.status.toLowerCase().includes(query)
    );
  });


  return (
    <div className="dynamic-bot-manager">
      <h1>Dynamic Bot Manager</h1>

        {/* Search input */}
      <input
        type="text"
        placeholder="Search by ID, Name, or Status"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', width: '300px' }}
      />

      <input
        type="text"
        name="id"
        value={newBot.id}
        onChange={handleInputChange}
        placeholder="Enter ID"
      />

      <input
        type="text"
        name="name"
        value={newBot.name}
        onChange={handleInputChange}
        placeholder="Enter Bot Name"
      />

      <input
        type="text"
        name="status"
        value={newBot.status}
        onChange={handleInputChange}
        placeholder="Enter Status"
      />

      {/* Validation error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={addBotToList}> Add Bot</button>

       {/* Bot list */}
      <ul>
        {filteredBots.length > 0 ? (
          filteredBots.map(bot => (
            <li key={bot.id}>
              {bot.id} - {bot.name} - {bot.status}
              <button onClick={() => deleteBot(bot.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No bots found.</li>
        )}
      </ul>

      <h3>Current Input</h3>
      <p>ID: {newBot.id}</p>
      <p>Name: {newBot.name}</p>
      <p>Status: {newBot.status}</p>
    </div>
  );
};

export default DynamicBotManager;
