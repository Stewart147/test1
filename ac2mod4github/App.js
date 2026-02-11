
//import React from 'react';
import { useState } from 'react';
//import './index.css';
import Header from './components/Header';
import JobList from './components/JobList';
import Footer from './components/Footer';

 // Values from App.js passed to Header.js for rendering

// main component

const App = () => {

  // create an array of values, must use array for map to work

  const [jobs, setJobValues] = useState([

    { id: 1, name: 'Email Extractor', status: 'running' },
    { id: 2, name: 'Data Analyzer', status: 'completed' },
    { id: 3, name: 'Report Generator', status: 'running' }

  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Accept the job object as a parameter

  const addJobToList = (jobToAdd) => {
    if (jobToAdd.id.trim() !== '' && jobToAdd.name.trim() !== '' && jobToAdd.status.trim() !== '')
       {
      setJobValues([...jobs, jobToAdd]);
    }
  };

 

  function handleDelete(id) {
   // console.log(id);
    setJobValues(jobs.filter(job => id !== job.id));
  }

  // Filter jobs based on search query (id, name, or status)

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();

    return (

     // The includes() method returns true if an array contains a specified value.
    //The toString() method returns a number as a string.
      job.id.toString().toLowerCase().includes(query) ||
      job.name.toLowerCase().includes(query) ||
      job.status.toLowerCase().includes(query)
    );
  });

  return (

    <div className="app">
      {/* passes values from App.js to Header.js */}
      <Header addJobToList={addJobToList} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* passes values from App.js to JobList.js */}
      <JobList jobs={filteredJobs} handleDelete={handleDelete} /> 
      
      <Footer />
    </div>

  );

};

export default App;







