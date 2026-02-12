import React from 'react';
import JobItem from './JobItem';

 
const JobList = (props) => {
 
  return (

    <div className="job-list">

   {props.jobs.map(job => (
      <JobItem  key={job.id} job={job} onDelete={props.onDeleteJob}  />

  ))}

    </div>

  );

};

 

export default JobList;