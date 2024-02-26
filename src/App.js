import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";

// Das ist der Startpunkt, also das wird zuerst gerendert.
// hier befinden sich nur alle möglichen Routes, also die unten aufgeführten Routes, sind alle URLS meiner Seite zu finden
function App() {
  return (
    <Router>
      <Routes>
        {/* Beispiel für home: http://localhost:3000/home */}
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
