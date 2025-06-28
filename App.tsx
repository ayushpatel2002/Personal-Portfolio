import React from 'react';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-white to-gray-100">
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-32">
        <About />
        <Projects />
        <Contact />
      </main>
      <Chatbot />
    </div>
  );
}
