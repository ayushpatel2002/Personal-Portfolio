import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const sections = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 110;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const introSpring = useSpring({
    from: { y: -80, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { tension: 180, friction: 20 },
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({ top: element.offsetTop - 90, behavior: 'smooth' });
  };

  return (
    <animated.nav style={introSpring} className={`fixed inset-x-0 top-0 z-50 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div
        className={`mx-auto max-w-5xl px-6 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/70 backdrop-blur-md border border-slate-800 shadow-lg py-3'
            : 'bg-transparent py-2'
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            AP
          </button>

          <ul className="hidden md:flex gap-8">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative text-sm font-medium transition-colors hover:text-white ${
                    activeSection === section.id ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="md:hidden text-slate-300 text-xl">☰</div>
        </div>
      </div>
    </animated.nav>
  );
}
