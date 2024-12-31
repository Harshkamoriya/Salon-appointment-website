import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import styled from 'styled-components'

function Header() {
  return (
   <>
   <MainHeader>
   <NavLink to="/">
    <h3 className='logo'>HARSH</h3>
   </NavLink>
   <Navbar/>
   </MainHeader>
   </>
  )
}
const MainHeader = styled.header`
padding: 0 4.8rem;
height: 10rem;
background-color: ${({theme})=>theme.colors.bg};
display: flex;
justify-content: space-between;
align-items: center;
gap: 5rem;




.logo{
    height: auto;
    /* max-width:30% ; */
    padding: 5px 10px;
    background-color: white;
    box-shadow: 2px 2px 4px 0px black;
}


    
`

export default Header
