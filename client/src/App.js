
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'

import Login from "./componets/login";
import Signup from "./componets/signup";
import Nav from "./componets/nav"
import Footer from "./componets/footer"
import Hero from "./componets/hero"
import Dashboard from "./componets/dashboard"
import Project from "./componets/project"
import { useDispatch } from 'react-redux';
import { AUTH } from './redux/const/actionsTypes';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user_info"))

    if (localUser) {
      dispatch({ type: AUTH, data: localUser })
    }
  }, [])
  return (
    <div className="font-['Poppins'] relative bg-black">
      <Nav />
      <Routes>
        {/* <Route path="/" element = {<Hero/>}/> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
