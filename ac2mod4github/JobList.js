import React from 'react';
import { useState } from 'react';
import JobItem from './JobItem';

// JobList component

const JobList = (props) => {

  //false=not displayed, true=displayed click button toggles display of list

  const [show, setShow] = useState(true);

  // display to browser

  return (

    <div className="job-list">
      <h2>Current Jobs</h2>
      <button onClick={() => setShow(!show)}>Show/Hide</button> 

      {/* map out values from array */}  

      {show && props.jobs.map((job) => (

        // pass values from JobList.js JobItem.js
        <JobItem key={job.id} job={job} handleDelete={props.handleDelete} />

      ))}

    </div> 

  );
 }; 

export default JobList; 

 