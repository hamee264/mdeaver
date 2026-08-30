import Hero from "../components/Home/Hero.jsx";
// import Causes from "../components/Home/Causes.jsx";
// import DonationHighlights from "../components/Home/DonationHighlights.jsx";
import Donate from "../components/Home/Donate.jsx";
import ImpactSection from "../components/Home/ImpactSection.jsx";
import StatisticsBanner from "../components/Home/StatisticsBanner.jsx";
// import PlansSection from "../components/Home/PlansSection.jsx";
import HelpSection from "../components/Home/HelpSection.jsx";

function Home() {
  return (
    <>
      <Hero />
      <ImpactSection />
      <Donate />
      <StatisticsBanner />
      {/* <PlansSection /> */}
      <HelpSection />
    </>
  );
}

export default Home;
