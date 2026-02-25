
import React, { useState } from "react";
import "./App.css";
import { JobColumn } from "./components/JobColumn";

import startImg from "./images/cat1.png";
import progressImg from "./images/dog1.png";
import compImg from "./images/parrot1.png";

const App = () => {

  // Job state
  const [jobs, setJobs] = useState([
    { id: 1, title: "Parse Emails", status: "Need to Start" },
    { id: 2, title: "SAP Extraction", status: "In Progress" },
    { id: 3, title: "General Report", status: "Completed" }
  ]);

  // Dropdown state
  const [selectedStatus, setSelectedStatus] = useState("Need to Start");

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Add Job
  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      title: selectedStatus,
      status: selectedStatus
    };

    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  // Delete Job
  const handleDelete = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  // Update Job Status
  const updateJobStatus = (id, newStatus) => {
     setJobs(prevJobs =>
     prevJobs.map(job =>
        job.id === id
         ? { ...job, status: newStatus, title: newStatus }
        : job
     )
    );
  };

  // Filtered jobs (search by title)
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (

    <div className="app">

     {/* ADD JOB */}
     <form onSubmit={handleSubmit}>
       <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
       >
          <option value="Need to Start">Need to Start</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className="addBtn">
          Add Job
        </button>
      </form>

     {/* SEARCH */}
     <div className="searchContainer">
       <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
       />
      </div>

      {/* JOB COLUMNS */}
      <div className="job-columns">

        <JobColumn
          title="Need to Start"
          jobs={filteredJobs.filter(job => job.status === "Need to Start")}
          image={startImg}
          alt="Need to Start"
          onDelete={handleDelete}
          onUpdateStatus={updateJobStatus}
        />

        <JobColumn
          title="In Progress"
          jobs={filteredJobs.filter(job => job.status === "In Progress")}
          image={progressImg}
          alt="In Progress"
          onDelete={handleDelete}
          onUpdateStatus={updateJobStatus}
        />

        <JobColumn
          title="Completed"
          jobs={filteredJobs.filter(job => job.status === "Completed")}
          image={compImg}
          alt="Completed"
          onDelete={handleDelete}
          onUpdateStatus={updateJobStatus}
        />

      </div>

      {filteredJobs.length === 0 && searchTerm && (
        <p className="noResults">No matching jobs found.</p>
      )}

    </div>
  );
};

export default App;

