import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from './Pages/Login'
import LoanCalculator from "./Pages/LoanCalculator";
import LoanApplicationForm from "./Pages/LoanForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loan" element={<LoanApplicationForm/>}/>
        <Route path="/calculator" element={<LoanCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
