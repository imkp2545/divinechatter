import { motion } from 'framer-motion';
import { BENEFITS } from '@utils/constants';
import './Benefits.css';

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: 'easeOut'
    }
  })
};

const Benefits = () => {
  return (
    <section className="benefits-section">
      <div className="container-custom">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Benefits for Your Child</h2>
          <p className="section-description">
            Where learning meets values, fun, and meaningful growth.
          </p>
        </motion.div>

        <div className="benefits-grid">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
                key={index}
                className="benefit-card premium-card"
              >
                <div className="benefit-glow" />

                <div className="benefit-icon-wrapper">
                  <Icon className="benefit-icon" />
                </div>

                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
