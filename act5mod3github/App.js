
import React, { useState } from "react";

const BotListManager = () => {
  // seup an array of values
  const [bots, setBots] = useState([
    { id: 1, name: "Email Extractor", status: "Running", task: "Extracting emails" },
    { id: 2, name: "Notification Sender", status: "Completed", task: "Sending Notifications" },
    { id: 3, name: "Data Analyzer", status: "Stopped", task: "Analyzing data" }
  ]);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black"); // default color

  const triggerJob = (id) => {
    const bot = bots.find(bot => bot.id === id);
    if (bot) {
      setMessage(bot.status);

      // Set color based on status
      let color = "black";
      if (bot.status === "Completed") color = "green";
      else if (bot.status === "Stopped") color = "red";
      else if (bot.status === "Running") color = "orange"; // amber
      setMessageColor(color);
    }
  };

  return (
    <div className="bot-list-manager"style={{ padding: "20px", margin: "50px auto"}}> 
      <h1>Bot List Manager</h1>

      <ul style={{ padding: "20px", backgroundColor: "pink"}}>  
        {bots.map(bot => (
          <li key={bot.id} style={{ padding: "20px", listStyleType:"none"}}> 
            {bot.id} - {bot.name} - {bot.status} - {bot.task}{" "}
            <button onClick={() => triggerJob(bot.id)}>Run your job</button>
          </li>
        ))}
      </ul>

      <hr />
      {/* Message with inline color styling */}
      <p style={{ color: messageColor, fontWeight: "bold" }}>{message}</p>
    </div>
  );
};

export default BotListManager;
