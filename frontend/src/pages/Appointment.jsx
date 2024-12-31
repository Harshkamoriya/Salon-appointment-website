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
    const api = "http://localhost:5000/appointment/available-slots";
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
    const API = "http://localhost:5000/services";
    try {
      const response = await axios.get(API);
      setServices(response.data);
    } catch (error) {
      console.error("error fetching services " + error.message);
    }
  };

  const API = "http://localhost:5000/appointment/book-slots";
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
        <div className="left">
          <h1>Book Your Appointment</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={fullname} required placeholder="Full Name" />
            <input type="number" ref={age} required placeholder="Age" />
            <select ref={sex} required defaultValue="">
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="tel" ref={contact} pattern="[0-9]{10}" required placeholder="Contact Number" />
            <select ref={location} required defaultValue="">
              <option value="" disabled>
                Select Location
              </option>
              <option value="downtown">Downtown</option>
              <option value="uptown">Uptown</option>
              <option value="suburban">Suburban</option>
              <option value="mall">Mall</option>
            </select>
            <DatePicker
            className=".custom-datepicker"
  placeholderText="Select Date"
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="MMMM dd, yyyy"
  minDate={new Date()}
  style={{
    width: "100px",
    height: "40px",
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    fontSize: "1rem",
    boxSizing: "border-box",
  }}
  renderCustomHeader={({
    date,
    changeMonth,
    changeYear,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        style={{ marginRight: "10px" }}
      >
        {"<"}
      </button>
      <span>{date.toLocaleString("default", { month: "long", year: "numeric" })}</span>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        style={{ marginLeft: "10px" }}
      >
        {">"}
      </button>
    </div>
  )}
/>

            <select
              value={selectedTimeSlot}
              onChange={(e) => setSeclectedTimeSlot(e.target.value)}
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
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
            <Button type="submit">Next</Button>
          </form>
        </div>
        <div className="right">
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
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .left {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h1 {
    font-size: 2rem;
    color: #343a40;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  input:focus,
  select:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 5px rgba(18, 101, 191, 0.5);
  }
  Button {
    padding: 0.8rem;
    background: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
  }
  Button:hover {
    background: #0056b3;
  }
  .right {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    max-width: 100%;
    border-radius: 10px;
  }

  form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 20px;
  max-width: 800px; /* Increased width */
  width: 100%; /* Ensures responsiveness */
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

form label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
}

form input,
form select,
form button {
  width: 100%; /* Ensure all elements have the same width */
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Prevent padding from affecting width */
}

form input[type="date"] {
  width: 100%; /* Ensure date input matches the width of other elements */
}

form input:focus,
form select:focus {
  border-color: #007bff;
  outline: none;
}

form button {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
}



`;

export default Appointment;
