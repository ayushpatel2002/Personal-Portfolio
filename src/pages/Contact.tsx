import { useSpring, animated } from '@react-spring/web';

export const Contact = () => {
  const styles = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 600 },
  });

  return (
    <animated.section style={styles} className="p-8 bg-white/90 rounded-2xl shadow-lg" id="contact">
      <h2 className="text-4xl font-bold mb-6 text-indigo-700">Contact</h2>
      <p className="text-gray-700 mb-2">
        📧{' '}
        <a
          href="mailto:ayushkp38@gmail.com"
          className="underline text-blue-600 hover:text-blue-800"
        >
          ayushkp38@gmail.com
        </a>
      </p>
      <p className="text-gray-700">
        🔗{' '}
        <a
          href="https://github.com/ayushpatel2002"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          GitHub
        </a>{' '}
        |{' '}
        <a
          href="https://linkedin.com/in/ayushkpatel"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          LinkedIn
        </a>
      </p>
    </animated.section>
  );
};
