import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const skills = [
  'R',
  'Python',
  'SQL',
  'Power BI',
  'Forecasting',
  'NLP',
  'CI/CD',
  'AWS',
  'Storytelling',
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');

  const animation = useSpring({
    key: index,
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useEffect(() => {
    const word = skills[index];
    let char = 0;
    setText('');
    const type = setInterval(() => {
      char += 1;
      setText(word.slice(0, char));
      if (char === word.length) {
        clearInterval(type);
        setTimeout(() => setIndex((i) => (i + 1) % skills.length), 1600);
      }
    }, 120);
    return () => clearInterval(type);
  }, [index]);

  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 sm:py-40">
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <svg viewBox="0 0 500 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points="0,80 50,60 100,65 150,40 200,50 250,30 300,40 350,20 400,30 450,10 500,20"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="3"
            strokeDasharray="6"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
          </polyline>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#6EA8FF" />
              <stop offset="100%" stopColor="#6B8BFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {particles.map((p) => (
        <div
          key={p}
          className="particle absolute w-1.5 h-1.5 bg-white/70 rounded-full opacity-70"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 bg-gradient-to-r from-[#6EA8FF] to-[#6B8BFF] bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:6s] [animation-timing-function:ease-in-out] [animation-iteration-count:infinite]">
        Ayush Patel
      </h1>
      <p className="text-lg text-[var(--textSecondary)] max-w-xl">
        Data scientist turning complex data into clear insight.
      </p>
      <div className="mt-6 text-2xl font-mono text-[var(--textPrimary)] h-8">
        <animated.span style={animation}>{text}</animated.span>
      </div>

      <style>
        {`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        .particle {
          animation: ping-slow 3s infinite ease-out;
        }
        `}
      </style>
    </section>
  );
};

export default Hero;
