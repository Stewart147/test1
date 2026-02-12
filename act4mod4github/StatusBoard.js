import React, { useState } from 'react';
import TicketInfo from './TicketInfo';
import completedImage from './images/cat1.png';
import inProgressImage from './images/dog1.png';
import failedImage from './images/parrot1.png';

// StatusBoard component

    // store ticket counts in an object
    const StatusBoard = (props) => {

  const [counts, setCounts] = useState({
    completed: 0,
    "in-progress": 0,
    failed: 0
  });

  // increment counter function
  const handleIncrement = (status) => {
    setCounts(prev => ({
      ...prev,
      [status]: prev[status] + 1
    }));
  };
  

  // reset to zero function
  const handleReset = () => {
    setCounts({
      completed: 0,
      "in-progress": 0,
      failed: 0
    });
  };

  return (
    <div className="status-board">

      <button onClick={handleReset}>
        Reset Counts
      </button>

      {/* pass result, count and handleIncrement function values to TicketInfo.js */}

      <TicketInfo
        result="completed"
        count={counts.completed}
        onClick={() => handleIncrement("completed")}
      >

        {/* pass image and <p> text as children to TicketInfo.js */}


        <img src={completedImage} alt="Completed" width={100} height={100} />
        <p>Tickets Completed</p>
      </TicketInfo>

      {/* pass result, count and handleIncrement function values to TicketInfo.js */}

      <TicketInfo
        result="in-progress"
        count={counts["in-progress"]}
        onClick={() => handleIncrement("in-progress")}
      >

       {/* pass image and <p> text as children to TicketInfo.js */}

        <img src={inProgressImage} alt="In Progress" width={100} height={100} />
        <p>Tickets In Progress</p>
      </TicketInfo>

      {/* pass result, count and handleIncrement function values to TicketInfo.js */}

      <TicketInfo
        result="failed"
        count={counts.failed}
        onClick={() => handleIncrement("failed")}
      >


        {/* pass image and <p> text as children to TicketInfo.js */}

        <img src={failedImage} alt="Failed" width={100} height={100} />
        <p>Tickets Failed</p>
      </TicketInfo>

    </div>
  );
};

export default StatusBoard;
