import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Support from "./pages/Support";
import Impact from "./pages/Impact";
import Stories from "./pages/Stories";
import Donate from "./pages/Donate";
import RequestAssistance from "./pages/RequestAssistance";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/support" element={<Support />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/donate" element={<Donate />} />
        <Route
          path="/request-assistance"
          element={<RequestAssistance />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;