import React, { useState } from "react";
import "./App.css";
import { JobColumn } from "./components/JobColumn";
import toDoIcon from "./images/cat1.png";
import inProgressIcon from "./images/dog1.png";
import doneIcon from "./images/parrot1.png";

const App = () => {

  const [jobs, setJobs] = useState([
    { id: 1, title: "Need to Start", status: "Need to Start" },
    { id: 2, title: "In Progress", status: "In Progress" },
    { id: 3, title: "Completed", status: "Completed" }
  ]);

  // add job and status states
 // const [newJob, setNewJob] = useState("");
  const [newStatus, setNewStatus] = useState("Need to Start");

  // Search states
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // add a job
  const handleSubmit = (e) => {
    e.preventDefault();
  //  if (!newJob.trim()) return;

    setJobs([
      ...jobs,
      {
        id: Date.now(),
       // title: newJob,
       title: newStatus,
        status: newStatus
      }
    ]);

   // setNewJob("");
    setNewStatus("Need to Start");
  };

  //  Button click handler
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  // Filter using applied search term
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="app">

      {/* FORM */}

      <form onSubmit={handleSubmit}>
     {/*   <input
          type="text"
          placeholder="Enter the Job"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
        /> */}

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Need to Start">Need to Start</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className="addBtn">Add Job</button>
      </form>

      {/* SEARCH SECTION */}

      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={handleSearch} className="searchBtn">
          Search
        </button>
      </div>

      {/* JOB COLUMNS */}
      
      <div className="job-columns">

        <JobColumn
          title="Need to Start"
          jobs={filteredJobs.filter(job => job.status === "Need to Start")}
          image={toDoIcon}
          alt="Need to Start"
        />

        <JobColumn
          title="In Progress"
          jobs={filteredJobs.filter(job => job.status === "In Progress")}
          image={inProgressIcon}
          alt="In Progress"
        />

        <JobColumn
          title="Completed"
          jobs={filteredJobs.filter(job => job.status === "Completed")}
          image={doneIcon}
          alt="Completed"
        />

      </div>

      {filteredJobs.length === 0 && searchTerm && (
        <p className="noResults">No matching jobs found.</p>
      )}

    </div>
  );
};

export default App;