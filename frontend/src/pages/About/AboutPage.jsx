import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiUsers, FiMic, FiHeart, FiZap, FiShield } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Divine Chatter</title>
        <meta
          name="description"
          content="Divine Chatter connects children with culture through interactive storytelling"
        />
      </Helmet>

      <div className="about-page">

        {/* INTRO */}
        <section className="about-intro container-custom">
          <h1>About Divine Chatter</h1>
          <p>
            Founded in 2026, Divine Chatter is a visionary venture dedicated to child development through cultural connection. We seamlessly integrate faith and learning by bringing religious narratives to life with interactive technology. Our mission is to help children connect with their spiritual roots in an engaging, modern way, fostering cultural intelligence and building a lasting foundation of values. At Divine Chatter, tradition meets innovation to nurture the heart and mind.
          </p>
        </section>

        {/* STATS */}
        <section className="about-stats container-custom">
          <div>
            <strong>1000+</strong>
            <span>Stories</span>
          </div>
          <div>
            <strong>3–12</strong>
            <span>Age Group</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Screen Free</span>
          </div>
        </section>

        {/* MISSION */}
        <section className="about-mission container-custom">
          <div className="mission-text">
            <h2>Our Vision</h2>
            <p>
              To nurture a generation of culturally rooted, empathetic, and morally conscious global citizens, for whom faith and heritage are living sources of wisdom, identity, and connection.
            </p>
            <p>
              We focus on nurturing character, curiosity, and spirituality in a natural way.
            </p>
            <h2>Our Mission</h2>
            <p>
              Our mission is to revolutionize spiritual learning by merging interactive technology with timeless religious narratives. We create immersive, tactile experiences that allow children to explore their heritage in a deeply personal way, transforming abstract values into tangible understanding and fostering a lifelong bond with their cultural identity.
            </p>

          </div>

          <div className="mission-icons">
            <div><FiHeart /> <span>Values First</span></div>
            <div><FiMic /> <span>Voice Learning</span></div>
            <div><FiUsers /> <span>Child Focused</span></div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="about-features container-custom">
          <h2>Why Divine Chatter</h2>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-title">
                <FiBookOpen />
                <h3>Rich Story Library</h3>
              </div>
              <p>Mythology, folklore and spiritual teachings in audio form.</p>
            </div>

            <div className="feature-card">
              <div className="feature-title">
                <FiZap />
                <h3>Interactive Learning</h3>
              </div>
              <p>Voice quizzes and engaging conversations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-title">
                <FiShield />
                <h3>Safe & Healthy</h3>
              </div>
              <p>No screens, no ads, no distractions.</p>
            </div>

          </div>
        </section>


      </div>
    </>
  );
};

export default AboutPage;
