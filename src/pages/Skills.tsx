import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const Skills = () => {
  const data = {
    labels: ['Data Science', 'Full Stack', 'Tools', 'Cloud'],
    datasets: [
      {
        label: 'Proficiency',
        data: [90, 80, 75, 60],
        backgroundColor: 'rgba(79,70,229,0.2)',
        borderColor: '#4f46e5',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: { display: false },
      },
    },
    plugins: { legend: { display: false } },
    responsive: true,
  } as const;

  return (
    <section id="skills" className="mb-16 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Skills</h2>
      <div className="max-w-sm mx-auto">
        <Radar data={data} options={options} />
      </div>
    </section>
  );
};
