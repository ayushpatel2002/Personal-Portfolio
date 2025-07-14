import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const skills = ['Python', 'SQL', 'ML', 'R', 'Power BI', 'NLP', 'Forecasting'];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const animation = useSpring({
    key: index,
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % skills.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 sm:py-40">
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <svg viewBox="0 0 500 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points="0,80 50,60 100,65 150,40 200,50 250,30 300,40 350,20 400,30 450,10 500,20"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="3"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
          </polyline>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:6s]">
        Ayush Patel
      </h1>
      <p className="text-lg text-zinc-300 max-w-xl">
        Data scientist turning complex data into clear insight.
      </p>
      <div className="mt-6 text-2xl font-mono text-blue-300 h-8">
        <animated.span style={animation}>{skills[index]}</animated.span>
      </div>
    </section>
  );
};

export default Hero;
