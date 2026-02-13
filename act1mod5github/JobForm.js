
import React, { useState } from 'react';

export const JobForm = () => {

  const [job, setJob] = useState('');
  const [status, setStatus] = useState('start');
  const [error, setError] = useState('');

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!job.trim() || !status) {
      setError('Please fill in all fields.');
      return;
    }

    // Clear error if valid
    setError('');

    console.log('Form Submitted:', {
      job,
      status
    });

    // Reset form
    setJob('');
    setStatus('start');
  };

  return (
    <div className='formheader'>
      <form onSubmit={handleSubmit}>
        
        <input
          type='text'
          className='bot_input'
          placeholder='Enter the Job'
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />

        <div className='formdetails'>
          <div className='bottonline'>
            <button type="button" className='tag'>Read Emails</button>
            <button type="button" className='tag'>Web Parsing</button>
            <button type="button" className='tag'>Send Emails</button>
          </div>

          <div>
            <select
              className='job-status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="start">Start Process</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="stopped">Stopped</option>
            </select>

            <button type="submit" className='submit-data'>
              Add Job
            </button>
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </div>
  );
};
