import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Verkoop from "./pages/Verkoop";
import Restauratie from "./pages/Restauratie";
import Contact from "./pages/Contact";
import "./assets/styles/main.css";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { useState } from "react";
import TestPage from "./pages/TestPage"; // Import the TestPage component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true" // Initialize from localStorage
  );

  const handleSetAuthenticated = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem("isAuthenticated", value); // Save to localStorage
  };
  
  return (
    <Router>
      <div className="page-container">
      <Header />
      <main className="content-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verkoop" element={<Verkoop />} />
        <Route path="/restauratie" element={<Restauratie />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login setIsAuthenticated={handleSetAuthenticated} />} />
        <Route path="/admin" element={ isAuthenticated ? <Admin /> : <Navigate to="/login" replace />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
