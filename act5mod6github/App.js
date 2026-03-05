// useEffect as side hook
import React, { useState, useEffect } from 'react';
import './JobManager.css' 

function JobManager() {


  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (e) => {
    e.preventDefault();
    const newJob = { id: Date.now(), activity, categories, status };
    setJobs(prevJobs => [...prevJobs, newJob]);
    resetForm();
  };

  const deleteJob = (jobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

 // Add category from button
  const addCategory = (categoryName) => {
    // includes prevents duplications, true if includes name false if not
    if (!categories.includes(categoryName)) {
      // ... spread operator (immutable uddate) copies all old items then adds new items at end
      // of new array
      setCategories([...categories, categoryName]);
    }
  };

  // Remove category before submitting / update
  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  }; 

  const clearAllJobs = () => {
    setJobs([]);
    localStorage.removeItem('jobs');
  };

  const resetForm = () => {
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
  };

  return (

    <div className="job-manager">

      <form onSubmit={addJob}>
        {/* Form inputs here */}

          {/* controlled input thus react controls input best practice value={activity} tells input
            text must always be the value of activity onChange runs everything the user types in
            e = event object, e.target.value = the text currently inside the input */}

        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter job activity"
        />

        <div className='form-horz'>

        {/* Category buttons */}
        <div className="category-buttons">
          <button
            type="button"
            onClick={() => addCategory('readEmails')}
          >
            readEmails
          </button>

          <button
            type="button"
            onClick={() => addCategory('sendEmails')}
          >
            sendEmails
          </button>

          <button
            type="button"
            onClick={() => addCategory('webParsing')}
          >
            webParsing
          </button>
        </div>

        {/* Selected Categories Preview update */}
        <div className="category-preview">
          {categories.map((cat) => (
            <div key={cat} className="category-tag">
              {cat}
              <button
                type="button"
                onClick={() => removeCategory(cat)}
              >
                Update
              </button>
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

        <button type="submit" className='addbtn' >Add Job</button>
  </div> {/* end of form-horz classname div used for styling */}
      </form>

      
      <button onClick={clearAllJobs}>Clear All Jobs</button>
      <div className="job-columns">
        <JobColumn title="Need to Complete" status="Need to Complete" jobs={jobs} deleteJob={deleteJob} />
        <JobColumn title="In Progress" status="In Progress" jobs={jobs} deleteJob={deleteJob} />
        <JobColumn title="Completed" status="Completed" jobs={jobs} deleteJob={deleteJob} />
      </div>
    </div>
  );

}

  // JobColumn component

// take in props- title, status, jobs, deleteJob from JobManager
function JobColumn({ title, status, jobs, deleteJob }) {
  const filteredJobs = jobs.filter(job => job.status === status);

  return (
    <div className="job-column">
      <h2>{title}</h2>
      {filteredJobs.map((job) => (
        // pass props- job, deleteJob to JobCard
        <JobCard key={job.id} job={job} deleteJob={deleteJob} />
      ))}
    </div>
  );
}

// JobCard component

// take in props- job, deleteJob from JobColumn
function JobCard({ job, deleteJob }) {
  return (
    <div className="job-card">
      <h3>{job.activity}</h3>

      <div className="categories">
        {job.categories.map((category, index) => (
          <span key={index} className="category">
            {category}
          </span>
        ))}
      </div>

      <button onClick={() => deleteJob(job.id)}>
        Delete
      </button>
    </div>
  );

}


export default JobManager;


