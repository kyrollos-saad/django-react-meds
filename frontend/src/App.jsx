import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Medications from "./components/Medications";
import ChartDashboard from "./components/ChartDashboard";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./context/GlobalContext";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const { user } = useGlobalContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Main Routes */}
        {user && (
          <>
            <Route
              path="/medications"
              element={
                <PrivateRoute>
                  <Medications />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <ChartDashboard />
                </PrivateRoute>
              }
            />
          </>
        )}

        {/* Show login if no user object */}
        {!user && <Route path="/" element={<Login />} />}
      </Routes>
    </Router>
  );
}

export default App;
