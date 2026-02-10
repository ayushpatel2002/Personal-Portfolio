import { useEffect, useState } from 'react';
import { animated, useSpring, useTrail } from '@react-spring/web';

const skills = ['R', 'Python', 'SQL', 'Power BI', 'Forecasting', 'NLP', 'Data Visualization'];
const heroLines = [
  'I transform data into insights.',
  'I build predictive models.',
  'I craft data visualizations.',
];

const Hero = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const line = heroLines[lineIndex];
    let char = 0;
    setDisplayText('');

    const typeId = setInterval(() => {
      char += 1;
      setDisplayText(line.slice(0, char));
      if (char >= line.length) {
        clearInterval(typeId);
        setTimeout(() => setLineIndex((idx) => (idx + 1) % heroLines.length), 1300);
      }
    }, 45);

    return () => clearInterval(typeId);
  }, [lineIndex]);

  const introSpring = useSpring({
    from: { opacity: 0, y: 24 },
    to: { opacity: 1, y: 0 },
    config: { tension: 140, friction: 20 },
  });

  const skillTrail = useTrail(skills.length, {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    delay: 500,
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-28 overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob [animation-delay:2s]" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob [animation-delay:4s]" />

      <animated.div style={introSpring} className="relative z-10 text-center max-w-3xl">
        <h2 className="text-sm md:text-base font-medium tracking-wider text-blue-400 mb-4 uppercase">Data Analyst & Developer</h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
          Hi, I&apos;m{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Ayush Patel
          </span>
        </h1>

        <div className="text-xl md:text-2xl text-slate-400 mb-8 h-12">{displayText}</div>

        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Passionate about uncovering trends and solving complex problems through data-driven strategies.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {skillTrail.map((style, idx) => (
            <animated.span
              key={skills[idx]}
              style={style}
              className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-slate-300 text-sm hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
            >
              {skills[idx]}
            </animated.span>
          ))}
        </div>
      </animated.div>
    </section>
  );
};

export default Hero;
