
import React from 'react';
import {Routes, Route} from 'react-router-dom'

import Login from "./componets/login";
import Signup from "./componets/signup";
import Nav from "./componets/nav"
import Footer from "./componets/footer"
import Hero from "./componets/hero"
import Dashboard from "./componets/dashboard"
import Project from "./componets/project"

function App() {
  return (
    <div className="font-['Poppins'] relative">
      <Nav/>
      <Routes>
        {/* <Route path="/" element = {<Hero/>}/> */}
        <Route path="/" element={<Dashboard />}/>
        <Route path="/project" element={<Project />}/>
        <Route path="/account/login" element={<Login/>}/>
        <Route path="/account/signup" element={<Signup/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
