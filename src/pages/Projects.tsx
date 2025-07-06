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
    className="relative mb-16 p-8 bg-[#1e1e2f]/90 text-gray-100 rounded-2xl shadow-xl border border-purple-900/30 backdrop-blur-md overflow-hidden"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
  >
    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:4s]">
      Featured Projects
    </h2>
    <div className="grid gap-6 md:grid-cols-2">
      {projectData.map((project, idx) => (
        <motion.div
          key={idx}
          whileHover={{
            scale: 1.03,
            y: -8,
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.25)',
            transition: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          className="bg-[#2a2a3d] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-purple-500 transition duration-300 group relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:border before:border-purple-500 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-40"
        >
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-gradient-to-r from-purple-700 to-blue-700 text-white px-2 py-1 rounded-full font-medium shadow-sm"
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
              className="text-sm text-blue-400 hover:underline"
            >
              View on GitHub →
            </a>
          )}
        </motion.div>
      ))}
    </div>
    <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 to-pink-500 opacity-10 blur-[180px] rounded-full -z-10" />
  </motion.section>
);
