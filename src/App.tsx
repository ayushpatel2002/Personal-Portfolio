import React from 'react';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Chatbot from './components/Chatbot';

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
        {/* Stats moved to profile section */}
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
}
