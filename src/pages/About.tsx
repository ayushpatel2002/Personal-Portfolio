import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const slideIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    config: { mass: 1.2, tension: 100, friction: 18 },
  });


  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <animated.section ref={ref}
      className="mb-16 p-8 glass rounded-2xl soft-shadow border relative overflow-hidden text-white"
      id="about"
      style={slideIn}
    >
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 to-pink-400 opacity-30 blur-[160px] rounded-full -z-10" />
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#6EA8FF] to-[#6B8BFF] bg-clip-text text-transparent animate-gradient-x [background-size:200%_200%] [animation-duration:6s] [animation-timing-function:ease-in-out] [animation-iteration-count:infinite]">
        Everything Ayush Patel — Ideas, Insights & Impact.
      </h1>
      <p className="text-lg leading-relaxed text-zinc-300">
        I explore patterns behind the noise — blending data science, storytelling, and strategy to shape decisions that matter. From education equity dashboards to AI-powered experiments, my work is grounded in impact. Dive into forecasting, fraud detection, NLP, and more — it’s all open and alive on my GitHub.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="glass p-6 rounded-xl soft-shadow border">
          <h2 className="text-xl font-bold text-violet-300 mb-2">Current Role</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
            Data Analyst @ NT Department of Education — building dashboards, uncovering equity trends, and enabling informed decisions across education sectors.
          </p>
        </div>
        <div className="glass p-6 rounded-xl soft-shadow border">
          <h2 className="text-xl font-bold text-violet-300 mb-2">Latest Projects</h2>
          <ul className="group/list list-disc pl-5 text-zinc-700 dark:text-zinc-300 text-sm space-y-1">
            <li className="transition-transform duration-200 group-hover/list:translate-x-1 group-hover/list:text-pink-400">Forecasting school costs with Prophet</li>
            <li className="transition-transform duration-200 group-hover/list:translate-x-1 group-hover/list:text-pink-400">LLM-powered chatbot using RAG</li>
            <li className="transition-transform duration-200 group-hover/list:translate-x-1 group-hover/list:text-pink-400">Power BI dashboards for education equity</li>
          </ul>
        </div>
      </div>
      <div
        onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
        className="cursor-pointer mt-6 relative p-6 btn-primary text-center rounded-xl shadow-xl"
      >
        <p className="text-white font-semibold text-lg animate-[pulse_3.5s_ease-in-out_infinite]">
          💬 Explore my work interactively — use the <span className="font-bold underline underline-offset-4 decoration-pink-400">AI-powered chatbot</span> trained on my own projects!
        </p>
        <div className="absolute inset-0 rounded-xl ring-2 ring-purple-500/50 animate-ping"></div>
      </div>
      {/* Stats section (kept inside animated.section) */}
      <div className="mt-10 flex justify-around text-center text-white">
        <div>
          <p className="text-2xl font-extrabold text-[var(--textPrimary)] transition duration-300 ease-in-out hover:scale-105">5+</p>
          <p className="text-sm text-zinc-300">Major Data Projects</p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[var(--textPrimary)] transition duration-300 ease-in-out hover:scale-105">2</p>
          <p className="text-sm text-zinc-300">Industries Served</p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[var(--textPrimary)] transition duration-300 ease-in-out hover:scale-105">100%</p>
          <p className="text-sm text-zinc-300">Learning & Building</p>
        </div>
      </div>

      {/* Tech stack ticker */}
      <h2 className="mt-12 text-sm text-[var(--textSecondary)] font-semibold tracking-wider uppercase text-center">
        Tools & Skills I Use
      </h2>
      <div className="mt-6 overflow-hidden border-y border-white/10 py-3 px-2">
        <div className="inline-block whitespace-nowrap text-sm font-mono text-[var(--textSecondary)] tracking-wide [animation:scroll_70s_linear_infinite] hover:[animation-play-state:paused] transition-shadow hover:shadow-pink-500/20">
          Python • R • SQL • Power BI • Spark • LLMs • Time Series • Forecasting • Feature Engineering • NLP • CI/CD • GitHub • Communication • AWS &nbsp;&nbsp;&nbsp;&nbsp;
          Python • R • SQL • Power BI • Spark • LLMs • Time Series • Forecasting • Feature Engineering • NLP • CI/CD • GitHub • Communication • AWS
        </div>
      </div>

      {/* Data Pulse Effect */}
      <div className="mt-6 h-[5px] w-full bg-gradient-to-r from-[#6EA8FF] to-[#6B8BFF] animate-pulse rounded-full shadow-md opacity-60" />
    </animated.section>
  );
};
