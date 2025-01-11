import React, { useState } from "react";
import { Button } from "../styles/button";
import { useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useGlobalContext } from "../Context";
import { NavLink ,useNavigate} from "react-router-dom";




function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const { setUserdata } = useGlobalContext();
  const {fetchCurrentUser} = useGlobalContext();
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = "http://localhost:5000/auth/login";
    const requestBody = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    try {
      console.log("in the try function ")
      const response = await axios.post(API, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const token = response.data.token;

        //  const decodedToken = jwtDecode(token);
        // if (!decodedToken || Date.now() >= decodedToken.exp * 1000) {
        //   console.log("Token is invalid or expired");
        //   return;
        // }
        setUserdata(userEmail.current.value, userPassword.current.value);
        localStorage.setItem("authtoken", token);
        console.log("login successfull");
        userEmail.current.value = "";
        userPassword.current.value = "";
        fetchCurrentUser();

        setIsChecked(!isChecked);

        navigate("/");
        // <NavLink to="/home"></NavLink>
      }
     else {
        console.log("login failed");
      }
    } catch (err) {
      console.log("catch error in the login page", err);
    }
  };

  return (
    <Wrapper>
      <div className="container grid grid-two-column">
        <div className="section-login-form">
          <h1 className="hero-heading">login</h1>
          <form onSubmit={handleSubmit}>
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
                id="checkbox"
                checked ={isChecked}
                onChange={handleCheckboxChange}
              />

              <label htmlFor="checkbox">
                i agree to the terms and conditions
              </label>
            </div>

                <Button type="submit" disabled={!isChecked} className={isChecked ? 'button-enabled' : 'button-disabled'}>
              login
            </Button>
            <div className="signup">
                <p>dont have an account ? <NavLink  to="/signup"  className="create-btn">create an account</NavLink> </p>
            </div>
          </form>
        </div>


        <div className="section-login-image">
            <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?semt=ais_hybrid" alt="login-img" />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`

.container{
    max-width: 100rem;
    margin: 2rem auto;
}
  .section-login-form {
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

  .section-login-image{
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
  @media (max-width:${({theme})=>theme.media.mobile}) {
    Button{
      max-width: 50rem;

    }
  }
`;
export default Login;
