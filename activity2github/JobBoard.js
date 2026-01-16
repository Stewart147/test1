import React from 'react'

const JobBoard =() => {
const jobCount = 5;
const companyName = "TechCorp";


// ternary conditional statement replaces if/else

 const getJobMessage =() => {
  return jobCount === 0 ? 'No jobs scheduled today!' : `Jobs running today ${jobCount}`;

 } 

  // multiple conditions using if/else statement

/* const getJobMessage =()=> {

    if (jobCount === 0) {
       return "No Jobs today";
    } else if 
        (jobCount >1) {
          return "Jobs available";
         }
    else {
            return "unknown value";
    }; 

} */

    
    // multiple conditions using switch statement

    /*    const getJobMessage =()=> {

        switch (true) {
            case (jobCount===0):
                return "No jobs today";
                break;
            case (jobCount >10):
                return "More than 10 jobs today";
                break;
            case (jobCount <10):
                return  "between 1 and 10 jobs today";
                break;
            default:
                return "invalid jobs data";
        }

    } */
     



 return (
    <div>
      <h1>{companyName}</h1>
      <h3>{jobCount}</h3>
      <p>{getJobMessage()}</p>
    </div>
 );



}



export default JobBoard;


    

