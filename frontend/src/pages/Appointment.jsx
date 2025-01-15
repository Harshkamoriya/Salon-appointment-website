import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

import { Button } from "../styles/button";
import { useGlobalContext } from "../Context";

function Appointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSeclectedTimeSlot] = useState("");
  const fullname = useRef(null);
  const age = useRef(null);
  const sex = useRef(null);
  const contact = useRef(null);
  const location = useRef(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const { setbookingData } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchavailableSlots(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      handleservices();
    }
  }, [selectedDate]);

  const fetchavailableSlots = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const api = "https://salonease-oy0f.onrender.com/appointment/available-slots";
    try {
      const response = await axios.get(api, {
        params: { date: formattedDate },
      });
      setTimeSlots(response.data.freeSlots);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleservices = async () => {
    const API = "https://salonease-oy0f.onrender.com/services";
    try {
      const response = await axios.get(API);
      setServices(response.data);
    } catch (error) {
      console.error("error fetching services " + error.message);
    }
  };

  const API = "https://salonease-oy0f.onrender.com/appointment/book-slots";
  const bookslots = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedService) {
      alert("Please select both a date and a time slot.");
      return;
    }

    if (
      !fullname.current.value ||
      !age.current.value ||
      !sex.current.value ||
      !contact.current.value ||
      !location.current.value
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestBody = {
      name: fullname.current.value,
      age: parseInt(age.current.value, 10),
      sex: sex.current.value,
      contact: contact.current.value,
      location: location.current.value,
      date: selectedDate.toISOString().split("T")[0],
      timeSlot: selectedTimeSlot,
      service: selectedService,
    };

    try {
      const response = await axios.post(API, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setbookingData(
          fullname.current.value,
          age.current.value,
          sex.current.value,
          contact.current.value,
          location.current.value,
          selectedDate,
          selectedTimeSlot,
          selectedService
        );

        alert("Slot booked successfully!");

        fullname.current.value = "";
        age.current.value = "";
        sex.current.value = "";
        contact.current.value = "";
        location.current.value = "";
        setSelectedDate(null);
        setSeclectedTimeSlot("");
        setSelectedService("");

        navigate("/payment");
      }
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    bookslots();
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="form-section">
          <div className="form-header">
            <h1>Book Your Appointment</h1>
            <p>Fill in your details below to schedule your visit</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Personal Information</label>
              <div className="input-row">
                <div className="input-group">
                  <input type="text" ref={fullname} required placeholder="Full Name" />
                </div>
                <div className="input-group">
                  <input type="number" ref={age} required placeholder="Age" />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <select ref={sex} required defaultValue="">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="input-group">
                  <input 
                    type="tel" 
                    ref={contact} 
                    pattern="[0-9]{10}" 
                    required 
                    placeholder="Contact Number" 
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Appointment Details</label>
              <div className="input-row">
                <div className="input-group">
                  <select ref={location} required defaultValue="">
                    <option value="" disabled>Select Location</option>
                    <option value="downtown">Downtown</option>
                    <option value="uptown">Uptown</option>
                    <option value="suburban">Suburban</option>
                    <option value="mall">Mall</option>
                  </select>
                </div>
                <div className="input-group date-picker">
                  <DatePicker
                    placeholderText="Select Date"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM dd, yyyy"
                    minDate={new Date()}
                    className="custom-datepicker"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSeclectedTimeSlot(e.target.value)}
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select Service</option>
                    {services.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit">Schedule Appointment</Button>
          </form>
        </div>
        
        <div className="image-section">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/woman-reached-salon-for-appointment-illustration-download-in-svg-png-gif-file-formats--beauty-service-session-pack-illustrations-10018343.png?f=webp"
            alt="Salon Appointment"
          />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%);

  .container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    gap: 4rem;
    align-items: center;
    justify-content: center;
  }

  .form-section {
    flex: 1;
    max-width: 700px;
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .form-header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.2rem;
      color: #2d3436;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #6c5ce7, #a363d9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: #636e72;
      font-size: 1.9rem;
    }
  }

  .form-group {
    margin-bottom: 2rem;

    label {
      display: block;
      font-size: 1.5rem;
      font-weight: 600;
      color: #2d3436;
      margin-bottom: 1rem;
    }
  }

  .input-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .input-group {
    flex: 1;
  }

  input,
  select,
  .custom-datepicker {
    width: 100%;
    padding: 0.9rem;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    color: #2d3436;
    background: #f8f9fa;

    &:focus {
      outline: none;
      border-color: #6c5ce7;
      box-shadow: 0 0 0 4px rgba(108, 92, 231, 0.1);
      background: white;
    }

    &::placeholder {
      color: #adb5bd;
    }
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236c5ce7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.2em;
    padding-right: 2.5rem;
  }

  .date-picker {
    .custom-datepicker {
      width: 100%;
    }

    .react-datepicker-wrapper {
      width: 100%;
    }
  }

  ${Button} {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 10px;
    background: linear-gradient(135deg, #6c5ce7, #a363d9);
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(108, 92, 231, 0.3);
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

    img {
      width: 100%;
      height: auto;
      border-radius: 20px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 2rem 1rem;

    .container {
      gap: 2rem;
    }
  }

  @media (max-width: 992px) {
   

    .form-section,
    .image-section {
      max-width: 100%;
    }

    .image-section {
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 671px) {
    padding: 1rem;
    .container{
      flex-direction: column;
    }

    .form-section {
      padding: 1.5rem;
      width: 70%;
      .form-header{
        h1{
          font-size: 1.75rem;
        }
        p{
        font-size: 1.75rem;
      }
    
      }
     
    }
    Button{
      font-size: 2.5rem;
    }

    .form-header {
      h1 {
        font-size: 2.8rem;
      }

      p {
        font-size: 1.5rem;
      }
    }

    .input-row {
      flex-direction: column;
      gap: 1rem;
      .input-group{
        input{
          font-size: 1.5rem;
        }
        select{
          font-size: 1.5rem;
        }
      }
    }
    Button{
      font-size: 2.4rem;
    }
  }

  @media (max-width: 479px)
{
  .form-section{
    width: 100%;
  }
}
  
`;

export default Appointment;