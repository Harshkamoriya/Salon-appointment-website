import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context';
import { CgCloseR, CgMenu } from 'react-icons/cg';


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

      &:hover .navbar-link
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
  .mobile-navbar-btn{
    display: none;

    .close-outline{
      display: none;
    }
  }
  .mobile-navbar-btn[name ="close-outline"]{
    display: none;

  }

@media (max-width: ${({theme})=>theme.media.mobile}){
  .mobile-navbar-btn{
    display: inline-block;
    z-index: 999;
    border: ${({theme})=>theme.colors.black};


    .mobile-nav-icon{
      font-size: 4.3rem;
      color: ${({theme})=>theme.colors.black};
    }
  }
  /* hide navbar list  */

  .navbar-list{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    transform: translate(100%);

    visibility: hidden;
    opacity: 0;

  li{
    .navbar-link{
      &:link,&:visited{
        font-size: 3.2rem;
      }

    }
  }
  .dropdown{
    .navbar-link{
      font-size:3.2rem;
    }
  }

  }

   
.active .mobile-nav-icon{
  display: none;
  font-size: 3.2rem;
  position: absolute;
  top: 3%;
  right: 10%;
  color: ${({theme})=>theme.colors.black};
  z-index: 9999;
}
.active .close-outline{
  display: inline-block;

}
.active .navbar-list{
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
  z-index: 999;
}

  }



`;

function Navbar() {

  const [openMenu ,setOpenMenu] = useState(false)
  const [role , setRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const{ profileInfo }= useGlobalContext();

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
    <Nav isOpen={isDropdownOpen} className='navbar'>
      <div className={openMenu ? "menuicon active": "menuicon"}>
        <ul className="navbar-list">
          <li>
            <NavLink className="navbar-link"
            onClick={()=>setOpenMenu(false)} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" 
            onClick={()=>setOpenMenu(false)} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={()=>setOpenMenu(false)} to="/services">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={()=>setOpenMenu(false)} to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" onClick={()=>setOpenMenu(false)} to="/login">
              Login
            </NavLink>
          </li>
          <li className="dropdown ">
            <span className="dropdown-btn navbar-link"  onClick={toggleDropdown}>
              More
            </span>
            <div className="dropdown-content">
    {role === 'admin' ? (
      // Admin-specific options
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
        <NavLink className="navbar-link" to="/login" onClick={()=>{handleLogout()}}>
                Logout
              </NavLink>
      </>
    ) : (
      // Non-admin options
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
        <div className='mobile-navbar-btn'>
          <CgMenu name='menu-outline'  className='mobile-nav-icon' onClick={()=>{setOpenMenu(true)}}/>
          <CgCloseR name='close-outline'className='close-outline mobile-nav-icon' onClick={()=>{setOpenMenu(false)}}/>
        </div>

      </div>
    </Nav>
  );
}

export default Navbar;
