import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Icon } from '@iconify/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageData {
  [language: string]: number;
}

const TopLanguages = () => {
  const [languages, setLanguages] = useState<LanguageData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ajSeadler/repos?per_page=100');
        const repos = await response.json();

        const languageCount: LanguageData = {};
        repos.forEach((repo: any) => {
          if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
          }
        });

        setLanguages(languageCount);
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);

  const data = {
    labels: sortedLanguages.map(([language]) => language),
    datasets: [
      {
        data: sortedLanguages.map(([_, count]) => count),
        backgroundColor: [
          '#6366F1',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#3B82F6',
          '#8B5CF6',
          '#EC4899',
          '#14B8A6',
          '#F97316',
          '#64748B',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#111827',
          font: {
            size: 14,
            weight: 'bold', // ✅ fixed type error
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        cornerRadius: 4,
        padding: 10,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-secondary text-primary p-3 rounded-md">
          <Icon icon="mdi:code-tags" height={24} />
        </div>
        <p className="text-xl font-semibold text-gray-900">Top Languages Used</p>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading languages...</p>
      ) : sortedLanguages.length === 0 ? (
        <p className="text-sm text-gray-500">No languages found. Please try again later.</p>
      ) : (
        <div className="flex justify-center">
          <div className="w-[280px] sm:w-[350px] md:w-[400px]">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopLanguages;
