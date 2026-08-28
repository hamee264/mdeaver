import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submitted:", formData);

    // Connect your backend/email service here later.
  };

  return (
    <main className="contact-page">

      {/* =================================================
          HERO
      ================================================= */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">
          <div className="contact-hero-label">
            <span></span>
            GET IN TOUCH
          </div>

          <h1>Contact Us</h1>

          <p>
            We're here to listen, answer your questions,
            and help you find the right way forward.
          </p>
        </div>
      </section>


      {/* =================================================
          INTRO + FORM
      ================================================= */}
      <section className="contact-main">

        <div className="contact-intro">

          <div className="contact-section-label">
            <span></span>
            We'd love to hear from you
          </div>

          <h2>
            Let's start a
            <br />
            conversation.
          </h2>

          <p>
            Whether you need information about our work, want to
            support our mission, or simply have a question, we're
            here to help.
          </p>

          <p>
            Mdeaver Charity Foundation Ltd. believes that every
            meaningful connection starts with listening. Reach out
            to us and a member of our team will respond as soon as
            possible.
          </p>


          {/* CONTACT DETAILS */}
          <div className="contact-details">

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>

              <div>
                <span>EMAIL US</span>
                <a href="mailto:info@mdeavercharityfoundation.org">
                  info@mdeavercharityfoundation.org
                </a>
              </div>
            </div>


            <div className="contact-detail">
              <div className="contact-detail-icon">
                <i className="fa-solid fa-phone"></i>
              </div>

              <div>
                <span>CALL US</span>
                <a href="tel:+10000000000">
                  +1 (000) 000-0000
                </a>
              </div>
            </div>


            <div className="contact-detail">
              <div className="contact-detail-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>

              <div>
                <span>OUR LOCATION</span>
                <p>
                  Mdeaver Charity Foundation Ltd.
                </p>
              </div>
            </div>

          </div>

        </div>


        {/* =================================================
            CONTACT FORM
        ================================================= */}
        <div className="contact-form-wrapper">

          <div className="contact-form-header">
            <span>Send us a message</span>

            <h3>
              How can we help?
            </h3>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="contact-form-row">

              <div className="contact-field">
                <label htmlFor="name">
                  FULL NAME
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field">
                <label htmlFor="email">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <div className="contact-form-row">

              <div className="contact-field">
                <label htmlFor="phone">
                  PHONE NUMBER
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>


              <div className="contact-field">
                <label htmlFor="subject">
                  SUBJECT
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a subject
                  </option>

                  <option value="general">
                    General Enquiry
                  </option>

                  <option value="assistance">
                    Request Assistance
                  </option>

                  <option value="donation">
                    Donations
                  </option>

                  <option value="partnership">
                    Partnership
                  </option>

                  <option value="volunteer">
                    Volunteering
                  </option>
                </select>
              </div>

            </div>


            <div className="contact-field">
              <label htmlFor="message">
                YOUR MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              SEND MESSAGE
              <i className="fa-solid fa-arrow-right"></i>
            </button>

          </form>

        </div>

      </section>


      {/* =================================================
          REASONS TO CONTACT
      ================================================= */}
      <section className="contact-reasons">

        <div className="contact-reasons-header">

          <div className="contact-section-label">
            <span></span>
            How you can connect
          </div>

          <h2>
            There are many ways to be part of the difference.
          </h2>

        </div>


        <div className="contact-reasons-grid">

          <div className="contact-reason">

            <div className="contact-reason-number">
              01
            </div>

            <div className="contact-reason-icon">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </div>

            <h3>
              Need Support?
            </h3>

            <p>
              If you or someone you know is experiencing
              financial hardship, homelessness, or another
              difficult circumstance, learn more about available
              assistance.
            </p>

            <a href="/request-assistance">
              REQUEST ASSISTANCE
              <i className="fa-solid fa-arrow-right"></i>
            </a>

          </div>


          <div className="contact-reason">

            <div className="contact-reason-number">
              02
            </div>

            <div className="contact-reason-icon">
              <i className="fa-solid fa-gift"></i>
            </div>

            <h3>
              Support Our Mission
            </h3>

            <p>
              Your contribution can help us provide meaningful
              assistance to individuals and families facing
              difficult circumstances.
            </p>

            <a href="/donate">
              DONATE NOW
              <i className="fa-solid fa-arrow-right"></i>
            </a>

          </div>


          <div className="contact-reason">

            <div className="contact-reason-number">
              03
            </div>

            <div className="contact-reason-icon">
              <i className="fa-solid fa-handshake"></i>
            </div>

            <h3>
              Partner With Us
            </h3>

            <p>
              Organizations, businesses, and community leaders
              can work with us to expand our reach and create
              greater impact.
            </p>

            <a href="/contact">
              START A CONVERSATION
              <i className="fa-solid fa-arrow-right"></i>
            </a>

          </div>

        </div>

      </section>


      {/* =================================================
          FAQ / QUICK HELP
      ================================================= */}
      <section className="contact-help">

        <div className="contact-help-content">

          <div className="contact-section-label">
            <span></span>
            Before you contact us
          </div>

          <h2>
            Looking for something specific?
          </h2>

          <p>
            You may find the information you're looking for on
            one of our dedicated pages.
          </p>

        </div>


        <div className="contact-help-links">

          <a href="/about">
            <span>
              About Mdeaver Charity Foundation
            </span>

            <i className="fa-solid fa-arrow-right"></i>
          </a>

          <a href="/impact">
            <span>
              Learn about our impact
            </span>

            <i className="fa-solid fa-arrow-right"></i>
          </a>

          <a href="/faq">
            <span>
              Frequently Asked Questions
            </span>

            <i className="fa-solid fa-arrow-right"></i>
          </a>

          <a href="/request-assistance">
            <span>
              Request Assistance
            </span>

            <i className="fa-solid fa-arrow-right"></i>
          </a>

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}
      <section className="contact-cta">

        <div className="contact-cta-overlay"></div>

        <div className="contact-cta-content">

          <div className="contact-section-label light">
            <span></span>
            TOGETHER, WE CAN DO MORE
          </div>

          <h2>
            Every conversation can be the
            beginning of something meaningful.
          </h2>

          <p>
            Whether you are seeking support, offering support,
            or looking for a way to get involved, we're ready
            to hear from you.
          </p>

          <div className="contact-cta-buttons">

            <a
              href="/donate"
              className="contact-cta-btn"
            >
              SUPPORT OUR MISSION
            </a>

            <a
              href="/request-assistance"
              className="contact-cta-btn outline"
            >
              REQUEST ASSISTANCE
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Contact;