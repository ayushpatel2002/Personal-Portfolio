import { animated, useSpring, useTrail } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

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

  const headingSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
  });

  const cardTrail = useTrail(projectData.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 40,
    config: { tension: 180, friction: 22 },
  });

  return (
    <section id="projects" ref={ref} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <animated.div style={headingSpring} className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of my recent work in data analysis and web development.
          </p>
        </animated.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardTrail.map((style, index) => {
            const project = projectData[index];
            return (
              <animated.article
                key={project.title}
                style={style}
                className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 transition-transform duration-500 group-hover:scale-105" />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-slate-700/50 text-blue-300 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    ↗ View on GitHub
                  </a>
                </div>
              </animated.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
