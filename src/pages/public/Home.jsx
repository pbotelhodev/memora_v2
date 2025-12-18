//Imports Tools


//Imports Components
import Header from "../../components/layout/Header";
import Hero from "../../components/layout/Hero";
import ShowCase from "../../components/layout/ShowCase";
import StepsBySteps from "../../components/layout/StepsBySteps";
import PricingSection from "../../components/layout/PricingSection";
import UpsellAddons from "../../components/layout/UpSellAddons";
import Footer from "../../components/layout/Footer";

const Home = () => {
  //States

  //Funções

  //UseEffects

  //Render
  return (
    <>
      {/* ========== Header ========== */}
      <Header />
      {/* ========== Hero Section ========== */}
      <Hero />
      {/* ========== Show Case ========== */}
      <ShowCase />
      {/* ========== StepsBySteps ========== */}
      <StepsBySteps />
      {/* =========== Pricing Section ========== */}
      <PricingSection />
      {/* ========== Upsell Addons ========== */}
      <UpsellAddons />
      {/* ========== Footer ========== */}
      <Footer />
    </>
  );
};

export default Home;
