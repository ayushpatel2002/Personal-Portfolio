import { motion } from 'framer-motion';

export const Hero = () => (
  <section
    id="hero"
    className="min-h-screen flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden"
  >
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-6xl font-extrabold text-indigo-700 mb-4"
    >
      Turning Data into Impact
    </motion.h1>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4">
      <a
        href="/Documents/resume.pdf"
        className="px-5 py-3 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
      >
        Download Resume
      </a>
      <a
        href="#projects"
        className="px-5 py-3 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
      >
        Explore Projects
      </a>
    </motion.div>
  </section>
);
