import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
      let navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/note', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Failed to fetch notes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/note/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        console.error('Failed to delete note:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (id) => {
    // Navigate to the edit page with the note ID
    navigate(`/note/update/${id}`)
    
    console.log(`Editing note with ID: ${id}`);
  };

  return (
    <div>
      <h2>My Notes</h2>
      <div>
        {notes.map((note) => (
          <div key={note._id} className="note-container">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
            <button onClick={() => handleEdit(note._id)}>Edit</button>
          </div>
        ))}
      </div>
      <Link to="/user/create">Create Note</Link>
    </div>
  );
};

export default NotesList;
