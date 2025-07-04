import { motion } from 'framer-motion';

const projectData = [
  {
    title: 'Stack Exchange Modeling',
    description:
      'Modeled user behavior on Stack Exchange using Scikit-learn to predict activity and engagement trends.',
    stack: ['Python', 'Scikit-learn', 'Pandas'],
    link: 'https://github.com/ayushpatel2002/stack-exchange-modeling',
  },
  {
    title: 'Fraud Detection in SQL',
    description:
      'Built rule-based and analytical queries to detect financial anomalies using SQL joins and window functions.',
    stack: ['SQL', 'CTEs', 'Anomaly Detection'],
    link: 'https://github.com/ayushpatel2002/fraud-detection-sql',
  },
  {
    title: 'NLP Job Ad Classifier',
    description:
      'Developed a classification system for job ads using TF-IDF and Logistic Regression within a Flask app.',
    stack: ['NLP', 'TF-IDF', 'Flask', 'Logistic Regression'],
    link: 'https://github.com/ayushpatel2002/job-ad-classifier',
  },
  {
    title: 'Energy Forecasting (R)',
    description:
      'Used Prophet and time series models in R to forecast energy consumption patterns with lag features.',
    stack: ['R', 'Prophet', 'Forecasting'],
    link: 'https://github.com/ayushpatel2002/energy-use-prediction',
  },
  {
    title: 'Equity Dashboard (Power BI)',
    description:
      'Designed interactive dashboards to visualize equity and developmental flags using DAX and slicers.',
    stack: ['Power BI', 'DAX', 'Data Visualization'],
    link: '',
  },
];

export const Projects = () => (
  <motion.section
    id="projects"
    className="mb-16 p-8 bg-white/90 rounded-2xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl font-bold mb-8 text-indigo-700">Projects</h2>
    <div className="grid gap-6 md:grid-cols-2">
      {projectData.map((project, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View on GitHub →
            </a>
          )}
        </motion.div>
      ))}
    </div>
  </motion.section>
);
