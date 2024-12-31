import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../GlobalStyle";
import SearchBox from "./SearchBox";
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

    // Fetch data from API
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/appointment/details"
          );
          const data = await response.json();
        console.log(" i the fetch function")
       
  
          setAppointments(data);
          setFilteredAppointments(data);
        
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchAppointments();
    }, []);

    useEffect(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = appointments.filter(
        (appointment) =>
          appointment.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          appointment.service.toLowerCase().includes(lowerCaseSearchTerm) ||
          appointment.status.toLowerCase().includes(lowerCaseSearchTerm) ||
          appointment.date.includes(lowerCaseSearchTerm)||
          appointment.contact.includes(lowerCaseSearchTerm)
      );
      setFilteredAppointments(filtered);
    }, [searchTerm, appointments]);

  

   

  const handleAction = async (id, action) => {
    console.log("id passed into the function is" + id);
    if (action === "Cancel") {
      try {
        const response = await fetch(
          "http://localhost:5000/appointment/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert(result.message || "Appointment deleted successfully");
          setAppointments((prev) =>
            prev.filter((appointment) => appointment._id !== id)
          );
        } else {
          alert(result.error || "Failed to delete the appointment");
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("An error occurred while deleting the appointment");
      }
    } else if (action === "Complete") {
      console.log("id in complete function is :" + id);
      try {
        const response = await fetch(
          "http://localhost:5000/appointment/update-status",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, status: "completed" }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert(result.message || "Appointment marked as completed");
          setAppointments((prev) =>
            prev.map((appointment) =>
              appointment._id === id
                ? { ...appointment, status: "completed" }
                : appointment
            )
          );
        } else {
          alert(result.error || "Failed to update the appointment status");
        }
      } catch (error) {
        console.error("Error updating appointment status:", error);
        alert("An error occurred while updating the appointment status");
      }
    } else if (action === "Reschedule") {
      const date = prompt("Enter the new date (e.g., 2024-12-25):");
      const timeSlot = prompt("Enter the new time slot (e.g., 10:00 AM):");

      if (date && timeSlot) {
        console.log(id);
        try {
          const response = await fetch(
            "http://localhost:5000/appointment/reschedule",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id, date, timeSlot }),
            }
          );
          // console.log(response.json());
          const result = await response.json();

          if (response.ok) {
            alert(result.message || "Appointment rescheduled successfully");
            setAppointments((prev) =>
              prev.map((appointment) =>
                appointment._id === id
                  ? { ...appointment, date: date, timeSlot: timeSlot }
                  : appointment
              )
            );
          } else {
            alert(result.error || "Failed to reschedule the appointment");
          }
        } catch (error) {
          console.error("Error rescheduling appointment:", error.message);
          alert("An error occurred while rescheduling the appointment");
        }
      } else {
        alert("Date and time slot are required to reschedule an appointment.");
      }
    }
  };

  return (
    <Wrapper>
      <div className="appointments-container">
        <h2 className="appointments-title">Salon Appointments</h2>
        <div className="appointments-table">
          <div className="searchbar">
            <div className="up">
              {" "}
              <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>
            

          <div className="appointments-header">
            <h3>
              {" "}
              <span>Customer</span>
            </h3>
            <h3>
              {" "}
              <span>Time</span>
            </h3>
            <h3>
              {" "}
              <span>date</span>
            </h3>
            <h3>
              <span>Service</span>
            </h3>
            <h3>
              <span>Status</span>
            </h3>
            <h3>
              {" "}
              <span>Phone</span>
            </h3>
            <h3>
              {" "}
              <span>Actions</span>
            </h3>
          </div>
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="appointments-row">
              <span>
                <p>{appointment.name}</p>
              </span>
              <span>
                <p>{appointment.timeSlot}</p>
              </span>
              <span>
                <p>{appointment.date}</p>
              </span>
              <span>
                <p>{appointment.service}</p>
              </span>
              <span
                className={`status-badge ${
                  appointment.status === "completed"
                    ? "completed"
                    : appointment.status === "confirmed"
                    ? "confirmed"
                    : "pending"
                }`}
              >
                {appointment.status}
              </span>

              <p>
                <span className="contact">{appointment.contact}</span>
              </p>
              <span className="actions">
                <button
                  className="action-button cancel"
                  onClick={() => handleAction(appointment._id, "Cancel")}
                >
                  Cancel
                </button>
                <button
                  className="action-button complete"
                  onClick={() => handleAction(appointment._id, "Complete")}
                >
                  Mark as Completed
                </button>
                <button
                  className="action-button reschedule"
                  onClick={() => handleAction(appointment._id, "Reschedule")}
                >
                  Reschedule
                </button>
              </span>
            </div>
          ))}
        </div>
        </div>
      
      </Wrapper>
  );
};


const Wrapper = styled.section`



  .appointments-container {
    padding: 20px;
  }

  .searchbar{
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1rem;
    
    .up{
      display: flex;
      justify-content: space-between;
      padding: 5px 15px;
      background-color: #fbf9f9;
      border-radius: 8px;

    }
    .down{
      /* background-color: #003c04;
      padding: 5px 15px;
    
      border-radius: 8px; */
      
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
  }

  .filtered-appointment {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }


    }
  

  .appointments-title {
    text-align: center;
    color: #1d1919;
    margin-bottom: 20px;
  }
  .searchbar {
    background-color: #007bff;

  }

  .appointments-table {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .appointments-header,
  .appointments-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.25fr 1fr 1.25fr 3fr;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .appointments-header {
    font-weight: bold;
    background-color: #007bff;
    color: white;
  }

  .appointments-row:nth-child(even) {
    background-color: #f1f1f1;
  }

  .status-badge {
    padding: 5px 10px;
    border-radius: 12px;
    color: white;
    text-align: center;
  }

  .status-badge.completed {
    background-color: #28a745; /* Green for completed */
  }

  .status-badge.pending {
    background-color: #ffc107; /* Yellow for pending */
  }

  .status-badge.confirmed {
    background-color: #007bff; /* Blue for confirmed */
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .action-button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .action-button.cancel {
    background-color: #dc3545;
    color: white;
  }

  .action-button.complete {
    background-color: #28a745;
    color: white;
  }

  .action-button.reschedule {
    background-color: #17a2b8;
    color: white;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .appointments-header,
    .appointments-row {
      grid-template-columns: 1fr 1fr 1fr;
      font-size: 0.9rem;
    }

    .actions {
      flex-wrap: wrap;
      gap: 5px;
    }

    .action-button {
      padding: 5px;
      font-size: 1.11rem;
    }
  }

  @media (max-width: 480px) {
    .appointments-header,
    .appointments-row {
      grid-template-columns: 1fr;
      text-align: left;
    }

    .appointments-row span,
    .appointments-header span {
      margin-bottom: 5px;
    }

    .actions {
      justify-content: flex-start;
    }
  }
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  

  .filter-button {
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 5px;
    padding: 0.8rem 1.6rem;
    font-size: 1.6rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  .filter-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    z-index: 100;

    select,
    button {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 5px;
      font-size: 1.4rem;
    }

    .apply-button {
      background-color: ${({ theme }) => theme.colors.btn};
      color: ${({ theme }) => theme.colors.white};
      border: none;
      padding: 1rem;
      border-radius: 5px;
      font-size: 1.6rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    .filter-dropdown {
      width: 100%;
      right: auto;
    }

    .filter-button {
      width: 100%;
      margin-top: 1rem;
    }
  }


`

;

export default Appointments;
