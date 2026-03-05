// useEffect as side hook
import React, { useState, useEffect } from 'react';
import './JobManager.css'

function JobManager() {

// implements local storage retrieval
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');

  // state to track which job is currently being edited
  const [editingJobId, setEditingJobId] = useState(null);

  // tracks job currently being dragged
  const [draggedJobId, setDraggedJobId] = useState(null);


  // useEffect to save jobs to localstorage when job state changes
  // stringify takes array value and converts to a string
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);


  // use ... spread to add previous job values to jobs array
  const addJob = (e) => {
    e.preventDefault();

    if (!activity.trim()) return;

    // if editingJobId exists we update existing job
    if (editingJobId) {

      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === editingJobId
            ? { ...job, activity, categories, status } // keep original createdAt
            : job
        )
      );

      setEditingJobId(null);

    } else {

      // add timestamp when creating new job
      const newJob = { 
        id: Date.now(), 
        activity, 
        categories, 
        status, 
        createdAt: Date.now() // timestamp for sorting
      };

      setJobs(prevJobs => [...prevJobs, newJob]);

    }

    resetForm();
  };


  // delete function
  const deleteJob = (jobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };


  // function loads existing job data into the form so user can edit it
  const editJob = (job) => {
    setActivity(job.activity);
    setCategories(job.categories);
    setStatus(job.status);
    setEditingJobId(job.id);
  };


 // Add category from button
  const addCategory = (categoryName) => {
    // includes prevents duplications, true if includes name false if not
    if (!categories.includes(categoryName)) {

      // ... spread operator (immutable update) copies all old items then adds new items
      setCategories([...categories, categoryName]);
    }
  };


  // Remove category before submitting / update
  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };


  // clearAllJobs function removes from localStorage
  const clearAllJobs = () => {
    setJobs([]);
    localStorage.removeItem('jobs');
  };


  // reset form function
  const resetForm = () => {
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
    setEditingJobId(null);
  };


  // handles job movement between columns when dropped
  const handleDrop = (newStatus) => {

    if (!draggedJobId) return;

    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === draggedJobId
          ? { ...job, status: newStatus }
          : job
      )
    );

    setDraggedJobId(null);
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

        <button type="submit" className='addbtn' >
          {editingJobId ? "Update Job" : "Add Job"}
        </button>

  </div> {/* end of form-horz classname div used for styling */}

      </form>

      
      <button onClick={clearAllJobs}>Clear All Jobs</button>

      <div className="job-columns">

        <JobColumn
          title="Need to Complete"
          status="Need to Complete"
          jobs={jobs}
          deleteJob={deleteJob}
          editJob={editJob}
          setDraggedJobId={setDraggedJobId}
          handleDrop={handleDrop}
        />

        <JobColumn
          title="In Progress"
          status="In Progress"
          jobs={jobs}
          deleteJob={deleteJob}
          editJob={editJob}
          setDraggedJobId={setDraggedJobId}
          handleDrop={handleDrop}
        />

        <JobColumn
          title="Completed"
          status="Completed"
          jobs={jobs}
          deleteJob={deleteJob}
          editJob={editJob}
          setDraggedJobId={setDraggedJobId}
          handleDrop={handleDrop}
        />

      </div>

    </div>

  );

}


// JobColumn component

// take in props- title, status, jobs, deleteJob from JobManager
function JobColumn({ title, status, jobs, deleteJob, editJob, setDraggedJobId, handleDrop }) {

  // filter jobs by column status
  const filteredJobs = jobs
    .filter(job => job.status === status)
    // sort jobs by creation date ascending (oldest first)
    .sort((a, b) => a.createdAt - b.createdAt);

  return (

    <div
      className="job-column"

      // onDragOver must prevent default to allow drop
      onDragOver={(e) => e.preventDefault()}

      // dropping job into column updates status
      onDrop={() => handleDrop(status)}
    >

      <h2>{title}</h2>

      {filteredJobs.map((job) => (

        // pass props- job, deleteJob to JobCard
        <JobCard
          key={job.id}
          job={job}
          deleteJob={deleteJob}
          editJob={editJob}
          setDraggedJobId={setDraggedJobId}
        />

      ))}

    </div>
  );
}

// JobCard component

// take in props- job, deleteJob from JobColumn
function JobCard({ job, deleteJob, editJob, setDraggedJobId }) {

  // convert timestamp to readable date string
  const createdDate = new Date(job.createdAt).toLocaleString();

  // highlight jobs created in the last 24 hours
  const isNew = (Date.now() - job.createdAt) < 24 * 60 * 60 * 1000; // 24h in ms
  const cardStyle = {
    backgroundColor: isNew ? 'lightyellow' : 'white'
  };

  return (

    <div
      className="job-card"
      style={cardStyle}  // apply highlight if new

      // enables dragging of job cards
      draggable

      // stores id of dragged job
      onDragStart={() => setDraggedJobId(job.id)}
    >

      {/* job activity title */}
      <h3>{job.activity}</h3>

      {/* display creation timestamp */}
      <small className="timestamp">Created: {createdDate}</small>

      <div className="categories">

        {job.categories.map((category, index) => (

          <span key={index} className="category">
            {category}
          </span>

        ))}

      </div>

      {/* edit loads job data back into form */}
      <button onClick={() => editJob(job)}>
        Edit
      </button>

      <button onClick={() => deleteJob(job.id)}>
        Delete
      </button>

    </div>

  );

}




export default JobManager;