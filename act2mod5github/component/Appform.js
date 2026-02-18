import React from 'react'

export const Appform = () => {

  // submit form function  e.preventDefault stops default refresh
  const handleSubmit = (e) => {
    e.preventDefault();
  };



  return (


    <div className='form-header'>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          className='bot-input' 
          placeholder='Enter the Job' 
        />

        <div className='form-details'>
          <div className='bottom-line'>
            <button type="button" className='tag'>Read Emails</button>
            <button type="button" className='tag'>Web Parsing</button>
            <button type="button" className='tag'>Send Emails</button>
          </div>

          <div>
            <select className='job-status'>
              <option value="start">Start Process</option>
              <option value="Stopped">Stop Process</option>
              <option value="Completed">Completed Process</option>
            </select>

            <button type="submit" className='submit-data'>
              Add Jobs
            </button>

          </div>
        </div>
      </form>
    </div>


  );
};
