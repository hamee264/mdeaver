import React from "react";
import { Link } from "react-router-dom";
import "./PlansSection.css";

const plans = [
  {
    type: "01",
    price: "LISTEN",
    label: "UNDERSTAND",
    className: "monthly-plan",
    description:
      "We take the time to understand the circumstances and needs of the people seeking assistance.",
  },
  {
    type: "02",
    price: "SUPPORT",
    label: "PROVIDE ASSISTANCE",
    className: "single-plan",
    description:
      "We provide appropriate assistance based on available resources and the circumstances presented.",
  },
  {
    type: "03",
    price: "EMPOWER",
    label: "BUILD STABILITY",
    className: "empower-plan",
    description:
      "Where possible, we encourage pathways toward greater financial, personal, and community stability.",
  },
];

function PlansSection() {
  return (
    <section className="plans-section">
      <div className="plans-container">

        {/* LEFT CONTENT */}
        <div className="plans-intro">
          <div className="plans-eyebrow">
            <span></span>
            Our Approach
          </div>

          <h2>
            Helping people move
            <br />
            forward with purpose
          </h2>

          <p className="plans-description">
            Mdeaver Charity Foundation Ltd. believes that meaningful
            assistance begins with understanding people and their
            circumstances. Through compassion, practical support, and
            responsible giving, we work to help people regain stability
            and move forward with confidence.
          </p>

          <Link to="/about" className="plans-details-btn">
            LEARN MORE
          </Link>
        </div>

        {/* APPROACH CARDS */}
        <div className="plans-wrapper">
          {plans.map((plan) => (
            <div
              className={`plan-card ${plan.className}`}
              key={plan.type}
            >
              {/* CARD HEADER */}
              <div className="plan-header">
                <p className="plan-type">
                  {plan.type}
                </p>

                <h3>
                  {plan.price}
                </h3>

                <p className="plan-label">
                  {plan.label}
                </p>
              </div>

              {/* CARD BODY */}
              <div className="plan-body">
                <p>
                  {plan.description}
                </p>

                <Link to="/about" className="plan-more-btn">
                  READ MORE
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PlansSection;