import React from 'react';

export const JobList = ({ jobs, onEdit }) => {
  return (
    <div>
      <h3>Job List</h3>

      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> | {job.category} | {job.status}{' '}
              <button
                onClick={() => onEdit(job.id)}
                style={{ marginLeft: '10px' }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};