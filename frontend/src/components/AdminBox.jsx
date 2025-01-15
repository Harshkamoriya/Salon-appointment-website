import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { NavLink , useNavigate } from "react-router-dom";

const AdminBox = () => {
  
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleAppointments= ()=>{
    navigate("/admin/appointments")
  }
  const handleAnalytics= ()=>{
    navigate("/view-analytics");
  }


  return (
    <StyledAdminBox>
      <Avatar>
        <FaUserCircle size={80} />
      </Avatar>
      <div className="greeting-container">
      <h2>{getGreeting()}, Admin</h2>
      <h3>Welcome <span>Harsh Kamoriya</span>,<br />
      Here's your dashboard overview.</h3>
      </div>
     <div className="data"> <Info>
        <p>
          <strong>Date:</strong> {currentDate}
        </p>
        <p>
          <strong>Time:</strong> {currentTime}
        </p>
      </Info>
      <QuickActions>
        <button onClick={handleAppointments}>Manage Appointments</button>
        <button  onClick={handleAnalytics}>View Analytics</button>
      </QuickActions></div>
    </StyledAdminBox>
  );
};
const StyledAdminBox = styled.div`
  background: linear-gradient(135deg, #cb9c11, #fc25a2);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 300px; /* Adjust width for proper fit */
  margin: 1rem auto; /* Center horizontally */

  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */

  
  @media (max-width: 740px)
     {
       
         display: flex;
         flex-direction: row;
         gap: 0.5rem;
         max-width: fit-content;
         h2{
          display: none;

         }
         h3{
          font-size: 140%;
         }
         .greeting-container{
          text-align: left;
         }
    
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0; /* Adjust margin for spacing */
    
  @media (max-width: 740px)
     {
       
        font-size: 180%;
    
  }
  }

  p {
    font-size: 2rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    text-align: center; /* Ensure text is centered */
    span {
      font-weight: bold;
      color: #ffebf0;
    }
  }
`;

const Avatar = styled.div`
  margin-bottom: 1rem; /* Add space below avatar */
  color: #ffebf0;
`;

const Info = styled.div`
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: left;
  width: 100%; /* Ensure full width for alignment */

  p {
    margin: 0.3rem 0;
  }
`;


const QuickActions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  align-items: center; /* Center buttons horizontally */
  @media (max-width:740px){
   display: flex;
   flex-direction: row;
   gap: 0.5rem;

   
  

  }


  button {
    background: white;
    color: #6a11cb;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0; /* Add vertical spacing */
    border-radius: 8px;
    font-weight: bold;
    font-size:1.5rem;
    cursor: pointer;
    transition: background 0.3s ease;
    width: fit-content; /* Make buttons consistent in width */

    &:hover {
      background: #ffebf0;
    }
  }


  
`

;


export default AdminBox;
