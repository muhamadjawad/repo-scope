import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, updateProfile } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedUser(user);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      await updateProfile(editedUser);
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>User Management System</h1>
        <div className="user-menu">
          <button className="user-icon" onClick={toggleDropdown}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {!isEditMode ? (
                <>
                  <div className="profile-info">
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                  </div>
                  <button className="edit-button" onClick={handleEdit}>
                    Edit Profile
                  </button>
                </>
              ) : (
                <div className="profile-edit">
                  <input
                    type="text"
                    value={editedUser?.name || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editedUser?.email || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    placeholder="Email"
                  />
                  <div className="edit-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
