import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDonation } from "../context/DonationContext";
import { jsPDF } from "jspdf";
import "./Donate.css";

const donationAmounts = [250, 500, 1000, 2500, 5000];

function Donate() {
  const { openDonateModal } = useDonation();
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [donor, setDonor] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [receipt, setReceipt] = useState(null);

  const selectedAmount = customAmount || amount;

  /* =========================================================
     AMOUNT
  ========================================================= */

  const handleAmountChange = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  /* =========================================================
     DONOR
  ========================================================= */

  const handleDonorChange = (e) => {
    const { name, value } = e.target;

    setDonor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     DONATE
  ========================================================= */

  const handleDonate = (e) => {
    e.preventDefault();

    const finalAmount = Number(selectedAmount);

    if (!finalAmount || finalAmount <= 0) {
      alert("Please select or enter a valid donation amount.");
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

    const receiptNumber =
      "MDCF-" + Math.floor(10000000 + Math.random() * 90000000);

    const date = new Date();

    const receiptData = {
      receiptNumber,
      date,
      firstName: donor.firstName.trim(),
      lastName: donor.lastName.trim(),
      email: donor.email.trim(),
      amount: finalAmount,
    };

    setReceipt(receiptData);
    setShowSuccess(true);
  };

  /* =========================================================
     CLOSE SUCCESS
  ========================================================= */

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  /* =========================================================
     DOWNLOAD PROFESSIONAL PDF RECEIPT
  ========================================================= */

  const downloadReceipt = () => {
    if (!receipt) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;

    /*
      BRAND COLORS
    */

    const green = [30, 122, 60];
    const darkGreen = [18, 55, 35];
    const lightGreen = [239, 248, 242];
    const text = [40, 40, 40];
    const muted = [105, 105, 105];
    const border = [220, 228, 222];

    /*
      PAGE BACKGROUND
    */

    doc.setFillColor(250, 252, 250);
    doc.rect(0, 0, 210, 297, "F");

    /*
      TOP GREEN HEADER
    */

    doc.setFillColor(...darkGreen);
    doc.rect(0, 0, pageWidth, 48, "F");

    /*
      LOGO MARK
    */

    doc.setFillColor(...green);
    doc.circle(22, 24, 9, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("M", 18.7, 28.5);

    /*
      FOUNDATION NAME
    */

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text("MDEAVER", 36, 21);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text("CHARITY FOUNDATION LTD.", 36, 28);

    /*
      RECEIPT LABEL
    */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text("DONATION RECEIPT", 172, 21, {
      align: "right",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(receipt.receiptNumber, 172, 28, {
      align: "right",
    });

    /*
      MAIN CONTENT
    */

    doc.setTextColor(...text);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(23);

    doc.text("Thank you for your generosity.", 20, 72);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.setTextColor(...muted);

    doc.text("Your contribution helps us provide meaningful support", 20, 81);

    doc.text(
      "to individuals and families facing difficult circumstances.",
      20,
      87,
    );

    /*
      STATUS BOX
    */

    doc.setFillColor(...lightGreen);
    doc.roundedRect(20, 101, 170, 28, 3, 3, "F");

    doc.setFillColor(...green);
    doc.circle(33, 115, 6, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text("✓", 30.7, 118);

    doc.setTextColor(...darkGreen);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text("PAYMENT STATUS", 45, 111);

    doc.setFontSize(12);

    doc.text("SUCCESSFUL", 45, 120);

    /*
      DONOR SECTION
    */

    doc.setTextColor(...green);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);

    doc.text("DONOR INFORMATION", 20, 148);

    doc.setDrawColor(...border);
    doc.line(20, 152, 190, 152);

    /*
      DONOR NAME
    */

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text("FULL NAME", 20, 164);

    doc.setTextColor(...text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text(`${receipt.firstName} ${receipt.lastName}`, 20, 171);

    /*
      EMAIL
    */

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text("EMAIL ADDRESS", 20, 187);

    doc.setTextColor(...text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text(receipt.email, 20, 194);

    /*
      DATE + DONATION
    */

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text("DATE", 20, 210);
    doc.text("DONATION TYPE", 110, 210);

    doc.setTextColor(...text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    const formattedDate = receipt.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    doc.text(formattedDate, 20, 217);
    doc.text("General Donation", 110, 217);

    /*
      TOTAL DONATION
    */

    doc.setFillColor(...darkGreen);
    doc.roundedRect(20, 233, 170, 32, 3, 3, "F");

    doc.setTextColor(190, 225, 201);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);

    doc.text("TOTAL DONATION", 30, 246);

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.text(`$${Number(receipt.amount).toFixed(2)}`, 180, 253, {
      align: "right",
    });

    /*
      FOOTER
    */

    doc.setTextColor(...green);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text("MDEAVER CHARITY FOUNDATION LTD.", pageWidth / 2, 279, {
      align: "center",
    });

    doc.setTextColor(...muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);

    doc.text("Compassion in action.", pageWidth / 2, 285, {
      align: "center",
    });

    /*
      SAVE
    */

    doc.save(`${receipt.receiptNumber}-donation-receipt.pdf`);
  };

  return (
    <main className="donate-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="donate-hero">
        <div className="donate-hero-overlay"></div>

        <div className="donate-hero-content">
          <span className="donate-eyebrow">SUPPORT OUR MISSION</span>

          <h1>
            Give hope.
            <br />
            <em>Change a life.</em>
          </h1>

          <p>
            Your generosity can provide meaningful support to individuals and
            families facing difficult circumstances.
          </p>
        </div>
      </section>

      {/* =================================================
          DONATION
      ================================================= */}

      <section className="donation-section">
        <div className="donation-container">
          {/* STORY */}

          <div className="donation-story">
            <div className="section-eyebrow">
              <span></span>
              MAKE A DIFFERENCE
            </div>

            <h2>
              Every contribution
              <br />
              <em>matters.</em>
            </h2>

            <p>
              Mdeaver Charity Foundation Ltd. believes that meaningful change
              begins with people willing to help others.
            </p>

            <p>
              Your donation helps us provide practical assistance to people
              experiencing financial hardship, homelessness, family
              difficulties, and other challenging circumstances.
            </p>

            <p>
              Whether you give a little or a lot, your support helps us reach
              more people and provide a helping hand when it matters most.
            </p>

            <div className="donation-impact-note">
              <span className="impact-note-number">2,000+</span>

              <div>
                <strong>PEOPLE SUPPORTED</strong>

                <p>Since our foundation was established in 2020.</p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form className="donation-card" onSubmit={handleDonate}>
            <div className="donation-card-header">
              <span>YOUR GIFT</span>

              <h3>Choose an amount</h3>

              <p>Select a contribution or enter your own amount.</p>
            </div>

            {/* AMOUNTS */}

            <div className="amount-grid">
              {donationAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    amount === value && !customAmount
                      ? "amount-btn active"
                      : "amount-btn"
                  }
                  onClick={() => handleAmountChange(value)}
                >
                  ${value}
                </button>
              ))}
            </div>

            {/* CUSTOM */}

            <div className="custom-amount">
              <label htmlFor="customAmount">CUSTOM AMOUNT</label>

              <div className="custom-input">
                <span>$</span>

                <input
                  id="customAmount"
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
            </div>

            {/* DONOR INFORMATION */}

            <div className="donor-information">
              <div className="donor-information-title">DONOR INFORMATION</div>

              <div className="donor-name-grid">
                <div className="donor-field">
                  <label htmlFor="firstName">FIRST NAME</label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={donor.firstName}
                    onChange={handleDonorChange}
                  />
                </div>

                <div className="donor-field">
                  <label htmlFor="lastName">LAST NAME</label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={donor.lastName}
                    onChange={handleDonorChange}
                  />
                </div>
              </div>

              <div className="donor-field">
                <label htmlFor="email">EMAIL ADDRESS</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={donor.email}
                  onChange={handleDonorChange}
                />
              </div>
            </div>

            {/* SELECTED */}

            <div className="selected-donation">
              <span>YOUR DONATION</span>

              <strong>${selectedAmount || "0"}</strong>
            </div>

            {/* SUBMIT */}

            <button
              type="button"
              className="donate-submit"
              onClick={() => openDonateModal(selectedAmount)}
            >
              DONATE NOW
              <span>→</span>
            </button>

            <p className="secure-note">
              Your generosity helps support our charitable mission and
              community-focused programs.
            </p>
          </form>
        </div>
      </section>

      {/* =================================================
          WHY GIVE
      ================================================= */}

      <section className="why-give-section">
        <div className="why-give-container">
          <div className="why-give-heading">
            <div className="section-eyebrow">
              <span></span>
              WHY YOUR SUPPORT MATTERS
            </div>

            <h2>
              Giving with
              <br />
              <em>purpose.</em>
            </h2>
          </div>

          <div className="giving-points">
            <article className="giving-point">
              <span className="giving-number">01</span>

              <div>
                <h3>Provide Practical Support</h3>

                <p>
                  Help us respond to people experiencing genuine financial and
                  personal hardship.
                </p>
              </div>
            </article>

            <article className="giving-point">
              <span className="giving-number">02</span>

              <div>
                <h3>Restore Hope</h3>

                <p>
                  A helping hand at the right time can give someone the
                  confidence to keep moving forward.
                </p>
              </div>
            </article>

            <article className="giving-point">
              <span className="giving-number">03</span>

              <div>
                <h3>Strengthen Communities</h3>

                <p>
                  Supporting individuals and families helps create stronger and
                  more resilient communities.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =================================================
          ALTERNATIVE SUPPORT
      ================================================= */}

      <section className="alternative-support">
        <div className="alternative-container">
          <div className="alternative-content">
            <div className="section-eyebrow light">
              <span></span>
              MORE WAYS TO HELP
            </div>

            <h2>
              You can be part of
              <br />
              <em>the difference.</em>
            </h2>

            <p>
              Donations are only one way to support our mission. You can also
              volunteer, partner with us, or help spread awareness of the work
              we do.
            </p>
          </div>

          <div className="alternative-actions">
            <Link to="/contact" className="alternative-link">
              PARTNER WITH US
              <span>→</span>
            </Link>

            <Link to="/contact" className="alternative-link">
              VOLUNTEER
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="donate-final">
        <div className="donate-final-content">
          <span>TOGETHER, WE CAN DO MORE</span>

          <h2>
            A better tomorrow
            <br />
            <em>starts with compassion.</em>
          </h2>

          <p>Thank you for helping us reach people who need a helping hand.</p>

          <Link
            to="/contact"
            className="donate-final-btn"
          >
            REQUEST ASSISTANCE
          </Link>
        </div>
      </section>

      {/* =================================================
          PAYMENT SUCCESS OVERLAY
      ================================================= */}

      {showSuccess && receipt && (
        <div
          className="payment-success-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeSuccess();
            }
          }}
        >
          <div className="payment-success-modal">
            {/* CLOSE */}

            <button
              type="button"
              className="success-close"
              onClick={closeSuccess}
              aria-label="Close"
            >
              ×
            </button>

            {/* SUCCESS TOP */}

            <div className="success-top">
              <div className="success-check">✓</div>

              <div>
                <span className="success-label">PAYMENT COMPLETE</span>

                <h2>Donation successful.</h2>

                <p>
                  Thank you, {receipt.firstName}. Your generosity makes a
                  difference.
                </p>
              </div>
            </div>

            {/* RECEIPT */}

            <div className="success-receipt">
              <div className="success-receipt-heading">
                <div>
                  <span>MDEAVER</span>

                  <strong>CHARITY FOUNDATION LTD.</strong>
                </div>

                <div className="receipt-status">
                  <span>✓</span>
                  SUCCESSFUL
                </div>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-information">
                <div className="receipt-info-item">
                  <span>RECEIPT NUMBER</span>

                  <strong>{receipt.receiptNumber}</strong>
                </div>

                <div className="receipt-info-item">
                  <span>DATE</span>

                  <strong>
                    {receipt.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>
                </div>

                <div className="receipt-info-item">
                  <span>DONOR</span>

                  <strong>
                    {receipt.firstName} {receipt.lastName}
                  </strong>
                </div>

                <div className="receipt-info-item">
                  <span>EMAIL</span>

                  <strong>{receipt.email}</strong>
                </div>
              </div>

              <div className="receipt-total-box">
                <span>TOTAL DONATION</span>

                <strong>${Number(receipt.amount).toFixed(2)}</strong>
              </div>

              <p className="receipt-thank-you">
                Your contribution helps Mdeaver Charity Foundation Ltd. provide
                meaningful support to individuals and families facing difficult
                circumstances.
              </p>
            </div>

            {/* ACTIONS */}

            <div className="payment-success-actions">
              <button
                type="button"
                className="download-receipt-button"
                onClick={downloadReceipt}
              >
                DOWNLOAD RECEIPT
                <span>↓</span>
              </button>

              <button
                type="button"
                className="make-another-button"
                onClick={closeSuccess}
              >
                MAKE ANOTHER DONATION
              </button>

              <button
                type="button"
                className="success-close-link"
                onClick={closeSuccess}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Donate;
