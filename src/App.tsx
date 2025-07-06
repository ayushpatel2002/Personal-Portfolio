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

export default function App() {
  return (
    <div className="font-sans text-gray-100 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <main className="relative max-w-6xl mx-auto px-6 py-14 space-y-24 bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-[25%] left-[60%] w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-10 animate-pulse -z-10" />
        <About />
        <Projects />
        <div className="relative flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-sm text-gray-300 text-center z-10 relative">
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
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
}
