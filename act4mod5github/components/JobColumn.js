// JobColumn.js

import React from "react";
import "./JobColumn.css";

export const JobColumn = ({
  title,
  image,
  alt,
  jobs,
  onDelete,
  onUpdateStatus
}) => {

  return (

    <div className="job-column">

      <h2>
        {title}
        <img src={image} alt={alt} className="status-image" />
      </h2>

     <ul>
       {jobs.map(job => (
         <li key={job.id} className="job-item">

         <span>{job.title}</span>

           <div className="job-actions">

             {job.status !== "Need to Start" && (
                <button onClick={() => onUpdateStatus(job.id, "Need to Start")}>
                  ⬅
                </button>
              )}

             {job.status !== "In Progress" && (
                <button onClick={() => onUpdateStatus(job.id, "In Progress")}>
                   ?
                </button>
              )}

              {job.status !== "Completed" && (
                <button onClick={() => onUpdateStatus(job.id, "Completed")}>
                  ✔
                </button>
              )}

              <button onClick={() => onDelete(job.id)}>
                ❌
              </button>

            </div>

          </li>
        ))}
      </ul>

    </div>
  );
};

