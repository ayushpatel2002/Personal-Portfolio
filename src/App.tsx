import React from 'react';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <div className="font-sans bg-gray-900 text-gray-100 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        <About />
        <Projects />
        <Chatbot />
        <Contact />
      </main>
    </div>
  );
}
