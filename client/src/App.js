
import React from 'react';
import {Routes, Route} from 'react-router-dom'

import Login from "./componets/login";
import Signup from "./componets/signup";
import Nav from "./componets/nav"
import Footer from "./componets/footer"

function App() {
  return (
    <div className="font-['Poppins'] relative">
      <Nav/>
      <Routes>
        <Route path="/account/login" element={<Login/>}/>
        <Route path="/account/signup" element={<Signup/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
