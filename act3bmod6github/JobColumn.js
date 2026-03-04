import { JobCard } from './JobCard';
import './JobColumn.css';

export function JobColumn({ title, status, jobs, moveJob, updateJob }) {

  const filteredJobs = jobs.filter(job => job.status === status);

  const handleDrop = (e) => {
    e.preventDefault();
    const jobId = Number(e.dataTransfer.getData('jobId'));
    moveJob(jobId, status);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="job-column"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      <h2>{title}</h2>

      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          updateJob={updateJob}
        />
      ))}
    </div>
  );
}