import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../Context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { services, bookData, order } = useGlobalContext();
  const [price, setPrice] = useState(null);

  const fetchPrice = (serviceName) => {
    const service = services.find((service) => service.name === serviceName);
    return service ? service.price : null;
  };

  const latestBooking = bookData?.length > 0 ? bookData[bookData.length - 1] : null;

  useEffect(() => {
    if (latestBooking && services.length > 0) {
      const fetchedPrice = fetchPrice(latestBooking.service);
      setPrice(fetchedPrice);
    }
  }, [services, latestBooking]);

  const handlePayment = async () => {
    if (!order || !price) {
      alert("Order details or price are missing!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Salon Service",
      description: "Appointment Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const res = await axios.post("https://salonease-oy0f.onrender.com/appointment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (res.data.message === "Payment verified successfully") {
            alert("Payment successful!");
            navigate("/confirmation");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        } catch (error) {
          alert("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: latestBooking?.fullname || "Customer Name",
        email: latestBooking?.email || "customer@example.com",
        contact: latestBooking?.contact || "1234567890",
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", (response) => {
      alert("Payment failed. Please try again.");
    });

    rzp1.open();
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (confirmCancel) {
      navigate("/home");
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <h2 className="common-heading">Booking Summary</h2>
        </div>
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
              Amount: `₹${price}`,
            }).map(([key, value]) => (
              <div className="detail-row" key={key}>
                <span className="detail-label">{key}</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No booking data available</p>
        )}
        <div className="button-group">
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel Appointment
          </button>
          <button className="btn btn-pay" onClick={handlePayment} disabled={!price}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #f1f1fe 100%);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background-color: ${({ theme }) => theme.colors.bg};
    padding: 0;
    border-radius: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 50rem;
    width: 100%;
    margin: 2rem auto;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .header {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    padding: 2.5rem 2rem;
    text-align: center;
  }

  .common-heading {
    font-size: 3.2rem;
    color: white;
    margin: 0;
    font-weight: 700;
  }

  .summary-card {
    background-color: ${({ theme }) => theme.colors.white};
    padding: 2.5rem;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .detail-row:last-child {
    border-bottom: none;
  }

  .detail-label {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    font-size: 1.6rem;
  }

  .detail-value {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
  }

  .button-group {
    display: flex;
    gap: 1.5rem;
    padding: 2.5rem;
  }

  .btn {
    color: white;
    padding: 1.5rem 3rem;
    font-size: 1.8rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    flex: 1;
    transition: all 0.3s ease-in-out;
    font-weight: 600;
  }

  .btn-pay {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  }

  .btn-cancel {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  .btn:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .no-data {
    text-align: center;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .container {
      margin: 1rem auto;
    }

    .common-heading {
      font-size: 2.8rem;
    }

    .summary-card {
      padding: 2rem;
    }

    .detail-label,
    .detail-value {
      font-size: 1.4rem;
    }

    .button-group {
      padding: 2rem;
      flex-direction: column;
    }

    .btn {
      padding: 1.2rem 2.5rem;
      font-size: 1.6rem;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .common-heading {
      font-size: 2.4rem;
    }

    .summary-card {
      padding: 1.5rem;
    }

    .detail-label,
    .detail-value {
      font-size: 1.3rem;
    }

    .button-group {
      padding: 1.5rem;
    }

    .btn {
      padding: 1rem 2rem;
      font-size: 1.5rem;
    }
  }
`;

export default Payment;