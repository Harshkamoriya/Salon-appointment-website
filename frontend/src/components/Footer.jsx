import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/button";
import { FaDiscord, FaInstagram, FaYoutube ,FaSearch} from "react-icons/fa";

function Footer() {
  return (
    <Wrapper>
      <section className="contact-short">
        <div className="grid grid-two-column">
          <div>
            <h3>get ready to started</h3>
            <h3>talk to us today</h3>
          </div>
          <div>
            <NavLink to="/" className="contact-short-btn">
              <Button>get started</Button>
            </NavLink>
          </div>
        </div>
      </section>

      <footer>
        <div className="container grid grid-four-column">
          <div className="footer-about">
            <h3>Harsh kamoriya</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="footer-subscribe">
            <h3>subscribe</h3>
            <form action="">
              <input
                type="email"
                name="email"
                placeholder="email"
                autoComplete="off"
                required
              />
              <input type="submit" value="Subscribe" />
            </form>
          </div>

          <div className="footer-social">
            <h3>follow us</h3>
            <div className="footer-social-icons">
              <div>
                <FaDiscord className="icons" />
              </div>
              <div>
                <FaInstagram className="icons" />
              </div>
              <div>
                <FaYoutube className="icons" />
              </div>
            </div>
          </div>
          {/* column 4 */}
          <div className="footer-contact">
            <h3>call us</h3>
            <h3> +91 654645663</h3>
           
          </div>
          
        </div>
         {/* bottom */}
         <div className="footer-bottom">
              <hr />
              <div className="container grid grid-two-column">
                <p>
                  @{new Date().getFullYear()} Harsh kamoriya. All Rights Reserved
                  </p>
                
                <div>
                <p>PRIVACY POLICY</p>
                <p>TERMS & CONDITONS</p>
                </div>
                
            </div>
            </div>
      </footer>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .contact-short {
    max-width: 60vw;
    margin: auto;
    border-radius: 10px;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

     .contact-short-btn {
      justify-self: end;
      align-self: center;
    }
  }
  footer{
    padding: 14rem 0 9rem 0;
    background-color: ${({theme})=>theme.colors.footer_bg};
    h3{
    color: ${({theme})=>theme.colors.white};
    margin-bottom: 2.4rem;
  }
  }


  p{
    color: ${({theme})=>theme.colors.white};
  }
  .footer-social-icons{
    display: flex;
    gap: 2rem;
  }
/* 
  div {
    padding: 1rem;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.white};
  } */
  .icons {
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.4rem;
    position: relative;
    cursor: pointer;
  }
  .footer-bottom{
    padding-top:9rem;
  }
  hr{
    margin-bottom: 2rem;
    color: ${({theme})=>theme.colors.hr};
    height: 0.1px;
  }

  @media (max-width : ${({theme})=>theme.media.mobile}){
.contact-short{
  max-width: 95vw;
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .contact-short-btn{
    text-align:center;
    justify-self: flex-start;
    
  }
 
}
footer .footer-bottom-section{
  padding-top: 3.2rem;
}
  }

`;

export default Footer;
