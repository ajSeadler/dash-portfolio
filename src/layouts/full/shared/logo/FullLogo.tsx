import { Link } from 'react-router';
const FullLogo = () => {
  return (
    <Link to="/" className="inline-flex items-center space-x-2">
      {/* <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform">
        <span className="text-2xl font-bold tracking-wide">A</span>
      </div> */}
      <p className="text-2xl font-extrabold text-primary tracking-tight hover:text-secondary transition-colors rounded-md px-2 py-1 hover:bg-primary">
        Anthony Seadler
      </p>
    </Link>
  );
};

export default FullLogo;
