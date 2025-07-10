import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

function AnimatedCounter({ to, suffix = '', duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = (timestamp: number) => {
      const progress = Math.min(timestamp / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  return <p className={className}>{count}{suffix}</p>;
}

export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const slideIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { mass: 1.2, tension: 100, friction: 18 },
  });

  return (
    <animated.section ref={ref}
      className="mb-16 p-8 bg-zinc-900 text-white rounded-2xl shadow-lg border border-purple-900/30 relative overflow-hidden"
      id="about"
      style={slideIn}
    >
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:4s] [animation-timing-function:ease-in-out] [animation-iteration-count:infinite]">
        Everything Ayush Patel — Ideas, Insights & Impact.
      </h1>
      <p className="text-lg leading-relaxed text-zinc-300">
        I explore patterns behind the noise — blending data science, storytelling, and strategy to shape decisions that matter. From education equity dashboards to AI-powered experiments, my work is grounded in impact. Dive into forecasting, fraud detection, NLP, and more — it’s all open and alive on my GitHub.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">Current Role</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
            Data Analyst @ NT Department of Education — building dashboards, uncovering equity trends, and enabling informed decisions across education sectors.
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">Latest Projects</h2>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 text-sm space-y-1">
            <li>Forecasting school costs with Prophet</li>
            <li>LLM-powered chatbot using RAG</li>
            <li>Power BI dashboards for education equity</li>
          </ul>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center my-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300 text-center z-10 relative">
          <div>
            <AnimatedCounter to={5} suffix="+" className="text-purple-400 font-semibold text-xl" />
            <p>Major Data Projects</p>
          </div>
          <div>
            <AnimatedCounter to={2} className="text-purple-400 font-semibold text-xl" />
            <p>Industries Served</p>
          </div>
          <div>
            <AnimatedCounter to={100} suffix="%" duration={2500} className="text-purple-400 font-semibold text-xl" />
            <p>Learning & Building</p>
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-10 blur-[160px] rounded-full z-0 pointer-events-none animate-pulse" />
      </div>
      <div className="mt-10 relative p-6 bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 border border-indigo-400 rounded-xl text-center shadow-xl">
        <p className="text-white font-semibold text-lg animate-pulse">
          💬 Explore my work interactively — use the <span className="font-bold underline underline-offset-4 decoration-pink-400">AI-powered chatbot</span> trained on my own projects!
        </p>
        <div className="absolute inset-0 rounded-xl ring-2 ring-purple-500/50 animate-ping"></div>
      </div>
      <div className="absolute -top-20 -left-20 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 to-pink-500 opacity-10 blur-[180px] rounded-full -z-10" />
    </animated.section>
  );
};
