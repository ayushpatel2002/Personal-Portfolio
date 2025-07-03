import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { Hero } from './pages/Hero';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';

export default function App() {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((d) => !d);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="font-sans text-gray-800 dark:text-gray-100 min-h-screen" >
        <Navbar toggleDark={toggleDark} dark={dark} />
        <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}
