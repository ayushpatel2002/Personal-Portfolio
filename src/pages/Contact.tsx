import { motion } from 'framer-motion';

export const Contact = () => (
  <motion.section
    className="p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg"
    id="contact"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Contact</h2>
    <p className="text-gray-700 dark:text-gray-300">📧 <a href="mailto:ayushkp38@gmail.com" className="underline text-blue-600">ayushkp38@gmail.com</a></p>
    <p className="text-gray-700 dark:text-gray-300">🔗 <a href="https://github.com/ayushpatel2002" className="underline text-blue-600">GitHub</a> | <a href="https://linkedin.com/in/ayushkpatel" className="underline text-blue-600">LinkedIn</a></p>
  </motion.section>
);
