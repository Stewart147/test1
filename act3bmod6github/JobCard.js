import { useState } from 'react';

export function JobCard({ job, updateJob }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState(job.activity);
  const [editedCategories, setEditedCategories] = useState(job.categories);
  const [editedStatus, setEditedStatus] = useState(job.status);

  const categoryOptions = ['ReadEmails', 'SendEmails', 'WebPrsing'];

  const handleDragStart = (e) => {
    e.dataTransfer.setData('jobId', job.id);
  };

  const toggleCategory = (category) => {
    if (editedCategories.includes(category)) {
      setEditedCategories(
        editedCategories.filter((cat) => cat !== category)
      );
    } else {
      setEditedCategories([...editedCategories, category]);
    }
  };

  const handleSave = () => {
    if (!editedActivity.trim()) return;

    updateJob({
      ...job,
      activity: editedActivity.trim(),
      categories: editedCategories,
      status: editedStatus
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="job-card">

        <input
          type="text"
          value={editedActivity}
          onChange={(e) => setEditedActivity(e.target.value)}
        />

        <div className="category-buttons">
          {categoryOptions.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={editedCategories.includes(cat) ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={editedStatus}
          onChange={(e) => setEditedStatus(e.target.value)}
        >
          <option value="Need to Complete">Need to Complete</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>

      </div>
    );
  }

  return (
    <div
      className="job-card"
      draggable={!isEditing}
      onDragStart={handleDragStart}
    >
      <h3>{job.activity}</h3>

      <div className="categories">
        {job.categories.map((category, index) => (
          <span key={index} className="category">
            {category}
          </span>
        ))}
      </div>

      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
}