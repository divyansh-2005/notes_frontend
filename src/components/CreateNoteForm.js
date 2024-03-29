import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom'; // Import Link from React Router

const CreateNoteForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useContext(AuthContext); // Assuming you have a token in your auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        // Note created successfully
        console.log('Note created successfully');
        alert('Note created successfully');
        // You can redirect the user or display a success message here
      } else {
        // Handle error cases
        console.error('Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Note</button>
        {/* Add a Link to navigate to the notes page */}
        <Link to="/user/notes">View Notes</Link>
      </form>
    </div>
  );
};

export default CreateNoteForm;
