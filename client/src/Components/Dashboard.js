import React, { useEffect, useState } from 'react';
import '../assets/Dashboard.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [voilierCount, setVoilierCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchAdminCount();
    fetchUserCount();
    fetchVoilierCount();
    fetchUsers();
  }, []);

  const fetchUserCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/userCount');
      const data = await response.json();
      setUserCount(data.count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const fetchAdminCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/adminCount');
      const data = await response.json();
      setAdminCount(data.count);
    } catch (error) {
      console.error('Error fetching admin count:', error);
    }
  };

  const fetchVoilierCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/voilierCount');
      const data = await response.json();
      setVoilierCount(data.count);
    } catch (error) {
      console.error('Error fetching voilier count:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/allusers');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deleteusers/${userId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      console.log(data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.username, email: user.email }),
      });
      const data = await response.json();
      console.log(data.message);
      setEditUser(null); // Reset editUser state after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    window.location.reload(); // Refresh the page after logout
    console.log('User logged out');
  };

  return (
    <div className="dashboard">
      <div className="admin-sidebar">
        <div className="admin-info">
          <AccountCircleIcon />
          <h3>Admin</h3>
        </div>

        <div className="dropdown">
          <Button onClick={handleLogout}>
            {' '}
            Logout
            <LogoutIcon />
          </Button>
        </div>
      </div>

      <div className="admin-dashboard">
        <div className="admin-stat">
          <div className="all-users">
            <h4>Number of users</h4>
            <h3>{userCount}</h3>
          </div>
          <div className="all-sailboats">
            <h4>Number of Sailboats</h4>
            <h3>{voilierCount}</h3>
          </div>
          <div className="all-admins">
            <h4>Number of Admins</h4>
            <h3>{adminCount}</h3>
          </div>
        </div>
        <h2> Dashboard </h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {editUser === user ? (
                      <input
                        type="text"
                        defaultValue={user.username}
                        onChange={(e) => (user.username = e.target.value)}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {editUser === user ? (
                      <input
                        type="text"
                        defaultValue={user.email}
                        onChange={(e) => (user.email = e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editUser === user ? (
                      <>
                        <Button
                          className="edit-button"
                          onClick={() => updateUser(user)}
                        >
                          <EditIcon /> Save
                        </Button>
                        <Button
                          className="cancel-button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="edit-button"
                          onClick={() => handleEditUser(user)}
                        >
                          <EditIcon /> Edit
                        </Button>
                        <Button
                          className="delete-button"
                          onClick={() => deleteUser(user._id)}
                        >
                          <DeleteIcon /> Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
