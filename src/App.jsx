import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function AppContent() {
  useVisitTracker();

  return (
    <BrowserRouter>
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
