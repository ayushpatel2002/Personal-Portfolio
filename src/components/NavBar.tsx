import { useEffect, useState } from 'react';

const sections = ['about', 'projects', 'contact'];

export default function NavBar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `transition-colors hover:text-[var(--blue)] ${active === id ? 'text-[var(--blue)]' : ''}`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/30">
      <ul className="flex justify-center gap-8 py-4">
        {sections.map((id) => (
          <li key={id}>
            <a href={`#${id}`} className={linkClass(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

