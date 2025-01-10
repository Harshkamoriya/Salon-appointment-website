import React, { createContext, useEffect } from "react";
import { useContext } from "react";
import { Reducer } from "./Reducer";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const API = "http://localhost:5000/services";

const initialState = {
  name: " ",
  image: " ",
  services: [],
  userEmail: "",
  userpassWord: "",
  bookData: JSON.parse(localStorage.getItem("bookData")) || [],
  order: "",
  fullname: "",
  age: "",
  sex: "",
  contact: "",
  location: "",
  date: "",
  timeSlot: "",
  // intitializing states for reports data

  dailyRevenue: [],
  weeklyRevenue: [],
  monthlyRevenue: [],

  dailyAppointments: [],
  weeklyAppointments: [],
  monthlyAppointments: [],

  dailyNewCustomers: [],
  weeklyNewCustomers: [],
  monthlyNewCustomers: [],

  profileInfo: null, // Updated to hold user profile info

  selectedButton: "button1",
//   isAuthenticated: !!localStorage.getItem("authtoken"), // Initial authentication state
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
//   const navigate = useNavigate();
  const updateHomePage = () => {
    return dispatch({
      type: "HOME_UPDATE",
      payload: {
        name: "Harsh Kamoriya",
        image:
          "https://img.freepik.com/free-vector/beauty-salon-concept-illustration_114360-6552.jpg",
      },
    });
  };

//   const checkAuth = () => {
//     const token = localStorage.getItem("authtoken");
//     const isAuthenticated = !!token;
//     console.log(isAuthenticated);
//     dispatch({ type: "SET_AUTHENTICATION", payload: isAuthenticated });
//     return isAuthenticated;
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       checkAuth();
//     };

//     // Listen for changes to localStorage (useful for multi-tab logout)
//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

  const fetchOrder = async () => {
    console.log("fetch order called");
    const url = "http://localhost:5000/appointment/create-razorpay-order";
    const token = localStorage.getItem("authtoken"); // Assuming authentication is required

    try {
      const lastBooking = state.bookData[state.bookData.length - 1];
      if (!lastBooking) {
        console.error("No booking data found");
        return;
      }
      const selectedService = state.services.find(
        (service) => service.name === lastBooking.service // Match by name or another unique identifier
      );

      if (!selectedService) {
        console.error("Selected service not found in services array");
        return;
      }

      const amount = selectedService.price;
      if (amount <= 0) {
        console.error("Invalid amount for Razorpay order:", amount);
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount, // Assuming price is in the last booking
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      console.log("Order fetched:", data);

      dispatch({
        type: "SET_ORDER",
        payload: data, // Assuming `data` contains the order object
      });
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const fetchCurrentUser = async () => {
    const url = "http://localhost:5000/auth/users/me";
    const token = localStorage.getItem("authtoken"); // Assuming JWT is stored in localStorage
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      const data = await response.json();

      // Handle token expiration
      if (response.status === 401 && data.message === "Token has expired") {
        console.log("Token expired, logging out...");
        localStorage.removeItem("authtoken");
        dispatch({ type: "LOGOUT" }); // Optional: Dispatch logout action
        navigate("/login"); // Redirect to login page
        return; // Exit the function after logging out
      }
      if (!response.ok) {
        throw new Error("Failed to fetch current user info");
      }

      console.log("Data fetched:", data);
      dispatch({
        type: "SET_PROFILE_INFO",
        payload: data.user, // Assuming the backend sends user data in `user`
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const updateAboutPage = () => {
    return dispatch({
      type: "About_UPDATE",
      payload: {
        name: "Harsh Kamoriya",
        image:
          "https://st2.depositphotos.com/30291372/46142/v/450/depositphotos_461424770-stock-illustration-flat-vector-illustration-for-about.jpg",
      },
    });
  };

  const getServices = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json(); // Await the JSON response
      dispatch({ type: "GET_SERVICES", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const setUserdata = (userEmail, userPassword) => {
    dispatch({
      type: "SET_DATA",
      payload: { userEmail, userPassword },
    });
  };
  const setbookingData = (
    fullname,
    age,
    sex,
    contact,
    location,
    date,
    timeSlot,
    service
  ) => {
    console.log("Setting booking data...");
    const newBooking = {
      fullname,
      age,
      sex,
      contact,
      location,
      date,
      timeSlot,
      service,
    };
    const updatedBookData = [...state.bookData, newBooking];

    // Save to state
    dispatch({
      type: "SET_BOOK_DATA",
      payload: updatedBookData,
    });

    // Persist to localStorage
    localStorage.setItem("bookData", JSON.stringify(updatedBookData));
    console.log("Booking data saved:", updatedBookData);
  };

  const setSelectedButton = (button) => {
    dispatch({
      type: "SET_SELECTED_BUTTON",
      payload: button,
    });
  };

  const setreportData = (
    dailyRevenue,
    weeklyRevenue,
    monthlyRevenue,

    dailyAppointments,
    weeklyAppointments,
    monthlyAppointments,

    dailyNewCustomers,
    weeklyNewCustomers,
    monthlyNewCustomers
  ) => {
    console.log("entered into the setReportdata");
    dispatch({
      type: "SET_REPORT_DATA",
      payload: {
        dailyRevenue,
        weeklyRevenue,
        monthlyRevenue,

        dailyAppointments,
        weeklyAppointments,
        monthlyAppointments,

        dailyNewCustomers,
        weeklyNewCustomers,
        monthlyNewCustomers,
        checkAuth,
      },
    });
  };

  //   const checkTokenExpiration = () => {
  //     const token = localStorage.getItem("authtoken");
  //     console.log(token)
  //     if (!token) return false;

  //     try {
  //         const decodedToken = jwtDecode(token);
  //         console.log(decodedToken)
  //         const currentTime = Date.now() / 1000; // Current time in seconds
  //         if (decodedToken.exp < currentTime) {
  //             // Token has expired
  //             console.log("token has expired",decodedToken.exp )

  //             localStorage.removeItem("authtoken");
  //             dispatch({ type: "LOGOUT" }); // Dispatch a logout action
  //             navigate("/login"); // Redirect to login page
  //             return true;
  //         }
  //     } catch (error) {
  //         console.log("try function not executing ")
  //         console.error("Error decoding token:", error);
  //         // localStorage.removeItem("authtoken");
  //         // dispatch({ type: "LOGOUT" });

  //         return true;
  //     }

  //     return false;
  // };
  // // useEffect(()=>{
  //     if(checkTokenExpiration()){
  //         navigate("/login");
  //     }
  // },[])

  useEffect(() => {
    fetchCurrentUser();
    getServices(API);
    // fetchOrder();
    // checkTokenExpiration();
  }, []); // Watches for changes in state.services

  useEffect(() => {
    if (state.services.length > 0 && state.bookData.length > 0) {
      console.log("Calling fetchOrder after data is ready");
      fetchOrder();
    }
  }, [state.services, state.bookData]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        fetchCurrentUser,
        updateHomePage,
        updateAboutPage,
        setUserdata,
        setbookingData,
        setreportData,
        setSelectedButton,
        fetchOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//global custom hooks

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
