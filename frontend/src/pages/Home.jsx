import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context';
import HeroSection from '../components/HeroSection'
import Services from './Services';
import Conact from './Conact';

function Home() {
 const {updateHomePage} = useGlobalContext();

 useEffect(()=>{
  updateHomePage();
 },[]);

 
  // const data ={
  //   name : "Harsh Kamoriya",
  //   image : "https://img.freepik.com/free-vector/beauty-salon-concept-illustration_114360-6552.jpg"

  
  return (
    <div>
      <HeroSection/>
      <Services/>
      <Conact/>
    </div>
  )
}

export default Home
