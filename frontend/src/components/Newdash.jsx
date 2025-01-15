// DashboardOverview.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js
import Sidebar from "./Sidebar";
// import { useGlobalContext } from "../Context";
import AdminBox from "./AdminBox";
import {
  
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  
} from "recharts";

const Newdash = () => {
  // const {setreportData} =useGlobalContext();

  const [revenue, setRevenue] = useState(0);
  const [popularService, setPopularService] = useState("");

  const [revenueChart, setRevenueChart] = useState([]);
  const [dailyNewCustomers, setDailyNewCustomers] = useState([]);
  const [weeklyNewCustomers, setWeeklyNewCustomers] = useState([]);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyAppointments , setDailyAppointments] = useState([]);
  const [weeklyAppointments , setWeeklyAppointments] = useState([]);
  const [monthlyAppointments , setMonthlyAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/revenue"
        );
        const serviceRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/popular-service"
        );
        const appointmentRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/appointments-chart"
        );
        const customerRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/customers-chart"
        );
        const chartRes = await axios.get(
          "https://salonease-oy0f.onrender.com/dashboard/revenue-chart"
        );

        
        setDailyRevenue(chartRes.data.daily || []);
        setWeeklyRevenue(chartRes.data.weekly || []);
        setMonthlyRevenue(chartRes.data.monthly || []);

        setDailyAppointments(appointmentRes.data.daily || []);
        setWeeklyAppointments(appointmentRes.data.weekly || []);
        setMonthlyAppointments(appointmentRes.data.monthly || []);

        setDailyNewCustomers(customerRes.data.daily || []);
        setWeeklyNewCustomers(customerRes.data.weekly || []);
        setMonthlyNewCustomers(customerRes.data.monthly || []);

        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  // setreportData( 
  //    dailyRevenue,
  //   weeklyRevenue,
  //   monthlyRevenue,

  //   dailyAppointments,
  //   weeklyAppointments ,
  //   monthlyAppointments,

  //   dailyNewCustomers,
  //   weeklyNewCustomers,
  //   monthlyNewCustomers,);

  // Sample Chart Data
  console.log(weeklyRevenue);
  console.log(monthlyNewCustomers);
  console.log(weeklyNewCustomers);
  // const revenueChartData = {
  //   labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   datasets: [
  //     {
  //       label: "Revenue",
  //       data: revenueChart.length ? revenueChart : [65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: "rgba(75,192,192,0.6)",
  //       borderColor: "rgba(75,192,192,1)",
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  const dailyRevenueChartData = {
    labels: dailyRevenue.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}` // Format: day-month-year
    ),
    datasets: [
      {
        label: "Daily Revenue",
        data: dailyRevenue.map((entry) => entry.total), // Extract 'total' values
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const weeklyRevenueChartData = {
    labels: weeklyRevenue.map(
      (entry) => `Week ${entry._id.week}, ${entry._id.year}`
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
  
  const weeklyRevenueData = weeklyRevenue.map((item) => ({
    week: `Week ${item._id.week}, ${item._id.year}`, // Combine week and year for X-axis
    total: item.total, // Total revenue for Y-axis
  }));
 console.log( weeklyRevenue);
  // console.log(weeklyRevenueData)

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
  const dailyCustomersChartData = {
    labels : dailyNewCustomers.map(
      (entry)=>`${entry._id.day}-${entry._id.month}-${entry._id.year} `
    ),
    datasets :[
      {
        label: "daily new customers",
        data : dailyNewCustomers.map((entry)=>entry.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };
  const dailyAppointmentsChartData = {
    labels : dailyAppointments.map(
      (entry)=>`${entry._id.day}-${entry._id.month}-${entry._id.year} `
    ),
    datasets :[
      {
        label: "daily appointments",
        data : dailyAppointments.map((entry)=>entry.total),
        backgroundColor: "rgba(54, 235, 151, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

 


  const servicesData = {
    labels: ["Manicure", "Pedicure", "Facial", "Massage"],
    datasets: [
      {
        data: [40, 25, 15, 20], // Example values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  

  return (
    <Wrapper>
     <div className="dashboard-container">
 <AdminBox/>

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

    {/* Daily Appointments */}
    <div className="box">
      <h3>Daily Appointments</h3>
      {dailyAppointments.length > 0 ? (
        <Bar data={dailyAppointmentsChartData} options={{ responsive: true }} />
      ) : (
        <p>Loading daily appointments data...</p>
      )}
    </div>

    {/* Daily Customers */}
    <div className="box">
      <h3>Daily Customers</h3>
      {dailyNewCustomers.length > 0 ? (
        <Bar data={dailyCustomersChartData} options={{ responsive: true }} />
      ) : (
        <p>Loading customers data...</p>
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
  );
};

const Wrapper = styled.div`
width: 100vw;

.dashboard-container {
  width: 100vw;
  display: flex;
  /* flex-wrap: wrap; */
  gap: 1rem;
  padding: 1rem;
}

/* .admin-box {
  flex: 1;
  max-width: 300px;
  background: linear-gradient(to bottom, #ff7eb3, #ff758c);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
} */

.dashboard-grid {
  
  /* background-color: red; */
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
  .dashboard-container{
      display: flex;
      flex-direction: column;
    }

  .weekly-revenue {
    grid-column: span 1;
  }

  .admin-box {
    margin-bottom: 1rem;
  }
}

`;

export default Newdash;
