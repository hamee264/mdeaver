import React from "react";
import "./Impact.css";

const Impact = () => {
  return (
    <main className="impact-page">
      {/* Hero */}
      <section className="impact-hero">
        <div className="impact-hero-overlay"></div>

        <div className="impact-hero-content">
          <h1>Our Impact</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="impact-intro section-padding">
        <div className="impact-intro-image">
          <img
            src="/assets/sq-05.jpg"
            alt="Community members receiving support"
          />

          <div className="impact-stat-card">
            <span className="impact-stat-icon">
              <i className="fa-solid fa-heart"></i>
            </span>

            <strong>2,000+</strong>
            <span>PEOPLE SUPPORTED</span>
          </div>
        </div>

        <div className="impact-intro-content">
          <div className="section-label">
            <span></span>
            Making a meaningful difference
          </div>

          <h2>Every act of compassion can change a life</h2>

          <div className="impact-text-grid">
            <p>
              Since our foundation was established in 2020, Mdeaver Charity
              Foundation Ltd. has worked to support individuals and families
              facing difficult circumstances.
            </p>

            <p>
              Our work focuses on providing practical assistance to people
              experiencing financial hardship, housing instability,
              homelessness, and other challenging situations.
            </p>

            <p>
              We believe that meaningful impact is created when people are given
              the support they need to regain stability and move forward with
              dignity.
            </p>

            <p>
              Every person we reach represents a story, a family, and a future
              worth investing in.
            </p>
          </div>

          <div className="impact-signature">
            <div className="impact-person">
              <div className="impact-avatar">
                <i className="fa-solid fa-user"></i>
              </div>

              <div>
                <h4>Michele Deaver</h4>
                <p>Founder & Philanthropist</p>
              </div>
            </div>

            <div className="impact-sign">Mdeaver</div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="impact-numbers">
        <div className="impact-number-header">
          <div className="section-label">
            <span></span>
            Our impact in numbers
          </div>

          <h2>Turning compassion into meaningful action</h2>
        </div>

        <div className="impact-number-grid">
          <div className="impact-number-item">
            <strong>2,000+</strong>
            <h3>People Supported</h3>
            <p>
              Individuals and families who have received support through our
              charitable work.
            </p>
          </div>

          <div className="impact-number-item">
            <strong>2020</strong>
            <h3>Year Founded</h3>
            <p>
              Since our beginning, we have remained committed to helping people
              facing hardship.
            </p>
          </div>

          <div className="impact-number-item">
            <strong>100%</strong>
            <h3>Community Focused</h3>
            <p>
              Our work remains centered on people, dignity, opportunity, and
              stronger communities.
            </p>
          </div>

          <div className="impact-number-item">
            <strong>∞</strong>
            <h3>Hope To Give</h3>
            <p>
              Our commitment continues as we work to reach more people who need
              a helping hand.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Impact */}
      <section className="impact-areas section-padding">
        <div className="impact-areas-header">
          <div className="section-label">
            <span></span>
            Where your support makes a difference
          </div>

          <h2>Helping people move toward a better future</h2>

          <p>
            Our programs and assistance are focused on people experiencing
            genuine hardship and circumstances that can make it difficult to
            move forward on their own.
          </p>
        </div>

        <div className="impact-area-grid">
          <article className="impact-area-card">
            <div className="impact-area-number">01</div>

            <div className="impact-area-icon">
              <i className="fa-solid fa-house-user"></i>
            </div>

            <h3>Housing Stability</h3>

            <p>
              Supporting people experiencing homelessness or housing instability
              as they work toward safer and more stable circumstances.
            </p>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i>
                Essential assistance
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Housing-related support
              </li>
            </ul>
          </article>

          <article className="impact-area-card">
            <div className="impact-area-number">02</div>

            <div className="impact-area-icon">
              <i className="fa-solid fa-people-roof"></i>
            </div>

            <h3>Family Support</h3>

            <p>
              Helping families and single mothers navigate difficult periods
              while creating more stable circumstances for themselves and their
              children.
            </p>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i>
                Family assistance
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Support for single mothers
              </li>
            </ul>
          </article>

          <article className="impact-area-card">
            <div className="impact-area-number">03</div>

            <div className="impact-area-icon">
              <i className="fa-solid fa-hand-holding-dollar"></i>
            </div>

            <h3>Financial Relief</h3>

            <p>
              Providing meaningful assistance to individuals and families facing
              unexpected expenses and financial difficulties.
            </p>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i>
                Emergency assistance
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Financial hardship support
              </li>
            </ul>
          </article>

          <article className="impact-area-card">
            <div className="impact-area-number">04</div>

            <div className="impact-area-icon">
              <i className="fa-solid fa-hands-holding-child"></i>
            </div>

            <h3>Community Care</h3>

            <p>
              Extending compassion to people going through difficult chapters
              and connecting them with resources that can help them move
              forward.
            </p>

            <ul>
              <li>
                <i className="fa-solid fa-check"></i>
                Community initiatives
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                Practical support
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* CTA Image Section */}
      <section className="impact-cta">
        <div className="impact-cta-overlay"></div>

        <div className="impact-cta-content">
          <div className="section-label light">
            <span></span>
            Every contribution matters
          </div>

          <h2>Together, we can reach more people who need a helping hand</h2>

          <p>
            Your support allows Mdeaver Charity Foundation Ltd. to continue
            providing meaningful assistance to individuals and families facing
            hardship.
          </p>

          <a href="/donate" className="impact-btn">
            DONATE NOW
          </a>
        </div>
      </section>

      {/* Our Approach */}
      <section className="impact-approach section-padding">
        <div className="impact-approach-header">
          <div className="section-label">
            <span></span>
            How we create impact
          </div>

          <h2>A practical approach to helping people move forward</h2>
        </div>

        <div className="impact-approach-grid">
          <div className="impact-approach-item">
            <div className="approach-number">1</div>

            <h3>Listen</h3>

            <p>
              We take the time to understand the circumstances and needs of
              people seeking assistance.
            </p>
          </div>

          <div className="impact-approach-item">
            <div className="approach-number">2</div>

            <h3>Support</h3>

            <p>
              We provide appropriate assistance based on available resources and
              the circumstances presented.
            </p>
          </div>

          <div className="impact-approach-item">
            <div className="approach-number">3</div>

            <h3>Empower</h3>

            <p>
              Wherever possible, we encourage pathways toward greater financial,
              personal, and community stability.
            </p>
          </div>

          <div className="impact-approach-item">
            <div className="approach-number">4</div>

            <h3>Give With Purpose</h3>

            <p>
              We believe charitable giving should be thoughtful, responsible,
              and focused on creating meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="impact-closing">
        <div className="impact-closing-content">
          <div className="section-label light">
            <span></span>A future with more hope
          </div>

          <h2>The work continues</h2>

          <p>
            There are still families struggling to make ends meet, single
            mothers working to provide for their children, and people facing
            unexpected financial hardship.
          </p>

          <p>
            With the support of compassionate individuals, organizations, and
            communities, we can reach more people, provide meaningful
            assistance, and help create brighter possibilities for the future.
          </p>

          <div className="impact-closing-buttons">
            <a href="/donate" className="impact-btn">
              DONATE
            </a>

            <a href="/request-assistance" className="impact-btn outline">
              REQUEST ASSISTANCE
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Impact;
