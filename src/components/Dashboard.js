import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  // Access the user context
  const { user, token } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {user ? (
        <div>
          {/* Display user-specific information */}
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>user Id: {user._id}</p>
          <p>Token: {token}</p>
        </div>
      ) : (
        <p>Please sign in to view your dashboard</p>
      )}
      <div>
        {/* Options for managing notes */}
        <h3>Manage Notes</h3>
        <ul>
          <li><button>Create Note</button></li>
          <li><button>View Notes</button></li>
          <li><button>Edit Note</button></li>
          <li><button>Delete Note</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
