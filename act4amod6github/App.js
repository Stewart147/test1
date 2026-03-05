import React, { useState, useEffect } from 'react';
import './JobManager.css';

// JobManager component
function JobManager() {

  // ============================
  // STATE SETUP
  // ============================

  // Load jobs from localStorage initially
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');

  // ============================
  // SAVE JOBS TO LOCAL STORAGE
  // ============================
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // ============================
  // ADD JOB
  // ============================
  const addJob = (e) => {
    e.preventDefault();

    // Prevent adding empty activity
    if (!activity.trim()) return;

    const newJob = {
      id: Date.now(),
      activity,
      categories,
      status
    };

    setJobs([...jobs, newJob]);
    resetForm();
  };

  // ============================
  // DELETE JOB WITH CONFIRMATION
  // ============================
  const deleteJob = (jobId) => {

    // Find the job to display its name in the confirmation
    const jobToDelete = jobs.find(job => job.id === jobId);

    // Show confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the job: "${jobToDelete.activity}"?`
    );

    // If user cancels → do nothing
    if (!confirmDelete) return;

    // If user confirms → delete the job
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  // ============================
  // ADD CATEGORY
  // ============================
  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }
  };

  // ============================
  // REMOVE CATEGORY
  // ============================
  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  // ============================
  // RESET FORM
  // ============================
  const resetForm = () => {
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div className="job-manager">

      <h2>Job Manager</h2>

      <form onSubmit={addJob}>

        {/* Activity Input */}
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter job activity"
        />

        <div className='form-horz'>

          {/* Category Buttons */}
          <div className="category-buttons">
            <button type="button" onClick={() => addCategory('readEmails')}>readEmails</button>
            <button type="button" onClick={() => addCategory('sendEmails')}>sendEmails</button>
            <button type="button" onClick={() => addCategory('webParsing')}>webParsing</button>
          </div>

          {/* Selected Categories Preview */}
          <div className="category-preview">
            {categories.map((cat) => (
              <div key={cat} className="category-tag">
                {cat}
                <button type="button" onClick={() => removeCategory(cat)}>Update</button>
              </div>
            ))}
          </div>

          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Need to Complete">Need to Complete</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Add Job Button */}
          <button type="submit" className='addbtn'>Add Job</button>

        </div>
      </form>

      {/* Job Columns */}
      <div className="job-columns">
        <JobColumn title="Need to Complete" status="Need to Complete" jobs={jobs} deleteJob={deleteJob} />
        <JobColumn title="In Progress" status="In Progress" jobs={jobs} deleteJob={deleteJob} />
        <JobColumn title="Completed" status="Completed" jobs={jobs} deleteJob={deleteJob} />
      </div>
    </div>
  );
}

// ============================
// JOB COLUMN COMPONENT
// ============================
function JobColumn({ title, status, jobs, deleteJob }) {
  const filteredJobs = jobs.filter(job => job.status === status);

  return (
    <div className="job-column">
      <h2>{title}</h2>
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} deleteJob={deleteJob} />
      ))}
    </div>
  );
}

// ============================
// JOB CARD COMPONENT
// ============================
function JobCard({ job, deleteJob }) {
  return (
    <div className="job-card">
      <h3>{job.activity}</h3>
      <div className="categories">
        {job.categories.map((category) => (
          <span key={category} className="category">{category}</span>
        ))}
      </div>
      {/* Delete Button */}
      <button onClick={() => deleteJob(job.id)}>Delete</button>
    </div>
  );
}

export default JobManager;