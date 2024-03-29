import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function UpdateNoteForm() {
  const { id } = useParams();
  console.log(id);
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        console.log('Note updated successfully');
        alert("Note updated successfully");
        navigate('/user/notes')

        // Handle successful update, such as redirecting to dashboard
      } else {
        console.error('Failed to update note');
        // Handle error
      }
    } catch (error) {
      console.error('Error updating note:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Update Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
}

export default UpdateNoteForm;
