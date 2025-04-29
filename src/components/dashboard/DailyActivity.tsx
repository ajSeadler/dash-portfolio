import { useEffect, useState } from 'react';

interface Commit {
  time: string;
  message: string;
  url: string;
}

const DailyActivity = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ajSeadler/events/public');
        const data = await response.json();

        const pushEvents = data.filter((event: any) => event.type === 'PushEvent');

        const recentCommits = pushEvents
          .flatMap((event: any) =>
            event.payload.commits.map((commit: any) => ({
              time: new Date(event.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              message: commit.message,
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
            })),
          )
          .slice(0, 5); // limit to 5 commits

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
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <h5 className="card-title mb-6">Public Commits</h5>

      {loading ? (
        <p className="text-center">Loading commits...</p>
      ) : (
        <div className="flex flex-col mt-2">
          <ul>
            {commits.map((commit, index) => (
              <li key={index}>
                <div className="flex gap-4 min-h-16">
                  <div>
                    <p>{commit.time}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-primary p-1.5 w-fit"></div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div>
                    <p className="text-dark text-start">{commit.message}</p>
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 text-sm"
                    >
                      View Commit
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DailyActivity;
