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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* GitHub Stats Section */}
      <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-neutral-900">GitHub Profile Stats</h2>
          <a
            href="https://github.com/ajSeadler"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.61 3.02 8.5 7.15 9.87.52.1.71-.22.71-.45v-2.75c0-.35-.25-.64-.59-.74-.93-.29-1.58-.98-1.58-1.87 0-1.26.99-2.26 2.25-2.26 1.33 0 2.41 1.08 2.41 2.41v2.68c0 .25.19.45.43.45 2.94 0 5.33-2.39 5.33-5.33 0-2.94-2.39-5.33-5.33-5.33z"
                clipRule="evenodd"
              />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* GitHub Stats Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Repositories */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <GitBranch className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Repositories</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            {isLoading ? 'Loading...' : githubStats.publicRepos}
          </p>
        </div>

        {/* Followers */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <Users className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Followers</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            {isLoading ? 'Loading...' : githubStats.followers}
          </p>
        </div>

        {/* Following */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <UserPlus className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Following</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            {isLoading ? 'Loading...' : githubStats.following}
          </p>
        </div>
      </div>

      {/* Revenue Forecast Component */}
      <div className="mt-8">
        <RevenueForecast />
      </div>
      <div className="mt-8">
        <DailyActivity />
      </div>
    </div>
  );
};

export default Typography;
