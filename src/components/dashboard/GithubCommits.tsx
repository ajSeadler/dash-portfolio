import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { FaGithub } from 'react-icons/fa';
import { ApexOptions } from 'apexcharts';

const GITHUB_USERNAME = 'ajSeadler';
const PERIOD_OPTIONS = [
  { label: '7D', days: 7 },
  { label: '14D', days: 14 },
];

const GithubCommits: React.FC = () => {
  const [period, setPeriod] = useState(PERIOD_OPTIONS[1]);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const makeDateArray = (days: number): Date[] => {
    const today = new Date();
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (days - 1 - i));
      return d;
    });
  };

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
      const events = await res.json();

      const counts: Record<string, number> = {};
      (events as any[]).forEach((ev) => {
        if (ev.type === 'PushEvent') {
          const iso = ev.created_at.split('T')[0];
          counts[iso] = (counts[iso] || 0) + ev.payload.commits.length;
        }
      });

      const dates = makeDateArray(period.days);
      const isoDates = dates.map((d) => d.toISOString().split('T')[0]);
      const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
      setLabels(dates.map((d) => fmt.format(d)));
      setData(isoDates.map((iso) => counts[iso] || 0));
      setLoading(false);
    };

    fetchCommits();
  }, [period]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 600,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#14213d'],
    },
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeWidth: 2,
      strokeColors: ['#14213d'],
      hover: { size: 6 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    grid: {
      strokeDashArray: 4,
      borderColor: '#e5e7eb',
    },
    xaxis: {
      categories: labels,
      labels: {
        style: { fontSize: '12px', colors: '#6b7280' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (v: number) => `${v} commit${v === 1 ? '' : 's'}`,
      },
    },
  };

  return (
    <div className="rounded-xl bg-white dark:bg-darkgray shadow-xl dark:shadow-lg p-6 w-full transition-all duration-300 border border-gray-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-secondary text-gray-800 dark:text-white p-2 rounded-md shadow-inner">
            <FaGithub size={20} />
          </div>
          <h3 className="text-xl font-semibold text-primary">GitHub Activity</h3>
        </div>
        <div className="flex gap-2 flex-row-reverse">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.days}
              onClick={() => setPeriod(opt)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium border transition
                ${
                  period.days === opt.days
                    ? 'bg-primary text-white border-primary shadow'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-sm">
          Loading commits…
        </div>
      ) : (
        <Chart options={options} series={[{ name: 'Commits', data }]} type="line" height={300} />
      )}
    </div>
  );
};

export default GithubCommits;
