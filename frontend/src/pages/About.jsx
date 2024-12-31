import React, { useEffect } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../Context';

import Herosection from '../components/HeroSection'

function About() {
  const {updateAboutPage}=useGlobalContext();
  useEffect(()=>{updateAboutPage();},[]);

// const data = {
//   name : "harsh kamoriya",
//   image: "https://st2.depositphotos.com/30291372/46142/v/450/depositphotos_461424770-stock-illustration-flat-vector-illustration-for-about.jpg"
// }

  return (
    <Herosection />
  )
}

export default About
