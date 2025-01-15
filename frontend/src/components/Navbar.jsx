import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context';
import { CgCloseR, CgMenu } from 'react-icons/cg';

const Nav = styled.nav`
  padding: 1rem 2rem;
  background: transparent;
  position: relative;
  z-index: 999;

  .navbar-list {
    display: flex;
    gap: 4.8rem;
    align-items: center;
    justify-content: flex-end;

    li {
      list-style: none;

      .navbar-link {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
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
        right: 0;
        top: 100%;
        background-color: ${({ theme }) => theme.colors.white};
        min-width: 160px;
        box-shadow: ${({ theme }) => theme.colors.shadow};
        border-radius: 10px;
        z-index: 1000;

        a {
          color: ${({ theme }) => theme.colors.black};
          padding: 1.2rem 1.6rem;
          text-decoration: none;
          display: block;
          font-size: 1.6rem;

          &:hover {
            background-color: ${({ theme }) => theme.colors.bg};
          }
        }
      }
    }
  }

  .mobile-navbar-btn {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    background: transparent;
    
    .mobile-navbar-btn {
      display: block;
      position: absolute;
      right: 2rem;
      top: 1rem;
      z-index: 1001;
      
      .mobile-nav-icon {
        font-size: 4.3rem;
        color: ${({ theme }) => theme.colors.black};
      }

      .close-outline {
        display: none;
      }
    }

    .navbar-list {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;

      li {
        margin: 1.5rem 0;
        
        .navbar-link {
          font-size: 2.8rem;
        }
      }

      .dropdown {
        .dropdown-btn {
          font-size: 2.8rem;
        }

        .dropdown-content {
          position: static;
          width: 100%;
          margin: 1rem 0;
          text-align: center;
          background: transparent;
          box-shadow: none;
          display: ${(props) => (props.isOpen ? 'block' : 'none')};

          a {
            font-size: 2rem;
            padding: 1rem 0;
            color: ${({ theme }) => theme.colors.black};
            
            &:hover {
              background: transparent;
              color: ${({ theme }) => theme.colors.helper};
            }
          }
        }
      }
    }

    .active {
      .navbar-list {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        overflow-y: auto;
      }

      .mobile-nav-icon {
        display: none;
      }

      .close-outline {
        display: block;
      }
    }
  }
`;

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [role, setRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { profileInfo } = useGlobalContext();

  useEffect(() => {
    setRole(profileInfo ? profileInfo.role : null);
  }, [profileInfo]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setOpenMenu(false);
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
      closeDropdown();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Nav isOpen={isDropdownOpen} className="navbar">
      <div className={openMenu ? "menuicon active" : "menuicon"}>
        <ul className="navbar-list">
          <li>
            <NavLink className="navbar-link" onClick={() => setOpenMenu(false)} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={() => setOpenMenu(false)} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={() => setOpenMenu(false)} to="/services">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={() => setOpenMenu(false)} to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={() => setOpenMenu(false)} to="/login">
              Login
            </NavLink>
          </li>
          <li className="dropdown">
            <span className="dropdown-btn navbar-link" onClick={toggleDropdown}>
              More
            </span>
            <div className="dropdown-content">
              {role === 'admin' ? (
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
                  <NavLink className="navbar-link" to="/login" onClick={() => { handleLogout() }}>
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="navbar-link" to="/admin/settings" onClick={closeDropdown}>
                    Settings
                  </NavLink>
                  <NavLink className="navbar-link" to="/help" onClick={closeDropdown}>
                    Help
                  </NavLink>
                  <NavLink className="navbar-link" to="/login" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </>
              )}
            </div>
          </li>
        </ul>
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => { setOpenMenu(true) }}
          />
          <CgCloseR
            name="close-outline"
            className="close-outline mobile-nav-icon"
            onClick={() => { setOpenMenu(false) }}
          />
        </div>
      </div>
    </Nav>
  );
}

export default Navbar;