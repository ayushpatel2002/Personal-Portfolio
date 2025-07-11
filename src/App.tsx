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
    <div className="font-sans text-white bg-gradient-to-b from-[#0a0f1c] to-[#1a2238] min-h-screen">
      <main className="relative max-w-6xl mx-auto px-6 py-6 space-y-16 bg-white/5 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
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
        <div className="absolute top-[25%] left-[60%] w-96 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-10 animate-pulse -z-10" />
        <About />
        <Projects />
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
}
