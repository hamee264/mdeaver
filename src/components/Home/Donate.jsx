import { useState } from "react";
import "./Donate.css";

import donateBackground from "../../assets/sq-03.jpg";
import donatePanelBackground from "../../assets/sq-02.jpg";

function Donate() {
  const [days, setDays] = useState(100);
  const [hours, setHours] = useState(3);
  const [people, setPeople] = useState(1);

  const [aid, setAid] = useState("");
  const [payment, setPayment] = useState("");
  const [recurring, setRecurring] = useState(false);

  const [openAccordion, setOpenAccordion] = useState(null);

  /*
   * Simple donation calculation.
   * You can replace this later with your actual pricing logic.
   */
  const recommendedAmount = Math.round(
    250 + days * 1.5 + hours * 20 + people * 45
  );

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section
      className="donate-section"
      id="donate"
      style={{
        "--donate-background": `url(${donateBackground})`,
        "--donate-panel-background": `url(${donatePanelBackground})`,
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="donate-bg"></div>

      {/* =====================================================
          DONATE TITLE
      ===================================================== */}

      <div className="donate-heading">
        <h2>DONATE</h2>
      </div>

      {/* =====================================================
          DONATION PANEL
      ===================================================== */}

      <div className="donate-panel">

        {/* ===================================================
            LEFT / FORM SIDE
        =================================================== */}

        <div className="donate-form">

          {/* -----------------------------------------------
              TOP SLIDERS
          ------------------------------------------------ */}

          <div className="donate-top-fields">

            {/* DAYS */}
            <div className="donate-slider-field">
              <label htmlFor="days">
                Days you want to support
              </label>

              <div className="donate-slider">
                <input
                  id="days"
                  type="range"
                  min="1"
                  max="200"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                />

                <span
                  className="slider-number"
                  style={{
                    left: `${((days - 1) / 199) * 100}%`,
                  }}
                >
                  {days}
                </span>
              </div>
            </div>

            {/* HOURS */}
            <div className="donate-slider-field">
              <label htmlFor="hours">
                Working hours of the volunteer
              </label>

              <div className="donate-slider">
                <input
                  id="hours"
                  type="range"
                  min="1"
                  max="10"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />

                <span
                  className="slider-number"
                  style={{
                    left: `${((hours - 1) / 9) * 100}%`,
                  }}
                >
                  {hours}
                </span>
              </div>
            </div>

          </div>

          {/* -----------------------------------------------
              SELECT / RECURRING ROW
          ------------------------------------------------ */}

          <div className="donate-options-row">

            {/* HUMANITARIAN AID */}
            <div className="donate-input-group">
              <label htmlFor="aid">
                Humanitarian Aid
              </label>

              <div className="select-wrapper">
                <select
                  id="aid"
                  value={aid}
                  onChange={(e) => setAid(e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value="medical">Medical Aid</option>
                  <option value="education">Education</option>
                  <option value="food">Food Support</option>
                  <option value="environment">
                    Environmental Support
                  </option>
                </select>

                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="donate-input-group">
              <label htmlFor="payment">
                Type of payment
              </label>

              <div className="select-wrapper">
                <select
                  id="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value="card">Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>

                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* RECURRING */}
            <div className="donate-input-group">
              <label>Recurring payment</label>

              <div className="recurring-payment">
                <button
                  type="button"
                  className={!recurring ? "active" : ""}
                  onClick={() => setRecurring(false)}
                >
                  Not
                </button>

                <button
                  type="button"
                  className={recurring ? "active" : ""}
                  onClick={() => setRecurring(true)}
                >
                  Yes
                </button>
              </div>
            </div>

          </div>

          {/* -----------------------------------------------
              PEOPLE
          ------------------------------------------------ */}

          <div className="donate-people">

            <label>
              Number of people you want to help
            </label>

            <div className="people-list">

              <button
                type="button"
                className={people === 1 ? "selected" : ""}
                onClick={() => setPeople(1)}
              >
                1 Person
              </button>

              <button
                type="button"
                className={people === 2 ? "selected" : ""}
                onClick={() => setPeople(2)}
              >
                2 People
              </button>

              <button
                type="button"
                className={people === 3 ? "selected" : ""}
                onClick={() => setPeople(3)}
              >
                3 People (Family)
              </button>

              <button
                type="button"
                className={people === 4 ? "selected" : ""}
                onClick={() => setPeople(4)}
              >
                4 People (Family)
              </button>

            </div>

          </div>

          {/* -----------------------------------------------
              BOTTOM RESULT
          ------------------------------------------------ */}

          <div className="donate-result">

            <div className="donate-earth-icon">
              <i className="fa-solid fa-earth-americas"></i>
            </div>

            <div className="recommended-amount">
              <span className="amount">
                ₦ {recommendedAmount.toLocaleString()}
              </span>

              <span className="recommended-text">
                RECOMMENDED
              </span>
            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT / INFORMATION SIDE
        ================================================= */}

        <div className="donate-information">

          <h3>
            Calculation of the donation
          </h3>

          <p>
            Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae.
            Phasel rhoncus, purus et consectetur volutpat,
            turpis eros sodales orci, vel vulputate.
          </p>

          {/* -----------------------------------------------
              ACCORDION
          ------------------------------------------------ */}

          <div className="donate-accordion">

            {/* ITEM 1 */}
            <div
              className={`donate-accordion-item ${
                openAccordion === 0 ? "open" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(0)}
              >
                <span className="accordion-plus">
                  +
                </span>

                <span>
                  Donation Info
                </span>
              </button>

              {openAccordion === 0 && (
                <div className="accordion-content">
                  <p>
                    Your donation helps provide essential
                    resources and support to communities
                    that need them most.
                  </p>
                </div>
              )}
            </div>

            {/* ITEM 2 */}
            <div
              className={`donate-accordion-item ${
                openAccordion === 1 ? "open" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(1)}
              >
                <span className="accordion-plus">
                  +
                </span>

                <span>
                  Possibility of help
                </span>
              </button>

              {openAccordion === 1 && (
                <div className="accordion-content">
                  <p>
                    Your contribution can support medical
                    care, environmental projects, education
                    and humanitarian assistance.
                  </p>
                </div>
              )}
            </div>

            {/* ITEM 3 */}
            <div
              className={`donate-accordion-item ${
                openAccordion === 2 ? "open" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(2)}
              >
                <span className="accordion-plus orange">
                  +
                </span>

                <span>
                  How we work
                </span>
              </button>

              {openAccordion === 2 && (
                <div className="accordion-content">
                  <p>
                    We direct donations toward practical
                    projects designed to create measurable
                    environmental and humanitarian impact.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* -----------------------------------------------
              MORE INFO
          ------------------------------------------------ */}

          <button
            type="button"
            className="donate-more-button"
          >
            MORE INFO
          </button>

        </div>

      </div>
    </section>
  );
}

export default Donate;