import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context';

const Nav = styled.nav`
  .navbar-list {
    display: flex;
    gap: 4.8rem;

    li {
      list-style: none;

      .navbar-link {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }

      &:hover .navbar-link,
      &:active .navbar-link {
        color: ${({ theme }) => theme.colors.helper};
      }
    }

    .dropdown {
      position: relative;

      .dropdown-btn {
        cursor: pointer;
        font-size: 1.8rem;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;

        &:hover {
          color: ${({ theme }) => theme.colors.helper};
        }
      }

      .dropdown-content {
        position: absolute;
        display: ${(props) => (props.isOpen ? 'block' : 'none')};
        right: 0.5px;
        top: 70px;
        background-color: ${({ theme }) => theme.colors.white};
        min-width: 160px;
        box-shadow: ${({ theme }) => theme.colors.shadow};
        border-radius: 10px;
        z-index: 1;

        a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;

          &:hover {
            background-color: ${({ theme }) => theme.colors.bg};
          }
        }
      }
    }
  }
`;

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const{ profileInfo }= useGlobalContext();
  console.log(profileInfo);
  const role = profileInfo ? profileInfo.role : null;
  console.log(role)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      localStorage.removeItem('authtoken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Nav isOpen={isDropdownOpen}>
      <div className="menuicon">
        <ul className="navbar-list">
          <li>
            <NavLink className="navbar-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/services">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="dropdown">
            <span className="dropdown-btn" onClick={toggleDropdown}>
              More
            </span>
            <div className="dropdown-content">
              {role === 'admin' && (
                <>
                  <NavLink className="navbar-link" to="/newdash" onClick={closeDropdown}>
                    Admin
                  </NavLink>
                  <NavLink className="navbar-link" to="/admin/appointments" onClick={closeDropdown}>
                    Appointments
                  </NavLink>
                  <NavLink className="navbar-link" to="/admin/services-update" onClick={closeDropdown}>
                    Services
                  </NavLink>
                  <NavLink className="navbar-link" to="/admin/reports" onClick={closeDropdown}>
                    Reports
                  </NavLink>
                  <NavLink className="navbar-link" to="/admin/settings" onClick={closeDropdown}>
                    Settings
                  </NavLink>
                  <NavLink className="navbar-link" to="/help" onClick={closeDropdown}>
                Help
              </NavLink>
              <NavLink className="navbar-link" to="/login" onClick={() => { closeDropdown(); handleLogout(); }}>
                Logout
              </NavLink>

                </>
              )}
               <NavLink className="navbar-link" to="/admin/settings" onClick={closeDropdown}>
                    Settings
                  </NavLink>
              <NavLink className="navbar-link" to="/help" onClick={closeDropdown}>
                Help
              </NavLink>
              <NavLink className="navbar-link" to="/login" onClick={() => { closeDropdown(); handleLogout(); }}>
                Logout
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </Nav>
  );
}

export default Navbar;
