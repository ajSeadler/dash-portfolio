import { useEffect, useState } from 'react';
import { RevenueForecast } from 'src/components/dashboard/RevenueForecast';
import { Users, UserPlus, GitBranch } from 'lucide-react';
import DailyActivity from 'src/components/dashboard/DailyActivity';

const Typography = () => {
  const [githubStats, setGithubStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ajSeadler');
        const data = await response.json();

        setGithubStats({
          publicRepos: data.public_repos,
          followers: data.followers,
          following: data.following,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold text-neutral-900">GitHub Profile Stats</h2>
        <a
          href="https://github.com/ajSeadler"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
            className="w-4 h-4 mr-2"
          >
            <path d="M12 .5C5.373.5 0 5.872 0 12.5c0 5.292 3.438 9.776 8.207 11.363.6.113.82-.263.82-.584 0-.287-.01-1.047-.016-2.056-3.338.727-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.083-.73.083-.73 1.204.084 1.837 1.236 1.837 1.236 1.07 1.832 2.807 1.303 3.492.996.108-.774.419-1.304.762-1.604-2.665-.304-5.467-1.334-5.467-5.933 0-1.31.469-2.38 1.236-3.22-.124-.304-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.516 11.516 0 0 1 3.004-.403c1.02.005 2.047.138 3.004.403 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.872.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.921.431.37.816 1.1.816 2.218 0 1.603-.015 2.894-.015 3.288 0 .324.216.703.825.584C20.565 22.273 24 17.79 24 12.5 24 5.872 18.627.5 12 .5z" />
          </svg>
          View GitHub
        </a>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            label: 'Repositories',
            icon: GitBranch,
            value: githubStats.publicRepos,
          },
          {
            label: 'Followers',
            icon: Users,
            value: githubStats.followers,
          },
          {
            label: 'Following',
            icon: UserPlus,
            value: githubStats.following,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col items-center text-center"
          >
            <item.icon className="w-8 h-8 text-primary mb-2" />
            <h3 className="text-base font-medium text-neutral-700">{item.label}</h3>
            <p className="text-2xl font-bold text-neutral-900 mt-1">
              {isLoading ? '...' : item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <RevenueForecast />
        </div>
        <div className="lg:col-span-2">
          <DailyActivity />
        </div>
      </div>
    </div>
  );
};

export default Typography;
