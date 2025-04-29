import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import profilePic from 'src/assets/images/me.jpg'; // Adjust path based on your project

const TotalIncome = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center text-center">
      {/* Profile Picture */}
      <img
        src={profilePic}
        alt="Profile Picture"
        className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary"
      />

      {/* Heading */}
      <p className="text-md font-semibold text-dark mb-6">See what's new!</p>

      {/* Social Icons */}
      <div className="flex gap-5">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-primary transition-colors duration-200"
        >
          <FaGithub size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/yourusername/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-primary transition-colors duration-200"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-primary transition-colors duration-200"
        >
          <FaTwitter size={22} />
        </a>
      </div>
    </div>
  );
};

export default TotalIncome;
