import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import axios from "axios";
import SettinngMenu from "../components/SettinngMenu.jsx";

const Settingpage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    profilePhoto: null,
  });

  const { selectedButton } = useGlobalContext();
  const [activeSection, setActiveSection] = useState("editProfile");

  // Mock data for demonstration purposes
  const bookingHistory = [
    { id: 1, date: "2024-12-20", service: "Haircut", status: "Completed" },
    { id: 2, date: "2024-12-22", service: "Facial", status: "Pending" },
  ];

  const paymentHistory = [
    { id: 1, date: "2024-12-20", amount: "$50", status: "Paid" },
    { id: 2, date: "2024-12-22", amount: "$30", status: "Pending" },
  ];

  // handle change function for handling the password input for passwrod change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function to handle the input for profile edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePhoto: e.target.files[0] });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    // Debugging: Check the profile data before submitting
    console.log("Profile data before submitting:", profileData);

    // Prepare form data
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);

    // Only append profilePhoto if it's not null or undefined
    if (profileData.profilePhoto) {
      formData.append("profilePhoto", profileData.profilePhoto);
    }

    formData.append("adminId", "your-admin-id"); // Replace with dynamic admin ID

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      console.log("formData is:", formData);
      const token = localStorage.getItem("authtoken");
      const response = await axios.put(
        "https://salonease-oy0f.onrender.com/auth/user-update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      // console.log("in the password try ");

      const token = localStorage.getItem("authtoken"); // Get the token from localStorage
      console.log("token in the try is", token);
      const response = await axios.put(
        "https://salonease-oy0f.onrender.com/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      alert(response.data.message);
      if (response.status === 200) {
        // Reset the form fields on successful password update
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error changing password: from frontend", error.message);
      alert("Failed to change password. Please try again.");
    }
  };

  const renderContent = () => {
    switch (selectedButton) {
      case "button1":
        return (
          <Wrapper>
            <div>
              <h2>Edit Profile</h2>
              <form onSubmit={handleProfileUpdate}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </label>
                <label>
                  Profile Photo:
                  <input type="file" onChange={handleFileChange} />
                </label>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </Wrapper>
        );
      case "button2":
        return (
          <Wrapper>
            <div>
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordUpdate}>
                <label>
                  Current Password:
                  <input
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    value={formData.currentPassword}
                    placeholder="Enter current password"
                    required
                  />
                </label>
                <label>
                  New Password:
                  <input
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    value={formData.newPassword}
                    placeholder="Enter new password"
                    required
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    placeholder="Confirm new password"
                    required
                  />
                </label>
                <button type="submit">Update Password</button>
              </form>
            </div>
          </Wrapper>
        );
      case "button3":
        return (
          <Wrapper>
            <div>
              <h2>Notification Preferences</h2>
              <form>
                <label>
                  Email Notifications:
                  <input type="checkbox" defaultChecked />
                </label>
                <label>
                  SMS Notifications:
                  <input type="checkbox" />
                </label>
                <button type="submit">Save Preferences</button>
              </form>
            </div>
          </Wrapper>
        );
      case "button4":
        return (
          <Wrapper>
            <div>
              <h2>Booking History</h2>
              <ul>
                {bookingHistory.map((booking) => (
                  <li key={booking.id}>
                    {booking.date} - {booking.service} - {booking.status}
                  </li>
                ))}
              </ul>
            </div>
          </Wrapper>
        );
      case "button5":
        return (
          <Wrapper>
            <div>
              <h2>Payment History</h2>
              <ul>
                {paymentHistory.map((payment) => (
                  <li key={payment.id}>
                    {payment.date} - {payment.amount} - {payment.status}
                  </li>
                ))}
              </ul>
            </div>
          </Wrapper>
        );
      default:
        return <div>Select an option to view details</div>;
    }
  };

  return (
    <Wrapper>
      {" "}
      <div className="settings-page">
        <div className="admin-box">
          <SettinngMenu />
          {/* <h2>Good Morning, Admin</h2>
        <p>Welcome Harsh Kamoriya,</p>
        <p>Here's your settings overview.</p>
        <ul>
          <li onClick={() => setActiveSection("editProfile")}>Edit Profile</li>
          <li onClick={() => setActiveSection("changePassword")}>
            Change Password
          </li>
          <li onClick={() => setActiveSection("notifications")}>
            Notification Preferences
          </li>
          <li onClick={() => setActiveSection("bookingHistory")}>
            Booking History
          </li>
          <li onClick={() => setActiveSection("paymentHistory")}>
            Payment History
          </li>
        </ul> */}
        </div>
        <div className="content-box">{renderContent()}</div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .settings-page {
    display: flex;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  /* .admin-box {
    background: linear-gradient(135deg, #ff7eb3, #ff758c);
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 250px;
    margin-right: 20px;
  } */

  @media (max-width: 746px){
    .settings-page{
      display: flex;
      flex-direction: column;
    }
  }

  .admin-box h2 {
    margin-bottom: 10px;
  }

  .admin-box ul {
    list-style: none;
    padding: 0;
  }

  .admin-box li {
    margin: 10px 0;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .admin-box li:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .content-box {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    flex-grow: 1;
  }

  .content-box h2 {
    margin-bottom: 20px;
  }
  .content-box{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    form{
      padding: 16px 24px;
      border-radius: 10PX;
      /* border-color: linear-gradient(135deg, #ff7eb3, #ff758c); */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-direction: column;
      input{
        margin-top: 1rem;
      }
      
    }
  }

  .content-box form label {
    margin-bottom: 1rem;
    display: block;
    margin-bottom: 10px;
    
  }

  .content-box form input {
    display: block;
    margin-bottom: 20px;
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .content-box form button {
    padding: 10px 20px;
    background-color: #ff758c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .content-box form button:hover {
    background-color: #ff5674;
  }
`;

export default Settingpage;
