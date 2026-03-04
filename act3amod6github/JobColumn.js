
import { JobCard } from './JobCard';
import './JobColumn.css';
// export not default then import must be in curly brackets { }
// if export default then curly brackets not needed

// takes in props from JobManager.js
export function JobColumn({ title, status, jobs })

{
  const filteredJobs = jobs.filter(job => job.status === status);


  return (

    <div className="job-column">
      <h2>{title}</h2>

      {filteredJobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}

    </div>

  );
}