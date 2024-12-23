import React, { useEffect } from 'react';
import  styles from '../styles/profile.module.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/slices/userSlice'; // Import the async action
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const Profile = () => {
  const dispatch = useDispatch();

  // Access user data and status from the Redux store
  const { user, status, error } = useSelector((state) => state.user);

  // State for managing profile edit form data
  const [editProfile, setEditProfile] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  // Fetch user data when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData());
    }

    // Ensure the form is updated once user data is available
    if (user) {
      setEditProfile({
        username: user.username,
        email: user.email,
        password: '', // Keep password empty initially for security
      });
    }
  }, [status, user, dispatch]); // Trigger the effect when 'user' or 'status' changes

  // Handle changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  // Submit the updated profile information to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/updateuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editProfile.username,
          email: editProfile.email,
          password: editProfile.password,
        }),
        credentials: 'include'
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        // Update Redux store with the edited data
        dispatch(fetchUserData()); // Refresh user data after update
        setEditProfile({ ...editProfile, password: '' });
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile');
    }
  };

  // Handle loading and error states
  if (status === 'loading') {
    return <p>Loading profile...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div className={styles['profile-page']}>
      <h1>Profile</h1>

      {/* Display Profile Information */}
      <div className={styles['profile-info']}>
        <FaRegCircleUser size={100} />
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Edit Form for Username, Email, and Password */}
      <div className={styles['profile-edit']}>
  <h2>Edit Profile</h2>
  <form onSubmit={handleSubmit} className={styles['updateform']}>
    <div className={styles['form-group']}>
      <label htmlFor="username">Profile Name:</label>
      <input
        id="username"
        type="text"
        name="username"
        value={editProfile.username}
        placeholder="Enter your profile name"
        onChange={handleInputChange}
      />
    </div>
    <div className={styles['form-group']}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        value={editProfile.email}
        placeholder="Enter your email address"
        onChange={handleInputChange}
      />
    </div>
    <div className={styles['form-group']}>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        value={editProfile.password}
        placeholder="Enter a new password"
        onChange={handleInputChange}
      />
    </div>
    <button type="submit">Update Profile</button>
  </form>
</div>
    </div>
  );
};

export default Profile;
