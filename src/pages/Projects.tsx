import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';

const projectData = [
  {
    title: 'Image Classification (CNN)',
    description:
      'Designed and trained a Convolutional Neural Network using TensorFlow and Keras to classify images from the Fashion MNIST dataset. Included visualization of feature maps and fine-tuning of hyperparameters to enhance model performance and generalization.',
    stack: ['Python', 'TensorFlow', 'CNN', 'Fashion MNIST'],
    link: 'https://github.com/ayushpatel2002/Image-Classification-CNN',
  },
  {
    title: 'Fraud Detection in SQL',
    description:
      'Performed rule-based fraud detection using SQL by analyzing transactional data. Implemented logic using advanced SQL constructs like window functions, CTEs, and aggregation to identify suspicious user behavior and flag anomalies.',
    stack: ['SQL', 'Window Functions', 'CTEs'],
    link: 'https://github.com/ayushpatel2002/FraudDetectionWithSQL',
  },
  {
    title: 'NLP Job Ad Classifier',
    description:
      'Developed a Flask web application to classify job advertisements based on their descriptions using machine learning. Applied text preprocessing, TF-IDF vectorization, and logistic regression to enable real-time category predictions.',
    stack: ['Flask', 'Python', 'NLP', 'TF-IDF'],
    link: 'https://github.com/ayushpatel2002/Flask-JobSeeker-with-NLP',
  },
  {
    title: 'Energy Forecasting (R)',
    description:
      'Implemented energy consumption forecasting using time series modeling in R. Compared ARIMA and Prophet models, conducted residual diagnostics, and evaluated model performance through cross-validation and error metrics.',
    stack: ['R', 'Prophet', 'ARIMA', 'Time Series'],
    link: 'https://github.com/ayushpatel2002/Energy-Use-Prediction-with-R',
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
          className="cursor-pointer bg-gradient-to-br from-[#292946] to-[#1e1e2f] border border-purple-900/30 rounded-xl p-6 shadow-md hover:shadow-purple-600/50 hover:border-purple-500 transition duration-300 group relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:border before:border-purple-500 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-40 transform-gpu hover:-translate-y-2 hover:scale-[1.02]"
        >
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-gradient-to-r from-purple-700 to-blue-700 text-white px-2 py-1 rounded-full font-medium shadow-sm transition-transform duration-200 group-hover:scale-110"
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
              className="text-sm text-blue-400 hover:text-pink-400 hover:underline z-10 relative transition-colors"
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
