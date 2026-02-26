import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import Mercado from "./views/Mercado/Mercado.jsx";  
import Academy from "./views/Academy/Academy.jsx"; 
import Resources from "./views/Resources/Resources.jsx";  


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/mercado" element={<Mercado />} />
      <Route path="/academy" element={<Academy />} />
    </Routes>
  );
}
