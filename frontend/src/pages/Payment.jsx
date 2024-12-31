import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../Context";
import styled from "styled-components";

const Payment = ({ order }) => {
  const {services} = useGlobalContext();
  const { bookData } = useGlobalContext();
  const [price , setPrice] = useState(null);

  const handlePayment = async () => {
    const options = {
      key: "your_razorpay_key_id", // Replace with your Razorpay Key ID
      amount: order.amount, // Amount in paise
      currency: "INR",
      name: "Salon Service",
      description: "Appointment Payment",
      order_id: order.id, // Razorpay order ID
      handler: async (response) => {
        try {
          const res = await axios.post("/appointments/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          const data = res.data;

          if (data.message === "Payment successful") {
            alert("Payment successful!");
            window.location.href = "/confirmation";
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          alert("Error: " + error.message);
        }
      },
      prefill: {
        name: "Customer Name", // Replace with dynamic customer name if available
        email: "customer@example.com", // Replace with dynamic email if available
        contact: "1234567890", // Replace with dynamic contact number if available
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // fetching the price of the chosen service

  const fetchprice = (serviceName) => {
    console.log("Services Array:", services);
    console.log("Service Name to Find:", serviceName);
  
    const service = services.find((service) => service.name === serviceName);
    return service ? service.price : "Service not found";
  };
  


  // Get the latest booking details
  const latestBooking = bookData && bookData.length > 0 ? bookData[bookData.length - 1] : null;
//  fetching price
  useEffect(() => {
    if (latestBooking && services.length > 0) {
      const fetchedPrice = fetchprice(latestBooking.service);
      console.log("Fetched Price:", fetchedPrice);
      setPrice(fetchedPrice);
    } else {
      console.log("Services or latestBooking not available");
    }
  }, [services, bookData]);
  

  return (
    <Wrapper>
      <div className="container">
        <h2 className="common-heading">Booking Summary</h2>
        {latestBooking ? (
          <div className="summary-card">
           <p className="flex-between">
  <span>Name:</span> 
  <span>{latestBooking.fullname}</span>
</p>
<p className="flex-between">
  <span>Age:</span> 
  <span>{latestBooking.age}</span>
</p>
<p className="flex-between">
  <span>Sex:</span> 
  <span>{latestBooking.sex}</span>
</p>
<p className="flex-between">
  <span>Location:</span> 
  <span>{latestBooking.location}</span>
</p>
<p className="flex-between">
  <span>Contact:</span> 
  <span>{latestBooking.contact}</span>
</p>
<p className="flex-between">
  <span>Date:</span> 
  <span>{new Date(latestBooking.date).toLocaleDateString()}</span>
</p>
<p className="flex-between">
  <span>Time Slot:</span> 
  <span>{latestBooking.timeSlot}</span>
</p>
<br />
<hr />
<p className="flex-between">
  <span>Service:</span> 
  <span>{latestBooking.service}</span>
</p>
<hr />
<p className="flex-between">
  <span>Amount:</span> 
  <span>{price} Rs.</span>
</p>


      
          </div>
        ) : (
          <p>No booking data available</p>
        )}
        <button className="btn" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    background-color: ${({ theme }) => theme.colors.bg};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    max-width: 50rem;
    margin: 2rem auto;
    text-align: center;
  }

  .common-heading {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: 2rem;
  }

  .summary-card {
    background-color: ${({ theme }) => theme.colors.white};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    margin-bottom: 2rem;
    text-align: left;
  }

  .summary-card p {
    margin: 1rem 0;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .summary-card span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.heading};
  }

  .btn {
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem 2rem;
    font-size: 1.8rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .btn:hover {
    background-color: ${({ theme }) => theme.colors.helper};
  }


  .flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0; /* Adjust spacing as needed */
  font-size: 1.6rem; /* Adjust font size as needed */
  /* color: ${({ theme }) => theme.colors.text}; Optional: Use theme colors */
}

.flex-between span:first-child {
  font-weight: bold; /* Make the label bold */
  color: ${({ theme }) => theme.colors.heading}; /* Optional: Use theme colors */
}

.flex-between span:last-child {
  color: #4e4e4e;
  /* color: ${({ theme }) => theme.colors.text}; Optional: Use theme colors */

  text-align: right; /* Ensure the value aligns to the right */
}



`;

export default Payment;
