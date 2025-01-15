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
            <p className='hero-top-data'>WELCOME to</p>
            <h1 className='hero-heading' >
              Salon ease
            </h1>
            <p className="hero-para">Book your appointment today for a seamless salon experience. We offer premium services tailored to your needs</p>
            <Button className='btn hire-me-btn'>
            <NavLink to="/contact">contact us</NavLink>
          </Button>
          </div>
          
          <div className="section-hero-image">
            <img src={image} alt="image"  />
            
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
      background-color: tan;
      img{
        height: 450px;
        width: 100%;

      }
    }

    picture{
      text-align: center;
    }

    .hero-img{
      max-width: 80%;
    }

    @media (max-width: ${({theme})=>theme.media.mobile}) {
      .grid{
        gap: 7.2rem;
      }
    }
`;


export default Herosection;
