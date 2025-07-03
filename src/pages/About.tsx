import { motion } from 'framer-motion';

export const About = () => (
  <motion.section
    className="mb-20"
    id="about"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-4xl font-bold mb-4">Hi, I'm Ayush Patel 👋</h1>
    <p className="text-lg leading-relaxed">
      I'm a data scientist passionate about turning complex data into actionable insights. I’ve worked with education and commercial data, built forecasting models, visual dashboards, and love uncovering hidden truths within data. My journey includes projects in fraud detection, job ad classification, and more — all available on my GitHub.
    </p>
  </motion.section>
);
