import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="p-8 bg-gray-800 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-indigo-400">Contact</h2>
      <p className="text-gray-300 mb-2">
        📧{' '}
        <a
          href="mailto:ayushkp38@gmail.com"
          className="underline text-blue-300 hover:text-blue-400"
        >
          ayushkp38@gmail.com
        </a>
      </p>
      <p className="text-gray-300">
        🔗{' '}
        <a
          href="https://github.com/ayushpatel2002"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-300 hover:text-blue-400"
        >
          GitHub
        </a>{' '}
        |{' '}
        <a
          href="https://linkedin.com/in/ayushkpatel"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-300 hover:text-blue-400"
        >
          LinkedIn
        </a>
      </p>
    </motion.section>
  );
};
