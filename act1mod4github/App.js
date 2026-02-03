
import React, { useState } from 'react';

const DynamicBotManager = () => {
  const [bots, setBots] = useState([
    { id: '1', name: 'Email Bot', status: 'Active' },
    { id: '2', name: 'Data Bot', status: 'Inactive' }
  ]);

 
 const [newBot, setNewBot] = useState({ id: '', name: '', status: '' });
 


  const addBotToList = () => {
    // Implement add bot functionality
     if (newBot.id.trim() !== '' && newBot.name.trim() !== '' && newBot.status.trim() !== '')
  {
    setBots([...bots, newBot])
    setNewBot({id:'',name:'',status:''})
  }
  };

   const deleteBot = (id) => {
     // Implement delete bot functionality
      console.log(id)
      setBots(bots.filter(bot => id !== bot.id))
  };

  return (
      <div className='dynamic-bot-manager'>
       <h1>Dynamic Bot Manager </h1>

       {/* Add input fields for new bot */}
       <input type='text' value={newBot.id} onChange = {(e) => setNewBot({...newBot,id:e.target.value})} placeholder='Enter ID' />
       <input type='text' value={newBot.name} onChange = {(e) => setNewBot({...newBot,name:e.target.value})} placeholder='Enter Botname' />
       <input type='text' value={newBot.status} onChange = {(e) => setNewBot({...newBot,status:e.target.value})} placeholder='Enter Status' />

      {/* Add button to add new bot */}
      <button onClick = {addBotToList}>Add Bots</button>

      {/* Display list of bots */}
      <ul>

         {/* Map through bots and display each one */}
         {
           bots.map(bot=><li><span> {bot.id}-{bot.name}-{bot.status}
          <button onClick={() => deleteBot(bot.id)}>Delete your Bot</button></span></li>) 
         }

      </ul>
      <h1>Input Value ID: {newBot.id}, Name:{newBot.name},
        Status:{newBot.status} </h1>
 </div> );
};

export default DynamicBotManager;
