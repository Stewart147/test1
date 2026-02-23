
import React from "react";
import "./JobColumn.css";

export const JobColumn = ({ title, image, alt, jobs }) => {
  return (
    <div className="job-column">
      <h2>
        {title}
        <img src={image} alt={alt} className="status-image" />
      </h2>

      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            {job.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
