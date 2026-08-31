import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { DonationProvider } from "./context/DonationContext";
import DonationModal from "./components/DonationModal";
import { useVisitTracker } from "./hooks/useVisitTracker";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Impact from "./pages/Impact";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

function ScrollAndAOSRefresh() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

function AppContent() {
  useVisitTracker();

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollAndAOSRefresh />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <DonationModal />
    </BrowserRouter>
  );
}

function App() {
  return (
    <DonationProvider>
      <AppContent />
    </DonationProvider>
  );
}

export default App;

