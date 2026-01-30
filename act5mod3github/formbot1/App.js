
import React, { useState } from "react";

// Setup array of data
const FormBot = () => {
  const [bots, setBots] = useState([
    { id: 1, name: "Email Extractor", status: "Running", task: "Extracting emails" },
    { id: 2, name: "Notification Sender", status: "Completed", task: "Sending Notifications" },
    { id: 3, name: "Data Analyzer", status: "Stopped", task: "Analyzing data" }
  ]);

  // Message state
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  // Form state
  const [newBotName, setNewBotName] = useState("");
  const [newBotStatus, setNewBotStatus] = useState("Running");
  const [newBotTask, setNewBotTask] = useState("");

  // Filter state
  const [filterStatus, setFilterStatus] = useState("All");

  // Object for staus colors
  const statusColors = {
    Completed: "green",
    Stopped: "red",
    Running: "orange",
  };

  // Trigger a bot's job
  const triggerJob = (id) => {
    const bot = bots.find(bot => bot.id === id);
    if (bot) {
      setMessage(`${bot.name} is ${bot.status}`);
      setMessageColor(statusColors[bot.status] || "black");
    }
  };

  // Add a new bot
  const handleAddBot = (e) => {
    e.preventDefault();
    if (!newBotName || !newBotTask) {
      setMessage("Please fill all fields");
      setMessageColor("red");
      return;
    }

    const newBot = {
      id: bots.length + 1,
      name: newBotName,
      status: newBotStatus,
      task: newBotTask
    };

    setBots([...bots, newBot]);
    setNewBotName("");
    setNewBotStatus("Running");
    setNewBotTask("");
    setMessage("");
  };

  // Delete a bot with confirmation
  const handleDeleteBot = (id) => {
    const bot = bots.find(bot => bot.id === id);
    if (bot) {
      const confirmDelete = window.confirm(`Are you sure you want to delete "${bot.name}"?`);
      if (confirmDelete) {
        setBots(bots.filter(bot => bot.id !== id));
        setMessage(`"${bot.name}" deleted!`);
        setMessageColor("red");
      }
    }
  };

  // Filter bots based on selected status
  const filteredBots = filterStatus === "All" 
    ? bots 
    : bots.filter(bot => bot.status === filterStatus);

  return (
    <div className="bot-list-manager" style={{ padding: "20px", margin: "50px auto" }}>
      <h1>Bot List Manager</h1>

      {/* Form to add new bot */}
      <form onSubmit={handleAddBot} style={{ marginBottom: "20px", padding: "10px", border: "1px solid gray" }}>
        <h2>Add New Bot</h2>
        <input
          type="text"
          placeholder="Bot Name"
          value={newBotName}
          onChange={(e) => setNewBotName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Bot Task"
          value={newBotTask}
          onChange={(e) => setNewBotTask(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={newBotStatus}
          onChange={(e) => setNewBotStatus(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="Running">Running</option>
          <option value="Completed">Completed</option>
          <option value="Stopped">Stopped</option>
        </select>
        <button type="submit">Add Bot</button>
      </form>

      {/* Filter dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="filter">Filter by Status: </label>
        <select 
          id="filter" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Running">Running</option>
          <option value="Completed">Completed</option>
          <option value="Stopped">Stopped</option>
        </select>
      </div>

      {/* Bot list */}
      <ul style={{ padding: "20px", backgroundColor: "pink" }}>
        {filteredBots.map(bot => (
          <li key={bot.id} style={{ padding: "20px", listStyleType:"none" }}>
            {bot.id} - {bot.name} - {bot.status} - {bot.task}{" "}
            <button onClick={() => triggerJob(bot.id)} style={{ marginRight: "10px" }}>Run your job</button>
            <button onClick={() => handleDeleteBot(bot.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <hr />
      <p style={{ color: messageColor, fontWeight: "bold" }}>{message}</p>
    </div>
  );
};

export default FormBot;
