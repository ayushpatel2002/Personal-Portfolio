import React from 'react';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl">
        <About />
        <Projects />
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
}
