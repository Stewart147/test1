

export function JobCard({ job }) {


  return (


    <div className="job-card">
      <h3>{job.activity}</h3>
      <div className="categories">

        {job.categories.map((category, index) => (
          <span key={index} className="category">{category}</span>
        ))}

      </div>
    </div>


  );
}
