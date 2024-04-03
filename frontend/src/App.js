import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import UserAuthentication from "./components/Authentication/UserAuthentication";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserAuthentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 