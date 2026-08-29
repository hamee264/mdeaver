import React, { useState, useEffect } from "react";
import { useDonation } from "../context/DonationContext";
import { sendDonationNotification } from "../services/api";
import "./DonationModal.css";

const PRESET_TIERS = [250, 500, 1000, 2500, 5000];

function DonationModal() {
  const { isModalOpen, donationAmount, closeDonateModal } = useDonation();

  const [selectedAmt, setSelectedAmt] = useState(1000);
  const [customInput, setCustomInput] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (donationAmount) {
      setSelectedAmt(donationAmount);
      setCustomInput("");
    }
  }, [donationAmount, isModalOpen]);

  if (!isModalOpen) return null;

  const currentAmount = customInput ? Number(customInput) || 0 : selectedAmt;

  const handlePresetClick = (amt) => {
    setSelectedAmt(amt);
    setCustomInput("");
  };

  const handleCustomChange = (e) => {
    setCustomInput(e.target.value);
  };

  const handlePayWithPayPal = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setErrorMsg("Please fill in your First Name, Last Name, and Email address.");
      return;
    }
    if (!currentAmount || currentAmount <= 0) {
      setErrorMsg("Please select or enter a valid donation amount.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    // Simulate PayPal Checkout transaction & dispatch email notifications
    setTimeout(async () => {
      const invoiceNumber = `MDF-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const timestamp = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const receiptPayload = {
        invoiceNumber,
        timestamp,
        donorName: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        amount: currentAmount,
        paymentMethod: "PayPal",
      };

      setReceipt(receiptPayload);
      setIsProcessing(false);

      // Dispatch backend email notification
      await sendDonationNotification(receiptPayload);
    }, 1200);
  };

  const handleModalClose = () => {
    setReceipt(null);
    setIsProcessing(false);
    setErrorMsg("");
    closeDonateModal();
  };

  return (
    <div className="modal-backdrop" onClick={handleModalClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={handleModalClose}
          aria-label="Close Modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {receipt ? (
          /* =====================================================
             RECEIPT / INVOICE CONFIRMATION VIEW
          ===================================================== */
          <div className="receipt-container">
            <div className="receipt-status-header">
              <div className="receipt-success-icon">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3>Thank You for Your Gift!</h3>
              <p>Your donation payment has been successfully confirmed.</p>
            </div>

            <div className="receipt-card">
              <div className="receipt-header-row">
                <span className="receipt-number">
                  Invoice #{receipt.invoiceNumber}
                </span>
                <span className="receipt-date">{receipt.timestamp}</span>
              </div>

              <div className="receipt-details-list">
                <div className="receipt-detail-item">
                  <span>Donor Name:</span>
                  <span>{receipt.donorName}</span>
                </div>
                <div className="receipt-detail-item">
                  <span>Email Address:</span>
                  <span>{receipt.email}</span>
                </div>
                <div className="receipt-detail-item">
                  <span>Payment Gateway:</span>
                  <span>{receipt.paymentMethod}</span>
                </div>
                <div className="receipt-detail-item">
                  <span>Status:</span>
                  <span style={{ color: "#23933a" }}>Confirmed / Completed</span>
                </div>
              </div>

              <div className="receipt-total-row">
                <span>Total Amount Paid:</span>
                <span>${receipt.amount.toLocaleString()}.00</span>
              </div>
            </div>

            <button className="receipt-ok-btn" onClick={handleModalClose}>
              OK / BACK TO HOME
            </button>
          </div>
        ) : (
          /* =====================================================
             DONATION FORM & PAYMENT MODAL
          ===================================================== */
          <div>
            <div className="modal-header-banner">
              <h2>Select Direct Donation Amount</h2>
              <div className="modal-amount-display">
                ${(currentAmount || 0).toLocaleString()}
              </div>
              <p className="modal-amount-subtitle">
                Mdeaver Charity Foundation Ltd.
              </p>
            </div>

            <div className="modal-body">
              {/* Presets & Custom Input */}
              <div className="modal-section-title">Select or Enter Amount</div>

              <div className="modal-preset-grid">
                {PRESET_TIERS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`modal-preset-btn ${
                      selectedAmt === amt && !customInput ? "active" : ""
                    }`}
                    onClick={() => handlePresetClick(amt)}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="modal-custom-input-group">
                <span>$</span>
                <input
                  type="number"
                  min="5"
                  placeholder="Or enter custom amount"
                  value={customInput}
                  onChange={handleCustomChange}
                />
              </div>

              {/* Personal Information */}
              <div className="modal-section-title">Personal Information</div>

              {errorMsg && (
                <div
                  style={{
                    color: "#e74c3c",
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "15px",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handlePayWithPayPal}>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label htmlFor="modalFirstName">First Name *</label>
                    <input
                      id="modalFirstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="modalLastName">Last Name *</label>
                    <input
                      id="modalLastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-field">
                  <label htmlFor="modalEmail">Email Address *</label>
                  <input
                    id="modalEmail"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* PayPal Payment Option */}
                <div className="modal-section-title" style={{ marginTop: "20px" }}>
                  Payment Method
                </div>

                <div className="paypal-payment-box">
                  <div className="paypal-badge">
                    <i className="fa-brands fa-paypal"></i>
                    PayPal Checkout
                  </div>

                  <button
                    type="submit"
                    className="paypal-pay-btn"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <i className="fa-brands fa-paypal"></i>
                        PAY NOW WITH PAYPAL (${(currentAmount || 0).toLocaleString()})
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationModal;
