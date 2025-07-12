import React, { useState, useEffect } from 'react';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Chatbot from './components/Chatbot';

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

const DataStat = ({ number, label, icon }: { number: number, label: string, icon?: string }) => (
  <div className="flex flex-col items-center text-center px-4">
    <span className="text-4xl font-bold">{icon} <AnimatedCounter to={number} /></span>
    <p className="mt-1 text-sm text-white/80">{label}</p>
  </div>
);

export default function App() {
  return (
    <div className="font-sans text-white bg-gradient-to-b from-[#0a0f1c] to-[#1a2238] min-h-screen">
      <main className="relative max-w-6xl mx-auto px-6 py-6 space-y-16 bg-white/5 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 L1000 1000" stroke="white" strokeWidth="0.3" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        <div className="absolute top-[25%] left-[60%] w-96 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-10 animate-pulse -z-10" />
        <About />
        <Projects />
        <Contact />
      </main>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
        <div className="animate-float text-sm absolute left-10 top-20 text-purple-400">SQL</div>
        <div className="animate-float text-sm absolute left-1/2 top-40 text-pink-400">Python</div>
        <div className="animate-float text-sm absolute right-10 top-60 text-blue-400">Power BI</div>
      </div>
      {/* Future enhancement: Add <SideNav /> for scroll tracking */}
      <div className="transition duration-300 shadow-[0_0_20px_#a855f7] rounded-lg">
        <Chatbot />
      </div>
    </div>
  );
}
