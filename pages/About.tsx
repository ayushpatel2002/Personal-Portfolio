import { animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { useSpring } from '@react-spring/web';

export const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    config: { duration: 600 }
  });
  return (
    <animated.section
      id="about"
      ref={ref}
      style={animationProps}
      className="mb-16 p-8 bg-white/90 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Avatar or Animation */}
        <img
          src="/avatar.png" // Replace with your image or animated illustration
          alt="Ayush Patel"
          className="w-32 h-32 rounded-full border-2 border-indigo-500 shadow-lg"
        />

        {/* Text + Content */}
        <div>
          <h1 className="text-5xl font-extrabold mb-4 text-indigo-700">Hi, I'm Ayush Patel 👋</h1>
          <p className="text-lg leading-relaxed text-gray-700">
            I'm a data scientist passionate about transforming complex data into meaningful insights.
            I’ve worked on projects in forecasting, NLP, dashboards, and fraud detection — blending technical precision
            with business impact. I enjoy turning messy datasets into clear stories that drive real outcomes.
          </p>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">Azure AI Certified</span>
            <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">Hackathon Winner</span>
            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">Peer Mentor</span>
            <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full font-medium">Continuous Learner</span>
          </div>

          {/* Key Areas */}
          <ul className="mt-5 text-gray-600 list-disc list-inside text-sm leading-6">
            <li>Time-series forecasting (Prophet, ARIMA, LSTM)</li>
            <li>Interactive dashboards using Power BI and DAX</li>
            <li>Natural Language Processing (TF-IDF, scikit-learn)</li>
            <li>SQL-based anomaly detection and ETL pipelines</li>
          </ul>

          {/* CTA buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href="#projects"
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </animated.section>
  );
}
