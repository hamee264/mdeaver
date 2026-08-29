import { Link } from "react-router-dom";
import "./ImpactSection.css";
import commitmentBg from "../../assets/our-commitment-bg.jpg";

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

      <h3>{title}</h3>

      <p>{description}</p>

      <Link to={to} className={`impact-project-button ${buttonClass}`}>
        {button}
      </Link>
    </article>
  );
};

const ImpactSection = () => {
  return (
    <section className="impact-section">
      {/* =========================================
          FOUNDATION WORK
      ========================================= */}

      <div className="impact-projects-section">
        <div className="impact-projects-grid">
          {/* =====================================
              FEATURED COMMITMENT
          ===================================== */}

          <article
            className="impact-featured-news"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.75) 100%), url(${commitmentBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
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
                Every person we support represents more than a number. Behind
                every request for assistance is a person, a family, a story, and
                a future worth investing in.
              </p>

              <Link to="/about" className="impact-more-button">
                MORE INFO
              </Link>
            </div>
          </article>

          {/* =====================================
              COLUMN ONE
          ===================================== */}

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
              to="/impact"
            />
          </div>

          {/* =====================================
              COLUMN TWO
          ===================================== */}

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
