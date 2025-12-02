// src/App.js
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { days, shows } from './data';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const genres = ['All', ...Array.from(new Set(shows.map(s => s.genre)))];

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedShowTitle, setSelectedShowTitle] = useState(shows[0].title);

  const filteredShows =
    selectedGenre === 'All'
      ? shows
      : shows.filter(s => s.genre === selectedGenre);

  const selectedShow =
    shows.find(s => s.title === selectedShowTitle) || shows[0];

  const barData = {
    labels: filteredShows.map(s => s.title),
    datasets: [
      {
        label: 'Views (k)',
        data: filteredShows.map(s => s.views),
        backgroundColor: '#e50914'
      }
    ]
  };

  const lineData = {
    labels: days,
    datasets: [
      {
        label: `Watch Hours – ${selectedShow.title}`,
        data: selectedShow.weeklyHours,
        borderColor: '#46d369',
        backgroundColor: 'rgba(70, 211, 105, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { ticks: { color: '#ffffff' } },
      y: { ticks: { color: '#ffffff' } }
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#ffffff' } },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { ticks: { color: '#ffffff' } },
      y: { ticks: { color: '#ffffff' } }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Streaming Insights Dashboard</h1>
        <p>Explore content performance across views and watch time.</p>
      </header>

      <div className="controls">
        <div>
          <label>Filter by genre:&nbsp;</label>
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
          >
            {genres.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select show:&nbsp;</label>
          <select
            value={selectedShowTitle}
            onChange={e => setSelectedShowTitle(e.target.value)}
          >
            {shows.map(s => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <main className="grid">
        <section className="card">
          <h2>Views by Title</h2>
          <Bar data={barData} options={barOptions} />
        </section>

        <section className="card">
          <h2>Weekly Watch Hours</h2>
          <Line data={lineData} options={lineOptions} />
        </section>
      </main>
    </div>
  );
}

export default App;
