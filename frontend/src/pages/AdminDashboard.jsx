import React from 'react';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom'; // This will render the nested route content

function AdminDashboard() {
  return (
    <Wrapper>
      <div className='div1'>
        <div className="left">
        <h1>harsh kamoriya</h1>
        </div>
        
        <div className="right">
          {/* The Outlet will render the content based on the selected route */}
          <DashboardOverview />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .div1 {
    width: 100%;
    height: 70%;
    display: flex;
    /* background-color:${({theme})=>theme.colors.helper} */

  }
  .right {
    width: 80%;
  }
  .left {
    width: 20%;
    overflow: hidden;
    background-color: red;

  }
`;

export default AdminDashboard;
