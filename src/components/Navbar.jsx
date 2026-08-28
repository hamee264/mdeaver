import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">

      {/* =================================================
          TOP INFORMATION BAR
      ================================================= */}
      <div className="top-bar">
        <div className="top-bar-container">

          <div className="top-left">

            <span className="top-item">
              <i className="fa-regular fa-envelope"></i>
              Contact Mdeaver Charity Foundation
            </span>

            <span className="top-item">
              <i className="fa-regular fa-clock"></i>
              Serving Communities Since 2020
            </span>

          </div>

          <div className="top-right">

            <span className="top-message">
              Empowering Lives. Restoring Hope.
            </span>

            <div className="social-links">

              <a href="#" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a href="#" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>

              <a href="#" aria-label="Twitter">
                <i className="fa-brands fa-twitter"></i>
              </a>

              <a href="#" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>

            </div>

          </div>

        </div>
      </div>


      {/* =================================================
          MAIN NAVIGATION
      ================================================= */}
      <nav className="main-navbar">

        <div className="navbar-container">

          {/* LOGO */}
          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
          >
            <img
              src="/src/assets/image.png"
              alt="Mdeaver Charity Foundation Ltd."
            />
          </Link>


          {/* DESKTOP NAVIGATION */}
          <div className="desktop-nav">

            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/about" onClick={closeMenu}>
              About
            </Link>

            <Link to="/causes" onClick={closeMenu}>
              Who We Support
            </Link>

            <Link to="/impact" onClick={closeMenu}>
              Our Impact
            </Link>

            <Link to="/support" onClick={closeMenu}>
              Get Support
            </Link>

            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>

          </div>


          {/* DONATE BUTTON */}
          <Link
            to="/donate"
            className="donate-btn desktop-donate"
          >
            DONATE
          </Link>


          {/* MOBILE MENU BUTTON */}
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>


        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}
        <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/causes" onClick={closeMenu}>
            Who We Support
          </Link>

          <Link to="/impact" onClick={closeMenu}>
            Our Impact
          </Link>

          <Link to="/support" onClick={closeMenu}>
            Get Support
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          <Link
            to="/donate"
            className="donate-btn mobile-donate"
            onClick={closeMenu}
          >
            DONATE
          </Link>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;