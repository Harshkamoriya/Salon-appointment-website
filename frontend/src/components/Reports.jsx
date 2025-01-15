import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js
import Sidebar from "./Sidebar";
import AdminBox from "./AdminBox";
import Menubox from "./Menubox";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { useGlobalContext } from "../Context";

function Reports() {
  const { selectedButton} = useGlobalContext();
  const [dailyNewCustomers, setDailyNewCustomers] = useState([]);
  const [weeklyNewCustomers, setWeeklyNewCustomers] = useState([]);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/revenue-chart"
        );
        const appointmentRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/appointments-chart"
        );
        const customerRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/customers-chart"
        );

        setDailyRevenue(revenueRes.data.daily || []);
        setWeeklyRevenue(revenueRes.data.weekly || []);
        setMonthlyRevenue(revenueRes.data.monthly || []);

        setDailyAppointments(appointmentRes.data.daily || []);
        setWeeklyAppointments(appointmentRes.data.weekly || []);
        setMonthlyAppointments(appointmentRes.data.monthly || []);

        setDailyNewCustomers(customerRes.data.daily || []);
        setWeeklyNewCustomers(customerRes.data.weekly || []);
        setMonthlyNewCustomers(customerRes.data.monthly || []);
      } catch (error) {
        console.error("Error fetching data :", error.message);
      }
    };
    fetchData();
  }, []);

  console.log("selectedbutton is :" + selectedButton)

  const servicesData = {
    labels: ["Manicure", "Pedicure", "Facial", "Massage"],
    datasets: [
      {
        data: [40, 25, 15, 20], // Example values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const dailyRevenueChartData = {
    labels: dailyRevenue.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Daily Revenue",
        data: dailyRevenue.map((entry) => entry.total),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const weeklyRevenueChartData = {
    labels: weeklyRevenue.map(
      (entry) => `week ${entry._id.week}, ${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly Revenue",
        data: weeklyRevenue.map((entry) => entry.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const monthlyRevenueChartData = {
    labels: monthlyRevenue.map(
      (entry) => `Month ${entry._id.month}, ${entry._id.year}`
    ),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenue.map((entry) => entry.total),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dailyAppointmentsChartData = {
    labels: dailyAppointments.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Daily Appointments",
        data: dailyAppointments.map((entry) => entry.total),
        backgroundColor: "rgba(54, 235, 151, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const weeklyAppointmentsChartData = {
    labels: weeklyAppointments.map(
      (entry) => `Week ${entry._id.week}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly Appointments",
        data: weeklyAppointments.map((entry) => entry.total),
        backgroundColor: "rgba(54, 235, 151, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const monthlyAppointmentsChartData = {
    labels: monthlyAppointments.map(
      (entry) => `Month ${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Monthly Appointments",
        data: monthlyAppointments.map((entry) => entry.total),
        backgroundColor: "rgba(54, 235, 151, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dailyCustomersChartData = {
    labels: dailyNewCustomers.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Daily New Customers",
        data: dailyNewCustomers.map((entry) => entry.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const weeklyCustomersChartData = {
    labels: weeklyNewCustomers.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly New Customers",
        data: weeklyNewCustomers.map((entry) => entry.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const monthlyCustomersChartData = {
    labels: monthlyNewCustomers.map(
      (entry) => `Month ${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly New Customers",
        data: monthlyNewCustomers.map((entry) => entry.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

 switch (selectedButton) {
  case "button1":
    return (
      <Wrapper>
        <div className="dashboard-container">
          <Menubox/>
          <div className="dashboard-grid">
            {/* Daily Revenue */}
            <div className="box">
              <h3>Daily Revenue</h3>
              {dailyRevenue.length > 0 ? (
                <Bar data={dailyRevenueChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
            <div className="box">
              <h3>weekly Revenue</h3>
              {weeklyRevenue.length > 0 ? (
                <Bar data={weeklyRevenueChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
            <div className="box">
              <h3>monthly Revenue</h3>
              {monthlyRevenue.length > 0 ? (
                <Bar data={monthlyRevenueChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
  
          
  
            {/* Weekly Revenue */}
            <div className="box weekly-revenue">
              <h3>Weekly Revenue</h3>
              {weeklyRevenue.length > 0 ? (
                <Line data={weeklyRevenueChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading weekly revenue data...</p>
              )}
            </div>
  
            {/* Service Popularity */}
            <div className="box">
              <h3>Service Popularity</h3>
              <Pie data={servicesData} />
            </div>
          </div>
        </div>
      </Wrapper>
    )
    case "button2" :
      return (
        <Wrapper>
          <div className="dashboard-container">
            <Menubox/>
            <div className="dashboard-grid">
              {/* Daily Revenue */}
              <div className="box">
                <h3>Daily Appointments </h3>
                {dailyAppointments.length > 0 ? (
                  <Bar data={dailyAppointmentsChartData} options={{ responsive: true }} />
                ) : (
                  <p>Loading chart data...</p>
                )}
              </div>
              <div className="box">
                <h3>weekly Appointments</h3>
                {weeklyAppointments.length > 0 ? (
                  <Bar data={weeklyAppointmentsChartData} options={{ responsive: true }} />
                ) : (
                  <p>Loading chart data...</p>
                )}
              </div>
              <div className="box">
                <h3>monthly Appointments</h3>
                {monthlyAppointments.length > 0 ? (
                  <Bar data={monthlyAppointmentsChartData} options={{ responsive: true }} />
                ) : (
                  <p>Loading chart data...</p>
                )}
              </div>
    

    
              {/* Weekly Revenue */}
              <div className="box weekly-revenue">
                <h3>Weekly Appointments</h3>
                {weeklyAppointments.length > 0 ? (
                  <Line data={weeklyAppointmentsChartData} options={{ responsive: true }} />
                ) : (
                  <p>Loading weekly revenue data...</p>
                )}
              </div>
    
              {/* Service Popularity */}
              <div className="box">
                <h3>Service Popularity</h3>
                <Pie data={servicesData} />
              </div>
            </div>
          </div>
        </Wrapper>
      )


case "button3":
    return (
      <Wrapper>
        <div className="dashboard-container">
          <Menubox/>
          <div className="dashboard-grid">
            {/* Daily Revenue */}
            <div className="box">
              <h3>Daily New Customers </h3>
              {dailyNewCustomers.length > 0 ? (
                <Bar data={dailyCustomersChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
            <div className="box">
              <h3>weekly New Customers</h3>
              {weeklyNewCustomers.length > 0 ? (
                <Bar data={weeklyCustomersChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
            <div className="box">
              <h3>monthly New Customers</h3>
              {monthlyNewCustomers.length > 0 ? (
                <Bar data={monthlyCustomersChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading chart data...</p>
              )}
            </div>
  
          
  
            {/* Weekly Revenue */}
            <div className="box weekly-revenue">
              <h3>Weekly Customers</h3>
              {weeklyAppointments.length > 0 ? (
                <Line data={weeklyCustomersChartData} options={{ responsive: true }} />
              ) : (
                <p>Loading weekly revenue data...</p>
              )}
            </div>
  
            {/* Service Popularity */}
            <div className="box">
              <h3>Service Popularity</h3>
              <Pie data={servicesData} />
            </div>
          </div>
        </div>
      </Wrapper>
    )
  };
};






const Wrapper = styled.div`
  width: 100vw;

  .dashboard-container {
    width: 100vw;
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }
  @media (max-width: 740px)
     {
       
          .dashboard-container{
            display: flex;
           flex-direction: column;
          }
    
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 1rem;
    flex: 1;
    max-width: 100%;
  }

  .box {
    background: white;
    max-width: 99%;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .weekly-revenue {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .weekly-revenue {
      grid-column: span 1;
    }
  }
`

export default Reports
