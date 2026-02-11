import { Helmet } from 'react-helmet-async';
import HeroSection from '@components/home/HeroSection/HeroSection';
import ProductHighlights from '@components/home/ProductHighlights/ProductHighlights';
import Benefits from '@components/home/Benefits/Benefits';
import ComingSoonBanner from '@components/home/ComingSoonBanner/ComingSoonBanner'; 
import Testimonials from '@components/home/Testimonials/Testimonials';
import './Home.css';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Divine Chatter - Connecting Youth to Religion</title>
        <meta
          name="description"
          content="Interactive, screen-free storytelling companion for children. Teach religion, values, and culture through voice-based stories and games."
        />
      </Helmet>

      <div className="home-page">
        <HeroSection />
        <ProductHighlights />
        <Benefits />
        <ComingSoonBanner />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;