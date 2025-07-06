import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';

export const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const slideIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { mass: 1.2, tension: 100, friction: 18 },
  });

  return (
    <animated.section
      ref={ref}
      style={slideIn}
      className="relative p-8 bg-[#1A1A2E]/90 text-[#EAEAEA] rounded-2xl shadow-xl border border-purple-900/30 backdrop-blur-md overflow-hidden"
      id="contact"
    >
    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:4s]">
      Let’s Connect
    </h2>
    <p className="mb-2">
      <span className="mr-2 text-pink-400 animate-pulse">📧</span>
      <a
        href="mailto:ayushkp38@gmail.com"
        className="underline font-semibold text-[#70A1FF] hover:text-[#A4C8FF] transition-colors"
      >
        ayushkp38@gmail.com
      </a>
    </p>
    <p className="mb-2">
      <span className="mr-2 text-pink-400 animate-pulse">🔗</span>
      <a
        href="https://www.linkedin.com/in/ayushkpatel/"
        className="underline font-semibold text-[#70A1FF] hover:text-[#A4C8FF] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </p>
    <p className="mb-2">
      <span className="mr-2 text-pink-400 animate-pulse">💻</span>
      <a
        href="https://github.com/ayushpatel2002"
        className="underline font-semibold text-[#70A1FF] hover:text-[#A4C8FF] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </p>
    <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-500 to-fuchsia-500 opacity-10 blur-3xl rounded-full -z-10 animate-pulse" />
    </animated.section>
  );
};
