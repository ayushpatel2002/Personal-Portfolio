import { motion } from 'framer-motion';

export const Projects = () => (
  <motion.section
    className="mb-16 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg"
    id="projects"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Projects</h2>
    <ul className="space-y-4 text-gray-700 dark:text-gray-300">
      <li>
        <strong>Stack Exchange Modeling (Python):</strong> Modeled user behavior using Scikit-learn on Stack Exchange posts.
      </li>
      <li>
        <strong>Fraud Detection (SQL):</strong> Built rule-based queries to detect anomalies in financial transactions.
      </li>
      <li>
        <strong>Job Ad Classifier (NLP):</strong> Used NLP to classify job ads by category and intent in a university-led project.
      </li>
    </ul>
  </motion.section>
);
