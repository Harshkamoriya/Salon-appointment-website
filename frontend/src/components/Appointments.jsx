import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../GlobalStyle";
import SearchBox from "./SearchBox";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://salonease-oy0f.onrender.com/appointment/details"
        );
        const data = await response.json();
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
        appointment.date.includes(lowerCaseSearchTerm) ||
        appointment.contact.includes(lowerCaseSearchTerm)
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  const handleAction = async (id, action) => {
    if (action === "Cancel") {
      try {
        const response = await fetch(
          "https://salonease-oy0f.onrender.com/appointment/delete",
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
      try {
        const response = await fetch(
          "https://salonease-oy0f.onrender.com/appointment/update-status",
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
        try {
          const response = await fetch(
            "https://salonease-oy0f.onrender.com/appointment/reschedule",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id, date, timeSlot }),
            }
          );
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
        <div className="search-section">
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        <div className="appointments-table">
          <div className="appointments-header">
            <div className="header-cell">Customer</div>
            <div className="header-cell">Time</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Service</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Phone</div>
            <div className="header-cell">Actions</div>
          </div>
          
          <div className="appointments-body">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="card-header">
                  <h3 className="customer-name">{appointment.name}</h3>
                  <span className={`status-badge ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="info-group">
                    <div className="info-label">Time:</div>
                    <div className="info-value">{appointment.timeSlot}</div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Date:</div>
                    <div className="info-value">{appointment.date}</div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Service:</div>
                    <div className="info-value">{appointment.service}</div>
                  </div>
                  <div className="info-group">
                    <div className="info-label">Phone:</div>
                    <div className="info-value">{appointment.contact}</div>
                  </div>
                </div>
                
                <div className="card-actions">
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
                    Complete
                  </button>
                  <button
                    className="action-button reschedule"
                    onClick={() => handleAction(appointment._id, "Reschedule")}
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7ff 0%, #f1f1fe 100%);
  min-height: 100vh;

  .appointments-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .appointments-title {
    font-size: 2.8rem;
    color: #2d3436;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .search-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .appointments-table {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .appointments-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    padding: 1.5rem;
    gap: 1rem;
  }

  .header-cell {
    color: white;
    font-weight: 600;
    font-size: 1.4rem;
    text-align: center;
  }

  .appointments-body {
    padding: 1.5rem;
    display: grid;
    gap: 1.5rem;
  }

  .appointment-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .customer-name {
    font-size: 1.6rem;
    font-weight: 600;
    color: #2d3436;
  }

  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  .status-badge.completed {
    background-color: #dcfce7;
    color: #166534;
  }

  .status-badge.pending {
    background-color: #fef9c3;
    color: #854d0e;
  }

  .status-badge.confirmed {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .card-body {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-group {
    display: flex;
    gap: 1rem;
  }

  .info-label {
    font-weight: 600;
    color: #4b5563;
    min-width: 80px;
  }

  .info-value {
    color: #1f2937;
  }

  .card-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .action-button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-button.cancel {
    background-color: #fee2e2;
    color: #991b1b;

    &:hover {
      background-color: #fecaca;
    }
  }

  .action-button.complete {
    background-color: #dcfce7;
    color: #166534;

    &:hover {
      background-color: #bbf7d0;
    }
  }

  .action-button.reschedule {
    background-color: #dbeafe;
    color: #1e40af;

    &:hover {
      background-color: #bfdbfe;
    }
  }

  @media (max-width: 1024px) {
    padding: 1.5rem;

    .appointments-header {
      display: none;
    }

    .appointment-card {
      padding: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .appointments-title {
      font-size: 2.4rem;
    }

    .card-actions {
      justify-content: center;
    }

    .action-button {
      flex: 1;
      text-align: center;
      padding: 0.7rem 1rem;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    .appointments-title {
      font-size: 2rem;
    }

    .appointment-card {
      padding: 1rem;
    }

    .customer-name {
      font-size: 1.4rem;
    }

    .info-group {
      flex-direction: column;
      gap: 0.5rem;
    }

    .card-actions {
      flex-direction: column;
    }

    .action-button {
      width: 100%;
    }
  }
`;

export default Appointments;