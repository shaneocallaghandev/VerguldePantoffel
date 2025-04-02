import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Verkoop from "./pages/Verkoop";
import Restauratie from "./pages/Restauratie";
import Contact from "./pages/Contact";
import "./assets/styles/main.css";
import Detail from "./pages/Detail";

const App = () => {
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
      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
