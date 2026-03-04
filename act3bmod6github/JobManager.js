import React, { useState } from 'react';
import { JobColumn } from './JobColumn';
import './JobManager.css';

function JobManager() {

  const [jobs, setJobs] = useState([]);
  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryOptions = ['ReadEmails', 'SendEmails', 'WebParsing'];

  const toggleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((cat) => cat !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

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

    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
  };

  // 🔄 Move job between columns
  const moveJob = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  // ✏️ Update existing job
  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
  };

  // 🔍 Search filtering
  const filteredJobs = jobs.filter((job) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesActivity =
      job.activity.toLowerCase().includes(lowerSearch);

    const matchesCategory =
      job.categories.some((cat) =>
        cat.toLowerCase().includes(lowerSearch)
      );

    return matchesActivity || matchesCategory;
  });

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

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by activity or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="job-columns">
        <JobColumn
          title="Need to Complete"
          status="Need to Complete"
          jobs={filteredJobs}
          moveJob={moveJob}
          updateJob={updateJob}
        />
        <JobColumn
          title="In Progress"
          status="In Progress"
          jobs={filteredJobs}
          moveJob={moveJob}
          updateJob={updateJob}
        />
        <JobColumn
          title="Completed"
          status="Completed"
          jobs={filteredJobs}
          moveJob={moveJob}
          updateJob={updateJob}
        />
      </div>

    </div>
  );
}

export default JobManager;