import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';

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

export const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const slideIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(60px)',
    config: { mass: 1.2, tension: 120, friction: 20 },
  });

  return (
    <animated.section
      ref={ref}
      style={slideIn}
      id="projects"
      className="relative mb-16 p-8 bg-gradient-to-br from-[#1c1c2d] via-[#2c2c44] to-[#3c3c5c] text-white rounded-2xl shadow-xl border border-purple-900/30 backdrop-blur-md overflow-hidden"
    >
    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:4s]">
      Featured Projects
    </h2>
    <div className="grid gap-6 md:grid-cols-2">
      {projectData.map((project, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-[#292946] to-[#1e1e2f] border border-purple-900/30 rounded-xl p-6 shadow-md hover:shadow-xl hover:border-purple-500 transition duration-300 group relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:border before:border-purple-500 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-40 transform-gpu hover:-translate-y-2 hover:scale-[1.02]"
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
        </div>
      ))}
    </div>
    <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 to-pink-500 opacity-20 blur-[160px] rounded-full -z-10" />
    </animated.section>
  );
};
