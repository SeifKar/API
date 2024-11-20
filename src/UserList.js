import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setListOfUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <div className="user-grid">
        {listOfUser.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
