import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import Mercado from "./views/Mercado/Mercado.jsx";  
import Academy from "./views/Academy/Academy.jsx"; 


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mercado" element={<Mercado />} />
      <Route path="/academy" element={<Academy />} />
    </Routes>
  );
}
