import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Donate.css";

const donationAmounts = [25, 50, 100, 250, 500];

function Donate() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");

  const selectedAmount = customAmount || amount;

  const handleAmountChange = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  return (
    <main className="donate-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="donate-hero">
        <div className="donate-hero-overlay"></div>

        <div className="donate-hero-content">
          <span className="donate-eyebrow">
            SUPPORT OUR MISSION
          </span>

          <h1>
            Give hope.
            <br />
            <em>Change a life.</em>
          </h1>

          <p>
            Your generosity can provide meaningful support to
            individuals and families facing difficult circumstances.
          </p>
        </div>
      </section>


      {/* =================================================
          DONATION SECTION
      ================================================= */}

      <section className="donation-section">
        <div className="donation-container">

          {/* LEFT CONTENT */}

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
              Mdeaver Charity Foundation Ltd. believes that
              meaningful change begins with people willing to
              help others.
            </p>

            <p>
              Your donation helps us provide practical assistance
              to people experiencing financial hardship,
              homelessness, family difficulties, and other
              challenging circumstances.
            </p>

            <p>
              Whether you give a little or a lot, your support
              helps us reach more people and provide a helping
              hand when it matters most.
            </p>

            <div className="donation-impact-note">
              <span className="impact-note-number">
                2,000+
              </span>

              <div>
                <strong>
                  PEOPLE SUPPORTED
                </strong>

                <p>
                  Since our foundation was established in 2020.
                </p>
              </div>
            </div>

          </div>


          {/* DONATION FORM */}

          <div className="donation-card">

            <div className="donation-card-header">
              <span>
                YOUR GIFT
              </span>

              <h3>
                Choose an amount
              </h3>

              <p>
                Select a contribution or enter your own amount.
              </p>
            </div>


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


            <div className="custom-amount">

              <label htmlFor="customAmount">
                CUSTOM AMOUNT
              </label>

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


            <div className="selected-donation">

              <span>
                YOUR DONATION
              </span>

              <strong>
                ${selectedAmount || "0"}
              </strong>

            </div>


            <button className="donate-submit">
              DONATE NOW
              <span>→</span>
            </button>


            <p className="secure-note">
              Your generosity helps support our charitable
              mission and community-focused programs.
            </p>

          </div>

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

              <span className="giving-number">
                01
              </span>

              <div>
                <h3>
                  Provide Practical Support
                </h3>

                <p>
                  Help us respond to people experiencing
                  genuine financial and personal hardship.
                </p>
              </div>

            </article>


            <article className="giving-point">

              <span className="giving-number">
                02
              </span>

              <div>
                <h3>
                  Restore Hope
                </h3>

                <p>
                  A helping hand at the right time can give
                  someone the confidence to keep moving forward.
                </p>
              </div>

            </article>


            <article className="giving-point">

              <span className="giving-number">
                03
              </span>

              <div>
                <h3>
                  Strengthen Communities
                </h3>

                <p>
                  Supporting individuals and families helps
                  create stronger and more resilient communities.
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
              Donations are only one way to support our mission.
              You can also volunteer, partner with us, or help
              spread awareness of the work we do.
            </p>

          </div>


          <div className="alternative-actions">

            <Link
              to="/contact"
              className="alternative-link"
            >
              PARTNER WITH US
              <span>→</span>
            </Link>

            <Link
              to="/contact"
              className="alternative-link"
            >
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

          <span>
            TOGETHER, WE CAN DO MORE
          </span>

          <h2>
            A better tomorrow
            <br />
            <em>starts with compassion.</em>
          </h2>

          <p>
            Thank you for helping us reach people who need
            a helping hand.
          </p>

          <Link
            to="/request-assistance"
            className="donate-final-btn"
          >
            REQUEST ASSISTANCE
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Donate;