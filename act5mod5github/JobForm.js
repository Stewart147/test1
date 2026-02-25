import React, { useState, useMemo } from 'react';
import { JobList } from './JobList';

const initialState = {
  title: '',
  category: '',
  status: 'To Start'
};

export const JobForm = () => {
  const [jobDetails, setJobDetails] = useState(initialState);
  const [jobs, setJobs] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingJobId, setEditingJobId] = useState(null); // ✅ Track job being edited

  const categories = ['Read Emails', 'Web Parsing', 'Send Emails'];
  const statuses = ['To Start', 'In Progress', 'Completed'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setJobDetails((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrorMessage('');
  };

  const isFormValid = useMemo(() => {
    return (
      jobDetails.title.trim().length >= 3 &&
      jobDetails.category.trim() !== '' &&
      jobDetails.status.trim() !== ''
    );
  }, [jobDetails]);

  const resetForm = () => {
    setJobDetails(initialState);
    setEditingJobId(null); // ✅ Reset edit mode
  };

  const addOrUpdateJob = (e) => {
    e.preventDefault();

    if (!jobDetails.title || !jobDetails.category || !jobDetails.status) {
      setErrorMessage('Please fill in all fields before submitting.');
      return;
    }

    if (jobDetails.title.trim().length < 3) {
      setErrorMessage('Job title must be at least 3 characters long.');
      return;
    }

    if (editingJobId) {
      // ✅ Update existing job
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === editingJobId ? { ...job, ...jobDetails } : job
        )
      );
      setSuccessMessage('Job updated successfully!');
    } else {
      // ✅ Add new job
      setJobs((prevJobs) => [
        ...prevJobs,
        { ...jobDetails, id: Date.now() }
      ]);
      setSuccessMessage('Job added successfully!');
    }

    resetForm();

    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  // ✅ Function to start editing a job
  const editJob = (jobId) => {
    const jobToEdit = jobs.find((job) => job.id === jobId);
    if (jobToEdit) {
      setJobDetails({
        title: jobToEdit.title,
        category: jobToEdit.category,
        status: jobToEdit.status
      });
      setEditingJobId(jobId);
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={addOrUpdateJob}>
        <input
          type="text"
          name="title"
          value={jobDetails.title}
          onChange={handleInputChange}
          placeholder="Enter job title"
        />

        <select
          name="category"
          value={jobDetails.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={jobDetails.status}
          onChange={handleInputChange}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button type="submit" > {/* disabled={!isFormValid}> optional */}
          {editingJobId ? 'Update Job' : 'Add Job'}
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>

      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
      )}

      <JobList jobs={jobs} onEdit={editJob} />
    </div>
  );
};