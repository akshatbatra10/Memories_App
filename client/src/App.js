import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Container maxWidth='lg'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Container>
  );
};

export default App;
