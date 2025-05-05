import { useEffect, useState } from 'react';
import { FaCodeBranch } from 'react-icons/fa';

interface Commit {
  time: string;
  message: string;
  url: string;
}

const GithubActivity = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ajSeadler/events/public');
        const data = await response.json();

        const commitEvents = data.filter(
          (event: any) => event.type === 'PushEvent' || event.type === 'CreateEvent',
        );

        const recentCommits: Commit[] = commitEvents
          .flatMap((event: any) => {
            if (event.type === 'PushEvent') {
              return event.payload.commits.map((commit: any) => ({
                time: new Date(event.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                message: commit.message,
                url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
              }));
            } else if (event.type === 'CreateEvent') {
              return [
                {
                  time: new Date(event.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  message: `Created ${event.payload.ref_type} '${event.payload.ref}' in ${event.repo.name}`,
                  url: `https://github.com/${event.repo.name}`,
                },
              ];
            }
            return [];
          })
          .slice(0, 4); // limit to 4 items

        setCommits(recentCommits);
      } catch (error) {
        console.error('Error fetching commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-xl bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex items-center gap-4 mb-8 px-0">
        <div className="bg-secondary text-primary p-3 rounded-md">
          <FaCodeBranch size={24} />
        </div>
        <p className="text-lg font-semibold text-primary">Recent GitHub Activity</p>
      </div>

      {loading ? (
        <p className="text-center">Loading commits...</p>
      ) : commits.length === 0 ? (
        <p className="text-center text-gray-500">No recent public activity found.</p>
      ) : (
        <ul className="flex flex-col mt-2 relative">
          {commits.map((commit, index) => (
            <li key={index} className="relative flex items-start gap-4 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="z-10 w-3 h-3 rounded-full bg-primary mt-1.5"></div>
                {index !== commits.length - 1 && (
                  <div className="absolute top-5 left-[6px] w-px bg-border h-full z-0"></div>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500">{commit.time}</p>
                <p className="text-dark">{commit.message}</p>
                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-sm"
                >
                  View on GitHub
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GithubActivity;
