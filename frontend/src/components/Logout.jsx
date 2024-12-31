import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API to invalidate the token (if implemented)
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });

      // Clear the token from local storage
      localStorage.removeItem('authtoken');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Wrapper>    <button onClick={handleLogout} className="logout-button">
      <p>LOGOUT</p>
    </button>
    </Wrapper>

  );
};

const Wrapper = styled.section `
    
    .logout-button {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.logout-button:hover {
  /* background-color: #ff1a1a; */
}

`

export default LogoutButton;
