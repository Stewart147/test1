import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function JobCounter() {
 const [jobCount, setjobCount] = useState(0);

  const handleAddJob = () => {
    setjobCount(prev => prev +1);
    console.log('Run job', jobCount);
  }
  
  
  return (
    <div>
     <h1>Job Count: {handleAddJob} </h1>
     <p>current job count: {jobCount}</p>
     <button onClick={handleAddJob} value="Run job">Add Job</button>
    </div>
  );
}

export default JobCounter;
