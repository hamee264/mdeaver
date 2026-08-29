import { useState } from "react";
import { Link } from "react-router-dom";
import { useDonation } from "../../context/DonationContext";
import "./Donate.css";

import donateBackground from "../../assets/sq-03.jpg";
import donatePanelBackground from "../../assets/sq-02.jpg";

function Donate() {
  const { openDonateModal } = useDonation();

  const presetAmounts = [250, 500, 1000, 2500, 5000];

  const [selectedPreset, setSelectedPreset] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");

  const [aid, setAid] = useState("");
  const [payment, setPayment] = useState("");
  const [recurring, setRecurring] = useState(false);

  const [openAccordion, setOpenAccordion] = useState(null);

  /*
   * Direct donation calculation:
   * Uses custom input if provided, otherwise the selected preset amount.
   */
  const directAmount = customAmount ? Number(customAmount) : selectedPreset;

  const handlePresetSelect = (amount) => {
    setSelectedPreset(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
  };

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
              DIRECT AMOUNT PRESETS
          ------------------------------------------------ */}

          <div className="donate-people">

            <label>
              Select Direct Donation Amount
            </label>

            <div className="people-list">

              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={
                    selectedPreset === amt && !customAmount
                      ? "selected"
                      : ""
                  }
                  onClick={() => handlePresetSelect(amt)}
                >
                  ${amt.toLocaleString()}
                </button>
              ))}

            </div>

          </div>

          {/* -----------------------------------------------
              CUSTOM DIRECT AMOUNT INPUT
          ------------------------------------------------ */}

          <div className="donate-people" style={{ marginTop: "22px" }}>

            <label htmlFor="directCustomAmount">
              Or Enter Custom Amount ($)
            </label>

            <div className="select-wrapper">
              <input
                id="directCustomAmount"
                type="number"
                min="5"
                placeholder="Enter custom amount (e.g. 150)"
                value={customAmount}
                onChange={handleCustomChange}
                style={{
                  width: "100%",
                  height: "54px",
                  padding: "0 20px",
                  border: "1px solid #eeeeee",
                  borderRadius: "0",
                  outline: "none",
                  fontSize: "15px",
                  color: "#333333"
                }}
              />
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
              BOTTOM RESULT
          ------------------------------------------------ */}

          <div className="donate-result">

            <div className="donate-earth-icon">
              <i className="fa-solid fa-earth-americas"></i>
            </div>

            <div className="recommended-amount">
              <span className="amount">
                ${(directAmount || 0).toLocaleString()}
              </span>

              <span className="recommended-text">
                DIRECT DONATION
              </span>
            </div>

            <button
              type="button"
              className="donate-now-action-btn"
              onClick={() => openDonateModal(directAmount)}
            >
              DONATE NOW
              <i className="fa-solid fa-arrow-right"></i>
            </button>

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
              className={`donate-accordion-item ${openAccordion === 0 ? "open" : ""
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
              className={`donate-accordion-item ${openAccordion === 1 ? "open" : ""
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
              className={`donate-accordion-item ${openAccordion === 2 ? "open" : ""
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

          <Link
            to="/about"
            className="donate-more-button"
          >
            MORE INFO
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Donate;