
import React from 'react';

// JobItem component

// props are used to pass values from JobList to JobItems for rendering

const JobItem = (props) => {

  // Conditional rendering based on job status

  return (

     // style class based on status running or complete
    <div className={`job-item ${props.job.status}`}>

      <p>
        {props.job.id} - {props.job.name} - {props.job.status}
        <button onClick={() => props.handleDelete(props.job.id)}>Delete Job</button>
      </p>

    </div>

  );

};

export default JobItem;

 

