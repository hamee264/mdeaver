import React from "react";
import { Link } from "react-router-dom";
import "./ImpactSection.css";

const features = [
  {
    type: "globe",
    title: "Support People",
    text: "We provide meaningful assistance to individuals and families facing difficult circumstances and help them move toward greater stability.",
  },
  {
    type: "solar",
    title: "Restore Hope",
    text: "We believe a difficult circumstance should not define someone's future. Our work provides a helping hand when it is needed most.",
  },
  {
    type: "bulb",
    title: "Create Opportunity",
    text: "Where possible, we encourage pathways toward greater financial, personal, and community stability and independence.",
  },
  {
    type: "recycle",
    title: "Give With Purpose",
    text: "We believe charitable giving should be thoughtful, responsible, and focused on creating meaningful impact in people's lives.",
  },
];

const FeatureIcon = ({ type }) => {
  if (type === "globe") {
    return (
      <svg
        className="impact-feature-icon"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="48" cy="54" r="31" />
        <path d="M18 53C26 49 34 48 42 52C49 55 53 63 61 63C68 63 75 58 80 52" />
        <path d="M30 29C36 35 39 42 38 49C37 56 32 62 33 70C34 77 39 82 45 85" />
        <path d="M58 24C54 31 55 38 60 43C64 47 72 48 79 46" />
        <path d="M49 22C49 34 47 42 43 48C39 54 38 61 41 68" />
        <path d="M70 21C76 25 81 30 84 36" />
        <path d="M70 17C73 10 80 8 86 10C87 16 84 23 78 26" />
        <path d="M69 20C77 18 83 14 86 10" />
      </svg>
    );
  }

  if (type === "solar") {
    return (
      <svg
        className="impact-feature-icon"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="29" cy="28" r="13" />
        <path d="M29 7V13" />
        <path d="M29 43V49" />
        <path d="M8 28H14" />
        <path d="M44 28H50" />
        <path d="M14 13L18 17" />
        <path d="M40 39L44 43" />
        <path d="M44 13L40 17" />
        <path d="M18 39L14 43" />
        <path d="M18 57L75 48L86 69L29 78L18 57Z" />
        <path d="M28 55L39 76" />
        <path d="M42 53L53 74" />
        <path d="M56 51L67 72" />
        <path d="M23 61L80 52" />
        <path d="M27 69L84 60" />
        <path d="M52 78V88" />
        <path d="M42 92H62" />
      </svg>
    );
  }

  if (type === "bulb") {
    return (
      <svg
        className="impact-feature-icon"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M34 59C29 54 26 47 26 40C26 27 36 17 49 17C62 17 72 27 72 40C72 48 69 54 64 59C61 62 60 65 60 69H38C38 65 37 62 34 59Z" />
        <path d="M39 77H59" />
        <path d="M42 84H56" />
        <path d="M49 17V8" />
        <path d="M22 25L15 20" />
        <path d="M76 25L83 20" />
        <path d="M18 42H8" />
        <path d="M80 42H90" />
        <path d="M31 14L27 7" />
        <path d="M67 14L71 7" />
        <path d="M38 45C43 49 46 53 49 58C52 53 55 49 60 45" />
        <path d="M49 58V69" />
      </svg>
    );
  }

  return (
    <svg
      className="impact-feature-icon"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="28" y="22" width="43" height="62" rx="4" />
      <path d="M36 22V15H63V22" />
      <path d="M20 30H28" />
      <path d="M71 30H79" />
      <path d="M40 40C48 34 59 37 61 46" />
      <path d="M61 46L56 42" />
      <path d="M61 46L62 39" />
      <path d="M59 65C51 71 40 68 38 59" />
      <path d="M38 59L43 63" />
      <path d="M38 59L37 66" />
      <path d="M44 77H57" />
      <path d="M48 30V35" />
      <path d="M52 30V35" />
      <path d="M56 30V35" />
    </svg>
  );
};


const ProjectCard = ({
  category,
  title,
  description,
  button = "READ MORE",
  buttonClass = "",
  to = "/about",
}) => {
  return (
    <article className="impact-project-card">

      <div className="impact-card-category">
        <span></span>
        {category}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <Link
        to={to}
        className={`impact-project-button ${buttonClass}`}
      >
        {button}
      </Link>

    </article>
  );
};


const ImpactSection = () => {
  return (
    <section className="impact-section">

      {/* =================================================
          OUR APPROACH / FEATURES
      ================================================= */}

      <div className="impact-features-wrapper">

        <div className="impact-heading">

          <div className="impact-eyebrow">
            <span></span>
            Compassion in action
          </div>

          <h2>
            A helping hand for a
            <br />
            better future
          </h2>

        </div>


        <div className="impact-features-grid">

          {features.map((feature, index) => (

            <div
              className="impact-feature"
              key={index}
            >

              <div className="impact-icon-wrapper">
                <FeatureIcon type={feature.type} />
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* =================================================
          STORIES / FOUNDATION WORK
      ================================================= */}

      <div className="impact-projects-section">

        <div className="impact-projects-grid">

          {/* =============================================
              FEATURED STORY
          ============================================== */}

          <article className="impact-featured-news">

            <div className="impact-featured-overlay"></div>

            <div className="impact-featured-content">

              <div className="impact-featured-eyebrow">
                <span></span>
                Our commitment
              </div>

              <h3>
                Helping people
                <br />
                move forward
              </h3>

              <p>
                Every person we support represents more
                than a number. Behind every request for
                assistance is a person, a family, a story,
                and a future worth investing in.
              </p>

              <Link
                to="/about"
                className="impact-more-button"
              >
                MORE INFO
              </Link>

            </div>

          </article>


          {/* =============================================
              MIDDLE COLUMN
          ============================================== */}

          <div className="impact-project-column">

            <ProjectCard
              category="OUR APPROACH"
              title="Listen"
              description="We take the time to understand the circumstances and needs of the people seeking assistance."
              button="LEARN MORE"
              buttonClass="black"
              to="/about"
            />

            <ProjectCard
              category="OUR APPROACH"
              title="Support"
              description="We provide appropriate assistance based on available resources and the circumstances presented."
              button="LEARN MORE"
              buttonClass="green"
              to="/request-assistance"
            />

          </div>


          {/* =============================================
              RIGHT COLUMN
          ============================================== */}

          <div className="impact-project-column">

            <ProjectCard
              category="OUR APPROACH"
              title="Empower"
              description="Where possible, we encourage pathways toward greater financial, personal, and community stability."
              button="LEARN MORE"
              buttonClass="orange"
              to="/about"
            />

            <ProjectCard
              category="OUR IMPACT"
              title="More Than 2,000 Lives Supported"
              description="Since 2020, Mdeaver Charity Foundation Ltd. has remained committed to turning compassion into meaningful action."
              button="OUR IMPACT"
              buttonClass="black"
              to="/about"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default ImpactSection;