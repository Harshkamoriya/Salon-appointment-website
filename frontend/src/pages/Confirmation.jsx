import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const { bookData } = useGlobalContext();
  const navigate = useNavigate();

  const latestbooking =
    bookData && bookData.length > 0 ? bookData[bookData.length - 1] : null;

  return (
    <Wrapper>
      <div className="container">
        <div className="content-section">
          <div className="certificate">
            <div className="box">
              <h2 className="thank-you">THANK YOU</h2>
            </div>
            <div className="downbox">
              <h2 className="certificate-text">
                <span>{latestbooking.fullname}</span>, your visit on{" "}
                <span>{new Date(latestbooking.date).toLocaleDateString()}</span>{" "}
                has been confirmed <br />
                Location: <span>{latestbooking.location}</span>
                <br />
                Time slot: <span>{latestbooking.timeSlot}</span>
              </h2>
              <p className="message">
                We look forward to seeing you and providing you with exceptional
                service.
              </p>
              <button 
                className="got-it-btn"
                onClick={() => navigate("/")}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
        
        <div className="image-section">
          <img 
            src="https://img.freepik.com/free-vector/confirmed-concept-illustration_114360-5400.jpg" 
            alt="Confirmation illustration" 
          />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg || "#f8f9fa"};

  .container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .content-section {
    flex: 1;
    max-width: 700px;
  }

  .certificate {
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
  }

  .thank-you {
    font-size: 3.5rem;
    font-weight: 800;
    color: #2d3436;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #6c5ce7, #a363d9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .downbox {
    background: linear-gradient(135deg, #e0e7ff 0%, #ccccff 100%);
    border-radius: 15px;
    padding: 2.5rem;
    margin-top: 1.5rem;
    border: 1px solid rgba(175, 173, 173, 0.2);
  }

  .certificate-text {
    font-size: 1.6rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #2d3436;
  }

  span {
    color: #6c5ce7;
    font-weight: 700;
    font-size: 1.7rem;
  }

  .message {
    font-size: 1.4rem;
    color: #636e72;
    margin: 2rem 0;
    font-weight: 500;
  }

  .got-it-btn {
    background: linear-gradient(135deg, #6c5ce7, #a363d9);
    color: white;
    border: none;
    padding: 1.2rem 4rem;
    border-radius: 50px;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .image-section {
    flex: 1;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 1024px) {
    .container {
      padding: 1.5rem;
    }

    .certificate-text {
      font-size: 1.5rem;
    }

    .thank-you {
      font-size: 3rem;
    }

    span {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    .container {
      flex-direction: column;
      gap: 3rem;
    }

    .content-section {
      order: -1; /* Ensures certificate appears at the top */
      max-width: 100%;
    }

    .image-section {
      max-width: 100%;
    }

    .certificate {
      padding: 2rem;
    }

    .downbox {
      padding: 2rem;
    }

    .thank-you {
      font-size: 2.8rem;
    }

    .certificate-text {
      font-size: 1.4rem;
      line-height: 1.6;
    }

    span {
      font-size: 1.5rem;
    }

    .message {
      font-size: 1.3rem;
      margin: 1.5rem 0;
    }

    .got-it-btn {
      padding: 1.1rem 3.5rem;
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    .container {
      padding: 1rem;
    }

    .certificate {
      padding: 1.5rem;
    }

    .thank-you {
      font-size: 2.5rem;
    }

    .downbox {
      padding: 1.5rem;
    }

    .certificate-text {
      font-size: 1.3rem;
    }

    span {
      font-size: 1.4rem;
    }

    .message {
      font-size: 1.2rem;
    }

    .got-it-btn {
      padding: 1rem 3rem;
      font-size: 1.2rem;
    }
  }
`;

export default Confirmation;