import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { GlobalStyle } from "../GlobalStyle";

function Confirmation() {
  const { bookData } = useGlobalContext();

  const latestbooking =
    bookData && bookData.length > 0 ? bookData[bookData.length - 1] : null;

  return (
    <Wrapper>
      <div className="container grid grid-two-column">
        <div className="right">
        <div className="certificate">
          <div className="box">
            <h2 style={{ fontWeight: "bold" }}> THANK YOU</h2>
          </div>
          <div className="downbox">
            <h2 className="certificate-text">
              <span>{latestbooking.fullname}</span> , you're booked your visit
              on{" "}
              <span>{new Date(latestbooking.date).toLocaleDateString()}</span>{" "}
              has been confirmed <br />
              Location :
              <span>{latestbooking.location}</span>
              <br />
              Time slot : <span>{latestbooking.timeSlot}</span>
            </h2>
            <p>
              We look forward to seeing you and providing you with exceptional
              service.
            </p>
          </div>
        </div>
        </div>
        
        <div className="imagesection">
          <img src="https://img.freepik.com/free-vector/confirmed-concept-illustration_114360-5400.jpg" alt="" />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .certificate-text {
    font-size: xx-large;
  }
  .container{
    display: flex;
    flex-direction: row;
    max-width: 90%;
    justify-content: center;
    align-items: center;
    padding:64px;

  }
  span {
    font-size: bold;
    color: black;
    font-weight: bold;
  }
  .right{
    max-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imagesection{
    width: 50%;
    padding: 10px;
    overflow: auto;
  }
  img{
    width: 100%;
  }
  .certificate {
    width: 90%;
    padding: 20px;
    padding-bottom: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  }

  .downbox {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 5% 10%;
    background-color: #ccccff;
    /* background-color: blue; */
    border-radius: 10px;
    text-align: center;
    line-height:40px;
    margin: 10px 20px;
    border: 1px solid #afadad;
  }



`;
export default Confirmation;
