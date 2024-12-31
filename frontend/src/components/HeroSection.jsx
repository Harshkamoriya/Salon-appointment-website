import React from 'react'
 
import { NavLink } from 'react-router-dom';
import { Button } from '../styles/button';
import styled from 'styled-components';
import {useGlobalContext} from "../Context"



function Herosection( ) {
  const{name , image} = useGlobalContext();

  return (
    <>
       <Wrapper>
        <div className="container grid grid-two-column">
          <div className="section-hero-data">
            <p className='hero-top-data'>This is me</p>
            <h1 className='hero-heading' >
              {name}
            </h1>
            <p className="hero-para"> I am {name} A full stack web developer , youtuber and freelancer .A full stack Developer, youtuber and freelancer</p>
            <Button className='btn hire-me-btn'>
            <NavLink to="/contact">hire me</NavLink>
          </Button>
          </div>
          
          <div className="section-hero-image">
            <img src={image} alt="image" />
            
          </div>
        </div>
       </Wrapper>

    </>
  )

};
const Wrapper = styled.section`
    padding: 5rem 0;

    .section-hero-data{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .btn{
      max-width: 16rem;
    }

    .hero-top-data{
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.5rem;
      color: ${({theme})=> theme.colors.helper};

    }
    .hero-heading{
      text-transform: uppercase;
      font-size: 6.4rem;
    }

    .hero-para{
      margin-top:1.5rem;
      margin-bottom: 3.4rem;
      max-width: 60rem;
    }
    .section-hero-image{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    picture{
      text-align: center;
    }

    .hero-img{
      max-width: 80%;
    }
`;


export default Herosection;
