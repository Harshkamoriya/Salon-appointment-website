// Payment.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../Context";
import styled from "styled-components";

const Payment = () => {
  const { services, bookData } = useGlobalContext();
  const {order} = useGlobalContext();
  console.log(order);
  const [price, setPrice] = useState(null);

  // Fetch the price of the selected service
  const fetchPrice = (serviceName) => {
    const service = services.find((service) => service.name === serviceName);
    return service ? service.price : null;
  };

  console.log("order got from globalxontext", order);



  // Get the latest booking details
  const latestBooking = bookData?.length > 0 ? bookData[bookData.length - 1] : null;

  // Fetch price on component load or when dependencies change
  useEffect(() => {
    if (latestBooking && services.length > 0) {
      const fetchedPrice = fetchPrice(latestBooking.service);
      setPrice(fetchedPrice);
    }
  }, [services, latestBooking]);

  // Handle Razorpay payment
  const handlePayment = async () => {
    console.log("handle payment called")
    console.log(import.meta.env.VITE_RAZORPAY_KEY);

    if (!order || !price) {
      alert("Order details or price are missing!");
      return;
    }
  
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY , // Razorpay Key ID from environment
      amount: order.amount, // Amount in paise
      currency: "INR",
      name: "Salon Service", // Business name
      description: "Appointment Payment",
      order_id: order.id, // Razorpay order ID
      handler: async (response) => {
        // Verify payment on the backend
        try {
          const res = await axios.post("http://localhost:5000/appointment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
  
          console.log("response is as folllows", res.data.message)
          if (res.data.message === "Payment verified successfully") {
            alert("Payment successful!");
            window.location.href = "/confirmation"; // Redirect to confirmation page
          } else {
            console.log("payment failed in frontend")
            alert("Payment verification failed. Please contact support.");
          }
        } catch (error) {
          console.error(error.message);
          console.error("Error during payment verification:", error);
          alert("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: latestBooking?.fullname || "Customer Name",
        email: latestBooking?.email || "customer@example.com",
        contact: latestBooking?.contact || "1234567890",
      },
      theme: {
        color: "#3399cc", // Replace with your preferred theme color
      },
    };
  
    const rzp1 = new window.Razorpay(options);
  
    rzp1.on("payment.failed", (response) => {
      console.error("Payment failed:", response.error);
      alert("Payment failed. Please try again.");
    });
  
    rzp1.open();
  };
  

  return (
    <Wrapper>
      <div className="container">
        <h2 className="common-heading">Booking Summary</h2>
        {latestBooking ? (
          <div className="summary-card">
            {Object.entries({
              Name: latestBooking.fullname,
              Age: latestBooking.age,
              Sex: latestBooking.sex,
              Location: latestBooking.location,
              Contact: latestBooking.contact,
              Date: new Date(latestBooking.date).toLocaleDateString(),
              "Time Slot": latestBooking.timeSlot,
              Service: latestBooking.service,
              Amount: `${price} Rs.`,
            }).map(([key, value]) => (
              <p className="flex-between" key={key}>
                <span>{key}:</span> <span>{value}</span>
              </p>
            ))}
          </div>
        ) : (
          <p>No booking data available</p>
        )}
        <button className="btn" onClick={handlePayment} disabled={!price}>
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

  .btn:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  .btn:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.helper};
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
    font-size: 1.6rem;
  }

  .flex-between span:first-child {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.heading};
  }

  .flex-between span:last-child {
    color: #4e4e4e;
    text-align: right;
  }
`;

export default Payment;
