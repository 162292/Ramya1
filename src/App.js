// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// import React from "react";
// import Head1 from "./head1";
// import Component5 from "./sam5";
// import Event from "./event";
// import Ternary from "./condition";
// import Productlist from "./list";
// import Component2 from "./twocomponents";
// import Color from "./Hooks/color";
// import Form from "./Hooks/form";
// import Navbar from "./navbar";
// import FetchExample from "./Hooks/fetch";
// import CRUDApp from "./Hooks/crud";
// import Boot from "./bootstrap/button";
// import Navigation from "./bootstrap/nav";
// import Grid from "./bootstrap/grid";
// import Login from "./ecommerce.js/login";


// import { BrowserRouter, Route, Routes } from "react-router-dom";

// function App() {
//   return(
//   <BrowserRouter>
//   <Login/>
//   {/* <Navbar/>  */}
//     {/* <Routes>
//       <Route path = "/" element = {<Head1/>} />
//       <Route path = "/Component2" element = {<Component2/>} />
//       <Route path = "/Component5" element = {<Component5/>} />
//       <Route path = "/Ternary" element = {<Ternary/>} />
//       <Route path = "/Event" element = {<Event/>} />
//       <Route path = "/Productlist" element = {<Productlist/>} />
//       <Route path = "/Color" element = {<Color/>} />
//       <Route path = "/Form" element = {<Form/>} />
//       <Route path = "/Fetch" element = {<FetchExample/>} />
//       <Route path = "/crud" element = {<CRUDApp/>} />
//       <Route path = "/button" element = {<Boot/>} />
//       <Route path = "/nav" element = {<Navigation/>} />
//       <Route path = "/grid" element = {<Grid/>} />


//     </Routes> */}
//   </BrowserRouter>
//   );
// } 
// export default App;
// src/App.js
import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./ecommerce.js/Navbar";
import Login from "./ecommerce.js/login";
import Register from "./ecommerce.js/Register";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Product from "./ecommerce.js/products";
import ForgotPassword from "./ecommerce.js/Forgotpassword";
import VerifyAccount from "./ecommerce.js/verify account";
import ResetPassword from "./ecommerce.js/Resetpassword";
import CreateAccount from "./ecommerce.js/createaccount";
import RequestOtp from "./ecommerce.js/RequestOtp";
import Cart from "./ecommerce.js/cart";
import Checkout from "./ecommerce.js/checkout";
import UserProfile from "./ecommerce.js/userprofile";
import OrderHistory from "./ecommerce.js/order history";
import ReactivateVerification from "./ecommerce.js/Reactivate verification";
import ReactivateAccount from "./ecommerce.js/Reactvate Account";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
      JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );

  useEffect(() => {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);


  return (
    <Router>
      
      {/* Navbar is placed at the top */}
      <NavbarComponent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      
      {/* Main Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Product />} /> {/* Home Page */}
          <Route path="/product" element={<Product />} /> {/* Product Page */}
          <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/otp-login" element={<RequestOtp />} />
          <Route path="/cart" element={<Cart setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<UserProfile setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/order-history" element={<OrderHistory setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/reactivate-verification" element={<ReactivateVerification />} />
          <Route path="/activate-account" element={<ReactivateAccount />} />




        </Routes>
      </div>
    </Router>
  );
};

export default App;
