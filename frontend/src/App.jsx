import React from 'react';
import "./App.css";
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Conact';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Payment from './pages/payment';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import Error from './pages/Error';
import Gototop from './components/Gototop';
import Appointment from './pages/Appointment';
import Confirmation from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import Appointments from './components/Appointments';
import Reports from './components/Reports';
import Newdash from './components/Newdash';
import AdminBox from './components/AdminBox';
import Menubox from './components/Menubox';
import SettingPage from './pages/SettingPage';
import PrivateRoute from './components/PrivateRoute';
import ServicesUpdate from './pages/ServicesUpdate';
import Help from './pages/Help';

function App() {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 24)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98,84,143,0.5)",
      hr: "#000",
      gradient: "linear-gradient(0deg,rgb(132 144 255) 0%,rgb(98 189 252) 100%)",
      shadow: "rgba(0,0,0,0.02) 0px 1px 3px 0px , rgba(27,31,35,0.15) 0px 0px 0px 1px",
      shadowSupport: "rgba(0,0,0,0.16) opx 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />

          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/services" element={<PrivateRoute element={<Services />} />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
          {/* <Route path="/login" element={<PrivateRoute element={<Login />} />} /> */}

          {/* <Route path="/services" element={<Services />} /> */}
/          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/services-update" element={<ServicesUpdate />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/newdash" element={<Newdash />} />
          <Route path="/admin/settings" element={<SettingPage />} />
          <Route path="/adminbox" element={<AdminBox />} />
          <Route path="/menubox" element={<Menubox />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/help" element={<Help />} />

          <Route path="*" element={<Error />} />
        </Routes>
        <Gototop />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
