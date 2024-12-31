import React from 'react'
import { Button } from "../styles/button";
import { useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useGlobalContext } from "../Context";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';




function Signup() {
  const [isChecked, setIsChecked] = useState(false);
  const { setUserdata } = useGlobalContext();

  const username = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);
const navigate  =useNavigate();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = "http://localhost:5000/auth/Signup";
    const requestBody = {
      name: username.current.value,
      email: userEmail.current.value,
      password: userPassword.current.value,
    };
    console.log(requestBody);

    try {
      const response = await axios.post(API, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("request made");
      console.log(response.status);
      if (response.status === 201) {
        const token = response.data.token;

        setUserdata(userEmail.current.value, userPassword.current.value);
        localStorage.setItem("authtoken", token);
        console.log("signup successfull");
        username.current.value="";
        userEmail.current.value = "";
        userPassword.current.value = "";
        navigate("/login");

        setIsChecked(!isChecked);
      } else {
        console.log("signup failed");
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  };
  return (
  <>
      <Wrapper>
      <div className="container grid grid-two-column">
        <div className="section-signup-form">
          <h1 className="hero-heading">Register</h1>
          <form onSubmit={handleSubmit}>
          <input
              type="text"
              name="name"
              ref={username}
              placeholder="enter username"
              required
              autoComplete="off"
            />
            
            <input
              type="email"
              name="email"
              ref={userEmail}
              placeholder="enter your email"
              required
              autoComplete="off"
            />
            
            <input
              type="password"
              name="password"
              placeholder="enter your password"
              required
              
              ref={userPassword}
              autoComplete="off"
            />

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="checkbox"
                checked ={isChecked}
                onChange={handleCheckboxChange}
              />

              <label htmlFor="checkbox">
                i agree to the terms and conditions
              </label>
            </div>

                <Button type="submit" disabled={!isChecked} className={isChecked ? 'button-enabled' : 'button-disabled'}>
              Submit
            </Button>
           
          </form>
        </div>


        <div className="section-signup-image">
          <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg" alt="signup img" />
        </div>
      </div>
    </Wrapper>
      
  </>
  )
}

const Wrapper = styled.section`

.container{
    max-width: 100rem;
    margin: 2rem auto;
}
  .section-signup-form {
    padding: 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border: none;
      input[type="email"],
      input[type="password"] {
        background-color: transparent;
        border: none;
        box-shadow: ${({ theme }) => theme.colors.shadow};
        color: ${({ theme }) => theme.colors.text};
        transition: transform 0.2s linear;

        &:focus {
          transform: scale(1.05);
          outline: none;
        }
      }

      .checkbox-container {
        display: flex;
        align-items: center;
        outline: none;
        gap: 0.5rem;

        label {
          
          color: ${({ theme }) => theme.colors.text};
        }
      }
    }
  }

  .button-enabled{
    opacity:1;
  }
  .button-disabled{
    opacity: 0.5;
  }

  .section-signup-image{
    padding: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        height: 90%;
        object-fit: cover;
        
        
    }
  }
  .create-btn{
    color: blue;
    transition: transform 0.9s ease-in-out , color 0.3s linear;
   
    &:hover{
        color: ${({theme})=>theme.colors.btn};
        text-decoration: underline;
        cursor: pointer;
        transform: scale(1.9);

    }
   
  }
`;


export default Signup
