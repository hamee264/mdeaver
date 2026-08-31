import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDonation } from "../../context/DonationContext";
import "./HelpSection.css";

function HelpSection() {
  const { openDonateModal } = useDonation();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("1000");
  const [customAmount, setCustomAmount] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [donor, setDonor] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const presetAmounts = ["250", "500", "1000", "2500", "5000"];

  const handlePreset = (value) => {
    setAmount(value);
    setCustomAmount(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setCustomAmount(true);
  };

  const handleDonorChange = (e) => {
    const { name, value } = e.target;

    setDonor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     DONATE NOW
  ========================================================= */

  const handleDonate = (e) => {
    e.preventDefault();

    const finalAmount = Number(amount);

    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (!donor.firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!donor.lastName.trim()) {
      alert("Please enter your last name.");
      return;
    }

    if (!donor.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    /*
      PAYMENT SIMULATION

      Replace this section later with:
      Paystack
      Flutterwave
      Stripe
      etc.
    */

    setShowSuccess(true);
  };

  /* =========================================================
     DOWNLOAD RECEIPT
  ========================================================= */

  const downloadReceipt = () => {
    const receiptNumber = "MDCF-" + Date.now().toString().slice(-8);

    const receiptDate = new Date().toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const receiptContent = `
MDEAVER CHARITY FOUNDATION LTD.
==============================================

                 DONATION RECEIPT

==============================================

Receipt Number:
${receiptNumber}

Date:
${receiptDate}


DONOR INFORMATION
----------------------------------------------

Name:
${donor.firstName} ${donor.lastName}

Email:
${donor.email}


DONATION INFORMATION
----------------------------------------------

Donation Type:
General Donation

Amount:
₦${Number(amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}

Payment Status:
PAYMENT SUCCESSFUL


==============================================

Thank you for supporting
Mdeaver Charity Foundation Ltd.

Your generosity helps us provide meaningful
support to individuals and families facing
difficult circumstances.

==============================================

Mdeaver Charity Foundation Ltd.
Compassion in action.
    `.trim();

    const blob = new Blob([receiptContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${receiptNumber}-donation-receipt.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     CONTINUE TO FULL DONATE PAGE
  ========================================================= */

  const continueToDonate = () => {
    navigate("/donate", {
      state: {
        amount: Number(amount),
      },
    });
  };

  return (
    <>
      <section className="help-section">
        <div className="help-overlay"></div>

        <div className="help-container">
          {/* =================================================
              MAIN TITLE
          ================================================= */}

          <h2 className="help-title" data-aos="fade-up">HELP</h2>

          {/* =================================================
              DONATION BOX
          ================================================= */}

          <form className="help-box" onSubmit={handleDonate} data-aos="fade-up" data-aos-delay="100">
            <div className="help-box-content">
              <span className="help-eyebrow">SUPPORT OUR MISSION</span>

              <h3>Be Part of the Difference</h3>

              <p className="help-description">
                Your support can help provide meaningful assistance to
                individuals and families facing difficult circumstances.
                <br />
                Together, we can restore hope and create opportunities for a
                better future.
              </p>

              {/* =================================================
                  AMOUNT INPUT
              ================================================= */}

              <div className="amount-input-wrapper">
                <div className="currency-symbol">$</div>
                <input
                  type="number"
                  inputMode="decimal"
                  min="1"
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
                    className={
                      amount === value && !customAmount
                        ? "amount-option active"
                        : "amount-option"
                    }
                    onClick={() => handlePreset(value)}
                  >
                    ₦{Number(value).toLocaleString()}
                  </button>
                ))}

                <button
                  type="button"
                  className={
                    customAmount
                      ? "amount-option custom active"
                      : "amount-option custom"
                  }
                  onClick={() => {
                    setCustomAmount(true);
                    setAmount("");
                  }}
                >
                  CUSTOM AMOUNT
                </button>
              </div>

              {/* =================================================
                  DONOR INFORMATION
              ================================================= */}

              <div className="help-donor-information">
                <div className="help-donor-title">DONOR INFORMATION</div>

                <div className="help-donor-name">
                  <div className="help-field">
                    <label htmlFor="helpFirstName">FIRST NAME</label>

                    <input
                      id="helpFirstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={donor.firstName}
                      onChange={handleDonorChange}
                    />
                  </div>

                  <div className="help-field">
                    <label htmlFor="helpLastName">LAST NAME</label>

                    <input
                      id="helpLastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={donor.lastName}
                      onChange={handleDonorChange}
                    />
                  </div>
                </div>

                <div className="help-field">
                  <label htmlFor="helpEmail">EMAIL ADDRESS</label>

                  <input
                    id="helpEmail"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={donor.email}
                    onChange={handleDonorChange}
                  />
                </div>
              </div>

              {/* =================================================
                  SELECTED AMOUNT
              ================================================= */}

              <div className="help-selected-donation">
                <span>YOUR DONATION</span>

                <strong>
                  ₦
                  {Number(amount || 0).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              {/* =================================================
                  DONATE
              ================================================= */}

              <button type="submit" className="donate-now-btn">
                DONATE NOW
                <span>→</span>
              </button>

              <p className="help-secure-note">
                Your generosity helps support our charitable mission and
                community-focused programs.
              </p>

              {/* =================================================
                  FULL DONATE PAGE
              ================================================= */}

              <button
                type="button"
                className="full-donation-link"
                onClick={continueToDonate}
              >
                VIEW FULL DONATION PAGE →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================
          PAYMENT SUCCESS OVERLAY
      ========================================================= */}

      {showSuccess && (
        <div
          className="help-success-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuccess(false);
            }
          }}
        >
          <div className="help-success-modal">
            {/* CLOSE */}

            <button
              type="button"
              className="help-success-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            >
              ×
            </button>

            {/* SUCCESS ICON */}

            <div className="help-success-icon">
              <span>✓</span>
            </div>

            {/* HEADER */}

            <div className="help-success-header">
              <span>PAYMENT COMPLETE</span>

              <h2>
                Thank you for
                <br />
                <em>your generosity.</em>
              </h2>

              <p>
                Your donation has been successfully recorded. Thank you for
                helping Mdeaver Charity Foundation Ltd. support people and
                communities in need.
              </p>
            </div>

            {/* RECEIPT */}

            <div className="help-receipt">
              <div className="help-receipt-top">
                <div>
                  <span>DONATION RECEIPT</span>
                  <strong>MDEAVER CHARITY</strong>
                </div>

                <div className="help-receipt-check">✓</div>
              </div>

              <div className="help-receipt-details">
                <div>
                  <span>DONOR</span>
                  <strong>
                    {donor.firstName} {donor.lastName}
                  </strong>
                </div>

                <div>
                  <span>EMAIL</span>
                  <strong>{donor.email}</strong>
                </div>

                <div>
                  <span>DATE</span>
                  <strong>
                    {new Date().toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>
                </div>

                <div>
                  <span>PAYMENT STATUS</span>
                  <strong className="help-receipt-success">Successful</strong>
                </div>
              </div>

              <div className="help-receipt-total">
                <span>TOTAL DONATION</span>

                <strong>
                  ₦
                  {Number(amount).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="help-success-actions">
              <button
                type="button"
                className="help-download-receipt"
                onClick={downloadReceipt}
              >
                DOWNLOAD RECEIPT
                <span>↓</span>
              </button>

              <button
                type="button"
                className="help-another-donation"
                onClick={() => {
                  setShowSuccess(false);

                  setAmount("25000");
                  setCustomAmount(false);

                  setDonor({
                    firstName: "",
                    lastName: "",
                    email: "",
                  });
                }}
              >
                MAKE ANOTHER DONATION
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HelpSection;
