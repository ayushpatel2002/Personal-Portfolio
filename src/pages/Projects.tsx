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
      className="relative mb-16 p-8 glass rounded-2xl soft-shadow border overflow-hidden text-white"
    >
    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#6EA8FF] to-[#6B8BFF] bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:6s] [animation-timing-function:ease-in-out] [animation-iteration-count:infinite]">
      Featured Projects
    </h2>
    <div className="grid gap-6 md:grid-cols-2">
      {projectData.map((project, idx) => (
        <div
          key={idx}
          className="cursor-pointer glass border rounded-xl p-6 soft-shadow transition duration-300 group relative overflow-hidden \
  before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] \
  before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-t-xl \
  before:opacity-70 before:pointer-events-none \
  before:bg-[length:200%_100%] before:bg-[position:0_0] \
  before:transition-[background-position,opacity] before:duration-700 before:ease-out \
  group-hover:before:bg-[position:100%_0] group-hover:before:opacity-90 \
  transform-gpu hover:-translate-y-1.5 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs btn-chip font-medium transition-transform duration-200 group-hover:scale-110"
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
              className="text-sm text-[var(--blue)] hover:underline z-10 relative transition-colors inline-flex items-center gap-1"
            >
              View on GitHub ↗
            </a>
          )}
        </div>
      ))}
    </div>
    <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-[#6EA8FF] to-[#6B8BFF] opacity-30 blur-[160px] rounded-full -z-10" />
    </animated.section>
  );
};
