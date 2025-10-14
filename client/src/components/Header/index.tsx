import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, updateProfile, logout, isSubmitting } = useAuth();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!editedUser) return;
    try {
      const { id, ...profileData } = editedUser;
      await updateProfile(profileData);
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Repo Scope</h1>
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
                  <button className="logout-button" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <div className="profile-edit">
                  <input
                    type="text"
                    name="name"
                    value={editedUser?.name || ''}
                    onChange={handleInputChange}
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser?.email || ''}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  <div className="edit-actions">
                    <button onClick={handleSave} disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
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
