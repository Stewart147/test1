import React from 'react';

  const JobItem = (props) => {

  return (

    /* implement job Item rendering */

    <div className={`job-item ${props.job.status}`}>
      <h3>{props.job.id}</h3>
      <h3>{props.job.name}</h3>
      <p>Status: {props.job.status}</p>
      <button onClick={() => props.onDelete(props.job.id)}>Delete</button>
    </div>

  );

};

 

export default JobItem;