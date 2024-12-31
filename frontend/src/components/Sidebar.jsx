import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
  return (
    <Wrapper>
      <div className="sidebar">
        <div className="logo">Salon Admin</div>
        <ul className="nav-links">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/appointments">Appointments</Link></li>
          <li><Link to="/admin/services">Services</Link></li>
          <li><Link to="/admin/customers">Customers</Link></li>
          <li><Link to="/admin/reports">Reports</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .sidebar {
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.heading};
    padding: 2rem;
  }

  .sidebar .logo {
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  .sidebar .nav-links li {
    margin-bottom: 1.5rem;
  }

  .sidebar .nav-links li a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.8rem;
  }
`;

export default Sidebar;
