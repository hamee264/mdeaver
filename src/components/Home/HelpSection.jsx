import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDonation } from "../../context/DonationContext";
import "./HelpSection.css";

function HelpSection() {
  const { openDonateModal } = useDonation();
  const [amount, setAmount] = useState("1000.00");

  const presetAmounts = ["250", "500", "1000", "2500", "5000"];

  const handlePreset = (value) => {
    setAmount(`${value}.00`);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <section className="help-section">

      <div className="help-overlay"></div>

      <div className="help-container">

        {/* =================================================
            MAIN TITLE
        ================================================= */}

        <h2 className="help-title">
          HELP
        </h2>


        {/* =================================================
            DONATION BOX
        ================================================= */}

        <div className="help-box">

          <div className="help-box-content">

            <span className="help-eyebrow">
              SUPPORT OUR MISSION
            </span>

            <h3>
              Be Part of the Difference
            </h3>

            <p className="help-description">
              Your support can help provide meaningful assistance
              to individuals and families facing difficult
              circumstances.
              <br />
              Together, we can restore hope and create opportunities
              for a better future.
            </p>


            {/* =================================================
                AMOUNT INPUT
            ================================================= */}

            <div className="amount-input-wrapper">

              <div className="currency-symbol">
                $
              </div>

              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                aria-label="Donation amount"
              />

            </div>


            {/* =================================================
                PRESET AMOUNTS
            ================================================= */}

            <div className="amount-options">

              {presetAmounts.map((value) => (

                <button
                  key={value}
                  type="button"
                  onClick={() => handlePreset(value)}
                >
                  ${Number(value).toLocaleString()}
                </button>

              ))}

              <button
                type="button"
                className="custom-amount"
                onClick={() => setAmount("")}
              >
                CUSTOM AMOUNT
              </button>

            </div>


            {/* =================================================
                DONATE BUTTON
            ================================================= */}

            <button
              type="button"
              className="donate-now-btn"
              onClick={() => openDonateModal(amount)}
            >
              DONATE NOW
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HelpSection;