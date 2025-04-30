import { useEffect, useState } from 'react';
import { Progress } from 'flowbite-react';
import { Icon } from '@iconify/react';

interface LanguageData {
  [language: string]: number;
}

const NewCustomers = () => {
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const totalRepos = Object.values(languages).reduce((a, b) => a + b, 0);

  const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-secondary text-primary p-3 rounded-md">
          <Icon icon="mdi:code-tags" height={24} />
        </div>
        <p className="text-lg text-dark font-semibold">Top Languages Used</p>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading languages...</p>
      ) : sortedLanguages.length === 0 ? (
        <p className="text-sm text-gray-500">No languages found. Please try again later.</p>
      ) : (
        <div className="space-y-6">
          {sortedLanguages.map(([language, count]) => {
            const percent = ((count / totalRepos) * 100).toFixed(0);

            return (
              <div key={language}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-dark">{language}</p>
                  <p className="text-sm text-dark">{percent}%</p>
                </div>
                <Progress progress={Number(percent)} color="secondary" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewCustomers;
