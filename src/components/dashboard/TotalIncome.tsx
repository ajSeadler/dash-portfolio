import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import skatePic from 'src/assets/images/bs-night.jpg';

const TotalIncome = () => {
  return (
    <div
      className="relative rounded-xl shadow-md p-6 text-white bg-cover bg-center h-44 w-full"
      style={{ backgroundImage: `url(${skatePic})` }}
    >
      {/* Top-left Title */}
      <p className="absolute top-4 left-4 text-lg font-semibold">See what's new!</p>

      {/* Bottom-left Social Icons */}
      <div className="absolute bottom-4 left-4 flex gap-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary transition-colors duration-200"
        >
          <FaGithub size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/yourusername/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary transition-colors duration-200"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary transition-colors duration-200"
        >
          <FaTwitter size={22} />
        </a>
      </div>
    </div>
  );
};

export default TotalIncome;
