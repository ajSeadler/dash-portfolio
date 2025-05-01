import { useEffect, useState } from 'react';
import GithubCommits from 'src/components/dashboard/GithubCommits';
import { Users, UserPlus, GitBranch } from 'lucide-react';
import DailyActivity from 'src/components/dashboard/GithubActivity';
import { FaGithub } from 'react-icons/fa';

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
          className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-primary transition"
        >
          <FaGithub className=' className="w-5 h-5 mr-2' />
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
            className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col items-center text-center"
          >
            <item.icon className="w-8 h-8 text-secondary mb-2" />
            <h3 className="text-base font-medium text-neutral-900">{item.label}</h3>
            <p className="text-2xl font-bold text-primary mt-1">{isLoading ? '...' : item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <GithubCommits />
        </div>
        <div className="lg:col-span-2">
          <DailyActivity />
        </div>
      </div>
    </div>
  );
};

export default Typography;
