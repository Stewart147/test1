import React, { useState } from 'react';
import { JobColumn } from './JobColumn';
import './JobManager.css';

function JobManager() {

  const [jobs, setJobs] = useState([]);
  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');

  // Available category buttons
  const categoryOptions = ['ReadEmails', 'SendEmails', 'WebParsing'];

  // Toggle category selection
  const toggleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((cat) => cat !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  // Add job function
  const addJob = (e) => {
    e.preventDefault();

    if (!activity.trim()) return;

    const newJob = {
      id: Date.now(),
      activity: activity.trim(),
      categories,
      status
    };

    setJobs([...jobs, newJob]);

    // Reset form
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
  };

  return (
    <div className="job-manager">

      <form onSubmit={addJob}>

        <input
          type="text"
          placeholder="Enter activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />

        {/* Category Buttons */}
        <div className="category-buttons">
          {categoryOptions.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={categories.includes(cat) ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Need to Complete">Need to Complete</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Add Job</button>

      </form>

      <div className="job-columns">
        {/* passes props title, status,jobs to JobColumn.js */}
        <JobColumn title="Need to Complete" status="Need to Complete" jobs={jobs} />
        <JobColumn title="In Progress" status="In Progress" jobs={jobs} />
        <JobColumn title="Completed" status="Completed" jobs={jobs} />
      </div>

    </div>
  );
}

export default JobManager;