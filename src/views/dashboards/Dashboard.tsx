import { Link } from 'react-router';
import BlogCards from 'src/components/dashboard/BlogCards';
import GithubActivity from 'src/components/dashboard/GithubActivity';
import TopLanguages from 'src/components/dashboard/TopLanguages';
import Portfolio from 'src/components/dashboard/Portfolio';
import SocialCard from 'src/components/dashboard/SocialCard';
import GithubCommits from 'src/components/dashboard/GithubCommits';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      <div className="lg:col-span-8 col-span-12">
        <Portfolio />
      </div>
      <div className="lg:col-span-4 col-span-12">
        <div className="grid grid-cols-12 h-full items-stretch">
          <div className="col-span-12 mb-30">
            <TopLanguages />
          </div>
          <div className="col-span-12">
            <SocialCard />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8 col-span-12">
        <GithubCommits />
      </div>

      <div className="lg:col-span-4 col-span-12 flex">
        <GithubActivity />
      </div>
      <div className="col-span-12">
        <BlogCards />
      </div>
      <div className="flex justify-center align-middle gap-2 flex-wrap col-span-12 text-center">
        <p className="text-base">
          @2025{' '}
          <Link
            to="https://adminmart.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            Anthony Seadler
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
