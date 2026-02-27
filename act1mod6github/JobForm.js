import React, { useState } from 'react';

const MAX_CATEGORIES = 3;

const JobForm = () => {

  // setup states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('To Start');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // category array
  const categoryOptions = [
    'Read Emails',
    'Web Parsing',
    'Send Emails',
    'Data Processing',
    'Report Generation'
  ];

  // filter/search categories
  const filteredCategories = categoryOptions.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) return prev;

      if (prev.length >= MAX_CATEGORIES) {
        setError(`You can select a maximum of ${MAX_CATEGORIES} categories.`);
        return prev;
      }

      setError('');
      return [...prev, category];
    });
  };

  // deselect category function
  const deselectCategory = (category) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
    setError('');
  };

  const handleCategoryClick = (category) => {
    selectedCategories.includes(category)
      ? deselectCategory(category)
      : selectCategory(category);
  };

  // clear all categories function
  const clearCategories = () => {
    setSelectedCategories([]);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    const jobDetails = {
      title,
      status,
      categories: selectedCategories
    };

    console.log('Submitted job details:', jobDetails);

    setTitle('');
    setStatus('To Start');
    setSelectedCategories([]);
    setSearchTerm('');
    setError('');
  };

  // max limit 3 categories
  const limitReached = selectedCategories.length >= MAX_CATEGORIES;

  return (

    // enter job input
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter job title"
      />

      {/* select option */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To Start">To Start</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Search */}
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '6px', width: '100%' }}
        />
      </div>

      {/* Category Buttons */}
      <div style={{ margin: '10px 0' }}>
        {filteredCategories.map(category => {
          const isSelected = selectedCategories.includes(category);
          const shouldDisable = limitReached && !isSelected;

          return (

            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              disabled={shouldDisable}
              style={{
                margin: '5px',
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: shouldDisable ? 'not-allowed' : 'pointer',
                opacity: shouldDisable ? 0.5 : 1,
                backgroundColor: isSelected ? '#4CAF50' : '#e0e0e0',
                color: isSelected ? 'white' : 'black'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Clear Button */}
      {selectedCategories.length > 0 && (
        <button
          type="button"
          onClick={clearCategories}
          style={{
            marginBottom: '10px',
            padding: '6px 10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Categories
        </button>
      )}

      {/* Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Selected List */}
      <div>
        <strong>
          Selected Categories ({selectedCategories.length}/{MAX_CATEGORIES})
        </strong>
        {selectedCategories.length === 0 ? (
          <p>None selected</p>
        ) : (
          <ul>
            {selectedCategories.map(category => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;