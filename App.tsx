import React from 'react';

export const Projects = () => {
  const projects = [
    {
      title: 'Project One',
      link: 'https://projectone.example.com',
      github: 'https://github.com/user/projectone',
      description: 'Description for project one.',
    },
    {
      title: 'Project Two',
      link: 'https://projecttwo.example.com',
      github: 'https://github.com/user/projecttwo',
      description: 'Description for project two.',
    },
  ];

  return (
    <section id="projects" className="py-12">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid gap-8">
        {projects.map((project) => (
          <div key={project.title} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:underline transition duration-300"
              >
                {project.title}
              </a>
            </h3>
            <p className="text-gray-300">{project.description}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-blue-300 hover:text-white transition duration-300 underline underline-offset-4 decoration-dotted"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
