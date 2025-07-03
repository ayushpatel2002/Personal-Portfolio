import { motion } from 'framer-motion';

export const Contact = () => (
  <motion.section
    id="contact"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-semibold mb-4">Contact</h2>
    <p>📧 <a href="mailto:ayushkp38@gmail.com" className="underline text-blue-600">ayushkp38@gmail.com</a></p>
    <p>🔗 <a href="https://github.com/ayushpatel2002" className="underline text-blue-600">GitHub</a> | <a href="https://linkedin.com/in/ayushkpatel" className="underline text-blue-600">LinkedIn</a></p>
  </motion.section>
);
