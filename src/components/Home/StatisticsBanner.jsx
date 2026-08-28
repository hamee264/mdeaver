import React from "react";
import "./StatisticsBanner.css";

const statistics = [
  {
    number: "2,000+",
    title: "PEOPLE SUPPORTED",
    description: "Lives Reached",
  },
  {
    number: "2020",
    title: "YEAR FOUNDED",
    description: "Serving Since 2020",
  },
  {
    number: "100%",
    title: "COMMITMENT",
    description: "Serving Communities",
  },
];

const StatisticsBanner = () => {
  return (
    <section className="statistics-banner">
      <div className="statistics-overlay"></div>

      <div className="statistics-container">
        {statistics.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-number">
              {stat.number}
            </div>

            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsBanner;