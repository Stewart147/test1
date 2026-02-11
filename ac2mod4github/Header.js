import React from 'react';
import { useState } from 'react';

// passed from App.js to header
const Header = ({ addJobToList, searchQuery, setSearchQuery }) => {

const [newJob, setNewJob] = useState({ id: '', name: '', status: '' });

  // function to take in addJobToList values
  const handleAddJob = () => {

    // Pass the current newJob state to addJobToList
    addJobToList(newJob);

    // Clear the form after adding
    setNewJob({ id: '', name: '', status: '' });

  };


  return (

    <header>

      {/* must use .. to move from src folder to images folder */}
      <img className='img' src="../images/cat1.png" height={50} width={50} alt="cat" />
      <h1>Job Board</h1>

      <div>
        <input
          type='text'
          value={newJob.id}
          onChange={(e) => setNewJob({...newJob, id: e.target.value})}
          placeholder='Enter ID'
        />

        <input
          type='text'
          value={newJob.name}
          onChange={(e) => setNewJob({...newJob, name: e.target.value})}
          placeholder='Enter name'
        />

        <input
          type='text'
          value={newJob.status}
          onChange={(e) => setNewJob({...newJob, status: e.target.value})}
          placeholder='Enter Status'
        />

        <button onClick={handleAddJob}>Add Jobs</button>
      </div>

      <div>

        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search jobs...'
        />
      </div>

    </header>

  );

};
 
export default Header;