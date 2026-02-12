import React, { useState } from 'react';
import JobList from './components/JobList';

const App = () => {

  const [newJob, setNewJob] = useState({id:'', name:'', status:''})


  const [jobs, setJobValues] = useState([
    { id: 1, name: 'Email Extractor', status: 'running' },
    { id: 2, name: 'Data Analyzer', status: 'completed' },
    { id: 3, name: 'Report Generator', status: 'running' }
  ]);

    // Error state for validation
    const [error, setError] = useState('');

    const [searchQuery, setSearchQuery] = useState('');


  // delete jobs function
  const handleDeleteJob = (id) => {
    setJobValues(jobs.filter(job => id !== job.id))
  };

  
  // add jobs with error prompt function
     const addJobToList = () => {
        if (
           newJob.id.trim() === '' ||
           newJob.name.trim() === '' ||
           newJob.status.trim() === ''
        ) {
          setError('All fields are required');
          return;
  }

  setError('');
  setJobValues([...jobs, { ...newJob, id: Number(newJob.id) }]);
  setNewJob({ id: '', name: '', status: '' });
};



  // Filter jobs function
  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();

    return (
      job.id.toString().includes(query) ||
      job.name.toLowerCase().includes(query) ||
      job.status.toLowerCase().includes(query)
    );
  });

  // render search and add job input fields

  return (

    <div className="app">
      <h1>Job Board</h1>

       {/* Search */}
      <input
        type="text"
        placeholder="Search by id, name or status..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

   <input type='number' value={newJob.id} onChange = {(e) => setNewJob({...newJob,id:e.target.value})} placeholder='Enter ID' />
   <input type='text' value={newJob.name} onChange = {(e) => setNewJob({...newJob,name:e.target.value})} placeholder='Enter name' />
   <input type='text' value={newJob.status} onChange = {(e) => setNewJob({...newJob,status:e.target.value})} placeholder='Enter Status' />

       {/* Validation error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
 
      <button onClick={addJobToList}>Add Jobs</button>
      {/* pass in jobs and onDelete function values to JobList.js */}
     <JobList jobs={filteredJobs} onDeleteJob={handleDeleteJob} /> 
    </div>
  );
};

export default App;