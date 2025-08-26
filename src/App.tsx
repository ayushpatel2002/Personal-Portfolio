import React, { useState, useEffect } from 'react';
import Hero from './pages/Hero';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Chatbot from './components/Chatbot';
import NavBar from './components/NavBar';

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

function AnimatedCounter({ to, suffix = '', duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp / duration), 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  return <p className={className}>{count}{suffix}</p>;
}

const DataStat = ({ number, label }: { number: number, label: string }) => (
  <div className="flex flex-col items-center text-center px-4">
    <span className="text-4xl font-bold"><AnimatedCounter to={number} /></span>
    <p className="mt-1 text-sm text-white/80">{label}</p>
  </div>
);

export default function App() {
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const techConsole = [
    "> npm run build",
    "✔ Build complete in 2.4s",
    "> Deploying to Vercel…",
    "✔ Deployment ready",
    "> Connecting to AWS Cost Explorer…",
    "✔ Synced: Prophet cost forecast",
    "> Running unit tests…",
    "✔ 28 passed, 0 failed",
  ];
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setConsoleLines((prev) => [...prev.slice(-6), techConsole[i % techConsole.length]]);
      i++;
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="font-sans text-white min-h-screen bg-[radial-gradient(1200px_600px_at_70%_0%,rgba(110,168,255,0.10),transparent_60%),linear-gradient(to_bottom,#0a0f1c,#1a2238)]">
      <NavBar />
      <main className="relative max-w-6xl mx-auto px-6 py-6 space-y-16 glass rounded-3xl soft-shadow border overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(110,168,255,0.25)]">
        <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 L1000 1000" stroke="white" strokeWidth="0.3" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        {/* Code Rain (subtle) */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-20">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="code-drop block absolute top-[-120%] w-[1px] h-[220%] left-0 bg-gradient-to-b from-white/10 via-white/40 to-transparent"
              style={{ left: `${(i + 1) * (100 / 19)}%`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
        <div className="absolute top-[25%] left-[60%] w-96 h-96 bg-gradient-to-br from-[#6EA8FF] to-[#6B8BFF] rounded-full blur-3xl opacity-20 animate-pulse -z-10" />
        <Hero />
        <About />
        <Projects />
        <Contact />
        {/* Keyword Cloud (floating)
        <div className="pointer-events-none absolute inset-0 -z-10">
          {[
            { t: 'LLMs', x: '15%', y: '18%' },
            { t: 'R', x: '72%', y: '22%' },
            { t: 'AWS', x: '8%', y: '58%' },
            { t: 'Spark', x: '65%', y: '70%' },
            { t: 'DAX', x: '42%', y: '32%' },
            { t: 'Prophet', x: '30%', y: '75%' },
            { t: 'CI/CD', x: '82%', y: '50%' },
            { t: 'LangChain', x: '48%', y: '84%' },
          ].map((k, i) => (
            <span
              key={i}
              className="absolute text-[12px] sm:text-sm font-mono text-[var(--textSecondary)] animate-fadeCycle"
              style={{ left: k.x, top: k.y, animationDelay: `${i * 0.6}s` }}
            >
              {k.t}
            </span>
          ))}
        </div> */}
        {/* Orbiting Tech Badges */}
        {/* <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="orbit orbit-1">
            <span className="badge">PY</span>
          </div>
          <div className="orbit orbit-2">
            <span className="badge">R</span>
          </div>
          <div className="orbit orbit-3">
            <span className="badge">SQL</span>
          </div>
          <div className="orbit orbit-4">
            <span className="badge">AWS</span>
          </div>
        </div> */}
      </main>
      {/* Live Console Overlay */}
      <div className="hidden md:block fixed bottom-6 left-6 z-40 glass border rounded-xl p-3 w-[260px] md:w-[320px] soft-shadow pointer-events-none">
        <div className="text-[10px] font-mono text-[var(--textSecondary)] leading-4">
          {consoleLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
        <div className="animate-float text-sm absolute left-10 top-20 text-[var(--textSecondary)]">SQL</div>
        <div className="animate-float text-sm absolute left-1/2 top-40 text-[var(--textSecondary)]">Python</div>
        <div className="animate-float text-sm absolute right-10 top-60 text-[var(--textSecondary)]">Power BI</div>
      </div>
      {/* Future enhancement: Add <SideNav /> for scroll tracking */}
      <div className="transition duration-300 soft-shadow rounded-lg">
        <Chatbot />
      </div>
      <style>{`
        @keyframes drop {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        .code-drop { animation: drop 8s linear infinite; }

        @keyframes fadeCycle {
          0%, 100% { opacity: .15; filter: blur(.3px); }
          50% { opacity: .5; }
        }
        .animate-fadeCycle { animation: fadeCycle 6s ease-in-out infinite; }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        .orbit { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .orbit-1 { animation: orbit 22s linear infinite; }
        .orbit-2 { animation: orbit 26s linear infinite reverse; }
        .orbit-3 { animation: orbit 30s linear infinite; }
        .orbit-4 { animation: orbit 34s linear infinite reverse; }
        .badge {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 10px;
          color: var(--textSecondary);
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
