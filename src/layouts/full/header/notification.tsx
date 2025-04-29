import { Dropdown } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const SocialLinks = [
  {
    id: 1,
    title: 'Instagram',
    icon: <FaInstagram className="text-pink-500" size={24} />,
    href: 'https://instagram.com/yourprofile',
  },
  {
    id: 2,
    title: 'LinkedIn',
    icon: <FaLinkedin className="text-blue-600" size={24} />,
    href: 'https://linkedin.com/in/yourprofile',
  },
  {
    id: 3,
    title: 'GitHub',
    icon: <FaGithub className="text-gray-800" size={24} />,
    href: 'https://github.com/yourprofile',
  },
  {
    id: 4,
    title: 'Twitter',
    icon: <FaTwitter className="text-blue-400" size={24} />,
    href: 'https://twitter.com/yourprofile',
  },
];

const Notification = () => {
  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <span
            className="h-10 w-10 hover:text-primary group-hover/menu:bg-lightprimary group-hover/menu:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer relative"
            aria-label="Social Links"
          >
            <Icon icon="solar:link-outline" height={20} />
          </span>
        )}
        className="rounded-sm w-[250px] notification !left-auto "
      >
        {SocialLinks.map((item) => (
          <Dropdown.Item
            key={item.id}
            as="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-3 flex items-center gap-3 text-dark hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <p className="text-dark opacity-80 text-[13px] font-semibold">{item.title}</p>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default Notification;
