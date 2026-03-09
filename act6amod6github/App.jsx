import React, { useState, useEffect } from "react";
import Card from "./components/Card";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // List of cards
  const [cards, setCards] = useState([
  /*  {
      title: "Mountains",
      description: "Beautiful mountain landscape.",
      imageUrl: "https://picsum.photos/400/250",
      buttonText: "Explore",
    }, */

    {
      title: "React Development",
      description: "Learn how to build web applications with React and Tailwind CSS.",
      buttonText: "Learn More",
      imageUrl: "https://images.unsplash.com/photo-1528735000313-039ec3a473b0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },





     {
      title: "Tailwind CSS Mastery",
      description: "Master the art of rapid UI development with Tailwind CSS.",
      buttonText: "Explore",
      imageUrl: "https://images.unsplash.com/photo-1528735000313-039ec3a473b0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }

    
  ]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  // Handle form submission
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!title || !description || !imageUrl || !buttonText) return;

    setCards((prev) => [
      ...prev,
      { title, description, imageUrl, buttonText },
    ]);

    // Clear form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setButtonText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition p-6">

      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="bg-gray-800 text-white px-4 py-2 rounded dark:bg-yellow-400 dark:text-black"
        >
          Toggle Dark Mode
        </button>
      </div>

      {/* Add New Card Form */}
      <form
        onSubmit={handleAddCard}
        className="mb-6 bg-white dark:bg-gray-800 p-6 rounded shadow-md transition"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Add a New Card
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Button Text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Add Card
        </button>
      </form>

      {/* Display Cards */}
      <div className="flex flex-wrap justify-center">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            buttonText={card.buttonText}
          />
        ))}
      </div>
    </div>
  );
}

export default App;