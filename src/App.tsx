import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Chatbot from './components/Chatbot';
import Hero from './pages/Hero';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';

export default function App() {
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const techConsole = [
    '> npm run build',
    '✔ Build complete in 2.4s',
    '> Deploying to Vercel…',
    '✔ Deployment ready',
    '> Running unit tests…',
    '✔ 28 passed, 0 failed',
  ];

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setConsoleLines((prev) => [...prev.slice(-6), techConsole[i % techConsole.length]]);
      i += 1;
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-sans text-white min-h-screen">
      <NavBar />
      <main className="relative max-w-6xl mx-auto px-6 pt-6 pb-12 space-y-16">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <div className="hidden md:block fixed bottom-6 left-6 z-40 bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-xl p-3 w-[260px] md:w-[320px] soft-shadow pointer-events-none">
        <div className="text-[10px] font-mono text-slate-300 leading-4">
          {consoleLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>

      <div className="transition duration-300 soft-shadow rounded-lg">
        <Chatbot />
      </div>
    </div>
  );
}
