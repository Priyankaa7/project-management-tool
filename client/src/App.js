
import React from 'react';
import {Routes, Route} from 'react-router-dom'

import Login from "./componets/login";
import Signup from "./componets/signup";
import Nav from "./componets/nav"
import Footer from "./componets/footer"
import Hero from "./componets/hero"

function App() {
  return (
    <div className="font-['Poppins'] relative">
      <Nav/>
      <Routes>
        <Route path="/account/login" element={<Login/>}/>
        <Route path="/account/signup" element={<Signup/>}/>
        <Route path="/" element = {<Hero/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
