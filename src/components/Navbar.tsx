import React from 'react';

interface Props {
  toggleDark: () => void;
  dark: boolean;
}

export default function Navbar({ toggleDark, dark }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <a href="#hero" className="font-bold text-indigo-700 dark:text-indigo-300">Ayush Patel</a>
        <div className="space-x-4 hidden sm:block">
          <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About</a>
          <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400">Projects</a>
          <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400">Skills</a>
          <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
          <button onClick={toggleDark} className="ml-4 px-2 py-1 border rounded text-sm">
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}
