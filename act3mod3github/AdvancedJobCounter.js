import React from 'react'
import { useState } from 'react'


// function to add a job
const AdvancedJobCounter = () => {
    let [jobCounter, setJobCounter] = useState(0)
    const handleAddJob = () => {
        setJobCounter(jobCounter+1)
        console.log('Run job', jobCounter)
    }

    // function to subtract counter
    const handleRemoveJob = () => {
        if (jobCounter < 0) {
            setJobCounter(jobCounter=0)
        }else {
        setJobCounter(jobCounter-1)
        }
    }

    // function to reset counter to 0
     const handleResetJobs = () => {
        setJobCounter(0)
     }

      // function for multiple conditions using switch statement

        const getJobMessage =()=> {

        switch (true) {
            case (jobCounter === 0):
                return "No jobs available";
                break;
            case (jobCounter <=5):
                return "Few jobs available";
                break;
            case (jobCounter >5):
                return  "Many jobs available";
                break;
            default:
                return "invalid jobs data";
        }

    } 


  return (
    <div>
        <h1>Advanced Job Counter: </h1>
        <p>Current Jobs: {jobCounter}</p>
        <button onClick={handleAddJob} value='Run jobs'>Create a Job</button>
        <button disabled={jobCounter === 0} onClick={handleRemoveJob} value='Run jobs'>Delete a Job</button>
        <button onClick={handleResetJobs} value='Run jobs'>Reset to 0</button>
         <p>{getJobMessage()}</p>
        <h1>Jobs running worldwide:{jobCounter+80}</h1> 
    </div>
  )

}

 
export default AdvancedJobCounter;
