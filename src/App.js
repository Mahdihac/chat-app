import React from "react";
import "./App.css";
import SignIn from "./signin/signin";
import SignUp from "./signup/signup";
import ForgotPass from './signin/forgotpassword' ;   
import ChatApp from "./chatapp/chatapp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyBEaEn3qFIUULeSAiX2rkwweTDmvHrltuw",
//   authDomain: "chatapp-290600.firebaseapp.com",
//   projectId: "chatapp-290600",
//   storageBucket: "chatapp-290600.appspot.com",
//   messagingSenderId: "707148346170",
//   appId: "1:707148346170:web:1aeb766908a75ec1735603",
//   measurementId: "G-XQ1FRD1G83",
  
// };
// initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path='/forgotpassword' element={<ForgotPass/>} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/chatapp" element={<ChatApp />} />
      </Routes>
    </Router>
  );
}

export default App;
